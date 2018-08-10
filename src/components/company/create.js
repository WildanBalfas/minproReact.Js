import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default ({ createNew,handleToggle,handleChange,handleClose,handleSubmit, company: {code, name, email, phone, address}}) => {
    return <Fragment>
        <Button onClick={handleToggle} variant="contained" color="primary" style={{float: 'right'}}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Add Company"}</DialogTitle>
            <DialogContent>
                
            <form>
                <TextField label='Company Code'  value={code} onChange={handleChange('code')} margin='normal' InputLabelProps={{shrink: true}} placeholder="Auto Generated"/>
                &nbsp;
                <TextField label='Company Name' value={name} onChange={handleChange('name')} margin='normal' InputLabelProps={{shrink: true}} placeholder="Type Company Name" required/>
                &nbsp;
                <TextField label='Email' value={email} onChange={handleChange('email')} margin='normal' InputLabelProps={{shrink: true}} placeholder="Type Email"/>
                &nbsp;
                <TextField label='Phone' value={phone} onChange={handleChange('phone')} margin='normal' InputLabelProps={{shrink: true}} placeholder="Type Phone"/>
                &nbsp;
                <TextField label='Address' value={address} onChange={handleChange('address')} margin='normal' multiline fullWidth InputLabelProps={{shrink: true}} placeholder="Type Address"/>
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