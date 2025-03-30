import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table } from 'antd';
const data = [
  { name: 'Tháng 1', doanhThu: 4000 },
  { name: 'Tháng 2', doanhThu: 3000 },
  { name: 'Tháng 3', doanhThu: 5000 },
];

export const LineChartDb = () => (
  <LineChart width={500} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="doanhThu" stroke="#8884d8" />
  </LineChart>
);


const columns = [
    {
      title: 'Tháng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'doanhThu',
      key: 'doanhThu',
    },
  ];
  
 export const TableChart = () => (
    <Table columns={columns} dataSource={data} pagination={false}/>
  );


  