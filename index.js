const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");
var bcrypt = require('bcryptjs');
const path=require('path');

const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
  }
// Routes
// New User Signup
app.post('/mender/users',async (req,res)=>{
    const data = req.body;
    bcrypt.genSalt(10, async function(err, salt) {
        bcrypt.hash(data["passwdus"], salt,async  function(err, hash) {
            // Store hash in your password DB.
            //console.log(hash)
            const putUser = await pool.query("insert into menderschema.users(email, username,password,age, gender, creditCardNumber, phoneNumber, whatsappNumber, sessionsTaken,talksAttended) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[data["emailus"],data["usernameus"],hash,data["ageus"],data["genderus"],data["creditus"],data["phoneus"],data["phonewtspus"],0,0]);
            res.json(putUser.rows[0]);
        });
    });
});

// Existing User Login
app.get('/mender/users/:email&:password',async(req,res)=>{
    const { email,password } = req.params;
    const getPasswd = await pool.query("select password,userID from menderschema.users where email=$1",[email]);
    //console.log(getPasswd.rows[0]);
    bcrypt.compare(password, getPasswd.rows[0].password, function(err, res2) {
        //console.log(res2)
        if(res2===true)
        {
            res.send(getPasswd.rows[0]);
        }
        else{
            res.send(null)
        }
    });
    
});

// Getting user's all posts
app.get('/mender/posts/:userid',async(req,res)=>{
    const {userid}=req.params;
    //console.log("li")
    const q=await pool.query("select * from menderschema.posts where userid=$1",[userid]);
    //console.log(q.rows)
    res.send(q.rows);
});

// Getting a User's all appointments
app.get('/mender/getappo/:userid',async(req,res)=>{
    const {userid} = req.params;
    const q = await pool.query("select * from menderschema.bookedby as b,menderschema.appointments as a where b.appointmentid = a.appointmentid and b.userid = $1",[userid]);
    res.send(q.rows);
});

// Getting all talks attended by a user
app.get('/mender/gettalks/:userid',async(req,res)=>{
    const {userid} = req.params;
    const q = await pool.query("select * from menderschema.attends as b,menderschema.talks as a where b.talkid = a.talkid and b.userid = $1",[userid]);
    res.send(q.rows);
});

// New Counselor Signup
app.post('/mender/counselors',async (req,res)=>{
    const data = req.body;
    bcrypt.genSalt(10, async function(err, salt) {
        bcrypt.hash(data["passwdcs"], salt,async  function(err, hash) {
            // Store hash in your password DB.
            //console.log(hash ,'hello')
            const putUser = await pool.query("insert into menderschema.counselors(name,email, username,password,age, gender, bankAccountNumber,IFSCcode,priority1,priority2,priority3,priority4, phoneNumber, whatsappNumber,fee,sessionsTaken,bDegree,mDegree,extraCourses,practicalExperience,portfolio,sessionRatings) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)",[data["namecs"],data["emailcs"],data["usernamecs"],hash,data["agecs"],data["gendercs"],data["bankcs"],data["ifsccs"],data["pr1cs"],data["pr2cs"],data["pr3cs"],data["pr4cs"],data["phonecs"],data["phonewtspcs"],data["feecs"],0,data["bdegreecs"],data["mdegreecs"],data["coursecs"],data["yoecs"],data["portfoliocs"],0]);
            res.json(putUser.rows[0]);
        });
    });

    
});

// Existing Counselor Login
app.get('/mender/counselors/:email&:password',async(req,res)=>{
    const { email,password } = req.params;
    const getPasswd = await pool.query("select counselorID,password from menderschema.counselors where email=$1",[email]);
    //console.log(getPasswd.rows[0]);
    bcrypt.compare(password, getPasswd.rows[0].password, function(err, res2) {
        //console.log(res2)
        if(res2===true)
        {
            res.send(getPasswd.rows[0]);
        }
        else{
            res.send(null)
        }
    });
});

// New Speaker Signup
app.post('/mender/speakers',async (req,res)=>{
    const data = req.body;
    bcrypt.genSalt(10, async function(err, salt) {
        bcrypt.hash(data["passwdss"], salt,async  function(err, hash) {
            // Store hash in your password DB.
            //console.log(hash)
            const putUser = await pool.query("insert into menderschema.speakers(name,email, username,password,age, gender, bankAccountNumber,IFSCcode,phoneNumber,sessionsTaken,practicalExperience,portfolio,talksRatings) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[data["namess"],data["emailss"],data["usernamess"],hash,data["agess"],data["genderss"],data["bankss"],data["ifscss"],data["phoness"],0,data["yoess"],data["portfolioss"],0]);
    res.json(putUser.rows[0]);
        });
    });

});

// Existing Speaker Login
app.get('/mender/speakers/:email&:password',async(req,res)=>{
    const { email,password } = req.params;
    const getPasswd = await pool.query("select password,speakerID from menderschema.speakers where email=$1",[email]);
    //console.log(getPasswd.rows[0]);
    bcrypt.compare(password, getPasswd.rows[0].password, function(err, res2) {
        //console.log(res2)
        if(res2===true)
        {
            res.send(getPasswd.rows[0]);
        }
        else{
            res.send(null)
        }
    });
});

// Get data of speaker
app.get('/mender/speakersdash/:speakerid',async(req,res)=>{
    const { speakerid } = req.params;
    // //console.log("select password from menderschema.users where email='$1",[email]);
    const getPasswd = await pool.query("select * from menderschema.speakers where speakerid=$1",[speakerid]);
    //console.log(getPasswd.rows[0]);
    res.send(getPasswd.rows[0]);
});


// Get data of counselor
app.get('/mender/counselordash/:counselorid',async(req,res)=>{
    const { counselorid } = req.params;
    // //console.log("select password from menderschema.users where email='$1",[email]);
    const getPasswd = await pool.query("select * from menderschema.counselors where counselorid=$1",[counselorid]);
    //console.log(getPasswd.rows[0]);
    res.send(getPasswd.rows[0]);
});


// Get all talks by a speaker
app.get('/mender/alltalks/:speakerid',async(req,res)=>{
    const { speakerid } = req.params;
    // //console.log("select password from menderschema.users where email='$1",[email]);
    const getPasswd = await pool.query("select * from menderschema.talks as t,menderschema.gives as g where t.talkid = g.talkid and speakerid=$1",[speakerid]);
    //console.log(getPasswd.rows);
    res.send(getPasswd.rows);
});

// push new talk by a speaker
app.post('/mender/:speakerid/pushnewtalk',async(req,res)=>{
    const {speakerid} = req.params;
    const data = req.body;
    //console.log(data);
    const pushit = await pool.query("insert into menderschema.talks(talktitle , talkdesc,talkDate, talkTime, maxEntries , venue , bookedSeats , fee, rating) values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning talkid",[data["title"],data["desc"],data["date"],data["time"],data["maxent"],data["venue"],0,data["fee"],0]);
    const xx = await pool.query("insert into menderschema.gives(talkid,speakerid) values($1,$2)",[pushit.rows[0]["talkid"],speakerid]);
    res.send(xx.rows);
})

app.post('/mender/posts/:userid',async(req,res)=>{
    const {userid}=req.params
    const data=req.body;
    //console.log(userid,data)
    try{
    const xx=await pool.query("insert into menderschema.posts(text,userID) values($1,$2)",[data['text'],userid]);
    res.send("Success");
    }
    catch(err){
        //console.log(err)
        res.send(null);
    }
})
// getting list of all counselors
app.get('/mender/allcounselors',async(req,res)=>{
    const getAllCounselors = await pool.query("select counselorID,name,age,priority1,priority2,priority3,sessionstaken,bDegree,mDegree,extraCourses,practicalExperience,portfolio,sessionRatings from menderschema.counselors");
    res.send(getAllCounselors.rows);
})

// getting all busy slots of a particular counselor
app.get('/mender/:counselorid/busyslots',async(req,res)=>{
    //console.log("okk");
    const {counselorid} = req.params;
    //console.log("fetching his/her busy slots...");
    const fetchBusy = await pool.query("select a.bookdate, a.booktime  from menderschema.appointments as a, menderschema.bookedfor as b where a.appointmentid = b.appointmentid and b.counselorid = $1",[counselorid]);
    //console.log(fetchBusy.rows);
    res.send(fetchBusy.rows);
})


// getting all busy slots of a particular counselor
app.get('/mender/apps/:counselorid',async(req,res)=>{
    //console.log("okk");
    const {counselorid} = req.params;
    //console.log(counselorid)
    //console.log("fetching his/her busy slots...");
    const fetchBusy = await pool.query("select a.appointmentid,a.bookdate,a.venue,a.rating, a.booktime  from menderschema.appointments as a, menderschema.bookedfor as b where a.appointmentid = b.appointmentid and b.counselorid = $1",[counselorid]);
    //console.log(fetchBusy.rows);
    res.send(fetchBusy.rows);
})

// posting new appointment
app.post('/mender/:userid/bookappointment/:counselorid',async(req,res)=>{
    //console.log(req.params["userid"]);
    const userid = req.params["userid"];
    const counselorid = req.params["counselorid"];
    const data = req.body;
    //console.log(data);
    // const link = "here is the link";
    const xx = await pool.query("insert into menderschema.appointments(bookDate, bookTime, venue, rating) values($1,$2,$3,0) returning appointmentid",[data["date"],data["time"],data["link"]]);
    const yy = await pool.query("insert into menderschema.bookedby(appointmentid,userid) values($1,$2)",[xx.rows[0]["appointmentid"],userid]);
    const zz = await pool.query("insert into menderschema.bookedfor(appointmentid,counselorid) values($1,$2)",[xx.rows[0]["appointmentid"],counselorid]);
    res.send(zz.rows);
})

// getting all talks
app.get('/mender/alltalks',async(req,res)=>{
    const gettalks = await pool.query("select * from menderschema.talks");
    //console.log(gettalks.rows);
    res.send(gettalks.rows);

})

// posting the responses of objective test
app.post('/mender/:userid/putobjresp',async(req,res)=>{
    const {userid} = req.params;
    //console.log("rhjjfehfehf");
    const data = req.body;
    const putInObjResp = await pool.query("insert into menderschema.objectiveresponses(ans1, ans2, ans3, ans4, ans5, ans6 , ans7, ans8, ans9, ans10, ans11, ans12, ans13, ans14, ans15) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) returning responseid",[data["q1"],data["q2"],data["q3"],data["q4"],data["q5"],data["q6"],data["q7"],data["q8"],data["q9"],data["q10"],data["q11"],data["q12"],data["q13"],data["q14"],data["q15"]]);
    //console.log(putInObjResp.rows[0]);
    const putIn = await pool.query("insert into menderschema.objectivelyRespondedBy(responseID,userID) values($1,$2)",[putInObjResp.rows[0]['responseid'],userid]);
    res.send(putIn.rows);
})

app.post('/mender/:userid/registertalk/:talkid',async(req,res)=>{
    const {userid,talkid} = req.params;
    const register = await pool.query("insert into menderschema.attends(talkid,userid) values($1,$2)",[talkid,userid]);
    const reg2 = await pool.query("update menderschema.talks set bookedseats = bookedseats+1 where talkid = $1",[talkid]);
    res.send(register.rows[0]);
})

app.get('/mender/registeredtalks/:userid',async(req,res)=>{
    const {userid} = req.params;
    const fet = await pool.query("select talkid from menderschema.attends as t where t.userid = $1",[userid]);
    res.send(fet.rows);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });

app.listen(PORT, () => {
    //console.log(`server has started on port ${PORT}`);
});