import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import  TextField  from '@material-ui/core/TextField';


export default ({ viewProduct, handleClose, product:{code, name, description} }) => {
    return <Fragment>

        <Dialog
            open={viewProduct}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">{"View Product"} - {name} {"("}{code}{")"}  </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" label="View Product"/>
                
                <form>
                    <TextField label="Code" value ={code}  margin='normal' disabled={true}/>
                    <br/>
                    <TextField label="Product Name" value ={name}  margin='normal' disabled={true}/>
                    <br/>
                    <TextField label="Description" value ={description}  margin='normal' disabled={true}/>
                    <br/>
                   
                    
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}  variant="contained"  color="primary">
                    Close
            </Button>
                
            </DialogActions>
        </Dialog>
    </Fragment>
}