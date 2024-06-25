import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { deleteEmployee, getEmployees, getFile } from "../utils/Axios";
import { PermissionModal } from "../components/PermissionModal";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export const Employees = () => {
  const COLUMNS = [
    { field: "firstname", headerName: "Nombre", width: 150 },
    { field: "lastname", headerName: "Apellido", width: 150 },
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
          <button onClick={() => deleteRow(params.row.id)}>
            Eliminar
          </button>
          <button >
          <NavLink to={`/perfil/${params.row.id}`} > Detalles </NavLink>
          </button>
          
        </>
      ),
    },
  ];

  useEffect(() => {
    callApi();
  }, []);

  const deleteRow = async (id) => {
    await deleteEmployee(id);
    callApi();
  };

  const downloadFile = async (id) => {
    const data = await getFile(id);
    const pdfBlob = new Blob([data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
  };


  const [employees, setEmployees] = useState([]);

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
      <Button sx={{ mt: '15px' }} size="small" color="primary" variant='contained'>
        <NavLink className='active'to={`/perfil/0`} > Agregar empleado </NavLink>
      </Button>
    </Box>
    
  );
};
