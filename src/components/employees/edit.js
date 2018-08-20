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


export default (
    {
        editEmployee,
        handleClose,
        handleSubmit,
        handleChange,
        employee: {
            _id,
            employee_number,
            firstName,
            lastName,
            mCompanyId,
            email
        },
        companies }) => {
    return (
        <Fragment>
            <Dialog open={editEmployee} onClose={handleClose} fullWidth>
                <div className="div-dialog-header">Edit Employee - {firstName + ' ' + (lastName ? lastName : '')} ({employee_number})</div>
                <DialogContent>
                    <DialogContentText className="border">
                        <form>
                            <div className="dialog-content-kiri">
                                <TextField className="input-text" label="EMP ID Number" value={employee_number} margin='normal' onChange={handleChange('employee_number')} required />
                                <TextField className="input-text" label="First Name" value={firstName} margin='normal' onChange={handleChange('firstName')} required />
                                <TextField className="input-text" label="Last Name" value={lastName} margin='normal' onChange={handleChange('lastName')} required />
                            </div>
                            <div className="dialog-content-kanan pdt16">
                                <FormControl fullWidth="true">
                                    <InputLabel shrink htmlFor="unit-simple" required>Company Name</InputLabel>
                                    <Select
                                        value={mCompanyId}
                                        onChange={handleChange('mCompanyId')}
                                        inputProps={{
                                            name: 'mCompanyId',
                                            id: 'unit-simple',
                                        }}
                                    >
                                        <MenuItem value={mCompanyId}><em>-Select employee Name-</em> </MenuItem>
                                        {companies.map(company => {
                                            return (
                                                <MenuItem value={company._id}>{company.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <br />
                                <TextField className="input-text" label="Email" value={email} margin='normal' onChange={handleChange('email')} required />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>Update</Button>
                    <Button onClick={handleClose} variant="contained" color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
