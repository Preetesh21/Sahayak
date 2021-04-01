import  React,{Fragment} from "react";
import Footer from "./Footer";
class Talks extends React.Component{
    constructor(props){
        super(props);
        this.state = {Talks : ''};
        this.userid = this.props.match.params.userid;
        this.status = "Register";
    }
    componentDidMount(){
        this.displaytalks();
    }
    bookTalk = async (id,e) =>{
        e.preventDefault();
        console.log("dfffhbf");
        const reg = await fetch(`http://localhost:5000/mender/registeredtalks/${this.userid}`);
        const regtalks = await reg.json();
        const resp1 = await fetch('http://localhost:5000/mender/alltalks');
        const talks1 = await resp1.json();
        var flag=true;
        for(var i=0;i<regtalks.length;i++){
            if(regtalks[i].talkid === id){
                console.log(regtalks[i].talkid);
                flag=false;
                document.getElementById(`id${regtalks[i].talkid}`).innerHTML = "Already Registered";
                console.log(flag);
            }
        }
        for(var i =0;i<talks1.length;i++){
            if(talks1[i].maxentries === talks1[i].bookedseats){
                document.getElementById(`id${regtalks[i].talkid}`).innerHTML = "Seats Full";
                flag=false;
            }
        }
        if(flag){
        const bookt = await fetch(`http://localhost:5000/mender/${this.userid}/registertalk/${id}`,{
            method:'POST',
            headers: { "Content-Type": "application/json" }
        })}
    }
    displaytalks = async () =>{
        const resp = await fetch('http://localhost:5000/mender/alltalks');
        const talks = await resp.json();
        this.setState({
            Talks: talks.map((talk) => (
                <li class="list-group-item" key={talk.talkid}>
                    <p>Title:{talk.talktitle}</p>
                    <p>Description: {talk.talkdesc}</p>
                    <p>Date : {talk.talkdate}    Time : {talk.talktime}</p>
                    <p>Maximum Entries Allowed :{talk.maxentries}</p>
                    <p>Booked Seats :{talk.bookedseats}</p>
                    <p>Fee :{talk.fee}</p>
                    <button onClick={(e)=>this.bookTalk(talk.talkid,e)} id={`id${talk.talkid}`}>Register</button>
                </li>
                ))
            });
    }
    render(){
        return(
            <Fragment>
            <div className="container" style={{minHeight:"75vh"}}>
            <ul className="list-group m-2">
                {this.state.Talks}
            </ul>
            </div>
            <Footer/>
            </Fragment>
        );
    }
}
export default Talks;