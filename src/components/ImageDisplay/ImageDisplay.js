import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ imageURL, box }) => {
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img id='userImage' width='500px' height="auto" src= { imageURL } />
                <div className='bounding-box' style={{top:box.toprow, right:box.rightcol, bottom:box.bottomrow, left:box.leftcol}}></div>
            </div>
        </div>
    );
};

export default ImageDisplay;