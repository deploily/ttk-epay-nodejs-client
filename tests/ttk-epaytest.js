const { TtkEpay } = require('../src');

async function main() {
  const ttkEpay = new TtkEpay();

  try {
    // Test fetching invoices
    const invoices = await ttkEpay.getInvoices(1, 10);
    console.log('Fetched invoices:', invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error.message);
  }

  try {
    // Test creating an invoice
    const newInvoice = await ttkEpay.createInvoice({
      amount: 150,
      description: 'Manual test invoice'
    });
    console.log('Created invoice:', newInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error.message);
  }

  try {
    // Test getting invoice by ID
    const invoice = await ttkEpay.getInvoiceById('12345');
    console.log('Invoice by ID:', invoice);
  } catch (error) {
    console.error('Error fetching invoice by ID:', error.message);
  }

  try {
    // Test payment status
    const status = await ttkEpay.getPaymentStatus('12345');
    console.log('Payment status:', status);
  } catch (error) {
    console.error('Error fetching payment status:', error.message);
  }

  try {
    // Test posting a payment
    const paymentResponse = await ttkEpay.postPayement({
      amount: 200,
      method: 'credit_card'
    });
    console.log('Posted payment:', paymentResponse);
  } catch (error) {
    console.error('Error posting payment:', error.message);
  }
}

main();
