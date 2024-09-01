import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleOrder, latestOpenOrder, updateOrder } from '../../api/orderData';
import createPaymentDetails from '../../api/paymentDetailsData';
import { useAuth } from '../../utils/context/authContext';

const initialOrderState = {
  id: '',
  customerId: '',
  open: true,
  totalAmount: '',
  orderDate: new Date().toISOString(),
  paymentId: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
};

const initialPaymentState = {
  orderId: '',
  paymentType: '',
  cardNumber: '',
  ccv: '',
  zip: '',
};

export default function CheckoutForm() {
  const [orderFormInput, setOrderFormInput] = useState(initialOrderState);
  const [paymentFormInput, setPaymentFormInput] = useState(initialPaymentState);
  const { user } = useAuth();
  const [openOrderId, setOpenOrderId] = useState(null);
  const [openOrderDetails, setOpenOrderDetails] = useState({});
  const router = useRouter();

  const getOpenOrder = () => {
    latestOpenOrder(user.id).then((order) => {
      if (order) {
        setOpenOrderId(order);
      } else {
        setOpenOrderId(null);
      }
    });
  };

  const getOpenOrderDetails = (orderId) => {
    if (orderId) {
      getSingleOrder(orderId)
        .then(setOpenOrderDetails);
    }
  };

  useEffect(() => {
    console.warn('user', user);
    if (user) {
      getOpenOrder();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    console.warn(openOrderId);
    if (openOrderId) {
      getOpenOrderDetails(openOrderId);
    }
  }, [openOrderId]);

  const handleOrderFormChange = (e) => {
    const { name, value } = e.target;
    setOrderFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentFormInput({
      ...paymentFormInput,
      paymentType: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createPaymentUpdateOrder = () => {
      const { id, ...paymentPayload } = paymentFormInput;
      const paymentWithOrderId = { ...paymentPayload, orderId: openOrderId };
      console.warn('paymentpayload', paymentWithOrderId);
      createPaymentDetails(paymentWithOrderId).then((paymentResponse) => {
        const paymentId = paymentResponse.id;
        const orderPayload = {
          ...orderFormInput, paymentId, open: false, customerId: openOrderDetails.customerId, id: openOrderDetails.id, orderDate: new Date().toISOString(), totalAmount: openOrderDetails.totalAmount,
        };
        console.warn('orderPayload', orderPayload);
        updateOrder(openOrderId, orderPayload).then(() => {
          setOpenOrderId(null);
          setOpenOrderDetails({});
          router.push('/thankYou');
        });
      });
    };
    createPaymentUpdateOrder();
  };

  return (
    <>
      <div><h3>Shipping Address</h3></div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street Address"
            name="streetAddress"
            value={orderFormInput.streetAddress}
            onChange={handleOrderFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            name="city"
            value={orderFormInput.city}
            onChange={handleOrderFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="State"
            name="state"
            value={orderFormInput.state}
            onChange={handleOrderFormChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zip Code"
            name="zip"
            value={orderFormInput.zip}
            onChange={handleOrderFormChange}
            required
          />
        </Form.Group>
        <div>
          <h3>Payment</h3>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="Visa"
                name="paymentType"
                type={type}
                id={`inline-${type}-1`}
                value="Visa"
                checked={paymentFormInput.paymentType === 'Visa'}
                onChange={handlePaymentTypeChange}
              />
              <Form.Check
                inline
                label="Discover"
                name="paymentType"
                type={type}
                id={`inline-${type}-2`}
                value="Discover"
                checked={paymentFormInput.paymentType === 'Discover'}
                onChange={handlePaymentTypeChange}
              />
              <Form.Check
                inline
                label="American Express"
                name="paymentType"
                type={type}
                id={`inline-${type}-3`}
                value="American Express"
                checked={paymentFormInput.paymentType === 'American Express'}
                onChange={handlePaymentTypeChange}
              />
            </div>
          ))}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea5">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Card Number"
              name="cardNumber"
              value={paymentFormInput.cardNumber}
              onChange={handlePaymentFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea6">
            <Form.Label>CCV</Form.Label>
            <Form.Control
              type="text"
              placeholder="CCV"
              name="ccv"
              value={paymentFormInput.ccv}
              onChange={handlePaymentFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea7">
            <Form.Label>Billing Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Billing Zip Code"
              name="zip"
              value={paymentFormInput.zip}
              onChange={handlePaymentFormChange}
              required
            />
          </Form.Group>
        </div>
        <div>
          <Button type="submit">Place Order</Button>
        </div>
      </Form>
    </>
  );
}
