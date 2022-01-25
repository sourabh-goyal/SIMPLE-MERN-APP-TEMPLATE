import axios from 'axios'
const BASE_URL = "http:://localhost:3000";

const postRequest = async (payload, method) => {
    const body = {
        params: payload
    }
    return axios.post(BASE_URL+method, body);
}

const addExpense = async (payload) => {
   return postRequest(payload, 'addExpense');
}

const deleteExpense = async (payload) => {
   return postRequest(payload, 'deleteExpense');
}

const updateExpense = async (payload) => {
   return postRequest(payload, 'updateExpense');
}

const viewExpenses = async (payload) => {
    const response = await postRequest(payload, 'getExpenses');
    return response.data;
}

const NetworkHelper = {
    addExpense,
    deleteExpense,
    updateExpense,
    viewExpenses
}

export default NetworkHelper;
