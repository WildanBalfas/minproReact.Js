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
        viewEmployee,
        handleClose,
        handleSubmit,
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
            <Dialog open={viewEmployee} onClose={handleClose} fullWidth>
                <div className="div-dialog-header">View Employee - {firstName + ' ' + (lastName ? lastName : '')} ({employee_number})</div>
                <DialogContent>
                    <DialogContentText className="border">
                        <form>
                            <div className="dialog-content-kiri">
                                <TextField className="input-text" label="EMP ID Number" value={employee_number} margin='normal' disabled required />
                                <TextField className="input-text" label="First Name" value={firstName} margin='normal' disabled required />
                                <TextField className="input-text" label="Last Name" value={lastName} margin='normal' disabled required />
                            </div>
                            <div className="dialog-content-kanan pdt16">
                                <FormControl fullWidth="true">
                                    <InputLabel shrink htmlFor="unit-simple" required>Company Name</InputLabel>
                                    <Select
                                        value={mCompanyId}
                                        inputProps={{
                                            name: 'mCompanyId',
                                            id: 'unit-simple',
                                        }}
                                        disabled
                                    >
                                        <MenuItem value={mCompanyId}><em>-Select Role Name-</em> </MenuItem>
                                        {companies.map(company => {
                                            return (
                                                <MenuItem value={company._id}>{company.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <br />
                                <TextField className="input-text" label="Email" value={email} margin='normal' disabled required />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary" >Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
