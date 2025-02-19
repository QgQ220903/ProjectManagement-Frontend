import React from 'react'
import FormDepartment from '@/components/form/FormDepartment'
import { Form, Input  } from 'antd';
import PageHeader from '../components/PageHeader';
const Test = () => {

  const [form] = Form.useForm();

  const formItems = [
    {
      name: "key",
      label: "Id",
      component: <Input placeholder="Please input ID" />,
    },
    {
      name: "department",
      label: "Tên Phòng Ban",
      component: <Input placeholder="Please input Department" />,
    },
    {
      name: "manager",
      label: "Tên Trưởng Phòng",
      component: <Input placeholder="Please input Manager" />,
    },
  ];

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const items=[
    {
      title: 'Home',
    },
    {
      title: <a href="">Application Center</a>,
    },
    {
      title: <a href="">Application List</a>,
    },
    {
      title: 'An Application',
    },
  ]

  return (
    <div>
      <PageHeader title={'Phòng Ban'} titleButton={'Thêm Phòng Ban Mới'} itemsBreadcrumb={items}></PageHeader>
      
      <FormDepartment form={form} formItemLayout={formItemLayout} formItems={formItems} ></FormDepartment>
    </div>
  )
}

export default Test