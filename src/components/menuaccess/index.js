
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Search';
import EditMenuAccess from './edit';
import DeleteMenuAccess from './delete';

import CreateMenuAccess from './create';
import ViewMenuAccess from './view';

import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


class MenuAccess extends React.Component {

    menuaccessModel =
        {
            _id: '',
            m_role_id: '',
            m_menu_id: '',
            description: '',
            createDate: '',
            createBy: '',
            menu: [],
            
        }

    constructor(props) {
        super(props);
        this.state = {
            m_menu_access: [],
            menu: [],
            role: [],
            menuAccesByRoleId: [],
            createNew: false,
            editMenuAccess: false,
            deleteMenuAccess: false,
            viewMenuAccess: false,
            loading: true,
            menuaccess: this.menuaccessModel,
            checked: []

        }
    }

    toggleCheckbox = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };


    reloadMenuAccessData = () => {
        axios.get(config.url + '/m_menu_access_aggregate')
            .then(res => {
                this.setState({
                    m_menu_access: res.data,
                    createNew: false,
                    editMenuAccess: false,
                    deleteMenuAccess: false,
                    menuaccess: this.menuaccessModel,
                    loading: false
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
                    role: res.data
                })

            })
            .catch((error) => {
                alert(error);
            })
    }

    reloadMenuData = () => {
        axios.get(config.url + '/m-menu')
            .then(res => {
                this.setState({
                    menu: res.data
                })

            })
            .catch((error) => {
                alert(error);
            })
    }


    componentDidMount() {
        this.reloadMenuAccessData();
        this.reloadMenuData();
        this.reloadRoleData();
    }



    handleToggle = () => {
        this.setState({
            createNew: true,
            menuaccess: this.menuaccessModel

        })
    }


    handleClose = () => {
        this.setState({
            createNew: false,
            editMenuAccess: false,
            deleteMenuAccess: false,
            viewMenuAccess: false,
            menuaccess: this.menuaccessModel

        });
    }
    //bisa diketik
    handleChange = name => ({ target: { value } }) => {
        this.setState({
            menuaccess: {
                ...this.state.menuaccess,
                [name]: value
            }
        })
    }

    handleChangeCheckBox = name => event => {
        this.setState({
            menuaccess: {
                ...this.state.menuaccess,
                [name]: event.target.checked
            }
        })
    }

    handleSubmit = () => {
        const { menuaccess, createNew, checked } = this.state;
        let objArray = [];
        let objMenuId = [];

        for (let key in checked) {
            let newMenuAccess =
            {
                m_role_id: menuaccess.m_role_id,
                m_menu_id: checked[key],
                createDate : menuaccess.createDate
            }

            objArray.push(newMenuAccess);
        }

        if (createNew) {
            axios.post(config.url + '/m-menu-access', objArray)

                .then(res => {

                    this.reloadMenuAccessData();
                    alert('Data Saved!');
                })
                .catch((error) => {
                    alert(error)
                })
                
                
        } 
        
        else {
            let newMenuAccess = [];
            let coba = [];
            newMenuAccess.push(menuaccess);

            for(let key in objArray){
               coba.push(objArray[key].m_menu_id);
            }

            console.log(objMenuId);

            if(coba.length >= newMenuAccess.length){
                for(let key in coba){
                    if(!(newMenuAccess.includes(coba[key]))){
                        // newMenuAccess.push(coba[key]);
                        objArray[key].m_menu_id = coba[key];
                        console.log(objArray);
                    }
                }
            }
        }
    }

    handleEdit = (_id) => {
        const { m_menu_access } = this.state;
        const menuaccess = m_menu_access.find(u => u._id === _id);
        let checked = [];
        menuaccess.menu.forEach(m => {
            checked.push(m._id);
        });
        this.setState({
            editMenuAccess: true,
            menuaccess: {
                _id: menuaccess._id, // ini rada aneh
                m_role_id: menuaccess._id, // ini yg ditambahkan
                name: menuaccess.name,
                menu: menuaccess.menu,
                code: menuaccess.code,
                description: menuaccess.description
            },
            checked: checked
        })
    }
    

    handleDelete = (_id) => {
        const { m_menu_access } = this.state;
        const menuaccess = m_menu_access.find(u => u._id === _id);
        //ditambahkan dari sini
        let checked = [];
        menuaccess.menu.forEach(m => {
            checked.push(m._id);
        });
        // sampai disini
        this.setState({
            deleteMenuAccess: true,
            menuaccess: {
                _id: menuaccess._id,
                m_role_id: menuaccess.m_role_id,
                m_menu_id: menuaccess.m_menu_id,
                createDate: menuaccess.createdDate,
                createBy: menuaccess.createBy,
                code: menuaccess.code
            },
            checked: checked // ini juga ditambkan
        })
    }

    handleView = (_id) => {
        const { m_menu_access } = this.state;
        const menuaccess = m_menu_access.find(u => u._id === _id);
        //ditambahkan dari sini
        let checked = [];
        menuaccess.menu.forEach(m => {
            checked.push(m._id);
        });
        // sampai disini
        this.setState({
            viewMenuAccess: true,
            menuaccess: {
                _id: menuaccess._id,
                m_role_id: menuaccess.m_role_id,
                m_menu_id: menuaccess.m_menu_id,
                createDate: menuaccess.createdDate,
                createBy: menuaccess.createBy,
                code: menuaccess.code
            },
            checked: checked // ini juga ditambkan
        })
    }

    handleDeleteConfirm = () => {
        const { menuaccess } = this.state;

        axios.delete(config.url + '/m-menu-access/' + menuaccess._id)
            .then(res => {
                this.reloadMenuAccessData();
                alert('Menu Access has been deleted');
            })
            .catch((error) => {
                alert(error);
            })

    }

    


       
    

    render() {
        const { m_menu_access, loading } = this.state;


        const { classes } = this.props;
        return (
            <div>
                <h3><center>List of Menu Access</center></h3>
                <CreateMenuAccess createNew={this.state.createNew} toggleCheckbox={this.toggleCheckbox} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} menuaccess={this.state.menuaccess} role={this.state.role} menu={this.state.menu} checked={this.state.checked} />

                <EditMenuAccess editMenuAccess={this.state.editMenuAccess} toggleCheckbox={this.toggleCheckbox} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} menuaccess={this.state.menuaccess} role={this.state.role} menu={this.state.menu} checked={this.state.checked} />

                <DeleteMenuAccess deleteMenuAccess={this.state.deleteMenuAccess} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} handleChangeCheckBox = {this.handleChangeCheckBox} menuaccess={this.state.menuaccess} role={this.state.role} menu={this.state.menu} checked={this.state.checked} />

                <ViewMenuAccess viewMenuAccess={this.state.viewMenuAccess} checkit={this.handleCheckit} toggleCheckbox={this.toggleCheckbox} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} menuaccess={this.state.menuaccess} role={this.state.role} menu={this.state.menu} checked={this.state.checked} />

                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell style={{fontWeight:"bold", color:"black"}}>Role Code</TableCell>
                        <TableCell style={{fontWeight:"bold", color:"black"}}>Role Name</TableCell>
                        <TableCell style={{fontWeight:"bold", color:"black"}}>Created Date</TableCell>
                        <TableCell style={{fontWeight:"bold", color:"black"}}>Create By</TableCell>
                        <TableCell style={{textAlign:"center",fontWeight:"bold", color:"black"}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {m_menu_access.map(n => {

                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {n.code}
                                    </TableCell>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>{n.createDate}</TableCell>
                                    <TableCell>{n.createBy}</TableCell>
                                    <TableCell style={{textAlign:"center"}}>
                                        <IconButton><EditIcon onClick={() => this.handleEdit(n._id)} color="primary" /></IconButton>
                                        <IconButton><DeleteIcon onClick={() => this.handleDelete(n._id)} color="primary" /></IconButton>
                                        <IconButton><ViewIcon onClick={() => this.handleView(n._id)} color="primary" /></IconButton>
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
    },
});

MenuAccess.PropTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAccess);


