import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


export default ({deleteUnit, handleDelete , handleClose ,   unit : {code, name, description}}) => {
 
    return <Fragment>
        <Dialog
            open={deleteUnit}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure to delete?
            </DialogContentText>
            <form>
                <TextField label = 'Unit Code' value = {code}  margin = 'normal' disabled = {true}/>
                <br/>
                <TextField label = 'Unit Name' value = {name}  margin = 'normal'  disabled = {true}/>
                <br/>
                <TextField label = 'Description' value = {description} margin = 'normal' disabled = {true}/>
                <br/>
            </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" variant="contained">
                    Cancel
            </Button>
                    <Button onClick={handleDelete} color="primary" variant="contained" autoFocus>
                        Delete
                </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}