(function () {
  "use strict";

  let price = 0;

  // *** form to wizard *** //
  var $signupForm = $("#SignupForm");

  $signupForm.validate({
    errorElement: "em",
    submitHandler: function () {
      showSpinner();
      const formData = new FormData();
      //   formData.append(
      //     "wasteType",
      //     document.querySelector('select[name="wasteType"]').value
      //   );
      formData.append(
        "skipDate",
        document.querySelector('input[name="skipDate"]').value
      );

      fetch("https://getform.io/f/115e7883-4e74-42b6-9f18-0591443cb828", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log(response);
          hideSpinner();
          if (
            typeof window !== "undefined" &&
            typeof window.checkoutPage !== "undefined"
          ) {
            window.checkoutPage.open({
              seller: "skipty-skip-hire",
              checkout: "Four-yard",
              query: { testing: "1" },
            });
          }
          // form.submit();
        })
        .catch((error) => console.error(error));
    },
  });

  $signupForm.formToWizard({
    submitButton: "saveAccount",
    nextBtnClass: "btn btn-primary next",
    prevBtnClass: "btn btn-default prev",
    buttonTag: "button",
    validateBeforeNext: function (form, step) {
      var stepIsValid = true;
      var validator = form.validate();
      $(":input", step).each(function (index) {
        var xy = validator.element(this);
        stepIsValid = stepIsValid && (typeof xy == "undefined" || xy);
      });
      return stepIsValid;
    },
    progress: function (i, count) {
      $("#progress-complete").width("" + (i / count) * 100 + "%");
    },
  });

  $('input[name="skipDate"]').daterangepicker({
    locale: {
      format: "DD/MM/YY",
    },
  });

  $("#4yard").bind("click", function (e) {
    price = 1;
    $("#totalPrice").text(`£${price}`);
  });

  $("#6yard").bind("click", function (e) {
    price = 1;
    $("#totalPrice").text(`£${price}`);
  });

  $("#8yard").bind("click", function (e) {
    price = 1;
    $("#totalPrice").text(`£${price}`);
  });

  $("#12yard").bind("click", function (e) {
    price = 1;
    $("#totalPrice").text(`£${price}`);
  });

  function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("saveAccount").style.display = "block";
  }
  function showSpinner() {
    document.getElementById("saveAccount").style.display = "none";
    document.getElementById("spinner").style.display = "block";
  }
  hideSpinner();
})();
