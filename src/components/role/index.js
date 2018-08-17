import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateRole from './create';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import EditRole from './edit';
import DeleteRole from './delete';
import ViewRole from './view';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Roles extends React.Component {
  
  roleModel = {
    _id: '',
    code:'',
    name:'',
    description:'',
    createDate: '',
    is_delete:''
  }
  
  constructor(props){
    super(props);
    this.state = {
      roles: [],
      createNew: false,
      deleteRole:false,
      editRole:false,
      loading: true,
      role:this.roleModel
    }
  }
  
  reloadRoleData = () => {
    axios.get(config.url + '/m-role')
    .then(res => {
      this.setState({
        roles: res.data,
        createNew: false,
        deleteRole:false,
        editRole:false,
        role: this.roleModel,
        loading:false
      })
    })
    .catch((error)=> {
      alert(error);
    })
  }
  
  componentDidMount(){
    this.reloadRoleData();
  }
  
  handleToggle = () => {
    this.setState({
      createNew: true,
      role: this.roleModel
    })
  }
  
  handleClose = () => {
    this.setState({
      createNew:false,
      deleteRole:false,
      editRole:false,
      viewRole:false,
      role: this.roleModel
    })
  }
  
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      role: {
        ...this.state.role,
        [name]: value
      }
    })
  }
  
  handleSubmit = () => {
    const { role, createNew } = this.state;
    let newRole = {
      code: role.code,
      name: role.name,
      description: role.description,
      is_delete:0
    }
    
    if (createNew) {
      axios.post(config.url + '/m-role', newRole)
      .then(res => {
        this.reloadRoleData();
        alert('Data Saved! New Role has been added');
      })
      .catch((error) => {
        alert(error)
      })
    }else{
      axios.put(config.url + '/m-role/' + role._id, newRole)
      .then(res => {
        this.reloadRoleData();
        alert('Data Updated! New Role has been updated');
      })
      .catch((error) => {
        alert(error)
      })
    }
  }

  handleEdit = (_id) => {
    const { roles } = this.state;
    const role = roles.find(m => m._id === _id);
    this.setState({
      editRole: true,
      role:{
        _id: role._id,
        code: role.code,
        name: role.name,
        description: role.description
      }
    })
  }

  handleDelete = (_id) => {
    const { roles } = this.state;
    const role = roles.find(m => m._id === _id);
    this.setState({
      deleteRole: true,
      role:{
        _id: role._id,
        code: role.code,
        name: role.name,
        is_delete:role.is_delete,
        description: role.description
      }
    })
  }

  handleView = (_id) => {
    const { roles } = this.state;
    const role = roles.find(m => m._id === _id);
    this.setState({
      viewRole: true,
      role:{
        _id: role._id,
        code: role.code,
        name: role.name,
        description: role.description
      }
    })
  }

  handleDeleteConfirm = () => {
    const { role } = this.state;
    let delRole = {
      is_delete: role.is_delete+1,
    }
    axios.put(config.url + '/m-role/' + role._id, delRole)
        .then(res => {
            this.reloadRoleData();
            alert('Data Deleted! Role has been deleted. \n');
        })
        .catch((error) => {
            alert(error)
        })
  }
  
  render(){
    const { roles, loading } = this.state;
    const { classes } = this.props;
    let i=1;
    return(
      <div>
      <h3 style={{color:'#3f51b5'}}><center>List Role</center></h3>
      <CreateRole createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} role={this.state.role} />
      <DeleteRole deleteRole={this.state.deleteRole} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} role={this.state.role}/>
      <ViewRole viewRole={this.state.viewRole} handleClose={this.handleClose} role={this.state.role}/>
      <EditRole editRole={this.state.editRole} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} role={this.state.role} />
      <Table>
      <TableHead>
      <TableRow>
      <TableCell style={{fontWeight:"bold", color:"black"}}>No</TableCell>
      <TableCell style={{fontWeight:"bold", color:"black"}}>Role Code</TableCell>
      <TableCell style={{fontWeight:"bold", color:"black"}}>Role Name</TableCell>
      <TableCell style={{fontWeight:"bold", color:"black"}}>Create Date</TableCell>
      <TableCell style={{fontWeight:"bold", color:"black"}}>Create By</TableCell>
      {/* <TableCell style={{fontWeight:"bold", color:"black"}}>Is delete</TableCell> */}
      <TableCell style={{textAlign:"center",fontWeight:"bold", color:"black"}}>Action</TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
      {roles.map(n => {
        return (
          <TableRow key={n._id}>
          <TableCell>{i++}</TableCell>
          <TableCell component="th" scope="row">
          {n.code}
          </TableCell>
          <TableCell>{n.name}</TableCell>
          <TableCell>{n.createDate}</TableCell>
          <TableCell>createBy</TableCell>
          {/* <TableCell>{n.is_delete}</TableCell> */}
          <TableCell style={{textAlign:"center"}}>
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
    alignSlef: 'center',
    top: '50%',
    alignItem: 'center'
  },
});

Roles.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Roles);