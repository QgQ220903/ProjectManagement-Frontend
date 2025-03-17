import React, { Children, useEffect, useState } from "react";
import { Table, Badge, Popconfirm, Space} from "antd";
import Search from '@/components/Search';
import PageHeader from '@/components/PageHeader';
import { Link, useParams } from 'react-router-dom';
import { projectDetailGetAPI } from "@/Services/ProjectDetailService";
import { formatDate } from '@/utils/cn';
import { Pencil, Trash2, Plus } from 'lucide-react';
import ButtonIcon from '@/components/ButtonIcon'
// import { FaEye } from "react-icons/fa";


const ProjectDetail = () => {

    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            const data = await projectDetailGetAPI(id);
            if (data?.project_parts) {
                setData(data)
                const dataFillter = data.project_parts.map((data, index)=>({
                    key:  data.id,
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
      
                <Link to={"/project/" + record.key } ><Plus></Plus></Link>
      
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

    return (
        <>
            <>{projectData &&  console.log(projectData)}</>
            <PageHeader title={'Dự Án ' +( data && data.name)} itemsBreadcrumb={itemsBreadcrumb}>

                <ButtonIcon >
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
        </>
    )
}

export default ProjectDetail