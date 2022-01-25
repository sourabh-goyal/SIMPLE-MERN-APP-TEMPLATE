import React from 'react'
import 'antd/dist/antd.min.css'
import moment from 'moment'
import {Button, DatePicker, Form, Input, Select, InputNumber, message } from 'antd'
import './App.css'
import Constants from './constants'
import networkHelper from './networkhelper'
const { Option } = Select;
const Tags = Constants.Tags;

const formItemLayout = {
    colon: false,
    labelAlign: 'left',
    labelCol: {xs: {span: 24}, sm: {span: 8,}},
    wrapperCol: {xs: {span: 24}, sm: {span: 16,}}
  };

  const selectBefore = (
    <Select defaultValue="Debit">
      <Option value='Credit'>+</Option>
      <Option value="Debit">-</Option>
    </Select>
  );

class ExpenseForm extends React.Component {
  
    constructor (props) {
      super (props);
      this.state = {
        expander: "Sourabh",
        tags: [],
        isLoading: false
      }
    }

    render () {
      const handleSubmit =  async (event) => {
        event.preventDefault();
        this.setState({isLoading: true})
        const body = {
          description: event.target.description.value,
          amount: event.target.amount.value,
          date: moment(event.target.date.value).toISOString(),
          expander: this.state.expander,
          tags: this.state.tags,
        };
        try {
          await networkHelper.addExpense(body);
          message.success('Expense Added Successfully');
        } catch (e) {
          message.error('Something went wrong!');
          console.log(e);
        }
        this.setState({isLoading:  false});
      }

      return (
        <Form {...formItemLayout} onSubmitCapture={handleSubmit}>
            <Form.Item label="Description"  rules={[{required: true, message:"please enter description"}]}>
                <Input name="description" /></Form.Item>
            <Form.Item label="amount" rules={[{required: true, message:"please enter amount"}]}> 
                <InputNumber addonBefore={selectBefore} addonAfter="₹" defaultValue={0} name='amount' /></Form.Item>
            <Form.Item label="date" rules={[{required: true, message:"please enter date"}]}> 
                <DatePicker name="date"/></Form.Item>
            <Form.Item label="expense by">
            <Select name="expander" defaultValue="Sourabh" onChange={value => {
                this.setState({ expander: value });
              }}>
            <Option value="Swapnil">Swapnil</Option>
            <Option value="Sourabh">Sourabh</Option>
            </Select></Form.Item>
            <Form.Item label="tags">
                <Select mode="tags" name="tags" placeholder="Tags" onChange={value => {this.setState({ tags: value });}}>
                  {Tags.map(tag => {return <Option key={tag}>{tag}</Option>})}
                </Select>
            </Form.Item>
            <Form.Item><Button type="primary" htmlType="submit" loading={this.state.isLoading}>Submit</Button></Form.Item>
      </Form>
      )
    }
  }

  export default ExpenseForm;