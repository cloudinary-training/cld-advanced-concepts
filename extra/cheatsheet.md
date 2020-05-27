# Image Transformation Visual Cheat Sheet



## Original Image 1000 x 1500 ar 2:3
<img src="https://res.cloudinary.com/cloudinary-training/image/upload/images/woman-standing" alt="original 1000x1500" width="200">



[https://res.cloudinary.com/cloudinary-training/image/upload/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/images/woman-standing)

## Summary of Cropping Modes

| mode     | will crop | ar maintained | may add padding | can use g_auto | must use g_auto | modify if larger | modify if smaller |may skew           |
|----------|-----------|---------------|-----------------|----------------|-----------------|------------------|-------------------|-------------------|
| crop     | x         | x             |                 | x              |                 |                  |                   |                   |
| fill     | x         |               |                 | x              |                 | x                |                   |                   |
| fill_pad |           |               |                 | x              | x               |                  |                   |                   |
| fit      |           | x             |                 |                |                 |                  |                   |                   |
| lfill    | x         |               |                 |                |                 | x                |                   |                   |
| limit    |           | x             |                 |                |                 | x                |                   |                   |
| lpad     |           |               | x               |                |                 | x                |                   |                   |
| mfit     |           | x             |                 |                |                 |                  | x                 |                   |
| mpad     |           |               | x               |                |                 |                  | x                 |                   |
| pad      |           | x             | x               |                |                 |                  |                   |                   |
| scale    |           |               |                 |                |                 |                  |                   |                   |
| mpad     |           |               |                 |                |                 |                  |                   |                   |
| scale    |           |               |                 |                |                 |                  |                   | x                 |
| thumb    |           | x             |                 | x              |                 |                  |                   |                   |

## Cropping with transformations that allow Gravity Auto 

Transforming from AR 2:3 to AR 1:1 

|   |  crop | thumb  | fill   | fill pad   |
|---|---|---|---|---|
| without g_auto  | ![https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150/images/woman-standing)  | ![https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150/images/woman-standing)  | ![https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,h_150,w_150/images/woman-standing)  | N/A  |
| with g_auto  | ![https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150,g_auto/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150,g_auto/images/woman-standing)  | ![https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150,g_auto/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150,g_auto/images/woman-standing)  | ![https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,h_150,w_150,g_auto/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,h_150,w_150,g_auto/images/woman-standing)  | ![https://res.cloudinary.com/cloudinary-training/image/upload/c_fill_pad,g_auto,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill_pad,g_auto,h_150,w_150/images/woman-standing)  |
|   |   |   |   |   |

### Crop to Width 150 x Height 150 

#### crop 

c_crop 150 x 150

![Crop 150 x 150](https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150/images/woman-standing)

#### crop with gravity auto  

c_crop 150 x 150 g_auto 

![Crop 150 x 150 with g_auto](https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150,g_auto/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150,g_auto/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_crop,h_150,w_150,g_auto/images/woman-standing)

#### thumb

c_thumb 150 x 150 

![Thumb 150 x 150 with g_auto](https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150/images/woman-standing)


#### thumb with gravity auto

c_thumb 150 x 150 g_auto

![Thumb 150 x 150 with g_auto](https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150,g_auto/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150,g_auto/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_thumb,h_150,w_150,g_auto/images/woman-standing)

#### fill

c_fill 150 x 150

![Fill 150 x 150](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,h_150,w_150/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,h_150,w_150/images/woman-standing)


#### fill with gravity auto

c_fill 150 x 150 g_auto

![Fill 150 x 150 with g_auto](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,g_auto,h_150,w_150/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,g_auto,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,g_auto,h_150,w_150/images/woman-standing)

#### fill pad  

N/A

#### fill pad with gravity auto

c_fill_pad 150 x 150 g_auto

![Fill 150 x 150 with g_auto](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill_pad,g_auto,h_150,w_150,b_green/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_fill_pad,g_auto,h_150,w_150,b_green/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill_pad,g_auto,h_150,w_150,b_green/images/woman-standing)

## Cropping with transformations that DO NOT allow Gravity Auto  

### Crop 150 x 150

|   |  scale |  fit   |  limit pad ar 1:1|
|---|---|---|---|
||![https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,h_150,w_150/images/woman-standing) |![https://res.cloudinary.com/cloudinary-training/image/upload/c_fit,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_fit,h_150,w_150/images/woman-standing) |![https://res.cloudinary.com/cloudinary-training/image/upload/c_lpad,h_150,w_150,b_green/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_lpad,h_150,w_150,b_green/images/woman-standing) |

#### scale

c_scale height 150

![Scale width height 150](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,h_150,w_150/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,h_150,w_150/images/woman-standing)


#### fit

c_fit height 150

![Fit width height 150](https://res.cloudinary.com/cloudinary-training/image/upload/c_fit,h_150,w_150/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_fit,h_150,w_150/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_fit,h_150,w_150/images/woman-standing)


#### limit pad green background 150 x 150

c_lpad height 150 width 150 green background

![Limit Pad  150 x 150](https://res.cloudinary.com/cloudinary-training/image/upload/c_lpad,h_150,w_150,b_green/images/woman-standing)  
[https://res.cloudinary.com/cloudinary-training/image/upload/c_lpad,h_150,w_150,b_green/images/woman-standing](https://res.cloudinary.com/cloudinary-training/image/upload/c_lpad,h_150,w_150,b_green/images/woman-standing)




## Optimization and Performance

Using Auto Quality and Auto Format

## Positioning

### Direction

| West   |      Center      |  East |
|----------|:-------------:|------:|
| ![north west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north_west%20,co_black,g_north_west,b_red/1px)|  ![north](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north%20,co_black,g_north,b_red/1px) | ![north east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north_east%20,co_black,g_north_east,b_red/1px) |
| ![west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_west%20,co_black,g_west,b_red/1px)|    ![center](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_center%20,co_black,g_center,b_red/1px)   |   ![east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_east%20,co_black,g_east,b_red/1px) |
| ![south west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_south_west%20,co_black,g_south_west,b_red/1px)| ![south](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20south%20,co_black,g_south,b_red/1px) |  ![south east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_south_east%20,co_black,g_south_east,b_red/1px) |

**CENTER**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20CENTER%20,co_black,g_center,b_red/1px

**N**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20N%20,co_black,g_north,b_red/1px

**NE**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20NE%20,co_black,g_north_east,b_red/1px

**E**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20E%20,co_black,g_east,b_red/1px

**SE**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20SE%20,co_black,g_south_east,b_red/1px

**S**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20S%20,co_black,g_south,b_red/1px

**SW**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20SW%20,co_black,g_south_west,b_red/1px

**W**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20W%20,co_black,g_west,b_red/1px

**NW**
https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20NW%20,co_black,g_north_west,b_red/1px

### Direction offset x 10, y 10

|    |            |   |
|----------|:-------------:|------:|
| ![north west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north_west%20,co_black,g_north_west,x_10,y_10,b_red/1px)|  ![north](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north%20,co_black,g_north,x_10,y_10,b_red/1px) | ![north east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north_east%20,co_black,g_north_east,x_10,y_10,b_red/1px) |
| ![west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_west%20,co_black,g_west,x_10,y_10,b_red/1px)|    ![center](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_center%20,co_black,g_center,b_red,x_10,y_10/1px)   |   ![east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_east%20,co_black,g_east,x_10,y_10,b_red/1px) |
| ![south west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_south_west%20,co_black,g_south_west,x_10,y_10,b_red/1px)| ![south](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20south%20,co_black,g_south,x_10,y_10,b_red/1px) |  ![south east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_south_east%20,co_black,g_south_east,x_10,y_10,b_red/1px) |

### Direction offset x -10, y -10

|    |            |   |
|----------|:-------------:|------:|
| ![north west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north_west%20,co_black,g_north_west,x_-10,y_-10,b_red/1px)|  ![north](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north%20,co_black,g_north,x_-10,y_-10,b_red/1px) | ![north east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_north_east%20,co_black,g_north_east,x_-10,y_-10,b_red/1px) |
| ![west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_west%20,co_black,g_west,x_-10,y_-10,b_red/1px)|    ![center](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_center%20,co_black,g_center,b_red,x_-10,y_-10/1px)   |   ![east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_east%20,co_black,g_east,x_-10,y_-10,b_red/1px) |
| ![south west](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_south_west%20,co_black,g_south_west,x_-10,y_-10,b_red/1px)| ![south](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20south%20,co_black,g_south,x_-10,y_-10,b_red/1px) |  ![south east](https://res.cloudinary.com/cloudinary-training/image/upload/c_scale,f_auto,h_150,q_auto,w_150/l_text:Times_20:%20g_south_east%20,co_black,g_south_east,x_-10,y_-10,b_red/1px) |





## Overlays

### Text and Image over Video
Click image to view video

<a href="https://res.cloudinary.com/demo/video/upload/w_400,c_fill,ar_4:3,q_auto,f_auto/l_cloudinary_icon,g_south_east,y_25,x_5,o_50,w_100//l_text:Times_20:@cloudinary,g_north_east,y_10,x_10,co_rgb:0071BA,o_75/cld_rubiks_guy.mp4" target="_blank"><img src="https://res.cloudinary.com/demo/video/upload/w_400,c_fill,ar_4:3,q_auto,f_auto/l_cloudinary_icon,g_south_east,y_25,x_5,o_50,w_100//l_text:Times_20:@cloudinary,g_north_east,y_10,x_10,co_rgb:0071BA,o_75/cld_rubiks_guy" 
alt="IMAGE ALT TEXT HERE" width="400" height="300" border="10" /></a>

Full URL to video:  

[https://res.cloudinary.com/demo/video/upload/w_400,c_fill,ar_4:3,q_auto,f_auto/l_cloudinary_icon,g_south_east,y_25,x_5,o_50,w_100/l_text:Times_20:@cloudinary,g_north_east,y_10,x_10,co_rgb:0071BA,o_75/cld_rubiks_guy.mp4](https://res.cloudinary.com/demo/video/upload/w_400,c_fill,ar_4:3,q_auto,f_auto/l_cloudinary_icon,g_south_east,y_25,x_5,o_50,w_100/l_text:Times_20:@cloudinary,g_north_east,y_10,x_10,co_rgb:0071BA,o_75/cld_rubiks_guy.mp4)

URL to base video:  

[https://res.cloudinary.com/demo/video/upload/cld_rubiks_guy.mp4](https://res.cloudinary.com/demo/video/upload/cld_rubiks_guy.mp4)

URL to Cloudinary Icon:  

[https://res.cloudinary.com/demo/image/upload/v1426538492/cloudinary_icon.png](https://res.cloudinary.com/demo/image/upload/v1426538492/cloudinary_icon.png)


Text Transformation
|   | Transformation  | Description  |
|---|---|---|
|   |  l_text:Times_20:@cloudinary |  Overlay text using font family Times with font size 20 and text content '@cloudinary'  |
|   |  g_north_east |position orientation north east (upper right) corner   | 
|   |  y_10 | position offset 10 down from the top   |
|   |  x_10 | position offset 10 to the left of the right side | 
|   |  co_rgb:0071BA| color RGB hex blue branding color  | 
|   |  0_75 | opacity 75 with 100 being fully opaque (least transparent)  |  


## Effects

|   | grayscale | replace color   | outline  | sharpen| loop|
|---|---|---|---|---|---|
|   |![grayscale](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,g_auto,h_150,w_150,e_grayscale/images/woman-standing)|![replace color](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,g_auto,h_150,w_150,e_replace_color:yellow:10:814d2c/images/woman-standing)   |![outline](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,g_auto,h_150,w_150/e_outline:15:200,co_yellow/images/woman-standing)    |![sharpen](https://res.cloudinary.com/cloudinary-training/image/upload/c_fill,g_auto,h_150,w_150/e_sharpen/images/woman-standing) | ![loop]()   |

