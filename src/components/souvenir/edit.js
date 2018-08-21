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

export default ({ editSouvenir, handleToggle, handleChange, handleClose, handleSubmit,errors:{nameErr}, souvenir: { code, name, m_unit_id, unitName, description }, unit }) => {
    return <Fragment>
        <Dialog
            open={editSouvenir}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Update Souvenir"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   <form>
                        <TextField label="Souvenir Code" value={code} margin="normal" required disabled />&nbsp;
                    <br />
                        <TextField label="Souvenir Name" value={name} error={nameErr == 0 ? false : true } onChange={handleChange('name')}  margin="normal" required />
                        <FormControl fullWidth='true' required>
                            <InputLabel shrink htmlFor="unit-simple">Unit Name</InputLabel>
                            <Select
                                value={m_unit_id}
                                onChange={handleChange('m_unit_id')}
                                inputProps={{
                                    name: 'm_unit_id',
                                    id: 'unit-simple',
                                }}
                            >
                                {unit.map(u => {
                                    return (
                                        <MenuItem value={u._id}>{u.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <br />
                        <TextField label="Description" value={description} onChange={handleChange('description')} margin="normal" />&nbsp;
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