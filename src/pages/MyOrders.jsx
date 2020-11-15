import React from 'react';
import { ListGroupItem } from 'reactstrap';

function MyOrders(props) {

    return (

        <div>
            {props.orders.items ? props.orders.items.map((order, index) =>
            <div key={index}>
                
            <h2> Order {index+1} = {order[0].restaurant}</h2>
                <div>
                    {order.length >= 1 ? order.map((ord, i) => 
                        <ListGroupItem key={i}>
                            {ord.name}-{ord.price}
                        </ListGroupItem>
                    ) : <ListGroupItem key={index}>{order.name}-Rs: {order.price}</ListGroupItem>}
                </div>
                <h2>---------------------------------------------------------------------</h2>
                </div>
            ) : <h1>Please reload.</h1>}
        </div>
    )
};


export default MyOrders;