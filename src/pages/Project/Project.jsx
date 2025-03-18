import React, { useState, useEffect } from 'react';

import { Space, Popconfirm, Form, Input } from 'antd';

import { Pencil, Trash2, Plus } from 'lucide-react';

import { Link } from "react-router-dom";

import { FaEye } from "react-icons/fa";

import Search from '@/components/Search';

import { Table, Drawer } from 'antd';

import ModalProject from '@/components/modal/Modal';

import FormProject from '@/components/form/Form'

import PageHeader from '@/components/PageHeader'

import ButtonIcon from '@/components/ButtonIcon'

import {projectGetAPI, projectPostAPI} from '@/Services/ProjectService'

import {formatDate} from '@/utils/cn'

const Project = () => {

  const [current,setCurrent] = useState(1)

  const [total,setTotal] = useState(16)

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
          createdAt: formatDate(item.created_at),
          updatedAt: formatDate(item.updated_at),
        }));
  
        setData(dataItem); // Cập nhật state
      } else {
        console.error("Không có dữ liệu từ API");
      }
    };
  
    test();
  }, []);
  

  useEffect(() => {
    if (useData) {
      console.log(useData)
      form.setFieldsValue(useData)
    }
  }, [form, useData]);

// tùy chỉnh form kích thước input
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  // Form items

  const formItems = [
    {
      name: "key",
      label: "Mã dự án: ",
      component: <Input/>,
      props: { readOnly: true },
      hidden: mode === "Add" ? true : false
    },
    {
      name: "name",
      label: "Tên dự án",
      component: <Input placeholder="Làm ơn nhập tên dự án" />,
      props: { readOnly: mode === "Info" && true },
      rules: [
        {
          required: true,
          message: 'Làm ơn nhập tên dự án',
        },
      ]
    },
  
  ];

  // Đường dẫn
  const itemsBreadcrumb = [
    {
      title: <a href="">Home</a>,
    },

    {
      title: 'Công việc',
    },
  ]


  //  Tùy chỉnh cột của table
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
          <a className='font-medium  ' onClick={() => handleEditProject(record)} ><Pencil size={20} /></a>

          <Popconfirm
            placement="bottomRight"
            title="Xóa một dự án"
            description="Bạn đã chắc chắn muốn xóa ?"
            okText="Có"
            cancelText="Không"
          >

            <a className=' font-medium  '><Trash2 size={20} /></a>
          </Popconfirm>

          <Link to={"/project/" + record.key } ><FaEye className='text-lg' /></Link>

        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      const dataNew = await projectPostAPI(values);

      if (dataNew) {
        const dataItem = {
            key: dataNew.id,
            name: dataNew.name,
            createdAt: formatDate(dataNew.created_at),
            updatedAt: formatDate(dataNew.updated_at)
        }
        setData([...data,dataItem])
      }else{
        console.log('lỗi')
      }
      
    } catch (errorInfo) {``
      console.log('Failed:', errorInfo);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false)
    setUseData(null)
  };

  const handleEditProject = (value) => {
    console.log("recode edit", value)

    setTitle("Sửa Công Việc");
    setUseData(value)

    showModal()
    setMode("Edit");
  }

  const handleCreateProject =  () => {
    form.resetFields()
    setTitle("Thêm dự án mới");
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
        title={'Dự Án'}
        itemsBreadcrumb={itemsBreadcrumb}
      >
          <ButtonIcon handleEvent={handleCreateProject}>
          <Plus /> Thêm Dự Án Mới 
        </ButtonIcon>

      </PageHeader>

      <div className='mt-5'>
        <Search size={20} />

        <Table className='select-none' columns={columns} dataSource={data}
          pagination={{
            total: total,
            defaultCurrent: current,
            pageSize: 10, // Mặc định 10 dòng mỗi trang
            showSizeChanger: true, // Cho phép chọn số dòng mỗi trang
            pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số dòng
          }}
        />
      </div>

      <Drawer title="Thông tin Phòng Ban" onClose={onClose} open={open} width={'30%'}>
        <FormProject form={form} formItemLayout={formItemLayout} formItems={formItems}></FormProject>
      </Drawer>


      <ModalProject
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title={title}
        form={form}

      >
        <FormProject
          formName={'form' + mode}
          form={form}
          formItemLayout={formItemLayout}
          formItems={formItems}>

        </FormProject>
      </ModalProject>

    </>
  )
}

export default Project