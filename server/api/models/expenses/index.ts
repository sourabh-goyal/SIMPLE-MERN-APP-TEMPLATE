import moment from 'moment';
import { IExpenseObject } from './../../controllers/expenses/interface';
import ExpenseModel from './expenses';

const expenseModel = {};

const create = async (params) => {
    return ExpenseModel.create({
     ...params,
     created_at: moment(),
     updated_at: moment(),  
    })
}

const viewExpenses = async (params): Promise<IExpenseObject[]> => {
    const query = {
        date: {
            $gte: moment(params.start_date), 
            $lte: moment(params.end_date)
        },
        active: true
    };
    return ExpenseModel.find(query).lean()
}

const deleteExpense = async (params): Promise<any> => {
    return ExpenseModel.updateOne(
        {
            _id: params.key
        }, 
        {
            $set: { 
                active: false, 
                updated_at: moment()
            }
        });
}

const updateExpense = async (params): Promise<any> => {
    return ExpenseModel.updateOne(
        {
            _id: params.key
        },
        {
            $set: {
                ...params,
                updated_at: moment()
            }
        })
}

export default {
    create,
    viewExpenses,
    deleteExpense,
    updateExpense
}