import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default ({ createNew,handleToggle,handleChange,handleClose, handleSubmit, errors:{nameErr}, company: {code, name, email, phone, address}}) => {
    return <Fragment>
        <Button onClick={handleToggle} variant="contained" color="primary" style={{float: 'right'}}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Add Company"}</DialogTitle>
            <DialogContent>
                
            <form>
                <TextField label='Company Code'  value={code} margin='normal' InputLabelProps={{shrink: true}} placeholder="Auto Generated" disabled/>
                &nbsp;
                <TextField label={nameErr == 0 ? "Company Name " : nameErr } value={name} onChange={handleChange('name')}  errorText={'tes'} margin='normal' error={nameErr == 0 ? false : true } InputLabelProps={{shrink: true}} placeholder="Type Company Name" required/>
                <br/>
                <TextField label='Email' value={email} onChange={handleChange('email')} margin='normal' InputLabelProps={{shrink: true}} placeholder="Type Email"/>
                <br/>
                <TextField label='Phone' value={phone} onChange={handleChange('phone')} margin='normal' InputLabelProps={{shrink: true}} placeholder="Type Phone"/>
                &nbsp;
                <TextField label='Address' value={address} onChange={handleChange('address')} margin='normal' multiline fullWidth InputLabelProps={{shrink: true}} placeholder="Type Address"/>
                &nbsp;
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