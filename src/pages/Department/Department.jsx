import React, { useState, useEffect } from "react";
import { Space, Tag, Popconfirm, Form, Input, Select, Table, Drawer } from "antd";
import { Pencil, Trash2, Plus } from "lucide-react";
import Search from "@/components/Search";
import ModalDepartment from "@/components/modal/Modal";
import FormDepartment from "@/components/form/Form";
import PageHeader from "@/components/PageHeader";
import ButtonIcon from "@/components/ButtonIcon";
import { departmentGetAPI, departmentPostAPI, departmentPutAPI, departmentDeleteAPI, employeeGetAPI } from "@/Services/DepartmentService";
import useWebSocket from "../../Services/useWebSocket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const Department = () => {
    const [data, setData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [title, setTitle] = useState("");
    const [mode, setMode] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const departmentUpdate = useWebSocket("ws://127.0.0.1:8000/ws/departments/");

    const { data: dataEmployees } = useQuery({
        queryKey: ["employees"],
        queryFn: employeeGetAPI,
    });

    useEffect(() => {
        setEmployees(dataEmployees || []);
    }, [dataEmployees]);

    const queryClient = useQueryClient();
    const { data: dataDepartment } = useQuery({
        queryKey: ["departments"],
        queryFn: departmentGetAPI,
    });
    useEffect(() => {
        if (departmentUpdate) {
            queryClient.invalidateQueries(["departments"]);
        }
    }, [departmentUpdate, queryClient]);
    const { data: dataDepartmentPut, mutate: mutatePut } = useMutation({
        mutationFn: departmentPutAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });
        },
    });
    //thêm nv
    const { data: newData, mutate: mutatePost } = useMutation({
        mutationFn: departmentPostAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });
        },
    });
    function setDataDepartments(departments) {
        return departments?.map((dept) => ({
            key: dept.id,
            name: dept.name,
            manager: dept.manager ? dept.manager.name : "Chưa có trưởng phòng",
            description: dept.description ? dept.description : "Không có mô tả phòng ban",
        }));
    }
    useEffect(() => {
        if (dataDepartment) {
            setData(setDataDepartments(dataDepartment));
        }
    }, [dataDepartment]);
    useEffect(() => {
        if (selectedDepartment) form.setFieldsValue(selectedDepartment);
    }, [form, selectedDepartment]);

    const handleEditDepartment = (record) => {
        setTitle("Sửa Phòng Ban");
        setSelectedDepartment(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
        setMode("Edit");
    };

    const handleDeleteDepartment = async (id) => {
        await departmentDeleteAPI(id);
        setData((prevData) => prevData.filter((item) => item.key !== id));
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                ...values,
                manager: !values.manager || values.manager === "Chưa có trưởng phòng" ? null : values.manager,
            };

            console.log("Payload gửi đi:", payload);

            if (mode === "Edit") {
                mutatePut({ id: selectedDepartment.key, obj: payload });
            } else {
                mutatePost(payload);
            }
        } catch (error) {
            console.error("Lỗi xác thực form:", error);
        }
        setIsModalOpen(false);
    };

    const formItems = [
        {
            name: "name",
            label: "Tên Phòng Ban",
            component: <Input placeholder="Hãy nhập tên phòng ban" />,
            rules: [{ required: true, message: "Làm ơn nhập tên phòng ban" }],
        },
        {
            name: "manager",
            label: "Trưởng Phòng",
            component: (
                <Select
                    placeholder="Chọn trưởng phòng"
                    allowClear
                >
                    {employees.map((emp) => (
                        <Select.Option
                            key={emp.id}
                            value={emp.id}
                        >
                            {emp.name}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            name: "description",
            label: "Mô tả",
            component: <Input placeholder="Mô tả phòng ban" />,
            rules: [{ required: false, message: "Hãy mô tả phòng ban" }],
        },
    ];

    const columns = [
        { title: "ID", dataIndex: "key", key: "key" },
        { title: "Tên Phòng Ban", dataIndex: "name", key: "name", render: (text) => <span>{text}</span> },
        { title: "Trưởng Phòng", dataIndex: "manager", key: "manager" },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        // { title: 'Trạng Thái', dataIndex: 'is_deleted', key: 'is_deleted', render: (text) => <Tag color={text === "Ngừng hoạt động" ? "volcano" : "green"}>{text}</Tag> },
        {
            title: "Hành Động",
            key: "action",
            render: (_, record) => (
                <Space>
                    <a onClick={() => handleEditDepartment(record)}>
                        <Pencil size={20} />
                    </a>
                    <Popconfirm
                        title="Xóa phòng ban?"
                        onConfirm={() => handleDeleteDepartment(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <a>
                            <Trash2 size={20} />
                        </a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <PageHeader title={"Phòng Ban"}>
                <ButtonIcon
                    handleEvent={() => {
                        form.resetFields();
                        setTitle("Thêm Phòng Ban");
                        setMode("Add");
                        setIsModalOpen(true);
                    }}
                >
                    <Plus /> Thêm Phòng Ban Mới
                </ButtonIcon>
            </PageHeader>
            <Search size={20} />
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ showSizeChanger: true, pageSizeOptions: ["10", "20", "50", "100"] }}
            />
            <ModalDepartment
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={() => setIsModalOpen(false)}
                title={title}
                form={form}
            >
                <FormDepartment
                    form={form}
                    formItems={formItems}
                />
            </ModalDepartment>
        </>
    );
};

export default Department;
