import React, { useState } from 'react'

import { Table, Drawer } from 'antd';

import Search from '../../components/Search';

import ModalDepartment from '@/components/modal/Modal';

import FormDepartment from '@/components/form/Form'


const BodyDepartmen = ({
    formItemLayout, formItems, form,
    useData, setUseData, columns,
    data, isModalOpen, setIsModalOpen,
    handleCancel, handleOk, onClose, open
}) => {


    return (
        <>
            <Search size={20} />

            <Table className='select-none' columns={columns} dataSource={data}
                pagination={{
                    // pageSize: , // Mặc định 10 dòng mỗi trang
                    showSizeChanger: true, // Cho phép chọn số dòng mỗi trang
                    pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số dòng
                }}
            />

            <Drawer title="Thông tin Phòng Ban" onClose={onClose} open={open} width={'30%'}>
                <FormDepartment form={form} formItemLayout={formItemLayout} formItems={formItems}></FormDepartment>
            </Drawer>

            <ModalDepartment
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                title={'Chỉnh Sửa Thông Tin Phòng Ban'}
                form={form}

            >
                <FormDepartment
                    formName={'formEdit'}
                    form={form}
                    formItemLayout={formItemLayout}
                    formItems={formItems}>

                </FormDepartment>
            </ModalDepartment>
        </>
    )
}

export default BodyDepartmen