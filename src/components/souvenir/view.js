import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default ({ viewSouvenir,handleClose,souvenir: {code, name, m_unit_id, description}}) => {
    return <Fragment>
        <Dialog
            open={viewSouvenir}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Delete Souvenir"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Delete Data ?
            </DialogContentText>
            <form>
                <TextField label='Souvenir Code' value={code} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Souvenir Name' value={name} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Unit Name' value={m_unit_id} margin='normal' disabled={true}/>
                &nbsp;
                <TextField label='Description' value={description} margin='normal' disabled={true}/>
                &nbsp;
            </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}