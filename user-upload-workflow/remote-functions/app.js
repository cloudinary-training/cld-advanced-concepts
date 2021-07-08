// load libraries
// use imagemagick for custome tranformation
const im = require('imagemagick')
// use file system to store intermediate files 
// for imagemagick transformation
const fs = require('fs')
const express = require('express')
// parse multi part form
const multer = require('multer')
// use routing for API
const app = express()
// use moment for date used in overlay
const moment = require('moment')

// log and throw transformation error
const fail = message => {
  console.log(message)
  throw new Error(message)
}

// process imagemagick transformation
const perform = (operation, args) =>
  new Promise((resolve, reject) =>
    im[operation](args, (err, res) => {
      if (err) {
        console.log(`${operation} operation failed:`, err)
        reject(err)
      } else {
        console.log(`${operation} completed successfully`)
        resolve(res)
      }
    })
  )

// cleanup after transformation
// need to remove tempoarary files if they were created
const postProcessResource = (resource, fn) => {
  let ret = null
  if (resource) {
    if (fn) {
      ret = fn(resource)
    }
    try {
      fs.unlinkSync(resource)
    } catch (err) {
      // Ignore
    }
  }
  return ret
}

// set up the transformation by calculating
// date and created imagemagick args array
const transform = async file => {
  // current time as string
  const date = moment().format('MMM Do YYYY, h:mm a')
  // transformation in imagemagick: resize to 314px, overlay text at x=5px, y=20px.
  const customArgs = [
    '-resize',
    '314x',
    '-fill',
    'blue',
    '-draw',
    `text 5,15 'Date cached: ${date}'`
  ]
  // prepare temporary input and output files
  let inputFile = null
  let outputFile = null
  inputFile = '/tmp/inputFile.jpg'
  // write the temporary input file
  fs.writeFileSync(inputFile, file.buffer)
  // add the input file name to custom args
  customArgs.unshift(inputFile)
  // add the output file name to custom args
  outputFile = '/tmp/outputFile.jpg'
  customArgs.push(outputFile)

  // call 'perform' function and then cleanup
  try {
    const output = await perform('convert', customArgs)
    postProcessResource(inputFile)
    if (outputFile) {
      // if a transformation was successful there will
      // be an output file and it can be returned
      return postProcessResource(outputFile, file =>
        Buffer.from(fs.readFileSync(file))
      )
    }
    // Return the command line output as a debugging aid
    return output
  } catch (err) {
    fail('perform fail:', err)
  }
}

// GET api to let use know where to POST
app.get('/', function (req, res) {
  res.json({ message: 'use /api/file to post file for transform' })
})

// set up multer using in memory storage
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// set up the API to process the transformation
app.post('/api/file', upload.fields([{ name: 'file' }]), function (req, res) {
  // call 'transform' to initiate the transformation
  // and return a Base64 encoded image if successful
  return transform(req.files.file[0])
    .then(result => {
      res.statusCode = 200
      res.headers = {
        'Content-Type': 'image/jpeg',
        'Content-Length': result.length
      }
      res.isBase64Encoded = true
      res.send(result)
    })
    .catch(error => {
      console.log('error xxx')
      console.log(error)

      res.statusCode = 502
      res.headers = { 'Content-Type': 'application/json' }
      const body = `{"error": "Error manipulating image ${error}"}`
      res.send(body)
    })
})
// set port
app.set('port', process.env.PORT || 5000)

// start server
app.listen(app.get('port'), () =>
  console.log('App is running, server is listening on port ', app.get('port'))
)
