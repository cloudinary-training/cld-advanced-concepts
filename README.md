# Advanced Concepts

This folder contains data and scripts to use with exercises in Advanced Concepts workshop. 

## assets  

Assets used in this course can be found in the `/assets` directory.  They can be served from the course repo as https://cloudinary-training.github.io/cld-advanced-concepts/assets<path to asset> for example https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/cc0.png.


## Web Server
This folder contains asset folders that can be served using github.io.  To turn on github.io service after copying this repo into your account:
1. go to settings
2. scroll down to github pages
3. select `master branch` from source
4. check enforce HTTPS if you are using a CNAME for your github.io repo
5. you should be able to serve the assets using this URL:
```https://<domain name | accountname.github.io>/cld-advanced-concepts/<images | raw | video>```

## env variables and credentials

Your .env should look like this:

```
CLOUDINARY_URL=<cloudinary URL from console>
USER_NAME=<cloudinary account email>
``` 

## NPM Install 

### Node Code Snippets  

To use the node scripts for exercises
1. `npm install`
3. run your scripts from the root directory unless otherwise directed
4. make changes to scripts as needed for your cloud name
5. .env file is git ignored so it won't get checked in and doesn't exist in a fresh repo, you can use .env.template as a template and copy to .env.

### Signing Widgets: Node Server  

1. `cp .env signing-widgets/server`
2. `npm i`
3. `node app`


### Video Player: Vue.js Application

1. install vue cli globally `npm install -g @vue/cli`
2. `cd video-player/vuejs`
3. `npm i`
4. `npm run serve`

In the Video Player Module, you'll use a Vue.js application, so you'll need to install npm modules under
the `video-player` directory.  

You'll need to change `cloud name` in these files: 
 
* video-player/vuejs/src/main.js
* video-player/vuejs/srce/views/VideoTag.vue

### Formatting JavaScript  
This repo uses prettier for formatting.  If you're using Visual Studio Code you can add the prettier extension.  You can also rename the `.prettierrc.suggest` to the hidden file `.prettier` to use the rules followed in formatting the code in this repo.
Contents of .prettier below


```
{
  "singleQuote": true,
  "tabWidth": 2,
  "semi": false,
  "arrowParens": "avoid",
  "space-before-function-paren": true
}
```



