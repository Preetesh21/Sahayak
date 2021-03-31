import React,{Fragment} from "react";
class Footer extends React.Component{
    render(){
        return(
            <Fragment>
                <div id="footer" >
               
                <div className="container">
                <div className="row">
                    <div className="col-7">
                        <p>“What mental health needs is more sunlight, more candor, and more unashamed conversation.” – Glenn Close.</p>
                    </div>
                    <div className="col-5">
                        <a href="https://www.google.com/" className="fa fa-facebook m-3"></a>
                        <a href="https://www.google.com/" className="fa fa-twitter m-3"></a>
                        <a href="https://www.google.com/" className="fa fa-youtube m-3"></a>
                        <a href="https://www.google.com/" className="fa fa-instagram m-3"></a>
                        <a href="https://www.google.com/" className="fa fa-google m-3"></a>
                    </div>
                </div>
                <div>
                <form>
                    Subscribe to the weekly newsletter
                    <input className="form-control " style={{maxWidth:"10cm"}} type="email"></input>
                    <button type="submit" className="btn btn-light m-1">Subscribe</button>
                </form>
                </div>
                </div>
                </div>
            </Fragment>
        );
    }
}
export default Footer;