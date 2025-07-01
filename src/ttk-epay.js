const axios = require('axios');
const { Invoice, InvoiceDto } = require('./models');

const BASE_URL = 'https://pay.demo.deploily.cloud/api/v1';

class TtkEpay {
  constructor(baseUrl, secretKey) {
    this.baseUrl = baseUrl;
    this.secretKey = secretKey
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'X-Api-Key': this.secretKey,
      },
    });
  }

  async getInvoices(pageNumber = 1, pageSize = 10) {
    const response = await this.client.get('/admin/invoices', {
      params: { pageNumber, pageSize },
    });
    return response.data;
  }

  async createInvoice(invoiceData) {
    const response = await this.client.post('/admin/invoices', invoiceData);
    return response.data;
  }

  async getInvoiceById(invoiceId) {
    const response = await this.client.get(`/admin/invoices/${invoiceId}`);
    return response.data;
  }

  async updateInvoice(invoiceId, invoiceData) {
    const response = await this.client.patch(`/admin/invoices/${invoiceId}`, invoiceData);
    return response.data;
  }

  async generateLink(orderId, clientCode) {
    const response = await this.client.get(`/admin/generate-link/`, {
      params: { orderID: orderId, clientCode: clientCode }
    });
    
    return response.data;
  }

  async getPayments({ pageNumber, pageSize, satim_order_id, invoice_id, from_date, to_date } = {}) {
    const params = {};
    if (pageNumber) params.pageNumber = pageNumber;
    if (pageSize) params.pageSize = pageSize;
    if (satim_order_id) params.SatimOrderId = satim_order_id;
    if (invoice_id) params.InvoiceId = invoice_id;
    if (from_date) params.FromDate = from_date;
    if (to_date) params.toDate = to_date;

    const response = await this.client.get('/admin/payments', { params });
    return response.data;
  }

  async getPaymentById(paymentId) {
    const response = await this.client.get(`/admin/payments/${paymentId}`);
    return response.data;
  }

  async getPdfRecipt(satim_order_id) {
    const response = await this.client.get('/epayment/generate-pdf', {
      params: { SATIM_ORDER_ID: satim_order_id },
      responseType: 'arraybuffer',
    });
    return response.data;
  }

  async sendPdfReceiptMail(satim_order_id, email) {
    const response = await this.client.get('/epayment/send-mail', {
      params: { SATIM_ORDER_ID: satim_order_id, EMAIL: email },
    });
    return response.headers['content-type'] === 'application/json'
      ? response.data
      : response.data.toString();
  }

  async postPayement(paymentData) {
    const response = await this.client.post('/epayment', paymentData);
    return response.data;
  }

  async getPaymentStatus(satim_order_id) {
    const response = await this.client.get('/epayment', {
      params: { SATIM_ORDER_ID: satim_order_id },
    });
    return response.data;
  }

  async generate_link(orderId, clientCode) {
    const response = await this.client.get(`/admin/generate-link/`, {
      params: { orderID: orderId, clientCode: clientCode }
    });
    return response.data;
    }
}


module.exports = { ttk_epay };
