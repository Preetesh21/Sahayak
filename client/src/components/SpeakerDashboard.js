import React,{Fragment} from "react";
class SpeakerDashboard extends React.Component{
    constructor(props){
        super(props);
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
        const res1 = await fetch(`http://localhost:5000/mender/speakersdash/${this.speakerid}`);
        const info1 = await res1.json();
        const res2 = await fetch(`http://localhost:5000/mender/alltalks/${this.speakerid}`);
        const info2 = await res2.json();
        this.setState({
            Talks: info2.map((talk) => (
                <li key={talk.talkid}>
                    <div class="card w-50">
                        <div class="card-body">
                            <h5 class="card-title">{talk.talktitle}</h5>
                            <p class="card-text">{talk.talkdesc}</p>
                            <p class="card-text">{talk.talktime}</p>
                            <p class="card-text">{talk.talkdate}</p>
                        </div>
                    </div>
                </li>
                )),
            Info : (<ul>
                <li>name : {info1.name}</li>
            </ul>)
        });
    }
    newTalk = () =>{
        window.location = `/speakers/${this.speakerid}/pushnewtalk`;
    }
    render(){
        return(
            <Fragment>
                <div class="row">
                <div class="col-md-5" id="profile">
                    {this.state.Info}
                </div>
                <div class="col-md-7"  id="talks" >
                    <button class="btn btn-primary" onClick={this.newTalk}>New Talk</button>
                    {this.state.Talks}
                </div>
                </div>
            </Fragment>
        );
    }
}
export default SpeakerDashboard;