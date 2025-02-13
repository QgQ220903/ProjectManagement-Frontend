import React, { useState, useEffect } from 'react';

import { Modal, Form, Input } from "antd";



const ModalCreateDepartment = (props) => {
  const { isModalOpen, handleOk, handleCancel, title, setIsModalOpen } = props;

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };

``
  const [form] = Form.useForm();
  
  const reset = () => {
    console.log(form)
    form.resetFields()
    setIsModalOpen(false)
  }
  useEffect(() => {
    form.validateFields(['managerName']);
    form.validateFields(['departmentName']);
  }, [form]);

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
      okText="Thêm Mới"
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
          name="departmentName"
          label="Department Name"
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
          name="managerName"
          label="Manager Name"
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

