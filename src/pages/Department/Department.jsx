import React, { useState, useEffect } from 'react';

import { Space, Tag, Popconfirm, Form, Input } from 'antd';

import { Pencil, Trash2 } from 'lucide-react';

import Search from '@/components/Search';

import { Table, Drawer } from 'antd';

import ModalDepartment from '@/components/modal/Modal';

import FormDepartment from '@/components/form/Form'

import PageHeader from '@/components/PageHeader'

import ButtonIcon from '@/components/ButtonIcon'

import { Plus } from 'lucide-react';

import {departmentGetAPI, departmentPostAPI} from '@/Services/DepartmentService'

const Department = () => {

  const [useData, setUseData] = useState(null);

  // const [employeeData, setEmployeeData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");

  const [mode, setMode] = useState("");

  const [form] = Form.useForm();

  const [data, setData] = useState(null);

// tùy chỉnh form kích thước input
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
      label: "Mã phòng ban: ",
      component: <Input placeholder="Please input ID" />,
      props: { readOnly: true },
      hidden: mode === "Add" ? true : false
    },
    {
      name: "departmentName",
      label: "Tên Phòng Ban",
      component: <Input placeholder="Hãy nhập tên phòng ban" />,
      rules: [
        {
          required: true,
          message: 'Làm ơn nhập tên phòng ban',
        },
      ]
    },
    // {
    //   name: "manager",
    //   label: "Tên Trưởng Phòng",
    //   component: <Input placeholder="Hãy nhập tên trưởng phòng" />,
    //   rules: [
    //     {
    //       required: false,
    //       message: 'Làm ơn nhập tên trưởng phòng',
    //     },
    //   ]
    // },
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
    const test = async () => {
      const data = await departmentGetAPI(); // Gọi API
    
      if (data) { // Kiểm tra dữ liệu trước khi gọi .map()
        const dataItem = data.map((item) => ({
          key: item.id,
          departmentName: item.departmentName,
          managerID: item.managerID ? item.managerID : "Chưa có trưởng phòng", 
          departmentStatus: item.departmentStatus ? "Hoạt động" : "Ngừng hoạt động",
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tên Phòng Ban',
      dataIndex: 'departmentName',
      key: 'departmentName',
      render: (text, record) => <a onClick={() => handleShowData(record)} className='text-blue-600 '>{text}</a>,
    },
    {
      title: 'Trưởng Phòng',
      dataIndex: 'managerID',
      key: 'managerID',
      render: (text) => <p className='capitalize'>{text}</p>,
    },

    {
      title: 'Kích Hoạt',
      key: 'departmentStatus',
      dataIndex: 'departmentStatus',
      // render: (text) => <p className='capitalize'>{text}</p>,
      render: (tags) => {
        let color = tags.length > 5 ? "geekblue" : "green";
        if (tags === "Ngừng hoạt động") {
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
          <a className='font-medium ' onClick={() => handleEditDepartment(record)} ><Pencil size={20} /></a>

          <Popconfirm
            placement="bottomRight"
            title="Xóa một Phòng Ban"
            description="Bạn đã chắc chắn muốn xóa ?"
            okText="Có"
            cancelText="Không"
          >

            <a className=' font-medium  '><Trash2 size={20} /></a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Kiểm tra form hợp lệ
      console.log('Success:', values);
  
      // Đảm bảo gửi manager là null nếu không chọn
      const payload = {
        ...values,
        managerID: values.managerID || null,
      };
  
      // Gửi dữ liệu lên API để tạo mới phòng ban
      const dataNew = await departmentPostAPI(payload);
  
      if (dataNew) {
        const dataItem = {
          key: dataNew.id,
          departmentName: dataNew.departmentName,
          managerID: dataNew.managerID ? dataNew.managerID : "Chưa có trưởng phòng", // Trưởng phòng
          departmentStatus: dataNew.departmentStatus ? "Hoạt động" : "Ngừng hoạt động",
        };
  
        setData([...data, dataItem]); // Cập nhật state data
      } else {
        console.error("Lỗi khi tạo phòng ban");
      }
    } catch (errorInfo) {
      console.error("Lỗi xác thực form:", errorInfo);
    }
  
    setIsModalOpen(false); // Đóng modal sau khi xử lý xong
  };    

  const handleCancel = () => {
    setIsModalOpen(false)
    setUseData(null)
  };

  const handleEditDepartment = (value) => {
    console.log("recode edit", value)

    setTitle("Sửa Phòng Ban");
    setUseData(value)

    showModal()
    setMode("Edit");
  }

  const handleNewDepartment = () => {
    form.resetFields()
    setTitle("Thêm phòng ban mới");
    setMode("Add");
    showModal()
  }

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
        title={'Phòng Ban'}
        itemsBreadcrumb={itemsBreadcrumb}
      >
        <ButtonIcon handleEvent={handleNewDepartment}>
          <Plus /> Thêm Phòng Ban Mới 
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

export default Department