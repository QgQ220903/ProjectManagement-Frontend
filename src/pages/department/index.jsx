import React, { useState, useEffect } from 'react';

import { Space, Table, Tag, Popconfirm, Drawer, Form, Input  } from 'antd';

import { Plus } from 'lucide-react';

import ModalCreateDepartment from '@/components/modal/modalCreateDepartment'


const Department = () => {

  const [useData, setUseData] = useState(null);
  const [form] = Form.useForm();
  const [titleModal, setTitleModal] = useState('Thêm Phòng Ban Mới')
  
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect(() => {
      form.validateFields(['managerName']);
      form.validateFields(['departmentName']);
      if(useData){
        form.setFieldsValue(useData)
      }
    }, [form, useData]);
  

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Phòng Ban',
      dataIndex: 'department',
      key: 'department',
      render: (text, record) => <a onClick={()=>handleInfoData(record)} className='text-blue-600 '>{text}</a>,
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
          <a className='font-medium ' onClick={() => handleEdit(record)} >Edit {record.name}</a>

          <Popconfirm
            placement="bottomRight"
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
          >

            <a className='text-red-600 font-medium  '>Delete</a>
          </Popconfirm>
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

  const handleEdit = (value) => {
    showModal()
    setTitleModal('Sửa thông tin phòng ban');
    setUseData(value)
    console.log(value)
  }

  const handleNewDepartment = () => {
    showModal();
    setTitleModal('Thêm Phòng Ban Mới')
    setUseData(null)
  }

  

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleInfoData = (value) => {
    showDrawer();
    setUseData(value)
  }
  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='title'>Phòng Ban</h2>
        <button onClick={handleNewDepartment} className='capitalize btn-primary flex gap-1'> <Plus /> Thêm phòng ban mới</button>
      </div>
      <Table columns={columns} dataSource={data} />
      <ModalCreateDepartment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title={titleModal}
        useData={useData}
        setUseData={setUseData}
      />
       <Drawer title="Thông tin Phòng Ban" onClose={onClose} open={open} width={'30%'}>
        <Form
          form={form}
          name="dynamic_rule"
          style={{
            maxWidth: 600,
          }}
         
        >
          <Form.Item
            {...formItemLayout}
            name="key"
            label="Id"
          
          >
            <Input placeholder="Please input your name"   readOnly />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="department"
            label="Tên Phòng Ban"
          >
            <Input placeholder="Please input your name" readOnly />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="manager"
            label="Tên Trưởng Phòng"
          
          >
            <Input placeholder="Please input your nickname" readOnly />
          </Form.Item>


        </Form>
      </Drawer>

    </>
  )
}

export default Department