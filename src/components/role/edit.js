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

export default ({errors:{nameErr},editRole,handleChange,handleClose,handleSubmit, role: {code, name, description}}) => {
  return <Fragment>
  <Dialog
  open={editRole}
  onClose={handleClose}
  >
  <DialogContent>
  <DialogContentText id="alert-dialog-description">
  <div class="title">Edit Role</div>
  </DialogContentText>
  <form class="martop">
  <TextField label='Role Code' value={code} onChange={handleChange('code')} margin='normal' disabled={true} required/>
  <br/>
  <TextField label="Role Name " value={name} onChange={handleChange('name')} error={nameErr == 0 ? false : true } margin='normal' InputLabelProps={{shrink: true}} required/>
  <br/>
  <TextField label='Description Name' value={description} onChange={handleChange('description')} margin='normal'/>
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