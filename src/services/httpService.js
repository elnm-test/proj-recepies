import Axios from 'axios';

const BASE_URL  = (process.env.NODE_ENV === 'production')? '/': '';
const axios = Axios.create({
    withCredentials:false
})

const exportedObj = {
    get(endPoint){
        return ajax(endPoint,'GET')
    },
    post(endPoint,data){
        return ajax(endPoint,'POST',data)
    },
    put(endPoint,data){
        return ajax(endPoint,'PUT',data)
    },
    remove(endPoint, data){
        return ajax(endPoint,'DELETE',data)
    }
}
export default exportedObj;


async function ajax(endPoint,method,data = null){
    try{
        const res = await axios({
            url:`${BASE_URL}${endPoint}`,
            method,
            data
        })
        return res;

    }catch(err){
        //TODO - Create Custom Errors
        console.log('Error Ajax Request!')
    }
}
