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
import { Button } from '../../../node_modules/@material-ui/core';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';  

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
        createBy: '',
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

        }
    }

    reloadCompanyData = () => {
        axios.get(config.url + '/m-company')
        .then(res => {
            this.setState({
                companies : res.data,
                createNew: false,
                editCompany: false,
                deleteCompany: false,
                company: this.companyModel,
                loading: false
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
            company: this.companyModel
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

    // handleChangeCheckBox =  name => event => {
    //     this.setState({
    //         company: {
    //             ...this.state.company,
    //             [name]: event.target.checked
    //         }
    //     })
    // }

    handleSubmit = () => {
        const { company, createNew } = this.state;

        let newCompany =
        {
            // code: company.code,
            name: company.name,
            phone: company.phone,
            email: company.email,
            address: company.address,
            createDate: company.createDate,
            createBy: company.createBy
        }

        if(createNew){
            axios.post(config.url + '/m-company', newCompany)
                .then(res => {
                    this.reloadCompanyData();
                    alert('Company has been saved');
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
            axios.put(config.url + '/m-company/' +company._id , newCompany)
            .then(res => {
                this.reloadCompanyData();
                alert('Company has been updated');
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
            alert('Company has been deleted');
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
                <EditCompany editCompany={this.state.editCompany} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} company={this.state.company} />
                <DeleteCompany deleteCompany={this.state.deleteCompany} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} company={this.state.company} />
                <ViewCompany viewCompany={this.state.viewCompany} handleView={this.handleView} handleClose={this.handleClose} company={this.state.company} />
                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{fontWeight:900}}>No</TableCell>
                            <TableCell style={{fontWeight:900}}>Company Code</TableCell>
                            <TableCell style={{fontWeight:900}}>Company Name</TableCell>
                            <TableCell style={{fontWeight:900}}>Create Date</TableCell>
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
                                    <TableCell>{n.createDate}</TableCell>
                                    <TableCell>{n.createBy}</TableCell>
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