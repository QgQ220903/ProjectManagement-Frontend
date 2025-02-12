import React, { useState } from 'react';

import { Space, Table, Tag } from 'antd';

import { Plus } from 'lucide-react';

import { Button, Modal } from 'antd';



  

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

const Department = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
          <h2 className='title'>Phòng Ban</h2>
          <button onClick={showModal} className='capitalize btn-primary flex gap-1'> <Plus/> Thêm phòng ban mới</button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
        
    </>
  ) 
}

export default Department