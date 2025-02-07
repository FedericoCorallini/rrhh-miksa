import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { deletePermission, getEmployee, getFile } from "../utils/Axios";
import { PermissionRequestModalForm } from "../components/PermissionRequestModalForm.jsx";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CloudUpload from '@mui/icons-material/CloudUpload';
import CloudDownload from '@mui/icons-material/CloudDownload';
import { DocumentationModalForm } from "../components/DocumentationModalForm.jsx";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  minWidth: '40%',
  maxWidth: '70%',
};

export const PermissionRequestPage = () => {
  const [permissions, setPermissions] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDocumentationModal, setOpenDocumentationModal] = useState(false);
  const handleOpenDocumentationModal = () => setOpenDocumentationModal(true);
  const handleCloseDocumentationModal = () => setOpenDocumentationModal(false);

  const COLUMNS = [
    { field: "reason", headerName: "Motivo", width: 200 },
    { field: "details", headerName: "Detalles", width: 200 },
    {
      field: "start_date",
      headerName: "Fecha de inicio",
      width: 180,
      type: "Date",
    },
    {
      field: "end_date",
      headerName: "Fecha de finalizacion",
      width: 180,
      type: "Date",
    },
    {
      field: "start_time",
      headerName: "Hora de inicio",
      width: 150,
      type: "Time",
    },
    {
      field: "end_time",
      headerName: "Hora de finalizacion",
      width: 150,
      type: "Time",
    },
    { field: "permission_state", headerName: "Estado", width: 110 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 350,
      renderCell: (params) => (
        <>
          {params.row.documentation ? (
            <Button variant="outlined" color="primary" onClick={() => downloadFile(params.row.documentation.id)}>
              <CloudDownload fontSize="small" />
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={handleOpenDocumentationModal}>
              <CloudUpload fontSize="small" />
            </Button>
          )}
          {params.row.permission_state === "PENDIENTE" && (
            <Button variant="outlined" color="error" onClick={() => deleteRow(params.row.id)}>
              <DeleteOutlineIcon fontSize="small" />
            </Button>
          )}
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
    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
  };

  const callApi = async () => {
    const respuesta = await getEmployeeByEmail();
    setPermissions(respuesta.data.absence_permissions_list);
    sessionStorage.setItem('employeeId', respuesta.data.id);
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
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{
          backgroundColor: "#5bbc5e",
          color: 'white',
          marginTop: "2%",
          marginLeft: "1%",
          '&:hover': {
            backgroundColor: "#4caf50",
          },
        }}
        onClick={handleOpen}
      >
        Nueva solicitud
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PermissionRequestModalForm />
        </Box>
      </Modal>
      <Modal
        open={openDocumentationModal}
        onClose={handleCloseDocumentationModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DocumentationModalForm employeeId={sessionStorage.getItem('employeeId')} handleClose={handleCloseDocumentationModal} reload={callApi} fromPRPage={true} />
        </Box>
      </Modal>
    </Box>
  );
};

export default PermissionRequestPage;