import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 12,
        padding: 10,
        font: {
          size: 11,
        },
      },
    },
  },
};

export function DoughnoutChart({ data }) {
  return (
    <div style={{ width: "100%", height: "260px", position: "relative" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}