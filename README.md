# TTK-Epay 

A comprehensive client SDK for interacting with the TTK-Epay payment processing API. This library provides a simple interface for managing invoices, processing payments, and generating receipts.

## Features

- 🧾 Complete invoice management
- 💰 Payment processing functionality
- 📑 PDF receipt generation and email delivery
- 🔍 Payment status verification
- ⚡ Available for both Python and JavaScript environments

## Installation


### JavaScript (Node.js)

```bash
npm install @deploily/ttk-epay-nodejs-client
```

## Quick Start


### JavaScript

```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 

// Initialize the client
const client = new TtkEpay();

// Example: Get list of invoices
async function getInvoices() {
  try {
    const invoices = await client.getInvoices(1, 10);
    console.log(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}

getInvoices();

```

## API Reference

### Admin Operations

#### `getInvoices(page_number=1, page_size=10)`

Retrieves a paginated list of invoices.

**Parameters:**
- `page_number` (optional): The page number to retrieve (default: 1)
- `page_size` (optional): Number of items per page (default: 10)

**Returns:** A dictionary/object containing:
- List of Invoice objects
- Page information (current page, total pages)


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 

// Initialize the client
const client = new TtkEpay();

// Example: Get list of invoices
async function listInvoices() {
  try {
    const response = await client.getInvoices(1, 20);
    console.log('Raw response:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error fetching invoices:', error.message);
  }
}

listInvoices();
```

#### `createInvoice(invoice_data)`

Creates a new invoice.

**Parameters:**
- `invoice_data`: An Invoice object containing invoice details

**Returns:** The created Invoice object with server-assigned fields


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 
const { Invoice } = require('ttk-epay-nodejs-client/src/models.js'); // Import from your local models file

// Initialize the client
const client = new TtkEpay();

async function createNewInvoice() {
  try {
    // Prepare the invoice data (use plain object)
    const newInvoice = new Invoice ({
      INVOICE_NUMBER: 12345,
      CLIENT_NAME: "Acme Corporation",
      CLIENT_CODE: 789,
      CLIENT_ADDRESS: "123 Business Ave, Suite 100",
      CLIENT_MAIL: "billing@acme.com",
      NET_AMOUNT: 1000.00,
      INVOICE_TVA: 0.19,
      AMOUNT_TVA: 190.00,
      AMOUNT_TTC: 1190.00,
      PRODUCT_NAME: "Enterprise Plan Subscription",
      INVOICE_DATE: "2025-05-08T10:00:00.000Z"
    });

    // Create the invoice
    const createdInvoice = await client.createInvoice(newInvoice);
    console.log(`Created invoice with ID: ${createdInvoice.ID}`);
  } catch (error) {
    console.error('Error creating invoice:', error.message);
  }
}

createNewInvoice();

```

#### `getInvoiceById(invoice_id)`

Retrieves a specific invoice by its ID.

**Parameters:**
- `invoice_id`: The ID of the invoice to retrieve

**Returns:** The Invoice object if found


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 

// Initialize the client
const client = new TtkEpay();

async function findInvoiceById() {
  try {
    const invoiceId = "35";
    const invoice = await client.getInvoiceById(invoiceId);
    
    console.log(`Found invoice -  ID: ${invoice.ID}, Amount: ${invoice.NET_AMOUNT}, Paid: ${invoice.IS_PAID ? 'Yes' : 'No'}`);
    return invoice;
  } catch (error) {
    console.error(`Error finding invoice: ${error.message}`);
    return null;
  }
}


findInvoiceById();
```

#### `updateInvoice(invoice_id, invoice_data)`

Updates an existing invoice.

**Parameters:**
- `invoice_id`: The ID of the invoice to update
- `invoice_data`: An Invoice object containing updated invoice details

**Returns:** The updated Invoice object


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 

// Initialize the client
const client = new TtkEpay();

async function updateExistingInvoice() {
  try {
    const invoiceId = "35";
    const invoice = await client.getInvoiceById(invoiceId);
    
    // Update invoice details
    invoice.NET_AMOUNT = 1500.00;
    invoice.IS_PAID = true; // Change from No to Yes
    
    const result = await client.updateInvoice(invoice.ID, invoice);
    console.log(`Updated invoice: Amount=${result.NET_AMOUNT}, Paid=${result.IS_PAID ? 'Yes' : 'No'}`);
    return result;
  } catch (error) {
    console.error(`Update failed: ${error.message}`);
    return null;
  }
}
updateExistingInvoice();
```

#### `getPayments(options)`

Retrieves a list of payments with optional filtering.

**Parameters (all optional):**
- `page_number`: Page number for pagination (default: 1)
- `page_size`: Number of items per page (default: 10)
- `satim_order_id`: Filter by Satim order ID
- `invoice_id`: Filter by invoice ID
- `from_date`: Start date filter (format: 'YYYY-MM-DDTHH:MM:SSZ')
- `to_date`: End date filter (format: 'YYYY-MM-DDTHH:MM:SSZ')

**Returns:** A dictionary/object containing payment records and pagination info


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 

// Initialize the client
const client = new TtkEpay();

async function getRecentPayments() {
  const endDate = new Date().toISOString();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  try {
    // Fetching payments from the last 30 days
    const payments = await client.getPayments({
      pageSize: 50,
      from_date: startDate.toISOString(),
      to_date: endDate
    });
    
    // Assuming 'payments' is an array or object with a 'payments' field
    console.log(`Found ${payments.length} payments in the last 30 days`);
  } catch (error) {
    console.error("Error fetching payments:", error);
  }
}


getRecentPayments();
```

#### `getPayementById(payement_id)`

Retrieves a specific payement by its ID.

**Parameters:**
- `payement_id`: The ID of the payement to retrieve

**Returns:** The payement object if found


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 

// Initialize the client
const client = new TtkEpay();

async function findPayementById() {
  
  try {
    const paymentId = "2";
    const payment = await client.getPaymentById(paymentId);

    console.log(`payment=== `,payment);
    console.log(`Found payment -  ID: ${payment.ID}, Amount: ${payment.NET_AMOUNT}, Paid: ${payment.IS_PAID ? 'Yes' : 'No'}`);

    return payment;
  } catch (error) {
    console.error(`Error finding payment: ${error.message}`);
    return null;
  }
}


findInvoiceById();
```


### `generateLink(order_id, client_code)`

Generates a payment link for a specific invoice based on its order ID and client code.

**Parameters:**

* `order_id` (`string`): The unique identifier of the invoice to retrieve.
* `client_code` (`number`): The client identifier associated with the invoice.

**Returns:** A payment link (string) if successful, or null if an error occurs.


**Example (JavaScript):**

```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client');

// Initialize the client
const client = new TtkEpay();

async function generateLink(orderId, clientCode) {
  try {
    const link = await client.generate_link(orderId, clientCode);
    console.log(`Generated link:`, link);
    return link;
  } catch (error) {
    console.error(`Failed to generate link: ${error.message}`);
    return null;
  }
}

// Example usage
generateLink("15", 15);
```




### Document Operations

#### `getPdfRecipt(satim_order_id)`

Generates a PDF receipt for a specific payment.

**Parameters:**
- `satim_order_id`: The Satim order ID for the payment

**Returns:** PDF receipt as binary data


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 

// Initialize the client
const client = new TtkEpay();

const fs = require('fs');

async function savePdfReceipt() {
  const satimOrderId = "SATIM-12345";
  
  try {
    // Fetching the PDF receipt data
    const pdfData = await client.getPdfRecipt(satimOrderId);
    
    // Writing the PDF data to a file
    fs.writeFileSync(`receipt_${satimOrderId}.pdf`, pdfData);
    console.log(`Receipt saved to receipt_${satimOrderId}.pdf`);
  } catch (error) {
    console.error("Error saving PDF receipt:", error);
  }
}



savePdfReceipt();
```

#### `sendPdfReceiptMail(satim_order_id, email)`

Sends a PDF receipt to a specified email address.

**Parameters:**
- `satim_order_id`: The Satim order ID for the payment
- `email`: The email address to send the receipt to

**Returns:** API response indicating success or failure


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client'); 

// Initialize the client
const client = new TtkEpay();

async function emailReceipt() {
  const satimOrderId = "SATIM-12345";
  const email = "customer@example.com";
  
  try {
    // Sending the receipt via email
    const result = await client.sendPdfReceiptMail(satimOrderId, email);
    
    // Check if the result is in the expected format or status
    if (result) {
      console.log(`Receipt sent successfully to ${email}`);
    } else {
      console.log("Receipt could not be sent. No result returned.");
    }
  } catch (error) {
    console.error(`Failed to send receipt: ${error.message}`);
  }
}


emailReceipt();
```

### Payment Operations

#### `postPayement(payment_data)`

Processes a new payment.

**Parameters:**
- `payment_data`: An InvoiceDto object containing payment details

**Returns:** Payment processing result object


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client');
const { InvoiceDto } = require('ttk-epay-nodejs-client/src/models.js'); // Import from your local models file

// Initialize the client
const client = new TtkEpay();

async function processPayment() {
  // Create payment data with a unique invoice number (using timestamp)
  const uniqueInvoiceNumber = Math.floor(Date.now() / 1000); // Unix timestamp
  const payment = new InvoiceDto({
    INVOICE_NUMBER: uniqueInvoiceNumber,
    ORDER_ID: `ORD-${uniqueInvoiceNumber}`,
    CLIENT_NAME: "Jane Smith",
    CLIENT_CODE: 456,
    CLIENT_ADDRESS: "456 Customer St.",
    CLIENT_MAIL: "jane@example.com",
    PRODUCT_NAME: "Premium Package",
    NET_AMOUNT: 750.00
  });

  try {
    // Process the payment
    const result = await client.postPayement(payment);
    
    // Debug the result
    console.log("Full API response:", JSON.stringify(result, null, 2));
    
    // Check if the result has the expected fields
    if (result && result.ERROR_CODE === "0") {
      if (result.ORDER_ID && result.FORM_URL) {
        console.log(`Payment initialized successfully!`);
        console.log(`Order ID: ${result.ORDER_ID}`);
        console.log(`Payment Form URL: ${result.FORM_URL}`);
      } else {
        console.error("Success response missing ORDER_ID or FORM_URL:", result);
      }
    } else if (result && result.ERROR_CODE) {
      console.error(`Payment API Error (${result.ERROR_CODE}): ${result.ERROR_MESSAGE}`);
    } else {
      console.error("Unexpected result format:", result);
    }
  } catch (error) {
    console.error(`Error processing payment: ${error.message}`);
  }
}

processPayment();

```

#### `getPaymentStatus(satim_order_id)`

Checks the status of a payment.

**Parameters:**
- `satim_order_id`: The Satim order ID for the payment

**Returns:** Payment status object with transaction details


**Example (JavaScript):**
```javascript
const { TtkEpay } = require('@deploily/ttk-epay-nodejs-client');
const client = new TtkEpay();

async function checkPaymentStatus() {
  try {
    const status = await client.getPaymentStatus("8LmjDNjisi0A5EAAGBYM");
    
    if (!status) {
      return { error: "No payment status received" };
    }

    // Determine payment status text
    let statusText;
    if (status.ORDER_STATUS === 0) statusText = "Rejected";
    else if (status.ORDER_STATUS === 1) statusText = "Processing";
    else if (status.ORDER_STATUS === 2) statusText = "Completed";
    else statusText = "Unknown";

    return {
      status: statusText,
      amount: status.AMOUNT,
      currency: status.CURRENCY,
      error: status.ERROR_CODE !== "0" ? status.ERROR_MESSAGE : null
    };

  } catch (error) {
    return { error: "Failed to check payment status" };
  }
}

// Usage
checkPaymentStatus().then(result => {
  console.log(result);
});

```



## Data Models

### Invoice

The primary data model for invoice operations.

#### Fields

| Field Name | Type | Description |
|------------|------|-------------|
| ID | int | Required. Invoice ID (auto-assigned for new invoices) |
| INVOICE_NUMBER | int | Invoice reference number |
| ORDER_ID | string | Order reference ID |
| INVOICE_DATE | string | ISO 8601 datetime string (e.g., "2025-05-07T12:45:27.142Z") |
| INVOICE_TYPE_CODE | string | Type code for the invoice |
| NET_AMOUNT | float | Net amount before taxes |
| INVOICE_TVA | float | VAT rate (e.g., 0.19 for 19%) |
| AMOUNT_TVA | float | VAT amount |
| AMOUNT_TTC | float | Total amount including taxes |
| INVOICE_STATE_CODE | string | Status code for the invoice |
| ORDER_NAME | string | Name or description of the order |
| CLIENT_CODE | int | Client reference code |
| CLIENT_NAME | string | Client name |
| CLIENT_NRC | string | Client NRC (business registration) |
| CLIENT_ADDRESS | string | Client's address |
| CLIENT_MAIL | string | Client's email address |
| CLIENT_IDF | string | Client's tax identification |
| PRODUCT_NAME | string | Name of the product or service |
| IS_PAID | boolean | Payment status flag (default: false) |

### InvoiceDto

Simplified data model for payment processing operations.

#### Fields

| Field Name | Type | Description |
|------------|------|-------------|
| INVOICE_NUMBER | int | Required. Invoice reference number |
| ORDER_ID | string | Order reference ID |
| INVOICE_DATE | string | ISO 8601 datetime string |
| INVOICE_TYPE_CODE | string | Type code for the invoice |
| NET_AMOUNT | float | Net amount before taxes |
| CLIENT_CODE | int | Client reference code |
| CLIENT_NAME | string | Client name |
| CLIENT_ADDRESS | string | Client's address |
| CLIENT_MAIL | string | Client's email address |
| PRODUCT_NAME | string | Name of the product or service |

## Error Handling

 JavaScript implementations handle errors differently:



### JavaScript

The JavaScript library uses Promise-based error handling:

```javascript
const axios = require('axios');

// Sample client function simulating the API call
const client = {
  getInvoiceById: (invoiceId) => {
    return new Promise((resolve, reject) => {
      // Simulating a response or error based on the invoiceId
      if (invoiceId === "NON-EXISTENT") {
        reject(new Error("Invoice not found"));
      } else {
        resolve({ invoiceId: invoiceId, amount: 100 });
      }
    });
  }
};

// 1. Promise-based error handling using .then() and .catch()
client.getInvoiceById("NON-EXISTENT")
  .then(invoice => {
    console.log("Invoice found:", invoice);
  })
  .catch(error => {
    console.error("Error details:", error.message);
  });

// 2. Async/await error handling with try-catch
async function fetchInvoice() {
  try {
    const invoice = await client.getInvoiceById("NON-EXISTENT");
    console.log("Invoice found:", invoice);
  } catch (error) {
    console.error("Error details:", error.message);
  }
}

fetchInvoice();

```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
