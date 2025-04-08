$(document).ready(function () {
        let editingIndex = -1;
        let phoneNumbers = [];

        function validateInputs(name, number) {
          let isValid = true;
          $(".error").hide();

          if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
            $("#nameError").show();
            isValid = false;
          }

          if (number === "" || isNaN(number) || number.length !== 10) {
            $("#phoneError").show();
            isValid = false;
          }

          return isValid;
        }

        function isUniquePhoneNumber(number, index) {
          return phoneNumbers.every((num, i) => i === index || num !== number);
        }

        $("#btn-save").click(function () {
          let name = $("#name").val().trim();
          let number = $("#phone").val().trim();
          console.log(name);
          console.log(number);

          if (name == "" || number == "") {
            alert("All fields are required. Please fill in all the fields.");
            return;
          }
          if (!validateInputs(name, number)) return;

          if (!isUniquePhoneNumber(number, editingIndex)) {
            $("#phoneError").text("Phone number already exists.").show();
            return;
          }

          if (editingIndex === -1) {
            phoneNumbers.push(number);

            $("#contactList").append(`
                        <tr>
                            <td>${name}</td>
                            <td>${number}</td>
                            <td>
                                <button class="btn-edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-delete"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `);
          } else {
            let oldNumber = phoneNumbers[editingIndex];
            phoneNumbers[editingIndex] = number;
            if (oldNumber !== number && phoneNumbers.includes(oldNumber)) {
              phoneNumbers.splice(phoneNumbers.indexOf(oldNumber), 1);
            }
            let row = $("#contactList tr").eq(editingIndex);
            row.find("td:eq(0)").text(name);
            row.find("td:eq(1)").text(number);
            editingIndex = -1;
          }

          $("#name").val("");
          $("#phone").val("");
        });

        $(document).on("click", ".btn-edit", function () {
          let row = $(this).closest("tr");
          $("#name").val(row.find("td:eq(0)").text());
          $("#phone").val(row.find("td:eq(1)").text());
          editingIndex = row.index();
        });

        $(document).on("click", ".btn-delete", function () {
          let row = $(this).closest("tr");
          let number = row.find("td:eq(1)").text();
          phoneNumbers.splice(phoneNumbers.indexOf(number), 1);
          row.remove();
        });

        $("#name").on("input", function () {
          let name = $(this).val();
          if (/^[a-zA-Z\s]{3,}$/.test(name)) {
            $("#nameError").hide();
            $(this).css("border", "1px solid #ccc");
          } else {
            $("#nameError").show();
            $(this).css("border", "2px solid red");
          }
        });

        $("#phone").on("input", function () {
          let number = $(this).val();
          if (number !== "" && !isNaN(number) && number.length === 10) {
            $("#phoneError").hide();
            $(this).css("border", "1px solid #ccc");
          } else {
            $("#phoneError").show();
            $(this).css("border", "2px solid red");
          }
        });

        $(".error").hide();
      });