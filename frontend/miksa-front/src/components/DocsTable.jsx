import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DocumentationModal } from "./DocumentationModal";
import { deleteDocumentation, postDocument } from "../utils/Axios";


export const DocsTable = ({documentation, reload, employeeId}) => {
  const COLUMNS = [

    { field: "description", headerName: "Detalles", width: 200 },
  
    {
      field: "actions",
      headerName: "Acciones",
      width: 800,
      renderCell: (params) => (
        <>
          <button onClick={() => downloadFile(params.row.documentation.id)}>Descargar</button>
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
      <DocumentationModal employeeId={employeeId} ></DocumentationModal>
    </Box>
  );
};
