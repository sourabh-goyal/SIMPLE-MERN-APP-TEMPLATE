import React, {useState} from 'react'
import './App.css'
import 'antd/dist/antd.min.css'
import moment from 'moment';
import { CSVLink } from "react-csv";
import {
  Button, 
  Table, 
  Tag, 
  Space, 
  InputNumber, 
  Input, 
  Form, 
  Typography, 
  Popconfirm, 
  DatePicker, 
  Select,
  message
} from 'antd'
import {Tags} from './constants'
import { DownloadOutlined } from '@ant-design/icons';
import NetworkHelper from './networkhelper';

const {Option} = Select;
const OPERATION_TYPES = {
    EDIT: 'edit',
    DELETE: 'delete'
}
const DowndloadTable = ({ data }) => (
    <CSVLink
        className="ant-btn ant-btn-primary ant-btn-md"
        filename={`expense_report_${new Date().toLocaleDateString('en-GB')}.csv`}
        data={data}
        style={{margin: "20px"}}
    ><DownloadOutlined />  Download as CSV
    </CSVLink>
);
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const getInputNode = (inputType) => {
        if (inputType === 'number') {
            return <InputNumber/>
        } else if (inputType === 'date') {
            return <DatePicker format="DD-MM-YY"/>
        } else if (inputType === 'tags') {
            return <Select mode="tags" name="tags" placeholder="Tags">{Tags.map(tag => {return <Option key={tag}>{tag}</Option>})}</Select>
        } else return <Input/>
    }
    const inputNode = getInputNode(inputType);
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


  const EditableTable = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(props.data);
    const [editingKey, setEditingKey] = useState('');
    const [deletionKey, setDeletionKey] = useState('');
    const [operation, setOperaton] = useState('');
  
    const isEditing = (record) => record.key === editingKey;
    const isDeleting = (record) => record.key === deletionKey;
    const edit = (record) => {
      form.setFieldsValue({
          date: moment(record.date),
        ...record,
      });
      setEditingKey(record.key);
      setOperaton(OPERATION_TYPES.EDIT);
    };

    const deleteRecord = (record) => {
        setDeletionKey(record.key);
        setOperaton(OPERATION_TYPES.DELETE)
    }
  
    const cancel = () => {
      setEditingKey('');
      setDeletionKey('')
    };
  
    const updateRow = async (row, key) => {
      try {
        message.loading({content:"Action in Progress!", key:"updateRow", duration:0});
        await NetworkHelper.updateExpense({key, ...row});
        message.destroy("updateRow");
        message.success("Updated row successfully!")
      } catch (e) {
        message.destroy("updateRow");
        message.error("something went wrong!")
        console.log(e)
      }
    }

    const save = async (key) => {
        if (operation === OPERATION_TYPES.EDIT) {
          
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
          } else {
            newData.push(row);
          }
        
          updateRow(row, key);
          setData(newData);
          setEditingKey('');
        } else if (operation === OPERATION_TYPES.DELETE) {
            const dataSource = [...data];
            try {
              message.loading({content:"Deleting row, please wait!", key:"deleteRow", duration: 0})
              await NetworkHelper.deleteExpense({key})
              setData([...dataSource.filter((item) => item.key !== key)]);
              message.destroy("deleteRow")
              message.success("Deleted Row Succesfully!");
            } catch (e) {
              message.destroy("deleteRow")
              message.error("something went wrong!")
              console.log(e);
            }
            setDeletionKey('');
        }
      
    };
  
    const columns = [
      {
        title: 'Description',
        dataIndex: 'description',
        width: '100px',
        editable: true,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: '80px',
        editable: true,
      },
      {
        title: 'Spent by',
        dataIndex: 'expander',
        width: '100px',
        editable: true,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        width: '100px',
        editable: true,
        render: (_, record) => moment(record.date).format("DD-MM-YY")
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        width: '100px',
        editable: true,
        render: tags => (
            <>
            {tags.map(tag => (
                <Tag color="blue" key={tag}>
                {tag}
                </Tag>
            ))}
            </>
        )},
      {
        title: 'operation',
        dataIndex: 'operation',
        width: "100px",
        render: (_, record) => {
          const editable = isEditing(record);
          const deletable = isDeleting(record);
          return editable || deletable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
              <Space direction='vertical'>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Edit
                </Typography.Link>
                <Typography.Link disabled={deletionKey !== ''} onClick={() => deleteRecord(record)}>
                Delete
                </Typography.Link>
              </Space>
          );
        },
      },
    ];

    const getInputType = (dataIndex) => {
        let inputType = 'text';
        switch (dataIndex) {
            case 'amount':
                inputType='number';
                break;
            case 'date':
                inputType = 'date'
                break;
            case 'tags':
                inputType = 'tags';
                break;
            default:
                inputType = 'text';
        }
        return inputType;
    }

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: getInputType(col.dataIndex),
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          sticky
          size='small'
          scroll={{x: true, y: 300}}
          dataSource={data}
          columns={mergedColumns}
          pagination={{
            onChange: cancel,
          }}
        />
        <DowndloadTable data={data} />
      </Form>
    );
  };

class ExpenseView extends React.Component {
    constructor (props) {
        super(props);
        this.handleReset = props.handleReset;
    }
    render () {
        return (
          <div style={{marginLeft: "20px",  marginRight: "20px", marginTop:"20px"}}>
              <EditableTable data={this.props.expenseData}/>
              <Button type="primary" onClick={this.handleReset}>Reset</Button>
          </div>
        )
    }
}

export default ExpenseView