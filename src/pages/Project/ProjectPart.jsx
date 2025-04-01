import React, { Children, useEffect, useState } from "react";
import { Table, Tooltip, Badge, Popconfirm, Space, Input, Form, Select, DatePicker, Tag, Progress, Button, Avatar, Drawer } from "antd";
import Search from '@/components/Search';
import PageHeader from '@/components/PageHeader';
import { Link, useParams } from 'react-router-dom';

import { projectPartGetAPI } from "@/Services/ProjectService";
import { projectPartPostAPI } from "@/Services/ProjectPartService";
// Employee API
import { employeeGetAPI } from "@/Services/EmployeeService";

// Department API
import { departmentGetAPI } from "@/Services/DepartmentService"

// Task API
import { taskPost } from "@/Services/TaskService";
import { taskAssignmentsPost } from "@/Services/TaskAssignmentsService";
import { departmentTaskPost } from "@/Services/DepartmentTaskService";

import { formatDate } from '@/utils/cn';
import { Pencil, Trash2, Plus, MessageCircleMore, Bell, History} from 'lucide-react';
import ButtonIcon from '@/components/ButtonIcon'
// import { FaEye } from "react-icons/fa";
import ModalProjectPart from '@/components/modal/Modal';
import ModalProjectTask from '@/components/modal/Modal';

import FormProjectPart from '@/components/form/Form'
import FormProjectTask from '@/components/form/Form'
import { Chat, HeaderChat } from "./components/Chat";

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ShowHistory from "@/pages/Project/components/ShowHistory";

import { useNavigate } from "react-router-dom";


const itemsBreadcrumb = [
    { title: <Link to='/'>Home</Link> },
    { title: <Link to="/project">Dự án</Link> },
    { title: 'Phần dự án' },
];

// tùy chỉnh form kích thước input
const formItemLayout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 18,
    },
};

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const ProjectDetail = () => {

    const { id } = useParams();

    // Drawer
    const [open, setOpen] = useState(false);
    const [drawerData, setDrawerData] = useState("");

    const showDrawer = (record) => {
        console.log(record)
        setDrawerData(record);
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const [isModalHistoryOpen, setIsModalHistoryOpen] = useState(false);

    const [isSubTaskForm, setIsSubTaskForm] = useState(false);

    const [projectPartData, setProjectPartData] = useState(null);

    const [projectdata, setProjectdata] = useState(null);

    // Chứa danh sách nhân viên
    const [employeesData, setEmployeesdata] = useState(null);

    // Chứa danh sách phòng ban
    const [departmentsData, setDepartmentsData] = useState(null);

    const [projectPartSelect, setProjectPartSelect] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState("");

    const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);

    const [form] = Form.useForm();

    const [formTask] = Form.useForm();

    const [mode, setMode] = useState("");

    // check phân công cho cá nhân hay phòng ban
    const [isDepartmentTask, setIsDepartmentTask] = useState(true);

    const [isEmployeeTask, setIsEmployeeTask] = useState(true);

    const queryClient = useQueryClient();

    //láy dự án với id được truyền qua url
    const { data: project } = useQuery({
        queryKey: ["project", id], // Thêm id vào queryKey để cache riêng biệt
        queryFn: () => projectPartGetAPI(id), // Để React Query tự gọi API khi cần
        enabled: !!id, // Chỉ chạy khi id có giá trị hợp lệ
    });

    // Thêm 1 phần dự án
    const { data: newProjectPart, mutate: mutateProjectPart } = useMutation({
        mutationFn: projectPartPostAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["project", id], // Chỉ refetch đúng project có id đó
            });
        },
    });

    // Thêm 1 công việc vào dự án
    const { mutateAsync: mutateTask } = useMutation({
        mutationFn: taskPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["project", id],
            });
        },
    });

    // Thêm 1 nhân viên vào công việc
    const { data: newTaskAssignments, mutate: mutateTaskAssignment } = useMutation({
        mutationFn: taskAssignmentsPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["project", id], // Chỉ refetch đúng project có id đó
            });
        },
    });



    //lấy ds nv
    const { data: employees } = useQuery({
        queryKey: ["employees"],
        queryFn: employeeGetAPI,
    });

    //lấy ds phòng ban
    const { data: departments } = useQuery({
        queryKey: ["departments"],
        queryFn: departmentGetAPI,
    });


    const setDataProjectPart = (data) => {
        const dataNew = data.map((part) => ({
            key: part.id,
            name: part.name,
            created_at: formatDate(part.created_at),
            updated_at: formatDate(part.updated_at),
            department_name: part.department.name,
            department_manager: part.department.manager ? part.department.manager : "",
            tasks: part.tasks ? part.tasks.map(setDataTask) : [],
        }));

        return dataNew
    }
    const setDataTask = (task) => {
        const taskData = {
            ...task,
            priority: task.priority === 0 ? "Thấp" : task.priority === 1 ? "Trung Bình" : "Cao",
            key: "task" + task.id,
            created_at: formatDate(task.created_at),
            end_time: formatDate(task.end_time),
            listWork: task.task_assignments
                .filter((item) => item.role !== "RESPONSIBLE")
                .map((item) => ({
                    id: item.id,
                    employeeName: item.employee.name,  // Lấy tên nhân viên
                })),
            responsible: task.task_assignments
                .filter((item) => item.role === "RESPONSIBLE")
                .map((item) => ({
                    id: item.id,
                    employeeName: item.employee.name,  // Lấy tên nhân viên
                })),
        };

        // Nếu task có subtasks, gọi đệ quy để xử lý tất cả các cấp
        if (task.subtasks && task.subtasks.length > 0) {
            taskData.subtasks = task.subtasks.map(sub => ({
                ...setDataTask(sub), // Gọi đệ quy
                key: "sub" + sub.id,
            }));
        } else {
            delete taskData.subtasks; // Xóa thuộc tính `subtasks` nếu không có dữ liệu
        }


        return taskData;
    }

    useEffect(() => {
        console.log("chạy 1 lần");
        if (project) {
            setProjectdata(project)
            const dataFillter = setDataProjectPart(project.project_parts);
            console.log("dataFillterv ", dataFillter);
            setProjectPartData(dataFillter);
        }

    }, [id, project]);

    useEffect(() => {
        if (employees) {
            setEmployeesdata(employees)
            setDepartmentsData(departments)
        }
    }, [employees, departments])

    useEffect(() => {
        if (projectPartSelect) {
            console.log(projectPartSelect)
            formTask.setFieldsValue(projectPartSelect)
        }
    }, [formTask, projectPartSelect]);

    // Cấu hình cột PARTS
    const partColumns = [
        // { title: "Mã phần", dataIndex: "key", key: "key" },
        { title: "Tên phần", dataIndex: "name", key: "name", width: "25%" },
        { title: "Phòng ban", dataIndex: "department_name", key: "department_name" },
        {
            title: "Chịu trách nhiệm",
            dataIndex: "department_manager",
            key: "department_manager",
            render: (value) => (


                value &&
                (<Avatar.Group>
                    
                    <Tooltip key={value.id} placement="topRight" title={value.name}>
                        <Avatar style={{ backgroundColor: getRandomColor() }}> {value.name.split(" ").reverse().join(" ").charAt(0)}</Avatar>
                    </Tooltip>
                   
                </Avatar.Group>)


            )
        },
        { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
        { title: "Cập nhật gần nhất", dataIndex: "updated_at", key: "updated_at" },
       {
            title: 'Chức Năng',
            key: 'action',
            width: '15%',
            render: (_, record) => (
                <Space size="middle">

                    <ButtonIcon handleEvent={() => handleCreateProjectTask(record)}><Plus></Plus> Công việc</ButtonIcon>

                </Space>
            ),
        },
    ];

    const getRandomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };


    // Cấu hình cột TASKS
    const taskColumns = [
        {
            title: "Tên công việc",
            dataIndex: "name",
            key: "name",
            width: "20%",
            render: (text, record) => (
                <>
                    <a onClick={() => showDrawer(record)}>{text}</a>
                    <Progress percent={0} />
                </>
            )
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "created_at",
            key: "created_at",
            width: "11%",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "end_time",
            key: "end_time",
            width: "11%",
        },
        // { title: "Mô tả", dataIndex: "description", key: "description" },
        {
            title: "Ưu tiên",
            dataIndex: "priority",
            key: "priority",
            width: "10%",
            render: (text) => (
                text === "Thấp" ? <Tag color="green">{text}</Tag> :
                    text === "Trung Bình" ? <Tag color="yellow">{text}</Tag> :
                        <Tag color="red">{text}</Tag>
            ),
        },
        {
            title: "Chịu trách nhiệm",
            dataIndex: "responsible",
            key: "responsible",
            render: (value) => (


                value &&
                (<Avatar.Group>
                    {value.map((item) => (
                        <Tooltip key={item.id} placement="topRight" title={item.employeeName}>
                            <Avatar style={{ backgroundColor: getRandomColor() }}> {item.employeeName.split(" ").reverse().join(" ").charAt(0)}</Avatar>
                        </Tooltip>
                    ))}
                </Avatar.Group>)


            )
        },
        {
            title: "Nhóm",
            dataIndex: "listWork",
            key: "listWork",
            width: "18%",
            render: (value) => (
                <> <Avatar.Group>
                    {value.map((item) => (
                        <Tooltip key={item.id} placement="topRight" title={item.employeeName}>
                            <Avatar style={{ backgroundColor: getRandomColor() }}> {item.employeeName.split(" ").reverse().join(" ").charAt(0)}</Avatar>
                        </Tooltip>
                    ))}
                </Avatar.Group>
                </>
            )
        },
        {
            title: "Chức năng",
            dataIndex: "action",
            key: "action",
            width: "17%",
            render: (_, record) => (
                <Space size={[8, 16]} wrap >

                    <Button  shape="circle" size="medium" type="primary" onClick={() => handleCreateSubTask(record)}><Plus size={18} /></Button>

                    <Button  shape="circle" size="medium" color="cyan" variant="solid" onClick={() => showDrawer(record)}><MessageCircleMore size={18} /></Button>
                   
                    <Button  shape="circle" size="medium" color="pink" variant="solid" onClick={() => console.log("bekk")}><Bell size={18} /></Button>
                    
                    <Button  shape="circle" size="medium" color="volcano" variant="solid" onClick={() => setIsModalHistoryOpen(true)}><History size={18} /></Button>

                  
                </Space>
            ),

        },

    ];

    const expandedRowRender = (part) => (
        <Table columns={taskColumns} dataSource={part.tasks} pagination={false} indentSize={20} childrenColumnName={'subtasks'} />
    );


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
        {
            name: "department_id",
            label: "Nhóm thực hiện:",
            component:
                <Select
                    // mode="multiple"
                    // allowClear
                    showSearch
                    placeholder="Vui lòng chọn phòng ban"
                    optionFilterProp="label"
                    // onChange={onChangeDepartmentTask}
                    // options={options}
                    options={departmentsData?.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                />,
            rules:  [
                {
                    required: true,
                    message: 'Làm ơn chọn nhóm thực hiện',
                },
            ],

        },

    ];

    const onChangeRes = (value) => {
        console.log(`selected ${value}`);
        if (isDepartmentTask) {
            setIsDepartmentTask(false)
            // Reset validation lỗi cho DepartmentTask
            formTask.setFields([
                {
                    name: "DepartmentTask",
                    errors: [], // Xóa lỗi hiển thị trên field
                },
            ]);
        }

    };

   
    const onSearch = (value) => {
        console.log('search:', value);
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
            name: "task",
            label: "Mã công việc cha:",
            component: <Input />,
            props: { readOnly: true },
            hidden: !isSubTaskForm
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
                    // onChange={onChangeRes}
                    onSearch={onSearch}
                    options={employeesData?.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                />,
            props: { disabled: !isEmployeeTask },
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
                    // onChange={onChangeEmployee}
                    // options={options}
                    options={employeesData?.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                />,
            props: { disabled: !isEmployeeTask },
            rules: [
                {
                    required: true,
                    message: 'Làm ơn chọn người chịu trách nhiệm',
                },
            ],

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
                    // onChange={onChange}
                    options={[
                        {
                            value: '0',
                            label: 'Thấp',
                        },
                        {
                            value: '1',
                            label: 'Trung Bình',
                        },
                        {
                            value: '2',
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

    // Hàm thêm phần công việc
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('Success:', values);


            mutateProjectPart(values)

       
            setIsModalOpen(false);
        } catch (error) {
            console.log('Failed:', error);
        }



    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleCancelTask = () => {
        setIsModalTaskOpen(false)
    }

    const handleCreateProjectPart = () => {
        setTitle((projectdata && projectdata.name));
        form.resetFields()
        setMode("Add");
        showModal()
    }

    const handleCreateProjectTask = (value) => {
        setIsDepartmentTask(true)
        setIsEmployeeTask(true)
        setIsSubTaskForm(false)
        formTask.resetFields()
        console.log("handleCreateProjectTask", value)
        value && setProjectPartSelect({
            projectPart: value.key,
        });
        console.log("projectPartSelect", projectPartSelect)
        setMode("Add");
        showModalTask()
    }

    const handleCreateSubTask = (value) => {
        setIsSubTaskForm(true)
        setIsDepartmentTask(true)
        setIsEmployeeTask(true)
        formTask.resetFields()
        console.log("handleCreateSubTask", value)
        value && setProjectPartSelect({
            projectPart: value.project_part,
            task: value.id
        });
        console.log("projectPartSelect", projectPartSelect)
        setMode("Add");
        showModalTask()
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModalTask = () => {
        setIsModalTaskOpen(true);
    };




    // Thêm Công việc mới 
    const handleOkTask = async () => {
        try {
            const values = await formTask.validateFields();
            values.date = values.date?.map(d => d.format("YYYY-MM-DDThh:mm"));
            console.log('Validated Values:', values);

            const valueNew = {
                name: values.nameTask,
                description: values.desTask,
                priority: values.Priority,
                start_time: values.date?.[0] || null,
                end_time: values.date?.[1] || null,
                task_status: 'TO_DO',
                completion_percentage: "0",
                is_deleted: false,
                project_part: values.projectPart,
                parent_task: isSubTaskForm ? values.task : null
            };

            // await createTask(values, valueNew, isSubTaskForm);
            const dataTask = await mutateTask(valueNew);
            console.log("dataTask", dataTask);
            if (values.resEmployee) {
                mutateTaskAssignment({
                    employee: values.resEmployee,
                    role: 'RESPONSIBLE',
                    task: dataTask.id
                })
            }
            if (values.WorksEmployee?.length > 0) {
                await Promise.all(
                    values.WorksEmployee.map(employee => mutateTaskAssignment(
                        {
                            employee: employee,
                            role: 'DOER',
                            task: dataTask.id
                        }
                    ))
                );
            }
              // Gửi API tạo DepartmentTask
        // else if (values.DepartmentTask?.length > 0) {
        //     await Promise.all(
        //         values.DepartmentTask.map(department => 
        //             mutateDepartmentTask(
        //                 { department: department, 
        //                     task: dataTask.id 
        //                 },
        //             )
        //         )
        //     );
        // }


            setIsModalTaskOpen(false);
        } catch (error) {
            console.error('Validation Failed:', error);
        }
    };



    return (
        <>
            {/* <div>{projectPartData && JSON.stringify(projectPartData)}</div> */}
            <PageHeader title={(projectdata && projectdata.name)} itemsBreadcrumb={itemsBreadcrumb}>

                <ButtonIcon handleEvent={handleCreateProjectPart}>
                    <Plus /> Thêm Phần Dự Án Mới
                </ButtonIcon>

            </PageHeader>

            <div className='mt-5'>
                <Search size={20} />
            </div>

            <Table
                columns={partColumns}
                dataSource={projectPartData}
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
                        project: project && project.id
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


                >

                </FormProjectTask>
            </ModalProjectTask>

            <Drawer
                title={<HeaderChat data={drawerData} onClose={onClose}></HeaderChat>}
                onClose={onClose}
                open={open}
                width={'40%'}
                maskClosable={false}
                loading={false}
                closable={false}
            >
                <Chat></Chat>
            </Drawer>

<ShowHistory isModalOpen={isModalHistoryOpen} setIsModalOpen={setIsModalHistoryOpen}></ShowHistory>

        </>
    )
}

export default ProjectDetail