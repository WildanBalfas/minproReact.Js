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

export default ({editSouvenir,handleChange,handleClose,handleEdit,handleSubmit, souvenir: {code, name, m_unit_id, description }}) => {
    return <Fragment>
        <Dialog
            open={editSouvenir}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Update souvenir"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Please edit data
            </DialogContentText>
            <form>
                <TextField label='Souvenir Code' value={code} onChange={handleChange('code')} margin='normal'/>
                &nbsp;
                <TextField label='Souvenir Name' value={name} onChange={handleChange('name')} margin='normal'/>
                &nbsp;
                <TextField label='Unit Name' value={m_unit_id} onChange={handleChange('m_unit_id')} margin='normal'/>
                &nbsp;
                <TextField label='Description' value={description} onChange={handleChange('description')} margin='normal'/>
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