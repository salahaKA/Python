$(document).ready(function () {
        var passwordPattern =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        $("#signupForm").on("submit", function (event) {
          event.preventDefault();

          var password = $("#pass-field").val();
          var confirmPassword = $("#confirmPassword").val();
          var name = $("#name").val();
          var email = $("#email").val();
          var gender = $("#gender").val();
          var age = parseInt($("#age").val());

          if (
            name === "" ||
            email === "" ||
            address === "" ||
            dob === "" ||
            age === "" ||
            gender === "" ||
            password === "" ||
            confirmPassword === ""
          ) {
            alert("All fields are required. Please fill in all the fields.");
            return;
          }

          if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
            $("#nameError").show();
          } else if (!emailPattern.test(email)) {
            $("#emailError").show();
          } else if (!gender) {
            $("#genderError").show();
          } else if (isNaN(age) || age < 1 || age > 100) {
            $("#ageError").show();
          } else {
            $("#nameError").hide();
            $("#emailError").hide();
            $("#genderError").hide();
            $("#ageError").hide();
            if (!passwordPattern.test(password)) {
              $("#passwordError").show();
            } else if (password !== confirmPassword) {
              $("#confirmPasswordError").show();
            } else {
              $("#passwordError").hide();
              $("#confirmPasswordError").hide();
              $("#pass-field").css("border", "1px solid #ccc");
              $("#confirmPassword").css("border", "1px solid #ccc");
              alert("Signup successful!");
              window.location.href = "https://www.cybrosys.com";
            }
          }
        });

        $("#name").on("input", function () {
          var name = $(this).val();
          if (/^[a-zA-Z\s]{3,}$/.test(name)) {
            $("#nameError").hide();
            $(this).css("border", "1px solid #ccc");
          } else {
            $("#nameError").show();
            $(this).css("border", "2px solid red");
          }
        });

        $("#email").on("input", function () {
          var email = $(this).val();
          if (emailPattern.test(email)) {
            $("#emailError").hide();
            $(this).css("border", "1px solid #ccc");
          } else {
            $("#emailError").show();
            $(this).css("border", "2px solid red");
          }
        });

        $("#gender").on("change", function () {
          var gender = $(this).val();
          if (gender) {
            $("#genderError").hide();
            $(this).css("border", "1px solid #ccc");
          } else {
            $("#genderError").show();
            $(this).css("border", "2px solid red");
          }
        });

        $("#pass-field").on("input", function () {
          var password = $(this).val();
          if (passwordPattern.test(password)) {
            $("#passwordError").hide();
            $(this).css("border", "1px solid #ccc");
          } else {
            $("#passwordError").show();
            $(this).css("border", "2px solid red");
          }
        });

        $("#confirmPassword").on("input", function () {
          var confirmPassword = $(this).val();
          var password = $("#pass-field").val();
          if (confirmPassword === password) {
            $("#confirmPasswordError").hide();
            $(this).css("border", "1px solid #ccc");
          } else {
            $("#confirmPasswordError").show();
            $(this).css("border", "2px solid red");
          }
        });

        $("#dob").on("change", function () {
          var dob = new Date($(this).val());
          var today = new Date();
          var age = today.getFullYear() - dob.getFullYear();
          var monthDiff = today.getMonth() - dob.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dob.getDate())
          ) {
            age--;
          }
          if (age < 0) {
            age = 0;
          }
          $("#age").val(age);
          if (age < 1 || age > 100) {
            $("#ageError").show();
          } else {
            $("#ageError").hide();
          }
        });

        $("#eye-btn").on("mousedown", function () {
          $("#pass-field").attr("type", "text");
          $(this).find("i").removeClass("fa-eye-slash").addClass("fa-eye");
        });

        $("#eye-btn").on("mouseup", function () {
          $("#pass-field").attr("type", "password");
          $(this).find("i").removeClass("fa-eye").addClass("fa-eye-slash");
        });

        $("#eye-btn").on("mouseleave", function () {
          $("#pass-field").attr("type", "password");
          $(this).find("i").removeClass("fa-eye").addClass("fa-eye-slash");
        });
      });