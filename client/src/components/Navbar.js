import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch,Link } from "react-router-dom";
import UserSignUpForm from "./UserSignup";
import UserLoginForm from "./UserLogin";
import UserDashboard from "./UserDashboard";
import CounselorSignUpForm from "./CounselorSignup";
import CounselorLoginForm from "./CounselorLogin";
import SpeakerSignUpForm from "./SpeakerSignup";
import SpeakerLoginForm from "./SpeakerLogin";
import CounselorDashboard from "./CounselorDashboard";
import SpeakerDashboard from "./SpeakerDashboard";
import Home from "./Home";
import BookingPage from "./bookingPage";
import AppointmentBooking from "./AppointmentBooking";
import AllTestsPage from "./AllTestsPage";
import Talks from "./Talks";
import NewTalk from "./NewTalk";

class Navbar extends Component{
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        {/* User */}
                        <Route exact path="/users/:userid" render={(props) => <UserDashboard {...props}/>}/>
                        <Route exact path="/users/:userid/take-a-test" render={(props) => <AllTestsPage {...props}/>}/>
                        <Route exact path="/users/:userid/book-an-appointment" render={(props) => <BookingPage {...props}/>}/>
                        <Route exact path="/users/:userid/book-an-appointment/:counselorid" render={(props) => <AppointmentBooking {...props}/>}/>
                        <Route exact path="/users/:userid/talks" render={(props) => <Talks {...props}/>}/>
                        {/* Counselor */}
                        <Route exact path="/counselors/:counselorid" render={(props) => <CounselorDashboard {...props}/>}/>
                        <Route exact path="/speakers/:speakerid" render={(props) => <SpeakerDashboard {...props}/>}/>
                        <Route exact path="/speakers/:speakerid/pushnewtalk" render={(props) => <NewTalk {...props}/>}/>
                        <Route exact path="/user-signup"><UserSignUpForm/></Route>
                        <Route exact path="/user-login"><UserLoginForm/></Route>
                        <Route exact path="/counselor-signup"><CounselorSignUpForm/></Route>
                        <Route exact path="/counselor-login"><CounselorLoginForm/></Route>
                        {/* Speaker */}
                        <Route exact path="/speaker-signup"><SpeakerSignUpForm/></Route>
                        <Route exact path="/speaker-login"><SpeakerLoginForm/></Route>
                        <Route exact path="/"><Home/></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Navbar;