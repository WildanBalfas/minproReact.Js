import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Home, Help } from '../content';
import { Link, Route, Redirect } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/AppsRounded';
import RoleIcon from '@material-ui/icons/MeetingRoomRounded'
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Company from '../company';
import Souvenir from '../souvenir';
import Menu from '../menu';
import Role from '../role';
import Events from '../event';
import Unit from '../unit';
import MenuAccess from '../menuaccess';
import Users from '../users';
import Employee from '../employees';
import Design from '../tdesign';
import Promotion from '../promotion';
import Product from '../product';
import TSouvenir from '../t_souvenir';
import LoginPage from '../access/login';
import { isLogged } from '../configuration/config';

export default class SideBar extends React.Component {
    render() {
        const { classes, onSelected, showMenu } = this.props;
        return (
            <div>
                <Drawer style={{visibility: (isLogged() ? 'visible': 'hidden')}} variant='temporary' anchor='left' open={showMenu} onClick={() => onSelected()}>
                    <div className={classes.toolbar} >
                        <IconButton>
                            <ChevronLeftIcon />
                        </IconButton>
                        Menu
                    </div>
                    <Divider />
                    <List onClick={() => onSelected()}>
                        <ListItem className={classes.ListItem}><Link to="/" className={classes.MenuList}>Home</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/users" className={classes.MenuList}>Users</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/employees" className={classes.MenuList}>Employees</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/design" className={classes.MenuList}>Design</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/promotion" className={classes.MenuList}>Promotion</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/company" className={classes.MenuList}>Company</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/souvenir" className={classes.MenuList}>Souvenir</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/product" className={classes.MenuList}>Master Product</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/tsouveniradd" className={classes.MenuList}>Transaksi Add Souvenir</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/menu" className={classes.MenuList}>Menu</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/role" className={classes.MenuList}>Role</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/event" className={classes.MenuList}>Event</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/unit" className={classes.MenuList}>Unit</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/menuaccess" className={classes.MenuList}>Menu Access</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/help" className={classes.MenuList}>Help</Link></ListItem>
                        <ListItem className={classes.ListItem}><Link to="/login" className={classes.MenuList}>Login</Link></ListItem>
                    </List>
                </Drawer>
                <Route exact path="/" component={Home} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/employees" component={Employee} />
                <Route exact path="/design" component={Design} />
                <Route exact path="/promotion" component={Promotion} />
                <Route exact path="/company" component={Company} />
                <Route exact path="/souvenir" component={Souvenir} />
                <Route exact path="/product" component={Product} />
                <Route exact path="/tsouveniradd" component={TSouvenir} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/role" component={Role} />
                <Route exact path="/event" component={Events} />
                <Route exact path="/unit" component={Unit} />
                <Route exact path="/menuaccess" component={MenuAccess} />
                <Route exact path="/login" component={LoginPage} />
                
            </div>
        )
    }
}