function showPopup() {
  $(document).ready(function() {

    // Check if the modal was already shown
    if (!localStorage.getItem('modalShown')) {
      $('#modalpopup').modal('show');
     localStorage.setItem('modalShown', true);
     }
  });
}

// After 3 seconds
setTimeout(showPopup, 3000);

// for the modal that is shown when the page is loaded up
$(document).ready(function(){
  $('#dancingnotes').hide();
  const modalbody=document.getElementById(`modalbody`)
  const xhttp=new XMLHttpRequest();
  var songid=Math.floor(Math.random()*36);
  xhttp.open("GET",`http://localhost:3000/songs/${songid}`);
  xhttp.send();
  xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      const json=JSON.parse(this.responseText);
      const wholediv=document.createElement(`div`);
      wholediv.className=`row`;
      const leftdiv=document.createElement('div');
      leftdiv.className=`col-6`;
      const title=document.createElement('h6');
      title.innerHTML='Title:';
      const linebreak=document.createElement('br');
      const songname=document.createElement('label');
      songname.innerHTML=json.name;
      const Artist=document.createElement('h6');
      Artist.innerHTML='Artist:';
      const artist=document.createElement(`label`);
      artist.innerHTML=json.Artist;
      const rightdiv=document.createElement('div');
      rightdiv.className=`col-6`;
      const artwork=document.createElement(`img`);
      artwork.style.width=`100%`
      artwork.style.height=`100%`
      artwork.src=json.artwork;
      const button=document.createElement('button');
      button.className=`btn btn-primary`;
      button.innerHTML='Listen Now';
      button.addEventListener('click',function(){
        playSong(json.url, json.name, json.artwork);
        $('#modalpopup').modal('hide');
      });

      modalbody.appendChild(wholediv);
      wholediv.appendChild(leftdiv);
      wholediv.appendChild(rightdiv);
      leftdiv.appendChild(title);
      leftdiv.appendChild(songname);
      leftdiv.appendChild(linebreak);
      leftdiv.appendChild(Artist);
      leftdiv.appendChild(artist);
      leftdiv.appendChild(linebreak);
      leftdiv.appendChild(button);
      rightdiv.appendChild(artwork);      
    }
  }
})



//for the toggle inside navbar
function toggleOptions() {
  var profileNavItem = document.getElementById("profileNavItem");
  var deleteNavItem = document.getElementById("deleteNavItem");
  var logoutNavItem = document.getElementById("logoutNavItem");

  profileNavItem.classList.toggle("d-none");
  deleteNavItem.classList.toggle("d-none");
  logoutNavItem.classList.toggle("d-none");
}

//for the dancing notes animation
for(var i=0;i<9;i++) {
  var x = $('#dancingnotes');
  $(x).css('-webkit-animation','music 1s '+i+'00ms  ease-in-out both infinite');
}
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
// the username display in the navbar
function displayuname() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/login");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && xhttp.status == 200) {
      const userdata = JSON.parse(this.responseText);
      var username = userdata[0].username;
      var usercontainer = document.getElementById("username");
      usercontainer.textContent = username;
    }
  }
}
displayuname();

// for logging out
function logout() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/login/1");
  xhttp.send();
  localStorage.removeItem('modalShown');
  window.location.href = "./authentication.html"
}

// for the songs display
function songlist() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/songs");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);
      const songlist = document.getElementById("songlist");
      const songurl = document.getElementById("player");
      const songname = document.getElementById("songname");
      const albumart = document.getElementById("albumimage");
      const username = document.getElementById("username").textContent;

      for (let song of data) {
        const songcontainer = document.createElement('div');
        songcontainer.classList.add("col-lg-4","col-sm-6","col-md-6","songcontainer");
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
        isSongAlreadyLiked(username, song.name, function (isLiked) {
          if (isLiked) {
            likebutton.classList.add('active');
            tooltip.style.display = "none";
          }
        });

        //adding hover event to the display a tooltip for like button
        const tooltip = document.createElement('div');
        likebutton.addEventListener('mouseover', function () {
          tooltip.textContent = 'LIKE';
          tooltip.style.position = 'absolute';
          tooltip.style.backgroundColor = 'azure';
          tooltip.style.color = '#E34612';
          tooltip.style.padding = '5px';
          tooltip.style.borderRadius = '5px';
          tooltip.style.zIndex = '9999';
          tooltip.style.left = (likebutton.offsetLeft + likebutton.offsetWidth) + 'px';
          tooltip.style.top = likebutton.offsetTop + 'px';
          document.body.appendChild(tooltip);
        });

        likebutton.addEventListener('mouseout', function () {
          tooltip.parentNode.removeChild(tooltip);
        });

        // add click event to the like button
        likebutton.addEventListener("click", function () {
          likebutton.classList.add('active');
          isSongAlreadyLiked(username, song.name, function (isLiked) {
            if (isLiked) {
              likebutton.classList.add('active');
              Swal.fire({
                title: "Song Already Present",
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "View Liked Songs",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  const xhttp = new XMLHttpRequest();
                  xhttp.open("GET", `http://localhost:3000/likes`);
                  xhttp.send();
                  xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                      const likedsongs = JSON.parse(this.responseText);
                      var likelist = ""
                      for (let likes of likedsongs) {
                        // if the username matches the songs are retrieved
                        if (likes.username === username) {
                          likelist += `<div class="liked-songs-container">
                          <label class="liked-songs-name">${likes.name}</label>
                          
                          <button style="border-radius:5px" class="btn-danger" onclick='removeliked(${likes.id},${likes.songid})'>Delete</button><br>`
                        }
                      }
                      likelist += "</div>"
                      Swal.fire({
                        title: "Liked Songs",
                        html:
                          likelist,
                        confirmButtonText: 'Return'
                      }).then((result)=>{
                        if(result.isConfirmed){
                          songlist();
                        }
                      })
                    }
                  }
                  
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
                url: song.url,
                artwork:song.artwork
              }));

              const likeincrement=new XMLHttpRequest();
              likeincrement.open("GET", `http://localhost:3000/songs/${song.id}`);
              likeincrement.send();
              likeincrement.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                  const li=JSON.parse(this.responseText);
                  var likecount=li.likes;
                  likecount++;
                  const xhttp = new XMLHttpRequest();
                  xhttp.open("PUT", `http://localhost:3000/songs/${song.id}`);
                  xhttp.setRequestHeader("Content-type", "application/json");
                  xhttp.send(JSON.stringify({
                    id:li['id'],
                    name: li['name'],
                    url: li['url'],
                    Artist:li['Artist'],
                    year:li["year"],
                    language:li["language"],
                    artwork: li['artwork'],
                    likes: likecount

                  }));
                  
                 

                }
              }

            }
          });
        });

        const redbg = document.createElement('div');
        redbg.className = "red-bg";

        const spanplay = document.createElement('span');

        // button for playing the song
        playbutton.addEventListener("click", function () {
          
          playSong(song.url,song.name,song.artwork);

         
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
  xhttp.onreadystatechange = function () {
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
function removeliked(id,songid) {
  console.log(songid);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:3000/likes/${id}`)
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      Swal.fire({
        title: 'Deleted!',
        content: 'Your song has been deleted.',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Return to Homepage'
      }).
        then((result) => {
          if (result.isConfirmed) {
            // location.href = "./Homepage.html";
          }
        })
    }
  }

  const likedecrement=new XMLHttpRequest();
  likedecrement.open("GET", `http://localhost:3000/songs/${songid}`);
  likedecrement.send();
  likedecrement.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const ld=JSON.parse(this.responseText);
      var likecount=ld.likes;
      likecount--;
      const xhttp = new XMLHttpRequest();
      xhttp.open("PUT", `http://localhost:3000/songs/${songid}`);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify({
        id:ld['id'],
        name: ld['name'],
        url: ld['url'],
        Artist:ld['Artist'],
        year:ld["year"],
        language:ld["language"],
        artwork: ld['artwork'],
        likes: likecount

      }));
      
     

    }
  }

}
// Call the songlist function
songlist();

//viewing liked songs
function likedSongs() {
  const xhttp = new XMLHttpRequest();
  const username = document.getElementById("username").textContent;
  xhttp.open("GET", `http://localhost:3000/likes`);
  xhttp.send();
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      const likedsongs = JSON.parse(this.responseText);
      var likelist = ""
      for (let likes of likedsongs) {
        if (likes.username === username) {
          likelist += `<div class="liked-songs-container">
      <label class="liked-songs-name">${likes.name}</label>
      <button class="btn-danger" style="border-radius:5px;color:azure;background-color:rgb(227, 70, 18)" onclick='playSong("${likes.url}", "${likes.name}", "${likes.artwork}")'>Play</button>
      <button class="btn-danger" style="border-radius:5px" onclick='removeliked(${likes.id},${likes.songid})'>Delete</button><br>`
        }
      }
      likelist += "</div>"
      Swal.fire({
        title: "Liked Songs",
        html:
          likelist,
        confirmButtonText: 'Return'
      })
    }
  }
}

//song to be played from the liked songs list
function playSong(url, name, artwork) {
  $('#dancingnotes').show();
  var songurl = document.getElementById("player");
  var songname = document.getElementById("songname");
  var albumart = document.getElementById("albumimage");
  songurl.src = url;
  songname.textContent = name;
  albumart.src = artwork;
  songurl.play();
  document.getElementById("mp").scrollIntoView({
    behavior: "smooth" // You can use 'auto' for instant scrolling
  });
}


//for updating the user details
function updateprofile() {
  var username = document.getElementById("username").textContent;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/users/?username_like=${username}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      const userdetail = JSON.parse(this.responseText);
      for (let data of userdetail) {
        document.getElementById('user_id').value = data['id']
        document.getElementById("Username").value = data['username'];
        document.getElementById("gender").value = data['gender'];
        document.getElementById("dob").value = data['dob'];
        document.getElementById("email").value = data['email'];
        document.getElementById("password").value = data['password'];
      }
    }
  }
}

// using put method to reflect in the json
function updateprofile2(uid) {
  const xhttp = new XMLHttpRequest();
  var usname = document.getElementById("Username").value;
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  xhttp.open("PUT", `http://localhost:3000/users/${uid}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "username": usname,
    "gender": gender,
    "dob": dob,
    "email": email,
    "password": password
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

function userDelete(){
  var u=document.getElementById("u").value;
  var p=document.getElementById("p").value;
  // if the username field is empty
  if(!u){
    Swal.fire({
      title: 'Enter your username',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
    return false;
  }

  // validation for password field
  if(!p){
    Swal.fire({
      title: 'Enter the password',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    })
    return false;
  }

  // after validations
  Swal.fire({
    title: 'Final Confirmation',
    text: 'Are you sure you want to delete the account?',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET",`http://localhost:3000/users`);
      xhttp.send();
      xhttp.onreadystatechange=function(){
        if(this.readyState == 4 && this.status == 200){
          {
            var jsonresult = JSON.parse(this.responseText);
           for(let x of jsonresult){
            console.log(x.username);
            if(x.username == u && x.password == p){
              const deletereq=new XMLHttpRequest();
              deletereq.open("DELETE", `http://localhost:3000/users/${x.id}`); 
              deletereq.send();
              logout();
              break;
            }
            }
            Swal.fire({
              title: 'Invalid username or password',
              icon: 'warning',
              showCancelButton: false,
              confirmButtonText: 'Try Again'
            });
          }
      }
 
      
    }
  }
});
}

function artist(){
  window.location.href="./artists.html";
}

function mostLiked(){
  const likestats=new XMLHttpRequest();
  const likes=[];
  likestats.open("GET",`http://localhost:3000/songs`)
  likestats.send();
  likestats.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      const result=JSON.parse(this.responseText);
      for(let lc of result){
        if(lc.likes!=0){
          if(!likes.includes(lc.likes)){
            likes.push(lc.likes);
          }
        }
      }
    likes.sort();  
    likes.reverse(); 
    for(let count of likes){
      const highlikes=new XMLHttpRequest();
      highlikes.open("GET",`http://localhost:3000/songs?likes_like=${count}`);
      highlikes.send()
      highlikes.onreadystatechange=function(){
      if(this.readyState==4 && this.status==200){
        const abc=JSON.parse(this.responseText);
        for (const i of abc) {

        }

      }
      }
    }   
    }
  }
}

mostLiked()










