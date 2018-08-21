import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { error } from 'util';

export default ({ createNew, handleToggle, handleClose, handleSubmit,handleChange, errors:{nameErr, descriptionErr}, product: { code, name, description } }) => {
    return <Fragment>
    <Button onClick={handleToggle} variant="contained" color="primary" style={{ float:'right' }}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}
            fullWidth
            style={{textAlign:"center"}}
        >
            <DialogTitle id="alert-dialog-title">{"Add Product"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please fill out the form below
            </DialogContentText>
                <form>
                    <TextField label="Code" value={code} onChange={handleChange('code')} margin='normal' disabled />
                    <br />
                    <TextField label={nameErr == 0 ? "Name" : nameErr }value={name} onChange={handleChange('name')}  errorText={'tes'}margin='normal' error={nameErr == 0 ? false : true } />
                    <br />
                    <TextField label={descriptionErr == 0 ? "Description" : descriptionErr } value={description} onChange={handleChange('description')} margin='normal' error={descriptionErr == 0 ? false : true } />
                    <br />
                    
                    
                </form>
            </DialogContent>
            <DialogActions>
                
                <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>
                    Save
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
                    Cancel
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}