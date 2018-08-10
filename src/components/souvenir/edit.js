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

export default ({ editSouvenir, handleToggle, handleChange, handleClose, handleSubmit, souvenir: { code, name, m_unit_id, unitName, description }, unit }) => {
    return <Fragment>
        <Dialog
            open={editSouvenir}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Update Souvenir"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   <form>
                        <TextField label="Souvenir Code" value={code} onChange={handleChange('code')} margin="normal" required />&nbsp;
                    <br />
                        <TextField label="Souvenir Name" value={name} onChange={handleChange('name')} margin="normal" required />
                        <FormControl fullWidth='true' required>
                            <InputLabel shrink htmlFor="unit-simple">Unit Name</InputLabel>
                            <Select
                                value={m_unit_id}
                                onChange={handleChange('m_unit_id')}
                                inputProps={{
                                    name: 'm_unit_id',
                                    id: 'unit-simple',
                                }}
                                displayEmpty
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