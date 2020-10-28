# Custom Fn

## Deploy to heroku

* https://devcenter.heroku.com/articles/git
* heroku git:remote -a  secure-caverns-90265
* Procfile
* git push heroku master


## Custom function to transform an image


```
curl --location --request POST 'https://secure-caverns-90265.herokuapp.com/api/file' \
--header 'Content-Type: multipart/form-data; boundary=--------------------------279813939285989578662257' \
--form 'name=@/Users/rebeccapeltz/training-images/cloudinary-training.jpg'
```
## Custom Function: remote function in transformation
https://res.cloudinary.com/cloudinary-training/image/upload/s--ZSceRCol--/fn_remote:aHR0cHM6Ly9zZWN1cmUtY2F2ZXJucy05MDI2NS5oZXJva3VhcHAuY29tL2FwaS9maWxl/shell

## Fastly purge
curl -X PURGE https://res.cloudinary.com/pictures77/image/upload/s--mLnimme6--/fn_remote:aHR0cHM6Ly9zZWN1cmUtY2F2ZXJucy05MDI2NS5oZXJva3VhcHAuY29tL2FwaS9maWxl/bo_6px_solid_coral/shell