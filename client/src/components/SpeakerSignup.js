import {Fragment} from "react";
import React from "react";
import Footer from "./Footer";
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
        const resp = await fetch('/mender/speakers',{
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
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <a className="navbar-brand" href={ `/`}>Home</a>
        </nav>
        <div className="container">
                    <form  style={{float:"right",width:"50vw"}} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-control" name="namess" placeholder="FirstName LastName"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" name="emailss" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="usernamess" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" className="form-control" name="agess" placeholder="Age in years"/>
                        </div>
                        <div>
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
                            <input type="text" className="form-control" name="bankss" placeholder="XXXXXXXXXXXX"/>
                        </div>
                        <div>
                            <label>IFSC Code</label>
                            <input type="text" className="form-control" name="ifscss" placeholder="SBINXXXXXX"/>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="text" className="form-control" name="phoness" placeholder="XXXXXXXXXX"/>
                        </div>
                    
                        <div>
                            <label>How many years of experience in Speaking do you have?</label>
                            <input type="number" className="form-control" name="yoess" placeholder="0 or above"/>
                        </div>
                        <div> 
                            <label>Link to your website/Linkedin/Twitter</label>
                            <input type="text" className="form-control" name="portfolioss" placeholder="www.exp.com"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" name="passwdss" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </div>
                    <Footer/>
        </Fragment>
    );
    }
}


export default SpeakerSignUpForm;