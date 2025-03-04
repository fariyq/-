<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice App</title>
    
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container mt-4">
        <h2 class="text-center">Invoice Generator</h2>

        <form id="invoiceForm">
            <div class="mb-3">
                <label for="customerName" class="form-label">Customer Name</label>
                <input type="text" class="form-control" id="customerName" required>
            </div>

            <div class="mb-3">
                <label for="productName" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="productName" required>
            </div>

            <div class="mb-3">
                <label for="quantity" class="form-label">Quantity</label>
                <input type="number" class="form-control" id="quantity" required>
            </div>

            <div class="mb-3">
                <label for="price" class="form-label">Price (per unit)</label>
                <input type="number" class="form-control" id="price" required>
            </div>

            <button type="button" class="btn btn-primary w-100" onclick="generateInvoice()">Generate Invoice</button>
        </form>

        <div id="invoiceResult" class="mt-4 p-3 border rounded d-none">
            <h4>Invoice</h4>
            <p><strong>Customer:</strong> <span id="invoiceCustomer"></span></p>
            <p><strong>Product:</strong> <span id="invoiceProduct"></span></p>
            <p><strong>Quantity:</strong> <span id="invoiceQuantity"></span></p>
            <p><strong>Total Price:</strong> ৳<span id="invoiceTotal"></span></p>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
