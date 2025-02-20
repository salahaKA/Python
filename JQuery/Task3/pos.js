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

    
    // $('#orderForm').submit(function (event) {
    //     event.preventDefault();

    //     var customerName = $('#orderCustomer').val();
    //     var productName = $('#orderProduct').val();
    //     var quantity = parseInt($('#orderQuantity').val());

    //     // if( customerName ==""|| productName==""||quantity==""){
    //     //     alert("All fields are required");
    //     //     return;
    //     // }

    //     var product = products.find(p => p.name === productName);
    //     var total = product.price * quantity;

    //     var newRow = '<tr><td>' + productName + '</td><td>' + quantity + '</td><td>' + product.price.toFixed(2) + '</td><td>' + total.toFixed(2) + '</td><td><button class="removeOrderItem">Remove</button></td></tr>';
    //     $('#orderTable tbody').append(newRow);

    //     updateTotal();

    //     $('#orderForm')[0].reset();
    // });

    // $(document).on('click', '.removeOrderItem', function () {
    //     $(this).closest('tr').remove();
    //     updateTotal();
    // });

    // function updateTotal() {
    //     var subtotal = 0;
    //     $('#orderTable tbody tr').each(function () {
    //         var total = parseFloat($(this).find('td:nth-child(4)').text());
    //         subtotal += total;
    //     });

    //     var total = subtotal * 1.10; 
    //     $('#subtotal').text(subtotal.toFixed(2));
    //     $('#total').text(total.toFixed(2));
    // }




    // $('#orderForm').submit(function (event) {
    //     event.preventDefault();
    
    //     var customerName = $('#orderCustomer').val();
    //     var productName = $('#orderProduct').val();
    //     var quantity = parseInt($('#orderQuantity').val());
    
    //     // Validate inputs
    //     if (!customerName || !productName || !quantity || quantity < 1) {
    //         alert("All fields are required, and quantity must be at least 1.");
    //         return;
    //     }
    
    //     // Find the selected product
    //     var product = products.find(p => p.name === productName);
    //     if (!product) {
    //         alert("Selected product not found.");
    //         return;
    //     }
    
    //     // Check if the product already exists in the order table
    //     var existingRow = $('#orderTable tbody tr').filter(function () {
    //         return $(this).find('td:nth-child(1)').text() === productName;
    //     });
    
    //     if (existingRow.length > 0) {
    //         // If the product exists, update its quantity and total
    //         var existingQuantity = parseInt(existingRow.find('td:nth-child(2)').text());
    //         var newQuantity = existingQuantity + quantity;
    //         var newTotal = newQuantity * product.price;
    
    //         existingRow.find('td:nth-child(2)').text(newQuantity);
    //         existingRow.find('td:nth-child(4)').text(newTotal.toFixed(2));
    //     } else {
    //         // If the product does not exist, add a new row
    //         var total = product.price * quantity;
    //         var newRow = `
    //             <tr>
    //                 <td>${productName}</td>
    //                 <td>${quantity}</td>
    //                 <td>${product.price.toFixed(2)}</td>
    //                 <td>${total.toFixed(2)}</td>
    //                 <td>
    //                     <button class="increaseQuantity">+</button>
    //                     <button class="decreaseQuantity">-</button>
    //                     <button class="removeOrderItem"><i class="fas fa-trash-alt"></i></button>
    //                 </td>
    //             </tr>
    //         `;
    //         $('#orderTable tbody').append(newRow);
    //     }
    
    //     // Update totals
    //     updateTotal();
    
    //     // Reset the form
    //     $('#orderForm')[0].reset();
    // });
    
    // // Increase Quantity
    // $(document).on('click', '.increaseQuantity', function () {
    //     var row = $(this).closest('tr');
    //     var quantityCell = row.find('td:nth-child(2)');
    //     var priceCell = row.find('td:nth-child(3)');
    //     var totalCell = row.find('td:nth-child(4)');
    
    //     var quantity = parseInt(quantityCell.text());
    //     var price = parseFloat(priceCell.text());
    
    //     quantityCell.text(quantity + 1);
    //     totalCell.text((price * (quantity + 1)).toFixed(2));
    
    //     updateTotal();
    // });
    
    // // Decrease Quantity
    // $(document).on('click', '.decreaseQuantity', function () {
    //     var row = $(this).closest('tr');
    //     var quantityCell = row.find('td:nth-child(2)');
    //     var priceCell = row.find('td:nth-child(3)');
    //     var totalCell = row.find('td:nth-child(4)');
    
    //     var quantity = parseInt(quantityCell.text());
    //     var price = parseFloat(priceCell.text());
    
    //     if (quantity > 1) {
    //         quantityCell.text(quantity - 1);
    //         totalCell.text((price * (quantity - 1)).toFixed(2));
    //     } else {
    //         row.remove(); // Remove the row if quantity is 1
    //     }
    
    //     updateTotal();
    // });
    
    // // Remove Order Item
    // $(document).on('click', '.removeOrderItem', function () {
    //     $(this).closest('tr').remove();
    //     updateTotal();
    // });
    
    // // Update Total
    // function updateTotal() {
    //     var subtotal = 0;
    //     $('#orderTable tbody tr').each(function () {
    //         var total = parseFloat($(this).find('td:nth-child(4)').text());
    //         subtotal += total;
    //     });
    
    //     var total = subtotal * 1.10; // Add 10% tax
    //     $('#subtotal').text(subtotal.toFixed(2));
    //     $('#total').text(total.toFixed(2));
    // }






    $('#orderForm').submit(function (event) {
        event.preventDefault();
    
        var customerName = $('#orderCustomer').val();
        var productName = $('#orderProduct').val();
        var quantity = parseInt($('#orderQuantity').val());
    
        // Validate inputs
        if (!customerName || !productName || !quantity || quantity < 1) {
            alert("All fields are required, and quantity must be at least 1.");
            return;
        }
    
        // Find the selected product
        var product = products.find(p => p.name === productName);
        if (!product) {
            alert("Selected product not found.");
            return;
        }
    
        // Disable customer dropdown after the first product is added
        if ($('#orderTable tbody tr').length === 0) {
            $('#orderCustomer').prop('disabled', true);
        }
    
        // Check if the product already exists in the order table
        var existingRow = $('#orderTable tbody tr').filter(function () {
            return $(this).find('td:nth-child(1)').text() === productName;
        });
    
        if (existingRow.length > 0) {
            // If the product exists, update its quantity and total
            var existingQuantity = parseInt(existingRow.find('td:nth-child(2)').text());
            var newQuantity = existingQuantity + quantity;
            var newTotal = newQuantity * product.price;
    
            existingRow.find('td:nth-child(2)').text(newQuantity);
            existingRow.find('td:nth-child(4)').text(newTotal.toFixed(2));
        } else {
            // If the product does not exist, add a new row
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
    
        // Update totals
        updateTotal();
    
        // Reset the form (except customer dropdown)
        $('#orderProduct').val('');
        $('#orderQuantity').val('');
    });
    
    // Increase Quantity
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
    
    // Decrease Quantity
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
            row.remove(); // Remove the row if quantity is 1
        }
    
        updateTotal();
    });
    
    // Remove Order Item
    $(document).on('click', '.removeOrderItem', function () {
        $(this).closest('tr').remove();
        updateTotal();
    
        // Re-enable customer dropdown if no products are left in the order
        if ($('#orderTable tbody tr').length === 0) {
            $('#orderCustomer').prop('disabled', false);
        }
    });
    
    // Update Total
    function updateTotal() {
        var subtotal = 0;
        $('#orderTable tbody tr').each(function () {
            var total = parseFloat($(this).find('td:nth-child(4)').text());
            subtotal += total;
        });
    
        var total = subtotal * 1.10; // Add 10% tax
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