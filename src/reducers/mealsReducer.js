import {
    ADD_EXIST_ING,
    REMOVE_EXIST_ING,
    INIT_RECEPIES_BY_INGREDIENTS,
    INIT_RECEPIES_BY_NUTRIENTS,
    UPDATE_NUTRIENTS_VALUE,
} from '../actions/actionsType';

const INITIAL_STATE = {
    recepiesByIng: [],
    recepiesByNut: [],
    existIngList: [{ txt: 'Milk', color: '#000000' }, { txt: 'apple', color: '#FF0000' }, { txt: 'butter', color: '#0000FF' }],
    nutrientsList: {
        minCarbs: null,
        maxCarbs: null,
        minProtein: null,
        maxProtein: null,
        minCalories: null,
        maxCalories: null,
        minSugar: null,
        maxSugar: null,
        minFat: null,
        maxFat: null
    }
};

function mealsReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case ADD_EXIST_ING:
            {
                const { ing } = action;
                const { existIngList } = state;
                const newExistIngList = [...existIngList, ing];

                return {
                    ...state,
                    existIngList: newExistIngList
                }
            }

        case REMOVE_EXIST_ING:
            {
                //CAN BE DONT WITH FILTER / SPLICE
                const { idx } = action;
                const { existIngList } = state;
                const newExistIngList = [
                    ...existIngList.slice(0, idx),
                    ...existIngList.slice(idx + 1)
                ];

                return {
                    ...state,
                    existIngList: newExistIngList
                }
            }
        case INIT_RECEPIES_BY_INGREDIENTS:
            {
                const { recepies } = action;
                return {
                    ...state,
                    recepiesByIng: recepies
                }
            }
        case INIT_RECEPIES_BY_NUTRIENTS: {
            const { recepies } = action;
            return {
                ...state,
                recepiesByNut: recepies
            }
        }

        case UPDATE_NUTRIENTS_VALUE:
            {
                const { data } = action;
                const { nutrientsList } = state;
                const newExistNutList = { ...nutrientsList };
                newExistNutList[data.field] = data.value;
                return {
                    ...state,
                    nutrientsList: newExistNutList
                }
            }

        default:
            return state;
    }
}

export default mealsReducer;