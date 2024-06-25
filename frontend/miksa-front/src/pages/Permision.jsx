import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { patchState, getAbsencePermissions, getFile } from "../utils/Axios";
import { PermissionModal } from "../components/PermissionModal";

export const Permision = () => {
  const COLUMNS = [
    { field: "employee_name", headerName: "Empleado", width: 150 },
    { field: "reason", headerName: "Motivo", width: 150 },
    {
      field: "start_date",
      headerName: "Fecha de inicio",
      width: 150,
      type: "Date",
    },
    {
      field: "end_date",
      headerName: "Fecha de finalizacion",
      width: 150,
      type: "Date",
    },
    { field: "permission_state", headerName: "Estado", width: 110 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 350,
      renderCell: (params) => (
        <>
          <button onClick={() => changeState(params.row.id, "APROBADO")}>
            Aceptar
          </button>
          <button onClick={() => changeState(params.row.id, "RECHAZADO")}>
            Rechazar
          </button>
          
          <button ><PermissionModal permission={params.row}/></button>
          <button onClick={() => downloadFile(params.row.documentation.id)}>Descargar</button>
        </>
      ),
    },
  ];

  useEffect(() => {
    callApi();
  }, []);

  const changeState = async (id, state) => {
    await patchState(id, state);
    callApi();
  };

  const downloadFile = async (id) => {
    const data = await getFile(id);
    const pdfBlob = new Blob([data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
  };


  const [permissions, setPermissions] = useState([]);

  const callApi = async () => {
    const respuesta = await getAbsencePermissions();
    setPermissions(respuesta.data);
  };

  return (
    <Box sx={{ height: 450, width: 1 }}>
      <DataGrid
        columns={COLUMNS}
        rows={permissions}
        disableColumnSelector
        disableDensitySelector
        disableColumnFilter
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'start_date_time', sort: 'desc' }],
          },
        }}
      />
    </Box>
  );
};
