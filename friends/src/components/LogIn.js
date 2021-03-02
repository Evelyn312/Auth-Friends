import React, {useState} from "react";

import {axiosWithAuth} from "../utils/axiosWithAuth";


const LogIn = (props) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    }) 

    const handleChange = e => {
        // console.log("test", e.target.value)
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }

    const LogIn = e => {
        e.preventDefault();
        console.log("signInTest", credentials)
        //make post req and sent to api
        axiosWithAuth()
        .post("/api/login", credentials)
        .then(res => {
            console.log("testRes", res)
            window.localStorage.setItem("token", res.data.payload);
            props.history.push("/friends");
        })
        .catch(err => console.log({err}))


    }
    return(
        <div>
            <form onSubmit={LogIn}>
                <label htmlFor="username">
                    <input 
                        name="username"
                        type="text"
                        placeholder="username"
                        id="username"
                        onChange={handleChange}
                        value={credentials.username}
                    />
                </label>
                <label htmlFor="password">
                    <input 
                        name="password"
                        type="text"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                        value={credentials.password}
                    />
                </label>
                <label>
                    <button>
                        Sign In
                    </button>
                </label>
                {/* {credentials.username}{credentials.password} */}
            </form>
        </div>
    )

}

export default LogIn;
