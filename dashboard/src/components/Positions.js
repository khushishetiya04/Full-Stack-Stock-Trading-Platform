import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import API_URL from "../api";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { refreshVersion } = useContext(GeneralContext);

  useEffect(() => {
    let active = true;

    const fetchPositions = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(`${API_URL}/allPositions`, {
          withCredentials: true,
        });

        if (active) {
          setAllPositions(res.data);
        }
      } catch (error) {
        console.error("Error fetching positions:", error);

        if (active) {
          setError("Unable to load positions. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchPositions();

    return () => {
      active = false;
    };
  }, [refreshVersion]);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading positions...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" role="alert" className="text-danger">
                  {error}
                </td>
              </tr>
            ) : allPositions.length === 0 ? (
              <tr>
                <td colSpan="7">No positions available.</td>
              </tr>
            ) : (
              allPositions.map((stock, index) => {
                const curVal = stock.price * stock.qty;
                const isProfit = curVal - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={stock._id || `${stock.name}-${index}`}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{Number(stock.avg).toFixed(2)}</td>
                    <td>{Number(stock.price).toFixed(2)}</td>
                    <td className={profClass}>
                      {(curVal - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
