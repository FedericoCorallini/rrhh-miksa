import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { postDocument, postFile } from '../utils/Axios';
import { styled } from '@mui/material/styles';

export const DocumentationModalForm = ({employeeId, handleClose, reload}) => {
    const [data, setData] = useState({ employee: employeeId, documentation_type: '', description: '' });
    const [file, setFile] = useState();
    const [docId, setDocId] = useState(0);
    
    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });

export const DocumentationRequestModalForm = ({handleClose, setDoc, setFile}) => {
    const [data, setData] = useState({ id_absence_permission: null, documentation_type: '', description: '' });
    
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });