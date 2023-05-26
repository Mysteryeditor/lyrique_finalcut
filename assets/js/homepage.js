// for the artist tabs
function openTab(evt, tabName) {
    var i, tabContent, tabLinks;
    
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    
    tabLinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function weekend(artistname){
    // artistname=document.getElementById('artistname').textContent;
    // console.log();
    const xhttp=new XMLHttpRequest();
    xhttp.open("GET",`http://localhost:3000/artists`);
    xhttp.send();
    xhttp.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
        var artinfo=JSON.parse(this.responseText);

        for(let a of artinfo){
          if(a.name==artistname){
            console.log(a.imageURL);
            Swal.fire({
           
            })
            
          }
        }
      }
    }
    
  }

  // the username display
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

// for the songs display
function songlist() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/songs");
    xhttp.send();
  
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        const songlist = document.getElementById("songlist");
        const songurl = document.getElementById("player");
        const songname = document.getElementById("songname");
        const albumart = document.getElementById("albumimage");
        const username = document.getElementById("username").textContent;
        
        for (let song of data) {
          const songcontainer = document.createElement('div');
          songcontainer.className = "songcontainer";
          const songName = document.createElement("p");
          songName.className = "title";
  
          // playbutton
          const playbutton = document.createElement('button');
          playbutton.className = "play-btn";
          songName.textContent = song.name;
  
          // the like button using ionicon
          const likebutton = document.createElement('ion-icon');
          likebutton.setAttribute("name", "heart");
          likebutton.classList.add('large-font', 'text-center');

          //to activate the icon if its already liked
          isSongAlreadyLiked(username, song.name, function(isLiked) {
            if (isLiked) {
              likebutton.classList.add('active');
              tooltip.style.display="none";
            }
          });

          //adding hover event to the like button
          const tooltip=document.createElement('div');
          likebutton.addEventListener('mouseover', function() {
            tooltip.textContent = 'like';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'black';
            tooltip.style.color = '#E34612';
            tooltip.style.padding = '5px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.zIndex = '9999';
            tooltip.style.left = (likebutton.offsetLeft + likebutton.offsetWidth) + 'px';
            tooltip.style.top = likebutton.offsetTop + 'px';
            document.body.appendChild(tooltip);
          });
          
          likebutton.addEventListener('mouseout', function() {
            tooltip.parentNode.removeChild(tooltip);
          });
          
          // add click event to the like button
          likebutton.addEventListener("click", function() {
            likebutton.classList.add('active');
            isSongAlreadyLiked(username, song.name, function(isLiked) {
              if (isLiked) {
                likebutton.classList.add('active');
                Swal.fire({
                  title: "Song Already Present",
                  icon: "error",
                  showCancelButton: true,
                  confirmButtonText: "View Liked Songs",
                  reverseButtons: true
                }).then((result)=>{
                    if (result.isConfirmed) {
                      const xhttp=new XMLHttpRequest();
                      xhttp.open("GET",`http://localhost:3000/likes`);
                      xhttp.send();
                      xhttp.onreadystatechange=function(){
                        if(this.readyState==4 && this.status==200){
                          const likedsongs = JSON.parse(this.responseText);
                          var likelist=""
                          for(let likes of likedsongs){
                         if(likes.username===username){
                          likelist+=`<div class="liked-songs-container">
                          <label class="liked-songs-name">${likes.name}</label>
                          <button onclick='removeliked(${likes.id})'>Delete</button><br>`
                         }
                          }
                          likelist+="</div>"
                          Swal.fire({
                            title:"Liked Songs",
                            html:
                            likelist,
                            confirmButtonText:'Return'
                         })   
                      }}
                    }
                });
              } else {
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", "http://localhost:3000/likes");
                xhttp.setRequestHeader("Content-type", "application/json");
  
                xhttp.send(JSON.stringify({
                  username: username,
                  songid: song.id,
                  name: song.name,
                  url: song.url
                }));
              }
            });
          });
  
          const redbg = document.createElement('div');
          redbg.className = "red-bg";
  
          const spanplay = document.createElement('span');
          playbutton.addEventListener("click", function() {
            songurl.src = song.url;
            songname.textContent = song.name;
            albumart.src = song.artwork;
            songurl.play();
          });
          
          songlist.appendChild(songcontainer);
          songcontainer.appendChild(songName);
          songcontainer.appendChild(playbutton);
          songcontainer.appendChild(likebutton);
          playbutton.appendChild(spanplay);
          likebutton.appendChild(redbg);
        }
      }
    }
  }
  
  // Checking if the song is already liked
  function isSongAlreadyLiked(username, song, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/likes`);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(xhttp.responseText);
        for (let songcheck of data) {
          if (songcheck.username === username && songcheck.name === song) {
            callback(true);
            return;
          }
        }
        callback(false);
      }
    }
  }

  //deleting the liked song
function removeliked(songid){
  const xhttp=new XMLHttpRequest();
  xhttp.open("DELETE",`http://localhost:3000/likes/${songid}`)
  xhttp.send();
  xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      Swal.fire({
        title:'Deleted!',
        content:'Your song has been deleted.',
        icon:'success',
        showCancelButton:false,
        confirmButtonText:'Return to Homepage'
    }).
    then((result) => {
      if (result.isConfirmed) {
        location.href = "./Homepage.html";
        // songlist();
      }
    })
    }
  }
}
  // Call the songlist function
  songlist();
 
//for updating the user details
function updateprofile(){
    var username=document.getElementById("username").textContent;
const xhttp=new XMLHttpRequest();
xhttp.open("GET",`http://localhost:3000/users/?username_like=${username}`);
xhttp.send();
xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        
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

// using put method to reflect in the json
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

// function artistdata(){
//     const xhttp=new XMLHttpRequest();
//     xhttp.open("GET",`http://localhost:3000/artists`);
//     xhttp.send();
//     xhttp.onreadystatechange = function () {
//         if(this.readyState==4 && this.status==200)
//         {
          
//           var artistinfo=JSON.parse(this.responseText);
//           console.log(artistinfo);
//           var artists=document.getElementById("artistsinfo");
//           var card=document.createElement('div')
//           card.className="card";

//           var image=document.createElement("img");
//           image.src=artistinfo.imageURL;
//           image.alt=artistinfo.name;
//           image.className="img-top";

//           var cardbody=document.createElement('div');
//           cardbody.className="card-body";

//           var title=document.createElement("h5");
//           heading.className = "card-title";
//           heading.textContent = artistinfo.name;
//           cardbody.appendChild(heading);

//           var ageParagraph = document.createElement("p");
//       ageParagraph.textContent = "Age: " + artistinfo.age;
//       cardbody.appendChild(ageParagraph);

//       var genderParagraph = document.createElement("p");
//       genderParagraph.textContent = "Gender: " + artistinfo.gender;
//       cardbody.appendChild(genderParagraph);

//       // Append the card body to the card element
//       card.appendChild(cardbody);

//       // Append the card to the document or a container element
//       var container = document.getElementById("card-container");
//       container.appendChild(card);
//     }
//   } 
// };
//     artistdata()



  





  


