import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateUser from './create';
import EditUser from './edit';
import DeleteUser from './delete';
import ViewEmployee from './view';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import { Button } from '../../../node_modules/@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { config } from '../configuration/config';

class Employees extends React.Component {

    employeeModel = {
        _id: '', employee_number: '', firstName: '', lastName: '', email: '', createdDate: '', createdBy: '',
        mCompanyCode: '', mCompanyName: ''
    };
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            companies: [],
            createNew: false,
            editUser: false,
            selectData: 'user-aggregation',
            load: true,
            employee: this.employeeModel
        }
    }

    componentDidMount() {
        this.reloadEmployeeData();
        this.reloadCompanyData();
    }

    reloadCompanyData = () => {
        axios.get(config.url + '/m-company')
            .then(res => {
                this.setState({
                    companies: res.data
                })
            })
            .catch((error) => {
                alert(error);
            })
    }

    reloadEmployeeData = () => {
        axios.get(config.url + '/employee-aggregation')
            .then(res => {
                this.setState({
                    employees: res.data,
                    createNew: false,
                    editEmployee: false,
                    deleteEmployee: false,
                    user: this.userModel,
                    load: false
                })
            })
            .catch((error) => {
                alert(error);
            })
    }

    handleToggle = () => {
        this.setState({
            createNew: true,
            updateEmployee: true,
            employee: this.employeeModel
        });
    }



    handleClose = () => {
        this.setState({
            createNew: false,
            editEmployee: false,
            viewEmployee: false,
            deleteEmployee: false
        });
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            employee: {
                ...this.state.employee,
                [name]: value
            }
        })
    };

    handleChangeCheckBox = name => event => {
        this.setState({
            employee: {
                ...this.state.employee,
                [name]: event.target.checked
            }
        });
    }

    handleEdit = (n) => {
        const { employees } = this.state;
        const employee = employees.find(u => u._id === n);
        this.setState({
            editEmployee: true,
            employee: {
                _id: employee._id,
                code: employee.code,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                mCompanyCode: employee.mCompanyCode,
                mCompanyName: employee.mCompanyName,
                m_company_id: employee.m_company_id,
            }

        });
    }

    handleSubmit = () => {
        const { employee, createNew } = this.state;

        let newEmployee = {
            employee_number: employee.code,
            first_name: employee.firstName,
            last_name: employee.lastName,
            email: employee.email,
            m_company_id: employee.mCompanyId,
        }
        if (createNew) {
            axios.post(config.url + '/m-employee', newEmployee)
                .then(res => {
                    this.reloadEmployeeData();
                    alert('User has been saved.\n');
                })
                .catch((error) => {
                    alert(error);
                })
        } else {
            axios.put(config.url + '/m-employee/' + employee._id, newEmployee)
                .then(res => {
                    this.reloadEmployeeData();
                });
        }
    }

    handleDelete = (n) => {
        const { employees } = this.state;
        const employee = employees.find(u => u._id === n);
        this.setState({
            deleteEmployee: true,
            employee: {
                _id: employee._id,
                code: employee.code,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                createdDate: employee.createdDate,
                createdBy: employee.createdBy,
                mCompanyCode: employee.mCompanyCode,
                mCompanyName: employee.mCompanyName,
                updateDate: employee.updateDate,
                updatedBy: employee.updatedBy
            }
        });
    }

    handleView = (n) => {
        const { employees } = this.state;
        const employee = employees.find(u => u._id === n);
        this.setState({
            viewEmployee: true,
            employee: {
                _id: employee._id,
                code: employee.code,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                createdDate: employee.createdDate,
                createdBy: employee.createdBy,
                mCompanyCode: employee.mCompanyCode,
                mCompanyName: employee.mCompanyName,
                updateDate: employee.updateDate,
                updatedBy: employee.updatedBy
            }
        });
    }

    

    handleDeleteConfirm = () => {
        const { employee } = this.state;
        axios.delete(config.url + '/m-employee/' + employee._id)
            .then(res => {
                this.reloadEmployeeData();
                alert('Data Berhasil Dihapus!')
            })
            .catch((error) => {
                alert('Error');
            })
    }

    render() {
        const { load, employees, companies } = this.state;
        const { classes } = this.props;
        console.log(companies);
        let i = 1;
        return (
            <div>
                <h3></h3>
                <CreateUser createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox={this.handleChangeCheckBox} employee={this.state.employee} companies={this.state.companies} />
                <EditUser editEmployee={this.state.editEmployee} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox={this.handleChangeCheckBox} employee={this.state.employee} companies={this.state.companies} />
                <DeleteUser deleteEmployee={this.state.deleteEmployee} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} employee={this.state.employee} />
                <ViewEmployee viewEmployee={this.state.viewEmployee} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} employee={this.state.employee} />
                <CircularProgress className={classes.progress} style={{ visibility: (load ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>No</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Employee ID Number</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Employee Name</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Company Name</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Create By</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map(n => {
                            return (
                                <TableRow key={n._id}>
                                    <TableCell>{i++}</TableCell>
                                    <TableCell>{n.code}</TableCell>
                                    <TableCell>{n.firstName + ' ' + n.lastName}</TableCell>
                                    <TableCell>{n.mCompanyName}</TableCell>
                                    <TableCell>{n.createdBy}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <IconButton onClick={() => this.handleView(n._id)}><SearchIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => this.handleEdit(n._id)}><EditIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => this.handleDelete(n._id)}><DeleteIcon color="secondary" /></IconButton>
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
        alignItem: 'center'
    },
});

Employees.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Employees);
