import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PermisionForm } from './PermisionForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 465,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 1,
};

export const PermissionModal = ({permission, download}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button size='small' onClick={handleOpen}>Detalles</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <PermisionForm permision={{permission}} download={download}></PermisionForm>
        </Box>
      </Modal>
    </div>
  );
}