import React from 'react';
import "./Rank.css"

const Rank = (props) => {
    const { name, entries, } = props.user;
    return(
        <div>
            <div className="white f3">
                {`hello ${name}, Your Rank is`}
            </div>
            <div className="white f1">
                {`#${entries}`}
            </div>
        </div>
    );
};

export default Rank;
