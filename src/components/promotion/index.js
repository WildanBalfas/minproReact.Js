import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateUser from './create';
import EditUser from './edit';
import DeleteUser from './delete';
import { Button } from '../../../node_modules/@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { config } from '../configuration/config';
class Users extends React.Component {

    userModel = {
        _id: '', username: '', password: '', re_password: '', m_role_id: '', m_employee_id: '',
        mRoleCode: '', mRoleName: '', mRoleDescription: '', mEmployeeFirstName: '', mEmployeeLastName: '', mEmployeeEmail: '',
        mEmployeemCompanyId: '', mEmployeemCompanyName: ''
    };
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            employees: [],
            createNew: false,
            editUser: false,
            selectData: 'user-aggregation',
            load: true,
            user: this.userModel
        }
    }

    reloadEmployeData = () => {
        axios.get(config.url + '/m-employee')
            .then(res => {
                this.setState({
                    employees: res.data
                })
            })
            .catch((error) => {
                alert(error);
            })
    }

    reloadRoleData = () => {
        axios.get(config.url + '/m-role')
            .then(res => {
                this.setState({
                    roles: res.data
                })
            })
            .catch((error) => {
                alert(error);
            })
    }
    componentDidMount() {
        this.reloadUserData();
        this.reloadEmployeData();
        this.reloadRoleData();
    }

    reloadUserData = () => {
        axios.get(config.url + '/user-aggregation')
            .then(res => {
                this.setState({
                    users: res.data,
                    createNew: false,
                    editUser: false,
                    deleteUser: false,
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
            updateUser: true,
            user: this.userModel
        });
    }



    handleClose = () => {
        this.setState({
            createNew: false,
            editUser: false,
            deleteUser: false
        });
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    };

    handleChangeCheckBox = name => event => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: event.target.checked
            }
        });
    }

    handleEdit = (n) => {
        const { users } = this.state;
        const user = users.find(u => u._id === n);
        this.setState({
            editUser: true,
            user: {
                _id: user._id,
                username: user.username,
                password: user.password,
                mRoleId: user.m_role_id,
                mRoleName: user.mRoleName,
                mEmployeeId: user.m_employee_id,
                mEmployeeFirstName: user.mEmployeeFirstName,
                mEmployeeLastName: user.mEmployeeLastName,
                re_password: user.password
            }
        });
    }

    handleSubmit = () => {
        const { user, createNew } = this.state;

        let newUser = {
            username: user.username,
            password: user.password,
            m_role_id: user.mRoleId,
            m_employee_id: user.mEmployeeId,
        }

        if (createNew) {
            axios.post(config.url + '/m-user', newUser)
                .then(res => {
                    this.reloadUserData();
                    alert('User has been saved.\n');
                })
                .catch((error) => {
                    alert(error);
                })
        } else {
            axios.put(config.url + '/m-user/' + user._id, newUser)
                .then(res => {
                    this.reloadUserData();
                });
        }
    }

    handleDelete = (n) => {
        const { users } = this.state;
        console.log(users);
        const user = users.find(u => u._id === n);
        // console.log(user);
        this.setState({
            deleteUser: true,
            user: {
                _id: user._id,
                username: user.username,
                password: user.password,
                mEmployeeFirstName: user.mEmployeeFirstName,
                mEmployeeLastName: user.mEmployeeLastName,
                mRoleName: user.mRoleName,
            }
        });
    }

    handleDeleteConfirm = () => {
        const { user } = this.state;
        axios.delete(config.url + '/m-user/' + user._id)
            .then(res => {
                this.reloadUserData();
                alert('Data Berhasil Dihapus!')
            })
            .catch((error) => {
                alert('Error');
            })
    }

    render() {
        const { users, load, employeess } = this.state;
        const { classes } = this.props;
        let i = 1;
        return (
            <div>
                <h3></h3>
                <CreateUser createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox={this.handleChangeCheckBox} user={this.state.user} employees={this.state.employees} roles={this.state.roles} />
                <EditUser editUser={this.state.editUser} handleToggle={this.handleToggle} handleChangeCheckBox={this.handleChangeCheckBox} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user} employees={this.state.employees} roles={this.state.roles} />
                <DeleteUser deleteUser={this.state.deleteUser} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} user={this.state.user} />
                <CircularProgress className={classes.progress} style={{ visibility: (load ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Created Data</TableCell>
                            <TableCell>Create By</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(n => {
                            return (
                                <TableRow key={n._id}>
                                    <TableCell>{i++}</TableCell>
                                    <TableCell>{n.mEmployeeFirstName + ' ' + n.mEmployeeLastName}</TableCell>
                                    <TableCell component="th" scope="row">{n.mRoleName}</TableCell>
                                    <TableCell>{n.mEmployeemCompanyName}</TableCell>
                                    <TableCell>{n.username}</TableCell>
                                    <TableCell>{n.createDate}</TableCell>
                                    <TableCell>{n.mRoleName}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.handleEdit(n._id)} variant="contained" color="primary">Edit</Button>
                                        <Button onClick={() => this.handleDelete(n._id)} variant="contained" color="secondary">Delete</Button>
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

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
