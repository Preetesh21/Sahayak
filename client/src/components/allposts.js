import Footer from './Footer';
import Navber from './Navber';
import React, { Component ,Fragment} from 'react';

export class allposts extends Component {
    constructor(props){
        super(props);
        this.userid = this.props.match.params.userid;
        this.state={posts:[]};
    }
    componentDidMount=()=>{
        if(localStorage.getItem("user")!=='t')
            {
                console.log("Help")
                window.location = "/unauthorized";
            }
       
        this.getposts();
    }
    getposts=async()=>{
        console.log('fegr');
        if(this.userid!==localStorage.getItem('id')){
            window.location=`/users/${localStorage.getItem('id')}/allposts`;
        }
        const ini=await fetch(`/mender/posts/${this.userid}`);
        const p=await ini.json();
        console.log(p)
        this.setState({
            posts:p.map((item)=>(
                    
                <Fragment>
                <tr key={item.postid}>
                <th >{item.text}</th>
                </tr>
                </Fragment>
        ))});
    }
    render() {
        return (
            <Fragment>
            <Navber />
            <div className="App">
            <h3 className="text-center">Posts</h3>
            <table className="table table-dark table-striped">
                <tr>
                
                </tr>
                {this.state.posts}
            </table>
            </div>
            <Footer />
            </Fragment>
        )
    }
}

export default allposts
