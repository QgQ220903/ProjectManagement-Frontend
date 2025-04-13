import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table } from 'antd';
import EmptyTemplate from "@/components/emptyTemplate/EmptyTemplate";

export const LineChartDb = ({data}) => (
  <LineChart width={700} height={400} data={data}>
    <XAxis dataKey="department_name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="done" stroke="#8884d8"  name="Công việc hoàn thành"/>
    <Line type="monotone" dataKey="total_tasks" stroke="green"  name="Tổng Công việc"/>
    <Line type="monotone" dataKey="delayed" stroke="red"  name="Công việc chưa hoàn thành"/>
    <Line type="monotone" dataKey="in_process" stroke="orange"  name="Công việc đang làm"/>
  </LineChart>
);


const columns = [
  {
    title: 'Phòng ban',
    dataIndex: 'department_name',
    key: 'department_name',
  },
  {
    title: 'Công việc',
    dataIndex: 'project_part_name',
    key: 'project_part_name',
  },
   
    {
      title: 'Công việc hoàn thành',
      dataIndex: 'done',
      key: 'done',
    },
    {
      title: 'Công việc đang làm',
      dataIndex: 'in_process',
      key: 'in_process',
    },
    {
      title: 'Công việc chưa hoàn thành',
      dataIndex: 'delayed',
      key: 'delayed',
    },
    {
      title: 'Tổng công việc',
      dataIndex: 'total_tasks',
      key: 'total_tasks',
    },
  ];
  
 export const TableChart = ({data}) => (
    <Table columns={columns} dataSource={data} 
    pagination={
      {
        pageSize: 4,
      }
    }
    locale={{
      triggerDesc: "Sắp xếp giảm dần",
      triggerAsc: "Sắp xếp tăng dần",
      cancelSort: "Hủy sắp xếp",
      emptyText: <EmptyTemplate title={"Bạn không  có dữ liệu !"} />,
  }}
    />
  );


  