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
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default ({ validator, createNew,handleToggle,handleChange,handleRemove, handleClose,handleSubmit,handleChangeItem, handleAddItem,m_souvenirs, m_employee, t_souvenir_stock:{received_by, received_date, note }, errorsT:{received_byErr, received_dateErr, noteErr}, items,handleCloseRemove, deleteConfirm, handleDeleteConfirm, handleDis}) => {
    return <Fragment>
        <Button onClick={handleToggle} variant="contained" color="primary" style={{float: 'right'}}>Add</Button>
        <Dialog
            open={createNew}
            onClose={handleClose}
            fullWidth
            style={{textAlign:"center"}}
        >
            <DialogTitle id="alert-dialog-title">{"Add Souvenir Stock"}</DialogTitle>
            <form>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   
                    <TextField label="Transaction Code"  margin="normal" InputLabelProps={{shrink: true}} placeholder="Auto Generated" disabled required/>
                    <br/>
                    <FormControl style={{width:200}} required>
                        <InputLabel shrink htmlFor="employee-simple"  >Employee Name </InputLabel>
                        <Select
                            value={received_by}
                            onChange={handleChange('received_by')}
                            inputProps={{
                                name: 'received_by',
                                id: 'employee-simple',
                               
                            }}
                            error={received_byErr == 0 ? false : true } 
                            displayEmpty
                        >
                            <MenuItem value='' disabled>
                                Select Employee Name
                            </MenuItem>
                            {m_employee.map(c => {
                                return(
                                    <MenuItem value={c._id}>{c.first_name} {c.last_name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <br/>
                    {/* <DatePicker></DatePicker>
                    <br/> */}
                    <TextField type='date' style={{width:200}} label={received_dateErr == 0 ? "Received Date" : received_dateErr } value={received_date} onChange={handleChange('received_date')} margin='normal'error={received_dateErr == 0 ? false : true } InputLabelProps={{shrink: true}}  />
                    <br />
                    <TextField style={{width:200}} label={noteErr == 0 ? "Note" : noteErr } value={note} onChange={handleChange('note')} margin="normal" InputLabelProps={{shrink: true}} placeholder="Type Note" multiline InputLabelProps={{shrink: true}} error={noteErr == 0 ? false : true }  />&nbsp;
               
            </DialogContentText>
            </DialogContent>

            <DialogContent>
            <Button onClick={handleAddItem} variant="contained" color="primary" style={{float: 'left'}}>Add Item</Button>
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
                                            }}
                                            disabled={n.dis % 2 == 0 ? false : true}
                                            >
                                            <MenuItem value='0' key='0' disabled>
                                                <em>Select Souvenir Name</em>
                                            </MenuItem>
                                            {/* {validator.message('m_souvenir_id', n.m_souvenir_id , 'required', 'text-danger')} */}
                                            {m_souvenirs.map(c => {
                                                return (
                                                    <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                                                )
                                            })}
                                            
                                        </Select>
                                    </TableCell>
                                    <TableCell><TextField   type="number" style={{width:50,  paddingLeft: 10, paddingRight:10 }}  value={n.qty } onChange={handleChangeItem('qty', n._id)} margin="normal" InputLabelProps={{shrink: true}} disabled={n.dis % 2 == 0 ? false : true}></TextField></TableCell>
                                    <TableCell>
                                    {/* {validator.message('notes', n.notes , 'required|alpha')} */}
                                        <TextField  style={{ width: 200, }} value={n.notes} onChange={handleChangeItem('notes', n._id)} margin="normal" placeholder="Note" disabled={n.dis % 2 == 0 ? false : true}></TextField>
                                        </TableCell>
                                    <TableCell>
                                    <IconButton onClick={() => handleDis(n.dis, n._id)}><IconEdit color="primary" /></IconButton>
                                    <IconButton onClick={() => handleDeleteConfirm(n._id)}><IconDelete color="secondary" /></IconButton></TableCell>
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
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    Save
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog open={deleteConfirm} onClose=''>
                <DialogContent>
                    <DialogContentText>Delete Item?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRemove}variant="contained" color="primary" autoFocus>Delete</Button>
                    <Button onClick={handleCloseRemove} variant="contained" color="secondary" >Cancel</Button>
                </DialogActions>
            </Dialog>
    </Fragment>
}