$(document).ready(function () {
    var customers = [];
    var products = [];

    // Customer Form Submission
    $('#customerForm').submit(function (event) {
        event.preventDefault();
        var name = $('#customerName').val();
        var location = $('#customerLocation').val();
        var phone = $('#customerPhone').val();
        
        if(name=="" || location=="" || phone==""){
            alert("All fields are required");
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

        var name = $('#productName').val();
        var description = $('#productDescription').val();
        var price = parseFloat($('#productPrice').val());
        // if(name==""|| description=="" || price=="" || imageFile==""){
        //     alert("All fields are required");
        //     return;
        // }
        var imageFile = $('#productImage')[0].files[0];
        
        if (!imageFile) {
            alert("All fields are required");
            return;

        }
        
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageSrc = e.target.result; // Base64 URL

            // Store product data
            products.push({ name, description, price, imageSrc });

            // Append product to order dropdown
            $('#orderProduct').append(`<option value="${name}">${name}</option>`);

            // Append new row with image
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

    
    $('#orderForm').submit(function (event) {
        event.preventDefault();

        var customerName = $('#orderCustomer').val();
        var productName = $('#orderProduct').val();
        var quantity = parseInt($('#orderQuantity').val());

        // if( customerName ==""|| productName==""||quantity==""){
        //     alert("All fields are required");
        //     return;
        // }

        var product = products.find(p => p.name === productName);
        var total = product.price * quantity;

        var newRow = '<tr><td>' + productName + '</td><td>' + quantity + '</td><td>' + product.price.toFixed(2) + '</td><td>' + total.toFixed(2) + '</td><td><button class="removeOrderItem">Remove</button></td></tr>';
        $('#orderTable tbody').append(newRow);

        updateTotal();

        $('#orderForm')[0].reset();
    });

    $(document).on('click', '.removeOrderItem', function () {
        $(this).closest('tr').remove();
        updateTotal();
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
    });

    // Print Invoice
    $('#printInvoice').click(function () {
        var printContents = $('#invoiceContent').html();
        var originalContents = $('body').html();
        $('body').html(printContents);
        window.print();
        $('body').html(originalContents);
    });

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