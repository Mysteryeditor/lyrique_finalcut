function authenticate() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/users");
    xhttp.send();
  
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
        const email = document.getElementById("email").value;
        const pwd = document.getElementById("password-field").value;
        const userdata = JSON.parse(this.responseText);
  
        for (let user of userdata) {
          if (user.email === email && user.password === pwd) {
            // Authentication successful
            return;
          }
          else{
            console.log("Authentication failed");
            return;
          }
        }
      }
    };
  }

  