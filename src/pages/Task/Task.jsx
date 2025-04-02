import React, { useEffect, useState } from 'react'
// import ModalAccount from "@/components/modal/Modal";
import ModalUpload from "@/components/modal/Modal";
import FormAccount from "@/components/form/Form";
import PageHeader from "@/components/PageHeader";
import ButtonIcon from "@/components/ButtonIcon";
import { Table, Tooltip, Badge, Popconfirm, Space, Input, Form, Select, DatePicker, Tag, Progress, Avatar, Drawer, Col, Row, Switch } from "antd";

import { Pencil, Trash2, Plus } from "lucide-react";
import Search from "@/components/Search";

import { UploadOutlined, SearchOutlined, InboxOutlined } from '@ant-design/icons';

import { Button, message, Upload } from 'antd';
import { taskGetWithId } from '@/services/TaskService';
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { formatDate, getRandomColor } from '@/utils/cn';
import TitleTooltip from "@/components/tooltip/TitleTooltip";
const { Dragger } = Upload;
const getAccessToken = () => localStorage.getItem("access");
const props = {
    name: 'file',
    data: {
        name: 'file',  // Thêm tên file hoặc bất kỳ dữ liệu bổ sung nào
        link: 'http://example.com/link',  // Thêm đường dẫn nếu cần
    },
    action: 'http://localhost:8000/api/files/',
    headers: {
        Authorization: `Bearer ${getAccessToken()}`,  // If using authentication
    },
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
// const props = {
//     name: 'file',
//     action: 'http://localhost:8000/api/files/',
//     headers: {
//         Authorization: `Bearer ${getAccessToken()}`,  // If using authentication
//     },
//     onChange(info) {
//         const { status, name, response } = info.file;

//         // Check for upload status
//         if (status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }

//         // Handle success or error
//         if (status === 'done') {
//             message.success(`${name} file uploaded successfully.`);
//             // Retrieve file name and link from the server response
//             const fileName = name; // File name
//             const fileLink = response?.link || ''; // Assuming response contains the link
//             console.log('Uploaded file details:', { fileName, fileLink });
//         } else if (status === 'error') {
//             message.error(`${name} file upload failed.`);
//         }
//     },
//     onDrop(e) {
//         console.log('Dropped files', e.dataTransfer.files);
//     },
// };

const Task = () => {

    const { auth, employeeContext } = useAuth();

    const queryClient = useQueryClient();

    const [current, setCurrent] = useState(1)

    const [total, setTotal] = useState(0)

    const [taskData, setTaskData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    //láy dự án với id được truyền qua url
    const { data: tasks, isLoading } = useQuery({
        queryKey: ["tasks"], // Thêm id vào queryKey để cache riêng biệt
        queryFn: () => taskGetWithId(employeeContext?.id), // Để React Query tự gọi API khi cần
        enabled: !!employeeContext?.id, // Chỉ chạy khi id có giá trị hợp lệ
    });



    useEffect(() => {
        console.log('employeeContext', employeeContext)
        console.log('Task', tasks)
        if (tasks && tasks.data) {

            const results = tasks.data.map((item) => ({
                ...item,
                priority: item.priority === 0 ? "Thấp" : item.priority === 1 ? "Trung Bình" : "Cao",
                key: item.id,
                startTime: formatDate(item.start_time),
                endTime: formatDate(item.end_time),
            }));
            setTaskData(results);
            setTotal(tasks.count);
            console.log('taskData', taskData)
        }
    }, [tasks]);


    const priorityOrder = {
        "Thấp": 1,
        "Trung Bình": 2,
        "Cao": 3
    };

    // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    //     <div style={{ padding: 8 }}>
    //         <Input
    //             placeholder="Nhập từ khóa..."
    //             value={selectedKeys[0]}
    //             onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //             onPressEnter={() => confirm()}
    //             style={{ marginBottom: 8, display: "block" }}
    //         />
    //         <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
    //             Tìm
    //         </Button>
    //         <Button onClick={() => clearFilters()} size="small" style={{ width: 90, marginTop: 8 }}>
    //             Xóa
    //         </Button>
    //     </div>
    // ),
    // onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
    // filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,

    const columns = [
        {
            title: "Tên công việc",
            dataIndex: "name",
            key: "name",
            width: "20%",
            render: (text) => (
                <>
                    <p>{text}</p>
                </>
            ),

            // filters: taskData.map((item) => ({
            //     text: item.name,
            //     value: item.name,
            // })),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    {/* Tùy chỉnh dropdown filter */}
                    <Input
                        autoFocus
                        placeholder="Tìm kiếm theo tên công việc"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => clearFilters && clearFilters()}
                        >
                            Reset
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => confirm()}
                        >
                            Tìm
                        </Button>
                    </Space>
                </div>
            ),

            onFilter: (value, record) => record.name.toLowerCase().startsWith(value.toLowerCase()), // So sánh không phân biệt hoa/thường
            filterSearch: true,
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startTime",
            key: "startTime",
            width: "11%",
            sorter: (a, b) => {
                const dateA = new Date(a.startTime.split("-").reverse().join("-"));
                const dateB = new Date(b.startTime.split("-").reverse().join("-"));
                return dateA - dateB; // Sắp xếp theo số (timestamp)
            },
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endTime",
            key: "endTime",
            width: "11%",
            sorter: (a, b) => {
                const dateA = new Date(a.endTime.split("-").reverse().join("-"));
                const dateB = new Date(b.endTime.split("-").reverse().join("-"));
                return dateA - dateB; // Sắp xếp theo số (timestamp)
            },
            // showSorterTooltip: { title: "Sắp xếp theo ngày" }, // Custom tooltip

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
            sorter: (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority], // Sắp xếp theo số

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
            title: "File",
            dataIndex: "upload",
            key: "upload",
            width: "10%",
            render: (_, record) => (

                <Button onClick={handleOpen} icon={<UploadOutlined />}>Upload</Button>

            ),

        },
        {
            title: "Chức năng",
            dataIndex: "action",
            key: "action",
            width: "17%",
            render: (_, record) => (
                <Space size="middle">

                    <ButtonIcon handleEvent={() => handleCreateSubTask(record)}><Plus size={18} /></ButtonIcon>

                </Space>
            ),

        },

    ];

    const data = [
        {
            key: '1',
            name: 'Công Việc 1',
            created_at: '1/1/2025',
            end_time: "10/1/2025",
            priority: "Trung Bình",
            responsible: "Trần Quang Trường",
            listWork: ""
        },
        {
            key: '2',
            name: 'Công Việc 2',
            created_at: '1/1/2025',
            end_time: "10/1/2025",
            priority: "Thấp",
            responsible: 'Duy Cửu',
            listWork: "",
        },
        {
            key: '3',
            name: 'Công Việc 3',
            created_at: '1/1/2025',
            end_time: "10/1/2025",
            priority: "Cao",
            responsible: 'Quy',
            listWork: "",
        },

    ];

    const onChange = page => {
        console.log(page);
        setCurrent(page);
    };

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const handleUpload = () => {

    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <PageHeader title={"Công Việc"}>

            </PageHeader>

            <div className="mt-5">
                {/* <Space align="center" className='mb-5'>
                    <Search size={20} />
                    <Select
                       placeholder='Lọc theo '
                        size='large'
                        // style={{ width: 120 }}
                        // onChange={handleChange}
                        options={[
                            { value: 'priority', label: 'Ưu tiên' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />

                </Space> */}
                <Table
                    columns={columns}
                    dataSource={taskData}
                    loading={isLoading}
                    // pagination={{ total, defaultCurrent: current, pageSize: 10 }}
                    pagination={{
                        total: total,
                        defaultCurrent: current,
                        pageSize: 5, // Mặc định 10 dòng mỗi trang
                        onChange: onChange

                    }}
                    locale={{
                        triggerDesc: "Sắp xếp giảm dần",
                        triggerAsc: "Sắp xếp tăng dần",
                        cancelSort: "Hủy sắp xếp"
                    }}
                />
            </div>

            <ModalUpload
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleOk={handleUpload}
                handleCancel={handleCancel}
                title={"Tải file"}

            >
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>

            </ModalUpload>


        </>
    )
}

export default Task