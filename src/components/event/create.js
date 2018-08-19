import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default ({ createNew, handleToggle, handleChange, handleClose, handleSubmit, event: { code, event_name, place, start_date, end_date, budget, request_by, request_date, note } }) => {
    return <Fragment>
        <Button onClick={handleToggle} variant="contained" color="primary" style={{ float: 'right' }}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Add Event"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <form>
                        <TextField label="Event Code" value={code} onChange={handleChange('code')} margin="normal" InputLabelProps={{ shrink: true }} placeholder="Auto Generated" required disabled/>
                        &nbsp;
                    <TextField label="Event Name" value={event_name} onChange={handleChange('event_name')} margin="normal" InputLabelProps={{ shrink: true }} placeholder="Type Event Name" required />
                        &nbsp;
                    <TextField label="Event Place" value={place} onChange={handleChange('place')} margin="normal" InputLabelProps={{ shrink: true }} placeholder="Type Event Place" required />
                        &nbsp;
                    <TextField type='date' label="Event Start Date" value={start_date} onChange={handleChange('start_date')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Date" required/>
                    &nbsp;
                     
                    <TextField type='date' label="Event End Date" value={end_date} onChange={handleChange('end_date')} margin="normal" InputLabelProps={{ shrink: true }} placeholder="Type Date" required />
                        &nbsp;
                    <TextField label="Budget (Rp.)" value={budget} onChange={handleChange('budget')} margin="normal" InputLabelProps={{ shrink: true }} placeholder="Type Budget" required/>
                        &nbsp;
                    <TextField label="Request By" value={request_by} onChange={handleChange('request_by')} margin="normal" InputLabelProps={{ shrink: true }} placeholder="Type Request by" required/>
                        &nbsp;
                    <TextField label="Request Date" value={request_date} onChange={handleChange('request_date')} margin="normal" InputLabelProps={{ shrink: true }} placeholder={request_date} type='date' />
                        &nbsp;
                    <TextField label="Note" value={note} onChange={handleChange('note')} margin="normal" InputLabelProps={{ shrink: true }} placeholder="Type Note" />
                    </form>
                </DialogContentText>
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