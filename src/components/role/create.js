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

export default ({createNew,handleToggle,handleChange,handleClose,handleSubmit, errors:{nameErr}, role: {code, name, description}}) =>{
  return <Fragment>
    <Button onClick={handleToggle} variant="contained" color="primary" style={{ float:'right' }}>Add</Button>
    <Dialog open={createNew} onClose={handleClose} >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <div class="title">Add Role</div>
    <form class="martop">
                <TextField label='Role Code' value={code} onChange={handleChange('code')} margin='normal' InputLabelProps={{shrink:true}} placeholder="Auto Generated" disabled required/>
                <br/>
                <TextField label="Role Name" value={name} onChange={handleChange('name')} error={nameErr == 0 ? false : true } margin='normal' InputLabelProps={{shrink: true}} required/>
                <br/>
                <TextField label='Description Name' value={description} onChange={handleChange('description')} margin='normal'/>
                <br/>
            </form>
            </DialogContentText>
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