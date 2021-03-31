import React,{Fragment} from "react";
import Footer from "./Footer";
class UserDashboard extends React.Component{
    constructor(props){
        super(props);
        this.userid = this.props.match.params.userid;
        console.log(this.userid);
        this.state = {Appoints:'',Talks:''};
    }
    bookAnAppointment = () =>{
        window.location = `/users/${this.userid}/book-an-appointment`;
    }
    displayTest = () =>{
        window.location = `/users/${this.userid}/take-a-test`;
    }
    allTalks=()=>{
        window.location = `/users/${this.userid}/talks`;
    }
    logMeOut=()=>{
        window.location = "/";
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData = async () =>{
        try {
            console.log("fref");
            const in1 = await fetch(`http://localhost:5000/mender/getappo/${this.userid}`);
            const appo = await in1.json();
            const in2 = await fetch(`http://localhost:5000/mender/gettalks/${this.userid}`);
            const talks = await in2.json();

            this.setState({
                Appoints : appo.map((item)=>(
                    <li className="list-group-item">
                        Date : {item.bookdate}<br/>
                        time : {item.booktime}
                    </li>
                )),
                Talks : talks.map((item)=>(
                    <li className="list-group-item">
                        Date : {item.talkdate}<br/>
                        time : {item.talktime}
                    </li>
                ))
            });
        } catch (err) {
            console.error(err.message);
        }
    }
    render(){
        return(
            <Fragment>
            <div className="container" style={{minHeight:"75vh"}}>
                <div className="profile text-center">
                    userID : {this.props.match.params.userid}
                    <button onClick={this.bookAnAppointment} className="btn btn-warning m-3">Book an appointment</button>
                    <button onClick={this.displayTest} className="btn btn-warning m-3">Self Assessment</button>
                    <button onClick={this.allTalks} className="btn btn-warning m-3">Talks</button>
                    <button onClick={this.logMeOut} className="btn btn-danger m-3">Log me out</button>
                </div>
                <div className="row text-center">
                    <div className="col-sm-6">
                        <h3>Your Appointments</h3>
                        <ul className="list-group">{this.state.Appoints}</ul>
                    </div>
                    <div className="col-sm-6">
                        <h3>Your Talks</h3>
                        <ul className="list-group">{this.state.Talks}</ul>
                    </div>
                </div>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}
export default UserDashboard;