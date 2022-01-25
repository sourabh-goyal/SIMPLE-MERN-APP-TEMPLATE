import React from 'react'
import 'antd/dist/antd.min.css'
import {Button, Space, } from 'antd'
import './App.css'
import ExpenseForm from './ExpenseForm'
import ExpenseViewerForm from './ExpenseViewerForm'
import Budgets from './Budgets'


class App extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      showExpenseForm: false,
      showExpenseViewer: false,
      showBudgets: false
    }
    this.handleAddExpenseButton = this.handleAddExpenseButton.bind(this);
    this.handleViewExpenseButton = this.handleViewExpenseButton.bind(this);
    this.handleViewBudgetsButton = this.handleViewBudgetsButton.bind(this);
  }

  handleAddExpenseButton () {
    this.setState({showExpenseForm: true, showExpenseViewer: false, showBudgets: false});
  }

  handleViewExpenseButton () {
    this.setState({showExpenseForm: false, showExpenseViewer: true, showBudgets: false});
  }

  handleViewBudgetsButton () {
    this.setState({showExpenseForm: false, showExpenseViewer: false, showBudgets: true});
  }

  render () {
    const {showExpenseViewer, showExpenseForm, showBudgets} = this.state;
    return (
        <div className='center-screen'>
          <Space direction='vertical' align='center' wrap='true'>
            <Button type="primary" onClick={this.handleAddExpenseButton}>Add Expense</Button>
            <Button type="primary" onClick={this.handleViewExpenseButton}>View Expenses</Button>
            <Button type="primary" onClick={this.handleViewBudgetsButton}>Budgets</Button>
          </Space><br/><br/>
          {showExpenseForm ? <ExpenseForm/>: null} 
          {showExpenseViewer ?  <ExpenseViewerForm/>: null}
          {showBudgets ? <Budgets/>: null}
        </div>
    );
  }
}

export default App;
