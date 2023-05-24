// for the toggle button of show password
 function togglePasswordVisibility() {
  var passwordField = document.getElementById('password');
  var showPasswordBtn = document.getElementById('showPasswordBtn');

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
      showPasswordBtn.textContent = 'Hide Password';
  } else {
    passwordField.type = 'password';
    showPasswordBtn.textContent = 'Show Password';
  }
}

// bootstrap validation
(function () {
  'use strict';

  // Fetch the form
  var form = document.getElementById('regform');

  // Add event listener to form submit
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      registerUser();//if the form is validated successfully it gets redirected
    }

    form.classList.add('was-validated');
  }, false);
})();

// the post functionality to insert user details
function registerUser() {
  var firstname = document.getElementById("firstn").value;
  var lastname = document.getElementById("lastn").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const dob = document.getElementById("DOB").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/users");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      dob: dob,
      email: email,
      password: password,
      username: firstname + lastname
    })
  );
  var username = firstname + lastname;
  Swal.fire({
    icon: 'success',
    title: 'Registered Successfully!',
    html: 'Your Username Is <strong><mark>' + username + '</mark></strong>',
    confirmButtonText: 'Login',
    showCancelButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = './authentication.html';
    }
  });
}







