import React, { useEffect, useState } from 'react';
import { DatePicker, Table } from 'antd';
import { dashboardGetAPI } from '../../Services/DashboardService';
const { RangePicker } = DatePicker;

const DashboardPage = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [tableData, setTableData] = useState(null);

  const handleRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      setStartTime(dates[0].format('YYYY-MM-DD'));
      setEndTime(dates[1].format('YYYY-MM-DD'));

      // Log kiểm tra
      console.log("Start Date:", dates[0].format('YYYY-MM-DD'));
      console.log("End Date:", dates[1].format('YYYY-MM-DD'));
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };


  useEffect(()=>{
var obj = {
    start_date: startTime,
    end_date:endTime
}
    dashboardGetAPI(obj).then((res)=>
    {
        if(res.status == 200)
        {
            console.log(res.data)
            var a = res.data.map((item) => ({
                ...item,
                key: item.id
            }));
            setTableData(a)
        }
    })
  },[startTime,endTime])



  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Công việc", dataIndex: "task_display_name", key: "task_display_name"},
    {
        title: "Dự án",
        dataIndex:"project_part_name",
        key: "project_part_name",
    },
    {
        title: "Đường đi",
        dataIndex:"path",
        key: "path",
    },
    {
        title: "% Hoàn thành",
        dataIndex:"completion_percentage",
        key: "completion_percentage",
    },
    {
        title: "Tên nhân viên",
        dataIndex:"employee_names",
        key: "employee_names",
    },
];
  return (
    <>
      <RangePicker onChange={handleRangeChange} format="YYYY-MM-DD" />

      <div style={{ marginTop: 16 }}>
        <p>Start Date: {startTime || 'Chưa chọn'}</p>
        <p>End Date: {endTime || 'Chưa chọn'}</p>
      </div>

      <div className="mt-5">
                <Table
                    columns={columns}
                    dataSource={tableData}
                />
            </div>

    </>
  );
};

export default DashboardPage;
