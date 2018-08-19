import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


export default ({ viewCompany, handleView, handleClose, company: {code, name, email, phone,address}}) => {
    return <Fragment>
        <Dialog
            open={viewCompany}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"View Company"}</DialogTitle>
            <DialogContent>
            <form>
                <TextField label='Company Code' value={code} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Company Name' value={name} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Email' value={email} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Phone' value={phone} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Address' value={address} margin='normal' fullWidth={true} multiline={true} disabled={true}/>
            </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="secondary">
                    Cancel
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}