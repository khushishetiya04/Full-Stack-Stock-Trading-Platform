
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders", {
        withCredentials: true,
      })
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setErrorMessage(
          error.response?.data?.message || "Unable to fetch orders."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="orders">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="orders">
        <p className="text-danger">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <h3 className="title">Orders ({allOrders.length})</h3>

          <table className="table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {allOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{Number(order.price).toFixed(2)}</td>
                  <td
                    className={
                      order.mode === "BUY" ? "buy-order" : "sell-order"
                    }
                  >
                    {order.mode}
                  </td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
