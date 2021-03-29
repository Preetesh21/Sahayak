import {Fragment, useState} from "react";
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
        console.log(data); // reference by form input's `name` tag
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
                    <form style={{marginLeft:"50vw",marginBottom:"2vh",marginTop:"2vh"}} onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" name="emailus" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" class="form-control" name="usernameus" placeholder="Username"/>
                        </div>
                        <div class="form-group">
                            <label>Age</label>
                            <input type="number" class="form-control" name="ageus" placeholder="Age in years"/>
                        </div>
                        <div>
                            <label>Gender</label><br/>
                            <input type="radio"  name="genderus" value="male"/>
                            <label for="male">Male</label><br/>
                            <input type="radio"  name="genderus" value="female"/>
                            <label for="female">Female</label><br/>
                            <input type="radio"  name="genderus" value="transgender"/>
                            <label for="other">Transgender</label><br/>
                            <input type="radio"  name="genderus" value="other"/>
                            <label for="other">Prefer not to say</label><br/>
                        </div>
                        <div>
                            <label>Credit Card Number</label>
                            <input type="text" class="form-control" name="creditus" placeholder="XXXXXXXXXXXX"/>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="text" class="form-control" name="phoneus" placeholder="XXXXXXXXXX"/>
                        </div>
                        <div>
                            <label>Whatsapp Number</label>
                            <input type="text" class="form-control" name="phonewtspus" placeholder="XXXXXXXXXX"/>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" name="passwdus" placeholder="Password"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Sign me up</button>
                    </form>
                    <Footer/>
        </Fragment>
    );
    }
}


export default UserSignUpForm;