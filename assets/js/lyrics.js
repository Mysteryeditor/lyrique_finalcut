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
            songdet+='<td><img style="width:50px;height:50px" src="'+song["image"]+'"></td>';
            songdet += '<td><button type="button" onclick="showLyrics(\'' + song["name"] + '\')">Lyrics</button></td>';
            songdet+="</tr>";

        }
        document.getElementById("songs").innerHTML=songdet;

    }
   
}
}
viewsongs();

function showLyrics(songName) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/lyrics");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const lyrics = JSON.parse(this.responseText);
        const songLyrics = lyrics.find((song) => song.name === songName);
        if (songLyrics) {
          const lyricsContainer = document.getElementById("lyricsContainer");
          lyricsContainer.innerHTML = `<h2>${songName} - Lyrics</h2><p>${songLyrics.lyrics}</p>`;
        } else {
          console.log("Lyrics not found for the selected song.");
        }
      }
    };
  }

  





