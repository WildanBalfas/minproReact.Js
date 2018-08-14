import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Button} from '../../../node_modules/@material-ui/core';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import CreateEvent from './create';
import DeleteEvent from './delete';
import EditEvent from './edit';
import ViewEvent from './view';

class Events extends React.Component {
    eventModel = {
        _id:'',
        code: '',
        event_name: '',
        start_date: '',
        end_date: '',
        place: '',
        budget: '',
        request_by: '',
        requestName: '',
        request_date: '',
        approved_by: '',
        approved_date: '',
        assign_to: '',
        closed_date: '',
        note: '',
        status: '',
        reject_reason: '',
        is_delete: '',
        createBy: '',
        createDate: '',
        updateBy: '',
        updateDate: ''
        
    }

    constructor(props){
        super(props);
        this.state ={ 
            events: [],
            employes: [],
            roles: [],
            users: [],
            createNew: false,
            editEvent: false,
            viewEvent: false,
            deleteEvent: false,
            loading: true,
            event: this.eventModel,
            rejectEvent: false
        }
    }

    reloadEventData = () => {
        axios.get(config.url + '/t_event_aggregation')
        .then(res => {
            this.setState({
                events : res.data,
                createNew: false,
                editEvent: false,
                deleteEvent: false,
                event: this.eventModel,
                loading: false
            })
        })
        .catch((error) => {
            alert(error);
        })
    }

    reloadEmployeeData = () => {
        axios.get(config.url + '/m_employee_role')
        .then(res => {
            this.setState({
                employes: res.data
            })
        })
        .catch((error) => {
            alert(error);
        })
    }

    reloadUserData = () => {
        axios.get(config.url + '/m-user')
        .then(res => {
            this.setState({
                users: res.data
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
        this.reloadEventData();
        this.reloadEmployeeData();
        // this.reloadUserData();
        // this.reloadRoleData();
    }

    handleToggle = () => {
        this.setState({
            createNew:true,
        });
    }

    handleClose = () => {
        this.setState({
            createNew: false,
            editEvent: false,
            deleteEvent: false,
            viewEvent: false,
            event: this.eventModel
        });
    }

    handleChange = name => ({ target: {value}}) => {
        this.setState({
            event: {
                ...this.state.event,
                [name] : value
            }
        })
    }

    handleSubmit = () => {
        const { event, createNew } = this.state;

        let newEvent =
        {
            place: event.place,
            budget: event.budget,
            request_date: event.request_date,
            approved_date: event.approved_date,
            closed_date: event.closed_date,
            note: event.note,
            status: event.status,
            request_by: event.request_by,
            start_date: event.start_date,
            end_date: event.end_date,
            createDate: event.createDate,
            status: 1,
            request_date: new Date().toLocaleDateString()
        }

        if(createNew){
            axios.post(config.url + '/t-event', newEvent)
                .then(res => {
                    this.reloadEventData();
                    alert('Event has been saved');
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
            axios.put(config.url + '/t-event/' +event._id , newEvent)
            .then(res => {
                this.reloadEventData();
                alert('Event has been updated');
            })
            .catch((error) => {
                alert(error)
            })
        }    
    }
    
    handleEdit = (_id) => {
        const { events } = this.state;
        const event = events.find(u => u._id === _id);
        this.setState({
            editEvent: true,
            event: {
                _id: event._id,
                code: event.code,
                event_name: event.event_name,
                start_date: event.start_date,
                end_date: event.end_date,
                place: event.place,
                budget: event.budget,
                approved_by: event.approved_by,
                closed_date: event.closed_date,
                note: event.note,
                request_by: event.request_by,
                requestName: event.requestName,
                request_date: event.request_date,
                status: event.status
            }
           
        })
    }

    handleDelete = (_id) => {
        const { events } = this.state;
        const event = events.find(u => u._id === _id);
        this.setState({
            deleteEvent: true,
            event: {
                _id: event._id,
                code: event.code,
                event_name: event.event_name,
                start_date: event.start_date,
                end_date: event.end_date,
                place: event.place,
                budget: event.budget,
                approved_by: event.approved_by,
                closed_date: event.closed_date,
                note: event.note,
                status: event.status
            }
        })
    }

    handleView = (_id) => {
        const { events } = this.state;
        const event = events.find(u => u._id === _id);
        this.setState({
            viewEvent: true,
            rejectEvent:false,
            event: {
                _id: event._id,
                code: event.code,
                event_name: event.event_name,
                start_date: event.start_date,
                end_date: event.end_date,
                place: event.place,
                budget: event.budget,
                approved_by: event.approved_by,
                closed_date: event.closed_date,
                note: event.note,
                status: event.status,
                request_date: event.request_date
            }
        })
    }

    handleReject = (_id) => {
        const { events } = this.state;
        const event = events.find(u => u._id === _id);
        this.setState({
            rejectEvent: true
        })
    }


    handleDeleteConfirm = () => {
        const { event } = this.state;

        axios.delete(config.url + '/t-event/' + event._id)
        .then(res => {
            this.reloadEventData();
            alert('Event has been deleted');
        })
        .catch((error) => {
            alert(error);
        })

    }

    render() {
        const {events, loading, employes} = this.state;
        const {classes} = this.props;
        let i=1;
       
        return (
            <div>
                <h3><center>List Events</center></h3>
                <CreateEvent createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} event={this.state.event} />
                <EditEvent editEvent={this.state.editEvent} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} event={this.state.event}/>
                <ViewEvent viewEvent={this.state.viewEvent} rejectEvent={this.state.rejectEvent} handleReject={this.handleReject} handleDelete={this.handleDeleteConfirm} handleChange={this.handleChange} handleView={this.handleView} handleClose={this.handleClose} event={this.state.event} employes={this.state.employes}/> 
                <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{fontWeight:900}}>No</TableCell>
                            <TableCell style={{fontWeight:900}}>Transaction Code</TableCell>
                            <TableCell style={{fontWeight:900}}>Request By</TableCell>
                            <TableCell style={{fontWeight:900}}>Request Date</TableCell>
                            <TableCell style={{fontWeight:900}}>Status</TableCell>
                            <TableCell style={{fontWeight:900}}>Create Date</TableCell>
                            <TableCell style={{fontWeight:900}}>Create By</TableCell>
                            <TableCell style={{fontWeight:900, textAlign:'center'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map(e => {
                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row">{i++}</TableCell>
                                    <TableCell component="th" scope="row">{e.code}</TableCell>
                                    <TableCell>{e.requestName}</TableCell>
                                    <TableCell>{e.request_date}</TableCell>
                                    <TableCell>{e.status == 1 ? 'Submitted' : e.status== 2 ? 'In Progress' : 'Done'}</TableCell>
                                    <TableCell>{e.createDate}</TableCell>
                                    <TableCell>{e.createBy}</TableCell>
                                    <TableCell style={{textAlign:'center'}}> <IconButton><SearchIcon onClick={() => this.handleView(e._id)} /></IconButton>
                                    <IconButton><EditIcon onClick={() => this.handleEdit(e._id)}/></IconButton>
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

Events.PropTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Events);