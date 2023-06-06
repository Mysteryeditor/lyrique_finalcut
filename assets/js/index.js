// for the storing of feedback
function feedback(){
  const name=document.getElementById('name').value;
  const email=document.getElementById('email').value;
  const message=document.getElementById('message').value;
  const fbsubmit=new XMLHttpRequest();
  fbsubmit.open('POST','http://localhost:3000/feedbacks');
  fbsubmit.setRequestHeader('Content-Type','application/JSON');
  fbsubmit.send(
    JSON.stringify({
      name:name,
      email:email,
      message:message 
    })
  );
  Swal.fire({
    icon:'success',
    title:'FeedBack Submitted',
    text:'Thank You For Submitting Your FeedBack'
  }).then((result)=>{
    if(result.isConfirmed){
      window.location.href='./index.html';
    }
  })
}

// for a sweetalert to be fired
function loginSwal(){
  Swal.fire({
    title: 'Welcome to LYRIQUE',
    text: 'Are you an existing user or a new user?',
    icon: 'question',
    // background: 'URL(./assets/images/bg.jpg) no-repeat',
    // backgroundSize:'contain',
    showCancelButton: true,
    confirmButtonText: 'Existing User',
    cancelButtonText: 'New User',
    reverseButtons: true,
    customClass: {
      title: 'my-swal-title',
      content: 'my-swal-content',
      confirmButton: 'my-swal-button',
      cancelButton: 'my-swal-button',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href="./authentication.html"
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.location.href="./registration.html"
    }
  });
}

setTimeout(loginSwal,10000)

