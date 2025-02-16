import React, { useState, useEffect } from 'react';

import { Modal, Form, Input } from "antd";



const ModalCreateDepartment = (props) => {
  const { isModalOpen, handleOk, handleCancel, title, setIsModalOpen, useData } = props;
  

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };


  const [form] = Form.useForm();
  
  const reset = () => {
    console.log(form)
    form.resetFields()
    setIsModalOpen(false)
  }

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


      </Form>
    </Modal>





  )
}

export default ModalCreateDepartment

