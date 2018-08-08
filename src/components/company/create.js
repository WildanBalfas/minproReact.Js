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

export default ({ createNew,handleToggle,handleChange,handleClose,handleSubmit, company: {code, name, email, phone, address}}) => {
    return <Fragment>
        <Button onClick={handleToggle} variant="contained" color="primary" style={{float: 'right'}}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Create new Company"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Please fill out the form below!
            <form>
                <TextField label='Company Code' value={code} onChange={handleChange('code')} margin='normal'/>
                &nbsp;
                <TextField label='Company Name' value={name} onChange={handleChange('name')} margin='normal'/>
                &nbsp;
                <TextField label='Email' value={email} onChange={handleChange('email')} margin='normal'/>
                &nbsp;
                <TextField label='Phone' value={phone} onChange={handleChange('phone')} margin='normal'/>
                &nbsp;
                <TextField label='Address' value={address} onChange={handleChange('address')} margin='normal'/>
                &nbsp;
            </form>
            </DialogContentText>
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