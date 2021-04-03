import React,{Fragment} from "react";
import Footer from "./Footer";
import Navber from  './Navber';
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
                window.location = "/unauthorized";
            }
    }
    componentDidMount(){
        if(localStorage.getItem("counselor")!=='t')
            {
                console.log("Help")
                window.location = "/unauthorized";
            }
            this.dispInfo();
    }
    dispInfo = async () => {

        if(this.counselorid!==localStorage.getItem("id"))
            {
                console.log("Help")
                window.location = `/counselors/${localStorage.getItem("id")}`;
            }
            try{

            }
            catch(err){
                console.log(err);
            }
            const res1 = await fetch(`/mender/counselordash/${this.counselorid}`);
            const info1 = await res1.json();
            console.log(info1)
            const res2 = await fetch(`/mender/apps/${this.counselorid}`);
            const info2 = await res2.json();
            console.log(info2)
            this.setState({
            Talks: info2.map((talk) => (
                <tr key={talk.appointmentid}>
                    <th>{talk.bookdate}</th>
                    <th>{talk.booktime}</th>
                    <th>{talk.venue}</th>
                    <th>{talk.rating}</th>
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
            <p className="card-text">Priority:{info1.priority1}</p>
            <p className="card-text">portfolio:{info1.portfolio }</p></b>
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
                                <th>Date</th>
                                <th>Time</th>
                                <th>venue</th>
                                <th>Rating</th>
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
export default CounselorDashboard;