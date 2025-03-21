import React, {useState} from 'react'
import ModalAccount from "@/components/modal/Modal";
import FormAccount from "@/components/form/Form";
import PageHeader from "@/components/PageHeader";
import ButtonIcon from "@/components/ButtonIcon";
import { Table, Drawer, Form, Input, Select, Space, Avatar, Tag, Progress  } from "antd";
import { Pencil, Trash2, Plus  } from "lucide-react";
import Search from "@/components/Search";

const Task = () => {
   
    
    const columns = [
        {
            title: "Tên công việc",
            dataIndex: "name",
            key: "name",
            width: "20%",
            render: (text) => (
                <>
                    <p>{text}</p>
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
            
        },
        {
            title: "Nhóm",
            dataIndex: "listWork",
            key: "listWork",
            width: "18%",
          
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

    
  

    return (
        <>
            <PageHeader title={"Công Việc"}>
              
            </PageHeader>

            <div className="mt-5">
                <Search size={20} />
                <Table
                    columns={columns}
                    dataSource={data}
                // pagination={{ total, defaultCurrent: current, pageSize: 10 }}
                />
            </div>

        
        </>
    )
}

export default Task