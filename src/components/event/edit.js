import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';

export default ({ editEvent, handleToggle, handleChange, handleClose, handleSubmit,  event: {code, event_name, place, start_date, end_date, budget, requestName, request_date, note }}) => {
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
                    <TextField label="Event Start Date" value={start_date} onChange={handleChange('start_date')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Date"/>
                    &nbsp;
                    <TextField label="Event End Date" value={end_date} onChange={handleChange('end_date')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Date"/>
                    &nbsp;
                    <TextField label="Budget (Rp.)" value={budget} onChange={handleChange('budget')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Budget"/>   
                    &nbsp;
                    <TextField label="Request By" value={requestName} margin='normal' disabled/>             
                    &nbsp;
                    <TextField label="Note" value={note} onChange={handleChange('note')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Note"/>              
                </form>
                </DialogContentText>
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