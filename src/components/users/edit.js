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


export default ({editUser, handleClose, handleChange, handleSubmit,employees, roles, handleChangeCheckBox,  user: {username,mRoleId, mEmployeeId, password, re_password} }) => {
    // shrink
    return <Fragment>
        <Dialog
            open={editUser}
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
                                    name: 'mRoleName',
                                    id: 'unit-simple',
                                }}
                            >
                            
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

// export default () => {
//     return <Fragment>
//         <Dialog
//             open={editUser}
//             onClose={handleClose}        >
//             <DialogTitle id="alert-dialog-title">{"Update Users"}</DialogTitle>
//             <DialogContent>
//                 <DialogContentText id="alert-dialog-description">
//                     Please fill out the form below!
//                     <form>
//                         <TextField label="Username" value={userName} margin='normal' onChange={handleChange('userName')}/>
//                         &nbsp;
//                         <TextField label="First Name" value={first} margin='normal' onChange={handleChange('first')}/>
//                         <br/>
//                         <TextField label="Middle Name" value={middle} margin='normal' onChange={handleChange('middle')}/>
//                         &nbsp;
//                         <TextField label="Last Name" value={last} margin='normal' onChange={handleChange('last')}/>
//                         <br/>
//                         <TextField label="Email" value={email} margin='normal' onChange={handleChange('email')}/>
//                         &nbsp;
//                         <TextField label="Phone" value={phone} margin='normal' onChange={handleChange('phone')}/>
//                         <br/>
//                         <FormControlLabel
//                             control={
//                                 <Switch
//                                     checked={active}
//                                     onChange={handleChangeCheckBox('active')}
//                                     value="active"
//                                     color="primary"
//                                 />
//                             }
//                             label="Active"
//                         />
//                         &nbsp;
//                     </form>
//             </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                     Cancel
//             </Button>
//                 <Button onClick={handleSubmit} color="primary" autoFocus>
//                     Save
//             </Button>
//             </DialogActions>
//         </Dialog>
//     </Fragment>
// }