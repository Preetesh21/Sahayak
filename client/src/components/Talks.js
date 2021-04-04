import  React,{Fragment} from "react";
import Footer from "./Footer";
import Navber from './Navber';
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
        //console.log("dfffhbf");
        const reg = await fetch(`/mender/registeredtalks/${this.userid}`);
        const regtalks = await reg.json();
        const resp1 = await fetch('/mender/alltalks');
        const talks1 = await resp1.json();
        var flag=true;
        for(var i=0;i<regtalks.length;i++){
            if(regtalks[i].talkid === id){
                //console.log(regtalks[i].talkid);
                flag=false;
                document.getElementById(`id${regtalks[i].talkid}`).className = "btn btn-primary";
                document.getElementById(`id${regtalks[i].talkid}`).innerHTML = "Already Registered";
                
                //console.log(flag);
            }
        }
        for(var ii =0;ii<talks1.length;ii++){
            if(talks1[ii].maxentries === talks1[ii].bookedseats){
                document.getElementById(`id${regtalks[ii].talkid}`).innerHTML = "Seats Full";
                flag=false;
            }
        }
        if(flag){
        const bookt = await fetch(`/mender/${this.userid}/registertalk/${id}`,{
            method:'POST',
            headers: { "Content-Type": "application/json" }
        })}
    }
    displaytalks = async () =>{
        const resp = await fetch('/mender/alltalks');
        const talks = await resp.json();
        this.setState({
            Talks: talks.map((talk) => (
                    <Fragment>
                    <tr key={talk.talkid}>
                    
                        <th>{talk.talktitle}</th>
                        <th>{talk.talkdesc}</th>
                        <th>{talk.talkdate}</th>
                        <th>{talk.talktime}</th>
                        <th>{talk.maxentries}</th>
                        <th>{talk.bookedseats}</th>
                        <th>{talk.fee}</th>
                    <button className="btn btn-primary " onClick={(e)=>this.bookTalk(talk.talkid,e)} id={`id${talk.talkid}`}>Register</button>
                    </tr>
                    </Fragment>
                ))
            });
    }
    render(){
        return(
            <Fragment>
            <Navber />
            <div className="container" style={{minHeight:"75vh"}}>
            <h2 className="text-center">All the talks</h2>
            <table class="table table-dark table-striped">
          <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Date</th>
        <th>Time</th>
        <th>Maximum Seats</th>
        <th>Seats booked</th>
        <th>Fee</th>
        <th>Register</th>
    </tr>
                {this.state.Talks}
                </table>
            </div>
            <Footer/>
            </Fragment>
        );
    }
}
export default Talks;