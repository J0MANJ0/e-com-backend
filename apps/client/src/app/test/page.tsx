import { auth } from '@clerk/nextjs/server';
import React from 'react';

const TestPage = async () => {
  const { getToken } = await auth();

  const token = await getToken();

  console.log(token);

  const resProduct = await fetch('http://localhost:8000/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataProduct = await resProduct.json();

  console.log({ dataProduct });

  const resOrder = await fetch('http://localhost:8001/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userOrders = await fetch('http://localhost:8001/user-orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataUserOrders = await userOrders.json();

  console.log({ dataUserOrders });

  const dataOrder = await resOrder.json();

  console.log({ dataOrder });

  const resPayment = await fetch('http://localhost:8002/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataPayment = await resPayment.json();

  console.log({ dataPayment });

  return (
    <div>
      TestPage: {dataPayment.message}
      {dataPayment.userId} Orders:{dataUserOrders.orders.length}
    </div>
  );
};

export default TestPage;
