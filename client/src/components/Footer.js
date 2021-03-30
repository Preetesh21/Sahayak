import React,{Fragment} from "react";
class Footer extends React.Component{
    render(){
        return(
            <Fragment>
                <div id="footer" >
               
                <div class="container">
                <div class="row">
                    <div class="col-7">
                        <p>“What mental health needs is more sunlight, more candor, and more unashamed conversation.” – Glenn Close.</p>
                    </div>
                    <div class="col-5">
                        <a href="#" class="fa fa-facebook m-3"></a>
                        <a href="#" class="fa fa-twitter m-3"></a>
                        <a href="#" class="fa fa-youtube m-3"></a>
                        <a href="#" class="fa fa-instagram m-3"></a>
                        <a href="#" class="fa fa-google m-3"></a>
                    </div>
                </div>
                <div>
                <form>
                    Subscribe to the weekly newsletter
                    <input type="email"></input>
                    <button type="submit" class="btn btn-light m-3">Subscribe</button>
                </form>
                </div>
                </div>
                </div>
            </Fragment>
        );
    }
}
export default Footer;