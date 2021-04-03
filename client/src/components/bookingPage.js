import React,{Fragment} from "react";
import Footer from "./Footer";
import Navber from './Navber';
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
                <tr key={counselor.counselorid}> 
                            <th >{counselor.name}</th>
                            <th >{counselor.age}</th> <th>  {counselor.sessionratings}</th>
                            <th> {specdict[counselor.priority1]}, {specdict[counselor.priority2]}</th>
                            <button className="btn btn-primary" onClick={()=>{this.bookIt(this.props,counselor.counselorid)}}>Book Appointment</button>
                </tr>
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
            if(specdict[item.priority1] === pref){
                temp.push(item);
            }
        });

        this.setState({
            Counselors: temp.map((counselor) => (
                <tr key={counselor.counselorid}>
                            <th >{counselor.name}</th>
                            <th >{counselor.age}</th> <th> {counselor.sessionratings}</th>
                            <th>{specdict[counselor.priority1]}, {specdict[counselor.priority2]}</th>
                            <button className="btn btn-primary" onClick={()=>{this.bookIt(this.props,counselor.counselorid)}}>Book Appointment</button>
                </tr>
                ))
            });
    }
    render(){
    return(
        <Fragment>
        <Navber />
        <div className="container text-center" style={{minHeight:"75vh"}}>
            <form className="m-3" onSubmit={this.sortDisplay}>
                <h3>Filter</h3>
                <input name="Preference" id="Pref" list="prefs"/> 
                <button className="btn btn-info m-2">Search</button>
            </form> 
            <datalist id="prefs"> 
            <option name="A">Cognitive-Behavioral Therapy (CBT)</option> <option name="B">Behavioral Therapy</option> <option name="C">Dialectical Behavior Therapy (DBT)</option> <option name="D">Humanistic Therapy</option>
            </datalist>
            <table class="table table-dark table-striped"><tr>
            <th>Name</th>
            <th>Age</th>
            <th>Rating</th>
            <th>Speciality</th>
            <th>Book</th>
            </tr>
                {this.state.Counselors}
            </table>
            </div>
            <Footer />
        </Fragment>
    );}
}
export default BookingPage;