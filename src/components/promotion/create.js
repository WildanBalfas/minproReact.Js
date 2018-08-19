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

export default ({createNew,handleToggle,handleChange,handleClose,handleSubmit, promo: {t_event_id, flag_design, t_design_id}, events, designs}) =>{
    return <Fragment>
    <Button onClick={handleToggle} variant="contained" color="primary" style={{ float:'right' }}>Add</Button>
    <Dialog open={createNew} onClose={handleClose}  >
    <DialogContent style={{paddimngLeft:25, paddingRight:25}}>
    <DialogContentText id="alert-dialog-description">
    <div class="title">Add Marketing Promotion</div>
    <form class="martop">
    <br/>
    <FormControl fullWidth='true'>
    <InputLabel shrink htmlFor="menu-simple" >* Select Event</InputLabel>
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
    <br/>
    <br/>
    <FormControl fullWidth='true'>
    <InputLabel shrink htmlFor="menu-simple">* Select from Design</InputLabel>
    <Select
    value={flag_design}
    onChange={handleChange('flag_design')}
    inputProps={{
        name: 'flag_design',
        id: 'menu-simple'
    }}
    displayEmpty
    >
    <MenuItem value='' style={{color:'grey', fontFamily:'Helvetica'}}>
    -Please Select-
    </MenuItem>
    <MenuItem value='yes' >Yes</MenuItem>
    <MenuItem value='no'>No</MenuItem>
    </Select>
    </FormControl>
    <br/>
    <br/>
    <FormControl fullWidth='true'>
    <InputLabel shrink htmlFor="menu-simple" >* Select Design</InputLabel>
    <Select
    value={t_design_id}
    onChange={handleChange('t_design_id')}
    inputProps={{
        name: 't_design_id',
        id: 'menu-simple'
    }}
    displayEmpty
    >
    <MenuItem value='' style={{color:'grey', fontFamily:'Helvetica'}}>
    -Select Design-
    </MenuItem>
    {designs.map(z => {
        return(
            <MenuItem key={z._id} value={z._id}>{z.code}</MenuItem>
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