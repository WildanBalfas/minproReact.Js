import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateCompany from './create';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import EditCompany from './edit';
import DeleteCompany from './delete';
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
        CreateDate: ''
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
        axios.get(config.url + '/m_company')
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

    componentDidMout(){
        this.reloadCompanyData();
    }

    //API connect to cloud
    componentDidMount() {
        axios.get(config.url + '/m_company')
            .then(res => {
                this.setState({
                    companies: res.data,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    CreateCompany: true,
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
            editCompany: false,
            deleteCompany: false,
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

    handleChangeCheckBox =  name => event => {
        this.setState({
            company: {
                ...this.state.company,
                [name]: event.target.checked
            }
        })
    }

    handleSubmit = () => {
        const { company, createNew } = this.state;
        // const newId = parseInt(users[users.length -1]._id) + 1;

        let newCompany =
        {
            code: company.code,
            name: company.name,
            phone: company.phone,
            email: company.email,
            address: company.address
        }

        if(createNew){
            // users.push(newCompany)
            axios.post(config.url + '/m_company', newCompany)
                .then(res => {
                    this.reloadCompanyData();
                    alert('Companies has been saved');
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
            // let idx = users.findIndex( u => u._id === newCompany._id);
            // users[idx] = newCompany;
            axios.put(config.url + '/m_company/' +company._id , newCompany)
            .then(res => {
                this.reloadCompanyData();
                alert('Companies has been updated');
            })
            .catch((error) => {
                alert(error)
            })
        }
        
        // this.setState({
        //     createNew: false,
        //     editCompany : false,
        //     user: { _id: 0, userName: '', first: '', middle: '', last: '', email: '', phone: '', activate: '' },
        //     users: users
        // })

        
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
                address: company.address
            }
        })
    }

    handleDeleteConfirm = () => {
        const { company } = this.state;

        axios.delete(config.url + '/m_company/' + company._id)
        .then(res => {
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
        return (
            <div>
                <h3><center>List Company</center></h3>
                <CreateCompany createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} company={this.state.company} />
                <EditCompany editCompany={this.state.editCompany} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} company={this.state.company} />
                <DeleteCompany deleteCompany={this.state.deleteCompany} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} company={this.state.company} />
                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company Code</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Create Date</TableCell>
                            <TableCell>Create By</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map(n => {
                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {n.code}
                                    </TableCell>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>{n.CreateDate}</TableCell>
                                    <TableCell>{n.phone}</TableCell>
                                    <TableCell><IconButton><EditIcon onClick={() => this.handleEdit(n._id)}/></IconButton>
                                    <IconButton><DeleteIcon onClick={() => this.handleDelete(n._id)} /></IconButton> </TableCell>
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