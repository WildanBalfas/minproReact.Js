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
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';

export default ({ viewTSouvenir,handleChange,handleClose,handleSubmit,handleChangeItem, handleAddItem,m_souvenirs, m_employee, t_souvenir_stock:{code, received_by, received_date, note }, items}) => {
  
    return <Fragment> 
                <Dialog
            open={viewTSouvenir}
            onClose={handleClose}
            fullWidth
            style={{textAlign:"center"}}
        >
            <DialogTitle id="alert-dialog-title">{"Add Souvenir Stock"}</DialogTitle>
            <form>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   
                    <TextField label="Transaction Code"  value={code} margin="normal" InputLabelProps={{shrink: true}} placeholder="Auto Generated" disabled required/>
                    <br/>
                    <FormControl style={{width:200}} required>
                        <InputLabel shrink htmlFor="employee-simple" >Employee Name </InputLabel>
                        <Select
                            value={received_by}
                            onChange={handleChange('received_by')}
                            inputProps={{
                                name: 'received_by',
                                id: 'employee-simple',
                               
                            }}
                            displayEmpty
                            disabled  >
                            <MenuItem value='' disabled>
                                Select Employee Name
                            </MenuItem>
                            {m_employee.map(c => {
                                return(
                                    <MenuItem disabled value={c._id}>{c.first_name} {c.last_name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <br/>
                    {/* <DatePicker></DatePicker>
                    <br/> */}
                    <TextField style={{width:200}} label="Received Date" value={received_date} onChange={handleChange('received_date')} margin='normal' disabled />
                    <br />
                    <TextField style={{width:200}} label="Note" value={note} onChange={handleChange('note')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Note" multiline disabled/>&nbsp;
               
            </DialogContentText>
            </DialogContent>

            <DialogContent>
            <Button onClick={handleAddItem} variant="contained" color="primary" style={{float: 'left'}} disabled>Add Item</Button>
            <DialogContentText id="alert-dialog-description">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width:50}}>No</TableCell>
                        <TableCell style={{width:100}}>Souvenir Name</TableCell>
                        <TableCell >Qty</TableCell>
                        <TableCell>Note</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {items.map((n, index) => {
                            return(
                                <TableRow key={n._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={n.m_souvenir_id}
                                            onChange={handleChangeItem('m_souvenir_id', n._id)}
                                            style={{ paddingLeft: 10, paddingRight:10 }}
                                            inputProps={{
                                                name: 'm_souvenir_id',
                                                id: 'souvenir-simple',
                                            }} disabled>
                                            <MenuItem value='0' key='0' disabled>
                                                <em>Select Souvenir Name</em>
                                            </MenuItem>
                                            {m_souvenirs.map(c => {
                                                return (
                                                    <MenuItem disabled key={c._id} value={c._id}>{c.name}</MenuItem>
                                                )
                                            })}
                                            
                                        </Select>
                                    </TableCell>
                                    <TableCell><TextField   type="number" style={{width:70,  paddingLeft: 10, paddingRight:10 }}  value={n.qty } onChange={handleChangeItem('qty', n._id)} margin="normal" InputLabelProps={{shrink: true}}disabled></TextField></TableCell>
                                    <TableCell><TextField  style={{ width: 200, }} value={n.notes} onChange={handleChangeItem('notes', n._id)} margin="normal" placeholder="Note" disabled ></TextField></TableCell>
                                 </TableRow>
                            );
                        })}
                </TableBody>
            </Table>

            </DialogContentText>
            </DialogContent>
            </form>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
               
            </DialogActions>
        </Dialog>
    </Fragment>
}