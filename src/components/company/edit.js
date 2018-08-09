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

export default ({editCompany,handleChange,handleClose,handleEdit,handleSubmit, company: {code, name, email, phone,address}}) => {
    return <Fragment>
        <Dialog
            open={editCompany}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Update company"}</DialogTitle>
            <DialogContent>
            <form>
                <TextField label='Company Code' value={code} onChange={handleChange('code')} margin='normal'/>
                &nbsp;
                <TextField label='Company Name' value={name} onChange={handleChange('name')} margin='normal'/>
                &nbsp;
                <TextField label='Email' value={email} onChange={handleChange('email')} margin='normal'/>
                &nbsp;
                <TextField label='Phone' value={phone} onChange={handleChange('phone')} margin='normal'/>
                &nbsp;
                <TextField label='Address' value={address} onChange={handleChange('address')} fullWidth={true} multiline={true} margin='normal'/>
                &nbsp;
            </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    Save
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}