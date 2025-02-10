import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { deleteEmployee, getEmployees } from "../utils/Axios";
import { NavLink } from "react-router-dom";
import { Button, Snackbar, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ConfirmDialog } from "../components/ConfirmDialog";

export const EmployeesPage = () => {

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [ deleteId, setDeleteId ] = useState();
  
  const handleOpenConfirmDialog = (id) => {
    setDeleteId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);
  
  const handleConfirmDelete = async () => {
    try {
      await deleteEmployee(deleteId);
      setSnackbar({ open: true, message: "Empleado eliminado con éxito", severity: "success" });
      callApi();
    } catch (error) {
      setSnackbar({ open: true, message: "Error al eliminar el empleado", severity: "error" });
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const COLUMNS = [
    { field: "firstname", headerName: "Nombre", width: 150 },
    { field: "lastname", headerName: "Apellido", width: 150 },
    { field : "category", headerName: "Categoría", width: 150},
    {
      field: "dni",
      headerName: "Dni",
      width: 150,
      type: "Date",
    },
    {
      field: "job_position",
      headerName: "Lugar de trabajo",
      width: 150,
      type: "Date",
    },
    { field: "working_hours", headerName: "Horario ", width: 150 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 350,
      renderCell: (params) => (
        <>
          <Button variant="outlined" color="error" onClick={() => handleOpenConfirmDialog(params.row.id)} sx={{padding: "1%"}}>
            <DeleteOutlineIcon fontSize="small"/>
          </Button>
          <Button variant='outlined'fontSize="small" sx={{color:'#1976D2', marginLeft: "2%", padding: "1%"}}>
          <NavLink to={`/perfil/${params.row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> Detalles </NavLink>
          </Button>
          
        </>
      ),
    },
  ];

  const [employees, setEmployees] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });


  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    const respuesta = await getEmployees();
    setEmployees(respuesta.data);
  };

  return (
    <Box sx={{ height: 450, width: 1 }}>
      <DataGrid
        columns={COLUMNS}
        rows={employees}
        disableColumnSelector
        disableDensitySelector
        disableColumnFilter
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      
      />
      <Button startIcon={<AddIcon />}
        variant="contained"
        sx={{
          backgroundColor: "#5bbc5e",
          color: 'white',
          marginTop: "2%",
          marginLeft: "1%",
          '&:hover': {
            backgroundColor: "#4caf50", // Verde más oscuro
          },
        }}
        onClick={() => setSnackbar({ open: true, message: "Empleado agregado con éxito", severity: "success" })}
      >
        <NavLink className='active'to={`/perfil/0`} style={{ textDecoration: 'none', color: 'inherit' }}> Agregar empleado </NavLink>
      </Button>
      <ConfirmDialog
              open={openConfirmDialog}
              handleClose={handleCloseConfirmDialog}
              handleConfirm={handleConfirmDelete}
              message="¿Está seguro de que desea eliminar este empleado?"
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default EmployeesPage;