import React, { useState, useEffect } from 'react';

import { Space, Tag, Popconfirm, Form, Input } from 'antd';

import HeaderDepartment from '@/sections/DepartmenSection/HeaderDepartment';

import BodyDepartmen from '@/sections/DepartmenSection/BodyDepartmen';

import { Pencil, Trash2 } from 'lucide-react';

const Department = () => {

  const [useData, setUseData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const formItems = [
    {
      name: "key",
      label: "Id",
      component: <Input placeholder="Please input ID" />,
      props: { readOnly: true },
    },
    {
      name: "department",
      label: "Tên Phòng Ban",
      component: <Input placeholder="Please input Department" />,
      rules: [
        {
          required: true,
          message: 'Làm ơn nhập tên phòng ban',
        },
      ]
    },
    {
      name: "manager",
      label: "Tên Trưởng Phòng",
      component: <Input placeholder="Please input Manager" />,
      rules: [
        {
          required: true,
          message: 'Làm ơn nhập tên trưởng phòng',
        },
      ]
    },
  ];

  const itemsBreadcrumb = [
    {
      title: <a href="">Home</a>,
    },

    {
      title: 'Phòng Ban',
    },
  ]


  useEffect(() => {
    form.validateFields(['managerName']);
    form.validateFields(['departmentName']);
    if (useData) {
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
      render: (text, record) => <a onClick={() => handleShowData(record)} className='text-blue-600 '>{text}</a>,
    },
    {
      title: 'Trưởng Phòng',
      dataIndex: 'manager',
      key: 'manager',
      render: (text) => <p className='capitalize'>{text}</p>,
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
          <a className='font-medium text-yellow-500' onClick={() => handleEditDepartment(record)} ><Pencil size={20} /></a>

          <Popconfirm
            placement="bottomRight"
            title="Xóa một Phòng Ban"
            description="Bạn đã chắc chắn muốn xóa ?"
            okText="Có"
            cancelText="Không"
          >

            <a className='text-red-600 font-medium  '><Trash2 size={20} /></a>
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


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditDepartment = (value) => {
    showModal()
    setUseData(value)
  }

 
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleShowData = (value) => {
    showDrawer();
    setUseData(value)
  }

  return (
    <>
      <HeaderDepartment
        itemsBreadcrumb={itemsBreadcrumb}
        formItemLayout={formItemLayout}

        form={form}
        useData={useData}
        setUseData={setUseData}
      />

      <BodyDepartmen
        formItemLayout={formItemLayout}
        formItems={formItems}
        form={form}
        useData={useData}
        setUseData={setUseData}
        columns={columns}
        open={open}
        data={data}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        onClose={onClose}

      ></BodyDepartmen>


    </>
  )
}

export default Department