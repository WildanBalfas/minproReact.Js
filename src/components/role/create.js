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

export default ({createNew,handleToggle,handleChange,handleClose,handleSubmit, role: {code, name, description}}) =>{
  return <Fragment>
    <Button onClick={handleToggle} variant="contained" color="primary" style={{ float:'right' }}>Add</Button>
    <Dialog open={createNew} onClose={handleClose} >
    <DialogTitle id="alert-dialog-title">{"Add Role"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Please fill out the form below!
            <form>
                <TextField label='*Role Code' value={code} onChange={handleChange('code')} margin='normal'/>
                <br/>
                <TextField label='*Role Name' value={name} onChange={handleChange('name')} margin='normal'/>
                <br/>
                <TextField label='*Description Name' value={description} onChange={handleChange('description')} margin='normal'/>
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