import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateUser from './create';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import EditUser from './edit';
import DeleteUser from './delete';
import { Button } from '../../../node_modules/@material-ui/core';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';  

export default class extends React.Component {

    userModel = 
    {
        _id: '',
        username: '',
        name: {
            first: '',
            middle: '',
            last: '',
        },
        email: '',
        phone: '',
        active: true,
    }
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            createNew: false,
            editUser: false,
            deleteUser: false,
            loading: true,
            user: this.userModel,

        }
    }

    reloadUserData = () => {
        axios.get(config.url + '/users')
        .then(res => {
            this.setState({
                users : res.data,
                createNew: false,
                editUser: false,
                deleteUser: false,
                user: this.userModel,
                loading: false
            })
        })
        .catch((error) => {
            alert(error);
        })
    }

    componentDidMout(){
        this.reloadUserData();
    }

    //API connect to cloud
    componentDidMount() {
        axios.get(config.url + '/users')
            .then(res => {
                this.setState({
                    users: res.data,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    CreateUser: true,
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
            editUser: false,
            deleteUser: false,
            user: this.userModel
        });
    }
    //bisa diketik
    handleChange = name => ({ target: { value } }) => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    handleChangeCheckBox =  name => event => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: event.target.checked
            }
        })
    }

    handleSubmit = () => {
        const { user, createNew } = this.state;
        // const newId = parseInt(users[users.length -1]._id) + 1;

        let newUser =
        {
            _id: createNew ? newId : user._id,
            username: user.username,
            name: {
                first: user.first,
                middle: user.middle,
                last: user.last
            },
            email: user.email,
            phone: user.phone,
            activate: user.activate
        }

        if(createNew){
            // users.push(newUser)
            axios.post(config.url + 'users', newUser)
                .then(res => {
                    this.reloadUserData();
                    alert('Users has been saved');
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
            // let idx = users.findIndex( u => u._id === newUser._id);
            // users[idx] = newUser;
            axios.put(config.url + '/users/' +user._id , newUser)
            .then(res => {
                this.reloadUserData();
                alert('Users has been updated');
            })
            .catch((error) => {
                alert(error)
            })
        }
        
        // this.setState({
        //     createNew: false,
        //     editUser : false,
        //     user: { _id: 0, userName: '', first: '', middle: '', last: '', email: '', phone: '', activate: '' },
        //     users: users
        // })

        
    }
    
    handleEdit = (_id) => {
        const { users } = this.state;
        const user = users.find(u => u._id === _id);
        // console.log(user);
        this.setState({
            editUser: true,
            user: {
                _id: user._id,
                username: user.username,
                first: user.name.first,
                middle: user.name.middle,
                last: user.name.last,
                email: user.email,
                phone: user.phone,
                activate: user.activate
            }
        })
    }

    handleDelete = (_id) => {
        const { users } = this.state;
        const user = users.find(u => u._id === _id);
        this.setState({
            deleteUser: true,
            user: {
                _id: user._id,
                username: user.username,
                first: user.name.first,
                middle: user.name.middle,
                last: user.name.last,
                email: user.email,
                phone: user.phone,
                activate: user.activate
            }
        })
    }

    handleDeleteConfirm = () => {
        const { user} = this.state;

        axios.delete(config.url + '/users/' + users._id)
        .then(res => {
            this.reloadUserData();
            alert('User has been deleted');
        })
        .catch((error) => {
            alert(error);
        })
        // let idx = users.findIndex(u => u._id === user._id)
        // users.splice(idx,1);
        // this.setState({
        //     deleteUser: false,
        //     user: { _id: 0, username: '', first: '', middle: '', last: '', email: '', phone: '', activate: '' }
        // })

    }


    render() {
        const {users, loading} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <h3><center>List of Users</center></h3>
                <CreateUser createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox = {this.handleChangeCheckBox} user={this.state.user} />
                <EditUser editUser={this.state.editUser} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox = {this.handleChangeCheckBox} user={this.state.user} />
                <DeleteUser deleteUser={this.state.deleteUser} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} handleChangeCheckBox = {this.handleChangeCheckBox} user={this.state.user} />
                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Activate</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(n => {
                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {n.username}
                                    </TableCell>
                                    <TableCell>{(n.name.first ? n.name.first + " " : "") + (n.name.middle ? n.name.middle + " " : "") + (n.name.last ? n.name.last + " " : "")}</TableCell>
                                    <TableCell>{n.email}</TableCell>
                                    <TableCell>{n.phone}</TableCell>
                                    <TableCell>{n.activate}</TableCell>
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

User.PropTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Users);