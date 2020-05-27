# Signed Cloudinary Widgets

## Media Library Widget
http://localhost/

## Routes 

**Static**

http://localhost:3000/index.html  

**Server Rendered**  
http://localhost:3000/upload    
http://localhost:3000/ml  

**Data APIs with signature and timestamp**  
http://localhost:3000/api/signupload  
http://localhost:3000/api/signml  

## Modify Static JavaScript

### Media library client code

public/js/ml-client.js  

```
cloud_name: '<cloud_name>',
api_key: '<api_key>',
username: '<user name email>',
```

pubic/js/upload-client.js

```
cloudName: '<cloud_name>',
apiKey: '<api_key>',
```



## environmental variables

create .env directory in this containing values from Console Dashboard  
```
CLOUD_NAME='<cloud_name>'
USER_NAME='<user email>'  this is an email
```

## Run the server
node app.js

## Including external JS
see layout.pug