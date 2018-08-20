
import React from 'react';
import axios from 'axios';
import { config } from '../configuration/config';
import { deleteData } from '../base/base.model';
import LS from '../base/base.localstorage';


// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
import CreateEmployee from './create';
import EditEmployee from './edit';
import ViewUser from './view';
import { changeDateFormat } from '../system/base.function';

class Users extends React.Component {

    employeeModel = {
        _id: '',
        employee_number: '',
        firstName: '',
        lastName: '',
        mCompanyId: '',
        mCompanyName: '',
        createdBy: '',
        createdDate: '',
        email: '',
        updateDate: '',
        updateBy: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            employees: [],
            employee: this.employeeModel,
            createNew: false,
            editEmployee: false
        }
    }

    componentDidMount() {
        this.reloadData('employees', '/employee-aggregation');
        this.reloadData('companies', '/m-company');
    }

    reloadData = (state, url) => {
        axios.get(config.url + url)
            .then(res => {
                this.setState({
                    [state]: res.data,
                    createNew: false,
                    editEmployee: false,
                    deleteEmployee: false,
                    viewEmployee: false,
                    employee: this.employeeModel,
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
            employee: this.employeeModel
        })
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editEmployee: false,
            viewEmployee: false,
            deleteEmployee: false,
        })
    }

    handleSubmit = () => {
        const { employee, createNew } = this.state;

        let newEmployee = {
            employee_number: employee.employee_number,
            first_name: employee.firstName,
            last_name: employee.lastName,
            m_company_id: employee.mCompanyId,
            email: employee.email,
        }
        if (createNew) {
            newEmployee.created_by = LS.loginId();
            axios.post(config.url + '/m-employee', newEmployee)
                .then(res => {
                    this.reloadData('employees', '/employee-aggregation');
                })
                .catch((error) => {
                    alert(error);
                })
        } else {
            newEmployee.updated_by = LS.loginId();
            axios.put(config.url + '/m-employee/' + employee._id, newEmployee)
                .then(res => {
                    this.reloadData('employees', '/employee-aggregation');
                });
        }
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            employee: {
                ...this.state.employee,
                [name]: value
            }
        })
    }

    handleEdit = (_id) => {
        const { employees } = this.state;
        const employee = employees.find(u => u._id === _id);
        this.setState({
            editEmployee: true,
            employee: {
                _id: employee._id,
                employee_number: employee.employee_number,
                firstName: employee.firstName,
                lastName: employee.lastName,
                mCompanyId: employee.mCompanyId,
                email: employee.email,
            }
        })
    }

    handleDelete = (_id) => {
        const { employees } = this.state;
        const employee = employees.find(u => u._id === _id);
        this.setState({
            deleteEmployee: true,
            employee: {
                _id: employee._id
            }
        })
    }

    handleView = (_id) => {
        const { employees } = this.state;
        const employee = employees.find(u => u._id === _id);
        this.setState({
            viewEmployee: true,
            employee: {
                _id: employee._id,
                employee_number: employee.employee_number,
                firstName: employee.firstName,
                lastName: employee.lastName,
                mCompanyId: employee.mCompanyId,
                email: employee.email,
            }
        })
    }

    handleDeleteConfirm = (_id) => {
        deleteData('m-employee', _id);
        this.reloadData('employees', '/employee-aggregation');

        // axios.delete(config.url + '/m-employee/' + _id)
        //     .then(res => {
        //         this.reloadData('employees', '/employee-aggregation');
        //     })
        //     .catch((error) => {
        //         alert('Error');
        //     })
    }


    render() {
        const { employees } = this.state;
        const deleteEmployee = this.state.employee;
        let i = 1;
        console.log(employees);
        return (
            <div>
                <CreateEmployee
                    createNew={this.state.createNew}
                    handleToggle={this.handleToggle}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    employee={this.state.employee}
                    companies={this.state.companies}
                />
                <EditEmployee
                    editEmployee={this.state.editEmployee}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    employee={this.state.employee}
                    companies={this.state.companies}
                />
                <ViewUser
                    viewEmployee={this.state.viewEmployee}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    employee={this.state.employee}
                    companies={this.state.companies}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>No</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Employee ID Number</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Employee Name</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Company name</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Created Date</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Create By</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map(employee => {
                            return (
                                <TableRow key={employee._id}>
                                    <TableCell>{i++}</TableCell>
                                    <TableCell>{employee.employee_number}</TableCell>
                                    <TableCell component="th" scope="row">{employee.firstName + ' ' + employee.lastName}</TableCell>
                                    <TableCell>{employee.mCompanyName}</TableCell>
                                    <TableCell>{changeDateFormat(employee.createdDate)}</TableCell>
                                    <TableCell>{employee.mRoleName}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <IconButton onClick={() => this.handleView(employee._id)}><SearchIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => this.handleEdit(employee._id)}><EditIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => this.handleDelete(employee._id)}><DeleteIcon color="secondary" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <Dialog open={this.state.deleteEmployee} onClose={this.handleClose} style={{ textAlign: 'center' }}>
                    <DialogContent>
                        <DialogContentText>
                            Delete Data?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="secondary" >Cancel</Button>
                        <Button onClick={() => this.handleDeleteConfirm(deleteEmployee._id)} variant="contained" color="primary" autoFocus>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Users;