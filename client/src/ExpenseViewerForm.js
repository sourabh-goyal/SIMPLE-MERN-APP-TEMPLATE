import React from 'react'
import moment from 'moment'
import 'antd/dist/antd.min.css'
import ExpenseView from './ExpenseView';
import {Button, DatePicker, Form, message} from 'antd'
import NetworkHelper from './networkhelper';

const parseExpensesResponse = (response) => {
  return response.map((item) => {
    return {
      ...item,
      key: item._id,
      date: moment(item.date)
    }
  })
}

const formItemLayout = {
    colon: false,
    labelAlign: 'left',
    labelCol: {xs: {span: 24}, sm: {span: 8,}},
    wrapperCol: {xs: {span: 24}, sm: {span: 16,}}
  };

class ViewForm extends React.Component {

  constructor (props) {
    super (props);
    this.handleSubmit = props.handleSubmit;
  }

  render () {
    return (
      <Form {...formItemLayout} onSubmitCapture={this.handleSubmit}>
          <Form.Item label='Start Date'> <DatePicker name='startDate'/></Form.Item>
          <Form.Item label='End Date'> <DatePicker name='endDate'/></Form.Item>
          <Form.Item> <Button type="primary" htmlType="submit">Submit</Button></Form.Item>
        </Form>
    )
  }
}

class ExpenseViewerForm extends React.Component {
    constructor (props) {
      super (props);
      this.state = {showExpenses: false};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.setState({data: []});
    }    

    async handleSubmit (event) {
      event.preventDefault();
      try {
        message.loading({content: 'Retrieving your data ..', duration: 0, key: "tableLoading"});
        const response = await NetworkHelper.viewExpenses({
          start_date: event.target.startDate.value,
          end_date: event.target.endDate.value
        })
        this.setState({data: parseExpensesResponse(response)});
        this.setState({showExpenses: true});
        message.destroy("tableLoading");
      } catch (e) {
        this.setState({showExpenses: false, data: []});
        message.error("something went wrong");
      }
    } 

    handleReset () {
      this.setState({showExpenses: false, data: []});
    }

    render () {
      const {showExpenses} = this.state;
      return (
        <div>
        { 
        showExpenses ? 
          <ExpenseView handleReset={this.handleReset} expenseData = {this.state.data}></ExpenseView> :
          <ViewForm handleSubmit={this.handleSubmit}/>
        }
        </div>
      )
    }
  }

  export default ExpenseViewerForm