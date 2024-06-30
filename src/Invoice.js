import React from 'react';
import './Invoice.css';
import { toPng } from 'html-to-image';
import logo from './amazon.png';


const Invoice = ({ formData }) => {

  //calculate net amount
  const calculateNetAmount = (unitPrice, quantity, discount) => {
    return (unitPrice * quantity) - discount;
  };

  //calculate taxation
  const calculateTax = (netAmount, taxRate) => {
    return (netAmount * taxRate) / 100;
  };

  //handle download
  const handleDownload = () => {
    const node = document.getElementById('invoice');
    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'invoice.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        
        console.error('Could not download image', error);
      });
  };

  let totalNetAmount = 0;
  let totalTaxAmount = 0;
  let grandTotal = 0;

  formData.items.forEach((item) => {
    //calcualte net amount
    const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
    const taxAmount = calculateTax(netAmount, item.taxRate);
    totalNetAmount += netAmount;
    totalTaxAmount += taxAmount;
    grandTotal += netAmount + taxAmount;
  });

  

  return (
    <div>
      <div id="invoice" style={{ padding: '20px', border: '1px solid #000', width: '800px', margin: 'auto' }}>
        <h1> Amazon Invoice</h1>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src={logo} alt="Company Logo" style={{ height: '150px', bredth: '100px' }} />
        </div>
        <div >
          <h1 style={{ textAlign: 'left', marginTop: '20px' }}>Seller Details:</h1>
          <p>{formData.sellerDetails.name}</p>
          <p>{formData.sellerDetails.address}</p>
          <p>{formData.sellerDetails.city}, {formData.sellerDetails.state}, {formData.sellerDetails.pincode}</p>
          <p>PAN No.: {formData.sellerDetails.panNo}</p>
          <p>GST Registration No.: {formData.sellerDetails.gstNo}</p>
        </div>
        <div>
          <h1 style={{ textAlign: 'left', marginTop: '20px' }}>Billing Details:</h1>
          <p>{formData.billingDetails.name}</p>
          <p>{formData.billingDetails.address}</p>
          <p>{formData.billingDetails.city}, {formData.billingDetails.state}, {formData.billingDetails.pincode}</p>
          <p>State Code: {formData.billingDetails.stateCode}</p>
        </div>
        <div>
          <h1 style={{ textAlign: 'left', marginTop: '20px' }}>Shipping Details:</h1>
          <p>{formData.shippingDetails.name}</p>
          <p>{formData.shippingDetails.address}</p>
          <p>{formData.shippingDetails.city}, {formData.shippingDetails.state}, {formData.shippingDetails.pincode}</p>
          <p>State Code: {formData.shippingDetails.stateCode}</p>
        </div>
        <div>
          <h1 style={{ textAlign: 'left', marginTop: '20px' }}>Order Details:</h1>
          <p>Order No.: {formData.orderDetails.orderNo}</p>
          <p>Order Date: {formData.orderDetails.orderDate}</p>
        </div>
        <div>
          <h1 style={{ textAlign: 'left', marginTop: '20px' }}>Invoice Details:</h1>
          <p>Invoice No.: {formData.invoiceDetails.invoiceNo}</p>
          <p>Invoice Date: {formData.invoiceDetails.invoiceDate}</p>
        </div>
        <div>
          <h1>Items</h1>
          <table border="1">
            <thead>
              <tr>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Net Amount</th>
                <th>Tax Rate</th>
                <th>Tax Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => {
                const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
                const taxAmount = calculateTax(netAmount, item.taxRate);
                const totalAmount = netAmount + taxAmount;
                return (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.quantity}</td>
                    <td>{item.discount}</td>
                    <td>{netAmount.toFixed(2)}</td>
                    <td>{item.taxRate}%</td>
                    <td>{taxAmount.toFixed(2)}</td>
                    <td>{totalAmount.toFixed(2)} ₹ </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div >
        
          <h4>Total Net Amount: <strong>{totalNetAmount.toFixed(2)}₹</strong></h4>
          <h4>Total Tax Amount: <strong>{totalTaxAmount.toFixed(2)}₹</strong></h4>
          <h2>Grand Total: <strong>{grandTotal.toFixed(2)} ₹</strong></h2>
         

        </div>
        
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
        <p><strong>{formData.sellerDetails.name}</strong></p>
        
          <p> Authorised Signature</p>
          <div class="container1">
          {formData.signature && (
            <img src={formData.signature} alt="Signature" style={{ height: '75px', alignItems:'left'}} />
          )}
          </div>
          
          
        </div>
      </div>
      <button onClick={handleDownload}>Download Invoice</button>
    </div>
  );
};

export default Invoice;
