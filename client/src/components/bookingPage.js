import React,{Fragment} from "react";
import AppointmentBooking from "./AppointmentBooking";
class BookingPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {Counselors : ''};
    }
    componentDidMount() {
        this.fetchEntries();
    }
    bookIt(props,counselorid){
        window.location = `/users/${props.match.params.userid}/book-an-appointment/${counselorid}`;
    }
    fetchEntries = async () =>{
        const resp = await fetch('http://localhost:5000/mender/allcounselors');
        const counselors = await resp.json();
        const specdict = {"A":"Cognitive-Behavioral Therapy (CBT)","B":"Behavioral Therapy","C":"Dialectical Behavior Therapy (DBT)","D":"Humanistic Therapy"};
        this.setState({
            Counselors: counselors.map((counselor) => (
                <li class="list-group-item" key={counselor.counselorid}>
                    <div class="card w-50">
                        <div class="card-body">
                            <h5 class="card-title">{counselor.name}</h5>
                            <p class="card-text">Age : {counselor.age}, Ratings : {counselor.sessionratings}</p>
                            <p>Speciality : {specdict[counselor.priority1]}, {specdict[counselor.priority2]}</p>
                            <button onClick={()=>{this.bookIt(this.props,counselor.counselorid)}}>Book Appointment</button>
                        </div>
                    </div>
                </li>
                ))
            });
    }
    sortDisplay = async (e) =>{
        e.preventDefault();
        const resp = await fetch('http://localhost:5000/mender/allcounselors');
        const counselors = await resp.json();
        const specdict = {"A":"Cognitive-Behavioral Therapy (CBT)","B":"Behavioral Therapy","C":"Dialectical Behavior Therapy (DBT)","D":"Humanistic Therapy"};
        const data = new FormData(e.target);
        const pref = data.get("Preference");
        const temp = [];
        counselors.forEach(function(item){
            if(specdict[item.priority1] == pref){
                temp.push(item);
            }
        });

        this.setState({
            Counselors: temp.map((counselor) => (
                <li class="list-group-item" key={counselor.counselorid}>
                    <div class="card w-50">
                        <div class="card-body">
                            <h5 class="card-title">{counselor.name}</h5>
                            <p class="card-text">Age : {counselor.age}, Ratings : {counselor.sessionratings}</p>
                            <p>Speciality : {specdict[counselor.priority1]}, {specdict[counselor.priority2]}</p>
                            <button onClick={()=>{this.bookIt(this.props,counselor.counselorid)}}>Book Appointment</button>
                        </div>
                    </div>
                </li>
                ))
            });
    }
    render(){
    return(
        <Fragment>
            <form class="m-3" onSubmit={this.sortDisplay}>
                <h3>Filter</h3>
                <input name="Preference" id="Pref" list="prefs"/> 
                <button class="btn btn-info m-2">Search</button>
            </form> 
            <datalist id="prefs"> 
            <option name="A">Cognitive-Behavioral Therapy (CBT)</option> <option name="B">Behavioral Therapy</option> <option name="C">Dialectical Behavior Therapy (DBT)</option> <option name="D">Humanistic Therapy</option>
            </datalist>

            <ul class="list-group">
                {this.state.Counselors}
            </ul>
        </Fragment>
    );}
}
export default BookingPage;