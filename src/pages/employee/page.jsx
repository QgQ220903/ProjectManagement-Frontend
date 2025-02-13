import { Breadcrumbs, Button, Grid2, Link, Typography } from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 10 },
  { id: 6, lastName: 'Melisandre', firstName: "Tyrone", age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const paginationModel = { page: 0, pageSize: 5 };

const Employee = () => {
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
          <Button variant="contained" startIcon={<AddRoundedIcon />}>Thêm Nhân Viên </Button>
        </Grid2>

        <Grid2 size={12}>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </Grid2>
      </Grid2>
    </div >
  )
}

export default Employee
