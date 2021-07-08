# Custom Fn
For this example, we are writing a custom function using the imagemagick library. See [Cloudinary documentation](https://cloudinary.com/documentation/custom_functions#remote_functions) for more information.

## Run this app locally
```
cd user-upload-workflow/remote-function
npm i
node app.js
```
The local app can be tested with cURL.

In order to use a remote function with Cloudinary it must be available on the internet. The example app.js is deployed to Heroku. 

## Deploy to heroku


Here are instructions for deploying this app to Heroku:
[https://devcenter.heroku.com/articles/deploying-nodejs](https://devcenter.heroku.com/articles/deploying-nodejs)


* [deploying with git](https://devcenter.heroku.com/articles/git)
* heroku git:remote -a  secure-caverns-90265
* Procfile
* git push heroku master


## Test locally with cURL

```bash
curl --location --request POST 'http://localhost:5000/api/file' \
--form 'file=@"<path to local file"'
```

## Test remote call to Heroku app
```
curl --location --request POST 'https://secure-caverns-90265.herokuapp.com/api/file' \
--form 'file=@"<path to local file>"' 
```
You'll might get a warning  like 
```
Warning: Binary output can mess up your terminal. Use "--output -" to tell 
Warning: curl to output it to your terminal anyway, or consider "--output 
Warning: <FILE>" to save to a file.
```
so you can add the `--output` flag to your cURL.

```
curl --location --request POST 'https://secure-caverns-90265.herokuapp.com/api/file' \
--form 'file=@"/Users/rebeccapeltz/training-images/tiger-lilly.jpg"'
```


## Custom Function: remote function in transformation
Older cached version

https://res.cloudinary.com/cloudinary-training/image/upload/s--ZSceRCol--/fn_remote:aHR0cHM6Ly9zZWN1cmUtY2F2ZXJucy05MDI2NS5oZXJva3VhcHAuY29tL2FwaS9maWxl/shell

