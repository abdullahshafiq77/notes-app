import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <div>{children}</div>
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizationDialog({
  children,
  open,
  title,
  handleClose,
  isFooter,
}) {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <div className='bg-black'>
          <BootstrapDialogTitle
            id='customized-dialog-title'
            onClose={handleClose}
          >
            {title}
          </BootstrapDialogTitle>
          <DialogContent dividers>{children}</DialogContent>

          {isFooter && (
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Save changes
              </Button>
            </DialogActions>
          )}
        </div>
      </BootstrapDialog>
    </>
  );
}
