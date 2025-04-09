import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
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

        const labels = Object.keys(groupedData);
        const values = Object.values(groupedData);

        if (labels.length === 0) {
          setChartData(null);
          return;
        }

        setChartData({
          labels,
          datasets: [{
            label: "Time Spent",
            data: values,
            backgroundColor: themes[theme].button,
            borderColor: themes[theme].text,
            borderWidth: 1,
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
          backgroundColor: themes[theme].button,
          borderColor: themes[theme].text,
          borderWidth: 1,
        }],
      });
    }
  }, [theme]);

  return (
    <div
      className="p-4 rounded-xl shadow-md w-full  min-h-[260px]"
      style={{ backgroundColor:"rgba(255, 255, 255, 0.5)" , color: themes[theme].text }}
    >
      <h2 className="font-bold mb-4">Weekly Activity Tracker</h2>
      {chartData ? (
        <div className="w-full h-full">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: {
                    color: themes[theme].text,
                    callback: (value) =>
                      value >= 60 ? `${(value / 60).toFixed(2)} hr` : `${value} min`,
                  },
                },
                x: {
                  ticks: { color: themes[theme].text },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      const value = tooltipItem.raw;
                      return value >= 60 ? `${(value / 60).toFixed(2)} hr` : `${value} min`;
                    },
                  },
                },
                legend: {
                  labels: {
                    color: themes[theme].text,
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
