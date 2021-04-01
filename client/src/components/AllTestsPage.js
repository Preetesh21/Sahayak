import React,{Fragment} from "react";
import Footer from "./Footer";
class AllTestsPage extends React.Component{
    constructor(props){
        super(props);
        this.userid = this.props.match.params.userid;
    }
    submitObjectiveRes = async (event) =>{
        console.log("hdhgdedge");
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data); // reference by form input's `name` tag
        var object = {};
        data.forEach(function(value, key){
            object[key] = value;
        });
        const f = JSON.stringify(object);
        console.log(f);
        const resp = await fetch(`http://localhost:5000/mender/${this.userid}/putobjresp`,{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: f
        })
        this.displayScore(object);
    }

    displayScore(f){
        var dict = {"A":0,"B":1,"C":2,"D":3};
        let depressionScore = dict[f["q1"]] + dict[f["q2"]] + dict[f["q3"]] + dict[f["q4"]] + dict[f["q5"]] + dict[f["q6"]] + dict[f["q7"]] + dict[f["q8"]] + dict[f["q9"]] ;
        depressionScore = depressionScore*1.0/parseFloat(27);
        depressionScore = depressionScore*100;
        let anxietyScore = dict[f["q10"]] + dict[f["q11"]] + dict[f["q12"]] + dict[f["q13"]] + dict[f["q14"]] + dict[f["q15"]]; 
        anxietyScore = anxietyScore*100.0/18;
        document.getElementById("objtest").innerHTML = "";
        document.getElementById("objtestres").innerHTML = `<h3>depression score =${depressionScore}</h3><br><h3>anxiety score = ${anxietyScore}</h3>`;
        if(anxietyScore > 60 || depressionScore > 50){
            console.log(this.userid);
            document.getElementById("optionalbook").innerHTML = `<p>You need help. But don't worry, we're here for you.</p><br/><button id="btnx" class="btn btn-warning m-3">Book an appointment</button>`;
            document.getElementById("btnx").onclick = ()=>{window.location = `/users/${this.userid}/book-an-appointment`;};
        }
        else{
            document.getElementById("optionalbook").innerHTML = "You will be fine. Your test results show that you are just a bit stressed. Listen to a soothing music, that helps!";
        }
    }

    render(){
        return(
            <Fragment>
                <div style={{textAlign:"center",minHeight:"75vh"}} id="objtest">
                <form onSubmit={this.submitObjectiveRes}>
                
                    <div className="form-control"><h3>Answer them honestly</h3>
                        <label>How often have you been bothered by feeling down, depressed or hopeless?</label><br/>
                        <input type="radio"  name="q1" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q1" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q1" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q1" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you had little interest or pleasure in doing things?</label><br/>
                        <input type="radio"  name="q2" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q2" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q2" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q2" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by trouble falling or staying asleep, or sleeping too much?</label><br/>
                        <input type="radio"  name="q3" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q3" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q3" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q3" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by feeling tired or having little energy?</label><br/>
                        <input type="radio"  name="q4" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q4" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q4" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q4" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by poor appetite or overeating?</label><br/>
                        <input type="radio"  name="q5" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q5" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q5" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q5" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by feeling bad about yourself, or that you are a failure, or have let yourself or your family down?</label><br/>
                        <input type="radio"  name="q6" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q6" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q6" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q6" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by trouble concentrating on things, such as reading the newspaper or watching television?</label><br/>
                        <input type="radio"  name="q7" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q7" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q7" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q7" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?</label><br/>
                        <input type="radio"  name="q8" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q8" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q8" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q8" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>Have you had an anxiety attack (suddenly feeling fear or panic)?</label><br/>
                        <input type="radio"  name="q9" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q9" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q9" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q9" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    {/* anxiety */}
                    <div className="form-control">
                        <label>How often have you been bothered by feeling nervous, anxious or on edge?</label><br/>
                        <input type="radio"  name="q10" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q10" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q10" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q10" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by not being able to stop or control worrying?</label><br/>
                        <input type="radio"  name="q11" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q11" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q11" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q11" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by worrying too much about different things?</label><br/>
                        <input type="radio"  name="q12" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q12" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q12" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q12" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by having trouble relaxing?</label><br/>
                        <input type="radio"  name="q13" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q13" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q13" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q13" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by being so restless that it is hard to sit still?</label><br/>
                        <input type="radio"  name="q14" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q14" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q14" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q14" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                        <label>How often have you been bothered by becoming easily annoyed or irritable?</label><br/>
                        <input type="radio"  name="q15" value="A"/>
                        <label for="A">Not at all</label><br/>
                        <input type="radio"  name="q15" value="B"/>
                        <label for="B">Sometimes</label><br/>
                        <input type="radio"  name="q15" value="C"/>
                        <label for="C">Often</label><br/>
                        <input type="radio"  name="q15" value="D"/>
                        <label for="D">Always</label><br/>
                    </div>
                    <div className="form-control">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <div style={{textAlign:"center"}} id="objtestres"></div>
                <div style={{textAlign:"center"}} id="optionalbook"></div>
                <Footer/>
            </Fragment>
        );
    }
}
export default AllTestsPage;