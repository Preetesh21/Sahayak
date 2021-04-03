import React,{Fragment} from "react";
import Footer from "./Footer";
import Navber from './Navber';
class UserDashboard extends React.Component{
    constructor(props){
        super(props);
        this.userid = this.props.match.params.userid;
        console.log(this.userid);
        this.state = {Appoints:'',Talks:''};
        if(localStorage.getItem("user")!=='t')
            {
                console.log("Help")
                window.location = "/unauthorized";
            }
    }
    componentDidMount(){
        if(localStorage.getItem("user")!=='t')
            {
                console.log("Help")
                window.location = "/unauthorized";
            }
        this.fetchData();
    }
    
    fetchData = async () =>{
        try {
           // console.log(localStorage.getItem("id"),'hello',this.userid);
            if(this.userid!==localStorage.getItem("id"))
            {
                console.log("Help")
                window.location = `/users/${localStorage.getItem("id")}`;
            }
            console.log("fref");
            const in1 = await fetch(`http://localhost:5000/mender/getappo/${this.userid}`);
            const appo = await in1.json();
            const in2 = await fetch(`http://localhost:5000/mender/gettalks/${this.userid}`);
            const talks = await in2.json();

            this.setState({
                Appoints : appo.map((item)=>(
                    
                        <Fragment>
                        <tr key={item.bookid}>
                        <th >{item.bookdate}</th>
                        <th >{item.booktime}</th>
                        </tr>
                        </Fragment>
                 
                )),
                Talks : talks.map((item)=>(
                        <Fragment>
                        <tr key={item.talkid}>
                        <th>{item.talkdate}</th>
                        <th>{item.talktime}</th>
                        </tr>
                        </Fragment>
                ))
            });
        } catch (err) {
            console.error(err.message);
        }
    }
    render(){
        return(
            <Fragment>
            <Navber />
            <div className="container text-center" style={{minHeight:"75vh"}}>
                <h3>Welcome User ID::{this.userid}</h3>
                <div className="row text-center">
                    <div className="col-sm-6">
                        <h3>Your Appointments</h3>
                        <table className="table table-dark table-striped">
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                            {this.state.Appoints}
                        </table>
                    </div>
                    <div className="col-sm-6">
                        <h3>Your Talks</h3>
                        <table className="table table-dark table-striped"><tr>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>{this.state.Talks}
                            </table>
                        
                    </div>
                </div>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}
export default UserDashboard;