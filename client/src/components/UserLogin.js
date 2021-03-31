import  React,{Fragment} from "react";
import Footer from "./Footer";
class userLoginForm extends React.Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = async (event) =>{
        try{
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get('emailul'); 
        const passwd = data.get('passwdul');
        console.log(email,passwd);
        const resp = await fetch(`http://localhost:5000/mender/users/${email}`);
        const jsonPasswd = await resp.json();
        if(jsonPasswd['password'] === passwd){
            console.log("password verified");
            const userid = jsonPasswd['userid'];
            window.location = `/users/${userid}`;
        }
        else{
            console.log("wrong password");
        }
    }
    catch(err){
        console.error(err.message);
    }
    };
    render(){return (
        <Fragment>
        <div className="container">
                    <form style={{height:"75vh",float:"right",width:"50vw"}} onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" name="emailul" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" name="passwdul" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Log me in</button>
                    </form>
                    </div>
                    <Footer/>
                    </Fragment>
    );
    }
}
export default userLoginForm;