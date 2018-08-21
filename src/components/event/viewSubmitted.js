import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


export default ({ viewEventSubmitted, rejectEvent, handleClose, handleReject, handleRejectConfirm, handleChange, handleDelete, handleApproved, errors: {assign_toErr},event: { code, event_name, place, start_date, end_date, budget, request_by, request_date, assign_toName,assign_to, note, reject_reason, requestName }, employes }) => {
    return <Fragment>
        <Dialog
            open={viewEventSubmitted}
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
                    <FormControl fullWidth='true' required>
                        <InputLabel shrink htmlFor="unit-simple">Assign To </InputLabel>
                        <Select
                            value={assign_to}
                            onChange={handleChange('assign_to')}
                            inputProps={{
                                name: 'assign_to',
                                id: 'unit-simple'
                            }}
                            error={assign_toErr === null ? false : true}
                        >
                            <MenuItem value=''>
                                -Select Name-
                            </MenuItem>
                            {employes.map(c => {
                                return (
                                    <MenuItem value={c._id}>{(c.name.first ? c.name.first  + ' ' : '') + 
                                    (c.name.last ? c.name.last  + ' ' : '')}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    &nbsp;
                    <TextField label="Request By" value={requestName} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Request Date" value={request_date} margin="normal" disabled />
                    &nbsp;
                    <TextField label="Note" value={note} margin="normal" disabled />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleApproved} variant="contained" color="primary">
                    Approved
            </Button>
                <Button onClick={handleReject} variant="contained" color="secondary">
                    Reject
            </Button>
                <Button onClick={handleClose} variant="contained" color='orange'>
                    Cancel
            </Button>
            </DialogActions>
            <Dialog
                open={rejectEvent}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{"Reject Reason"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField value={reject_reason} onChange={handleChange('reject_reason')} margin='normal' InputLabelProps={{ shrink: 'true' }} placeholder='Input Reject Reason' />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRejectConfirm} variant="contained" color="secondary">
                        Reject
                    </Button>
                    <Button onClick={handleClose} variant="contained" color='orange'>
                        Cancel
                    </Button>
                </DialogActions>

            </Dialog>
        </Dialog>

    </Fragment>
}