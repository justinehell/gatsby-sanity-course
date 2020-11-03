import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. create some state to hold our order
  // we got rid of this line cause we moved the state up to the provider
  // const [order, setOrder] = useState([]);
  // now we access both our state and out setter via context
  const [order, setOrder] = useContext(OrderContext);
  // 2. make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. male a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the idem we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. send this data to a serverless function when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
