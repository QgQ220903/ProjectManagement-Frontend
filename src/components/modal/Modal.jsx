import React from 'react';

import { Modal } from "antd";


const ModalCreateDepartment = (props) => {
  const { isModalOpen, handleOk, handleCancel, title, setIsModalOpen, form, children } = props;
  
  const reset = () => {
    form.resetFields()
    setIsModalOpen(false)
  }


  const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
  };

  // const onCheck = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     console.log('Success:', values);
  //   } catch (errorInfo) {``
  //     console.log('Failed:', errorInfo);
  //   }
  // };
  return (


    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={reset}
      // destroyOnClose={true}
      okText="Lưu"
      cancelText="Thoát"
    >
      {children}
     
    </Modal>





  )
}

export default ModalCreateDepartment

