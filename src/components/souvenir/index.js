import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CreateSouvenir from './create';
import EditSouvenir from './edit';
import DeleteSouvenir from './delete';
import ViewSouvenir from './view';
import { Button } from '../../../node_modules/@material-ui/core';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LSData from '../base/base.localstorage';
import { changeDateFormat } from '../system/base.function';

class Souvenirs extends React.Component  {

    souvenirModel = 
    {
        _id: '',
        code: '',
        name: '',
        description: '',
        m_unit_id: '',
        createDate: '',
        created_by: LSData.loginRoleId(),
        updateDate: '',
        is_delete: '',
    }
    constructor(props) {
        super(props);
        this.state = {
            souvenirs: [],
            unit: [],
            createNew: false,
            editSouvenir: false,
            deleteSouvenir: false,
            loading: true,
            souvenir: this.souvenirModel,

        }
    }

    reloadSouvenirData = () => {
        axios.get(config.url + '/m_souvenir_unit')
        .then(res => {
            this.setState({
                souvenirs : res.data,
                createNew: false,
                editSouvenir: false,
                deleteSouvenir: false,
                souvenir: this.souvenirModel,
                loading: false
            })
        })
        .catch((error) => {
            alert(error);
        })
    }

    reloadUnitData = () => {
        axios.get(config.url + '/m-unit')
            .then(res => {
                this.setState({
                    unit: res.data
                })
            })
            .catch((error) => {
                alert(error);
            })
    }
    componentDidMount() {
        this.reloadSouvenirData();
        this.reloadUnitData();
    }

    handleToggle = () => {
        this.setState({
            createNew: true,
            souvenir: this.souvenirModel
        })
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editSouvenir: false,
            deleteSouvenir: false,
            viewSouvenir: false,
            souvenir: this.souvenirModel
        });
    }
    //bisa diketik
    handleChange = name => ({ target: { value } }) => {
        this.setState({
            souvenir: {
                ...this.state.souvenir,
                [name]: value
            }
        })
    }

    handleSubmit = () => {
        const { souvenir, createNew } = this.state;

        let newSouvenir =
        {
            code: souvenir.code,
            name: souvenir.name,
            m_unit_id: souvenir.m_unit_id,
            description: souvenir.description,
            createDate: souvenir.createDate,
            created_by: souvenir.created_by,
            updateDate: souvenir.updateDate,
            updated_by: souvenir.updated_by
        }

        if(createNew){
            axios.post(config.url + '/m-souvenir', newSouvenir)
                .then(res => {
                    this.reloadSouvenirData();
                    alert('Data Saved! New Souvenir has been add with the code '+ res.data.ops[0].code);
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
            axios.put(config.url + '/m-souvenir/' +souvenir._id , newSouvenir)
            .then(res => {
                this.reloadSouvenirData();
                alert('Data Updated! Data Souvenir has been updated');
            })
            .catch((error) => {
                alert(error)
            })
        }    
    }
    
    handleEdit = (_id) => {
        const { souvenirs } = this.state;
        const souvenir = souvenirs.find(u => u._id === _id);
        this.setState({
            editSouvenir: true,
            souvenir: {
                _id: souvenir._id,
                code: souvenir.code,
                name: souvenir.name,
                m_unit_id: souvenir.m_unit_id,
                unitName: souvenir.unitName,
                description: souvenir.description,
                createDate: souvenir.createDate,
                updated_by: LSData.loginRoleId(),
                updateDate: souvenir.updateDate

            }
           
        })
    }

    handleDelete = (_id) => {
        const { souvenirs } = this.state;
        const souvenir = souvenirs.find(u => u._id === _id);
        this.setState({
            deleteSouvenir: true,
            souvenir: {
                _id: souvenir._id,
                code: souvenir.code,
                name: souvenir.name,
                m_unit_id: souvenir.m_unit_id,
                unitName: souvenir.unitName,
                description: souvenir.description,
                createDate: souvenir.createDate,
                createBy: souvenir.createBy,
                is_delete: souvenir.is_delete
            }
        })
    }

    handleView = (_id) => {
        const { souvenirs } = this.state;
        const souvenir = souvenirs.find(u => u._id === _id);
        this.setState({
            viewSouvenir: true,
            souvenir: {
                _id: souvenir._id,
                code: souvenir.code,
                name: souvenir.name,
                m_unit_id: souvenir.m_unit_id,
                unitName: souvenir.unitName,
                description: souvenir.description,
                createDate: souvenir.createDate,
                created_by: souvenir.created_by
            }
        })
    }


    handleDeleteConfirm = () => {
        const { souvenir } = this.state;
        let delProp = {
            is_delete: souvenir.is_delete + 1,
        }

        axios.delete(config.url + '/m-souvenir/' + souvenir._id, delProp)
        .then(res => {
            this.reloadSouvenirData();
            alert('Data Deleted!');
        })
        .catch((error) => {
            alert(error);
        })

    }

    render() {
        const {souvenirs,souvenir, loading} = this.state;
        const {classes} = this.props;
        let i=1;
       
        return (
            <div>
                <h3><center>List Souvenirs</center></h3>
                <CreateSouvenir createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} souvenir={this.state.souvenir} unit={this.state.unit} />
                <EditSouvenir editSouvenir={this.state.editSouvenir} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} souvenir={this.state.souvenir} unit={this.state.unit}/>
                <DeleteSouvenir deleteSouvenir={this.state.deleteSouvenir} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} souvenir={this.state.souvenir} />
                <ViewSouvenir viewSouvenir={this.state.viewSouvenir} handleView={this.handleView} handleClose={this.handleClose} souvenir={this.state.souvenir} />
                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{fontWeight:900}}>No</TableCell>
                            <TableCell style={{fontWeight:900}}>Souvenir Code</TableCell>
                            <TableCell style={{fontWeight:900}}>Souvenir Name</TableCell>
                            <TableCell style={{fontWeight:900}}>Unit</TableCell>
                            <TableCell style={{fontWeight:900}}>Create Date</TableCell>
                            <TableCell style={{fontWeight:900}}>Create By</TableCell>
                            <TableCell style={{fontWeight:900, textAlign:'center'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {souvenirs.map(n => {
                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">{i++}</TableCell>
                                    <TableCell component="th" scope="row">{n.code}</TableCell>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>{n.unitName}</TableCell>
                                    <TableCell>{changeDateFormat(n.createDate)}</TableCell>
                                    <TableCell>{n.created_by}</TableCell>
                                    <TableCell style={{textAlign:'center'}}> <IconButton><SearchIcon onClick={() => this.handleView(n._id)} /></IconButton>
                                    <IconButton><EditIcon onClick={() => this.handleEdit(n._id)}/></IconButton>
                                    <IconButton><DeleteIcon onClick={() => this.handleDelete(n._id)} /></IconButton>
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
        alignSlef: 'center',
        top: '50%',
        alignItem: 'center'
    },
});

Souvenirs.PropTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Souvenirs);