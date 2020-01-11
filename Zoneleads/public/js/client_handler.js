document.getElementById('contact-form').addEventListener('submit', submitForm);


   function submitForm(e){
     e.preventDefault();

     const fullName = document.querySelector('#name').value;
     const email = document.querySelector('#email').value;
     const companyName = document.querySelector('#companyName').value;
     const typeOfCompany = document.querySelector("#typeOfCompany").value;
     const subject = document.querySelector("#subject").value;
     const message = document.querySelector("#message").value;


     if (document.getElementById('remember').checked) {
             fetch('/contact', {
               method:'POST',
               headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-type':'application/json'
               },

               body:JSON.stringify({fullName: fullName, email: email, companyName: companyName, typeOfCompany: typeOfCompany, subject: subject, message: message})
             })

             .then((res) => res.json())
             .then((data) => {

              document.querySelector('#name').value = '';
              document.querySelector('#email').value = '';
              document.querySelector('#companyName').value = '';
              document.querySelector("#typeOfCompany").value = '';
              document.querySelector("#subject").value = '';
              document.querySelector("#message").value = '';

              document.getElementById("display-msg").className = "alert alert-success";
              document.getElementById("display-msg").innerHTML = data.msg;

                });

      } else {
              document.getElementById("display-msg").className = "alert alert-danger";
              document.getElementById("display-msg").innerHTML = "* Please accept our Terms and Conditions and Privacy Policy";
      }
   }
