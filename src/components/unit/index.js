import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Search';
import EditUnit from './edit';
import DeleteUnit from './delete';
import CreateUnit from './create';
import ViewUnit from './view';

import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


class m_unit extends React.Component {

    unitModel = 
    {
        _id: '',
        code: '',
        name: '',
        description : '',  
        is_delete : '', 
        createdDate : ''
   

    }
    constructor(props) {
        super(props);
        this.state = {
            
            m_unit: [],
            createNew: false,
            editUnit: false,
            deleteUnit: false,
            loading: true,
            viewUnit : false,
            unit: this.unitModel

        }
    }

    reloadUnitData = () => {
        axios.get(config.url + '/m-unit')
        .then(res => {
            this.setState({
                m_unit : res.data,
                createNew: false,
                editUnit: false,
                deleteUnit: false,
                unit: this.unitModel,
                loading: false
            })
        })
        .catch((error) => {
            alert(error);
        })
    }

    componentDidMout(){
        this.reloadUnitData();
    }

    //API connect to cloud
    componentDidMount() {
        axios.get(config.url + '/m-unit')
            .then(res => {
                this.setState({
                    m_unit: res.data,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    CreateUnit: true,
                })
            })
    }

    handleToggle = () => {
        this.setState({
            createNew: true,
           
        });
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editUnit: false,
            deleteUnit: false,
            viewUnit : false,
            unit: this.unitModel
            
        });
    }
    //bisa diketik
    handleChange = name => ({ target: { value } }) => {
        this.setState({
            unit: {
                ...this.state.unit,
                [name]: value
            }
        })
    }

    handleChangeCheckBox =  name => event => {
        this.setState({
            unit: {
                ...this.state.unit,
                [name]: event.target.checked
            }
        })
    }

    handleSubmit = () => {
        const { unit, createNew } = this.state;
    
        let newUnit =
        {
            code: unit.code,
            name: unit.name,
            is_delete : 0,
            description : unit.description
        }

        if(createNew){
          
            axios.post(config.url + '/m-unit', newUnit)
                .then(res => {
                    this.reloadUnitData();
                    alert('Data Saved! New unit has been added with code');
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
   
            axios.put(config.url + '/m-unit/' + unit._id , newUnit)
            .then(res => {
                this.reloadUnitData();
                alert('Unit has been updated');
            })
            .catch((error) => {
                alert(error)
            })
        }
    
        
    }
    
    handleEdit = (_id) => {
        const { m_unit } = this.state;
        const unit = m_unit.find(u => u._id === _id);
        this.setState({
            editUnit: true,
            unit: {
                _id: unit._id,
                code: unit.code,
                name: unit.name,
                is_delete : unit.is_delete,
                description: unit.description
            }
        })
    }

    handleDelete = (_id) => {
        const { m_unit } = this.state;
        const unit = m_unit.find(u => u._id === _id);
        this.setState({
            deleteUnit: true,
            unit: {
                _id: unit._id,
                code: unit.code,
                name: unit.name,
                is_delete : unit.is_delete,
                description: unit.description
            }
        })
    }

    handleView = (_id) => {
        const { m_unit } = this.state;
        const unit = m_unit.find(u => u._id === _id);
        this.setState({
            viewUnit: true,
            unit: {
                _id: unit._id,
                code: unit.code,
                name: unit.name,
                is_delete : unit.is_delete,
                description: unit.description
            }
        })
    }

    handleDeleteConfirm = () => {
        const { unit } = this.state;
        let delProp = {
            is_delete: unit.is_delete + 1,
        }
        
        axios.put(config.url + '/m-unit/' + unit._id, delProp)
        .then(res =>{
            this.reloadUnitData();
            alert('has been deleted');
        })
        .catch((error) => {
            alert(error);
        })
        
    }


    render() {
        const {m_unit, loading} = this.state;
        console.log(m_unit);
        const {classes} = this.props;
        return (
            <div>
                <h3><center>List of Unit</center></h3>
                <CreateUnit createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox = {this.handleChangeCheckBox} unit = {this.state.unit} />
                <EditUnit editUnit={this.state.editUnit} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox = {this.handleChangeCheckBox} unit = {this.state.unit} />
                <DeleteUnit deleteUnit={this.state.deleteUnit} handleClose={this.handleClose} handleDeleteConfirm={this.handleDeleteConfirm} handleChangeCheckBox = {this.handleChangeCheckBox} unit={this.state.unit} handleChange = {this.handleChange} />
                <ViewUnit viewUnit={this.state.viewUnit} handleClose={this.handleClose} unit={this.state.unit} />
                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Unit Code</TableCell>
                            <TableCell>Unit Name</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Create By</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {m_unit.map(n => {
                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {n.code}
                                    </TableCell>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>{n.createDate}</TableCell>
                                    <TableCell>{n.createBy}</TableCell>
                                    <TableCell>
                                    <IconButton><EditIcon onClick={() => this.handleEdit(n._id)}/></IconButton>
                                    <IconButton><DeleteIcon onClick={() => this.handleDelete(n._id)} /></IconButton> 
                                    <IconButton><ViewIcon onClick={() => this.handleView(n._id)} /></IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
    },
});

m_unit.PropTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(m_unit);