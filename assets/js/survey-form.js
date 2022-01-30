// var form = document.getElementById("form");
// form.addEventListener("submit", formSubmit);

// function formSubmit(e) {
//     e.preventDefault()

//     const formData = new FormData();
//     formData.append(
//         'name',
//         document.querySelector('input[name="name"]').value
//     )
//     formData.append(
//         'email',
//         document.querySelector('input[name="email"]').value
//     )

//     fetch("https://getform.io/f/115e7883-4e74-42b6-9f18-0591443cb828",
//     {
//         method: "POST",
//         body: formData,
//     })
//     .then(response => console.log(response))
//     .catch(error => console.log(error))
// }

(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();
