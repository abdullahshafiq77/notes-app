import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function TransitionsDialog({
  heading,
  description,
  open,
  cancel,
  proceed,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={cancel}
    >
      <div className='bg-black'>
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Disagree</Button>
          <Button onClick={proceed}>Agree</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
