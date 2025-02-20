import React, {useState} from 'react'
import PageHeader from '@/components/PageHeader'
import { Input } from 'antd';
import ModalDepartment from '@/components/modal/Modal';
import FormDepartment from '@/components/form/Form'

const HeaderDepartment = ({ itemsBreadcrumb,  formItemLayout, form,}) => {

    const formItems = [
           {
             name: "key",
             label: "Id",
             component: <Input placeholder="Please input ID" />,
            //  props: { readOnly: true }, 
             hidden: true
           },
           {
             name: "department",
             label: "Tên Phòng Ban",
             component: <Input placeholder="Please input Department" />,
             rules:[
               {
                 required: true,
                 message: 'Làm ơn nhập tên phòng ban',
               },
             ]
           },
           {
             name: "manager",
             label: "Tên Trưởng Phòng",
             component: <Input placeholder="Please input Manager" />,
             rules:[
               {
                 required: true,
                 message: 'Làm ơn nhập tên trưởng phòng',
               },
             ]
           },
         ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState('Thêm Phòng Ban Mới')

    const handleNewDepartment = () => {
        showModal();
        setTitleModal('Thêm Phòng Ban Mới')  
    }


    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <>
            <PageHeader
                title={'Phòng Ban'}
                titleButton={'Thêm Phòng Ban Mới'}
                itemsBreadcrumb={itemsBreadcrumb}
                handleNewDepartment={handleNewDepartment}
            />


            <ModalDepartment
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                title={titleModal}
                form={form}
    

            >

                <FormDepartment formName={'formCreate'} form={form} formItemLayout={formItemLayout} formItems={formItems}></FormDepartment>
            </ModalDepartment>
        </>
    )
}

export default HeaderDepartment