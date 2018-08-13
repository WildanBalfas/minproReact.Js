import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


export default ({ viewEvent,handleClose, event: {code, event_name, place, start_date, end_date, budget, request_by, request_date, note }}) => {
    return <Fragment>
        <Dialog
            open={viewEvent}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"View Souvenir"}</DialogTitle>
            <DialogContent>
            <form>
                    <TextField label="Event Code" value={code} margin="normal" disabled/>
                    &nbsp;
                    <TextField label="Event Name" value={event_name} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Event Place" value={place} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Event Start Date" value={start_date} margin="normal" disabled/>
                    &nbsp;
                    <TextField label="Event End Date" value={end_date} margin="normal" disabled/>
                    &nbsp;
                    <TextField label="Budget (Rp.)" value={budget} margin="normal" disabled/>   
                    &nbsp;
                    <TextField label="Request By" value={request_by} margin="normal" disabled/>             
                    &nbsp;
                    <TextField label="Request Date" value={request_date} margin="normal" disabled/>               
                    &nbsp;
                    <TextField label="Note" value={note} margin="normal" />              
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