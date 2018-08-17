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

export default ({editMenu,handleChange,handleClose,handleEdit,handleSubmit, menu: {_id, code, name, controller,parent_id}, menus}) => {
  return <Fragment>
  <Dialog
  open={editMenu}
  onClose={handleClose}
  >
  <DialogContent>
  <DialogContentText id="alert-dialog-description">
  <div class="title">Edit Menu</div>
  </DialogContentText>
  <form class="martop">
  <TextField label='*Menu Code' value={code} onChange={handleChange('code')} margin='normal' disabled={true} />
  <br/>
  <TextField label='*Menu Name' value={name} onChange={handleChange('name')} margin='normal'/>
  <br/>
  <TextField label='*Controller Name' value={controller} onChange={handleChange('controller')} margin='normal'/>
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
    <MenuItem value='' style={{color:'grey'}}>
    None
    </MenuItem>
    {menus.map(x => {
        if (_id != x._id) {
            return(
                <MenuItem key={x._id} value={x._id}>
                   {x.name}
               </MenuItem>
            )
        }
    })}
    </Select>
    </FormControl>
  </form>
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