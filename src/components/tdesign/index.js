
import React from 'react';
import axios from 'axios';
import { config } from '../configuration/config';
import LSData from '../base/base.localstorage';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';

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

// From Local Dir
import CreateTDesign from './create';
import EditTDesign from './edit';
import ViewTDesign from './view';
import DeviceSignalCellular0Bar from 'material-ui/SvgIcon';

// Base Function
import { changeValue, changeDateFormat } from '../system/base.function';

class Users extends React.Component {

    idx = 0;
    tDesignModel = {
        id: '',
        code: '',
        tEventId: '',
        titleHeader: '',
        requestBy: '',
        requestDate: '',
        approvedBy: '',
        approvedDate: '',
        assignTo: '',
        closeDate: '',
        note: '',
        status: '',
        rejectReason: '',
        isDelete: '',
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: '',
        assignToFirstName: '',
        assignToLastName: '',
        createdByUserName: '',
        mProductId: '',
        mProductDescription:'',
        tEventCode:''
    };

    tDesignItemModel = {
        tDesignId: '',
        mProductId: '',
        mProductDescription:'',
        titleItem: '',
        requestPic: '',
        startDate: '',
        endDate: '',
        requestDueDate: '',
        inote: '',
        isDelete: '',
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            tDesigns: [],
            items: [], // add to table
            tItems: [],
            products: [],
            events: [],
            employees: [],
            tItemsByID: [],
            tDesign: this.tDesignModel,
            tDesignItem: this.tDesignItemModel,
            createNew: false,
            editTDesign: false,
            createNew: false,
            editUser: false,
            deleteUser: false,
            load: true,
            categories: [
                { _id: 1, name: 'Category One' },
                { _id: 2, name: 'Category Two' },
                { _id: 3, name: 'Category Three' },
                { _id: 4, name: 'Category Four' },
            ]
        }
    }

    componentDidMount(objID = null) {
        this.reloadData('tDesigns', '/t-design-aggregation');
        this.reloadData('tItems', '/t-design-items');
        this.reloadData('products', '/m-product');
        this.reloadData('events', '/t-event');
        this.reloadData('employees', '/m-employee');
        
        if(objID){
            this.reloadData('tItemsByID', '/t-design-by-id/'+ objID);
        }
    }

    reloadData = (state, url) => {
        axios.get(config.url + url)
            .then(res => {
                this.setState({
                    [state]: res.data,
                    createNew: false,
                    editTDesign: false,
                    deleteTDesign: false,
                    viewTDesign: false,
                    tDesign: this.tDesignModel,
                    tDesignItem: this.tDesignItemModel,
                    load: false,
                })
            })
            .catch((error) => {
                alert(error);
            });
    }

    handleToggle = () => {
        this.setState({
            createNew: true,
            tDesign: this.tDesignModel
        })
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editTDesign: false,
            viewTDesign: false,
            deleteTDesign: false,
            items: []
        })
    }

    handleSubmit = () => {
        const { tDesign, items, createNew } = this.state;
        let newDesign = {
            t_event_id: tDesign.tEventId,
            title_header: tDesign.titleHeader,
            note: tDesign.note,
        }
        let objItem = [];

        if (createNew) {
            axios.post(config.url + '/t-design', newDesign)
                .then(res => {
                    let designId = res.data.insertedIds;
                    let objToString = designId[0];
                    for (let key in items) {
                        let item = items[key];
                        let newItem = {
                            m_product_id: item.mProductId,
                            t_design_id: objToString.toString(),
                            title_item: item.titleItem,
                            request_due_date: item.requestDueDate,
                            note: item.inote,
                            request_pic: item.requestPic,
                            created_by: LSData.loginId(),
                        }
                        objItem.push(newItem);
                    }
                    axios.post(config.url + '/t-design-item', objItem)
                        .then(res => {
                            this.reloadData('tDesign', '/t-design');
                        }).catch((error) => {
                            alert(error);
                        })

                })
                .catch((error) => {
                    alert(error);
                })
        }
        // else {
        //     axios.put(config.url + '/m-user/' + user._id, newUser)
        //         .then(res => {
        //             this.reloadData('users', '/user-aggregation');
        //         });
        // }
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            tDesign: {
                ...this.state.tDesign,
                [name]: value
            },
        })
    }

    handleChangeSelectItems = (name, id) => ({ target: { value } }) => {
        const { items } = this.state;
        var item = items.find(o => o.id === id);
        item[name] = value;
        this.setState({
            items: items
        })
    }

    handleEdit = (_id) => {
        let newTitems = [];
        let dataTitems = [];
        // this.componentDidMount(_id);
        const { tDesigns, tItems } = this.state;
        const design = tDesigns.find(u => u._id === _id);
        
        for(let key in tItems){
            if(tItems[key].t_design_id == _id){
                newTitems.push(tItems[key]);
            }
        }
        for (let key in newTitems) {
            let objTITems = {
                id:newTitems[key]._id,
                tDesignId: newTitems[key].t_design_id,
                mProductId:newTitems[key].m_product_id,
                titleItem: newTitems[key].title_item,
                requestPic: newTitems[key].request_pic,
                startDate: newTitems[key].start_date,
                endDate: newTitems[key].end_date,
                requestDueDate: newTitems[key].request_due_date,
                inote: newTitems[key].note,
                isDelete: newTitems[key].is_delete,
                createdBy: newTitems[key].created_by,
                createdDate: newTitems[key].createdDate,
                updatedBy: newTitems[key].updated_by,
                updatedDate: newTitems[key].updateDate,
            }

            dataTitems.push(objTITems);
        }

        this.setState({
            editTDesign: true,
            tDesign: {
                code: design.code,
                tEventId: design.t_event_id,
                tEventCode: design.tEventCode,
                titleHeader: design.title_header,
                status: design.status,
                requestBy: design.request_by,
                requestDate: design.request_date,
                note: design.note
            },
            items: dataTitems,
        })
    }

    handleDelete = (_id) => {
        //     const { users } = this.state;
        //     const user = users.find(u => u._id === _id);
        //     this.setState({
        //         deleteUser: true,
        //         user: {
        //             _id: user._id
        //         }
        //     })
    }

    // reloadTItemByID = (objID) => {
    //     axios.get(config.url + '/t-design-by-id/'+ objID)
    //         .then(res => {
    //             console.log(res.data);
    //             // this.setState({
    //             //     [state]: res.data,
    //             //     createNew: false,
    //             //     editTDesign: false,
    //             //     deleteTDesign: false,
    //             //     viewTDesign: false,
    //             //     tDesign: this.tDesignModel,
    //             //     tDesignItem: this.tDesignItemModel,
    //             //     load: false,
    //             // })
    //         })
    //         .catch((error) => {
    //             alert(error);
    //         });
    // }

    handleView = (_id) => {
        let newTitems = [];
        let dataTitems = [];
        // this.componentDidMount(_id);
        const { tDesigns, tItems } = this.state;
        const design = tDesigns.find(u => u._id === _id);
        console.log(tItems);
        
        for(let key in tItems){
            if(tItems[key].t_design_id == _id){
                newTitems.push(tItems[key]);
            }
        }

        console.log(newTitems);
        for (let key in newTitems) {
            let objTITems = {
                id:newTitems[key]._id,
                tDesignId: newTitems[key].t_design_id,
                mProductId:newTitems[key].m_product_id,
                mProductDescription:newTitems[key].mProductDescription,
                titleItem: newTitems[key].title_item,
                requestPic: newTitems[key].request_pic,
                startDate: newTitems[key].start_date,
                endDate: newTitems[key].end_date,
                requestDueDate: newTitems[key].request_due_date,
                inote: newTitems[key].note,
                isDelete: newTitems[key].is_delete,
                createdBy: newTitems[key].created_by,
                createdDate: newTitems[key].createdDate,
                updatedBy: newTitems[key].updated_by,
                updatedDate: newTitems[key].updateDate,
            }

            dataTitems.push(objTITems);
        }

        this.setState({
            viewTDesign: true,
            tDesign: {
                code: design.code,
                tEventId: design.t_event_id,
                tEventCode: design.tEventCode,
                titleHeader: design.title_header,
                status: design.status,
                requestBy: design.request_by,
                requestDate: design.request_date,
                note: design.note
            },
            items: dataTitems,
        })
    }

    // handleDeleteConfirm = (_id) => {
    //     axios.delete(config.url + '/m-user/' + _id)
    //         .then(res => {
    //             this.reloadData('users', '/user-aggregation');
    //         })
    //         .catch((error) => {
    //             alert('Error');
    //         })
    // }

    addNewItem = () => {
        let items = this.state.items;
        let _id = this.idx + 1;
        this.idx = this.idx + 1;
        var newOrder = {
            id: _id,
            tDesignId: '',
            mProductId: '',
            mProductDescription:'',
            titleItem: '',
            requestPic: '',
            startDate: '',
            endDate: '',
            requestDueDate: '',
            inote: '',
            isDelete: '',
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: '',
        };
        items.push(newOrder);
        this.setState({
            items: items
        });
    }

    handleRemove = (_id) => {
        const { items } = this.state;
        const selectIdx = items.findIndex(u => u._id === _id);
        items.splice(selectIdx, 1);
        this.setState({
            items: items
        })
    }

    getProductDescription = (_id) => {
        const { products } = this.state;
        if(_id){
            const index = products.findIndex(i => i._id === _id);
            return products[index].description;
        }
    }


    render() {
        const { tDesigns } = this.state;
        let i = 1;
        return (
            <div>
                <CreateTDesign
                    createNew={this.state.createNew}
                    handleToggle={this.handleToggle}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleChangeSelectItems={this.handleChangeSelectItems}
                    addNewItem={this.addNewItem}
                    tDesign={this.state.tDesign}
                    tDesignItem={this.state.tDesignItem}
                    items={this.state.items}
                    products={this.state.products}
                    events={this.state.events}
                    getProductDescription={this.getProductDescription}
                />
                <EditTDesign
                    editTDesign={this.state.editTDesign}
                    handleToggle={this.handleToggle}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleChangeSelectItems={this.handleChangeSelectItems}
                    addNewItem={this.addNewItem}
                    tDesign={this.state.tDesign}
                    tDesignItem={this.state.tDesignItem}
                    items={this.state.items}
                    products={this.state.products}
                    events={this.state.events}
                    employees={this.state.employees}
                />
                <ViewTDesign
                    viewTDesign={this.state.viewTDesign}
                    handleToggle={this.handleToggle}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    handleChangeSelectItems={this.handleChangeSelectItems}
                    addNewItem={this.addNewItem}
                    tDesign={this.state.tDesign}
                    tDesignItem={this.state.tDesignItem}
                    items={this.state.items}
                    products={this.state.products}
                    events={this.state.events}
                    employees={this.state.employees}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>No</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Transaction Code</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Request By</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Request Date</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Asign To</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Status</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Created Date</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Created By</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tDesigns.map(tDesign => {
                            return (
                                <TableRow key={tDesign._id}>
                                    <TableCell>{i++}</TableCell>
                                    <TableCell>{tDesign.code}</TableCell>
                                    <TableCell>{tDesign.requestFirstName + ' ' + tDesign.requestLastName}</TableCell>
                                    <TableCell>{tDesign.request_date}</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>
                                        {tDesign.assignToFirstName ? tDesign.assignToFirstName : '-' ? 
                                         tDesign.assignToLastName ? tDesign.assignToLastName : '-' : ' - '}</TableCell>
                                    <TableCell>{changeValue(tDesign.status)}</TableCell>
                                    <TableCell>{changeDateFormat(tDesign.createDate)}</TableCell>
                                    <TableCell>{tDesign.createdByUsername}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <IconButton onClick={() => this.handleView(tDesign._id)}><SearchIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => this.handleEdit(tDesign._id)}><EditIcon color="primary" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {/* <Dialog open={this.state.deleteUser} onClose={this.handleClose} style={{textAlign:'center'}}>
                <DialogContent>
                    <DialogContentText>
                        Delete Data?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} variant="contained" color="secondary" >Cancel</Button>
                    <Button onClick={() => this.handleDeleteConfirm(deleteUser._id)} variant="contained" color="primary" autoFocus>Save</Button>
                </DialogActions>
            </Dialog> */}
            </div>
        )
    }
}

export default Users;