import React, { Component } from 'react';
import Header  from './layout/header';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter} from 'react-router-dom';
import './App.css';

const theme = createMuiTheme()
export default class extends Component {
    
    render() {
        return (
           <MuiThemeProvider theme={theme}>
               <BrowserRouter> 
               <div >
                   <Header/>
               </div>
               </BrowserRouter>
           </MuiThemeProvider>
        )
    }
}