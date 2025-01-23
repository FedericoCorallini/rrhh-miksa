import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//import { DocumentationSection } from "../DocumentationSection";
import { deleteDocumentation, getFile, postDocument } from "../../utils/Axios";
import { DocumentationModalForm } from "../DocumentationModalForm.jsx";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DocsTable = ({documentation, reload, employeeId}) => {
  const COLUMNS = [

    { field: "description", headerName: "Detalles", width: 200 },
  
    {
      field: "actions",
      headerName: "Acciones",
      width: 800,
      renderCell: (params) => (
        <>
          <button onClick={() => downloadFile(params.row.id)}>Descargar</button>
          <button onClick={() => deleteRow(params.row.id)}>Eliminar</button>

        </>
      ),
    },
  ];

  const filterDocumentation = documentation.filter(doc => doc.documentation_type === 'DDJJ')

  const deleteRow = async (id) => {
    await deleteDocumentation(id)
    reload()
  }

  const downloadFile = async (id) => {
    const data = await getFile(id);
    const pdfBlob = new Blob([data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 350, width: 1 }}>
      <DataGrid
        columns={COLUMNS}
        rows={filterDocumentation}
        disableColumnSelector
        disableDensitySelector
        disableColumnFilter   
      />
      {console.log(documentation)}
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
        Nueva solicitud
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DocumentationModalForm employeeId={employeeId} handleClose={handleClose} reload={reload} />
        </Box>
      </Modal>
    </Box>
  );
};
