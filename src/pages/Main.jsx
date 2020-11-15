import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderComponent';
import LoginPage from './LoginPage';
import Hotels from './Hotels';
import OrderPage from './OrderPage';
import MyOrders from './MyOrders';
import { Switch, Route, Redirect} from 'react-router-dom';
import { getRestaurants, registerUser, loginUser, logoutUser, setOrder, fetchOrders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        user: state.user,
        restaurants: state.restaurants,
        orders: state.orders
    }
}
const mapDispatchToProps = (dispatch) => ({
    getRestaurants: (lat, lon) => {dispatch(getRestaurants(lat, lon))},
    registerUser: (firstName, lastName, email, password) => dispatch(registerUser(firstName, lastName, email, password)),
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    logoutUser: () => {dispatch(logoutUser())},
    setOrder: (items, rest) => dispatch(setOrder(items, rest)),
    fetchOrders: () => dispatch(fetchOrders())
})

class Main extends Component {
    render() {
        const HotelsPage = () => {
            return(
                <Hotels getRestaurants={this.props.getRestaurants} restaurants={this.props.restaurants}/>
            );
        }
        const DishPage = ({match}) => {
            return (
                <OrderPage dish={this.props.restaurants.restaurants.filter((x) => x.restaurant.R.res_id === parseInt(match.params.id, 10))[0]} setOrder={this.props.setOrder}/>
            );
        }

        const MyOrdersWithData = () => {
            return (
                <MyOrders orders={this.props.orders.orders} />
            );
        }

        return (
            <>
                <Header  registerUser={this.props.registerUser} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser} user={this.props.user.name} fetchOrders={this.props.fetchOrders}/>
                <Switch>
                    <Route path="/home" component={LoginPage}/>
                    <Route path="/search" component={HotelsPage}/>
                    <Route path="/cart/:id" component={DishPage}/>
                    <Route path="/orders" component={MyOrdersWithData} />
                    <Redirect to="/home" />
                </Switch>
            </>
        );
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));