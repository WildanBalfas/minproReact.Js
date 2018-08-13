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

export default ({ createNew,handleToggle,handleChange,handleClose,handleSubmit, souvenir: {code, name, m_unit_id, description }, unit}) => {
    return <Fragment>
        <Button onClick={handleToggle} variant="contained" color="primary" style={{float: 'right'}}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Add Souvenir"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   <form>
                    <TextField label="Souvenir Code" value={code} onChange={handleChange('code')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Auto Generated" required disabled/>
                    <br/>
                    <TextField label="Souvenir Name" value={name} onChange={handleChange('name')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Souvenir Name" required />
                    <FormControl fullWidth='true' required>
                        <InputLabel shrink htmlFor="unit-simple" >Unit Name </InputLabel>
                        <Select
                            value={m_unit_id}
                            onChange={handleChange('m_unit_id')}
                            inputProps={{
                                name: 'm_unit_id',
                                id: 'unit-simple'
                            }}
                            displayEmpty
                        >
                            <MenuItem value=''>
                                -Select Unit Name-
                            </MenuItem>
                            {unit.map(c => {
                                return(
                                    <MenuItem value={c._id}>{c.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <br/>
                    <TextField label="Description" value={description} onChange={handleChange('description')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Description" multiline/>&nbsp;
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