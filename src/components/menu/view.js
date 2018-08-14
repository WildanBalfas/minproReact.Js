import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default ({ viewMenu, handleClose, menu:{code, name, controller,parent}}) => {
  return <Fragment>
  <Dialog
  open={viewMenu}
  onClose={handleClose}
  >
  <DialogTitle id="alert-dialog-title">{"View Menu"}</DialogTitle>
  <DialogContent>
  <DialogContentText id="alert-dialog-description" style={{fontWeight:'bold'}}>
  Detail menu
  </DialogContentText>
  <form>
  <TextField label='Menu Code' value={code} margin='normal' disabled={true}/>
  <br/>
  <TextField label='Menu Name' value={name} margin='normal' disabled={true}/>
  <br/>
  <TextField label='Controller Name' value={controller} margin='normal' disabled={true}/>
  <br/>
  <TextField label='Parent' value={parent ? parent : 'None'} margin='normal' disabled={true}/>
  </form>
  </DialogContent>
  <DialogActions>
  <Button onClick={handleClose} color="secondary" variant="contained">
  Cancel
  </Button>
  </DialogActions>
  </Dialog>
  </Fragment>
}