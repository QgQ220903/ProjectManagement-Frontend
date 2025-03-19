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

import { Select } from 'antd';

import {departmentGetAPI, departmentPostAPI, departmentPutAPI, departmentDeleteAPI, employeeGetAPI} from '@/Services/DepartmentService'

const Department = () => {

  const [useData, setUseData] = useState(null);
  const [employees, setEmployees] = useState([]);
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

  useEffect(() => {
    const fetchEmployees = async () => {
        const employeeList = await employeeGetAPI();
        if (employeeList) {
            setEmployees(employeeList);
        }
    };
    fetchEmployees();
  }, []);

  const formItems = [
    {
        name: "departmentName",
        label: "Tên Phòng Ban",
        component: <Input placeholder="Hãy nhập tên phòng ban" />,
        rules: [{ required: true, message: 'Làm ơn nhập tên phòng ban' }]
    },
    {
        name: "managerID",
        label: "Trưởng Phòng",
        component: (
            <Select 
                placeholder="Chọn trưởng phòng"
                allowClear // Cho phép xóa lựa chọn
                onChange={(value) => form.setFieldsValue({ managerID: value || null })}
            >
                {employees.map(emp => (
                    <Select.Option key={emp.id} value={emp.id}>
                        {emp.name}
                    </Select.Option>
                ))}
            </Select>
        ),
        rules: [{ required: false }]
    }
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
          onConfirm={() => handleDeleteDepartment(record.key)} // Gọi hàm xoá
          okText="Có"
          cancelText="Không"
          >
          <a className='font-medium'><Trash2 size={20} /></a>
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

        if (mode === "Edit") {
            // Nếu đang sửa, gọi API update
            await departmentPutAPI(useData.key, payload);

            // Cập nhật state `data`
            setData(prevData =>
                prevData.map(item =>
                    item.key === useData.key ? { ...item, ...payload } : item
                )
            );
        } else {
            // Nếu đang thêm mới, gọi API tạo phòng ban
            const dataNew = await departmentPostAPI(payload);

            if (dataNew) {
                const dataItem = {
                    key: dataNew.id,
                    departmentName: dataNew.departmentName,
                    managerID: dataNew.managerID ? dataNew.managerID : "Chưa có trưởng phòng",
                    departmentStatus: dataNew.departmentStatus ? "Hoạt động" : "Ngừng hoạt động",
                };

                setData([...data, dataItem]);
            }
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
    console.log("recode edit", value);
    setTitle("Sửa Phòng Ban");
    setUseData(value);
    form.setFieldsValue(value); // Đổ dữ liệu vào form
    showModal();
    setMode("Edit"); // Đánh dấu là sửa
  };

  const handleDeleteDepartment = async (id) => {
    try {
      await departmentDeleteAPI(id); // Gọi API xoá
      setData(prevData => prevData.filter(item => item.key !== id)); // Cập nhật state
    } catch (error) {
      console.error("Lỗi khi xoá phòng ban:", error);
    }
  };

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