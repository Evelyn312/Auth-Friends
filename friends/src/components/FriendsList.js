import React from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

class FriendsList extends React.Component {
    state = {
        friends: [],
        friend: {}
    };

    componentDidMount(){
        this.fetchFriends();
    }
    fetchFriends = () => {
        axiosWithAuth()
        .get("api/friends")
        .then(res => {
            // console.log("test rest",res.data)
            this.setState({
                friends: res.data
            })
        })
        .catch(err => console.log({err}))
    }
    // addFriend = () => {
    //     axiosWithAuth()
    //     .post("api/friends")
    //     .then(res => {
    //         console.log("testAddFriend", res)
    //         this.setState({
    //             ...friends,
    //             friend:

    //         })
    //     })
    //     .catch(err => console.log({err}))
    // }
    moreInfo = (id) => {
        axiosWithAuth()
        .get(`api/friends/${id}`)
        .then(res => {
            console.log("testfriend", res)
            this.setState(
                {friend: res.data}
                )
            
        })
        .catch(err => console.log({err}))
    }
    render(){
        return(
            <div>
               
                <h3>Your Friends</h3>
                <button onClick={this.addFriend}>Add New Friend</button>
                {
                    this.state.friends.map( (friend) => {
                        return(
                            <div key={friend.id}>
                                <h4>Name:{friend.name}</h4>
                                <button onClick={() => this.moreInfo(friend.id)}>More Info</button>
                            </div>
                        )
                    })
                    
                }
                {this.state.friend}
                {this.state.friend? 
                    <div>
                        <h5>Age:{this.state.friend.age}</h5>
                        <h5>Email:{this.state.friend.email}</h5>
                        <button>Delete</button>
                    </div> : null
                }
            </div>
        )   
    }
}

export default FriendsList;