import React, { useState } from 'react';
import './InvoiceForm.css';


//invoice form
const InvoiceForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    //seller details
    sellerDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      panNo: '',
      gstNo: '',
    },
    //billing details
    billingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: '',
    },

    //shipping details
    shippingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: '',
    },

    //order details
    orderDetails: {
      orderNo: '',
      orderDate: '',
    },

    //invoice
    invoiceDetails: {
      invoiceNo: '',
      invoiceDate: '',
    },
    reverseCharge: 'No',
    items: [
      {
        description: '',
        unitPrice: 0,
        quantity: 0,
        discount: 0,
        taxRate: 18,
      },
    ],
    //signature store
    signature: '',
  });

  //handle change
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset.section;

    //check current state
    if (section) {
      setFormState((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [name]: value,
        },
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

   //add items
   const handleAddItem = () => {
    setFormState((prevState) => ({
      ...prevState,
      items: [...prevState.items, { description: '', unitPrice: 0, quantity: 0, discount: 0, taxRate: 18 }],
    }));
  };



//set state
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formState.items];
    items[index][name] = value;
    setFormState((prevState) => ({
      ...prevState,
      items,
    }));
  };

 
   //handle submit
   const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  //handle file of signature and store in state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prevState) => ({
          ...prevState,
          signature: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

 

  return (
    <form onSubmit={handleSubmit}>
      <h1>Amazon Invoice Details</h1>
      <h2>Seller Details</h2>
      <input name="name" placeholder="Name" data-section="sellerDetails" onChange={handleChange} />
      <input name="address" placeholder="Address" data-section="sellerDetails" onChange={handleChange} />
      <input name="city" placeholder="City" data-section="sellerDetails" onChange={handleChange} />
      <input name="state" placeholder="State" data-section="sellerDetails" onChange={handleChange} />
      <input name="pincode" placeholder="Pincode" data-section="sellerDetails" onChange={handleChange} />
      <input name="panNo" placeholder="PAN No." data-section="sellerDetails" onChange={handleChange} />
      <input name="gstNo" placeholder="GST No." data-section="sellerDetails" onChange={handleChange} />

      <h2>Billing Details</h2>
      <input name="name" placeholder="Name" data-section="billingDetails" onChange={handleChange} />
      <input name="address" placeholder="Address" data-section="billingDetails" onChange={handleChange} />
      <input name="city" placeholder="City" data-section="billingDetails" onChange={handleChange} />
      <input name="state" placeholder="State" data-section="billingDetails" onChange={handleChange} />
      <input name="pincode" placeholder="Pincode" data-section="billingDetails" onChange={handleChange} />
      <input name="stateCode" placeholder="State Code" data-section="billingDetails" onChange={handleChange} />

      <h2>Shipping Details</h2>
      <input name="name" placeholder="Name" data-section="shippingDetails" onChange={handleChange} />
      <input name="address" placeholder="Address" data-section="shippingDetails" onChange={handleChange} />
      <input name="city" placeholder="City" data-section="shippingDetails" onChange={handleChange} />
      <input name="state" placeholder="State" data-section="shippingDetails" onChange={handleChange} />
      <input name="pincode" placeholder="Pincode" data-section="shippingDetails" onChange={handleChange} />
      <input name="stateCode" placeholder="State Code" data-section="shippingDetails" onChange={handleChange} />

      <h2>Order Details</h2>
      <input name="orderNo" placeholder="Order No." data-section="orderDetails" onChange={handleChange} />
      <input name="orderDate" type ='date' placeholder="Order Date" data-section="orderDetails" onChange={handleChange} />

      

      <h2>Items</h2>
      {formState.items.map((item, index) => (
        <div key={index}>
          <input name="description" placeholder="Description" onChange={(e) => handleItemChange(index, e)} />
          <input name="unitPrice" type="number" placeholder="Unit Price" onChange={(e) => handleItemChange(index, e)} />
          <input name="quantity" type="number" placeholder="Quantity" onChange={(e) => handleItemChange(index, e)} />
          <input name="discount" type="number" placeholder="Discount" onChange={(e) => handleItemChange(index, e)} />
          <input name="taxRate" type="number" placeholder="Tax Rate" onChange={(e) => handleItemChange(index, e)} />
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add Item</button>

      <h2>Invoice Details</h2>
      <input name="invoiceNo" placeholder="Invoice No." data-section="invoiceDetails" onChange={handleChange} />
      <input name="invoiceDate" type='date' placeholder="Invoice Date" data-section="invoiceDetails" onChange={handleChange} />

      <h2>Signature</h2>
      <div class="container">
      <input name="signature" type="file" onChange={handleFileChange}  />

      </div>
      

      <button type="submit">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
