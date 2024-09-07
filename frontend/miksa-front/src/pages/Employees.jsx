import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteEmployee, getEmployees, getFile } from "../utils/Axios";

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
      headerName: "Puesto laboral",
      width: 150,
      type: "Date",
    },
    { field: "working_hours", headerName: "Horario ", width: 150 },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 250,
      renderCell: (params) => (
        <>
          <Button onClick={() => deleteRow(params.row.id)}>Eliminar</Button>
        </>
      ),
    },
    {
      field: "details",
      headerName: "Detalles",
      width: 250,
      renderCell: (params) => (
        <>
          <Button>
            <NavLink to={`/perfil/${params.row.id}`}> Ver Detalles </NavLink>
          </Button>
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
      <Button
        sx={{ mt: "15px" }}
        size="small"
        color="primary"
        variant="contained"
      >
        <NavLink className="active" to={`/perfil/0`}>
          {" "}
          Agregar empleado{" "}
        </NavLink>
      </Button>
    </Box>
  );
};
