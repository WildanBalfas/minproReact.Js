import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default ({deleteUser, handleClose, handleDelete,  user: {username, password, mEmployeeFirstName, mRoleName} }) => {
    return <Fragment>
        <Dialog
            open={deleteUser}
            onClose={handleClose}        >
            <DialogTitle id="alert-dialog-title">{"Create New User"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please fill out the form below!
                    <form>
                        <TextField label="Role Name" value={mRoleName} margin='normal' disabled/>
                        <br />
                        <TextField label="Employee Name" value={mEmployeeFirstName} margin='normal' disabled/>
                        <br />
                        <TextField label="Username" value={username} margin='normal' disabled/>
                        <br />
                        <TextField label="Password" value={password} margin='normal' type="password" disabled/>
                        <br />
                        <TextField label="Re-password" value={password} margin='normal' type="password" disabled/>
                        <br />
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Save
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}
