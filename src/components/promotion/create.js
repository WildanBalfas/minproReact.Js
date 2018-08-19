import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default ({createNew,handleToggle,handleChange,handleClose,handleSubmit, promo: {t_event_id, event_code}, events}) =>{
    
    return <Fragment>
    <Button onClick={handleToggle} variant="contained" color="primary" style={{ float:'right' }}>Add</Button>
    <Dialog open={createNew} onClose={handleClose} >
    <DialogContent>
    <DialogContentText id="alert-dialog-description">
    <div class="title">Add Marketing Promotion</div>
    <form class="martop">
    <FormControl fullWidth='true'>
    <InputLabel shrink htmlFor="menu-simple" >* Select Event :</InputLabel>
    <Select
    value={t_event_id}
    onChange={handleChange('t_event_id')}
    inputProps={{
        name: 't_event_id',
        id: 'menu-simple'
    }}
    displayEmpty
    >
    <MenuItem value='' style={{color:'grey', fontFamily:'Helvetica'}}>
    -Select Event-
    </MenuItem>
    {events.map(x => {
        return(
            <MenuItem key={x._id} value={x._id}>{x.code}</MenuItem>
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