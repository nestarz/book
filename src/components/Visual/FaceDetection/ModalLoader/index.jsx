import { Dialog, DialogContent, DialogTitle, LinearProgress } from '@material-ui/core';
import React from 'react';

export const ModalLoader = (props) =>
  <Dialog
    disableBackdropClick
    disableEscapeKeyDown
    open={true}
  >
    <DialogTitle>
      { props.title }
    </DialogTitle>
    <DialogContent>
      <LinearProgress />
    </DialogContent>
</Dialog>
