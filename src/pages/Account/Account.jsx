import React, { useEffect, useState } from 'react'
import ModalAccount from "@/components/modal/Modal";
import FormAccount from "@/components/form/Form";
import PageHeader from "@/components/PageHeader";
import ButtonIcon from "@/components/ButtonIcon";
import { Table, Drawer, Form, Input, Select, Space } from "antd";
import { Pencil, Trash2, Plus } from "lucide-react";
import Search from "@/components/Search";
import { useForm } from 'antd/es/form/Form';
import { accountGetAPI, accountPostAPI, accountPutAPI } from "@/services/AccountService";
import { rolesGetAPI } from "@/services/RoleService";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeGetAllAPI } from "@/Services/EmployeeService";



const Account = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState("");

    const [form] = Form.useForm();

    const [mode, setMode] = useState("");

    const [accountData, setAccountData] = useState([]);

    const [employeeData, setEmployeeData] = useState([]);

    const [roleData, setRoleData] = useState([]);

    const [selectedRecord, setSelectedRecord] = useState(null);

    const queryClient = useQueryClient();
    //lấy ds nv
    const { data: employees } = useQuery({
        queryKey: ["employees"],
        queryFn: employeeGetAllAPI,
    });

    //lấy ds tk
    const { data: accounts } = useQuery({
        queryKey: ["accounts"],
        queryFn: accountGetAPI,
    });

    //lấy ds quyền
    const { data: roles } = useQuery({
        queryKey: ["roles"],
        queryFn: rolesGetAPI,
    });

    //thêm tk
    const { data: newData, mutate: mutatePost } = useMutation({
        mutationFn: accountPostAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["accounts"],
            });
        },
        onError: (err) => {
            // console.error("API Error:", err);
            if (err.response?.data?.email[0]) {
                const errorMessage = err.response.data.email[0];

                // Kiểm tra nếu lỗi liên quan đến email
                if (errorMessage.includes("email")) {
                    form.setFields([
                        {
                            name: "name", // Ô chứa email (chọn nhân viên)
                            errors: ["Tài khoản với email này đã tồn tại"],
                        },
                    ]);
                }
                // Kiểm tra nếu lỗi liên quan đến mật khẩu
                // if (errorMessage.includes("password")) {
                //     form.setFields([
                //         {
                //             name: "password",
                //             errors: ["Mật khẩu không hợp lệ"],
                //         },
                //     ]);
                // }
            }
        }
    });

    //sửa tk
    const { data: updateData, mutate: mutatePut } = useMutation({
        mutationFn: ({ obj, id }) => accountPutAPI(obj, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["accounts"],
            });
        },
    });

    function setDataAccounts(accounts) {
        return accounts?.map((item) => ({
            ...item,
            key: item.id,
            nameUser: item?.employee && item.employee.name,
            nameRole: item?.role && item.role.name
        }));
    }


    useEffect(() => {
        console.log("accounts", accounts);
        if (accounts) {
            const accountFilter = setDataAccounts(accounts);
            setAccountData(accountFilter);
        }

        if (employees) {
            setEmployeeData(employees);
        }

        console.log("roles", roles);
        if (roles) {
            setRoleData(roles);
        }
    }, [accounts, employees, roles]); // Lắng nghe sự thay đổi của dữ liệu

    useEffect(() => {
        if (selectedRecord) {

            form.setFieldsValue({
                role: selectedRecord.role?.id,
                id: selectedRecord.id
            })
        }
    }, [form, selectedRecord]);

    const columns = [

        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Người dùng", dataIndex: "nameUser", key: "nameUser" },
        { title: "Nhóm quyền", dataIndex: "nameRole", key: "nameRole" },
        { title: "Tên đăng nhập", dataIndex: "email", key: "email" },
        {
            title: "Chức năng", dataIndex: "action", key: "action", render: (_, record) => (
                <>
                    <Space size="middle">
                        <a onClick={() => handleUpdate(record)}><Pencil size={20} /></a>
                        <a href=""><Trash2 size={20}></Trash2></a>
                    </Space>
                </>
            )
        },

    ];
    // const data = [
    //     {
    //         key: '1',
    //         name: 'Trần Quang Trường',
    //         role: 'Admin',
    //         userName: 'tqtruong753',
    //         pass: "123456",
    //     },
    //     {
    //         key: '2',
    //         name: 'Phan Duy Cửu',
    //         role: 'Nhân Viên',
    //         userName: 'dc123',
    //         pass: "123456",
    //     },
    //     {
    //         key: '3',
    //         name: 'Nguyễn Quang Hà',
    //         role: 'Trưởng Phòng',
    //         userName: 'qh123',
    //         pass: "123456",
    //     },
    //     {
    //         key: '4',
    //         name: 'Quách Giá Quy',
    //         role: 'Quản lý',
    //         userName: 'qgq123',
    //         pass: "123456",
    //     },
    // ];

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
            name: "id",
            label: "Mã tài khoản",
            component:
            <Input />,
            hidden: mode === "Edit" ? false : true,
            props: { readOnly: true },
        },
        {
            name: "name",
            label: "Tên đăng nhập",
            component:
                <Select
                    showSearch
                    placeholder="Chọn nhân viên"
                    optionFilterProp="label"
                    options={employeeData?.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                ></Select>,
            rules: [{ required: true, message: "Vui lòng nhập tên đăng nhập" }],
            hidden: mode === "Edit" ? true : false,
        },
        {
            name: "role",
            label: "Quyền",
            component:
                <Select
                    showSearch
                    placeholder="Chọn quyền"
                    optionFilterProp="label"
                    options={roleData?.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                // value={selectedRecord?.role?.id} // Set giá trị mặc định
                />,
            rules: [{ required: true, message: "Vui lòng nhập tên đăng nhập" }],
        },
        {
            name: "password",
            label: "Mật khẩu",
            component: <Input placeholder="Nhập Mật khẩu" />,
            rules: mode === "Add" ? [{ required: true, message: "Vui lòng nhập Mật khẩu" }] : [],
        },

    ];


    const showModal = () => {
        setIsModalOpen(true);
    };

    const createAccount = async (values) => {
        // Tìm employee_id và email từ employeeData dựa trên name (đã chọn từ Select)
        const selectedEmployee = employeeData.find(emp => emp.id === values.name);

        // Format lại dữ liệu theo yêu cầu
        const submitData = {
            email: selectedEmployee?.email || "",  // Lấy email của nhân viên hoặc rỗng nếu không có
            password: values.password,
            role_id: values.role || null,          // role đã chọn từ form
            employee_id: values.name || null, // employee_id từ dữ liệu nhân viên
        };

        console.log("Submit data:", submitData);

        // Gửi API hoặc xử lý dữ liệu tiếp theo
        // Xử lý lỗi từ API
        mutatePost(submitData);
    }

    const updateAccount = async (values) => {
        //    cấp lại mk 
        const submitData = {
            role_id: values.role
        };

        if (values.password) {
            submitData.password = values.password;
        }


        console.log("updateAccount", submitData);

        mutatePut({ obj: submitData, id: values.id });


    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields(); // Lấy dữ liệu từ form
            console.log("Form values:", values);
            if (mode === "Add") {
                createAccount(values)
            }
            else {
                updateAccount(values)
            }

            setIsModalOpen(false)

        } catch (error) {
            console.error("Validation failed:", error);
        }
    }

    const handleCreate = () => {
        setSelectedRecord(null);
        setMode("Add");
        form.resetFields();
        showModal();

    }

    const handleUpdate = (record) => {
        setMode("Edit");
        console.log("record", record.role.id)
        setSelectedRecord(record);
        // Cập nhật giá trị form trước khi mở modal
        showModal()
    }

    const handleCancel = () => {
        form.resetFields();
        setSelectedRecord(null);
        setIsModalOpen(false);
    }


    return (
        <>
            <PageHeader title={"Quản Lý Tài Khoản"}>
                <ButtonIcon
                    handleEvent={() => {
                        handleCreate()
                    }}
                >
                    <Plus /> Thêm Tài Khoản
                </ButtonIcon>
            </PageHeader>

            <div className="mt-5">
                <Search size={20} />
                <Table
                    columns={columns}
                    dataSource={accountData}
                // pagination={{ total, defaultCurrent: current, pageSize: 10 }}
                />
            </div>


            <ModalAccount
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={() => handleCancel()}
                title={"Thêm tài khoản"}
                form={form}
            >
                <FormAccount
                    form={form}
                    formItems={formItems}
                    formItemLayout={formItemLayout}
                // initialValues={{

                //     role: selectedRecord && selectedRecord?.role?.id, // ID của quyền đã chọn

                // }}

                />
            </ModalAccount>
        </>
    )
}

export default Account