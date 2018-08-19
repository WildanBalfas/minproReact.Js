import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import IconSeacrh from '@material-ui/icons/Search';
// import Checkbox from '@material-ui/core/Checkbox';


import CreateProduct from './create';
import ViewProduct from './view';
import EditProduct from './edit';
import DeleteProduct from './delete';
// import EditUser from './edit';
// import DeleteUser from './delete';


import { config } from '../configuration/config';
import axios from 'axios';

class M_Product extends React.Component {

    productModel = {
        _id: '', code: '', name: '',  description: '', is_delete: 0, create_by: '', createDate: '', update_by:'', update_date:''
    }
    
 

    constructor(props) {
        super(props);
        this.state = {
            products: [

            ],
            createNew: false,
            editProduct: false,
            viewProduct: false,
            deleteProduct:false,
            load: true,
            product: {}

        }
    }
    reloadProductData = () => {
        axios.get(config.url + '/m-product')
        .then(res => {
            this.setState({
                products: res.data,
                createNew: false,
                editProduct: false,
                viewProduct:false,
                deleteProduct:false,
                // product: this.productModel,
                load: false
            })
         
        })
        .catch((error) => {
            alert(error);
        })
    }

    componentDidMount() {
        this.reloadProductData();
    }

    handleToggle = () => {
        this.setState({
            createNew: !this.state.createNew,
            product: this.productModel

        })
    }



    handleClose = () => {
        this.setState({
            createNew: false,
            editProduct: false,
            viewProduct: false,
            deleteProduct:false,
            product: this.productModel

        })
    }




    handleChange = name => ({ target: { value } }) => {
        this.setState({
            product: {
                ...this.state.product,
                [name]: value
            }
        })
    }

    // handleChangeCheckBox = name => event =>{
    //     this.setState({
    //         product: {
    //             ...this.state.product,
    //             [name]: event.target.checked
    //         }
    //     })
    // }


    handleSubmit = () => {
        const { products, product, createNew } = this.state;



        let newProduct = {

           
            code: product.code,
            name: product.name,
            description: product.description,
            
        }

        if (createNew) {
           //console.log(newUser)
            axios.post(config.url + '/m-product', newProduct)
                .then(res => {
                    this.reloadProductData();
                    alert('has been saved ' + res.data.ops[0].code);
                    console.log(res.data);
                    

                })
                .catch((error) => {
                    alert(error);
                })

        } else {
            axios.put(config.url + '/m-product/' + product._id, newProduct)
                .then(res =>{
                    
                    this.reloadProductData();
                    console.log(res.data);
                    alert( 'data has been update ' + res.data.code );
                    
                })
                .catch((error) => {
                    alert(error);
                })

        }

    }

    handleEdit = (_id) => {

        const { products } = this.state;
        const product = products.find(u => u._id === _id);

        this.setState({
            editProduct: true,
            product: {
                _id: product._id,
                code: product.code,
                name: product.name,
                description: product.description,
                
            }
        })
    }
    handleView = (_id) => {

        const { products } = this.state;
        const product = products.find(u => u._id === _id);

        this.setState({
            viewProduct: true,
            product: {
                code: product.code,
                name: product.name,
                description: product.description,
          
                
            }
        })
    }

    handleDelete = (_id) => {

        const {products} = this.state;
        const product = products.find(u => u._id === _id );

        this.setState({
            deleteProduct: true,
            product: {
                _id:product._id,
                code:product.code,
                name:product.name,
                is_delete:product.is_delete,
                
            }
        })


    }

    handleDeleteConfirm = () => {
        const { product } = this.state;
       let DelProd = {
           is_delete: product.is_delete+1,
       }
        
        axios.put(config.url + '/m-product/' + product._id, DelProd)
        .then(res =>{
            this.reloadProductData();
            alert('has been deleted');
        })
        .catch((error) => {
            alert(error);
        })
        
    }
  
    render() {
        const { products, load } = this.state;
        const { classes } = this.props;
        let i = 1;

        return (
            <div>
                <h3>List Of Master Product</h3>
                <CreateProduct style={{ alignItem: 'right'  }}createNew={this.state.createNew} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} product={this.state.product}  handleSubmit={this.handleSubmit} />

                <EditProduct editProduct={this.state.editProduct} handleToggle={this.handleToggle} handleClose={this.handleClose} handleChange={this.handleChange} product={this.state.product} handleSubmit={this.handleSubmit} />

                <ViewProduct viewProduct={this.state.viewProduct} handleClose={this.handleClose} product={this.state.product} />

                <DeleteProduct deleteProduct={this.state.deleteProduct} handleClose={this.handleClose} product={this.state.product} handleDeleteConfirm={this.handleDeleteConfirm} />

                <CircularProgress className={classes.progress} style={{ visibility: (load ? 'visible' : 'hidden') }} color="secondary" />

                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:"bolder",color:"black"}}>No</TableCell>
                            
                            <TableCell style={{fontWeight:"bolder",color:"black"}}>Product Code</TableCell>
                            <TableCell style={{fontWeight:"bolder",color:"black"}}>Product Name</TableCell>
                            <TableCell style={{fontWeight:"bolder",color:"black"}}>Description </TableCell>
                            <TableCell style={{fontWeight:"bolder",color:"black"}}>Create Date </TableCell>
                            <TableCell style={{fontWeight:"bolder",color:"black"}}>Create By </TableCell>
                            <TableCell style={{fontWeight:"bolder",color:"black"}}>is Delete </TableCell>
                            <TableCell style = {{textAlign:'center', fontWeight:"bolder",color:"black"}} >Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(n => {
                            return (
                                <TableRow key={n._id}>
                                 <TableCell >{i++}</TableCell>
                                 
                                    <TableCell component="th" scope="row">  {n.code} </TableCell>
                                    <TableCell >{n.name}</TableCell>
                                    <TableCell >{n.description}</TableCell>
                                    <TableCell >{n.createDate}</TableCell>
                                    <TableCell >{n.create_by}</TableCell>
                                    <TableCell >{n.is_delete}</TableCell>
                                    <TableCell style = {{textAlign:'center'}}>
                                      
                                          <IconButton onClick={() => this.handleView(n._id)} ><IconSeacrh  variant="contained" color="default" >Search</IconSeacrh></IconButton>
                                          <IconButton onClick={() => this.handleEdit(n._id)}> <IconEdit  variant="contained" color="primary" >Edit</IconEdit></IconButton>
                                          <IconButton onClick={() => this.handleDelete(n._id)}> <IconDelete  variant="contained" color="secondary" >Delete</IconDelete></IconButton>
                                       
                                       
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
        alignItem: 'center',
    },
});
M_Product.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(M_Product);