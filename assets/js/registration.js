// for the password toggle
function togglePasswordVisibility(elementId) {
  var passwordField = document.getElementById(elementId);
  var toggleIcon = document.getElementById("toggle-icon-" + elementId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.className = "fa fa-eye-slash";
  } else {
    passwordField.type = "password";
    toggleIcon.className = "fa fa-eye";
  }
}

(function () {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');

  // Loop over each form and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          }

          form.classList.add('was-validated');
      }, false);
  });
})();

// inserting the records to a json file
function registerUser() {
  
    var firstname = document.getElementById("firstn").value;
    var lastname = document.getElementById("lastn").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    // const gender=document.regform.gender;
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
        username:firstname+lastname
      })
    );
    var username=firstname+lastname;
    Swal.fire({
      icon: 'success',
      title: 'Registered Successfully!',
      html: 'Your Username Is <strong><mark>'+username+"</mark></strong>",
      confirmButtonText: 'Login',
      preConfirm: () => {
        window.location.href = './authentication.html'; // Redirect to authentication.html
      }
    });
  }






