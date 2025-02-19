import React from 'react'
import { ConfigProvider, Modal, Button, Table, Space, Tag } from "antd";
import { theme as antdTheme } from 'antd';
import { useTheme } from "@/hooks/use-theme";

const columns = [
  {
    title: 'Phòng Ban',
    dataIndex: 'department',
    key: 'department',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Trưởng Phòng',
    dataIndex: 'manager',
    key: 'manager',
  },

  {
    title: 'Kích Hoạt',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => {
      let color = tags.length > 5 ? "geekblue" : "green";
      if (tags === "Loser") {
        color = "volcano";
      }
      return (
        <Tag color={color}>{tags}</Tag>
      )
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a className='font-medium '>Edit {record.name}</a>
        <a className='text-red-600 font-medium  '>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    department: 'PHÒNG BAN A',
    manager: 'Trần Quang Trường',
    tags: 'Loser',
  },
  {
    key: '2',
    department: 'PHÒNG BAN B',
    manager: 'Trần Quang Trường',
    tags: 'Active',
  },
  {
    key: '3',
    department: 'PHÒNG BAN C',
    manager: 'Trần Quang Trường',
    tags: 'Active',
  },
];

const Employee = () => {

  const { theme, setTheme } = useTheme();

  console.log('antdTheme', antdTheme)
  console.log('theme', theme)
    return (
    
         <Table columns={columns} dataSource={data} />
        
    
    );
     
  
}

export default Employee