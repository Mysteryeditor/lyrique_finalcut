// to display username
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

function viewsongs(){
const xhttp=new XMLHttpRequest();
xhttp.open("GET","http://localhost:3000/songs");
xhttp.send();
xhttp.onreadystatechange=function(){
    console.log(this.responseText);
    if(this.readyState==4 && this.status==200){
        var songdet="";
        const songs=JSON.parse(this.responseText);
        for(let song of songs){
            songdet+="<tr>";
            songdet+="<td>"+song["id"]+"</td>";
            songdet+="<td>"+song["name"]+"</td>";
            songdet+="<td>"+song["Artist"]+"</td>";
            songdet+="<td>"+song["year"]+"</td>";
            songdet+='<td><img style="width:50px;height:50px" src="'+song["artwork"]+'"></td>';
            songdet += '<td><button type="button" onclick="showLyrics(\'' + song["name"] + '\')">Lyrics</button></td>';
            songdet+="</tr>";

        }
        document.getElementById("songs").innerHTML=songdet;

    }
   
}
}
viewsongs();

// for loggin out
function logout(){
  const xhttp=new XMLHttpRequest();
  xhttp.open("DELETE","http://localhost:3000/login/1");
  xhttp.send();
  window.location.href="./authentication.html"
}

function showLyrics(songName) {

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/lyrics");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const lyrics = JSON.parse(this.responseText);
        const songLyrics = lyrics.find((song) => song.name === songName);
        if (songLyrics) {
          var element = document.getElementById("lyricsContainer");
          element.scrollIntoView({ behavior: "smooth" });
          const lyricsContainer = document.getElementById("lyricsContainer");
          lyricsContainer.innerHTML = `<h2>${songName} - Lyrics</h2><p>${songLyrics.lyrics}</p>`;
        } else {
          console.log("Lyrics not found for the selected song.");
        }
      }
    };
  }

  





