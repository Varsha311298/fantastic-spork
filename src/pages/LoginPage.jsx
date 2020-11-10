import React from 'react';
import '../styles/LoginStyle.css'
import Front from '../images/FB.jpg'
import TextInput from '../components/TextInput'
import {getRestaurants} from '../redux/ActionCreators'
import {Jumbotron} from 'reactstrap';

class LoginPage extends React.Component{
    constructor(){
        super();
    }

    onChangeUser=(event)=>{
        this.setState({username:event.target.value})
    }

    onChangePass=(event)=>{
        this.setState({password:event.target.value})
    }
    render(){
        return(
            <div>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
           
            <div id = "container">
            <div id="id1">
                <img src={Front} height="668" width="700" alt="Banner"/>
            </div>
            <center><h1 id="logoApp">Meat & Eat</h1></center>
            <div id = 'id2'>
                <Jumbotron>
                    <div color="rgb(30, 68, 173)">
                    <h1><center>Find the best restaurants, cafés and bars in India</center></h1>
                    </div>
                </Jumbotron>
            </div>
            
        </div>
        </div>
        )
    };
}

export default LoginPage;