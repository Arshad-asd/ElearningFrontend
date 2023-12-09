import "../../Containers/admin/AdminDashboard.css";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function AdminDashboard() {
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const chartInstance = useRef(null);
  const pieChartInstance = useRef(null);

  useEffect(() => {
    // Get the context of the canvas element for the first chart (Doughnut Chart)
    const ctx = chartRef.current.getContext("2d");

    const dataForm = ["user", "tutor", "subscribser"];
    const userCount = 10;

    const data = {
      labels: dataForm,
      datasets: [
        {
          label: "My First Dataset",
          data: [userCount, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: data,
    };

    // Destroy existing Chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new Chart instance for the first chart
    chartInstance.current = new Chart(ctx, config);

    // Get the context of the canvas element for the second chart (Pie Chart)
    const pieCtx = pieChartRef.current.getContext("2d");

    const pieData = {
      labels: ["Category A", "Category B", "Category C"],
      datasets: [
        {
          data: [30, 40, 30],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverOffset: 4,
        },
      ],
    };

    const pieConfig = {
      type: "pie",
      data: pieData,
    };

    // Destroy existing Pie Chart instance before creating a new one
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }

    // Create a new Pie Chart instance for the second chart
    pieChartInstance.current = new Chart(pieCtx, pieConfig);

    // Clean up the Chart instances when the component is unmounted
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div style={{ height: "100vh", backgroundColor: "	#fcdad1" }}>
        <div className="container" style={{ paddingTop: "7rem" }}>
          {/* Header Row */}
          <div className="row ">
            <div className="col">
              <div className="header d-flex justify-content-between align-items-center">
                <div className="link-container">
                  <Link
                    to="/live"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Row */}
          <div className="row mt-3">
            <div className="container flex grid grid-cols-2">
              {/* First Column with Doughnut Chart */}
              <div
                className=" flex justify-center "
                style={{ height: "400px" }}
              >
                <canvas ref={chartRef}></canvas>
              </div>

              {/* Second Column with Pie Chart */}
              <div
                className=" flex justify-center "
                style={{ height: "400px" }}
              >
                <canvas ref={pieChartRef}></canvas>
              </div>
            </div>
            {/* You can add more columns for additional cards */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
