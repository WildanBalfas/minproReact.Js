import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateUser from './create';
import EditUser from './edit';
import DeleteUser from './delete';
import ViewUser from './view';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { Redirect } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
            user: this.userModel,
            redirect: false
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

    componentWillMount() {
        if (localStorage.getItem('userData')) {
            console.log("call user feed");
        } else {
            this.setState({ redirect: true })
        }
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
            deleteUser: false,
            ViewUser: false,
        });
    }

    handleChange = name => ({ target: { value } }) => {
        console.log(name);
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

    handleView = (n) => {
        const { users } = this.state;
        const user = users.find(u => u._id === n);
        this.setState({
            ViewUser: true,
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
        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }
        const { users, load } = this.state;
        const { classes } = this.props;
        let i = 1;
        return (
            <div>
                <CreateUser createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox={this.handleChangeCheckBox} user={this.state.user} employees={this.state.employees} roles={this.state.roles} />
                <EditUser editUser={this.state.editUser} handleToggle={this.handleToggle} handleChangeCheckBox={this.handleChangeCheckBox} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user} employees={this.state.employees} roles={this.state.roles} />
                <ViewUser ViewUser={this.state.ViewUser} handleClose={this.handleClose} user={this.state.user} />
                <DeleteUser deleteUser={this.state.deleteUser} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} user={this.state.user} />
                <CircularProgress className={classes.progress} style={{ visibility: (load ? 'visible' : 'hidden') }} color="secondary" />
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

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
