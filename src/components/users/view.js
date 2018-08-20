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


export default ({ viewUser, handleClose, handleSubmit, handleChange, user: { username, mEmployeeFirstName, password, mEmployeeLastName, re_password, m_employee_id, m_role_id }, employees, roles }) => {
    return (
        <Fragment>
            <Dialog open={viewUser} onClose={handleClose} fullWidth>
                <div className="div-dialog-header">View User - {mEmployeeFirstName + ' ' + (mEmployeeLastName ? mEmployeeLastName : ' ')} ({username})</div>
                <DialogContent>
                    <DialogContentText className="border">
                        <form>
                            <div className="dialog-content-kiri pdt16">
                                <FormControl fullWidth="true">
                                    <InputLabel shrink htmlFor="unit-simple" required>Role Name</InputLabel>
                                    <Select
                                        value={m_role_id}
                                        inputProps={{
                                            name: 'm_role_id',
                                            id: 'unit-simple',
                                        }}
                                        disabled
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
                                        inputProps={{
                                            name: 'm_employee_id',
                                            id: 'unit-simple',
                                        }}
                                        disabled
                                    >
                                        <MenuItem value=""><em>-Select Employee Name-</em> </MenuItem>
                                        {employees.map(employee => {
                                            return(
                                                <MenuItem value={employee._id}>{employee.first_name + ' ' + employee.last_name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="dialog-content-kanan">

                                <TextField className="input-text" label="Username" value={username} margin='normal' disabled required />
                                <br />
                                <TextField className="input-text" label="Password" value={password} margin='normal' type="password" disabled required />
                                <br />
                                <TextField className="input-text" label="Re-Type Password" value={re_password} margin='normal' type="password" disabled required />
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
