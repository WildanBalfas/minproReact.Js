import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default ({editMenu,handleChange,handleClose,handleEdit,handleSubmit, menu: {code, name, controller}}) => {
  return <Fragment>
  <Dialog
  open={editMenu}
  onClose={handleClose}
  >
  <DialogTitle id="alert-dialog-title">{"Update menu"}</DialogTitle>
  <DialogContent>
  <DialogContentText id="alert-dialog-description">
  Please edit data
  </DialogContentText>
  <form>
  <TextField label='*Menu Code' value={code} onChange={handleChange('code')} margin='normal'/>
  <br/>
  <TextField label='*Menu Name' value={name} onChange={handleChange('name')} margin='normal'/>
  <br/>
  <TextField label='*Controller Name' value={controller} onChange={handleChange('controller')} margin='normal'/>
  <br/>
  </form>
  </DialogContent>
  <DialogActions>
  <Button onClick={handleClose} color="secondary" variant="contained">
  Cancel
  </Button>
  <Button onClick={handleSubmit} color="primary" variant="contained" autoFocus>
  Save
  </Button>
  </DialogActions>
  </Dialog>
  </Fragment>
}