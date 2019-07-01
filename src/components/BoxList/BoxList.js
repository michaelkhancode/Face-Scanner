import React from 'react';
import './BoxList.css';

const BoxList = ( { box } ) => {

    let boxList = box.map( (box,i) => {
        return (
            <div
            key={i}
            className='bounding-box' 
            style={{
                top:box.toprow, 
                right:box.rightcol, 
                bottom:box.bottomrow, 
                left:box.leftcol
            }}
            >
            </div>   
        );
    });
    console.log( boxList )
    return boxList
}

export default BoxList;
