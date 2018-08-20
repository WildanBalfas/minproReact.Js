import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


export default ({viewUnit, handleClose , unit : {code, name, description}}) => {
    return <Fragment>
        <Dialog
            open={viewUnit}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"View Unit"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Unit
            </DialogContentText>
            <form>
                <TextField label = 'Unit Code' value = {code}  margin = 'normal' disabled = {true}/>
                &nbsp;
                <TextField label = 'Unit Name' value = {name}  margin = 'normal'  disabled = {true}/>
                <br/>
                <TextField label = 'Description' value = {description} margin = 'normal' disabled = {true}/>
                &nbsp;
            </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" variant="contained">
                    Cancel
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}