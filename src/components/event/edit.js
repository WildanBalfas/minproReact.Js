import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default ({ editEvent, handleToggle, handleChange, handleClose, handleSubmit,  event: {code, event_name, place, start_date, end_date, budget, request_by, request_date, note,status }}) => {
    return <Fragment>
        <Dialog
            open={editEvent}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Update Event"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <form>
                    <TextField label="Event Code" value={code} onChange={handleChange('code')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Auto Generated" required disabled/>
                    &nbsp;
                    <TextField label="Event Name" value={event_name} onChange={handleChange('event_name')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Event Name" required />
                    &nbsp;
                    <TextField label="Event Place" value={place} onChange={handleChange('place')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Event Name" required />
                    &nbsp;
                    <TextField type='date' label="Event Start Date" value={start_date} onChange={handleChange('start_date')} margin="normal" InputLabelProps={{shrink: true}} placeholder={start_date}/>
                    &nbsp;
                    <TextField type='date' label="Event End Date" value={end_date} onChange={handleChange('end_date')} margin="normal" InputLabelProps={{shrink: true}} placeholder={start_date}/>
                    &nbsp;
                    <TextField label="Budget (Rp.)" value={budget} onChange={handleChange('budget')} margin="normal" InputLabelProps={{shrink: true}} required/>   
                    &nbsp;
                    <TextField label="Request By" value={request_by} margin='normal' disabled InputLabelProps={{shrink: true}} required/>             
                    &nbsp;
                    <TextField label="Request Date" value={request_date} margin='normal' disabled InputLabelProps={{shrink: true}} disabled required />             
                    &nbsp;
                    <TextField label="Note" value={note} onChange={handleChange('note')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Note" /> 
                    &nbsp;
                    <TextField label="Status" value={status == 1 ? 'Submitted' : status== 2 ? 'In Progress' : 'Done'} onChange={handleChange('status')} margin="normal" InputLabelProps={{shrink: true}} disabled />                  
                </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>
                    Update
            </Button>
                <Button onClick={handleClose} variant="contained" color="secondary">
                    Cancel
            </Button>
                
            </DialogActions>
        </Dialog>
    </Fragment>
}