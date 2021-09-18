import React, { Component } from 'react';
import AppMainTemplate from '../components/AppMainTemplate';
import { connect } from 'react-redux';
import { updateNutrientsValue } from '../actions/mealsActions';


export class RecipeByNutrients extends Component {

    checkNutrientsValid = (field, key) =>{
        let isValid = true;

        switch(field){
            case "maxCalories": {
                //Cannot Has A Value Higher Than 800
                isValid = !(key > 800);
                break;
            }
            default: {
                isValid = !(key < 0 || key > 100);
                break;
            }
        }
        return isValid;
    }


    handleInputChange = (e) => {
        const { updateNutrientsValue } = this.props;
        const { value, id } = e.target;
        if (!isNaN(value) && this.checkNutrientsValid(id, value)) {
            updateNutrientsValue(id, value);
        } else e.target.value = '';
    }

    render() {
        return (
            <div className="recepies-container">
                <AppMainTemplate type={"nut"}>
                    <div onChange={this.handleInputChange} className="nut-search-container flex column center align-start">
                        <div>
                            <label htmlFor="minCarbs">Carbs :</label>
                            <input placeholder="Min" id="minCarbs" ></input>
                            <input placeholder="Max" id="maxCarbs" ></input>
                        </div>
                        <div>
                            <label htmlFor="minProtein">Proteins :</label>
                            <input placeholder="Min" id="minProtein" ></input>
                            <input placeholder="Max" id="maxProtein" ></input>
                        </div>
                        <div>
                            <label htmlFor="minCalories">Calories :</label>
                            <input placeholder="Min" id="minCalories" ></input>
                            <input placeholder="Max" id="maxCalories" ></input>
                        </div>
                        <div>
                            <label htmlFor="min-sugar">Sugar :</label>
                            <input placeholder="Min" id="minSugar" ></input>
                            <input placeholder="Max" id="maxSugar" ></input>
                        </div>
                        <div>
                            <label htmlFor="min-fat">Fat :</label>
                            <input placeholder="Min" id="minFat" ></input>
                            <input placeholder="Max" id="maxFat" ></input>
                        </div>
                    </div>
                </AppMainTemplate>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { nutrientsList } = state.meals;
    return {
        nutrientsList
    }
}

const mapDispatchToProps = {
    updateNutrientsValue
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeByNutrients);
