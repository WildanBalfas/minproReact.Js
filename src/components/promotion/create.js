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
import TextField from '@material-ui/core/TextField';

export default ({handleChangeSelectDesign,handleChangeSelectEvent, handleSelect, subSelect, handleToggleNext,nextPromo,createNew,handleToggle,handleChange,handleClose,handleSubmit, promo: {code,note,request_date,title, t_event_id, flag_design, t_design_id,t_event_code,t_design_code}, events, designs, promos}) =>{
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
    onChange={handleChangeSelectEvent('t_event_id')}
    inputProps={{
        name: 't_event_id',
        id: 'menu-simple'
    }}
    displayEmpty
    >
    <MenuItem value='' style={{color:'grey', fontFamily:'Helvetica'}}>
    -Select Event-
    </MenuItem>
    {events.map(e => {
        return(
            <MenuItem key={e._id} value={e._id}>{e.code}</MenuItem>
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
    onChange={handleSelect}
    inputProps={{
        name: 'flag_design',
        id: 'menu-simple'
    }}
    displayEmpty
    >
    <MenuItem value='' style={{color:'grey', fontFamily:'Helvetica'}}>
    -Please Select-
    </MenuItem>
    <MenuItem value='1'>Yes</MenuItem>
    <MenuItem value='0'>No</MenuItem>
    </Select>
    </FormControl>
    <br/>
    <br/>
    <FormControl fullWidth='true' style={{ visibility: subSelect ? "hidden" : "visible"}}>
    <InputLabel shrink htmlFor="menu-simple" >{subSelect} * Select Design</InputLabel>
    <Select
    value={t_design_id}
    onChange={handleChangeSelectDesign('t_design_id')}
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
    <Button onClick={handleToggleNext} color="primary" variant="contained" autoFocus>
    Next
    </Button>
    </DialogActions>
    </Dialog>
    <Dialog open={nextPromo} onClose={handleClose} >
    <DialogContent style={{paddimngLeft:25, paddingRight:25}}>
    <div className="clear">
    <DialogContentText id="alert-dialog-description" className="border">
    <div class="title">Add Marketing Promotion</div>
    <div className="dialogtitle">MARKETING HEADER PROMOTION</div>
    <form class="martop">
    <TextField label='Transaction Code' value={code} margin='normal' disabled={true} InputLabelProps={{shrink: true}} placeholder="Auto Generated"/>
    &nbsp;
    {promos.map(p => {
        return(
            <TextField key={p._id} label='* Request By' value={(p.request_by.first ? p.request_by.first + " " : "") + (p.request_by.last ? p.request_by.last + " " : "")} margin='normal' disabled={true} InputLabelProps={{shrink: true}}/>
        )
    })}
    <br/>
    
    <TextField label='* Event Code' value={events.t_event_code} margin='normal' disabled={true} InputLabelProps={{shrink: true}}/>
    
    &nbsp;
    <TextField label='* Requst Date' value={request_date} margin='normal' disabled={true} InputLabelProps={{shrink: true}}/>
    <br/>
    <TextField label='* Title Header' value={title} onChange={handleChange('title')} margin='normal' InputLabelProps={{shrink: true}}/>
    &nbsp;
    <TextField label='Note' value={note} margin='normal' onChange={handleChange('note')} InputLabelProps={{shrink: true}}/>
    </form>
    <br/>
    </DialogContentText>
    </div>
    <div className="clear">
    <DialogContentText id="alert-dialog-description" className="border">
    <div className="dialogtitle">DESIGN HEADER INFORMATION -</div>
    <form class="martop">
    <TextField label='Design Code' value={designs.t_design_code} margin='normal' disabled={true} InputLabelProps={{shrink: true}} required/>
    &nbsp;
    <TextField label='Note' value={note} margin='normal' onChange={handleChange('note')} InputLabelProps={{shrink: true}}/>
    <br/>
    <TextField label='* Title Header' value={title} onChange={handleChange('title')} margin='normal' InputLabelProps={{shrink: true}}/>
    <br/>
    {promos.map(p => {
        return(
            <TextField key={p._id} label='* Request By' value={(p.request_by.first ? p.request_by.first + " " : "") + (p.request_by.last ? p.request_by.last + " " : "")} margin='normal' disabled={true} InputLabelProps={{shrink: true}}/>
        )
    })}
    <br/>
    <TextField label='* Requst Date' value={request_date} margin='normal' disabled={true} InputLabelProps={{shrink: true}}/>
    </form>
    </DialogContentText>
    </div>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose} color="secondary" variant="contained">
    Cancel
    </Button>
    <Button color="primary" variant="contained" autoFocus>
    Next
    </Button>
    </DialogActions>
    </Dialog>
    </Fragment>
}