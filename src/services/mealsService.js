import httpService from './httpService';

const BASE_URL = 'https://api.spoonacular.com/recipes';
const RES_LIMIT = 5;

async function getRecepiesByIngredients(ings) {

    const endPointIng = `findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=`;
    const endPointBulkInfo = `informationBulk?apiKey=${process.env.REACT_APP_API_KEY}&ids=`;

    let ingListStr;
    let recepiesIdsStr;

    let ingList = [];
    let partialRecepies = [];
    let bulkRecepies = [];
    let recepiesId;
    let extenedRecepies = []; // All The relavent data map to one object

    ingList = ings.map((ingObj) => { return ingObj.txt });

    //Format Ingredients Items for GET Call
    ingListStr = ingList.join(',').replaceAll(',', ',+');
    //GET : Recepies Partial List ( partial info ) 
    partialRecepies = await httpService.get(`${BASE_URL}/${endPointIng}${ingListStr}&number=${RES_LIMIT}`);

    //create recepies ids list
    recepiesId = (partialRecepies && partialRecepies.data) ? partialRecepies.data.map((recepie) => {
        let { id, missedIngredientCount, missedIngredients, usedIngredientCount, usedIngredients } = recepie;
        //Init ExtendRecepies object with the relavnt / wanted properties - (GET : partial recepies)
        extenedRecepies.push({
            id,
            missedIngredientCount,
            missedIngredients,
            usedIngredientCount,
            usedIngredients
        })
        return recepie.id;
    }) : [];

    //Format recepies ids for GET Call
    recepiesIdsStr = recepiesId.join(',');

    //GET : Bulk recepies information
    bulkRecepies = await httpService.get(`${BASE_URL}/${endPointBulkInfo}${recepiesIdsStr}`);
    //Add Data property - represent addtional information about the recepie - (GET : Bulk recepies)
    extenedRecepies.forEach((extenedRecepie, idx) => {
        var res = bulkRecepies.data.find((bulkRecepie) => {
            return bulkRecepie.id === extenedRecepie.id;
        })
        extenedRecepies[idx].data = res;
    })
    //Return Full Recepie Info
    return extenedRecepies;

}

async function getRecepiesByNutrients(nutrients) {
    const endPointNut = `findByNutrients?apiKey=${process.env.REACT_APP_API_KEY}&`;
    const endPointBulkInfo = `informationBulk?apiKey=${process.env.REACT_APP_API_KEY}&ids=`;

    let nutrientsListEndpoint = '';
    let partialRecepies = [];
    let bulkRecepies = [];
    let recepiesId;
    let recepiesIdsStr;
    let extenedRecepies = []; // All The relavent data map to one object

    //Format All Nutrinets
    for (let key in nutrients) {
        if (nutrients[key] !== null && nutrients[key] !== undefined) {
            nutrientsListEndpoint += `${key}=${nutrients[key]}&`;
        }
    }

    //GET : Recepies Partial List ( partial info ) 
    partialRecepies = await httpService.get(`${BASE_URL}/${endPointNut}${nutrientsListEndpoint}&number=${RES_LIMIT}`);

    //create recepies ids list
    recepiesId = (partialRecepies && partialRecepies.data) ? partialRecepies.data.map((recepie) => {
        let { id, missedIngredientCount, missedIngredients, usedIngredientCount, usedIngredients } = recepie;
        //Init ExtendRecepies object with the relavnt / wanted properties - (GET : partial recepies)
        extenedRecepies.push({
            id,
            missedIngredientCount,
            missedIngredients,
            usedIngredientCount,
            usedIngredients
        })
        return recepie.id;
    }) : [];

    //Format recepies ids for GET Call
    recepiesIdsStr = recepiesId.join(',');

    //GET : Bulk recepies information
    bulkRecepies = await httpService.get(`${BASE_URL}/${endPointBulkInfo}${recepiesIdsStr}`);
    //Add Data property - represent addtional information about the recepie - (GET : Bulk recepies)
    extenedRecepies.forEach((extenedRecepie, idx) => {
        var res = bulkRecepies.data.find((bulkRecepie) => {
            return bulkRecepie.id === extenedRecepie.id;
        })
        extenedRecepies[idx].data = res;
    })

    return extenedRecepies;
}


function visualizeTaste(ingList){
    return httpService.post(`${BASE_URL}/visualizeTaste?apiKey=${process.env.REACT_APP_API_KEY}&ingredientList=${ingList.join('\n')}`);
}

async function VisualizeRecipeNutritionById(id){
    var x = await httpService.get(`${BASE_URL}/${id}/nutritionWidget?apiKey=${process.env.REACT_APP_API_KEY}`);
    return x;
}

const exportedObj = {
    getRecepiesByIngredients,
    getRecepiesByNutrients,
    visualizeTaste,
    VisualizeRecipeNutritionById
}

export default exportedObj;