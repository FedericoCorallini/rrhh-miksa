import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PermissionRequestModal } from "../components/permission_request/PermissionRequestModal";
import { deletePermission, getEmployee, getFile } from "../utils/Axios";
import { DocumentationAppendModal } from '../components/permission_request/DocumentationAppendModal'

export const PermissionRequest = () => {
  const COLUMNS = [
    { field: "reason", headerName: "Motivo", width: 150 },
    { field: "details", headerName: "Detalle", width: 170 },
    {
      field: "start_date",
      headerName: "Fecha de inicio",
      width: 160  ,
      type: "Date",
    },
    {
      field: "end_date",
      headerName: "Fecha de finalizacion",
      width: 160,
      type: "Date",
    },
    {
      field: "start_time",
      headerName: "Hora de inicio",
      width: 150,
      type: "Date",
    },
    {
      field: "end_time",
      headerName: "Hora de finalizacion",
      width: 150,
      type: "Date",
    },
    { field: "permission_state", headerName: "Estado", width: 150 },
    {
      field: "upload",
      headerName: "Adjuntar",
      width: 250,
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
      width: 250,
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

  const callApi = async () => {
    const respuesta = await getEmployee(1);
    setPermissions(respuesta.data.absence_permissions_list);
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
            sortModel: [{ field: "start_date_time", sort: "desc" }],
          },
        }}
      />
      <PermissionRequestModal permission={"permission"} />
    </Box>
  );
};
