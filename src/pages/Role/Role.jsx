import React, { useState } from 'react'
import ModalAccount from "@/components/modal/Modal";
import FormAccount from "@/components/form/Form";
import PageHeader from "@/components/PageHeader";
import ButtonIcon from "@/components/ButtonIcon";
import { Table, Drawer, Form, Input, Select, Space, Checkbox } from "antd";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from 'react-router-dom';
import Search from "@/components/Search";
import TableRole from '@/pages/Role/components/TableRole'

const Role = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [isEditRole, setIsEditRole] = useState(false);
    const [form] = Form.useForm();
    const columns = [

        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Nhóm quyền", dataIndex: "role", key: "role" },

        {
            title: "Chức năng", dataIndex: "action", key: "action", render: (_, record) => (
                <>
                    <Space size="middle">
                        <Link onClick={() => handleDetailRole()}><Pencil size={20} /></Link>
                        <a href=""><Trash2 size={20}></Trash2></a>
                    </Space>
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

    const handleDetailRole = () => {
        setIsEditRole(true)
        setTitle("Phân Quyền");
        showModal()
    }

    // tùy chỉnh form kích thước input
    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {

    }
    const columns2 = [

        { title: "Chức năng", dataIndex: "role", key: "role" },

        {
            title: "Thêm", dataIndex: "add", key: "add", render: (_, record) => (
                <>
                  <Checkbox></Checkbox>
                </>
            )
        },
        {
            title: "Sửa", dataIndex: "edit", key: "edit", render: (_, record) => (
                <>
                  <Checkbox></Checkbox>
                </>
            )
        },
        {
            title: "Xóa", dataIndex: "delete", key: "delete", render: (_, record) => (
                <>
                  <Checkbox></Checkbox>
                </>
            )
        },

    ];

    const data2 = [
        {
            key: '1',
            role: 'Quản lý thành viên',

        },
        {
            key: '2',

            role: 'Quản lý công việc',

        },
        {
            key: '3',

            role: 'Quản lý phòng ban',

        },
        {
            key: '4',

            role: 'Quản lý tài khoản',

        },
    ];

    
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
        {
            name: "table",
            wrapperCol: {
                span: 24,
            },
            component: <Table  pagination={false}  columns={columns2} dataSource={data2}/>,
           
        }

    ];

    return (
        <>
            <PageHeader title={"Quản Lý Nhóm Quyền "}>
                <ButtonIcon
                handleEvent={() => {
                    setIsEditRole(false)
                    showModal();
                    setTitle("Thêm Nhóm Quyền");
                }}
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
                {isEditRole ? (<Table pagination={false}  columns={columns2} dataSource={data2} />) :(  <FormAccount
                    form={form}
                    formItems={formItems}
                    formItemLayout={formItemLayout}
                // initialValues={{
                //     positionName: "NV",
                // }}
                />)}
               
            </ModalAccount>
        </>
    )
}

export default Role