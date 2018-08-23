import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default ({errors:{nameErr, controllerErr},createNew,handleToggle,handleChange,handleClose,handleSubmit, menu: {code, name, controller, parent_id}, menus}) =>{
    
    return <Fragment>
    <Button onClick={handleToggle} variant="contained" color="primary" style={{ float:'right' }}>Add</Button>
    <Dialog open={createNew} onClose={handleClose} >
    <DialogContent>
    <DialogContentText id="alert-dialog-description">
    <div class="title">Add Menu</div>
    <form class="martop">
    <TextField label='Menu Code' value={code} margin='normal' disabled={true} InputLabelProps={{shrink: true}} placeholder="Auto Generated"/>
    <br/>
    <TextField label='Menu Name' value={name} onChange={handleChange('name')} error={nameErr == 0 ? false : true } margin='normal' InputLabelProps={{shrink: true}} required/>
    <br/>
    <TextField label="Controller Name" value={controller} onChange={handleChange('controller')} error={controllerErr == 0 ? false : true} margin='normal' InputLabelProps={{shrink: true}} required/>
    <br/>
    <FormControl fullWidth='true'>
    <InputLabel shrink htmlFor="menu-simple" >Parent </InputLabel>
    <Select
    value={parent_id}
    onChange={handleChange('parent_id')}
    inputProps={{
        name: 'parent_id',
        id: 'menu-simple'
    }}
    displayEmpty
    >
    <MenuItem value='' style={{color:'grey', fontFamily:'Helvetica'}}>
    -Select Menu Name-
    </MenuItem>
    {menus.map(x => {
        return(
            <MenuItem key={x._id} value={x._id}>{x.name}</MenuItem>
        )
    })}
    </Select>
    </FormControl>
    
    </form>
    </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose} color="secondary" variant="contained">
    Cancel
    </Button>
    <Button onClick={handleSubmit} color="primary" variant="contained" autoFocus>
    Save
    </Button>
    </DialogActions>
    </Dialog>
    </Fragment>
}