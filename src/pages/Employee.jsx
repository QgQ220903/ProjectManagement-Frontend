import React, { useState, useEffect } from 'react';
import { Space, Popconfirm, Form, Input } from 'antd';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Search from '@/components/Search';
import { Table, Drawer } from 'antd';
import ModalProject from '@/components/modal/Modal';
import FormProject from '@/components/form/Form';
import PageHeader from '@/components/PageHeader';
import ButtonIcon from '@/components/ButtonIcon';
import { employeeGetAPI, employeePostAPI } from '@/Services/EmployeeService';

const Employee = () => {
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(16);
  const [useData, setUseData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("");
  const [form] = Form.useForm();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await employeeGetAPI();
      if (data) {
        const dataItem = data.map((item) => ({
          key: item.id,
          name: item.employeeName,
          position: item.positionName,
          phone: item.employeePhone,
          email: item.employeeEmail,
          status: item.status ? "Active" : "Inactive",
        }));
        setData(dataItem);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (useData) {
      form.setFieldsValue(useData);
    }
  }, [form, useData]);

  const formItems = [
    {
      name: "key",
      label: "Mã nhân viên",
      component: <Input readOnly />,
      hidden: mode === "Add" ? true : false,
    },
    {
      name: "name",
      label: "Tên nhân viên",
      component: <Input placeholder="Nhập tên nhân viên" />,
      rules: [{ required: true, message: "Nhập tên nhân viên" }],
    },
    {
      name: "position",
      label: "Chức vụ",
      component: <Input placeholder="Nhập chức vụ" />,
    },
    {
      name: "phone",
      label: "Số điện thoại",
      component: <Input placeholder="Nhập số điện thoại" />,
    },
    {
      name: "email",
      label: "Email",
      component: <Input placeholder="Nhập email" />,
    },
  ];

  const columns = [
    { title: 'ID', dataIndex: 'key', key: 'key' },
    { title: 'Tên Nhân Viên', dataIndex: 'name', key: 'name' },
    { title: 'Chức Vụ', dataIndex: 'position', key: 'position' },
    { title: 'Số Điện Thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Trạng Thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditEmployee(record)}><Pencil size={20} /></a>
          <Popconfirm title="Xóa nhân viên?" okText="Có" cancelText="Không">
            <a><Trash2 size={20} /></a>
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
      const values = await form.validateFields();
      const newData = await employeePostAPI(values);
      if (newData) {
        setData([...data, { ...values, key: newData.id }]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };

  const handleEditEmployee = (value) => {
    setTitle("Sửa Nhân Viên");
    setUseData(value);
    showModal();
    setMode("Edit");
  };

  return (
    <>
      <PageHeader title={'Nhân Viên'}>
        <ButtonIcon handleEvent={() => { setTitle("Thêm Nhân Viên"); setMode("Add"); showModal(); }}>
          <Plus /> Thêm Nhân Viên
        </ButtonIcon>
      </PageHeader>

      <div className='mt-5'>
        <Search size={20} />
        <Table columns={columns} dataSource={data} pagination={{ total, defaultCurrent: current, pageSize: 10 }} />
      </div>

      <Drawer title="Thông tin Nhân Viên" onClose={() => setOpen(false)} open={open} width={'30%'}>
        <FormProject form={form} formItems={formItems} />
      </Drawer>

      <ModalProject isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={() => setIsModalOpen(false)} title={title} form={form}>
        <FormProject form={form} formItems={formItems} />
      </ModalProject>
    </>
  );
};

export default Employee;
