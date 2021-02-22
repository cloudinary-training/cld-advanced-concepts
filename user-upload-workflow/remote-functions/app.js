const im = require('imagemagick')
const express = require('express')
const multer = require('multer')
const app = express()
const fs = require('fs')
const moment = require('moment')

const fail = message => {
  console.log(message)
  throw new Error(message)
}

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
  // prepare input and output files
  let inputFile = null
  let outputFile = null
  inputFile = '/tmp/inputFile.jpg'
  fs.writeFileSync(inputFile, file.buffer)

  customArgs.unshift(inputFile)
  outputFile = '/tmp/outputFile.jpg'
  customArgs.push(outputFile)
  // actual conversion
  try {
    const output = await perform('convert', customArgs)
    postProcessResource(inputFile)
    if (outputFile) {
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

app.get('/', function (req, res) {
  res.json({ message: 'use /api/file to post file for transform' })
})

// memory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/api/file', upload.fields([{ name: 'file' }]), function (req, res) {
  return transform(req.files.file[0])
    .then(result => {
      // return the image and new metadata.
      if (req.queryStringParameters && req.queryStringParameters.cldb) {
        const bodyLengthBuf = Buffer.alloc(4)
        const bodyLength = result.length
        bodyLengthBuf.writeUInt32BE(bodyLength)
        const metadata = Buffer.from(
          JSON.stringify({ coordinates: { custom: [[45, 57, 100, 120]] } })
        )
        const metadataLengthBuf = Buffer.alloc(4)
        const metadataLength = metadata.length
        metadataLengthBuf.writeUInt32BE(metadataLength)
        result = Buffer.concat(
          [
            Buffer.from('CLDB'),
            bodyLengthBuf,
            result,
            metadataLengthBuf,
            metadata
          ],
          3 * 4 + metadataLength + bodyLength
        )
      }

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
app.set('port', process.env.PORT || 5000)

app.listen(app.get('port'), () =>
  console.log('App is running, server is listening on port ', app.get('port'))
)
