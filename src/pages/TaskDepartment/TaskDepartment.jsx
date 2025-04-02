import React, { Children, useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Table, Tooltip, Badge, Popconfirm, Space, Input, Form, Select, DatePicker, Tag, Progress, Button, Avatar, Drawer, Col, Row, Switch } from "antd";
import Search from '@/components/Search';
import PageHeader from '@/components/PageHeader';
import { Link, useParams } from 'react-router-dom';

import { projectPartGetAPI } from "@/Services/ProjectService";
import { projectPartPostAPI, projectPartGetAPIForIdUser, projectPartGetAPIWithIdDepartment } from "@/Services/ProjectPartService";
// Employee API
import { employeeGetAllAPI, employeeGetAllAPIWithDepartment } from "@/Services/EmployeeService";

// Department API
import { departmentGetAPI } from "@/Services/DepartmentService"

// Task API
import { taskPost } from "@/Services/TaskService";
import { taskAssignmentsPost } from "@/Services/TaskAssignmentsService";
import { departmentTaskPost } from "@/Services/DepartmentTaskService";

import { formatDate } from '@/utils/cn';
import { Pencil, Trash2, Plus, MessageCircleMore, Bell, History, File, Pen, ArrowLeftRight } from 'lucide-react';
import ButtonIcon from '@/components/ButtonIcon'
// import { FaEye } from "react-icons/fa";
import ModalProjectPart from '@/components/modal/Modal';
import ModalProjectTask from '@/components/modal/Modal';

import FormProjectPart from '@/components/form/Form'
import FormProjectTask from '@/components/form/Form'
import { Chat, HeaderChat } from "@/components/Chat";

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ShowHistory from "@/components/ShowHistory";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";

import TitleTooltip from "@/components/tooltip/TitleTooltip";

const itemsBreadcrumb = [
    { title: <Link to='/'>Home</Link> },
    { title: 'Công việc phòng ban' },
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


const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const TaskDepartment = () => {

    // const { id } = useParams();
    const { auth, employeeContext } = useAuth();

    // Drawer
    const [open, setOpen] = useState(false);

    // Drawer check task
    const [openDrawerCheckList, setOpenDrawerCheckList] = useState(false);

    const [drawerData, setDrawerData] = useState("");

    const showDrawer = (record) => {
        console.log(record)
        setDrawerData(record);
        setOpen(true);
    };

    const showDrawerCheckList = (record) => {
        console.log(record)
        setDrawerData(record);
        setOpenDrawerCheckList(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onCloseDrawerCheckList = () => {
        setOpenDrawerCheckList(false);
    };

    const [isModalHistoryOpen, setIsModalHistoryOpen] = useState(false);

    const [isSubTaskForm, setIsSubTaskForm] = useState(false);

    const [projectPartData, setProjectPartData] = useState(null);

    const [projectdata, setProjectdata] = useState(null);

    // Chứa danh sách nhân viên
    const [employeesData, setEmployeesdata] = useState(null);


    const [projectPartSelect, setProjectPartSelect] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState("");

    const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);


    const [formTask] = Form.useForm();

    const [mode, setMode] = useState("");

    // const [isEmployeeTask, setIsEmployeeTask] = useState(true);

    const queryClient = useQueryClient();

    //láy dự án với id được truyền qua url
    const { data: project_part } = useQuery({
        queryKey: ["taskDepartment"], // Thêm id vào queryKey để cache riêng biệt
        queryFn: () => projectPartGetAPIWithIdDepartment(employeeContext.department), // Để React Query tự gọi API khi cần
        enabled: !!employeeContext.department, // Chỉ chạy khi id có giá trị hợp lệ
    });

    // Thêm 1 phần dự án
    // const { data: newProjectPart, mutate: mutateProjectPart } = useMutation({
    //     mutationFn: projectPartPostAPI,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({
    //             queryKey: ["taskDepartment", id], // Chỉ refetch đúng project có id đó
    //         });
    //     },
    // });

    // Thêm 1 công việc vào dự án
    const { mutateAsync: mutateTask } = useMutation({
        mutationFn: taskPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["taskDepartment"],
            });
        },
    });

    // Thêm 1 nhân viên vào công việc
    const { data: newTaskAssignments, mutate: mutateTaskAssignment } = useMutation({
        mutationFn: taskAssignmentsPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["taskDepartment"], // Chỉ refetch đúng project có id đó
            });
        },
    });



    //lấy ds nv
    const { data: employees } = useQuery({
        queryKey: ["employees"],
        queryFn: () => employeeGetAllAPIWithDepartment(auth?.employee?.department),
        enabled: !!auth?.employee?.department,
    });

    //lấy ds phòng ban
    // const { data: departments } = useQuery({
    //     queryKey: ["departments"],
    //     queryFn: departmentGetAPI,
    // });


    const setDataProjectPart = (data) => {
        const dataNew = data.map((part) => ({
            key: part.id,
            name: part.name,
            created_at: formatDate(part.created_at),
            updated_at: formatDate(part.updated_at),
            department_name: part.department.name,
            department_manager: part.department.manager ? part.department.manager : "",
            tasks: part.tasks ? part.tasks.map(setDataTask) : [],
            // isCreateProjectPart: employeeContext.position === "TP"
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
            isCreateTask: employeeContext.position !== "NV" && task.responsible_person.id === auth.id

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
        console.log("project_part", project_part);
        console.log("employeeContext", employeeContext.department);
        if (project_part) {
            console.log("TaskDepartment", project_part);
            setProjectdata(project_part)
            const dataFillter = setDataProjectPart(project_part);
            console.log("dataFillterv ", dataFillter);
            setProjectPartData(dataFillter);
        }

    }, [project_part]);

    useEffect(() => {
        if (employees) {
            setEmployeesdata(employees)
        }
    }, [employees])

    useEffect(() => {
        if (projectPartSelect) {
            console.log(projectPartSelect)
            formTask.setFieldsValue(projectPartSelect)
        }
    }, [formTask, projectPartSelect]);

    const getRandomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };


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

                    <Tooltip key={value.id} placement="topRight"

                        title={<TitleTooltip name={value.name} position={value.position} email={value.email}></TitleTooltip>}
                    >
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
            hidden: employeeContext.position !== "TP",
        },
    ];


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
                    <Progress percent={record.completion_percentage} />
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
            dataIndex: "responsible_person",
            key: "responsible_person",
            render: (value) => (


                value &&
                (<Avatar.Group>

                    <Tooltip placement="topRight"



                        title={<TitleTooltip name={value.name} position={value.position} email={value.email}></TitleTooltip>}
                    >
                        <Avatar style={{ backgroundColor: getRandomColor() }}> {value.name.split(" ").reverse().join(" ").charAt(0)}</Avatar>
                    </Tooltip>

                </Avatar.Group>)


            )
        },
        {
            title: "Nhóm thực hiện",
            dataIndex: "doers",
            key: "doers",
            width: "18%",
            render: (value) => (
                <> <Avatar.Group>
                    {value.map((item) => (
                        <Tooltip key={item.id} placement="topRight"



                            title={<TitleTooltip name={item.name} position={item.position} email={item.email}></TitleTooltip>}
                        >
                            <Avatar style={{ backgroundColor: getRandomColor() }}> {item.name.split(" ").reverse().join(" ").charAt(0)}</Avatar>
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


                    {console.log("record", record)}

                    {record.isCreateTask && (
                        <>
                            <Button shape="circle" size="medium" type="primary" onClick={() => handleCreateSubTask(record)}><Plus size={18} /></Button>

                            <Button shape="circle" size="medium" color="pink" variant="solid" onClick={() => console.log("bekk")}><Bell size={18} /></Button>

                            <Button shape="circle" size="medium" color="gold" variant="solid" onClick={() => showDrawerCheckList(record)} ><File size={18} /></Button>


                            <Button shape="circle" size="medium" color="purple" variant="solid" ><Pen size={18} /></Button>

                            <Button shape="circle" size="medium" color="lime" variant="solid" ><ArrowLeftRight size={18} /></Button>
                        </>
                    )}




                    <Button shape="circle" size="medium" color="cyan" variant="solid" onClick={() => showDrawer(record)}><MessageCircleMore size={18} /></Button>






                    <Button shape="circle" size="medium" color="volcano" variant="solid" onClick={() => setIsModalHistoryOpen(true)}><History size={18} /></Button>








                </Space>
            ),

        },

    ];

    const onChangeCheckBox = (checked, record) => {
        console.log(`switch to ${checked}`);
    
        console.log(record);
      };

    const checkListFileColumns = [
        {
            title: "Tên nhân viên",
            dataIndex: "name",
            key: "name",
            width: "18%",
            render: (text) => (
                <>
                    <p>{text}</p>
                </>
            )
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone_number",
            key: "phone_number",
            width: "12%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "15%",
            render: (text) => (
                <>
                    <p>{text}</p>
                </>
            )
        },
        {
            title: "Chức vụ",
            dataIndex: "position",
            key: "position",
            render: (text) => (
                text === "TP" ? 'Trưởng Phòng' :
                    text === "TN" ? 'Trưởng nhóm' :
                        'Nhân viên'
            ),
            width: "12%",
        },
        {
            title: "File",
            dataIndex: "upload",
            key: "upload",
            width: "15%",
            // render: (_, record) => (
            // //    <Upload {...props}>
            // //         <Button icon={<UploadOutlined />}>Upload</Button>
            // //     </Upload>
            // ),

        },
        {
            title: "Chức năng",
            dataIndex: "action",
            key: "action",
            width: "17%",
            render: (_, record) => (
                <Space size="middle">
                    <Switch
                    onChange={(checked)=>onChangeCheckBox(checked,record)}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        // defaultChecked={false}
                    />
                   

                </Space>
            ),

        },

    ]

    const expandedRowRender = (part) => (
        <Table columns={taskColumns} dataSource={part.tasks} pagination={false} indentSize={20} childrenColumnName={'subtasks'} />
    );


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
                        label: `${item.name} - ${item.position === "TP" ? "Trưởng phòng" : item.position === "TN" ? "Trưởng nhóm" : "Nhân viên"}`,
                    }))}
                />,
            // props: { disabled: !isEmployeeTask },
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
                    options={employeesData
                        ?.filter(item => item.position !== "TP") // Lọc bỏ Trưởng phòng
                        .map(item => ({
                            value: item.id,
                            label: `${item.name} - ${item.position === "TN" ? "Trưởng nhóm" : "Nhân viên"}`
                        }))}
                />,
            // props: { disabled: !isEmployeeTask },
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



    const handleCancelTask = () => {
        setIsModalTaskOpen(false)
    }

    // const handleCreateProjectPart = () => {
    //     setTitle((projectdata && projectdata.name));
    //     form.resetFields()
    //     setMode("Add");
    //     showModal()
    // }

    const handleCreateProjectTask = (value) => {

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

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

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

            {/* Drawr check list File */}
            <Drawer
                // title={''}
                title={<HeaderChat data={drawerData} onClose={onCloseDrawerCheckList}></HeaderChat>}
                onClose={onCloseDrawerCheckList}
                open={openDrawerCheckList}
                width={'50%'}
                maskClosable={false}
                loading={false}
                closable={false}
            >
                <Table
                    columns={checkListFileColumns}
                    dataSource={drawerData.doers}
                ></Table>

            </Drawer>

            <ShowHistory isModalOpen={isModalHistoryOpen} setIsModalOpen={setIsModalHistoryOpen}></ShowHistory>

        </>
    )
}

export default TaskDepartment