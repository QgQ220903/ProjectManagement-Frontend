import React, { useState } from 'react'
import ModalAccount from "@/components/modal/Modal";
import FormAccount from "@/components/form/Form";
import PageHeader from "@/components/PageHeader";
import ButtonIcon from "@/components/ButtonIcon";
import { Table, Drawer, Form, Input, Select } from "antd";
import { Pencil, Trash2, Plus } from "lucide-react";
import Search from "@/components/Search";


const Role = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [form] = Form.useForm();
    const columns = [

        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Nhóm quyền", dataIndex: "role", key: "role" },
      
        {
            title: "Chức năng", dataIndex: "action", key: "action", render: (_, record) => (
                <>
                    thêm / sửa / xóa
                </>
            )
        },

    ];
    const data = [
        {
            key: '1',     
            role: 'Admin',    
        },
        {
            key: '2',
        
            role: 'Nhân Viên',
           
        },
        {
            key: '3',
           
            role: 'Trưởng Phòng',
            
        },
        {
            key: '4',
          
            role: 'Quản lý',
         
        },
    ];

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
            label: "Mã nhóm quyền",
            component: <Input readOnly />,

        },
        {
            name: "name",
            label: "Tên nhóm quyền",
            component: <Input placeholder="Nhập tên nhân viên" />,
            rules: [{ required: true, message: "Vui lòng nhập tên nhân viên" }],
        },
    
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {

    }

    return (
        <>
            <PageHeader title={"Quản Lý Nhóm Quyền "}>
                <ButtonIcon
                // handleEvent={() => {

                // }}
                >
                    <Plus /> Thêm Nhóm Quyền Mới
                </ButtonIcon>
            </PageHeader>

            <div className="mt-5">
                <Search size={20} />
                <Table
                    columns={columns}
                    dataSource={data}
                // pagination={{ total, defaultCurrent: current, pageSize: 10 }}
                />
            </div>

            {/* <Drawer
                title="Thông tin tài khoản"
                onClose={() => setOpen(false)}
                open={open}
                width={"30%"}
            >
                <FormAccount
                    form={form}
                    formItems={formItems}
                /> 
            </Drawer> */}

            <ModalAccount
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={() => setIsModalOpen(false)}
                title={title}
                form={form}
            >
                <FormAccount
                    form={form}
                    formItems={formItems}
                    formItemLayout={formItemLayout}
                // initialValues={{
                //     positionName: "NV",
                // }}
                />
            </ModalAccount>
        </>
    )
}

export default Role