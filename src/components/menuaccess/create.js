import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';


export default ({ createNew,toggleCheckbox , handleToggle, handleClose, handleSubmit,handleChange,checked, menuaccess : {m_role_id, m_menu_id } , role , menu}) => {
  

    return <Fragment>
        
        <Button onClick={handleToggle} variant="contained" color="primary" style={{ float:'right' }}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"Add Menu Access"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Please fill out the form below!
                   
            <form>
        
            <FormControl fullWidth='true'>
        <InputLabel>Role Code</InputLabel>
          <Select
          value = {m_role_id}
          onChange = {handleChange('m_role_id')} 
          inputProps = {{
              name : 'm_role_id',
              id: 'unit-simple',
          }} >
            <MenuItem value = "" >
              <em>-Select Role Code-</em>
            </MenuItem>
            {role.map(n => {
                return(
                    <MenuItem value = {n._id}>{n.name}   </MenuItem>
                )
            })}  
          </Select>
          
          </FormControl>
            
            <List fullWidth = 'true'  >

            {menu.map(n=>{
                return(

            <ListItem 
              role={undefined}
              key = {n._id}
              onClick={toggleCheckbox(n._id)}
              button
            >
            <Checkbox
                checked ={checked.indexOf(n._id) !== -1}
                tabIndex={-1}
                disableRipple

            />
      
                    
            <ListItemText primary={n.name} />
               
      
              
            </ListItem>

             )
            })}
          
            </List>

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

