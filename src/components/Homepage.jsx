import React from 'react';

function Homepage({history}) {

    function moveToPage(path) {
        history.push(`/${path}`)
    }

    return (
        <div className="homepage-container flex column center">
            <h1>Discover New Recepies</h1>
            <div className="homepage-btns-container flex row center">
                <div onClick={() => {moveToPage('ingredients')}} className="homepage-btn">By Ingredients</div>
                <div onClick={() => {moveToPage('nutrients')}} className="homepage-btn">By Nutrients</div>
            </div>
        </div>
    )
}

export default Homepage
