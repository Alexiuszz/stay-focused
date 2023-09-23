import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getDays } from "@/helpers/utils";
import { last7Data } from "@/storage/dataStorage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

ChartJS.defaults.color = "#d3cfcf";
ChartJS.defaults.font.weight = "100";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
      labels: {
        font: {
          size: 12,
          weight: "100",
        },
      },
    },
    title: {
      display: true,
      text: "Performance",
    },
  },
};

const labels = getDays();

export function StreakChart({ todayTime }: { todayTime: number }) {
  return (
    <Line
      options={options}
      data={{
        labels,
        datasets: [
          {
            fill: true,
            label: "",
            data: [...last7Data(), Math.ceil(todayTime / 60)],
            borderColor: "rgb(53, 235, 77)",
            backgroundColor: "rgba(53, 235, 77, 0.5)",
            tension: 0.5,
          },
        ],
      }}
    />
  );
}
