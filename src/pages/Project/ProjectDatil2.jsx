import React, { useEffect, useState } from "react";
import { Table, Badge } from "antd";
import Search from '@/components/Search';
import PageHeader from '@/components/PageHeader';
import { Link, useParams } from 'react-router-dom';
import { projectDetailGetAPI } from "@/Services/ProjectDetailService";
import { formatDate } from '@/utils/cn';

const itemsBreadcrumb = [
    { title: <Link to='/'>Home</Link> },
    { title: <Link to="/project">Dự án</Link> },
    { title: 'Chi tiết dự án' },
];

// Tạo `rowKey` duy nhất cho mỗi phần tử
const getRowKey = (type, id) => `${type}_${id}`;

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

// Cấu hình cột PARTS
const partColumns = [
    { title: "Tên phần", dataIndex: "name", key: "name" },
    { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
    { title: "Cập nhật gần nhất", dataIndex: "updated_at", key: "updated_at" },
    { title: "Tổng Hoàn thành", dataIndex: "completion", key: "completion" },
];

// Chuyển `subtasks` thành `children` với `rowKey` duy nhất
const transformTasksWithChildren = (tasks) => {
    return tasks.map(task => ({
        ...task,
        key: getRowKey("task", task.id),
        children: task.subtasks.length > 0 ? transformTasksWithChildren(task.subtasks) : undefined,
    }));
};

const ProjectDetail = () => {
    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        const fetchProject = async () => {
            const data = await projectDetailGetAPI(id);
            if (data) {
                const formattedParts = data.project_parts.map(part => ({
                    ...part,
                    key: getRowKey("part", part.id),
                    created_at: formatDate(part.created_at),
                    updated_at: formatDate(part.updated_at),
                    tasks: part.tasks?.map(task => ({
                        ...task,
                        key: getRowKey("task", task.id),
                        subtasks: task.subtasks || [] // Đảm bảo subtasks là mảng
                    })) || [] // Nếu part.tasks không tồn tại, gán mảng rỗng
                }));
                setProjectData({ ...data, project_parts: formattedParts });
            }
        };
        fetchProject();
    }, [id]);

    // Khi chọn Part -> Tự động chọn Task của nó
    const handlePartSelection = (selectedKeys, selectedRows) => {
        let allSelectedKeys = [...selectedKeys];

        selectedRows.forEach(part => {
            if (part.tasks && part.tasks.length > 0) {
                allSelectedKeys = [...allSelectedKeys, ...part.tasks.map(task => getRowKey("task", task.id))];
            }
        });

        setSelectedRowKeys(allSelectedKeys);
    };

   

    return (
        <div>
            <PageHeader title={'Dự Án '} itemsBreadcrumb={itemsBreadcrumb} />

            <div className='mt-5'>
                <Search size={20} />
            </div>

            <Table
                columns={partColumns}
                dataSource={projectData?.project_parts || []}
                rowKey={(record) => getRowKey("part", record.id)}
                expandable={{
                    expandedRowRender: (part) => {
                        if (!part.tasks || part.tasks.length === 0) return null;
                        const transformedTasks = transformTasksWithChildren(part.tasks);
                        return (
                            <Table
                                columns={taskColumns}
                                dataSource={transformedTasks}
                                rowKey={(record) => record.key} // Đảm bảo rowKey lấy từ `key`
                                pagination={false}
                                rowSelection={{
                                    selectedRowKeys,
                                    onChange: (keys) => setSelectedRowKeys(keys),
                                    hideSelectAll: true,
                                    checkStrictly: false
                                }}
                            />
                        );
                    },
                    rowExpandable: (record) => record.tasks.length > 0,
                }}
                pagination={false}
                rowSelection={{
                    selectedRowKeys,
                    onChange: handlePartSelection,
                    getCheckboxProps: (record) => ({
                        key: record.key, // Đảm bảo key tồn tại
                    }),
                }}
            />
        </div>
    );
};

export default ProjectDetail;
