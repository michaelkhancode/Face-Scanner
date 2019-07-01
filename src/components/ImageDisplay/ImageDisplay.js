import React from 'react';
import './ImageDisplay.css';
import BoxList from '../BoxList/BoxList';

const ImageDisplay = ({ imageURL, box }) => {
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img    
                    id='userImage' 
                    alt= ""
                    width='500px' 
                    height="auto" 
                    src= { imageURL } 
                />
                <BoxList className='bounding-box' box={box} />
            </div>
        </div>
    );
};

export default ImageDisplay;