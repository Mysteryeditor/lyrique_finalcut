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

// inserting the records to a json file
function registerUser(){
    if(!regform.terms.checked){
        checkboxvalidate.innerHTML="Please Agree To the Terms and Conditions!!";
        return false;
    }
    else{
        const firstname=document.getElementById("firstn").value;
        const lastname=document.getElementById("lastn").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        // const gender=document.regform.gender;
        const dob=document.getElementById("DOB").value;
        const email=document.getElementById("email").value;
        const password = document.getElementById("password").value;

    const xhttp=new XMLHttpRequest();
    xhttp.open("POST","http://localhost:3000/users");
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhttp.send(
        JSON.stringify({
            firstname:firstname,
            lastname:lastname,
            gender:gender,
            dob:dob,
            email:email,
            password:password
        })
    );}
}
