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


export default ({ viewEventInProgress, closeEvent, handleClose, handleCloseRequest, handleChange, handleDelete, handleCloseRequestConfirm, event: { code, event_name, place, start_date, end_date, budget, request_by, request_date, assign_to, note, reject_reason }, employes }) => {
    return <Fragment>
        <Dialog
            open={viewEventInProgress}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Approval Event Request"}</DialogTitle>
            <DialogContent>
                <form>
                    <TextField label="Event Code" value={code} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Event Name" value={event_name} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Event Place" value={place} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Event Start Date" value={start_date} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Event End Date" value={end_date} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Budget (Rp.)" value={budget} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Assign To" value={assign_to} margin='normal' disabled/>
                    &nbsp;
                    <TextField label="Request By" value={request_by} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Request Date" value={request_date} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Note" value={note} margin="normal" disabled />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseRequest} variant="contained" color="primary">
                    Close Request
            </Button>
                <Button onClick={handleClose} variant="contained" color='secondary'>
                    Cancel
            </Button>
            </DialogActions>
            <Dialog
                open={closeEvent}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{"Close Request ?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseRequestConfirm} variant="contained" color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleClose} variant="contained" >
                        Cancel
                    </Button>
                </DialogActions>

            </Dialog>
        </Dialog>
    </Fragment>
}