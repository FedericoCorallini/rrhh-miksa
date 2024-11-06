import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PermissionModalForm } from "../components/PermissionModalForm.jsx";
import { getAbsencePermissions, getFile, patchState } from "../utils/Axios";
import Modal from '@mui/material/Modal';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 465,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 1,
};


export const PermissionResponsePage = () => {
  const [open, setOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);

  const handleOpen = (permission) => {
    setSelectedPermission(permission);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);


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
          <Button variant="outlined" size="small" onClick={() => handleOpen(params.row)}>
            Ver Detalles
          </Button>
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
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedPermission && <PermissionModalForm permission={selectedPermission} />}
        </Box>
      </Modal>
    </Box>
  );
};
export default PermissionResponsePage;