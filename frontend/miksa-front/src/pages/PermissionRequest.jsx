import { Button, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PermissionRequestModal } from "../components/permission_request/PermissionRequestModal";
import { deletePermission, getEmployeeByEmail, getFile } from "../utils/Axios";
import { DocumentationAppendModal } from '../components/permission_request/DocumentationAppendModal';

export const PermissionRequest = () => {
  const COLUMNS = [
    { field: "reason", headerName: "Motivo", width: 140 },
    { field: "details", headerName: "Detalle", width: 140 },
    {
      field: "start_date",
      headerName: "Fecha de inicio",
      width: 120,
      type: "Date",
    },
    {
      field: "end_date",
      headerName: "Fecha de finalización",
      width: 150,
      type: "Date",
    },
    {
      field: "start_time",
      headerName: "Hora de inicio",
      width: 100,
      type: "Date",
    },
    {
      field: "end_time",
      headerName: "Hora de finalización",
      width: 140,
      type: "Date",
    },
    { field: "permission_state", headerName: "Estado", width: 120 },
    {
      field: "upload",
      headerName: "Adjuntar",
      width: 200,
      renderCell: (params) => (
        params.row.documentation ? (
          <Button
            fullWidth
            size="small"
            variant="outlined"
            onClick={() => downloadFile(params.row.documentation.id)}
          >
            Descargar
          </Button>
        ) : (
          <DocumentationAppendModal id={params.row.id} />
        )
      ),
    },
    {
      field: "actions",
      headerName: "Cancelar",
      width: 150,
      renderCell: (params) =>
        params.row.permission_state === "PENDIENTE" && (
          <>
            <Button variant="outlined" size="small" onClick={() => deleteRow(params.row.id)}>
              CANCELAR
            </Button>
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
    const pdfBlob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(pdfBlob);
    window.open(url, "_blank");
  };

  const [permissions, setPermissions] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const callApi = async () => {
    const respuesta = await getEmployeeByEmail();
    setPermissions(respuesta.data.absence_permissions_list);
    sessionStorage.setItem('employeeId', respuesta.data.id);
  };

  const handleSuccess = (message) => {
    setSnackbarMessage(message);
    setIsSuccess(true);
    setOpenSnackbar(true);
    callApi(); // Actualiza la grilla después de una solicitud exitosa
  };

  const handleError = (message) => {
    setSnackbarMessage(message);
    setIsSuccess(false);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
            sortModel: [{ field: "start_date", sort: "desc" }],
          },
        }}
      />
      <PermissionRequestModal permission={"permission"} onSuccess={handleSuccess} onError={handleError} onUpdate={callApi} />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={isSuccess ? "success" : "error"} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};