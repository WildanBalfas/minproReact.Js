import React, { Fragment } from 'react';

// Material UI
import {
    Dialog,
    DialogActions,
    Button,
    TextField,
    DialogContent,
    InputLabel,
    DialogContentText,
    Select, MenuItem,
    FormControl
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default (
    {
        createNew,
        handleToggle,
        handleClose,
        handleSubmit,
        handleChange,
        handleChangeSelectItems,
        handleRemove,
        addNewItem,
        getProductDescription,
        tDesign: {
            code,
            tEventId,
            titleHeader,
            requestBy,
            requestDate,
            note,
        },
        tDesignItem: {
            tDesignId,
            mProductId,
            titleItem,
            requestPic,
            startDate,
            endDate,
            requestDueDate,
            inote,
            isDelete,
            createdBy,
            createdDate,
            updatedBy,
            updatedDate,
        },
        items,
        products,
        events
    }) => {
    return (
        
        <Fragment>
            <Button onClick={handleToggle} variant="contained" color="primary" style={{ float: 'right' }}>Add</Button>
            <Dialog open={createNew} onClose={handleClose} fullScreen>
                <div className="div-dialog-header">Add Design Request</div>
                <DialogContent>
                    <DialogContentText className="border">
                        <form>
                            <div className="div50">
                                <div className="dialog-content-kiri pdt16">
                                    <TextField className="input-text" label="Transaction Code" margin='normal' disabled required />
                                    <div className="clear-selected">
                                    <FormControl fullWidth="true">
                                        <InputLabel shrink htmlFor="unit-simple" required>Event Code</InputLabel>
                                        <Select
                                            value={tEventId}
                                            onChange={handleChange('tEventId')}
                                            inputProps={{
                                                name: 'tEventId',
                                                id: 'unit-simple',
                                            }}
                                        >
                                            <MenuItem value={tEventId}><em>-Select Role Name-</em> </MenuItem>
                                            {events.map(event => {
                                                return(
                                                    <MenuItem value={event._id}>{event.code}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    </div>
                                    <TextField className="input-text" label="Design Title" value={titleHeader} margin='normal' onChange={handleChange('titleHeader')} required />
                                </div>

                                <div className="dialog-content-kanan">
                                    <TextField className="input-text" label="Request By" value={requestBy} margin='normal' disabled required />
                                    <br />
                                    <TextField className="input-text" label="Request Date" value={requestDate} margin='normal' disabled required />
                                    <br />
                                    <div className="clear"/>
                                    <TextField className="input-text" label="Note" value={note} onChange={handleChange('note')} />
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                    <div className="clear" />
                    <DialogContentText className="border">
                        <Button onClick={addNewItem} variant="contained" color="secondary" >Add Item</Button>
                        <div className="div-table">
                            {items.length != 0 ?
                                <div className="div-table-row">
                                    <div className="div-table-column title wdth15">Product Name</div>
                                    <div className="div-table-column title">Product Description</div>
                                    <div className="div-table-column title">Title</div>
                                    <div className="div-table-column title">Request PIC</div>
                                    <div className="div-table-column title wdth12">Due Date</div>
                                    <div className="div-table-column title wdth12">Start Date</div>
                                    <div className="div-table-column title wdth12">End Date</div>
                                    <div className="div-table-column title">Note</div>
                                </div>
                                : ''}
                            {items.map((n, index) => {
                                return (
                                    <div className="div-table-row" key={n.id}>
                                        <div className="div-table-column wdth15">
                                            <div className="mgpd">
                                                <FormControl fullWidth="true">
                                                    <Select
                                                        value={n.mProductId}
                                                        onChange={handleChangeSelectItems('mProductId', n.id)}
                                                        inputProps={{
                                                            name: 'mProductId',
                                                            id: 'unit-simple',
                                                        }}
                                                    >
                                                        <MenuItem key={n.mProductId} value={n.mProductId}><em>-Select Product Name-</em> </MenuItem>
                                                        {products.map(product => {
                                                            return (
                                                                <MenuItem value={product._id}>{product.name}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="div-table-column">
                                            <TextField value={getProductDescription(n.mProductId)} margin="normal"  disabled />
                                        </div>
                                        <div className="div-table-column">
                                            <TextField value={n.titleItem} onChange={handleChangeSelectItems('titleItem', n.id)} margin="normal" />
                                        </div>
                                        <div className="div-table-column">
                                            <TextField value={n.requestPic} onChange={handleChangeSelectItems('requestPic', n.id)} margin="normal" />
                                        </div>
                                        <div className="div-table-column wdth12">
                                            <div className="mgpd">
                                                <TextField type="date" value={n.requestDueDate} onChange={handleChangeSelectItems('requestDueDate',  n.id)} defaultValue="2017-05-24" InputLabelProps={{ shrink: true, }} />
                                            </div>
                                        </div>
                                        <div className="div-table-column wdth12">
                                            <div className="mgpd">
                                                <TextField type="date" defaultValue="2017-05-24" InputLabelProps={{ shrink: true, }} disabled />
                                            </div>
                                        </div>
                                        <div className="div-table-column wdth12">
                                            <div className="mgpd">
                                                <TextField type="date" defaultValue="2017-05-24" InputLabelProps={{ shrink: true, }} disabled />
                                            </div>
                                        </div>
                                        <div className="div-table-column">
                                            <TextField value={n.inote} onChange={handleChangeSelectItems('inote', n.id)} margin="normal" />
                                        </div>
                                        <div className="div-table-column center wdth5">
                                        <IconButton onClick=""><EditIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => handleRemove(n._id)}><DeleteIcon color="secondary" /></IconButton>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary" >Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" autoFocus>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
