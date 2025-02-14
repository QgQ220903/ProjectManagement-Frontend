import { Breadcrumbs, Button, Grid2, Link, Typography } from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'fullName',
    headerName: 'Họ Và Tên',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 250,
  },
  { field: 'email', headerName: 'Địa Chỉ Email', width: 200 },
  { field: 'phone', headerName: 'Số Điện Thoại', width: 200 },
  { field: 'department', headerName: 'Phòng Ban', width: 200 },
  { field: 'position', headerName: 'Vị Trí', width: 200 },
  {
    title: "Action",
    headerName: "Thao Tác",
    key: "action",
    render: (_,) => (
      <Space>
        <Button
          icon={<EditOutlined />}
        />
        <Button danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },

];

const handleEdit = (row) => {
  // Xử lý sửa nhân viên (ví dụ: mở form sửa)
  console.log("Edit row:", row);
};

const handleDelete = (row) => {
  // Xử lý xóa nhân viên (ví dụ: xác nhận xóa)
  console.log("Delete row:", row);
};

const rows = [
  { id: 1, fullName: 'Quách Gia Quy', email: 'quyquach@gmail.com', phone: '0907111222', department: 'Công Nghệ Thông Tin', position: 'Nhân Viên' },
];


const paginationModel = { page: 0, pageSize: 5 };

const Employee = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Trang Chủ
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href=""
              sx={{ color: 'text.primary' }}
            >
              Nhân Viên
            </Link>
          </Breadcrumbs>
        </Grid2>
        <Grid2 size={12}
          container
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" type="primary">Danh Sách Nhân Viên</Typography>
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleClickOpen}>Thêm Nhân Viên </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{
              '& .MuiDialog-paper': { width: '30rem', maxWidth: 'none' },
            }}
          >
            <DialogTitle className="mb-4">Thông Tin Nhân Viên</DialogTitle>
            <DialogContent>
              <form> {/* Bọc form trong thẻ <form> và thêm onSubmit */}
                <TextField
                  fullWidth
                  id="fullname"
                  name="fullname"
                  label="Họ và Tên"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Địa Chỉ Email"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Số Điện Thoại"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="department"
                  name="department"
                  label="Phòng Ban"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  id="position"
                  name="position"
                  label="Vị Trí"
                  margin="normal"
                />
                <DialogActions>
                  <Button variant="outlined" onClick={handleClose}>Hủy</Button>
                  <Button variant="contained" type="submit">
                    Lưu
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Grid2>

        <Grid2 size={12}>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </div >
  )
}

export default Employee
