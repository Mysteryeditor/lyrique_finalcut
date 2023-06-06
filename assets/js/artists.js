// to display the username in the navbar
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

// for loggin out
function logout(){
  const xhttp=new XMLHttpRequest();
  xhttp.open("DELETE","http://localhost:3000/login/1");
  xhttp.send();
  window.location.href = "./index.html"
}

// to display the artists of the songs
function displayUniqueArtists() {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/songs');
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) 
         {
          var data = JSON.parse(xhttp.responseText);
          if (Array.isArray(data)) {
            var uniqueArtists = [];
  
            // Iterate through the songs array and extract unique artist names
            data.forEach(function (song) {
              if (song.Artist && !uniqueArtists.includes(song.Artist)) {
                uniqueArtists.push(song.Artist);
              }
            });
  
            var cardContainer = document.getElementById('card-container'); //Container element for the cards
            uniqueArtists.sort();
            // Create a Bootstrap card for each unique artist
            uniqueArtists.forEach(function (artist) {
              var card = document.createElement('div');
              card.className = 'card';
  
              var cardBody = document.createElement('div');
              cardBody.className = 'card-body';
  
              var artistName = document.createElement('h5');
              artistName.className = 'card-title';
              artistName.textContent = artist;

              artistName.addEventListener("click",function(){
                const xhttp=new XMLHttpRequest();
                xhttp.open("GET",'http://localhost:3000/artists');
                xhttp.send();
                xhttp.onreadystatechange = function () {
                  if (xhttp.readyState === 4 && xhttp.status === 200){
                    var artinfo=JSON.parse(this.responseText);
                    for(let a of artinfo){
                      if(a.name===artist){
                        var rand=Math.floor(Math.random()*3)
                        Swal.fire({
                          title: 'Artist Info',
                          html:`<div class="row">
                          <div class="col-lg-6 ">
                          <h2>${a.name}</h2>
                          <label>Age:</label>&nbsp${a.age}<br>
                          <label>Gender:</label>&nbsp${a.gender}<br>
                          <label>Best Album:</label>&nbsp${a.albums[rand].title}&nbsp ${a.albums[rand].year}<br>
                          </div>
                          <div class="col-lg-6">
                          <img style="height:100%" class="img-fluid" alt="artist img" src=${a.imageURL}></div>`,
                          confirmButtonText:'Go Back'
                        })
                        break;
                      }
                      else{
                        Swal.fire({
                          icon:'warning',
                          title:'Database Updation',
                          text:'Sorry,We are a work in Progress'
                        })
                      }
                    }
                  }
                }
              })
  
              cardBody.appendChild(artistName);
              card.appendChild(cardBody);
              cardContainer.appendChild(card);
            });
          } else {
            console.error('Invalid data format.');
          }
        } else {
          console.error('Error: ' + xhttp.status);
        }
      
    };
  
   
  }
  
  // Call the displayUniqueArtists() function
  displayUniqueArtists();

 
  
  
  
  
  