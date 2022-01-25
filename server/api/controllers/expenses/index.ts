import {IExpenseObject, IExpensesController} from './interface'
import ExpenseDao from './../../models/expenses'
const ExpenseController = {} as IExpensesController;

ExpenseController.addExpense = async (params): Promise<any> => {
    return ExpenseDao.create(params);
}

ExpenseController.viewExpenses = async (params): Promise<IExpenseObject[]> => {
    return ExpenseDao.viewExpenses(params);
}

ExpenseController.deleteExpense = async (params): Promise<any> => {
    return ExpenseDao.deleteExpense(params);
}

ExpenseController.updateExpense = async (params): Promise<any> => {
    return ExpenseDao.updateExpense(params);
}

export default ExpenseController;