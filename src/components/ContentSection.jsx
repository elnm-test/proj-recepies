import React, { Component } from 'react'

export class ContentSection extends Component {
    render() {
        const { type: template } = this.props;
        let elContentTitle = '';
        let elContentText = '';

        switch (template) {
            case "ing": {
                elContentTitle = "Whats In My Fridge?"
                elContentText = `Got a few slices of leftover bread,
                an odd onion in your cupboard and some milk in the fridge? Our recipe finder tool will show
                you all the things you can make, so none of your food goes to waste, with only a few added ingredients needed.`
                break;
            }
            //nut type
            default: {
                elContentTitle = "Search Recipes by Nutrients";
                elContentText = `Put your diet on autopilot . personalized meal plans based on your food nutrition preferences. 
                Reach your diet and nutritional goals with our magic Recepie finder.`
                break;
            }

        }

        return (
            <React.Fragment>
                <h1 className="content-section-title">{elContentTitle}</h1>
                <p className="content-section-text">{elContentText}</p>
            </React.Fragment>
        )
    }
}

export default ContentSection
