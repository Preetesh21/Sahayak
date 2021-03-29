import React,{Fragment} from "react";
import jQuery ,{$} from "jquery";

class AppointmentBooking extends React.Component{
    constructor(props){
        super(props);
        this.userid = this.props.match.params.userid;
        this.counselorid = this.props.match.params.counselorid;
        this.state = {
            BusySlots : '',
            bs : []
        };
    }
    componentDidMount(){
        console.log("in component did mount");
        this.fetchBusySlots();
    }
    fetchBusySlots = async() =>{
        console.log("hurr");
        const resp = await fetch(`http://localhost:5000/mender/${this.counselorid}/busyslots`);
        const slots = await resp.json();
        console.log(slots);
        this.setState({bs:slots});
        this.setState({
            BusySlots: slots.map((slot,index) => (
                <li key={index} class="list-group-item">
                    Date : {(slot.bookdate).toString().substr(0,10)}<br/>
                    Time : {slot.booktime}
                </li>
                ))
            });
            console.log(this.state.bs);
    }
    
    bookMe = async (e) =>{
        try {
            e.preventDefault();
            const data = new FormData(e.target);
            // console.log(data); // reference by form input's `name` tag
            var object = {};
            data.forEach(function(value, key){
                object[key] = value;
            });
            const strdata = JSON.stringify(object);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            var flag = 1;
            if(parseInt(yyyy) < parseInt(data.get("date").substr(0,4))){
                console.log("valid");
            }
            else if(parseInt(yyyy) == parseInt(data.get("date").substr(0,4))){
                if(parseInt(mm) < parseInt(data.get("date").substr(5,7))){
                    console.log("valid");
                }
                else if(parseInt(mm) == parseInt(data.get("date").substr(5,7))){
                    if(parseInt(dd) < parseInt(data.get("date").substr(8,10))){
                        console.log("valid");
                    }
                    else if(parseInt(dd) == parseInt(data.get("date").substr(8,10))){
                        // time 
                        var hour = today.getHours();
                        var h1 = data.get("time").substr(0,2);
                        var m1 = data.get("time").substr(3,5);
                        if(parseInt(m1) != 0 || parseInt(h1) < 10 || parseInt(h1) > 17){
                            flag=0;
                            console.log("invalid");
                        }
                        else if(parseInt(hour) < parseInt(h1)){
                            console.log("valid time");
                        }
                        else{
                            flag=0;
                        }
                    }
                    else{
                        flag=0;
                    }
                }
                else{
                    flag=0;
                }
            }
            else{
                flag=0;
            }
            var hour = today.getHours();
            var h1 = data.get("time").substr(0,2);
            var m1 = data.get("time").substr(3,5);
            if(parseInt(m1) != 0 || parseInt(h1) < 10 || parseInt(h1) > 17){
                flag=0;
                console.log("invalid");
            }
            // displaying error if exists
            if(flag==0){
                document.getElementById("warndatetime").innerHTML = "<p style=\"color:red;\">Please Insert Valid Data.</p>"
            }

            else{
                const bs = this.state.bs;
                bs.forEach(function(item){
                    let date = item["bookdate"].toString();
                    let time = item["booktime"].toString();
                    if(parseInt(date.substr(0,4)) == parseInt(data.get("date").substr(0,4))){
                        if(parseInt(date.substr(5,7)) == parseInt(data.get("date").substr(5,7))){
                            if(parseInt(date.substr(8,10)) == parseInt(data.get("date").substr(8,10))){
                                if(parseInt(data.get("time").substr(0,2)) == parseInt(time.substr(0,2))){
                                    document.getElementById("warndatetime").innerHTML = "<p style=\"color:red;\">This is a busy slot. Please Insert a FREE Slot.</p>"
                                    flag = 0;
                                }
                            }
                        }
                    }
                });
                if(flag == 1){
                    console.log("the slot is ready to be inserted ");
                    const ress = await fetch(`http://localhost:5000/mender/${this.userid}/bookappointment/${this.counselorid}`,{
                        method:'POST',
                        body:strdata,
                        headers:{"Content-Type": "application/json"}
                    })
                    console.log("booked!");
                    window.location = `/users/${this.userid}`;
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    render(){
        return(
            <Fragment>
                <div >
                    <form  style={{height:"75vh",marginLeft:"50vw",marginBottom:"2vh",marginTop:"2vh"}} onSubmit={this.bookMe}>
                        Date<br/>
                        <input name="date" type="date"></input><br/>
                        Time Slot <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Time Slots Info" data-content="Each time slot is 40 minutes long followed by 20 minutes break for the Psychologist. For example : 1:00 - 1:40 is the appointment slot and 1:40 - 2:00 is a break slot. The Counselors are available from 10:00 am to 5 pm.">?</button><br/>
                        <input name="time" type="time"></input><br/>
                        Link<br/>
                        <input name="link" type="text"></input><br/>
                        <button type="submit" class="btn btn-info">book Slot</button>
                    </form>
                    <div id="warndatetime">
                    </div>
                </div>
                <div id="busyslots"  style={{height:"75vh",marginLeft:"50vw",marginBottom:"2vh",marginTop:"2vh"}} >
                    Busy slots
                    <ul class="list-group">{this.state.BusySlots}</ul>
                </div>
            </Fragment>
        );
    }
}
export default AppointmentBooking;