import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import CreateEvent from './create';
import EditEvent from './edit';
import ViewEventSubmitted from './viewSubmitted';
import ViewEventInProgress from './viewInProgress';
// import ViewEvent from './view';
import LSData from '../base/base.localstorage';
import { changeValue,changeDateFormat } from '../system/base.function';

class Events extends React.Component {
    eventModel = {
        _id:'',
        code: '',
        event_name: '',
        start_date: '',
        end_date: '',
        place: '',
        budget: '',
        request_by: LSData.loginEmployeeId(),
        requestName: '',
        request_date: new Date().toLocaleDateString(),
        approved_by: '',
        approved_date: '',
        assign_to: '',
        assign_toName: '',
        closed_date: '',
        note: '',
        status: '',
        reject_reason: '',
        is_delete: '',
        created_by: LSData.loginEmployeeId(),
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
            viewEventSubmitted: false,
            viewEventInProgress: false,
            deleteEvent: false,
            loading: true,
            event: this.eventModel,
            rejectEvent: false,
            closeEvent: false,
            viewEvent: false
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
                rejectEvent:false,
                viewEventSubmitted: false,
                viewEventInProgress: false,
                event: this.eventModel,
                loading: false,
                viewEvent: false
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

    componentDidMount() {
        this.reloadEventData();
        this.reloadEmployeeData();
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
            viewEventSubmitted: false,
            viewEventInProgress: false,
            rejectEvent:false,
            event: this.eventModel,
            viewEvent: false
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
            event_name: event.event_name,
            place: event.place,
            budget: event.budget,
            request_date: event.request_date,
            approved_date: event.approved_date,
            closed_date: event.closed_date,
            note: event.note,
            request_by: event.request_by,
            start_date: event.start_date,
            end_date: event.end_date,
            createDate: event.createDate,
            created_by: event.created_by,
            status: 1,
        }

        if(createNew){
            axios.post(config.url + '/t-event', newEvent)
                .then(res => {
                    this.reloadEventData();
                    alert('Data Saved! Transaction event request has been add with the code '+ res.data.ops[0].code);
                })
                .catch((error) => {
                    alert(error)
                })
        }else{
            axios.put(config.url + '/t-event/' +event._id , newEvent)
            .then(res => {
                this.reloadEventData();
                alert('Data Updated! Transaction event request with code '+ res.data.ops[0].code + ' has been updated');
            })
            .catch((error) => {
                alert(error)
            })
        }    
    }
    
    handleEdit = (_id, status) => {
        const { events } = this.state;
        const event = events.find(u => u._id === _id && u.status === status);
        if(status == 1) {
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
                requestName: event.requestName.first + ' ' + event.requestName.last,
                request_date: event.request_date,
                status: event.status
            }
           
        })
    }
    }

    handleView= (_id, status) => {
        const { events } = this.state;
        const event = events.find(u => u._id === _id && u.status === status);
        if(status == 1){
            this.setState({
                viewEventSubmitted: true,
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
                    request_date: event.request_date,
                    requestName: event.requestName.first + ' ' + event.requestName.last,
                    assign_to: event.assign_to,
                    assign_toName: event.assign_toName.first + ' ' + event.assign_toName.last,
                    
                }
            })
        } else if(status == 2){
            this.setState({
                viewEventInProgress: true,
                closeEvent:false,
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
                    request_date: event.request_date,
                    assign_to: event.assign_to,
                    assign_toName: event.assign_toName.first + ' ' + event.assign_toName.last,
                    requestName: event.requestName.first + ' ' + event.requestName.last,
                }
            })
        } else if(status == 0 || status == 3){
            this.setState({
                viewEvent: true,
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
                    request_date: event.request_date,
                    assign_to: event.assign_to,
                    assign_toName: event.assign_toName,
                    reject_reason:event.reject_reason
                }
            })
        }
      
    }

    handleReject = () => {
        this.setState({
            rejectEvent:true
        })
    }

    handleRejectConfirm = () => {
        const {event} = this.state;
       
        let RejectReq = {
            status: event.status - 1,
        }
        axios.put(config.url + '/t-event/' + event._id, RejectReq)
        .then(res =>{
            this.reloadEventData();
            alert('Data Rejected ! Transaction event request with code '+ res.data.ops[0].code+ ' has been rejected');
        })
        .catch((error) => {
            alert(error);
        })
    }

    handleCloseRequest = () => {
        this.setState({
            closeEvent:true
        })
    }

    handleCloseRequestConfirm = () => {
        const {event} = this.state;
       
        let closeReq = {
            status: event.status + 1,
        }
        axios.put(config.url + '/t-event/' + event._id, closeReq)
        .then(res =>{
            this.reloadEventData();
            alert('Data Closed ! Transaction event request with code '+ res.data.ops[0].code+ ' has been close request !');
        })
        .catch((error) => {
            alert(error);
        })
    }

    handleApproved = () => {
        const {event} = this.state;
       
        let approvedReq = {
            status: event.status + 1,
            assign_to: event.assign_to
        }
        axios.put(config.url + '/t-event/' + event._id, approvedReq)
        .then(res =>{
            this.reloadEventData();
            alert('Data Approved ! Transaction event request with code '+ res.data.ops[0].code+ ' has been approved');
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
                <ViewEventSubmitted viewEventSubmitted={this.state.viewEventSubmitted} handleRejectConfirm={this.handleRejectConfirm} handleApproved={this.handleApproved} rejectEvent={this.state.rejectEvent} handleReject={this.handleReject} handleChange={this.handleChange} handleView={this.handleView} handleClose={this.handleClose} event={this.state.event} employes={this.state.employes}/>
                <ViewEventInProgress viewEventInProgress={this.state.viewEventInProgress} handleCloseRequestConfirm={this.handleCloseRequestConfirm} closeEvent={this.state.closeEvent} handleCloseRequest={this.handleCloseRequest} handleChange={this.handleChange} handleView={this.handleView} handleClose={this.handleClose} event={this.state.event} employes={this.state.employes}/>  
                {/* <ViewEvent viewEvent={this.state.viewEvent} handleChange={this.handleChange} handleView={this.handleView} handleClose={this.handleClose} event={this.state.event}/> */}
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
                                    <TableCell>{(e.requestName.first ? e.requestName.first  + ' ' : '') + 
                                    (e.requestName.last ? e.requestName.last  + ' ' : '')}</TableCell>
                                    <TableCell>{changeDateFormat(e.request_date)}</TableCell>
                                    <TableCell>{changeValue(e.status)}</TableCell>
                                    <TableCell>{changeDateFormat(e.createDate)}</TableCell>
                                    <TableCell>{(e.requestName.first ? e.requestName.first  + ' ' : '') + 
                                    (e.requestName.last ? e.requestName.last  + ' ' : '')}</TableCell>
                                    <TableCell style={{textAlign:'center'}}> <IconButton><SearchIcon onClick={() => this.handleView(e._id, e.status)} /></IconButton>
                                    <IconButton><EditIcon onClick={() => this.handleEdit(e._id, e.status)}/></IconButton>
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

Events.propTypes = {
    classes: propTypes.object.isRequired
};
export default withStyles(styles)(Events);