function displayuname(){
    
    const xhttp=new XMLHttpRequest();
    xhttp.open("GET","http://localhost:3000/login");
    xhttp.send();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && xhttp.status==200){
            const userdata=JSON.parse(this.responseText);
            
            var username=userdata[0].username;
            var usercontainer=document.getElementById("username");
            usercontainer.textContent=username;
            console.log(username);
            
        }
    }
}


displayuname();

// for logging out
function logout(){
    const xhttp=new XMLHttpRequest();
    xhttp.open("DELETE","http://localhost:3000/login/1");
    xhttp.send();
    window.location.href="./authentication.html"
}

function songlist(){
    const xhttp=new XMLHttpRequest();
    xhttp.open("GET","http://localhost:3000/songs");
    xhttp.send();
    
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            const data=JSON.parse(this.responseText);
            const songlist=document.getElementById("songlist");
            for (let song of data){
                const songName = document.createElement("p");
                songName.textContent = song.name;
                songlist.appendChild(songName);
            }
        }
    }
    
    
  
}
songlist();


// for updating the user details
function updateprofile(){
    var username=document.getElementById("username").textContent;
const xhttp=new XMLHttpRequest();
xhttp.open("GET",`http://localhost:3000/users/?username_like=${username}`);
xhttp.send();
xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        console.log(this.responseText);
        
        const userdetail=JSON.parse(this.responseText);
        for(let data of userdetail){
            document.getElementById('user_id').value=data['id']
            document.getElementById("Username").value=data['username'];
            document.getElementById("gender").value=data['gender'];
            document.getElementById("dob").value=data['dob'];
            document.getElementById("email").value=data['email'];
            document.getElementById("password").value=data['password'];
        }
    }
}
}

function updateprofile2(uid){
const xhttp=new XMLHttpRequest();
var usname=document.getElementById("Username").value;
const gender=document.getElementById("gender").value;
const dob=document.getElementById("dob").value;
const email=document.getElementById("email").value;
var password=document.getElementById("password").value;
xhttp.open("PUT",`http://localhost:3000/users/${uid}`);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhttp.send(JSON.stringify({
    "username":usname,
    "gender":gender,
    "dob":dob,
    "email":email,
    "password":password
})
);
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
   Swal.fire({
    title: 'Profile Updated Successfully',
    text: 'Please login to continue',
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            logout();
            }
})

   
    }
    
  };

}


  





  


