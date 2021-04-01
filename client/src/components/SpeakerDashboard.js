import React,{Fragment} from "react";
import Footer from "./Footer";
import Auth from "./Auth";
class SpeakerDashboard extends React.Component{
    constructor(props){
        super(props);
        if(localStorage.getItem("speaker")!=='t')
            {
                console.log("Help")
                window.location = "/unauthorized";
            }
        this.speakerid = this.props.match.params.speakerid;
        this.state = {
            Info : '',
            Talks : ''
        }
        
    }
    componentDidMount(){
        this.dispInfo();
    }
    dispInfo = async () => {
        if(localStorage.getItem("speaker")!=='t')
            {
                console.log("Help")
                window.location = "/unauthorized";
            }
        if(this.speakerid!==localStorage.getItem("id"))
            {
                console.log("Help")
                window.location = `/speakers/${localStorage.getItem("id")}`;
            }
        const res1 = await fetch(`http://localhost:5000/mender/speakersdash/${this.speakerid}`);
        const info1 = await res1.json();
        const res2 = await fetch(`http://localhost:5000/mender/alltalks/${this.speakerid}`);
        const info2 = await res2.json();
        this.setState({
            Talks: info2.map((talk) => (
                <div className="card-deck">
                <div className="col-sm-4" key={talk.talkid}>
                
                    <div className="card bg-light border-primary mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{talk.talktitle}</h5>
                            <div className="row d-flex justify-content-between card-strip">
                            <p className="card-text">Description ::{talk.talkdesc}</p>
                            
                            </div>
                            <div className="row d-flex justify-content-between card-strip">
                            <p className="card-text">Time ::{talk.talktime}</p>
                            <div className="right d-flex">
                                <div className="fa fa-clock-o"></div>
                            </div>
                            </div>
                            <div className="row d-flex justify-content-between card-strip">
                            <p className="card-text">Date ::{talk.talkdate}</p>
                            <div className="right d-flex">
                                <div className="fa fa-calendar-o"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                
                
                </div>
                )),
            Info : ( 
        <div className="card bg-light border-danger mb-3">
        <img className="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar1.png"alt="" style={{maxHeight:"50%"}}></img>
        <div className="card-body">
        <b>
        <h5 className="card-title">Name::{info1.name}</h5>
        <p className="card-text">Email:{info1.email}</p>
        <p className="card-text">Gender:{info1.gender}</p>
        <p className="card-text">Age:{info1.age}</p>
        <p className="card-text">Tenure:{info1.sessionstaken}</p>
        <p className="card-text">Experience:{info1.practicalexperience }</p></b>
        </div>
        </div>
        )
        });
    }
    logMeOut=()=>{
        Auth.setspeaker('');
        Auth.setID('');
        localStorage.setItem("speaker", "");
        localStorage.setItem("id", "");
        window.location = "/";
    }
    newTalk = () =>{
        window.location = `/speakers/${this.speakerid}/pushnewtalk`;
    }
    render(){
        return(
            <Fragment>
            <div className="container"style={{minHeight:"75vh"}} >
            <button className="btn btn-primary" onClick={this.newTalk}>New Talk</button>
                    <button onClick={this.logMeOut} className="btn btn-danger m-3">Log me out</button>
                <div className="row">
                <div className="col-md-4" id="profile">
                <h2 className="text-center">Speaker profile</h2>
                    {this.state.Info}
                </div>
                <div className="col-md-8"  id="talks" >
                    <h3 className="text-center">All the Talks</h3>
                    {this.state.Talks}
                </div>
                </div>
                </div>
                
                <Footer />
            </Fragment>
        );
    }
}
export default SpeakerDashboard;