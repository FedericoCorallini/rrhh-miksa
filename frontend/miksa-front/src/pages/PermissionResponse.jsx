import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PermissionModal } from "../components/permission_response/PermissionModal";
import { getAbsencePermissions, getFile, patchState } from "../utils/Axios";

export const PermissionResponse = () => {
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
    { field: "permission_state", headerName: "Estado", width: 150 },
    {
      field: "approve",
      headerName: "Aprobar",
      width: 100,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            onClick={() => changeState(params.row.id, "APROBADO")}
          >
            Aprobar
          </Button>
        </>
      ),
    },
    {
      field: "reject",
      headerName: "Rechazar",
      width: 100,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            onClick={() => changeState(params.row.id, "RECHAZADO")}
          >
            Rechazar
          </Button>
        </>
      ),
    },
    {
      field: "documentation",
      headerName: "Documentacion",
      width: 150,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => downloadFile(params.row.documentation.id)}
        >
          Descargar
        </Button>
      ),
    },
    {
      field: "details",
      headerName: "Detalles",
      width: 150,
      renderCell: (params) => (
        <>
          <PermissionModal permission={params.row} />
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
    const pdfBlob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(pdfBlob);
    window.open(url, "_blank");
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
        
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "start_date", sort: "desc" }],
          },
          filter: {
            filterModel: {
              items: [
                { field: "permission_state", operatorValue: "equals", value: "PENDIENTE" },
              ],
            },
          },
        }}
      />
    </Box>
  );
};
