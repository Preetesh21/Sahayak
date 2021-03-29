import React,{Fragment} from "react";
class Footer extends React.Component{
    render(){
        return(
            <Fragment>
                <div id="footer" >
                <div class="row">
                    <div class="col-sm-7 mt-3">
                        <p>“What mental health needs is more sunlight, more candor, and more unashamed conversation.” – Glenn Close.</p>
                    </div>
                    <div class="col-sm-5 mt-3">
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
                    <input type="email" class="m-3"></input>
                    <button type="submit" class="btn btn-light m-3">Subscribe</button>
                </form>
                </div>
                </div>
            </Fragment>
        );
    }
}
export default Footer;