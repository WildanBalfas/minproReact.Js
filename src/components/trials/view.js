import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default ({ViewUser, handleClose, user: {username,mRoleName, mEmployeeFirstName, password} }) => {
    // shrink
    return <Fragment>
        <Dialog
            open={ViewUser}
            onClose={handleClose}        >
            <DialogTitle id="alert-dialog-title">{"View User"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
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
            </DialogActions>
        </Dialog>
    </Fragment>
}