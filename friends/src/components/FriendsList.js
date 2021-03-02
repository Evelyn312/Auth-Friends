import React from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

class FriendsList extends React.Component {
    state = {
        friends: [],
        form: {
            name: "",
            age: "",
            email: ""
        },
        edit: false
    };

    componentDidMount(){
        this.fetchFriends();
    }
    fetchFriends = () => {
        axiosWithAuth()
        .get("api/friends")
        .then(res => {
            this.setState({
                friends: res.data
            })
        })
        .catch(err => console.log({err}))
    }
    addFriend = (e) => {
        console.log("testfriendform", this.state.form)
        e.preventDefault();
        axiosWithAuth()
        .post("api/friends", this.state.form)
        .then(res => {
            console.log("testAddFriend", res)
            this.setState({
                ...this.state.friends,
                friends: res.data,
                form: {
                    name: "",
                    age: "",
                    email: ""
                }
            })
        })
        .catch(err => console.log({err}))
    }
    moreInfo = (id) => {
        axiosWithAuth()
        .get(`api/friends/${id}`)
        .then(res => {
            // console.log("testfriend", res)
            this.setState({friend: res.data})
            
        })
        .catch(err => console.log({err}))
    }
    handleChanges = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    handleEdit = e => {
        this.setState({
            friend: {
                ...this.state.friend,
                [e.target.name]: e.target.value
            }
        })
    }
    deleteFriend = id => {
        axiosWithAuth()
        .delete(`api/friends/${id}`)
        .then(res => {
            // console.log("testfriend", res)
            this.setState({friends: this.state.friends.filter(friend => friend.id !== id)})
        })
        .catch(err => console.log({err}))
    
    }
    editFriend = e => {
     this.setState({edit: !this.state.edit})
     console.log('edit ', this.state.edit);
    }
    saveEdit = e => {
        e.preventDefault();
        console.log("testFriendEdit", this.state.friend)
        axiosWithAuth()
        .put(`api/friends/${this.state.friend.id}`, this.state.friend)
        .then(res => {
            this.setState({
                edit: false
            })

        })
        .catch(err => console.log({err}))

    }

    render(){
        return(
            <div>
               
                <h3>Your Friends</h3>
                <form>
                    <label htmlFor="name">
                        <input 
                            type="text"
                            placeholder="name"
                            name="name"
                            id="name"
                            value={this.state.form.name}
                            onChange={this.handleChanges}

                        />
                    </label>
                    <label htmlFor="age">
                        <input 
                            type="number"
                            placeholder="age"
                            name="age"
                            id="age"
                            value={this.state.form.age}
                            onChange={this.handleChanges}
                        />
                    </label>
                    <label>
                        <input 
                            type="email"
                            placeholder="email"
                            name="email"
                            id="email"
                            value={this.state.form.email}
                            onChange={this.handleChanges}
                        />
                    </label>
                    <button onClick={this.addFriend}>Add New Friend</button>    
                </form>
                {
                    this.state.friends.map( (friend) => {
                        return(
                            <div key={friend.id}>
                                <h4>Name:{friend.name}</h4>
                                {(!this.state.friend || this.state.friend.id !== friend.id) ? <button onClick={() => this.moreInfo(friend.id)}>More Info</button> : null}
                                
                                
                                {(this.state.friend && friend.id === this.state.friend.id) ? 
                                    <div>
                                        <form>
                                        <label htmlFor="age">
                                            <input 
                                                type="number"
                                                placeholder="age"
                                                name="age"
                                                id="age"
                                                value={this.state.friend.age}
                                                onChange={this.handleEdit}
                                                disabled={!this.state.edit}

                                            />
                                        </label>
                                        <label htmlFor="email">
                                            <input 
                                                type="text"
                                                placeholder="email"
                                                name="email"
                                                id="email"
                                                value={this.state.friend.email}
                                                onChange={this.handleEdit}
                                                disabled={!this.state.edit}
                                            />
                                        </label>
                                        <button onClick={this.saveEdit} disabled={!this.state.edit}>Save</button>
                                        </form>
                                        
                                        <button onClick={() => this.deleteFriend(friend.id)}>Delete</button>
                                        <button onClick={() => this.editFriend()}>Edit</button>
                                    </div> : null
                                }

                            </div>
                        )
                    }) 
                }
            </div>
        )   
    }
}

export default FriendsList;