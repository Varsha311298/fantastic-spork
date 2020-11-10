import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import LoginPage from './LoginPage';
import Hotels from './Hotels';
import OrderPage from './OrderPage';
import { Switch, Route, Redirect} from 'react-router-dom';
import { getRestaurants, registerUser, loginUser, logoutUser, setOrder } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        user: state.user,
        restaurants: state.restaurants
    }
}
const mapDispatchToProps = (dispatch) => ({
    getRestaurants: (lat, lon) => {dispatch(getRestaurants(lat, lon))},
    registerUser: (firstName, lastName, email, password) => dispatch(registerUser(firstName, lastName, email, password)),
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    logoutUser: () => {dispatch(logoutUser())},
    setOrder: (items) => dispatch(setOrder(items))
})

class Main extends Component {
    render() {
        const HotelsPage = () => {
            return(
                <Hotels getRestaurants={this.props.getRestaurants} restaurants={this.props.restaurants}/>
            );
        }
        const Orders = ({match}) => {
            return (
                <OrderPage dish={this.props.restaurants.restaurants.filter((x) => x.restaurant.R.res_id === parseInt(match.params.id, 10))[0]} setOrder={this.props.setOrder}/>
            );
        }

        return (
            <>
                <Header  registerUser={this.props.registerUser} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser} user={this.props.user.name}/>
                <Switch>
                    <Route path="/home" component={LoginPage}/>
                    <Route path="/search" component={HotelsPage}/>
                    <Route path="/cart/:id" component={Orders}/>
                    <Redirect to="/home" />
                </Switch>
            </>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));