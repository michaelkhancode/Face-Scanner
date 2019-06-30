import React from 'react';
import "./ImageLinkForm.css"

const ImageLinkForm = ({ onInputChange, onButtonSubmit, imageURL }) => {

    return(
        <div className='form'>
            <div className="center">
                <p className='f3'>
                    {`This Majic Scanner Will Detect Faces In Your Picture`}
                </p>
            </div>

            <div className='center w-70 pa4 br3 shadow-2'>
                <input
                    defaultValue = {imageURL}
                    className='f4 pa2 w-60' type="text"
                    onChange = {onInputChange}
                />
                <button 
                    className='f4 grow w-40 link ph3 pv2 dib white bg-light-purple'
                    onClick = {onButtonSubmit}
                >
                    Scan
                </button>
            </div>
        </div>
    );
};

export default ImageLinkForm;
