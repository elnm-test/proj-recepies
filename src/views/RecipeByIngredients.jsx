import React, { Component } from 'react';
import AppMainTemplate from '../components/AppMainTemplate';
import { connect } from 'react-redux';
import { addExistIngToList, removeExistIngFromList } from '.././actions/mealsActions';
import utilService from '../services/utilService';
import { RiChatDeleteLine } from "react-icons/ri";
import { BiPlusCircle } from "react-icons/bi";


export class RecipeByIngredients extends Component {
    state = {
        searchedIng: {
            txt: '',
            color: '#000000'
        }
    }

    handleSearchIngChanged = (e, field) => {
        const { value } = e.target;
        this.setState((prevState) => {
            const searchedIng = Object.assign({}, prevState.searchedIng);
            searchedIng.txt = value;
            return { searchedIng };
        })
    }

    addExistIng = () => {
        const { searchedIng } = this.state;
        const { addExistIngToList,existIngList } = this.props;
        //Input Field Cannot Be Empty
        if (existIngList.length < 6 && searchedIng.txt) {
            //Setting Uniqe color
            searchedIng.color = utilService.getColor();
            addExistIngToList(searchedIng);
            this.setState((prevState) => {
                const searchedIng = Object.assign({}, prevState.searchedIng);
                searchedIng.txt = ''
                searchedIng.color = '#000000';
                return { searchedIng };
            });
        }
    }

    removeExistIng = (idx) => {
        const { removeExistIngFromList } = this.props;
        removeExistIngFromList(idx);
    }

    handleKeyPressClicked = (e) => {
        if(e.charCode === 13){
            this.addExistIng();
        }
    }

    createExistIngTemplate = () => {
        const { existIngList } = this.props;

        return existIngList.map((ing, idx) => {
            return (<li className="flex row center justify-start" key={idx}>
                <span className="list-dot" style={{ backgroundColor: `${ing.color}` }}></span>
                <span className="ing-txt">{ing.txt}</span>
                <span className="ing-icon flex row center btn" onClick={() => this.removeExistIng(idx)}>
                    <RiChatDeleteLine />
                </span>

            </li>);
        })
    }


    render() {
        const { searchedIng } = this.state;
        const elExistIngList = this.createExistIngTemplate();

        return (
            <div className="recepies-container">
                <AppMainTemplate type={"ing"}>
                    <div className="ing-search flex row center">
                        <input onKeyPress={(e) => {this.handleKeyPressClicked(e)}} className="search-input" onChange={(e) => this.handleSearchIngChanged(e, 'searchedIng')} value={searchedIng.txt} type="text" placeholder="Search Ingredient ... " />
                        <div onClick={this.addExistIng} className="add-btn flex row center"><BiPlusCircle /></div>
                    </div>
                    <ul className="ing-list-wrapper clean-list flex column justify-start align-start wrap">
                        {elExistIngList}
                    </ul>
                </AppMainTemplate>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const { existIngList } = state.meals;
    return {
        existIngList
    }
}

const mapDispatchToProps = {
    addExistIngToList,
    removeExistIngFromList
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeByIngredients);
