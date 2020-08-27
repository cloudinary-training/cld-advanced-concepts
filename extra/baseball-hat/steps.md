# Variables

replace black with white
and center the logo overlay

### Start

Steps to developer the hat.  Need a correction factor because hat is at an angle.

#### Black baseball cap with transparent background
![start black hat](https://res.cloudinary.com/cloudinary-training/image/upload//baseball-cap.png)

#### Make the cap white and auto everything and high res
![make it white](https://res.cloudinary.com/cloudinary-training/image/upload/e_replace_color:ffffff:30:111111,dpr_2.0,f_auto,q_auto/baseball-cap)

#### Add variable for height and width and apply to baseball had
![height and width through variables](https://res.cloudinary.com/cloudinary-training/image/upload/$horizontal_500,$vertical_500,h_$vertical,w_$horizontal,c_fit,e_replace_color:ffffff:30:111111,dpr_2.0,f_auto,q_auto/baseball-cap)

#### Add a logo overlay and use (default) g_center (gravity center) 
provide a variable for the width of the logo

![add over lay centered on image](https://res.cloudinary.com/cloudinary-training/image/upload/$horizontal_500,$vertical_500,$logowidth_200,w_$horizontal,h_$vertical,c_fit,e_replace_color:ffffff:30:111111,dpr_2.0,f_auto,q_auto/l_logo-big,c_scale,w_$logowidth,g_center,f_auto,q_auto/baseball-cap)

#### Refactor and Correct for angle of the hat
* drive all measurements off of width
* use width dimension and logo width is 2/5 or .4 of width (logo has natural ar 1:1)
* create correction factors for x,y placement based on gravity north and make them multiples of width

![refactor](https://res.cloudinary.com/cloudinary-training/image/upload/$width_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4/c_scale,w_$width/c_fit,g_north,l_logo-big,w_$width_mul_$logoscalar,x_$width_mul_$correctx,y_$width_mul_$correcty,f_auto,q_auto/dpr_2.0,e_replace_color:ffffff:30:111111,f_auto,q_auto/baseball-cap)

#### Make hat color variable

![variable hat color](https://res.cloudinary.com/cloudinary-training/image/upload/$width_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!ffffff!/c_scale,w_$width/c_fit,g_north,l_logo-big,w_$width_mul_$logoscalar,x_$width_mul_$correctx,y_$width_mul_$correcty,f_auto,q_auto/dpr_2.0,e_replace_color:$color:30:111111,f_auto,q_auto/baseball-cap)




