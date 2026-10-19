// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // import { positions } from "../data/data";

// const Positions = () => {
//   const [allPositions, setAllPositions] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3002/allPositions", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         console.log(res.data);
//         setAllPositions(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching positions:", error);
//       });
//   }, []);

//   return (
//     <>
//       <h3 className="title">Positions ({allPositions.length})</h3>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Product</th>
//             <th>Instrument</th>
//             <th>Qty.</th>
//             <th>Avg.</th>
//             <th>LTP</th>
//             <th>P&L</th>
//             <th>Chg.</th>
//           </tr>

//           {allPositions.map((stock, index) => {
//             const curVal = stock.price * stock.qty;
//             const isProfit = curVal - stock.avg * stock.qty >= 0.0;
//             const profClass = isProfit ? "profit" : "loss";
//             const dayClass = stock.isLoss ? "loss" : "profit";

//             return (
//               <tr key={index}>
//                 <td>{stock.product}</td>
//                 <td>{stock.name}</td>
//                 <td>{stock.qty}</td>
//                 <td>{stock.avg.toFixed(2)}</td>
//                 <td>{stock.price.toFixed(2)}</td>
//                 <td className={profClass}>
//                   {(curVal - stock.avg * stock.qty).toFixed(2)}
//                 </td>
//                 <td className={dayClass}>{stock.day}</td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

// export default Positions;









import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const { refreshVersion } = useContext(GeneralContext);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allPositions", {
        withCredentials: true,
      })
      .then((res) => {
        setAllPositions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching positions:", error);
      });
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
            {allPositions.map((stock, index) => {
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
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
