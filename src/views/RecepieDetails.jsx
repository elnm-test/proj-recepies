import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import utilService from '../services/utilService';
//import mealsService from '../services/mealsService';
//import Parser from 'html-react-parser';
import DOMPurify from 'dompurify';
import TasteChart from '../components/TasteChart';

import dessert1 from '../styles/assets/imgs/dessert/dessert1.jpg';
import dessert2 from '../styles/assets/imgs/dessert/dessert2.jpg';
import dessert3 from '../styles/assets/imgs/dessert/dessert3.jpg';
import dessert4 from '../styles/assets/imgs/dessert/dessert4.jpg';

import food1 from '../styles/assets/imgs/food/food1.jpg';
import food2 from '../styles/assets/imgs/food/food2.jpg';
import food3 from '../styles/assets/imgs/food/food3.jpg';
import food4 from '../styles/assets/imgs/food/food4.jpg';

function RecepieDetails({ recepieToShow }) {

    const SUMMARY_MAX_LENGTH = 650;

    function renderDishTypes(dishTypes) {
        return dishTypes.map((dish) => {
            return (<div className="dish-type-tag">{dish}</div>)
        })
    }

    function renderInstructions(steps) {
        return steps.length ? steps.map((s, idx) => {
            return (<div key={idx} className="step-row flex row center justify-start">
                <div className="step-num">{s.number}</div>
                <div className="step-txt">{s.step}</div>
            </div>)
        }) : null;
    }

    function setUpperCaseFirstLetter(str) {
        return str.name.charAt(0).toUpperCase() + str.name.substring(1)
    }

    function getDataFromInstructions(instructions) {
        let equips = [];
        let ings = [];
        let ingTitles = [];
        let equipTitles = [];

        instructions.forEach((step) => {
            const { ingredients, equipment } = step;
            ingredients.forEach((ing) => {
                ings.push({ name: setUpperCaseFirstLetter(ing) });

            })
            equipment.forEach((equip) => {
                equips.push({ name: setUpperCaseFirstLetter(equip) });
            })
        })
        ings.forEach(ing => {
            ingTitles.push(ing.name);
        });

        equips.forEach(ing => {
            equipTitles.push(ing.name);
        });


        return [ingTitles, equipTitles]
    }

    // Change Function GET img url from spoonacular
    function getRecepieImg(dishTypes) {
        //If dishTypes is dessert chose img from dessert folder
        let isDessert = dishTypes.join(',').includes('dessert');
        let rndNum = utilService.getRandomIntInclusive(1, 4);
        let dessertImgs = {
            'dessert1': dessert1,
            'dessert2': dessert2,
            'dessert3': dessert3,
            'dessert4': dessert4
        }
        let foodImgs = {
            'food1': food1,
            'food2': food2,
            'food3': food3,
            'food4': food4
        }

        return ((isDessert) ? dessertImgs[`dessert${rndNum}`] : foodImgs[`food${rndNum}`]);
    }

    // async function visualizeTaste(ingList) {
    //     const res = await mealsService.visualizeTaste(ingList);
    //     console.log(res);

    //     setTasteTemplate(res.data);
    // }

    function createRecepieToShowTemplate(recepie) {
        const { title, summary, readyInMinutes, aggregateLikes, dishTypes, analyzedInstructions } = recepie.data;
        const { steps } = analyzedInstructions[0];
        const recepieRating = aggregateLikes > 5 ? 5 : aggregateLikes;
        const summaryUnsanitizedStr = summary.substring(0, SUMMARY_MAX_LENGTH) + '...';

        const elLikes = utilService.renderRating(recepieRating);
        const elDishTypes = renderDishTypes(dishTypes);
        const elInstructions = renderInstructions(steps);
        const [ingTitles, equipTitles] = getDataFromInstructions(steps);
        const imgUrl = getRecepieImg(dishTypes);


        return (
            <React.Fragment>
                <div className="recepie-details-basic flex row">
                    <div>
                        <h1>{title}</h1>
                        <div className="flex row center justify-start">
                            <div className="flex row center justify-start">{elLikes}</div>
                            <div className="prep-time">{readyInMinutes} Min</div>
                        </div>
                        <div className="summary" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summaryUnsanitizedStr) }}></div>
                        <div className="dish-type-container flex row center justify-start">
                            {elDishTypes}
                        </div>
                    </div>
                    <div className="flex row center align-start">
                        <img src={imgUrl} alt="" />
                    </div>
                </div>
                <div className="recepie-details-extend flex row">

                    <div className="instructions-container">
                        <h2>Instructions</h2>
                        <div className="instructions-general-data"><span>Required Ingredients : </span>{ingTitles.join(', ')}</div>
                        <div className="instructions-general-data"><span>Required Equipment : </span>{equipTitles.join(', ')}</div>
                        {elInstructions}
                    </div>
                    <div className="flex row center">
                        {/* {Parser(tasteTemplate)} */}
                        <TasteChart />
                    </div>

                </div>
                <div>
                </div>
            </React.Fragment>
        );
    }

    //const t = mealsService.VisualizeRecipeNutritionById(recepieToShow.data.id);

    const elRecepieToShow = createRecepieToShowTemplate(recepieToShow);

    return (
        <div className="recepie-details-container">
            {elRecepieToShow}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { recepiesByIng, recepiesByNut } = state.meals;
    const recepies = [...recepiesByIng, ...recepiesByNut];
    const { id } = ownProps.match.params;

    const recepieToShow = recepies.find((recepie) => {
        return recepie.id.toString() === id
    });

    return {
        recepieToShow
    }
}

export default connect(mapStateToProps)(withRouter(RecepieDetails));
