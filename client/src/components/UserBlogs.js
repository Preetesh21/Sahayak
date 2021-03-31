import React, {Fragment} from "react";

class UserBlogs extends React.Component{
    constructor(props){
        super(props);
        this.userid = this.props.match.params.userid;
        this.state = {Blogs :''};
    }
    componentDidMount(){
        this.fetchPrevUserBlogs();
    }
    submitNewUserBlog = async (event) =>{
        try {
            event.preventDefault();
            const data = new FormData(event.target);
            console.log(data); // reference by form input's `name` tag
            var object = {};
            data.forEach(function(value, key){
                object[key] = value;
            });
            console.log(JSON.stringify(object));
            const resp = await fetch(`http://localhost:5000/mender/${this.userid}/postnewblog`,{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object)
        });
        console.log(resp);
        window.location = `/users/${this.userid}`;
        } catch (err) {
            console.error(err.message);
        }
    }
    newBlogPage = () =>{
        document.getElementById("newBlogUser").innerHTML = `<h4>New Blog</h4><form onSubmit={this.submitNewUserBlog}>Title : <br/><input name="title" type="text" height="2px" width="50px"></input><br/>Body :<br/><input name="textbody" type="text" height="100px" width="50px"></input><br/>Tags : <br/><input name="tags" type="text" ></input><br/><button type="submit" class="btn btn-success">Submit</button></form>`;
    }
    fetchPrevUserBlogs = async (e) =>{
        const resp = await fetch(`http://localhost:5000/mender/${this.userid}/fetchallblogs`);
        const blogs = await resp.json();
        console.log(blogs);

        this.setState({
            Blogs: blogs.map((blog) => (
                <li className="list-group-item" key={blog.blogid}>
                    {blog.blogtitle}
                    <br/>
                    tags : {blog.tags}
                </li>
                ))
            });
    }

    render(){
        return(
            <Fragment>
                <div id="newBlogUser">
                    <button onClick = {this.newBlogPage}class="btn btn-info">Write a new Blog</button>
                    {/* <h4>New Blog</h4>
                    <form>
                    Title : <br/><input type="text" height="2px" width="50px"></input><br/>
                    Body :<br/><input type="text" height="100px" width="50px"></input>
                    <input name"tags" >
                    <button class="btn btn-success">Submit</button>
                    </form> */}
                </div>
                <div id="prevUserBlogs">
                <ul className="list-group">
                    {this.state.Blogs}
                </ul>
                </div>
            </Fragment>
        );
    }
}
export default UserBlogs;