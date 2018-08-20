import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconSeacrh from '@material-ui/icons/Search';

import AddSouvenir from './create';
import ViewSouvenir from './view';
import EditSouvenir from './edit';

import { config } from '../configuration/config';
import axios from 'axios';

class T_Souvenir extends React.Component {

    transactionModel = { _id:"", code: "", received_by: "", received_date: "", note: "", EmployeeFirstName: "", EmployeeLastName: "", items: [] }
    idx = 0
    constructor(props) {
        super(props);
        this.state = {
            t_souvenirs_stock: [],
            items: [],
            item: {},
            t_souvenir_stock: {},
            m_souvenirs: [],
            m_employee: [],
            tItems: [],
            t_souvenir: this.transactionModel,
            m_souvenir: {},
            createNew: false,
            editTSouvenir:false,
            viewTSouvenir: false,
            load: true

        }
    }

    reloadTSouvenirData = () => {
        axios.get(config.url + '/t_souvenir_stock')
            .then(res => {
                this.setState({
                    t_souvenirs_stock: res.data,
                    createNew: false,
                    load: false,
                })
            })
            .catch((error) => {
                alert(error);
            })
    }

    reloadTSouvenirDataItems = () => {
        axios.get(config.url + '/t_souvenir_item')
            .then(res => {
                this.setState({
                    tItems: res.data,
                    createNew: false,
                    viewTSouvenir: false,
                    load: false,
                })
            })
            .catch((error) => {
                alert(error);
            })
    }
    reloadMSouvenirData = () => {
        axios.get(config.url + '/m-souvenir')
            .then(res => {
                this.setState({
                    m_souvenirs: res.data,
                })
            })
            .catch((error) => {
                alert(error);
            })

    }

    reloadMEmployeeData = () => {
        axios.get(config.url + '/m-employee')
            .then(res => {
                this.setState({
                    m_employee: res.data,
                })
            })
            .catch((error) => {
                alert(error);
            })

    }

    componentDidMount() {
        this.reloadTSouvenirData();
        this.reloadMEmployeeData();
        this.reloadMSouvenirData();
        this.reloadTSouvenirDataItems();

    }
    handleToggle = () => {
        this.setState({
            createNew: true,
            
            t_souvenir_stock: this.transactionModel,

        })
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            t_souvenir_stock: {
                ...this.state.t_souvenir_stock,
                [name]: value
            }
        })
    }

    handleChangeItem = (shit, _id) => ({ target: { value } }) => {
        const { items } = this.state;
        var item = items.find(o => o._id === _id);
        item[shit] = value;
        this.setState({
            items: items
        })
        // console.log(items);

    }

    handleClose = () => {
        this.setState({
            createNew: false,
            viewTSouvenir:false,
            editTSouvenir:false,
            items : [],
            // editProduct: false,
            // viewProduct: false,
            // deleteProduct: false,
            t_souvenir_stock: this.transactionModel,

        })
    }

    handleAddItem = () => {
        let items = this.state.items;
        let _id = this.idx + 1;

        this.idx = this.idx + 1;
        var newItems = {
            _id: _id,
            m_souvenir_id: '',
            qty: 0,
            note: '',

        };
        //newOrder._id = _id;

        items.push(newItems);
        this.setState({
            items: items


        });


    }

    handleSubmit = () => {
        const { items, t_souvenir_stock, createNew } = this.state
        let arr = [];
        let newStock = {

            received_by: t_souvenir_stock.received_by,
            received_date: t_souvenir_stock.received_date,
            note: t_souvenir_stock.note,
            type:'addtional'
        }

        arr.push(newStock, items)

        if (createNew) {
            axios.post(config.url + '/add_souvenir_stock', arr)
                .then(res => {
                    this.reloadTSouvenirData();
                    alert('has been saved ' + res.data.ops[0].code);
                    // console.log(res.data);


                })
                .catch((error) => {
                    alert(error);
                })
        } else {
            axios.put(config.url + '/update_souvenir_stock/' + t_souvenir_stock._id, arr)
            // console.log(config.url + '/update_souvenir_stock/' + t_souvenir_stock._id, arr)
            .then(res => {
                // this.reloadTSouvenirData();
                // alert('has been saved ' + res.data.ops[0].code);
                // console.log(res.data);


            })
            // .catch((error) => {
            //     alert(error);
            // })
        }

    }
    handleEdit = (_id) => {
        let newTitems = [];
        let dataTitems = [];
        // this.componentDidMount(_id);
        const { t_souvenirs_stock, tItems } = this.state;
        const t_souvenir_stock = t_souvenirs_stock.find(u => u._id === _id);
        // console.log(t_souvenir_stock);
        // console.log(_id);

        for (let key in tItems) {
            if (tItems[key].t_souvenir_id == _id) {
                // console.log(tItems[key]);
                newTitems.push(tItems[key]);
            }
        }

        console.log(newTitems);
        for (let key in newTitems) {
            let obj = {
                _id: newTitems[key]._id,
                t_souvenir_id: newTitems[key].t_souvenir_id,
                m_souvenir_id: newTitems[key].m_souvenir_id,
                qty:newTitems[key].qty,
                notes: newTitems[key].notes,

            }

            dataTitems.push(obj);
        }
        
        this.setState({
            editTSouvenir: true,
            t_souvenir_stock: {
                _id:t_souvenir_stock._id,
                code: t_souvenir_stock.code,
                received_by: t_souvenir_stock.received_by,
                received_date: t_souvenir_stock.received_date,
                note: t_souvenir_stock.note,
            },

            items: dataTitems,

        })

    }

    handleView = (_id) => {
        let newTitems = [];
        let dataTitems = [];
        // this.componentDidMount(_id);
        const { t_souvenirs_stock, tItems } = this.state;
        const t_souvenir_stock = t_souvenirs_stock.find(u => u._id === _id);
        console.log(t_souvenir_stock);
        // console.log(_id);

        for (let key in tItems) {
            if (tItems[key].t_souvenir_id == _id) {
                // console.log(tItems[key]);
                newTitems.push(tItems[key]);
            }
        }

        console.log(newTitems);
        for (let key in newTitems) {
            let obj = {
                id: newTitems[key]._id,
                t_souvenir_id: newTitems[key].t_souvenir_id,
                m_souvenir_id: newTitems[key].m_souvenir_id,
                qty:newTitems[key].qty,
                notes: newTitems[key].notes,

            }

            dataTitems.push(obj);
        }
        
        this.setState({
            viewTSouvenir: true,
            t_souvenir_stock: {
                code: t_souvenir_stock.code,
                received_by: t_souvenir_stock.received_by,
                received_date: t_souvenir_stock.received_date,
                note: t_souvenir_stock.note,
            },

            items: dataTitems,

        })

    }


    render() {
        const { t_souvenirs_stock, load } = this.state;
        const { classes } = this.props;

        let i = 1;
        return (

            <div>
                <h3>List Of Transaksi Souvenir Stock</h3>
                <AddSouvenir createNew={this.state.createNew} handleAddItem={this.handleAddItem} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} t_souvenir_stock={this.state.t_souvenir_stock} handleSubmit={this.handleSubmit} items={this.state.items} m_employee={this.state.m_employee} m_souvenirs={this.state.m_souvenirs} item={this.state.item} handleChangeItem={this.handleChangeItem} />

                <ViewSouvenir viewTSouvenir={this.state.viewTSouvenir} handleAddItem={this.handleAddItem} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} t_souvenir_stock={this.state.t_souvenir_stock} handleSubmit={this.handleSubmit}  m_employee={this.state.m_employee} m_souvenirs={this.state.m_souvenirs} items={this.state.items} handleChangeItem={this.handleChangeItem} />

               <EditSouvenir editTSouvenir={this.state.editTSouvenir} handleAddItem={this.handleAddItem} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} t_souvenir_stock={this.state.t_souvenir_stock} handleSubmit={this.handleSubmit}  m_employee={this.state.m_employee} m_souvenirs={this.state.m_souvenirs} items={this.state.items} handleChangeItem={this.handleChangeItem} />


                <CircularProgress className={classes.progress} style={{ visibility: (load ? 'visible' : 'hidden') }} color="secondary" />


                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bolder", color: "black" }}>No</TableCell>
                            <TableCell style={{ fontWeight: "bolder", color: "black" }}>Transaction Code</TableCell>
                            <TableCell style={{ fontWeight: "bolder", color: "black" }}>Recieved By</TableCell>

                            <TableCell style={{ fontWeight: "bolder", color: "black" }}>Create By</TableCell>
                            <TableCell style={{ fontWeight: "bolder", color: "black" }}>Create Date</TableCell>
                            <TableCell style={{ fontWeight: "bolder", color: "black", textAlign: 'center' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {t_souvenirs_stock.map(n => {
                            return (
                                <TableRow key={n._id}>
                                    <TableCell>{i++}</TableCell>
                                    <TableCell>{n.code}</TableCell>
                                    <TableCell>{n.EmployeeFirstName} {n.EmployeeLastName}</TableCell>

                                    <TableCell>{n.recieved_date}</TableCell>
                                    <TableCell>{n.createDate}</TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>

                                        <IconButton onClick={() => this.handleView(n._id)} ><IconSeacrh variant="contained" color="default" >Search</IconSeacrh></IconButton>
                                        <IconButton onClick={() => this.handleEdit(n._id)}> <IconEdit variant="contained" color="primary" >Edit</IconEdit></IconButton>



                                    </TableCell>

                                </TableRow>
                            );
                        })

                        }

                    </TableBody>


                </Table>
            </div>
        )
    }
}

const styles = theme => ({
    progress: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        left: '50%',
        alignItem: 'center',
    },
});
T_Souvenir.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(T_Souvenir);