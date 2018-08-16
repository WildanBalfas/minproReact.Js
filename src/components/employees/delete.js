import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '../../../node_modules/@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default ({ deleteEmployee, handleClose, handleDelete, employee: { code, firstName, lastName, mCompanyName, email, mCompanyId }, }) => {
    return <Fragment>
        <Dialog
            open={deleteEmployee}
            onClose={handleClose} fullWidth={true}       >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className='div-header'>View Employee</div>
                    <div className='clear' />
                    <form>
                        <TextField label="Employee Id Number" value={code} fullWidth margin='normal' disabled />
                        <br />
                        <TextField label="First Name" value={firstName} fullWidth margin='normal' disabled />
                        <br />
                        <TextField label="Last Name" value={lastName} fullWidth margin='normal' disabled />
                        <br />
                        <TextField label="Last Name" value={lastName} fullWidth margin='normal' disabled />
                        <br />
                        <TextField label="Email" value={email} fullWidth margin='normal' disabled />
                        <br />
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" style={{ background: '#f0ad4e', color: 'white' }} color="primary">
                    Cancel
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}


