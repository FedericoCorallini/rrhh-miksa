import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { deleteDocumentation, getFile, postDocument } from "../../utils/Axios";
import { DocumentationModalForm } from "../DocumentationModalForm.jsx";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import CloudDownload from '@mui/icons-material/CloudDownload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuth0 } from "@auth0/auth0-react";
import { ConfirmDialog } from "../ConfirmDialog.jsx";

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

export const DocsTable = ({ documentation, reload, employeeId }) => {

  const { user } = useAuth0();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [ deleteId, setDeleteId ] = useState();
    
    const handleOpenConfirmDialog = (id) => {
      setDeleteId(id);
      setOpenConfirmDialog(true);
    };
  
    const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);
    
    const handleConfirmDelete = async () => {
      try {
        await deleteDocumentation(deleteId);
        setSnackbar({ open: true, message: "Documento eliminado con éxito", severity: "success" });
        reload();
      } catch (error) {
        setSnackbar({ open: true, message: "Error al eliminar el documento", severity: "error" });
      } finally {
        setOpenConfirmDialog(false);
      }
    };

  const COLUMNS = [
    { field: "description", headerName: "Detalles", width: 200 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 800,
      renderCell: (params) => {
        return (
          <>
            {params.row.id && (
              <Button variant="outlined" color="primary" onClick={() => downloadFile(params.row.id)}>
                <CloudDownload fontSize="small" />
              </Button>
            )}
            {user && user['roles/roles'] && user['roles/roles'].includes('admin') &&
              <Button variant="outlined" color="error" onClick={() => handleOpenConfirmDialog(params.row.id)}>
                <DeleteOutlineIcon fontSize="small" />
              </Button>
            }
            
          </>
        );
      },
    },
  ];

  const filterDocumentation = documentation.filter(doc => doc.documentation_type === 'DDJJ');

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const downloadFile = async (id) => {
    const data = await getFile(id);
    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccessDocumentation = () => {
    setOpen(false);
    setSnackbar({ open: true, message: "Documentación cargada con éxito", severity: "success" });
    reload(); // Recargar la tabla
  };

  return (
    <Box sx={{ height: 350, width: 1 }}>
      <DataGrid
        columns={COLUMNS}
        rows={filterDocumentation}
        disableColumnSelector
        disableDensitySelector
        disableColumnFilter
      />
      {user && user['roles/roles'] && user['roles/roles'].includes('admin') &&
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            backgroundColor: "#5bbc5e",
            color: 'white',
            marginTop: "2%",
            '&:hover': {
              backgroundColor: "#4caf50", // Verde más oscuro
            },
          }}
          onClick={handleOpen}
        >
          Nueva documentación
        </Button>
      }
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DocumentationModalForm employeeId={employeeId} handleClose={handleClose} reload={reload} setSnackbar={setSnackbar} handleSuccess={handleSuccessDocumentation} />
        </Box>
      </Modal>
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleConfirmDelete}
        message="¿Está seguro de que desea eliminar este documento?"
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