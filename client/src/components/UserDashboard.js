import React,{Fragment} from "react";

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
                    <li class="list-group-item">
                        Date : {item.bookdate}<br/>
                        time : {item.booktime}
                    </li>
                )),
                Talks : talks.map((item)=>(
                    <li class="list-group-item">
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
                <div class="profile">
                    userID : {this.props.match.params.userid}
                    <button onClick={this.bookAnAppointment} class="btn btn-warning m-3">Book an appointment</button>
                    <button onClick={this.displayTest} class="btn btn-warning m-3">Self Assessment</button>
                    <button onClick={this.allTalks} class="btn btn-warning m-3">Talks</button>
                    <button onClick={this.logMeOut} class="btn btn-danger m-3">Log me out</button>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        Your Appointments
                        <ul class="list-group">{this.state.Appoints}</ul>
                    </div>
                    <div class="col-sm-6">
                        Your Talks
                        <ul class="list-group">{this.state.Talks}</ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default UserDashboard;