
import React from 'react';
import axios from 'axios';
import { config } from '../configuration/config';
import { deleteData } from '../base/base.model';


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
import CreateUser from './create';
import EditUser from './edit';
import ViewUser from './view';


class Users extends React.Component {

    userModel = {
        _id: '',
        username: '',
        password: '',
        m_role_id: '',
        m_employee_id: '',
        is_delete: '',
        created_by: '',
        created_date: '',
        update_by: '',
        update_date: '',
        re_password: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            employees: [],
            roles: [],
            user: this.userModel,
            createNew: false,
            editUser: false
        }
    }

    componentDidMount() {
        this.reloadData('users', '/user-aggregation');
        this.reloadData('employees', '/m-employee');
        this.reloadData('roles', '/m-role');
    }

    reloadData = (state, url) => {
        axios.get(config.url + url)
            .then(res => {
                this.setState({
                    [state]: res.data,
                    createNew: false,
                    editUser: false,
                    deleteUser: false,
                    viewUser: false,
                    user: this.userModel,
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
            user: this.userModel
        })
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editUser: false,
            viewUser: false,
            deleteUser: false,
        })
    }

    handleSubmit = () => {
        const { user, createNew } = this.state;
        let newUser = {
            username: user.username,
            password: user.password,
            m_role_id: user.m_role_id,
            m_employee_id: user.m_employee_id,
        }
        if (createNew) {
            axios.post(config.url + '/m-user', newUser)
                .then(res => {
                    this.reloadData('users', '/user-aggregation');
                })
                .catch((error) => {
                    alert(error);
                })
        } else {
            axios.put(config.url + '/m-user/' + user._id, newUser)
                .then(res => {
                    this.reloadData('users', '/user-aggregation');
                });
        }
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    handleEdit = (_id) => {
        const { users } = this.state;
        const user = users.find(u => u._id === _id);
        this.setState({
            editUser: true,
            user: {
                _id: user._id,
                username: user.username,
                password: user.password,
                re_password: user.password,
                m_role_id: user.m_role_id,
                m_employee_id: user.m_employee_id
            }
        })
    }

    handleDelete = (_id) => {
        const { users } = this.state;
        const user = users.find(u => u._id === _id);
        this.setState({
            deleteUser: true,
            user: {
                _id: user._id
            }
        })
    }

    handleView = (_id) => {
        const { users } = this.state;
        const user = users.find(u => u._id === _id);
        this.setState({
            viewUser: true,
            user: {
                _id: user._id,
                username: user.username,
                password: user.password,
                re_password: user.password,
                m_role_id: user.m_role_id,
                m_employee_id: user.m_employee_id
            }
        })
    }

    handleDeleteConfirm = (_id) => {
        deleteData('m-user', _id);
        this.reloadData('users', '/user-aggregation');
        // axios.delete(config.url + '/m-user/' + _id)
        //     .then(res => {
        //         this.reloadData('users', '/user-aggregation');
        //     })
        //     .catch((error) => {
        //         alert('Error');
        //     })
    }


    render() {
        const { users } = this.state;
        const deleteUser = this.state.user;
        let i = 1;
        return (
            <div>
                <CreateUser
                    createNew={this.state.createNew}
                    handleToggle={this.handleToggle}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    user={this.state.user}
                    employees={this.state.employees}
                    roles={this.state.roles}
                />
                <EditUser
                    editUser={this.state.editUser}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    user={this.state.user}
                    employees={this.state.employees}
                    roles={this.state.roles}
                />
                <ViewUser
                    viewUser={this.state.viewUser}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    user={this.state.user}
                    employees={this.state.employees}
                    roles={this.state.roles}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>No</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Employee</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Role</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Company</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Username</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Created Data</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Create By</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => {
                            return (
                                <TableRow key={user._id}>
                                    <TableCell>{i++}</TableCell>
                                    <TableCell>{user.mEmployeeFirstName + ' ' + user.mEmployeeLastName}</TableCell>
                                    <TableCell component="th" scope="row">{user.mRoleName}</TableCell>
                                    <TableCell>{user.mEmployeemCompanyName}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.createDate}</TableCell>
                                    <TableCell>{user.mRoleName}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <IconButton onClick={() => this.handleView(user._id)}><SearchIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => this.handleEdit(user._id)}><EditIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => this.handleDelete(user._id)}><DeleteIcon color="secondary" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <Dialog open={this.state.deleteUser} onClose={this.handleClose} style={{ textAlign: 'center' }}>
                    <DialogContent>
                        <DialogContentText>
                            Delete Data?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="secondary" >Cancel</Button>
                        <Button onClick={() => this.handleDeleteConfirm(deleteUser._id)} variant="contained" color="primary" autoFocus>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Users;
