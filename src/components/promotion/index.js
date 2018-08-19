import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import CreatePromo from './create';
// import EditPromo from './edit';
// import DeletePromo from './delete';
// import ViewPromo from './view';
import { config } from '../configuration/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

class Promotions extends React.Component {

  promoModel = {
    _id: '',
    code: '',
    flag_design: '',
    title: '',
    t_event_id: '',
    t_design_id: '',
    is_delete: '',
    note: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      promos: [],
      employes: [],
      events: [],
      designs: [],
      createNew: false,
      deletePromo: false,
      editPromo: false,
      subSelect: false,
      loading: true,
      promo: this.promoModel
    }
  }

  reloadEmployeeData = () => {
    axios.get(config.url + '/m_employee_role')
      .then(res => {
        this.setState({
          employes: res.data,
          loading: false,
        })
      })
      .catch((error) => {
        alert(error);
      })
  }

  reloadEventData = () => {
    axios.get(config.url + '/t-event')
      .then(res => {
        this.setState({
          events: res.data,
          loading: false,
        })
      })
      .catch((error) => {
        alert(error);
      })
  }

  reloadDesignData = () => {
    axios.get(config.url + '/t-design')
      .then(res => {
        this.setState({
          designs: res.data,
          loading: false,
        })
      })
      .catch((error) => {
        alert(error);
      })
  }

  reloadPromoData = () => {
    axios.get(config.url + '/t_promotion_ctrl')
      .then(res => {
        this.setState({
          promos: res.data,
          createNew: false,
          deletePromo: false,
          editPromo: false,
          promo: this.promoModel,
          loading: false
        })
      })
      .catch((error) => {
        alert(error);
      })
  }

  componentDidMount() {
    this.reloadPromoData();
    this.reloadEmployeeData();
    this.reloadEventData();
    this.reloadDesignData();
  }

  handleToggle = () => {
    this.setState({
      createNew: true,
      subSelect: false,
      promo: this.promoModel
    })
  }

  handleClose = () => {
    this.setState({
      createNew: false,
      deletePromo: false,
      editPromo: false,
      viewPromo: false,
      promo: this.promoModel
    })
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      promo: {
        ...this.state.promo,
        [name]: value
      }
    })
  }

  handleSubmit = () => {
    const { promo, createNew } = this.state;
    let newPromo = {
      code: promo.code,
    }

    if (createNew) {
      axios.post(config.url + '/t-promotion', newPromo)
        .then(res => {
          this.reloadPromoData();
          alert('Data Saved! New Promo has been added');
        })
        .catch((error) => {
          alert(error)
        })
    } else {
      axios.put(config.url + '/t-promotion/' + promo._id, newPromo)
        .then(res => {
          this.reloadPromoData();
          alert('Data Updated! New promo has been updated');
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  handleEdit = (_id) => {
    const { promos } = this.state;
    const promo = promos.find(m => m._id === _id);
    this.setState({
      editPromo: true,
      promo: {
        _id: promo._id,
        code: promo.code,
      }
    })
  }

  handleDelete = (_id) => {
    const { promos } = this.state;
    const promo = promos.find(m => m._id === _id);
    this.setState({
      deletePromo: true,
      promo: {
        _id: promo._id,
        code: promo.code,
      }
    })
  }

  handleView = (_id) => {
    const { promos } = this.state;
    const promo = promos.find(m => m._id === _id);
    this.setState({
      viewPromo: true,
      promo: {
        _id: promo._id,
        code: promo.code,
      }
    })
  }

  handleDeleteConfirm = () => {
    const { promo } = this.state;
    console.log(promo._id);
    axios.delete(config.url + '/t-promotion/' + promo._id)
      .then(res => {
        this.reloadPromoData();
        alert('Data Deleted! Promo has been deleted. \n');
      })
      .catch((error) => {
        alert(error)
      })
  }

  render() {
    const { promos, loading, events, employes, designs } = this.state;
    const { classes } = this.props;
    let i = 1;
    return (
      <div>
        <h3 style={{ color: '#3f51b5' }}><center>List Promotions</center></h3>
        <CircularProgress className={classes.progress} style={{ visibility: (loading ? 'visible' : 'hidden') }} color="secondary" />
        <CreatePromo createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} promo={this.state.promo} events={this.state.events} designs={this.state.designs} />
        {/* <DeletePromo deletePromo={this.state.deletePromo} handleClose={this.handleClose} handleDelete={this.handleDeleteConfirm} promo={this.state.promo}/>
      <ViewPromo viewPromo={this.state.viewPromo} handleClose={this.handleClose} promo={this.state.promo}/>
      <EditPromo editPromo={this.state.editPromo} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleSubmit={this.handleSubmit} promo={this.state.promo} /> */}
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
              <TableCell style={{ fontWeight: "bold", color: "black" }}>Create By</TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>is_delete</TableCell>
              <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promos.map(n => {
              return (
                <TableRow key={n._id}>
                  <TableCell>{i++}</TableCell>
                  <TableCell component="th" scope="row">
                    {n.code}
                  </TableCell>
                  <TableCell>{(n.request_by.first ? n.request_by.first + " " : "") + (n.request_by.last ? n.request_by.last + " " : "")}</TableCell>
                  <TableCell>{n.request_date}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>{n.status}</TableCell>
                  <TableCell>{n.createDate}</TableCell>
                  <TableCell>{(n.created_by.first ? n.created_by.first + " " : "") + (n.created_by.last ? n.created_by.last + " " : "")}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{n.is_delete}</TableCell>
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
    alignSlef: 'center',
    top: '50%',
    alignItem: 'center'
  },
});

Promotions.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Promotions);