import React, { Children, useEffect, useState } from "react";
import { Table, Badge, Popconfirm, Space, Input, Form, Select, DatePicker } from "antd";
import Search from '@/components/Search';
import PageHeader from '@/components/PageHeader';
import { Link, useParams } from 'react-router-dom';
import { projectDetailGetAPI } from "@/Services/ProjectService";
import { projectPartPostAPI } from "@/Services/ProjectPartService";
import { formatDate } from '@/utils/cn';
import { Pencil, Trash2, Plus } from 'lucide-react';
import ButtonIcon from '@/components/ButtonIcon'
// import { FaEye } from "react-icons/fa";
import ModalProjectPart from '@/components/modal/Modal';
import ModalProjectTask from '@/components/modal/Modal';

import FormProjectPart from '@/components/form/Form'
import FormProjectTask from '@/components/form/Form'



const itemsBreadcrumb = [
    { title: <Link to='/'>Home</Link> },
    { title: <Link to="/project">Dự án</Link> },
    { title: 'Chi tiết dự án' },
];

const ProjectDetail = () => {

    const { RangePicker } = DatePicker;

    const { id } = useParams();
    const { TextArea } = Input;
    const [projectData, setProjectData] = useState(null);
    const [data, setData] = useState(null);

    const[projectPartSelect,setProjectPartSelect] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");

    const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);

    const [form] = Form.useForm();
    const [formTask] = Form.useForm();
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






    // Cấu hình cột PARTS
    const partColumns = [
        { title: "Mã phần", dataIndex: "key", key: "key" },
        { title: "Tên phần", dataIndex: "name", key: "name" },
        { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
        { title: "Cập nhật gần nhất", dataIndex: "updated_at", key: "updated_at" },
        { title: "Tổng Hoàn thành", dataIndex: "completion", key: "completion", render: () => <Badge status="success" text={`0%`} /> },
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

                    <a onClick={() => handleCreateProjectTask(record)}><Plus></Plus></a>

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
            span: 9,
        },
        wrapperCol: {
            span: 18,
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

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    const options = [];
    for (let i = 10; i < 26; i++) {
        options.push({
            label: "nhân viên " + i,
            value: i.toString(36) + i,
        });
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    // Form items task
    const formItemsTask = [
        {
            name: "projectPart",
            label: "Mã phần dự án:",
            component: <Input />,
            props: { readOnly: true },
            hidden: false
        },
        {
            name: "nameTask",
            label: "Tên công việc:",
            component: <Input placeholder="Vui lòng nhập tên công việc" />,
            //   props: { readOnly: mode === "Info" && true },
            rules: [
                {
                    required: true,
                    message: 'Làm ơn nhập tên phần dự án',
                },
            ]
        },
        {
            name: "desTask",
            label: "Mô tả:",
            component: <TextArea placeholder="Vui lòng nhập mô tả"></TextArea>,
            //   props: { readOnly: mode === "Info" && true },
            rules: [
                {
                    required: true,
                    message: 'Làm ơn nhập tên phần dự án',
                },
            ]
        },
        {
            name: "resEmployee",
            label: "Người chịu tránh nhiệm:",
            component:
                <Select
                    showSearch
                    placeholder="Select a employee"
                    optionFilterProp="label"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                        {
                            value: 'jack',
                            label: 'Jack',
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                        {
                            value: 'tom',
                            label: 'Tom',
                        },
                    ]}
                />,
            rules: [
                {
                    required: true,
                    message: 'Làm ơn chọn người chịu trách nhiệm',
                },
            ]
        },

        {
            name: "WorksEmployee",
            label: "Người thực hiện:",
            component:
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                />,
            rules: [
                {
                    required: true,
                    message: 'Làm ơn chọn người chịu trách nhiệm',
                },
            ]
        },

        {
            name: "date",
            label: "Chọn thời gian:",
            // getValueFromEvent: (_, dateString) => dateString,
            component:
                < RangePicker
                    showTime
                    format={"DD/MM/YY : HH:mm"}
                    onChange={(date, dateString) => console.log("onChange", date, dateString)}
                ></RangePicker>,
            rules: [
                {
                    required: true,
                    message: 'Làm ơn chọn ngày thực hiện và kết thức',
                },
            ]
        },

        {
            name: "Priority",
            label: "Mức độ ưu tiên:",
            // getValueFromEvent: (_, dateString) => dateString,
            component:
                <Select
                    showSearch
                    placeholder="Select a priority"
                    optionFilterProp="label"
                    onChange={onChange}
                    options={[
                        {
                            value: 'low',
                            label: 'Thấp',
                        },
                        {
                            value: 'medium',
                            label: 'Trung Bình',
                        },
                        {
                            value: 'high',
                            label: 'Cao',
                        },
                    ]}
                />,
            rules: [
                {
                    required: true,
                    message: 'Làm ơn chọn ngày thực hiện và kết thức',
                },
            ]
        }

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

                setProjectData([dataItem, ...projectData,]);


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

    const handleCancelTask = () => {
        setIsModalTaskOpen(false)
    }

    const handleCreateProjectPart = () => {
        setTitle((data && data.name));
        form.resetFields()
        setMode("Add");
        showModal()
    }

    const handleCreateProjectTask = (value) => {
        formTask.resetFields()
        console.log(value)
        value && setProjectPartSelect(value);
        console.log("projectPartSelect",projectPartSelect)
        form.resetFields()
        setMode("Add");
        showModalTask()
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModalTask = () => {
        setIsModalTaskOpen(true);
    };

    const handleOkTask = async () => {
        const values = await formTask.validateFields();
        console.log('Success:', values);
    }

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

            <ModalProjectTask
                isModalOpen={isModalTaskOpen}
                setIsModalOpen={setIsModalTaskOpen}
                handleOk={handleOkTask}
                handleCancel={handleCancelTask}
                title={"Thêm Công Việc Mới"}
                form={formTask}

            >
                <FormProjectTask
                    formName={'formTask' + mode}
                    form={formTask}
                    formItemLayout={formItemLayout}
                    formItems={formItemsTask}
                    initialValues={{
                        projectPart: projectPartSelect && projectPartSelect.key
                    }}

                >

                </FormProjectTask>
            </ModalProjectTask>


        </>
    )
}

export default ProjectDetail