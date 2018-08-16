import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '../../../node_modules/@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default ({editEmployee, handleToggle, handleClose, handleChange, handleEdit, employee: {code, firstName, lastName, email, m_company_id}, companies}) => {
    // shrink
    return <Fragment>
        <Dialog
            open={editEmployee}
            onClose={handleClose} fullScreen>
           <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <div className='div-header'>Please fill out the form below!</div>
                    <div className='clear'/>
                    <form>
                        <TextField label="Employee Id Number" value={code} fullWidth margin='normal' onChange={handleChange('code')} required/>
                        <br />
                        <TextField label="First Name" value={firstName} fullWidth margin='normal' onChange={handleChange('firstName')} required/>
                        <br />
                        <TextField label="Last Name" value={lastName} fullWidth margin='normal' onChange={handleChange('lastName')} required/>
                        <br />
                        <FormControl fullWidth="true">
                            <InputLabel shrink htmlFor="unit-simple">Company Name</InputLabel>
                            <Select
                                value={m_company_id}
                                onChange={handleChange('m_company_id')}
                                inputProps={{
                                    name: 'm_company_id',
                                    id: 'unit-simple',
                                }}
                            >
                                <MenuItem valu="">
                                    <em>-Select Company Name-</em>
                                    </MenuItem>
                                {companies.map(company => {
                                    return (
                                        <MenuItem value={company._id}>{company.name}</MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>
                        <br />
                        <TextField label="Email" value={email} fullWidth margin='normal' onChange={handleChange('email')} required/>
                        <br />
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                
                <Button onClick={handleEdit} style={{ background: '#337ab7', color: 'white'}} color="primary" autoFocus>
                    Update
            </Button>
            <Button onClick={handleClose} style={{ background: '#f0ad4e', color: 'white'}} color="primary">
                    Cancel
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}
