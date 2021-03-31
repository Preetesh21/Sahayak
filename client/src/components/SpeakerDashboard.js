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
                <li key={talk.talkid}>
                    <div className="card w-50">
                        <div className="card-body">
                            <h5 className="card-title">{talk.talktitle}</h5>
                            <p className="card-text">{talk.talkdesc}</p>
                            <p className="card-text">{talk.talktime}</p>
                            <p className="card-text">{talk.talkdate}</p>
                        </div>
                    </div>
                </li>
                )),
            Info : (<ul>
                <li>name : {info1.name}</li>
            </ul>)
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
                <div className="row">
                <div className="col-md-5" id="profile">
                    {this.state.Info}
                </div>
                <div className="col-md-7"  id="talks" >
                    <button className="btn btn-primary" onClick={this.newTalk}>New Talk</button>
                    <button onClick={this.logMeOut} className="btn btn-danger m-3">Log me out</button>
                    {this.state.Talks}
                </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}
export default SpeakerDashboard;