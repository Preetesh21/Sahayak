import React, { Component } from 'react'
import Auth from './Auth';

export class Navber extends Component {
    constructor(props){
        super(props);
        this.state={url:''}
    }
    componentDidMount(){
        this.link()
    }
    bookAnAppointment = () =>{
        window.location = `/users/${localStorage.getItem("id")}/book-an-appointment`;
    }
    displayTest = () =>{
        window.location = `/users/${localStorage.getItem("id")}/take-a-test`;
    }
    allTalks=()=>{
        window.location = `/users/${localStorage.getItem("id")}/talks`;
    }
    post=()=>{
        window.location=`/users/${localStorage.getItem("id")}/posts`
    }
    newTalk = () =>{
        window.location = `/speakers/${this.speakerid}/pushnewtalk`;
    }
    link=()=>{
        if(localStorage.getItem('user')==='t'){
            this.setState({url:`/users/${localStorage.getItem("id")}`});
        }
        else if(localStorage.getItem('speaker')==='t'){
            this.setState({url:`/speakers/${localStorage.getItem("id")}`});
        }
        else{
            this.setState({url:`/counselors/${localStorage.getItem("id")}`})
        }
    }
    logMeOut=()=>{
        Auth.setuser('');
        Auth.setspeaker('');
        Auth.setcounselor('');
        Auth.setID('');
        localStorage.setItem("user", "");
        localStorage.setItem("speaker", "");
        localStorage.setItem("counselor", "");
        localStorage.setItem("id", "");
        window.location = "/";
    }
    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <a className="navbar-brand" href={this.state.url}>Home</a>
                <button className="navbar-toggler" style={{color:'yellow'}} type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                {(localStorage.getItem("user")==='t' )?
                    <ul className="navbar-nav">
                    <li className="nav-item ">
                        <button onClick={this.bookAnAppointment} className="btn btn-outline-primary  m-2 my-2 my-sm-0" type="submit">Appointments</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={this.displayTest} className="btn btn-outline-primary m-2 my-2 my-sm-0" type="submit">Assestment Test</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={this.allTalks} className="btn btn-outline-primary m-2 my-2 my-sm-0" type="submit">Talks</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={this.post} className="btn btn-outline-primary m-2 my-2 my-sm-0" type="submit">Senti</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={this.logMeOut} className="btn btn-outline-danger m-2 my-2 my-sm-0" type="submit">Log Out</button>
                    </li>
                    </ul>:
                    <ul></ul>
                }
                {(localStorage.getItem("speaker")==='t' )?
                    <ul className="navbar-nav">
                    <li className="nav-item ">
                        <button onClick={this.newTalk} className="btn btn-outline-primary m-2 my-2 my-sm-0" type="submit">New Talk</button>
                    </li>
                    
                    <li className="nav-item">
                        <button onClick={this.logMeOut} className="btn btn-outline-danger m-2 my-2 my-sm-0" type="submit">Log Out</button>
                    </li>
                    </ul>:
                    <ul></ul>
                }
                {(localStorage.getItem("counselor")==='t' )?
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <button onClick={this.logMeOut} className="btn btn-outline-danger m-2 my-2 my-sm-0" type="submit">Log Out</button>
                    </li>
                    </ul>:
                    <ul></ul>
                }
                </div>
            </nav>
        )
    }
}

export default Navber
