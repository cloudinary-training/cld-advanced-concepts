require('dotenv').config()
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
app.use(bodyParser.json())

const port = 3000

// accept an object with public_id and tranformation object
// object will be referenced to req.body

/*
want to sign this: {
  "public_id":"test-logo",
  "transformation":{
    "width": 400,
    "quality: "auto",
    "secure": "true",
    "sign_url": "true"
  }
}

curl --location --request POST 'http://localhost:3000/api/signurl' \
--header 'Content-Type: application/json' \
--data-raw '{
  "public_id":"test-logo",
  "transformation":{
  	"type": "upload",
    "width": 400,
    "quality": "auto",
    "secure": "true",
    "sign_url": "true"
  }
}'
*/
app.get('/', (req, res) => {
  res.json({
    message:
      'post to /api/signurl an object with public_id and transformation keys'
  })
})

app.post('/api/signurl', (req, res) => {
  console.log('req.body', req.body)
  console.log(req.body.public_id)
  console.log(req.body.transformation)

  const url = cloudinary.url(req.body.public_id, req.body.transformation)
  console.log(url)
  res.json({ status: 'accepted', url: url })
})

app.listen(port, () => console.info(`Server is up on http://localhost:${port}`))
