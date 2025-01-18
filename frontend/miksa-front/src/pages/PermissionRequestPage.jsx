import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { deletePermission, getEmployee, getFile } from "../utils/Axios";
import { PermissionRequestModalForm} from "../components/PermissionRequestModalForm.jsx";
import Button from '@mui/material/Button'; // Importar Button
import Modal from '@mui/material/Modal'; // Importar Modal


export const PermissionRequestPage = () => {
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Button sx={{ marginTop: '10px' }} variant='contained' onClick={handleOpen}>Nueva solicitud</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 465,
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 1,
        }}>
          <PermissionRequestModalForm />
        </Box>
      </Modal>
    </Box>
  );
};
export default PermissionRequestPage;