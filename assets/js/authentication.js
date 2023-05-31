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
      }
      Swal.fire({
        icon:"error",
        title:"Oops...",
        text:"Invalid username/password"
      });
     
    }
  };
}

// for storing the username and password of the current user
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

  // forgot password
  function forgotPassword(){
    Swal.fire({
      title: 'Enter Username',
      input: 'text',
      inputLabel: 'Username',
      inputAttributes: {
        required: 'true'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Next',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        const username = result.value;
        
        Swal.fire({
          title: 'Enter Email',
          input: 'email',
          inputLabel: 'Email',
          inputAttributes: {
            required: 'true'
          },
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Next',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            const email = result.value;
            
            Swal.fire({
              title: 'Enter Date of Birth',
             html:` <label for="dob">Date of Birth:</label>
             <input type="date" id="dob" name="dob" required><br><br>`,
              showCancelButton: true,
              cancelButtonText: 'Cancel',
              confirmButtonText: 'Submit',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                const xhttp=new XMLHttpRequest;
                xhttp.open("GET",`http://localhost:3000/users`);
                xhttp.send();
                xhttp.onreadystatechange=function(){
                  if(this.readyState==4 && this.status==200){
                    const jsonData=JSON.parse(this.responseText);
                    for(let a of jsonData){
                      if(a.username==username && a.email==email){
                        Swal.fire(
                          'success'
                        )
                      }
                    }
                  }
                }
              }
            });
          }
        });
      }
    });
  }