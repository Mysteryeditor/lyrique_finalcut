function authenticate() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/users");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
      const username = document.getElementById("username").value;
      const pwd = document.getElementById("password-field").value;
      const userdata = JSON.parse(this.responseText);
      console.log(username);
      for (let user of userdata) {
        if (user.username === username && user.password === pwd)
         {
          // Authentication successful
          window.location.href = "./homepage.html";
          session(username, pwd);
          return;
        }
        //  else {
          
        //    return;
        //  }
      }
      alert("Invalid Username or Password");
    }
  };
}

  function session(username, pwd) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/login");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
      id: 1,
      username: username,
      password: pwd
    }
    ));
    


  }
