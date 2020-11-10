import React from 'react';
import '../styles/HotelStyle.css'
import data from '../data/data.json'
import RestaurantCard from '../components/RestaurantCard'
import {Button, Input, Col} from 'reactstrap';

class Hotels extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list: data,
            latitude : 11,
            longitude : 76.97676613
        };
    }

    onChange=({coords}) => {
        this.setState({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        console.log(coords.latitude, coords.longitude);
    }
    onError = (error) => {
        console.log(error.message);
    }
    getLocation() {
        const geo = navigator.geolocation;

        const watcher = geo.getCurrentPosition(this.onChange, this.onError);
        console.log(watcher);
    }

    render(){
        
        return(
        <div>
            
            <div className="maincart">

            <div id="menubar">
                <h2 id="menu-title">Choose Your Favourite One</h2>
                <div className="container">
                    <div className="row">
                    
                    </div>
                    <div className="row">
                        <div className="offset-4 col-2">
                            <Button color="dark" onClick={() => {
                                this.getLocation();
                                console.log(this.state.latitude, this.state.longitude);
                                //this.props.getRestaurants(this.state.latitude, this.state.longitude);
                                }}>
                                <span className="fa fa-lg"></span>Set Location
                            </Button>
                            <Button color="dark" onClick={() => {
                                console.log(this.state.latitude, this.state.longitude);
                                this.props.getRestaurants(this.state.latitude, this.state.longitude);
                                }}>
                                <span className="fa fa-lg"></span>Search
                            </Button>
                        </div>
                        <div className="col-5">
                        <Col md={4}>
                            <Input type="text" value={this.state.latitude} onChange={(e)=> this.setState({latitude: e.target.value})} placeholder="lat">
                            </Input>
                        </Col>
                        <Col md={4}>
                            <Input type="text" value={this.state.longitude} onChange={(e)=> this.setState({longitude: e.target.value})}  placeholder="lon">
                            </Input>
                        </Col>   
                        </div>
                    </div>
                </div>
                    
            </div>

            {this.props.restaurants.restaurants.length > 0 ?
                this.props.restaurants.restaurants.map(x => <RestaurantCard name={x.restaurant.name} id={x.restaurant.id}
                thumb={x.restaurant.thumb} cuisines={x.restaurant.cuisines} 
                rating={x.restaurant.user_rating.aggregate_rating} 
                reviews={x.restaurant.user_rating.rating_text} menu={x.restaurant.menu_url}></RestaurantCard>) : null}
        
            
            </div>
        </div>
        )
    };
}

export default Hotels;