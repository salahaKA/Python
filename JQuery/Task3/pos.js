$(document).ready(function () {
    var customers = [];
    var products = [];

    // Customer Form Submission
    $('#customerForm').submit(function (event) {
        event.preventDefault();
        var name = $('#customerName').val().trim();
        var location = $('#customerLocation').val().trim();
        var phone = $('#customerPhone').val().trim();

        // Name Validation
        if (!/^[A-Za-z\s]{2,}$/.test(name)) {
            // alert("Name must contain only alphabets and be at least 2 characters long.");

            return;
        }

        // Phone Validation
        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        if (name === "" || location === "" || phone === "") {
            alert("All fields are required.");
            return;
        }

        customers.push({ name: name, location: location, phone: phone });
        var customerOption = '<option value="' + name + '">' + name + '</option>';
        $('#orderCustomer').append(customerOption);
        var newRow = '<tr><td>' + name + '</td><td>' + location + '</td><td>' + phone + '</td></tr>';
        $('#customerTable tbody').append(newRow);
        $('#customerForm')[0].reset();
    });

    // Product Form Submission
    $('#productForm').submit(function (event) {
        event.preventDefault();

        var name = $('#productName').val().trim();
        var description = $('#productDescription').val().trim();
        var price = parseFloat($('#productPrice').val());
        var imageFile = $('#productImage')[0].files[0];

        // Name Validation for Product
        if (!/^[A-Za-z\s]{2,}$/.test(name)) {
            alert("Product name must contain only alphabets and be at least 2 characters long.");
            return;
        }

        if (isNaN(price) || price <= 0) {
            alert("Price must be a number greater than 0.");
            return;
        }

        if (!imageFile) {
            alert("All fields are required.");
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            var imageSrc = e.target.result;
            products.push({ name, description, price, imageSrc });

            $('#orderProduct').append(`<option value="${name}">${name}</option>`);

            var newRow = `
                <tr>
                    <td>${name}</td>
                    <td>${description}</td>
                    <td>₹${price.toFixed(2)}</td>
                    <td><img src="${imageSrc}" class="product-img"></td>
                </tr>
            `;
            $('#productTable tbody').append(newRow);

            $('#productForm')[0].reset();
        };
        reader.readAsDataURL(imageFile);
    });

    // Order Form Submission
    $('#orderForm').submit(function (event) {
        event.preventDefault();

        var customerName = $('#orderCustomer').val();
        var productName = $('#orderProduct').val();
        var quantity = parseInt($('#orderQuantity').val());

        if (!customerName || !productName || !quantity || quantity < 1) {
            alert("All fields are required, and quantity must be at least 1.");
            return;
        }

        var product = products.find(p => p.name === productName);
        if (!product) {
            alert("Selected product not found.");
            return;
        }

        if ($('#orderTable tbody tr').length === 0) {
            $('#orderCustomer').prop('disabled', true);
        }

        var existingRow = $('#orderTable tbody tr').filter(function () {
            return $(this).find('td:nth-child(1)').text() === productName;
        });

        if (existingRow.length > 0) {
            var existingQuantity = parseInt(existingRow.find('td:nth-child(2)').text());
            var newQuantity = existingQuantity + quantity;
            var newTotal = newQuantity * product.price;

            existingRow.find('td:nth-child(2)').text(newQuantity);
            existingRow.find('td:nth-child(4)').text(newTotal.toFixed(2));
        } else {
            var total = product.price * quantity;
            var newRow = `
                <tr>
                    <td>${productName}</td>
                    <td>${quantity}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${total.toFixed(2)}</td>
                    <td>
                        <button class="increaseQuantity">+</button>
                        <button class="decreaseQuantity">-</button>
                        <button class="removeOrderItem"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
            `;
            $('#orderTable tbody').append(newRow);
        }
        updateTotal();
        $('#orderProduct').val('');
        $('#orderQuantity').val('');
    });

    $(document).on('click', '.increaseQuantity', function () {
        var row = $(this).closest('tr');
        var quantityCell = row.find('td:nth-child(2)');
        var priceCell = row.find('td:nth-child(3)');
        var totalCell = row.find('td:nth-child(4)');

        var quantity = parseInt(quantityCell.text());
        var price = parseFloat(priceCell.text());

        quantityCell.text(quantity + 1);
        totalCell.text((price * (quantity + 1)).toFixed(2));

        updateTotal();
    });

    $(document).on('click', '.decreaseQuantity', function () {
        var row = $(this).closest('tr');
        var quantityCell = row.find('td:nth-child(2)');
        var priceCell = row.find('td:nth-child(3)');
        var totalCell = row.find('td:nth-child(4)');

        var quantity = parseInt(quantityCell.text());
        var price = parseFloat(priceCell.text());

        if (quantity > 1) {
            quantityCell.text(quantity - 1);
            totalCell.text((price * (quantity - 1)).toFixed(2));
        } else {
            row.remove();
        }

        updateTotal();
    });

    $(document).on('click', '.removeOrderItem', function () {
        $(this).closest('tr').remove();
        updateTotal();

        if ($('#orderTable tbody tr').length === 0) {
            $('#orderCustomer').prop('disabled', false);
        }
    });

    function updateTotal() {
        var subtotal = 0;
        $('#orderTable tbody tr').each(function () {
            var total = parseFloat($(this).find('td:nth-child(4)').text());
            subtotal += total;
        });

        var total = subtotal * 1.10;
        $('#subtotal').text(subtotal.toFixed(2));
        $('#total').text(total.toFixed(2));
    }

    // Generate Invoice
    $('#generateInvoice').click(function () {
        var invoiceContent = '<h4>Invoice</h4>';
        invoiceContent += '<p>Date: ' + new Date().toLocaleDateString() + '</p>';
        invoiceContent += '<table><thead><tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total</th></tr></thead><tbody>';

        $('#orderTable tbody tr').each(function () {
            var productName = $(this).find('td:nth-child(1)').text();
            var quantity = $(this).find('td:nth-child(2)').text();
            var price = $(this).find('td:nth-child(3)').text();
            var total = $(this).find('td:nth-child(4)').text();

            invoiceContent += '<tr><td>' + productName + '</td><td>' + quantity + '</td><td>' + price + '</td><td>' + total + '</td></tr>';
        });

        invoiceContent += '</tbody></table>';
        invoiceContent += '<p>Subtotal: ' + $('#subtotal').text() + '</p>';
        invoiceContent += '<p>Total: ' + $('#total').text() + '</p>';

        $('#invoiceContent').html(invoiceContent);
        $('#invoiceSection').show();

        // Show Payment Successful Message
        alert("Payment Successful!");
    });

    // Print Invoice
    $('#printInvoice').click(function () {
        var printContents = $('#invoiceContent').html();
        var originalContents = $('body').html();
        $('body').html(printContents);
        window.print();
        $('body').html(originalContents);
    });
});