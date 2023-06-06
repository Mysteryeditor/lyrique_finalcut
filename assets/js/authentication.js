// for the toggle button of show password
function togglePasswordVisibility() {
  var passwordField = document.getElementById('password-field');
 

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
      
  } else {
    passwordField.type = 'password';
    
  }
}
// authenticating the username and password from the json
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
          session(username, pwd,user.profilepic);
          return;
        }
      }
      Swal.fire({
        icon:"error",
        title:"Oops...",
        text:"Invalid username/password",
        footer: `<span></span>
        <a id="forgotpassword" onclick="forgotPassword()">Forgot Your Password?Click here To Reset!</>`
      });
     
    }
  };
}

// for storing the username and password of the current user
  function session(username, pwd,dp) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/login");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
      id: 1,
      username: username,
      password: pwd,
      profilepic:dp

    }
    ));
  }

  // forgot password
  function forgotPassword() {
    Swal.fire({
      title: 'Verification',
      input: 'text',
      inputLabel: 'Username',
      inputAttributes: {
        required: 'true'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Please Enter Your Username';
        }
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
              input: 'text',
              inputLabel: 'Date of Birth',
              inputAttributes: {
                required: 'true',
                placeholder: 'yyyy-mm-dd',
                
              },
              inputValidator: (value) => {
                
                if (!value) {
                  return 'Please Enter Your Date Of Birth In the Mentioned Format YYYY-MM-DD';
                }
              },
              showCancelButton: true,
              cancelButtonText: 'Cancel',
              confirmButtonText: 'Submit',
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                const dob = result.value;
                
                Swal.fire({
                  title: 'Select Gender',
                  input: 'radio',
                  inputLabel: 'Gender',
                  inputOptions: {
                    'male': 'Male',
                    'female': 'Female',
                    'other': 'Other'
                  },
                  inputValidator: (value) => {
                    if (!value) {
                      return 'Please select a gender';
                    }
                  },
                  showCancelButton: true,
                  cancelButtonText: 'Cancel',
                  confirmButtonText: 'Next',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then((result) => {
                  if (result.isConfirmed) {
                    const gender = result.value;
                    
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "http://localhost:3000/users");
                    xhttp.send();
                    xhttp.onreadystatechange = function () {
                      if (this.readyState == 4 && this.status == 200) {
                        const jsonData = JSON.parse(this.responseText);
                        for (let user of jsonData) {
                          if (user.username == username && user.email == email && user.dob == dob && user.gender == gender) {
                            Swal.fire({
                              title: 'Verification Success',
                              input: 'password',
                              inputLabel: 'Enter The New Password',
                              inputAttributes: {
                                required: 'true',
                              },
                              showCancelButton: true,
                              cancelButtonText: 'Cancel',
                              confirmButtonText: 'Submit',
                              allowOutsideClick: false,
                              allowEscapeKey: false
                            }).then((result) => {
                              if (result.isConfirmed) {
                                const password = result.value;
                                
                                const xhttp = new XMLHttpRequest();
                                xhttp.open("PUT", `http://localhost:3000/users/${user.id}`);
                                xhttp.setRequestHeader("Content-type", "application/json");
                                xhttp.send(JSON.stringify({
                                  "id": user.id,
                                  "username": username,
                                  "email": email,
                                  "dob": dob,
                                  "gender": gender,
                                  "password": password
                                }));
  
                                xhttp.onreadystatechange = function () {
                                  if (this.readyState == 4 && this.status == 200) {
                                    Swal.fire({
                                      title: 'Password Changed Successfully',
                                      text: 'Please Login Again',
                                      icon: 'success',
                                      showCancelButton: false,
                                      confirmButtonText: 'Ok',
                                    })
                                  }
                                }
                              }
                            })
                          }
                          else{
                            Swal.fire({
                              title: `Verification Failed`,
                              text: `Please Try Again`,
                              icon: 'error',
                              showCancelButton: false,
                              confirmButtonText: 'Ok',
                            })
                          }
                        }
                      }
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  }
  