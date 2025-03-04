import React, { useState, useEffect } from 'react';

import { Space, Tag, Popconfirm, Form, Input } from 'antd';

import { Pencil, Trash2 } from 'lucide-react';

import Search from '@/components/Search';

import { Table, Drawer } from 'antd';

import ModalDepartment from '@/components/modal/Modal';

import FormDepartment from '@/components/form/Form'

import PageHeader from '@/components/PageHeader'

import ButtonIcon from '@/components/ButtonIcon'

import { Plus } from 'lucide-react'

import {projectGetAPI, projectPostAPI} from '@/Services/ProjectService'

import {formatDate} from '@/utils/cn'

const Project = () => {

  const [useData, setUseData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");

  const [mode, setMode] = useState("");

  const [form] = Form.useForm();

  const [data, setData] = useState(null);

  useEffect(() => {
    const test = async () => {
      const data = await projectGetAPI(); // Gọi API
  
      if (data) { // Kiểm tra dữ liệu trước khi gọi .map()
        const dataItem = data.map((item) => ({
          key: item.id,
          name: item.name,
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
        }));
  
        setData(dataItem); // Cập nhật state
      } else {
        console.error("Không có dữ liệu từ API");
      }
    };
  
    test();
  }, [data]);
  

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
      hidden: mode === "Add" ? true : false
    },
    {
      name: "name",
      label: "Tên Công Việc",
      component: <Input placeholder="Please input Department" />,
      props: { readOnly: mode === "Info" && true },
      rules: [
        {
          required: true,
          message: 'Làm ơn nhập tên công việc',
        },
      ]
    },
  
  ];

  const itemsBreadcrumb = [
    {
      title: <a href="">Home</a>,
    },

    {
      title: 'Công việc',
    },
  ]


  useEffect(() => {
    // form.validateFields(['name']);
    // form.validateFields(['departmentName']);
    if (useData) {
      console.log(useData)
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
      title: 'Tên Công Việc',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a onClick={() => handleShowData(record)} className='text-blue-600 '>{text}</a>,
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <p className='capitalize'>{text}</p>,
    },

    {
      title: 'Ngày Kết Thúc',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text) => <p className='capitalize'>{text}</p>,
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

  // const data = [
  //   {
  //     key: '1',
  //     project: 'Công việc 1',
  //     dateStart: '1/1/2025',
  //     dateEnd: '1/2/2025',
  //     tags: 'Loser',
  //   },
  //   {
  //     key: '2',
  //     project: 'Công việc 1',
  //     dateStart: '1/1/2025',
  //     dateEnd: '1/2/2025',
  //     tags: 'Loser',
  //   },
  //   {
  //     key: '3',
  //     project: 'Công việc 1',
  //     dateStart: '1/1/2025',
  //     dateEnd: '1/2/2025',
  //     tags: 'Loser',
  //   },

  // ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      await projectPostAPI(values);
      
    } catch (errorInfo) {``
      console.log('Failed:', errorInfo);
    }



    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditDepartment = (value) => {
    showModal()
    setMode("Edit");
    setUseData(value)
  }

  const handleCreateProject =  () => {
    form.resetFields()
    setTitle("Thêm Công Việc Mới");
    setMode("Add");
    showModal()
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleShowData = (value) => {
    showDrawer();
    setMode('Info')
    console.log(value,"value")
    setUseData(value)
  }

  return (
    <>

      <PageHeader
        title={'Công Việc'}
        itemsBreadcrumb={itemsBreadcrumb}
      >
          <ButtonIcon handleEvent={handleCreateProject}>
          <Plus /> Thêm Công Việc Mới 
        </ButtonIcon>

      </PageHeader>

      <div className='mt-5'>
        <Search size={20} />

        <Table className='select-none' columns={columns} dataSource={data}
          pagination={{
            // pageSize: , // Mặc định 10 dòng mỗi trang
            showSizeChanger: true, // Cho phép chọn số dòng mỗi trang
            pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số dòng
          }}
        />
      </div>

      <Drawer title="Thông tin Phòng Ban" onClose={onClose} open={open} width={'30%'}>
        <FormDepartment form={form} formItemLayout={formItemLayout} formItems={formItems}></FormDepartment>
      </Drawer>


      <ModalDepartment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title={title}
        form={form}

      >
        <FormDepartment
          formName={'form' + mode}
          form={form}
          formItemLayout={formItemLayout}
          formItems={formItems}>

        </FormDepartment>
      </ModalDepartment>

    </>
  )
}

export default Project