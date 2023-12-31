import { secondsToHrMins } from "@/helpers/utils";
import React from "react";

const RoundMeter = ({
  value,
  maxValue,
  size = 200,
  strokeWidth = 18,
}: {
  value: number;
  maxValue: number;
  size?: number;
  strokeWidth?: number;
}) => {
  // Calculate the percentage of the value relative to the maxValue
  const percentage = (value / maxValue) * 100;

  // Calculate the path of the meter's gauge
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = percentage<100?((100 - percentage) / 100) * circumference: 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#64748b" // Background color
        strokeWidth={strokeWidth}
      />
      {percentage > 1 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#1be96d" // Gauge color
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="24"
        fill={value < maxValue ? "#dadada" : "#50a264"} // Text color
        className="flex flex-col"
      >
        {value < maxValue
          ? secondsToHrMins(maxValue - value).hrs +
            "h " +
            secondsToHrMins(maxValue - value).mins +
            "m"
          : secondsToHrMins(value).hrs +
            "h " +
            secondsToHrMins(value).mins +
            "m"}
      </text>
    </svg>
  );
};

export default RoundMeter;
