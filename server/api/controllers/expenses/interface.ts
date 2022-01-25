export interface IExpenseObject {
    description: string;
    amount: string;
    expander: string;
    date: Date;
    tags: string[];
    created_at?: Date;
    updated_at?: Date;
}

export interface IExpensesController {
    addExpense(params: IExpenseObject): Promise <any>;
    updateExpense(params: IExpenseObject): Promise <any>;
    deleteExpense(params: {key: string}): Promise <any>;
    viewExpenses(params: {start_date?: Date, end_date?: Date}): Promise <IExpenseObject[]>;
}