document.getElementById('footer-form').addEventListener('submit', submitForm);

  //handles footer for submission
   function submitForm(e){
     e.preventDefault();

     const email = document.querySelector('#footer-email').value;

     //is the terms and condition checkbok ticked?
     if (document.getElementById('remember2').checked) {

       //ajax to post data to the server
             fetch('/footer', {
               method:'POST',
               headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-type':'application/json'
               },

               body:JSON.stringify({email: email})
             })

             //sends form data to the server
             .then((res) => res.json())
             .then((data) => {

              document.querySelector('#footer-email').value = '';

              document.getElementById("display-msg2").style.color = "#7FFF00";
              document.getElementById("display-msg2").innerHTML = data.msg;
            });

      } else {
              document.getElementById("display-msg2").style.color = "#FF0000"
              document.getElementById("display-msg2").innerHTML = "* Please accept our Terms and Conditions and Privacy Policy";

      }
   }
