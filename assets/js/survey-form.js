(function () {
  "use strict";

  let price = 0;
  let skipType = '';

  // resolve bootstrap conflict with Optimonk
  var bsModal = $.fn.modal.noConflict();

  // ********** form to wizard ********** //
  const $signupForm = $("#signupForm");
  $signupForm.validate({
    errorElement: "em",
    submitHandler: function (form) {
      showSpinner();
      const formData = new FormData();

      formData.append("skipType", skipType);
      formData.append(
        "wasteType",
        document.querySelector('select[name="wasteType"]').value
      );
      formData.append(
        "skipDate",
        document.querySelector('input[name="skipDate"]').value
      );
      formData.append(
        "fullName",
        document.querySelector('input[name="fullName"]').value
      );
      formData.append(
        "email",
        document.querySelector('input[name="email"]').value
      );
      formData.append(
        "address1",
        document.querySelector('input[name="address1"]').value
      );
      formData.append(
        "address2",
        document.querySelector('input[name="address2"]').value
      );
      formData.append(
        "city",
        document.querySelector('input[name="city"]').value
      );
      formData.append(
        "county",
        document.querySelector('input[name="county"]').value
      );
      formData.append(
        "postCode",
        document.querySelector('input[name="postCode"]').value
      );
      formData.append(
        "totalPrice",
        price
      );

      fetch("https://getform.io/f/115e7883-4e74-42b6-9f18-0591443cb828", {
        method: "POST",
        body: formData,
      })
        .then(() => {
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
          document.getElementById('signupForm').reset();
          // $("#signUpAlert").show();
        })
        .catch((error) => console.error(error));
    },
  });
  // $("#signUpAlert").hide();

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
    startDate: moment().startOf('date').add(2, 'days'),
    endDate: moment().startOf('date').add(2, 'weeks').add(2, 'days'),
    locale: {
      format: "DD/MM/YY",
    },
  });

  $("#4yard").bind("click", function (e) {
    price = 1;
    $("#totalPrice").text(`£${price}`);
    skipType = '4yard';
  });

  $("#6yard").bind("click", function (e) {
    price = 1;
    $("#totalPrice").text(`£${price}`);
    skipType = '6yard';
  });

  $("#8yard").bind("click", function (e) {
    price = 1;
    $("#totalPrice").text(`£${price}`);
    skipType = '8yard';
  });

  $("#12yard").bind("click", function (e) {
    price = 1;
    $("#totalPrice").text(`£${price}`);
    skipType = '12yard';
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

// ********** CONTACT US FORM ********** //
  const $contactForm = $("#contactForm");
  $contactForm.validate({
    errorElement: "em",
    submitHandler: function () {
      const formData = new FormData();
      formData.append(
        "fullName",
        document.querySelector('input[name="contactUsFullName"]').value
      );
      formData.append(
        "email",
        document.querySelector('input[name="contactUsEmail"]').value
      );
      formData.append(
        "message",
        document.querySelector('textarea[name="contactUsMessage"]').value
      );

      fetch("https://getform.io/f/115e7883-4e74-42b6-9f18-0591443cb828", {
        method: "POST",
        body: formData,
      })
        .then(() => {
          $("#contactUsAlert").show();
          document.getElementById('contactForm').reset();
        })
        .catch((error) => console.error(error));
    },
  });

  $contactForm.formToWizard({
    submitButton: "submitContactUs",
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

  $("#contactUsAlert").hide();
})();
