import React, {useState} from "react";


const LogIn = () => {

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

    const SignIn = e => {
        e.preventDefault();
        console.log("signInTest")
    }
    return(
        <div>
            <form onSubmit={SignIn}>
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