import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateUser from './create';
import EditUser from './edit';
import ViewDesign from './view';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import { Button } from '../../../node_modules/@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { config } from '../configuration/config';
class Users extends React.Component {

    designModel = {
        _id: '', code: '', t_event_id: '', 
        title_header: '', request_by: '', request_date: '',
        approved_date: '', assign_to: '', closed_date: '', 
        note: '', status: '', 
        reject_reason: '',
        is_delete: '', created_by: '', updated_by:'',
        updated_date: ''
    };
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            designAgg: [],
            employees: [],
            createNew: false,
            editUser: false,
            selectData: 'user-aggregation',
            load: true,
            user: this.userModel,

            //batas atas
            events: [],
            design: this.designModel,
        }
    }


    /**
     * Batas Atas
     * 
     */

    reloadEventData = () => {
        axios.get(config.url + '/t-event')
            .then(res => {
                this.setState({
                    events: res.data
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
        this.reloadDesignAggregation();

        // Batas Atas
        this.reloadEventData();
    }

    handleSubmit = () => {
        const {events, design} = this.state;
        
        console.log(design);
        // let newUser = {
        //     username: user.username,
        //     password: user.password,
        //     m_role_id: user.mRoleId,
        //     m_employee_id: user.mEmployeeId,
        // }

        // if (createNew) {
        //     axios.post(config.url + '/m-user', newUser)
        //         .then(res => {
        //             this.reloadUserData();
        //             alert('User has been saved.\n');
        //         })
        //         .catch((error) => {
        //             alert(error);
        //         })
        // } else {
        //     axios.put(config.url + '/m-user/' + user._id, newUser)
        //         .then(res => {
        //             this.reloadUserData();
        //         });
        // }
    }

     // Batas Bawah

    reloadDesignAggregation = () => {
        axios.get(config.url + '/t-design-aggregation')
            .then(res => {
                this.setState({
                    designAgg: res.data
                })
            })
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
    

    reloadUserData = () => {
        axios.get(config.url + '/user-aggregation')
            .then(res => {
                this.setState({
                    users: res.data,
                    createNew: false,
                    editUser: false,
                    deleteUser: false,
                    viewDesign: false,
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
            viewDesign: false
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
        // const { users } = this.state;
        // const user = users.find(u => u._id === n);
        // // this.setState({
        // //     editUser: true,
        // //     user: {
        // //         _id: user._id,
        // //         username: user.username,
        // //         password: user.password,
        // //         mRoleId: user.m_role_id,
        // //         mRoleName: user.mRoleName,
        // //         mEmployeeId: user.m_employee_id,
        // //         mEmployeeFirstName: user.mEmployeeFirstName,
        // //         mEmployeeLastName: user.mEmployeeLastName,
        // //         re_password: user.password
        // //     }
        // // });
    }
    

    handleView = (n) => {
        const {designAgg } = this.state;
        const objDesign = designAgg.find(u => u._id === n);
        console.log(objDesign);
    }

    handleDelete = (n) => {
        // const { users } = this.state;
        // console.log(users);
        // const user = users.find(u => u._id === n);
        // // console.log(user);
        // this.setState({
        //     deleteUser: true,
        //     user: {
        //         _id: user._id,
        //         username: user.username,
        //         password: user.password,
        //         mEmployeeFirstName: user.mEmployeeFirstName,
        //         mEmployeeLastName: user.mEmployeeLastName,
        //         mRoleName: user.mRoleName,
        //     }
        // });
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
        const { users, load, designAgg } = this.state;
        const { classes } = this.props;
        let i = 1;
        return (
            <div>
                <CreateUser createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleChangeCheckBox={this.handleChangeCheckBox} design={this.state.design} events={this.state.events} />
                {/* <EditUser editUser={this.state.editUser} handleToggle={this.handleToggle} handleChangeCheckBox={this.handleChangeCheckBox} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user} employees={this.state.employees} roles={this.state.roles} /> */}
                {/* <ViewDesign viewDesign={this.state.viewDesign} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} user={this.state.user} /> */}
                <CircularProgress className={classes.progress} style={{ visibility: (load ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>No</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Transaction Code</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Request By</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Request Date</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Assign To</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Status</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Created Date</TableCell>
                            <TableCell style={{ fontWeight: "bold", color: "black" }}>Created By</TableCell>
                            <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {designAgg.map(n => {
                            return (
                                <TableRow key={n._id}>
                                    <TableCell>{i++}</TableCell>
                                    <TableCell>{n.code}</TableCell>
                                    <TableCell component="th" scope="row">{n.requestFirstName}</TableCell>
                                    <TableCell>{n.createDate}</TableCell>
                                    <TableCell>{n.assignToFirstName}</TableCell>
                                    <TableCell>{n.status}</TableCell>
                                    <TableCell>{n.createDate}</TableCell>
                                    <TableCell>{n.createdByUsername}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <IconButton onClick={() => this.handleView(n._id, n.status)}><SearchIcon color="primary" /></IconButton>
                                        <IconButton onClick={() => this.handleEdit(n._id)}><EditIcon color="primary" /></IconButton>
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
