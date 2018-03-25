import React from 'react';
import FoodMenuList from '../Container/FoodMenuList';
import { HashRouter, Router, Route, BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Payment from '../Container/payment';
import AdminPage from '../Container/adminPage';

var adminTheme = JSON.parse(localStorage.getItem('secondaryColor'))

const theme = getMuiTheme({
    raisedButton: {
        secondaryColor: adminTheme ? adminTheme : '#4CAF50',
    },

});


export default class App extends React.Component {

 
    render() {

        return (


            <MuiThemeProvider muiTheme={theme}>

                <div>

                    <Route exact path="/" component={FoodMenuList} />
                    <Route path="/payment" component={Payment} />
                    <Route path="/admin" component={AdminPage} />

                </div>

            </MuiThemeProvider>

        );
    }
}




