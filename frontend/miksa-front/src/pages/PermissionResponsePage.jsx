import { Button, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { PermissionDetailsModal } from "../components/PermissionDetails.jsx";
import { getAbsencePermissions, getFile, patchState } from "../utils/Axios";
import Modal from '@mui/material/Modal';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { ConfirmDialog } from "../components/ConfirmDialog.jsx";

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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const handleOpen = (permission) => {
    setSelectedPermission(permission);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpenConfirmDialog = (permission, action) => {
    setSelectedPermission(permission);
    setSelectedAction(action);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  const handleConfirmAction = async () => {
    if (!selectedAction) return; // Verificación adicional
    try {
      await patchState(selectedPermission.id, selectedAction);
      setSnackbar({ open: true, message: `Solicitud ${selectedAction.toLowerCase()} con éxito`, severity: "success" });
      callApi();
    } catch (error) {
      setSnackbar({ open: true, message: `Error al ${selectedAction.toLowerCase()} la solicitud`, severity: "error" });
    } finally {
      setOpenConfirmDialog(false);
    }
  };

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
        <Button
          size="small"
          onClick={() => handleOpenConfirmDialog(params.row, "APROBADO")}
          sx={{ color: 'green' }}
        >
          <CheckRoundedIcon />
        </Button>
      ),
    },
    {
      field: "reject",
      headerName: "Rechazar",
      width: 100,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => handleOpenConfirmDialog(params.row, "RECHAZADO")}
          sx={{ color: 'red' }}
        >
          <CloseRoundedIcon />
        </Button>
      ),
    },
    {
      field: "documentation",
      headerName: "Documentacion",
      width: 150,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => params.row.documentation && downloadFile(params.row.documentation.id)}
          sx={{ color: params.row.documentation ? 'blue' : 'gray' }}
          disabled={!params.row.documentation}
        >
        <DownloadRoundedIcon />
        </Button>
      ),
    },
    {
      field: "details",
      headerName: "Detalles",
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => handleOpen(params.row)}>
          Ver Detalles
        </Button>
      ),
    },
  ];

  useEffect(() => {
    callApi();
  }, []);

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
          {selectedPermission && <PermissionDetailsModal permission={selectedPermission} onClose={handleClose} />}
        </Box>
      </Modal>
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleConfirmAction}
        message={`¿Está seguro de que desea ${selectedAction === "APROBADO" ? "aprobar" : "rechazar"} esta solicitud?`}
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

export default PermissionResponsePage;
