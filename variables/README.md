# Variables

replace black with white
and center the logo overlay
Ó
### Start

5 Steps to developer the hat.  Need a correction factor because hat is at an angle.

#### Black baseball cap with transparent background: step0.js
https://res.cloudinary.com/cloudinary-training/image/upload//baseball-cap.png    

![start black hat](https://res.cloudinary.com/cloudinary-training/image/upload//baseball-cap.png)

#### Make the cap white and auto everything and high res: step1.js
https://res.cloudinary.com/cloudinary-training/image/upload/e_replace_color:ffffff:30:111111,dpr_2.0,f_auto,q_auto/baseball-cap  

![make it white](https://res.cloudinary.com/cloudinary-training/image/upload/e_replace_color:ffffff:30:111111,dpr_2.0,f_auto,q_auto/baseball-cap)

#### Add variable for height and width and apply to baseball hat: step2.js
https://res.cloudinary.com/cloudinary-training/image/upload/$horizontal_500,$vertical_500,h_$vertical,w_$horizontal,c_fit,e_replace_color:ffffff:30:111111,dpr_2.0,f_auto,q_auto/baseball-cap  

![height and scale through variables](https://res.cloudinary.com/cloudinary-training/image/upload/$horizontal_500,$vertical_500,h_$vertical,w_$horizontal,c_fit,e_replace_color:ffffff:30:111111,dpr_2.0,f_auto,q_auto/baseball-cap)

#### Add a logo overlay and use (default) g_center (gravity center): step3.js
provide a variable for the width of the logo  
https://res.cloudinary.com/cloudinary-training/image/upload/$vertical_500,$horizontal_500,$color_!ffffff!,$logow_200/c_fit,h_$vertical,w_$horizontal/e_replace_color:$color:30:111111/c_scale,g_center,l_logo-big,w_$logow/dpr_2.0,f_auto,q_auto/baseball-cap 

![add over lay centered on image](https://res.cloudinary.com/cloudinary-training/image/upload/$vertical_500,$horizontal_500,$color_!ffffff!,$logow_200/c_fit,h_$vertical,w_$horizontal/e_replace_color:$color:30:111111/c_scale,g_center,l_logo-big,w_$logow/dpr_2.0,f_auto,q_auto/baseball-cap)

#### Refactor and Correct for angle of the hat: step4.js
* drive all measurements off of width
* use width dimension and logo width is 2/5 or .4 of width (logo has natural ar 1:1)
* create correction factors for x,y placement based on gravity north and make them multiples of width

https://res.cloudinary.com/cloudinary-training/image/upload/$w_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!ffffff!/e_replace_color:$color:30:111111/c_scale,w_$w/c_fit,g_north,l_logo-big,w_$w_mul_$logoscalar,x_$w_mul_$correctx,y_$w_mul_0.1/dpr_2.0,f_auto,q_auto/baseball-cap

![refactor](https://res.cloudinary.com/cloudinary-training/image/upload/$w_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!ffffff!/e_replace_color:$color:30:111111/c_scale,w_$w/c_fit,g_north,l_logo-big,w_$w_mul_$logoscalar,x_$w_mul_$correctx,y_$w_mul_0.1/dpr_2.0,f_auto,q_auto/baseball-cap)

#### Make hat color variable: step5.js
https://res.cloudinary.com/cloudinary-training/image/upload/$w_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!lightblue!/e_replace_color:$color:30:111111/c_scale,w_$w/c_fit,g_north,l_logo-big,w_$w_mul_$logoscalar,x_$w_mul_$correctx,y_$w_mul_0.1/dpr_2.0,f_auto,q_auto/baseball-cap 

![variable hat color](https://res.cloudinary.com/cloudinary-training/image/upload/$w_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!lightblue!/e_replace_color:$color:30:111111/c_scale,w_$w/c_fit,g_north,l_logo-big,w_$w_mul_$logoscalar,x_$w_mul_$correctx,y_$w_mul_0.1/dpr_2.0,f_auto,q_auto/baseball-cap)




