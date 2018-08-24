import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import  TextField  from '@material-ui/core/TextField';


export default ({ editProduct,handleSubmit, handleChange, handleClose, product:{code, name, description} }) => {
    return <Fragment>

        <Dialog
            open={editProduct}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"View Product"}- {name} ({code})</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" label="View Product"/>
                    
            
                <form>
                    <TextField label="Code" value ={code}  margin='normal' disabled={true}/>
                    <br/>
                    <TextField label="Name" value={name} onChange={handleChange('name')} margin='normal' />
                    <br />
                    <TextField label="Description" value={description} onChange={handleChange('description')} margin='normal' />
                    <br />
                    
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleSubmit}  variant="contained"  color="primary">
                    Update
            </Button>
                <Button onClick={handleClose}  variant="contained"  color="secondary">
                    Close
            </Button>
                
            </DialogActions>
        </Dialog>
    </Fragment>
}