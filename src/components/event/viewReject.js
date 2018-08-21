import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


export default ({ viewEventReject, closeEvent, handleClose, handleChange, handleDelete, event: { code, event_name, place, start_date, end_date, budget, request_by, request_date, note, reject_reason, requestName }}) => {
    return <Fragment>
        <Dialog
            open={viewEventReject}
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
                    <TextField label="Request By" value={requestName} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Request Date" value={request_date} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Note" value={note} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Reject Reason" value={reject_reason} margin="normal" disabled />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color='secondary'>
                    Close
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}