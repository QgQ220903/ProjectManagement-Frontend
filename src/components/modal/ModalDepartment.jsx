import React, { useState, useEffect } from 'react';

import { Modal, Input } from "antd";

import FormDepartment from '@/components/form/FormDepartment'

const ModalCreateDepartment = (props) => {
  const { isModalOpen, handleOk, handleCancel, title, setIsModalOpen, useData, formItemLayout, form, type, formItems } = props;
  

  // const [form] = Form.useForm();
  
  const reset = () => {
    console.log(form)
    form.resetFields()
    setIsModalOpen(false)
  }

  // const formItems = [
  //     {
  //       name: "key",
  //       label: "Id",
  //       component: <Input placeholder="Please input ID" />,
  //       props: { readOnly: true }, 
  //       hidden: type === 'EDIT' ? false : true
  //     },
  //     {
  //       name: "department",
  //       label: "Tên Phòng Ban",
  //       component: <Input placeholder="Please input Department" />,
  //       rules:[
  //         {
  //           required: true,
  //           message: 'Làm ơn nhập tên phòng ban',
  //         },
  //       ]
  //     },
  //     {
  //       name: "manager",
  //       label: "Tên Trưởng Phòng",
  //       component: <Input placeholder="Please input Manager" />,
  //       rules:[
  //         {
  //           required: true,
  //           message: 'Làm ơn nhập tên trưởng phòng',
  //         },
  //       ]
  //     },
  //   ];
  

  useEffect(() => {
    form.validateFields(['managerName']);
    form.validateFields(['departmentName']);
    if(useData){
      form.setFieldsValue(useData)
    }
  }, [form, useData]);

  const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
  };

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
    } catch (errorInfo) {``
      console.log('Failed:', errorInfo);
    }
  };
  return (


    <Modal
      title={title}
      open={isModalOpen}
      onOk={onCheck}
      onCancel={reset}
      okText="Lưu"
      cancelText="Thoát"
    >
      {/* <Form
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
          <Input placeholder="Please input your name"   disabled />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="department"
          label="Tên Phòng Ban"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input placeholder="Please input your name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="manager"
          label="Tên Trưởng Phòng"
          rules={[
            {
              required: true,
              message: 'Please input Manager Name',
            },
          ]}
        >
          <Input placeholder="Please input your nickname" />
        </Form.Item>


      </Form> */}
        <FormDepartment form={form} formItemLayout={formItemLayout} formItems={formItems}></FormDepartment>
    </Modal>





  )
}

export default ModalCreateDepartment

