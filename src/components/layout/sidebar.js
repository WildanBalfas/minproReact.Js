import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Home, Help } from '../content';
import { Link, Route } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import RoleIcon from '@material-ui/icons/MeetingRoomRounded';
import MenuIcon from '@material-ui/icons/Apps';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';

import Company from '../company';
import Menu from '../menu';
import Role from '../role';

export default class SideBar extends React.Component {
    render() {
        const { classes, onSelected, showMenu } = this.props;
        return (
            <div>
                <Drawer variant='temporary' anchor='left' open={showMenu} onClick={() => onSelected()}>
                    <div className={classes.toolbar} >
                        <IconButton>
                            <ChevronLeftIcon />
                        </IconButton>
                        Menu
                    </div>
                    <Divider />
                    <List onClick={() => onSelected()}>
                        <ListItem className={classes.ListItem}><HomeIcon className={classes.MenuIcon} /><Link to="/" className={classes.MenuList}>Home</Link></ListItem>
                        <ListItem className={classes.ListItem}><HomeIcon className={classes.MenuIcon} /><Link to="/company" className={classes.MenuList}>Company</Link></ListItem>
                        <ListItem className={classes.ListItem}><MenuIcon className={classes.MenuIcon} color="primary"/><Link to="/menu" className={classes.MenuList}>Menu</Link></ListItem>
                        <ListItem className={classes.ListItem}><RoleIcon className={classes.MenuIcon} color="primary"/><Link to="/role" className={classes.MenuList}>Role</Link></ListItem>
                        <ListItem className={classes.ListItem}><HelpIcon className={classes.MenuIcon} /><Link to="/help" className={classes.MenuList}>Help</Link></ListItem>
                    </List>
                </Drawer>
                <Route exact path="/" component={Home} />
                <Route exact path="/company" component={Company} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/role" component={Role} />
                <Route exact path="/help" component={Help} />
            </div>
        )
    }
}