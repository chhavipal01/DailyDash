import React, { useEffect, useState, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { ThemeContext } from "../../Context/ThemeContext";

Chart.register(...registerables);

const ActivityTracker = () => {
  const [chartData, setChartData] = useState(null);
  const { theme, themes } = useContext(ThemeContext);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get(["activityData"], (result) => {
        const activityData = result.activityData || {};
        const groupedData = {};

        Object.entries(activityData).forEach(([url, time]) => {
          try {
            const domain = new URL(url).hostname.replace("www.", "");
            groupedData[domain] = (groupedData[domain] || 0) + time;
          } catch (e) {
            groupedData[url] = (groupedData[url] || 0) + time;
          }
        });

        const sortedEntries = Object.entries(groupedData).sort((a, b) => b[1] - a[1]);
        const labels = sortedEntries.map(([domain]) => domain);
        const values = sortedEntries.map(([_, time]) => time);

        if (labels.length === 0) {
          setChartData(null);
          return;
        }

        const vibrantColors = [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
          "#9966FF", "#FF9F40", "#FF6F61", "#00C49F",
          "#FF4444", "#FFBB28", "#33B5E5", "#AA66CC"
        ];

        const generateColors = (num) => {
          const colors = [];
          for (let i = 0; i < num; i++) {
            colors.push(vibrantColors[i % vibrantColors.length]);
          }
          return colors;
        };

        setChartData({
          labels,
          datasets: [{
            label: "Time Spent",
            data: values,
            backgroundColor: generateColors(values.length),
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverBorderColor: "#000000",
            hoverBorderWidth: 2,
          }],
        });
      });
    } else {
      // fallback for development preview
      setChartData({
        labels: ["youtube.com", "google.com"],
        datasets: [{
          label: "Time Spent",
          data: [120, 35],
          backgroundColor: ["#FF6384", "#36A2EB"],
          borderColor: "#ffffff",
          borderWidth: 2,
          hoverBorderColor: "#000000",
          hoverBorderWidth: 2,
        }],
      });
    }
  }, [theme]);

  return (
    <div
      className="p-4 rounded-3xl  w-full "
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        color: themes[theme].text,
        maxHeight: "280px", // reduced height
      }}
    >
      <h2 className="text-md font-semibold mb-2">Activity Tracker</h2>
      {chartData ? (
        <div className="w-full h-[220px]"> {/* bigger chart */}
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: "50%", // controls donut thickness
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      const label = tooltipItem.label || "";
                      const value = tooltipItem.raw;
                      return `${label}: ${value >= 60
                        ? (value / 60).toFixed(1) + " hr"
                        : value + " min"
                        }`;
                    },
                  },
                },
                legend: {
                  position: "right",
                  labels: {
                    color: themes[theme].text,
                    boxWidth: 12,
                    font: { size: 12 },
                    padding: 12,
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-gray-500">No activity data available.</p>
      )}
    </div>
  );
};

export default ActivityTracker;
