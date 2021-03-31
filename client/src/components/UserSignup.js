import {Fragment} from "react";
import React from "react";
import Footer from "./Footer";
import "./style.css";
class UserSignUpForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = async (event) =>{
        try{
        event.preventDefault();
        const data = new FormData(event.target);
        //console.log(data); // reference by form input's `name` tag
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        console.log(JSON.stringify(object));
        const resp = await fetch('http://localhost:5000/mender/users',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object)
        });
        console.log(resp);
        window.location = "/user-login";
    }
    catch(err){
        console.error(err.message);
    }
    };
    
    render(){return (
        <Fragment >
        <div className="container">
                    <form className="form-area" style={{float:"right",width:"50vw"}} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control " name="emailus" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control " name="usernameus" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" className="form-control " name="ageus" placeholder="Age in years"/>
                        </div>
                        <div className="form-group">
                            <label >Gender</label><br/>
                            <input className="form-check-input m-1" type="radio"  name="genderus" value="male"/>
                            <label className="form-check-label ml-4" for="male">Male</label><br/>
                            <input className="form-check-input m-1" type="radio"  name="genderus" value="female"/>
                            <label className="form-check-label ml-4" for="female">Female</label><br/>
                            <input className="form-check-input m-1" type="radio"  name="genderus" value="transgender"/>
                            <label className="form-check-label ml-4" for="other">Transgender</label><br/>
                            <input className="form-check-input m-1" type="radio"  name="genderus" value="other"/>
                            <label className="form-check-label ml-4" for="other">Prefer not to say</label><br/>
                        </div>
                        <div className="form-group">
                            <label>Credit Card Number</label>
                            <input type="text" className="form-control " name="creditus" placeholder="XXXXXXXXXXXX"/>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" className="form-control " name="phoneus" placeholder="XXXXXXXXXX"/>
                        </div>
                        <div className="form-group">
                            <label>Whatsapp Number</label>
                            <input type="text" className="form-control " name="phonewtspus" placeholder="XXXXXXXXXX"/>
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control " name="passwdus" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary ">Sign up</button>
                    
                    </form>
                    </div>
                    <Footer/>

        </Fragment>
    );
    }
}


export default UserSignUpForm;