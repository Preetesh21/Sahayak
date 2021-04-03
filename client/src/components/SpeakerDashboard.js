import React,{Fragment} from "react";
import Footer from "./Footer";
import Auth from "./Auth";
import Navber from './Navber';
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
        if(localStorage.getItem("speaker")!=='t')
            {
                console.log("Help")
                window.location = "/unauthorized";
            }
        else{
        this.dispInfo();
    }
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
        const res1 = await fetch(`/mender/speakersdash/${this.speakerid}`);
        const info1 = await res1.json();
        const res2 = await fetch(`/mender/alltalks/${this.speakerid}`);
        const info2 = await res2.json();
        this.setState({
            Talks: info2.map((talk) => (
                <tr key={talk.talkid}>
                    <th>{talk.talktitle}</th>
                    <th>{talk.talkdesc}</th>
                    <th>{talk.talktime}</th>
                    <th>{talk.talkdate}</th>
                    </tr>
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
    
    render(){
        return(
            <Fragment>
            <Navber />
            <div className="container"style={{minHeight:"75vh"}} >
                <div className="row">
                <div className="col-md-4" id="profile">
                <h2 className="text-center">Speaker profile</h2>
                    {this.state.Info}
                </div>
                <div className="col-md-8"  id="talks" >
                    <h3 className="text-center">All the Talks</h3>
                    <table className="table table-dark table-striped"><tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Time</th>
                                <th>Date</th>
                            </tr>{this.state.Talks}
                            </table>
                </div>
                </div>
                </div>
                
                <Footer />
            </Fragment>
        );
    }
}
export default SpeakerDashboard;