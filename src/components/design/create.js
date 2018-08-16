import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default ({ createNew, handleToggle, handleClose, handleChange, handleSubmit, design: { t_event_id, note, design_title}, events }) => {
    return <Fragment>
        <Button onClick={handleToggle} variant="contained" color="primary" style={{ float: 'right' }}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose} fullScreen      >
            <DialogTitle id="alert-dialog-title">{"Create New User"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className='div-header'>Please fill out the form below!</div>
                    <div className="div-atas">
                        <form>
                            <div class='grup-kiri'>
                                <TextField fullWidth style={{ marginRight: 20 }} label="Transaction Code" margin='normal' required disabled />
                                <FormControl fullWidth style={{ width: 200 }}>
                                    <InputLabel shrink htmlFor="unit-simple">Event Code</InputLabel>
                                    <Select style={{ marginRight: 20 }}
                                        value={t_event_id}
                                        onChange={handleChange('event_id')}
                                        inputProps={{
                                            name: 'event_id',
                                            id: 'unit-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>-Select Role Name-</em>
                                        </MenuItem>
                                        {events.map(event => {
                                            return (
                                                <MenuItem value={event._id}>{event.event_name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField fullWidth style={{ marginRight: 20 }} label="Design Title" value={design_title} margin='normal' onChange={handleChange('design_title')} required />
                            </div>
                            <div className='grup-kanan'>
                                <TextField disabled fullWidth style={{ marginRight: 20 }} label="Request By" margin='normal' required disable />
                                <TextField fullWidth style={{ marginRight: 20 }} label="Request Date" margin='normal' required disabled />
                                <textarea placeholder="Type a note" className="textarea" label="Note" value={note} margin='normal' onChange={handleChange('note')} required />
                            </div>
                        </form>
                    </div>
                    <div className="div-bawah mh-10">
                        <Button variant="contained" color="primary">Add Item</Button>
                    </div>
                    <br />
                </DialogContentText>
            </DialogContent>
            <DialogActions class="dialog-action bawah">
                <Button onClick={handleClose}  variant="contained" color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>
                    Save
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}