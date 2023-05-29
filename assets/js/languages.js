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
    window.location.href = "./index.html";
}


function displaylang() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/songs");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        if (Array.isArray(data)) {
          var lang = [];
          data.forEach(function (song) {
            if (song.language && !lang.includes(song.language)) {
              lang.push(song.language);
            }
          });
          var langcard = document.getElementById("lang-list");
  
          lang.forEach(function (lang) {
            var card = document.createElement("div");
            card.className = "card m-2";
  
            var cardbody = document.createElement('div');
            cardbody.className = "card-body";
  
            var language = document.createElement('h6');
            language.className = "card-title";
            language.textContent = lang;
  
            var songList = document.createElement('ul');
            songList.className = "song-list";
            songList.style.display = "none"; // Hide the song list by default
  
            // Attach click event listener to the card body
            cardbody.addEventListener("click", function () {
              if (songList.style.display === "none") {
                songList.style.display = "block";
              } else {
                songList.style.display = "none";
              }
            });
  
            cardbody.appendChild(language);
            cardbody.appendChild(songList);
            card.appendChild(cardbody);
            langcard.appendChild(card);
          });
  
          data.forEach(function (song) {
            if (song.language && !lang.includes(song.language)) {
              lang.push(song.language);
              var card = document.createElement("div");
              card.className = "card m-2";
  
              var cardbody = document.createElement('div');
              cardbody.className = "card-body";
  
              var language = document.createElement('h6');
              language.className = "card-title";
              language.textContent = song.language;
  
              var songList = document.createElement('ul');
              songList.className = "song-list";
              songList.style.display = "none"; // Hide the song list by default
  
              // Attach click event listener to the card body
              cardbody.addEventListener("click", function () {
                if (songList.style.display === "none") {
                  songList.style.display = "block";
                } else {
                  songList.style.display = "none";
                }
              });
  
              cardbody.appendChild(language);
              cardbody.appendChild(songList);
              card.appendChild(cardbody);
              langcard.appendChild(card);
            }
  
            var languageCards = document.querySelectorAll('h6.card-title');
            languageCards.forEach(function (card) {
              if (card.textContent === song.language) {
                var songList = card.parentNode.querySelector('.song-list');
                var songListItem = document.createElement('li');
                songListItem.textContent = song.name;
                songList.appendChild(songListItem);
              }
            });
          });
        } else {
          console.log("invalid data format");
        }
      }
    }
  }
  
  displaylang();
  
  
  
  

