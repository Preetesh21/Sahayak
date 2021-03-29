import {Fragment, useState} from "react";
import React from "react";
import "./style.css";
class SpeakerSignUpForm extends React.Component {
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
        const resp = await fetch('http://localhost:5000/mender/speakers',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object)
        });
        console.log(resp);
        window.location = "/speaker-login";
    }
    catch(err){
        console.error(err.message);
    }
    };
    
    render(){return (
        <Fragment>
                    <form  style={{marginLeft:"50vw",marginBottom:"2vh",marginTop:"2vh"}} onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" class="form-control" name="namess" placeholder="FirstName LastName"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" name="emailss" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" class="form-control" name="usernamess" placeholder="Username"/>
                        </div>
                        <div class="form-group">
                            <label>Age</label>
                            <input type="number" class="form-control" name="agess" placeholder="Age in years"/>
                        </div>
                        <div class="form-control">
                            <label>Gender</label><br/>
                            <input type="radio"  name="genderss" value="male"/>
                            <label for="male">Male</label><br/>
                            <input type="radio"  name="genderss" value="female"/>
                            <label for="female">Female</label><br/>
                            <input type="radio"  name="genderss" value="transgender"/>
                            <label for="other">Transgender</label><br/>
                            <input type="radio"  name="genderss" value="other"/>
                            <label for="other">Prefer not to say</label><br/>
                        </div>
                        <div>
                            <label>Bank Account Number</label>
                            <input type="text" class="form-control" name="bankss" placeholder="XXXXXXXXXXXX"/>
                        </div>
                        <div>
                            <label>IFSC Code</label>
                            <input type="text" class="form-control" name="ifscss" placeholder="SBINXXXXXX"/>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="text" class="form-control" name="phoness" placeholder="XXXXXXXXXX"/>
                        </div>
                    
                        <div>
                            <label>How many years of experience in Speaking do you have?</label>
                            <input type="number" class="form-control" name="yoess" placeholder="0 or above"/>
                        </div>
                        <div>
                            <label>Link to your website/Linkedin/Twitter</label>
                            <input type="text" class="form-control" name="portfolioss" placeholder="www.exp.com"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" name="passwdss" placeholder="Password"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
        </Fragment>
    );
    }
}


export default SpeakerSignUpForm;