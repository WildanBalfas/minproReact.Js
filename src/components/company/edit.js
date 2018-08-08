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

export default ({editUser,handleChange,handleClose,handleEdit,handleChangeCheckBox,handleSubmit,user: {username,first,middle,last,email, phone,activate}}) => {
    return <Fragment>
        <Dialog
            open={editUser}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Update user"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Please edit the data
            </DialogContentText>
            <form>
                <TextField label='User Name' value={username} onChange={handleChange('username')} margin='normal'/>
                &nbsp;
                <TextField label='First Name' value={first} onChange={handleChange('first')} margin='normal'/>
                &nbsp;
                <TextField label='Middle Name' value={middle} onChange={handleChange('middle')} margin='normal'/>
                &nbsp;
                <TextField label='Last Name' value={last} onChange={handleChange('last')} margin='normal'/>
                &nbsp;
                <TextField label='Email' value={email} onChange={handleChange('email')} margin='normal'/>
                &nbsp;
                <TextField label='Phone' value={phone} onChange={handleChange('phone')} margin='normal'/>
                &nbsp;
                <FormControlLabel
                    control={
                        <Switch
                            checked={activate}
                            onChange={handleChangeCheckBox('activate')}
                            value="active"
                            color="primary"
                        />
                    }
                    label="Active"/>
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