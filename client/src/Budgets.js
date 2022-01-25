import React from 'react';
import 'antd/dist/antd.min.css'
import {Progress, Space} from 'antd';
import {Tags, BudgetLimits} from './constants';

class Budgets extends React.Component {
    render () {
        return (
            <Space>
                <Progress type="circle" percent={75} width={80}></Progress>
            </Space>
        )
    }
}

export default Budgets