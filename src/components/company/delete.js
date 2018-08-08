import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default ({ deleteCompany,handleChange, handleClose,handleDelete, company: {code, name, email, phone,address}}) => {
    return <Fragment>
        <Dialog
            open={deleteCompany}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Delete Company"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Are you sure to delete ?
            </DialogContentText>
            <form>
                <TextField label='Company Code' value={code} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Company Name' value={name} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Email' value={email} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Phone' value={phone} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Address' value={address} margin='normal' disabled={true}/>
                &nbsp;
            </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Delete
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}