import React, { Fragment } from 'react';

// Material UI
import {
    Dialog,
    DialogActions,
    Button,
    TextField,
    DialogContent,
    InputLabel,
    DialogContentText,
    Select, MenuItem,
    FormControl
} from '@material-ui/core';


export default ({ createNew, handleToggle, handleClose, handleSubmit, handleChange, user: { username, password, re_password, m_employee_id, m_role_id }, employees, roles }) => {
    return (
        <Fragment>
            <Button onClick={handleToggle} variant="contained" color="primary" style={{ float: 'right' }}>Add</Button>
            <Dialog open={createNew} onClose={handleClose} fullWidth>
                <div className="div-dialog-header">Add User</div>
                <DialogContent>
                    <DialogContentText className="border">
                        <form>
                            <div className="dialog-content-kiri pdt16">
                                <FormControl fullWidth="true">
                                    <InputLabel shrink htmlFor="unit-simple" required>Employee Name</InputLabel>
                                    <Select
                                        value={m_role_id}
                                        onChange={handleChange('m_role_id')}
                                        inputProps={{
                                            name: 'm_role_id',
                                            id: 'unit-simple',
                                        }}
                                    >
                                        <MenuItem value=""><em>-Select Role Name-</em> </MenuItem>
                                        {roles.map(role =>{
                                            return(
                                                <MenuItem value={role._id}>{role.name}</MenuItem>
                                            )   
                                        })}
                                    </Select>
                                </FormControl>
                                <br />
                                <br />
                                <FormControl fullWidth="true">
                                    <InputLabel shrink htmlFor="unit-simple" required>Employee Name</InputLabel>
                                    <Select
                                        value={m_employee_id}
                                        onChange={handleChange('m_employee_id')}
                                        inputProps={{
                                            name: 'm_employee_id',
                                            id: 'unit-simple',
                                        }}
                                    >
                                        <MenuItem value=""><em>-Select Role Name-</em> </MenuItem>
                                        {employees.map(employee => {
                                            return(
                                                <MenuItem value={employee._id}>{employee.first_name + ' ' + employee.last_name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="dialog-content-kanan">

                                <TextField className="input-text" label="Username" value={username} margin='normal' onChange={handleChange('username')} required />
                                <br />
                                <TextField className="input-text" label="Password" value={password} margin='normal' type="password" onChange={handleChange('password')} required />
                                <br />
                                <TextField className="input-text" label="Re-Type Password" value={re_password} margin='normal' type="password" onChange={handleChange('re_password')} required />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary" >Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}