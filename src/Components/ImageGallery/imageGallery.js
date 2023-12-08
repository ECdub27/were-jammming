import React from 'react';
import Typography from '@mui/material/Typography';
import imagesObj from '../../Images/images';
import { ImageList } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';





const ImageGallery = () =>{
    return ( 
        <div>
            <Typography color='#FDB927'>
        <h2>Here are some of my favorite albums from past and present to get you started!</h2>
        </Typography>
<ImageList sx={{width: 500, height: 450,}} cols={3} rowHeight={164}>
   {
    imagesObj.map((item) =>(
        <ImageListItem key = {item.img}>
            <img 
            src={`${item.img}`}
            alt={`${item.title}`}
            loading='lazy'
            />
        </ImageListItem>
    ))}

</ImageList>
</div>
);
};


 
export default ImageGallery;