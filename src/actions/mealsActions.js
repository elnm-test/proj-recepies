import {
    ADD_EXIST_ING,
    REMOVE_EXIST_ING,
    INIT_RECEPIES_BY_INGREDIENTS,
    INIT_RECEPIES_BY_NUTRIENTS,
    UPDATE_NUTRIENTS_VALUE
} from "./actionsType";
import mealsService from '../services/mealsService';

/* Action Creators */

export const initRecepiesByIngredients = (ings) => {
    return async (dispatch) => {
        //Call DB / API
        const recepies = await mealsService.getRecepiesByIngredients(ings);
        return dispatch(_initRecepiesByIngredients(recepies));
    }
}

export const initRecepiesByNutrients = (nutrients) => {
    return async (dispatch) => {
        const recepies = await mealsService.getRecepiesByNutrients(nutrients);
        return dispatch(_initRecepiesByNutrients(recepies));

    }
}

export const addExistIngToList = (ing) => {
    return async (dispatch) => {
        //--- update DB ---
        return dispatch(_addExistIngToList(ing))
    }
}

//TODO - SHOLUD BE WITH ID
export const removeExistIngFromList = (idx) => {
    return async (dispatch) => {
        //--- update DB ---
        return dispatch(_removeExistIngFromList(idx))
    }
}

export const updateNutrientsValue = (field, value) => {
    return async (dispatch) => {
        //--- update DB ---

        return dispatch(_updateNutrientsValue(field, value))
    }
}



/* Actions */

export const _initRecepiesByIngredients = (recepies) => {
    return {
        type: INIT_RECEPIES_BY_INGREDIENTS,
        recepies
    }
}

export const _initRecepiesByNutrients = (recepies) => {
    return {
        type: INIT_RECEPIES_BY_NUTRIENTS,
        recepies
    }
}


const _addExistIngToList = (ing) => {
    return {
        type: ADD_EXIST_ING,
        ing
    }
}

const _removeExistIngFromList = (idx) => {
    return {
        type: REMOVE_EXIST_ING,
        idx
    }
}

const _updateNutrientsValue = (field, value) => {
    return {
        type: UPDATE_NUTRIENTS_VALUE,
        data: { field, value }
    }
}