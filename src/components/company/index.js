import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateCompany from './create';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import EditCompany from './edit';
import DeleteCompany from './delete';
import ViewCompany from './view';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LSData from '../base/base.localstorage';
import {changeDateFormat} from '../system/base.function';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class Companies extends React.Component  {

    companyModel = 
    {
        _id: '',
        code: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        createDate: '',
        created_by: LSData.loginRoleId(),
        is_delete: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            createNew: false,
            editCompany: false,
            deleteCompany: false,
            loading: true,
            company: this.companyModel,
            updateCompany: false,

        }
    }

    reloadCompanyData = () => {
        axios.get(config.url + '/m_company_aggregation')
        .then(res => {
            this.setState({
                companies : res.data,
                createNew: false,
                editCompany: false,
                deleteCompany: false,
                company: this.companyModel,
                loading: false,
                updateCompany: false
            })
        })
        .catch((error) => {
            alert(error);
        })
    }

    componentDidMount(){
        this.reloadCompanyData();
    }

    handleToggle = () => {
        this.setState({
            createNew: true,
        });
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editCompany: false,
            deleteCompany: false,
            viewCompany: false,
            company: this.companyModel,
            updateCompany: false
        });
    }
    //bisa diketik
    handleChange = name => ({ target: { value } }) => {
        this.setState({
            company: {
                ...this.state.company,
                [name]: value
            }
        })
    }


    handleSubmit = () => {
        const { company, createNew } = this.state;
        let newCompany =
        {
            name: company.name,
            phone: company.phone,
            email: company.email,
            address: company.address,
            createDate: company.createDate,
            created_by: company.created_by,
            updated_by: company.updated_by,
            updateDate: company.updateDate
        }
     
        if(createNew){
            axios.post(config.url + '/m-company', newCompany)
                .then(res => {
                    this.reloadCompanyData();
                    alert('Data Saved! New Company has been add with the code '+ res.data.ops[0].code);
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
            axios.put(config.url + '/m-company/' +company._id , newCompany)
            .then(res => {
                this.reloadCompanyData();
                alert('Data Updated! Data Company has been updated');
            })
            .catch((error) => {
                alert(error)
            })
        }    
    }
    
    handleEdit = (_id) => {
        const { companies } = this.state;
        const company = companies.find(u => u._id === _id);
        this.setState({
            editCompany: true,
            updateCompany: false,
            company: {
                _id: company._id,
                code: company.code,
                name: company.name,
                phone: company.phone,
                email: company.email,
                address: company.address,
                updated_by: LSData.loginRoleId()
            }
        })
    }

    handleUpdateCompany = () => {
        this.setState({
            updateCompany: true
        })
    }

    handleDelete = (_id) => {
        const { companies } = this.state;
        const company = companies.find(u => u._id === _id);
        this.setState({
            deleteCompany: true,
            company: {
                _id: company._id,
                code: company.code,
                name: company.name,
                phone: company.phone,
                email: company.email,
                address: company.address,
                is_delete: company.is_delete
            }
        })
    }

    handleView = (_id) => {
        const { companies } = this.state;
        const company = companies.find(u => u._id === _id);
        this.setState({
            viewCompany: true,
             company: {
                _id: company._id,
                code: company.code,
                name: company.name,
                phone: company.phone,
                email: company.email,
                address: company.address
            }
        })
    }


    handleDeleteConfirm = () => {
        const { company } = this.state;
        let delProp = {
            is_delete: company.is_delete + 1,
        }
        axios.put(config.url + '/m-company/' + company._id, delProp)
        .then(res =>{
            this.reloadCompanyData();
            alert('Data Deleted!');
        })
        .catch((error) => {
            alert(error);
        })
    }
 

    render() {
        const {companies, loading} = this.state;
        const {classes} = this.props;
        let i=1;
        return (
            <div>
                <h3><center>List Company</center></h3>
                <CreateCompany createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} company={this.state.company} />
                <EditCompany editCompany={this.state.editCompany} updateCompany={this.state.updateCompany} handleUpdateCompany={this.handleUpdateCompany} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} company={this.state.company} />
                <DeleteCompany deleteCompany={this.state.deleteCompany} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} company={this.state.company} />
                <ViewCompany viewCompany={this.state.viewCompany} handleView={this.handleView} handleClose={this.handleClose} company={this.state.company} />
                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
                {/* <FormControl>
                    <TableHead >
                    <TableCell style={{width: 300, border: 'none'}}>
                        <Select
                            fullWidth
                            value={companies._id}
                            onChange={this.handleChange('companies_id')}
                            inputProps={{
                                name: 'companies._id',
                                id: 'unit-simple'
                            }}
                            displayEmpty
                        >
                            <MenuItem>
                                Select Company Code
                            </MenuItem>
                            {companies.map(c => {
                                return(
                                    <MenuItem value={c._id}>{c.code}</MenuItem>
                                )
                            })}
                        </Select>
                        </TableCell>
                        <TableCell style={{width: 200, border: 'none'}}>
                        <Select
                            fullWidth
                            value={companies._id}
                            onChange={this.handleChange('companies._id')}
                            inputProps={{
                                name: 'companies._id',
                                id: 'unit-simple'
                            }}
                            displayEmpty
                          
                        >
                            <MenuItem>
                                Select Company Name
                            </MenuItem>
                            {companies.map(c => {
                                return(
                                    <MenuItem value={c._id}>{c.name}</MenuItem>
                                )
                            })}
                        </Select>
                        </TableCell>
                        <TableCell style={{width: 200, border: 'none'}}><TextField fullWidth type='date' placeholder='Created'/></TableCell>
                        <TableCell style={{width: 200, border: 'none'}}><TextField placeholder='Created By'/></TableCell>
                        <TableCell style={{width: 200, border: 'none'}}> <Button variant="contained" color="secondary" style={{float: 'right'}}>Search</Button></TableCell>
                        </TableHead>
                    </FormControl> */}
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{fontWeight:900}}>No</TableCell>
                            <TableCell style={{fontWeight:900}}>Company Code</TableCell>
                            <TableCell style={{fontWeight:900}}>Company Name</TableCell>
                            <TableCell style={{fontWeight:900}}>Created Date</TableCell>
                            <TableCell style={{fontWeight:900}}>Create By</TableCell>
                            <TableCell style={{fontWeight:900, textAlign:'center'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map(n => {
                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">{i++}</TableCell>
                                    <TableCell component="th" scope="row">{n.code}</TableCell>
                                    <TableCell>{n.name}</TableCell>
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

Companies.PropTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Companies);