import React, { Component } from 'react';
import { Button, ButtonGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { isLoggedIn } from '../Authorisation';
class OrderPage extends Component {
    constructor() {
        super();
        this.state = {
            Item: '',
            items: [],
            quantity: 1,
            show: true,
            max: 5,
            min: 0,
            amount: 0
        };
    }

    save() {
        var items = [...this.state.items];
        items.push({ 'name': this.state.Item, 'qty': this.state.quantity , 'price': this.state.quantity*this.state.price});
        this.setState({
            items: items,
            quantity: 1,
            price: '',
            Item: ''
        });
    }

    IncrementItem = () => {
        this.setState(prevState => {
            if (prevState.quantity < 9) {
                return {
                    quantity: prevState.quantity + 1
                }
            } else {
                return null;
            }
        });
    }
    DecreaseItem = () => {
        this.setState(prevState => {
            if (prevState.quantity > 0) {
                return {
                    quantity: prevState.quantity - 1
                }
            } else {
                return null;
            }
        });
    }
    ToggleClick = () => {
        this.setState({
            show: !this.state.show
        });
    }
    handleItem = (event) => {
        this.setState({ Item: event.target.value });
    }
    handleQuantity = (event) => {
        this.setState({ quantity: event.target.value });
    }
    handlePrice = (event) => {
        this.setState({price: event.target.value});
    }
    total() {
        var amount = this.state.items.reduce(function(sum, x) { return sum = sum+x.price}, 0);
        this.setState({amount: amount});
        console.log(amount);
    }
    order() {
        this.props.setOrder(this.state.items, this.props.dish.restaurant.name);
    }
    render() {
        return (
            <>
                {isLoggedIn() ? <>
                <img src={this.props.dish.restaurant.thumb} alt={this.props.dish.restaurant.name} />
                <h1>{this.props.dish.restaurant.name}</h1>
                <div className="container">
                    <div className="row">
                        <h4>Add your items here: </h4>
                    </div>
                    <div className="row">
                        <ListGroup>
                            {this.state.items.map(function (item, index) {
                                return <ListGroupItem key={index}>{item.name} Qty: {item.qty} Price: {item.price}</ListGroupItem>
                            })}
                        </ListGroup>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <Input  value={this.state.Item} onChange={this.handleItem} />
                        </div>

                        <div className="col-1">
                            <Input className="inputne" value={this.state.quantity} onChange={this.handleQuantity} />
                        </div>
                        <div className="col-1">
                            <Input className="price" value={this.state.price} onChange={this.handlePrice} />
                        </div>
                        <div className="col-3">
                            <ButtonGroup>
                                <Button onClick={this.IncrementItem}>+</Button>
                                <Button onClick={this.DecreaseItem}>-</Button>
                                <Button onClick={this.save.bind(this)} color="success">Add</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div id="total">
                            <br />
                            <p id="total"> Total amount:
                                    <span className="spn">{'\u20B9'}  {this.state.amount}</span>
                            </p>
                            <Button id="pay" outline onClick={this.total.bind(this)}>Calculate </Button>
                            <Button color="info" onClick={this.order.bind(this)}>Pay Now</Button>
                        </div>
                    </div>
                </div> </>: <>Please login to order</>}
                
            </>
        )
    };
}

export default OrderPage;
