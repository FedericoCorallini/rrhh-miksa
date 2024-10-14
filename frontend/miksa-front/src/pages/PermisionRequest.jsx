import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { deletePermission, getEmployee, getFile } from "../utils/Axios";
import { PermissionRequestModal } from "../components/PermissionRequestModal";

export const PermisionRequest = () => {
  const COLUMNS = [
    { field: "details", headerName: "Detalles", width: 200 },
    {
      field: "start_date",
      headerName: "Fecha de inicio",
      width: 200,
      type: "Date",
    },
    {
      field: "end_date",
      headerName: "Fecha de finalizacion",
      width: 200,
      type: "Date",
    },
    { field: "permission_state", headerName: "Estado", width: 110 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 350,
      renderCell: (params) => (
        <>
          <button onClick={() => deleteRow(params.row.id)}>
            Eliminar
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    callApi();
  }, []);

  const deleteRow = async (id) => {
    await deletePermission(id);
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
    const respuesta = await getEmployee(1);
    setPermissions(respuesta.data.absence_permissions_list);
  };
  const updateRequests = () => {
    callApi();
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
   
        initialState={{
          sorting: {
            sortModel: [{ field: 'start_date_time', sort: 'desc' }],
          },
        }}
      />
      <PermissionRequestModal permission={"permission"} updateRequests={updateRequests} />
    </Box>
  );
};
