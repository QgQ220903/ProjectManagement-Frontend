import React, { useEffect, useState } from 'react';
import { DatePicker, Space, Table, Flex, Typography, Card } from 'antd';

import { dashboardGetAPI, dashboardGetAPI2 } from '@/services/DashboardService';

import { CardDb } from '@/pages/Dashboard/components/card'

import { Progress, Tag } from "antd";

import { splitEmployeeNames, getRandomColor } from "@/utils/cn"

import { Link } from 'react-router-dom';

import EmptyTemplate from "@/components/emptyTemplate/EmptyTemplate";

import { LineChartDb, TableChart } from '@/pages/Dashboard/components/char'

import PageHeader from "@/components/PageHeader";

import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {groupByDepartment} from "@/utils/tasks"

const { RangePicker } = DatePicker;




// Đường dẫn
const itemsBreadcrumb = [
  {
    title: <Link to="/">Trang chủ</Link>,
  },

  {
    title: "Thống kê",
  },
];



const DashboardPage = () => {

  const queryClient = useQueryClient();

  const { Title } = Typography;
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [tableData, setTableData] = useState(null);


  const [data, setData] = useState([]);
  const [dataCard, setDataCard] = useState(null);

  //thêm tk
  const { data: newData, mutateAsync: mutatePost } = useMutation({
    mutationFn: dashboardGetAPI2,
    onSuccess: () => {


    },
    onError: (err) => {
      console.error("API Error:", err);

    },
  });


  const handleRangeChange = async (dates) => {
    if (dates && dates.length === 2) {
      setStartTime(dates[0].format('YYYY-MM-DD'));
      setEndTime(dates[1].format('YYYY-MM-DD'));

      // Log kiểm tra
      console.log("Start Date:", dates[0].format('YYYY-MM-DD'));
      console.log("End Date:", dates[1].format('YYYY-MM-DD'));
      var obj = {
        start_date: dates[0].format('YYYY-MM-DD'),
        end_date: dates[1].format('YYYY-MM-DD')
      }
      const res = await mutatePost(obj)
      console.log("handleRangeChange", res)
      const totalSummary = res.reduce(
        (acc, curr) => {
          acc.total_tasks += curr.total_tasks;
          acc.done += curr.done;
          acc.delayed += curr.delayed;
          acc.in_process += curr.in_process;
          return acc;
        },
        { total_tasks: 0, done: 0, delayed: 0, in_process: 0 }
      );

      console.log(totalSummary);

      setDataCard(totalSummary)
      setData(res.map((items)=>{
        return {
          ...items,
          key: items.project_part_id
        }
      }))

    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };


  useEffect(() => {
    if (setStartTime && endTime) {
      var obj = {
        start_date: startTime,
        end_date: endTime
      }
      dashboardGetAPI(obj).then((res) => {
        if (res.status == 200) {
          console.log(res.data)
          var a = res.data.map((item) => ({
            ...item,
            key: item.id
          }));
          setTableData(a)
        }
      })


    }

  }, [startTime, endTime])



  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Công việc", dataIndex: "task_display_name", key: "task_display_name" },
    {
      title: "Dự án",
      dataIndex: "project_part_name",
      key: "project_part_name",
    },
    {
      title: "Đường đi",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "% Hoàn thành",
      dataIndex: "completion_percentage",
      key: "completion_percentage",
      render: (value, record) => {
        return <Progress type="circle" percent={record.completion_percentage} size={45} format={(percent) => {
          if (percent === 100) {
            return 'Done';
          }
          return percent + "%";

        }} />
      }
    }, {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "employee_names",
      key: "employee_names",
      render: (value, record) => {
        const names = splitEmployeeNames(value);
        return (
          <Space wrap>
            {names.map((name, index) => (
              <Tag key={index} color={'blue'}>
                {name}
              </Tag>
            ))}
          </Space>
        );
      }
    },

  ];
  return (
    <>
      <PageHeader title={"Thống kê"} itemsBreadcrumb={itemsBreadcrumb}>

      </PageHeader>


      {/* <div style={{ marginTop: 16 }}>
          <p>Start Date: {startTime || 'Chưa chọn'}</p>
          <p>End Date: {endTime || 'Chưa chọn'}</p>
        </div> */}

      <div className="mt-5">

        <div className='my-3'>
          <RangePicker onChange={handleRangeChange} format="YYYY-MM-DD" />

        </div>

        <div className='flex gap-3 mb-3'>
          <CardDb >

            <p >Số công việc</p>
            <Title level={1}>{dataCard ? dataCard.total_tasks : "0"}</Title>


          </CardDb>
          <CardDb >
            <p className="">Số công việc hoàn thành</p>
            <Title level={1}>{dataCard ? dataCard.done : "0"}</Title>

          </CardDb>

          <CardDb >
            <p>Số công việc đang làm</p>
            <Title level={1}>{dataCard ? dataCard.in_process : "0"}</Title>

          </CardDb>
          <CardDb >
            <p>Số công việc chưa hoàn thành</p>
            <Title level={1}>{dataCard ? dataCard.delayed : "0"}</Title>

          </CardDb>
        </div>


        <CardDb>
        
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{
                pageSize: 4,
              }}
              // rowClassName={(record) => {
              //   var color = '';
              //   if (record.level == 0)
              //     color = 'bg-orange-500'
              //   else if (record.level == 1)
              //     color = 'bg-sky-300'
              //   else
              //     color = 'bg-yellow-200'
              //   return color;
              // }}
              locale={{
                triggerDesc: "Sắp xếp giảm dần",
                triggerAsc: "Sắp xếp tăng dần",
                cancelSort: "Hủy sắp xếp",
                emptyText: <EmptyTemplate title={"Bạn không có dữ liệu !"} />,
              }}
            />
       
        </CardDb>

        <Flex className="mt-3" gap={'middle'}>
          <Card className={"flex-1"}>
            <LineChartDb data={groupByDepartment(data)}></LineChartDb>
          </Card>
          <Card className={"flex-2"}>
            <TableChart data={data}></TableChart>
          </Card>

        </Flex>

        
      </div>


    </>
  );
};

export default DashboardPage;
