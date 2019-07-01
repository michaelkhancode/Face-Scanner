import React from 'react';

const Navagation = ({route, onRouteChange}) => {
    console.log( route === "signin" || route === "register" , route )
    return(
        <div >
            {route === "signin" || route === "register"
            ?
            <div style = {{display:'flex', justifyContent:"flex-end"}}>
                <p 
                    className='f3 link dim black underline pa3 pointer'
                    onClick = {() => onRouteChange("signin")}
                >
                    Sign In
                </p>
                <p 
                    className='f3 link dim black underline pa3 pointer'
                    onClick = {() => onRouteChange("register")}
                >
                    Register
                </p>
            </div>
            :
            <div style = {{display:'flex', justifyContent:"flex-end"}}>
                <p 
                    className='f3 link dim black underline pa3 pointer'
                    onClick = {() => onRouteChange("signin")}
                >
                    Sign Out
                </p>
            </div> 
            }
        </div>
    );
};

export default Navagation;
