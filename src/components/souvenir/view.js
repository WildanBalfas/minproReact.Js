import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


export default ({ viewSouvenir,handleClose, souvenir: {code, name, m_unit_id, unitName, description},unit}) => {
    return <Fragment>
        <Dialog
            open={viewSouvenir}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"View Souvenir"}</DialogTitle>
            <DialogContent>
              
                   <form>
                    <TextField label="Souvenir Code" value={code}  margin="normal"  disabled={true}/>&nbsp;
                    <br/>
                    <TextField label="Souvenir Name" value={name}  margin="normal"  disabled={true}/>
                    <br />
                    <TextField label="Unit Name" value={unitName} margin="normal"  disabled={true}/> 
                    <br />
                    <TextField label="Description" value={description} margin="normal"  disabled={true}/>                   
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}