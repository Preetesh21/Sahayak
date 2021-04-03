import React,{Fragment} from "react";
import Footer from './Footer';
import Navber from './Navber';
class NewTalk extends React.Component{
    constructor(props){
        super(props);
        this.speakerid = this.props.match.params.speakerid;
    }

    pushIt = async(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        const strdata = JSON.stringify(object);

        // checking if valid
        const res2 = await fetch(`/mender/alltalks/${this.speakerid}`);
        const info2 = await res2.json();
        console.log(info2);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        var flag = 1;
        if(parseInt(yyyy) < parseInt(data.get("date").substr(0,4))){
            console.log("valid");
        }
        else if(parseInt(yyyy) === parseInt(data.get("date").substr(0,4))){
            if(parseInt(mm) < parseInt(data.get("date").substr(5,7))){
                console.log("valid");
            }
            else if(parseInt(mm) === parseInt(data.get("date").substr(5,7))){
                if(parseInt(dd) < parseInt(data.get("date").substr(8,10))){
                    console.log("valid");
                }
                else if(parseInt(dd) === parseInt(data.get("date").substr(8,10))){
                    // time 
                    var hour = today.getHours();
                    var h1 = data.get("time").substr(0,2);
                    if(parseInt(h1) < 10 || parseInt(h1) > 17){
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
        var h11 = data.get("time").substr(0,2);
        if(parseInt(h11) < 10 || parseInt(h11) > 19){
            flag=0;
            console.log("invalid");
        }
        // displaying error if exists
        if(flag===0){
            document.getElementById("warndatetime").innerHTML = "<p style=\"color:red;\">Please Insert Valid Data.</p>"
        }

        else{
            info2.forEach(function(item){
                let date = item["talkdate"].toString();
                let time = item["talktime"].toString();
                console.log(date,time);
                if(parseInt(date.substr(0,4)) === parseInt(data.get("date").substr(0,4))){
                    if(parseInt(date.substr(5,7)) === parseInt(data.get("date").substr(5,7))){
                        if(parseInt(date.substr(8,10)) === parseInt(data.get("date").substr(8,10))){
                            if(parseInt(data.get("time").substr(0,2)) === parseInt(time.substr(0,2))){
                                document.getElementById("warndatetime").innerHTML = "<p style=\"color:red;\">This is a busy slot. Please Insert a FREE Slot.</p>"
                                flag = 0;
                            }
                        }
                    }
                }
            });
            if(flag === 1){
                console.log("the slot is ready to be inserted ");
                const resp = await fetch(`/mender/${this.speakerid}/pushnewtalk`,{
                    method:'POST',
                    headers:{"content-type" : "application/json"},
                    body:JSON.stringify(object)
                })
                window.location = `/speakers/${this.speakerid}`;
            }
        }
    }
    render(){
        return(
            <Fragment>
            <Navber />
            <div className="container">
                <form style={{minHeight:"75vh"}} onSubmit={this.pushIt}>
                    Talk Title:
                    <br/><input className="form-control" name="title" type="text"></input><br/>
                    Talk Description:
                    <br/><input className="form-control" name="desc" type="text"></input><br/>
                    Date:
                    <br/><input className="form-control" name="date" type="date"></input><br/>
                    Time:
                    <br/><input className="form-control" name="time" type="time"></input><br/>
                    Maximum number of entries:
                    <br/><input className="form-control" name="maxent" type="number"></input><br/>
                    Fee:
                    <br/><input className="form-control" name="fee" type="number"></input><br/>
                    Venue:
                    <br/><input className="form-control" name="venue" type="text"></input><br/>
                    <div id="warndatetime"></div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
                </div>
                <Footer />
            </Fragment>
        );
    }
}
export default NewTalk;