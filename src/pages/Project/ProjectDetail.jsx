import React, { Children, useEffect, useState } from "react";
import { Table, Badge, Popconfirm, Space, Input, Form } from "antd";
import Search from '@/components/Search';
import PageHeader from '@/components/PageHeader';
import { Link, useParams } from 'react-router-dom';
import { projectDetailGetAPI } from "@/Services/ProjectService";
import { projectPartPostAPI } from "@/Services/ProjectDetailService";
import { formatDate } from '@/utils/cn';
import { Pencil, Trash2, Plus } from 'lucide-react';
import ButtonIcon from '@/components/ButtonIcon'
// import { FaEye } from "react-icons/fa";
import ModalProjectPart from '@/components/modal/Modal';

import FormProjectPart from '@/components/form/Form'


const ProjectDetail = () => {

    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [data, setData] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [form] = Form.useForm();
    const [mode, setMode] = useState("");

    const fetchProject = async () => {
        console.log("chạy 1 lần")
        const data = await projectDetailGetAPI(id);
        if (data?.project_parts) {
            setData(data)
            const dataFillter = data.project_parts.map((data, index) => ({
                key: data.id,
                name: data.name,
                created_at: formatDate(data.created_at),
                updated_at: formatDate(data.updated_at),
                tasks: data.tasks
                    ? data.tasks.map((task) => {
                        const taskData = {
                            ...task,
                            key: "task" + task.id
                        };
                        // Chỉ thêm `children` nếu có `subtasks`
                        if (task.subtasks && task.subtasks.length > 0) {
                            taskData.children = task.subtasks.map((sub) => ({
                                ...sub,
                                key: "sub" + sub.id
                            }));
                        }
                        return taskData;
                    })
                    : []


            }))
            setProjectData(dataFillter);
        }
    };

    useEffect(() => {   
        fetchProject();
    }, [id]);


    const itemsBreadcrumb = [
        { title: <Link to='/'>Home</Link> },
        { title: <Link to="/project">Dự án</Link> },
        { title: 'Chi tiết dự án' },
    ];



    // Cấu hình cột PARTS
    const partColumns = [
        { title: "Mã phần", dataIndex: "key", key: "key" },
        { title: "Tên phần", dataIndex: "name", key: "name" },
        { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
        { title: "Cập nhật gần nhất", dataIndex: "updated_at", key: "updated_at" },
        { title: "Tổng Hoàn thành", dataIndex: "completion", key: "completion" },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a className='font-medium  ' onClick={() => handleEditProject(record)} ><Pencil size={20} /></a>

                    <Popconfirm
                        placement="bottomRight"
                        title="Xóa một Phòng Ban"
                        description="Bạn đã chắc chắn muốn xóa ?"
                        okText="Có"
                        cancelText="Không"
                    >

                        <a className=' font-medium  '><Trash2 size={20} /></a>
                    </Popconfirm>

                    <Link to={"/project/" + record.key} ><Plus></Plus></Link>

                </Space>
            ),
        },
    ];

    // Cấu hình cột TASKS
    const taskColumns = [
        { title: "Tên công việc", dataIndex: "name", key: "name" },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        { title: "Ưu tiên", dataIndex: "priority", key: "priority" },
        {
            title: "Hoàn thành (%)",
            dataIndex: "completion_percentage",
            key: "completion_percentage",
            render: (text) => <Badge status="success" text={`${text}%`} />,
        },
    ];


    const expandedRowRender = (part) => (
        <Table columns={taskColumns} dataSource={part.tasks} pagination={false} />
    );

    // tùy chỉnh form kích thước input
    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    // Form items
    const formItems = [
        {
            name: "project",
            label: "Mã Dự án:",
            component: <Input />,
            props: { readOnly: true },
            hidden: false
        },
        {
            name: "name",
            label: "Tên phần dự án:",
            component: <Input placeholder="Please input Department" />,
            //   props: { readOnly: mode === "Info" && true },
            rules: [
                {
                    required: true,
                    message: 'Làm ơn nhập tên phần dự án',
                },
            ]
        },

    ];

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);
            const dataNew = await projectPartPostAPI(values);
            if (dataNew) {
                const dataItem = {
                    key: dataNew.id,
                    name: dataNew.name,
                    created_at: formatDate(dataNew.created_at),
                    updated_at: formatDate(dataNew.updated_at),
                    tasks: dataNew.tasks || []
                }
              
                setProjectData([ dataItem, ...projectData,]);
        
                
            } else {
                console.log('lỗi')
            }
        } catch (error) {
            console.log('Failed:', error);
        }

        setIsModalOpen(false);

    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleCreateProjectPart = () => {
        setTitle((data && data.name));
        form.resetFields()
        setMode("Add");
        showModal()
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
        {/* <div>{projectData && JSON.stringify(projectData)}</div> */}
            <PageHeader title={(data && data.name)} itemsBreadcrumb={itemsBreadcrumb}>

                <ButtonIcon handleEvent={handleCreateProjectPart}>
                    <Plus /> Thêm Phần Dự Án Mới
                </ButtonIcon>

            </PageHeader>

            <div className='mt-5'>
                <Search size={20} />
            </div>

            <Table
                columns={partColumns}
                dataSource={projectData}
                // rowKey={(record) => getRowKey("part", record.id)}
                expandable={{
                    expandedRowRender: (part) => expandedRowRender(part),
                    rowExpandable: (record) => record.tasks.length > 0,
                }}
                pagination={false}

            />

            <ModalProjectPart
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                title={title}
                form={form}

            >
                <FormProjectPart
                    formName={'form' + mode}
                    form={form}
                    formItemLayout={formItemLayout}
                    formItems={formItems}
                    initialValues={{
                        project: data && data.id
                    }}>

                </FormProjectPart>
            </ModalProjectPart>
        </>
    )
}

export default ProjectDetail