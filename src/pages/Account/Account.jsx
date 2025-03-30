import React, {useEffect, useState} from 'react'
import ModalAccount from "@/components/modal/Modal";
import FormAccount from "@/components/form/Form";
import PageHeader from "@/components/PageHeader";
import ButtonIcon from "@/components/ButtonIcon";
import { Table, Drawer, Form, Input, Select, Space } from "antd";
import { Pencil, Trash2, Plus  } from "lucide-react";
import Search from "@/components/Search";
import { useForm } from 'antd/es/form/Form';
import {accountGetAPI} from "@/services/AccountService";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeGetAPI, employeePostAPI, employeePutAPI, employeeDeleteAPI } from "@/Services/EmployeeService";


const Account = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [form] = Form.useForm();

    const queryClient = useQueryClient();
    //lấy ds nv
    const { data: employees } = useQuery({
        queryKey: ["employees"],
        queryFn: employeeGetAPI,
    });

    const { data: accounts } = useQuery({
        queryKey: ["accounts"],
        queryFn: accountGetAPI,
    });

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const data = await getAccount();  // Chờ Promise hoàn thành
        //         console.log("Account", data.data);
        //         // setAccount(data);  // Lưu vào state nếu cần
        //     } catch (error) {
        //         console.error("Error fetching account:", error);
        //     }
        // };

        // fetchData();  // Gọi hàm async
    }, [])

    const columns = [
       
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Người dùng", dataIndex: "name", key: "name" },
        { title: "Nhóm quyền", dataIndex: "role", key: "role" },
        { title: "Tên đăng nhập", dataIndex: "userName", key: "userName" },
        { title: "Mật khẩu", dataIndex: "pass", key: "pass" },
        { title: "Chức năng", dataIndex: "action", key: "action" , render: (_, record) => (
            <>
              <Space size="middle">
                <a href=""><Pencil size={20} /></a>
                <a href=""><Trash2 size={20}></Trash2></a>
                </Space>
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
            label: "Tên đăng nhập",
            component: <Input placeholder="Nhập tên đăng nhập" />,
            rules: [{ required: true, message: "Vui lòng nhập tên đăng nhập" }],
        },
        {
            name: "password",
            label: "Mật khẩu",
            component: <Input placeholder="Nhập Mật khẩu" />,
            rules: [{ required: true, message: "Vui lòng nhập Mật khẩu" }],
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
                    handleEvent={() => {
                        showModal()
                    }}
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
                title={"Thêm tài khoản"}
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