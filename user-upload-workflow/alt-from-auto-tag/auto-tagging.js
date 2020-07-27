require('dotenv').config()
const cloudinary = require('cloudinary').v2
//step 1
cloudinary.uploader
  .upload('assets/images/shoes.jpg', {
    public_id: 'shoes',
    categorization: 'aws_rek_tagging',
    auto_tagging: 0.85
  })
  .then(uploadResult => {
    console.log(uploadResult)
    // console.log(uploadResult.info.categorization.aws_rek_tagging)
    const rekTags = uploadResult.info.categorization.aws_rek_tagging.data.filter(
      item => item.confidence > 0.85
    )
    const alt = rekTags.map(item => item.tag).join(', ')
    console.log('rekTags', rekTags)
    if (rekTags) {
      // add tags to show up in CL Console
      // step 2
      cloudinary.uploader
        .explicit(uploadResult.public_id, {
          type: 'upload',
          context: `alt=${alt}`
        })
        .then(result => {
          console.log(JSON.stringify(result, null, 1))
        })
        .catch(error => console.error(error))
    }
    // create an image tag using the rektags
    // step 3
    console.log(
      'image tag:',
      cloudinary.image(uploadResult.public_id, {
        width: '400',
        crop: 'scale',
        alt: alt
      })
    )
  })
  .catch(error => console.error(error))
