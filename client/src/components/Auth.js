var Auth = (function() {
    var id = "";
    var user="";
    var counselor="";
    var speaker="";
  
    var getuser = function() {
      return user;    // Or pull this from cookie/localStorage
    };
    
    var getspeaker=function(){
        return speaker;
    }
    var getcounselor=function(){
        return counselor;
    }
    var getid = function() {
        return id;    // Or pull this from cookie/localStorage
    };

    var setID = function(ids) {
        console.log('hello',ids)
        id = ids;     
      // Also set this in cookie/localStorage
    };
  
    var setuser = function(users) {
        console.log('hello',users)
        user = users;     
        // Also set this in cookie/localStorage
      };
    var setspeaker = function(speaker) {
        console.log('hello',speaker)
        speaker = speaker;     
        // Also set this in cookie/localStorage
      };
    var setcounselor = function(counselor) {
        console.log('hello',counselor)
        counselor = counselor;     
        // Also set this in cookie/localStorage
      };

    return {
      getuser: getuser,
      getid: getid,
      setID:setID,
      setuser: setuser,
      setcounselor:setcounselor,
      setspeaker:setspeaker,
      getspeaker:getspeaker,
      getcounselor:getcounselor
    }
  
  })();
  
  export default Auth;