import React,{Fragment} from "react";
import Footer from "./Footer";
import Auth from "./Auth";
class CounselorDashboard extends React.Component{
    constructor(props){
        super(props);
        this.counselorid = this.props.match.params.counselorid;
        this.state = {
            Info : '',
            Talks : ''
        }
        if(localStorage.getItem("counselor")!=='t')
            {
                console.log("Help")
                window.location = "/";
            }
    }
    logMeOut=()=>{
        Auth.setcounselor('');
        Auth.setID('');
        localStorage.setItem("counselor", "");
        localStorage.setItem("id", "");
        window.location = "/";
    }
    dispInfo = async () => {

        if(this.counselorid!==localStorage.getItem("id"))
            {
                console.log("Help")
                window.location = `/counselors/${localStorage.getItem("id")}`;
            }
        }
    render(){
        return(
            <Fragment>
          <button onClick={this.logMeOut} className="btn btn-danger m-3">Log me out</button>
        <Footer />
            </Fragment>
        );
    }
}
export default CounselorDashboard;