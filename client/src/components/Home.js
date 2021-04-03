import React, {Fragment} from "react";
import Footer from "./Footer";
import Auth from './Auth';
import "./style.css";
class Home extends React.Component{
    constructor(props){
        super(props);
        Auth.setuser('');
        Auth.setspeaker('');
        Auth.setcounselor('');
        Auth.setID('');
        localStorage.setItem("user", "");
        localStorage.setItem("speaker", "");
        localStorage.setItem("counselor", "");
        localStorage.setItem("id", "");
    }
    userSignUp(){
        window.location = "/user-signup";
    }
    userLogin(){
        window.location = "/user-login";
    }
    counselorSignUp(){
        window.location = "/counselor-signup";
    }
    counselorLogin(){
        window.location = "/counselor-login";
    }
    speakerSignUp(){
        window.location = "/speaker-signup";
    }
    speakerLogin(){
        window.location = "/speaker-login";
    }
    render(){return (
        <Fragment >
            <div id="welcomepage">
                <h1 >Mender</h1>
                <h6> We are in this together, let's fight with it and conquer it!</h6>
                <div id="userwelcome" className="m-5">
                    <h4>Do you need help? We are here for you! Sign up or login from here-</h4>
                    <button className="btn btn-primary m-2" onClick={this.userSignUp}>user sign up</button>
                    <button className="btn btn-primary m-2" onClick={this.userLogin}>user login</button>
                </div>
                <div id="cwelcome" className="m-5">
                    <h4>Are you a psychologist/Counselor and want to help people? Sign up or login from here-</h4>
                    <button className="btn btn-primary m-2" onClick={this.counselorSignUp}>counselor sign up</button>
                    <button className="btn btn-primary m-2" onClick={this.counselorLogin}>counselor login</button>
                </div>
                <div id="swelcome" className="m-5">
                    <h4>Are you a Motivational Speaker? Sign up or login from here-</h4>
                    <button className="btn btn-primary m-2" onClick={this.speakerSignUp}>speaker sign up</button>
                    <button className="btn btn-primary m-2" onClick={this.speakerLogin}>speaker login</button>
                </div>    
            </div>
            <Footer/>
        </Fragment>
    );
    }
}
export default Home;
