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

// Base Function
import { changeValue, changeDateFormat } from '../system/base.function';

export default (
    {
        viewTDesignInProgress,
        handleToggle,
        handleClose,
        handleSubmit,
        handleChange,
        handleCloseRequest,
        handleChangeSelectItems,
        addNewItem,
        tDesign: {
            code,
            tEventId,
            titleHeader,
            requestBy,
            requestDate,
            note,
            assignTo, 
            status,
            tEventCode
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
        events,
        employees,
    }) => {
    return (
        <Fragment>
            <Dialog open={viewTDesignInProgress} onClose={handleClose} fullScreen>
                <div className="div-dialog-header">Approval Design Request</div>
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
                                                disabled
                                            >
                                                <MenuItem value={tEventId}>{tEventCode}</MenuItem>
                                                {events.map(event => {
                                                    return (
                                                        <MenuItem value={event._id}>{event.code}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <TextField className="input-text" label="Design Title" value={titleHeader} margin='normal' disabled required />
                                    <TextField className="input-text" label="Status" value={changeValue(status)} margin='normal'  disabled required />
                                    <div className="clear-selected">
                                        <FormControl fullWidth="true">
                                            <InputLabel shrink htmlFor="unit-simple" required>Assign To</InputLabel>
                                            <Select
                                                value={assignTo}
                                                inputProps={{
                                                    name: 'assignTo',
                                                    id: 'unit-simple',
                                                }}
                                            >
                                                <MenuItem value={assignTo}><em>-Select Employee-</em> </MenuItem>
                                                {employees.map(employee => {
                                                    return (
                                                        <MenuItem value={employee._id}>
                                                            {employee.first_name + ' ' + (employee.last_name ? employee.last_name : '')}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="dialog-content-kanan">
                                    <TextField className="input-text" label="Request By" value={requestBy} margin='normal' disabled required />
                                    <br />
                                    <TextField className="input-text" label="Request Date" value={requestDate} margin='normal' disabled required />
                                    <br />
                                    <div className="clear" />
                                    <TextField className="input-text" label="Note" value={note} disabled />
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                    <div className="clear" />
                    <DialogContentText className="border">
                        <div className="div-table">
                            {items.length != 0 ?
                                <div className="div-table-row">
                                    <div className="div-table-column title wdth15">Product Name</div>
                                    <div className="div-table-column title wdth15">Product Description</div>
                                    <div className="div-table-column title">Title</div>
                                    <div className="div-table-column title">Request PIC</div>
                                    <div className="div-table-column title wdth12">Due Date</div>
                                    <div className="div-table-column title wdth12">Start Date</div>
                                    <div className="div-table-column title wdth12">End Date</div>
                                    <div className="div-table-column title wdth12">Note</div>
                                </div>
                                : 'No Item Selected'}
                            {items.map((n, index) => {
                                return (
                                    <div className="div-table-row" key={n.id}>
                                        <div className="div-table-column wdth15">
                                            <div className="mgpd">
                                                <FormControl fullWidth="true">
                                                    <Select
                                                        value={n.mProductId}
                                                        inputProps={{
                                                            name: 'mProductId',
                                                            id: 'unit-simple',
                                                        }}
                                                        disabled
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
                                        <div className="div-table-column wdth15">
                                            <TextField value='' margin="normal"  disabled />
                                        </div>
                                        <div className="div-table-column">
                                            <TextField value={n.titleItem} margin="normal" disabled />
                                        </div>
                                        <div className="div-table-column">
                                            <TextField value={n.requestPic} margin="normal" disabled />
                                        </div>
                                        <div className="div-table-column wdth12">
                                            <div className="mgpd">
                                                <TextField type="date" value={changeDateFormat(n.requestDueDate)} disabled defaultValue="2018-08-24" InputLabelProps={{ shrink: true, }} />
                                            </div>
                                        </div>
                                        <div className="div-table-column wdth12">
                                            <div className="mgpd">
                                                <TextField type="date" defaultValue="2018-08-24" InputLabelProps={{ shrink: true, }} disabled />
                                            </div>
                                        </div>
                                        <div className="div-table-column wdth12">
                                            <div className="mgpd">
                                                <TextField type="date" defaultValue="2018-08-24" InputLabelProps={{ shrink: true, }} disabled />
                                            </div>
                                        </div>
                                        <div className="div-table-column wdth12">
                                            <TextField value={n.inote} margin="normal" disabled />
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="secondary" >Cancel</Button>
                    <Button onClick={handleCloseRequest} variant="contained" color="primary" autoFocus>Close Request</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
