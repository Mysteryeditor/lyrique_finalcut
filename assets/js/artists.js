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
  
            // Create a Bootstrap card for each unique artist
            uniqueArtists.forEach(function (artist) {
              var card = document.createElement('div');
              card.className = 'card';
  
              var cardBody = document.createElement('div');
              cardBody.className = 'card-body';
  
              var artistName = document.createElement('h5');
              artistName.className = 'card-title';
              artistName.textContent = artist;
  
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

 
  
  
  
  
  