import React, {useState} from 'react'
import ModalAccount from "@/components/modal/Modal";
import FormAccount from "@/components/form/Form";
import PageHeader from "@/components/PageHeader";
import ButtonIcon from "@/components/ButtonIcon";
import { Table, Drawer, Form, Input, Select } from "antd";
import { Pencil, Trash2, Plus  } from "lucide-react";
import Search from "@/components/Search";
import { useForm } from 'antd/es/form/Form';
const Account = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [form] = Form.useForm();
    const columns = [
       
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Người dùng", dataIndex: "name", key: "name" },
        { title: "Nhóm quyền", dataIndex: "role", key: "role" },
        { title: "Tên đăng nhập", dataIndex: "userName", key: "userName" },
        { title: "Mật khẩu", dataIndex: "pass", key: "pass" },
        { title: "Chức năng", dataIndex: "action", key: "action" , render: (_, record) => (
            <>
               thêm / sửa / xóa
            </>
        ) },
    
    ];
    const data = [
        {
            key: '1',
            name: 'Trần Quang Trường',
            role: 'Admin',
            userName: 'tqtruong753',
            pass: "123456",
        },
        {
            key: '2',
            name: 'Phan Duy Cửu',
            role: 'Nhân Viên',
            userName: 'dc123',
            pass: "123456",
        },
        {
            key: '3',
            name: 'Nguyễn Quang Hà',
            role: 'Trưởng Phòng',
            userName: 'qh123',
            pass: "123456",
        },
        {
            key: '4',
            name: 'Quách Giá Quy',
            role: 'Quản lý',
            userName: 'qgq123',
            pass: "123456",
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
            label: "Mã nhân viên",
            component: <Input readOnly />,
           
        },
        {
            name: "name",
            label: "Tên nhân viên",
            component: <Input placeholder="Nhập tên nhân viên" />,
            rules: [{ required: true, message: "Vui lòng nhập tên nhân viên" }],
        },
        {
            name: "position",
            label: "Chức vụ",
            component: (
                <Select
                    // defaultValue={'NV'}
                    placeholder="Chọn chức vụ"
                    // onChange={handleChange}
                    options={[
                        { value: "NV", label: "Nhân Viên" },
                        { value: "TP", label: "Trường Phòng" },
                    ]}
                ></Select>
            ),
            rules: [{ required: true, message: "Vui lòng chọn chức vụ" }],
        },
        {
            name: "phone_number",
            label: "Số điện thoại",
            component: <Input placeholder="Nhập số điện thoại" />,
            rules: [{ required: true, message: "Vui lòng nhập số điện thoại" }],
        },
        {
            name: "email",
            label: "Email",
            component: <Input placeholder="Nhập email" />,
            rules: [{ required: true, message: "Vui lòng nhập email" }],
        },
     
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {

    }

    return (
        <>
            <PageHeader title={"Quản Lý Tài Khoản"}>
                <ButtonIcon
                    // handleEvent={() => {

                    // }}
                >
                    <Plus /> Thêm Tài Khoản
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

export default Account