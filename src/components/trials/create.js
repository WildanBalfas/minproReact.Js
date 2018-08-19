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

export default ({ createNew, handleToggle, handleClose, handleChange, handleSubmit, user: { username, password, re_password, mRoleId, mEmployeeId }, employees, roles }) => {
    // shrink
    return <Fragment>        
        <Button onClick={handleToggle} variant="contained" color="primary" style={{ float:'right' }}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}        >
            <DialogTitle id="alert-dialog-title">{"Create New User"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please fill out the form below!
                    <form>
                        <FormControl fullWidth="true">
                            <InputLabel shrink htmlFor="unit-simple">Role Name</InputLabel>
                            <Select
                                value={mRoleId}
                                onChange={handleChange('mRoleId')}
                                inputProps={{
                                    name: 'mRoleId',
                                    id: 'unit-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>-Select Role Name-</em>
                                    </MenuItem>
                                {roles.map(r => {
                                    return (
                                        <MenuItem value={r._id}>{r.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <br />
                        <TextField label="Username" value={username} margin='normal' onChange={handleChange('username')} required/>
                        <br />
                        <FormControl fullWidth="true">
                            <InputLabel shrink htmlFor="unit-simple">Employee Name</InputLabel>
                            <Select
                                value={mEmployeeId}
                                onChange={handleChange('mEmployeeId')}
                                inputProps={{
                                    name: 'mEmployeeId',
                                    id: 'unit-simple',
                                }}
                            >
                                <MenuItem valu="">
                                    <em>-Select Role Name-</em>
                                    </MenuItem>
                                {employees.map(emp => {
                                    return (
                                        <MenuItem value={emp._id}>{emp.first_name + ' ' + emp.last_name}</MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>
                        <br />
                        <TextField label="Password" value={password} margin='normal' type="password" onChange={handleChange('password')} required/>
                        <br />
                        <TextField label="Re-Type Password" value={re_password} margin='normal' type="password" onChange={handleChange('re_password')} required />
                        <br />
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