import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateMenu from './create';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import EditMenu from './edit';
import DeleteMenu from './delete';
import ViewMenu from './view';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Menus extends React.Component {
  
  menuModel = {
    _id: '',
    code:'',
    name:'',
    controller:'',
    createDate: '',
    is_delete: '',
    parent_id:''
  }
  
  constructor(props){
    super(props);
    this.state = {
      menus: [],
      createNew: false,
      deleteMenu:false,
      editMenu:false,
      loading: true,
      menu:this.menuModel
    }
  }
  
  reloadMenuData = () => {
    axios.get(config.url + '/m_menu_view')
    .then(res => {
      this.setState({
        menus: res.data,
        createNew: false,
        deleteMenu:false,
        editMenu:false,
        menu: this.menuModel,
        loading:false
      })
    })
    .catch((error)=> {
      alert(error);
    })
  }
  
  componentDidMount(){
    this.reloadMenuData();
  }
  
  handleToggle = () => {
    this.setState({
      createNew: true,
      menu: this.menuModel
    })
  }
  
  handleClose = () => {
    this.setState({
      createNew:false,
      deleteMenu:false,
      editMenu:false,
      viewMenu:false,
      menu: this.menuModel
    })
  }
  
  handleChange = name => ({ target: { value } }) => {
    this.setState({
      menu: {
        ...this.state.menu,
        [name]: value
      }
    })
  }
  
  handleSubmit = () => {
    const { menu, createNew } = this.state;
    let newMenu = {
      code: menu.code,
      name: menu.name,
      controller: menu.controller,
    }
    if(menu.parent_id){
      newMenu.parent_id=menu.parent_id
    }else{
      newMenu.parent_id=null
    }
    console.log(newMenu);

    if (createNew) {
      axios.post(config.url + '/m-menu', newMenu)
      .then(res => {
        this.reloadMenuData();
        alert('Data Saved! New menu has been added');
      })
      .catch((error) => {
        alert(error)
      })
    }else{
      axios.put(config.url + '/m-menu/' + menu._id, newMenu)
      .then(res => {
        this.reloadMenuData();
        alert('Data Updated! New menu has been updated');
      })
      .catch((error) => {
        alert(error)
      })
    }
  }

  handleEdit = (_id) => {
    const { menus } = this.state;
    const menu = menus.find(m => m._id === _id);
    this.setState({
      editMenu: true,
      menu:{
        _id: menu._id,
        code: menu.code,
        name: menu.name,
        controller: menu.controller,
        parent_id:menu.parent_id
      }
    })
  }

  handleDelete = (_id) => {
    const { menus } = this.state;
    const menu = menus.find(m => m._id === _id);
    this.setState({
      deleteMenu: true,
      menu:{
        _id: menu._id,
        code: menu.code,
        name: menu.name,
        controller: menu.controller,
        is_delete:menu.is_delete
      }
    })
  }

  handleView = (_id) => {
    const { menus } = this.state;
    const menu = menus.find(m => m._id === _id);
    this.setState({
      viewMenu: true,
      menu:{
        _id: menu._id,
        code: menu.code,
        name: menu.name,
        controller: menu.controller,
        parent:menu.parent
      }
    })
  }

  handleDeleteConfirm = () => {
    const { menu } = this.state;
    let delMenu = {
      is_delete: menu.is_delete+1,
    }
    axios.put(config.url + '/m-menu/' + menu._id, delMenu)
        .then(res => {
            this.reloadMenuData();
            alert('Data Deleted! Menu has been deleted. \n');
        })
        .catch((error) => {
            alert(error)
        })
  }
  
  render(){
    const { menus, loading } = this.state;
    const { classes } = this.props;
    let i=1;
    return(
      <div>
      <h3 style={{color:'#3f51b5'}}><center>List Menu</center></h3>
      <CreateMenu createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} menu={this.state.menu} menus={this.state.menus} />
      <DeleteMenu deleteMenu={this.state.deleteMenu} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} menu={this.state.menu}/>
      <ViewMenu viewMenu={this.state.viewMenu} handleClose={this.handleClose} menu={this.state.menu}/>
      <EditMenu editMenu={this.state.editMenu} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} menu={this.state.menu} menus={this.state.menus}/>
      <Table>
      <TableHead>
      <TableRow>
      <TableCell style={{fontWeight:"bold", color:"black"}}>No</TableCell>
      <TableCell style={{fontWeight:"bold", color:"black"}}>Menu Code</TableCell>
      <TableCell style={{fontWeight:"bold", color:"black"}}>Menu Name</TableCell>
      <TableCell style={{fontWeight:"bold", color:"black"}}>Create Date</TableCell>
      <TableCell style={{fontWeight:"bold", color:"black"}}>Create By</TableCell>
      {/* <TableCell style={{textAlign:"center",fontWeight:"bold", color:"black"}}>is_delete</TableCell> */}
      <TableCell style={{textAlign:"center",fontWeight:"bold", color:"black"}}>Action</TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
      {menus.map(n => {
        return (
          <TableRow key={n._id}>
          <TableCell>{i++}</TableCell>
          <TableCell component="th" scope="row">
          {n.code}
          </TableCell>
          <TableCell>{n.name}</TableCell>
          <TableCell>{n.createDate}</TableCell>
          <TableCell>createBy</TableCell>
          {/* <TableCell style={{textAlign:"center"}}>{n.is_delete}</TableCell> */}
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

Menus.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menus);