$(document).ready(function () {
  // Initialize a global variable to store the chart instance
  var myChart;
  var yearCarouselInitialized = false;
  var monthCarouselInitialized = false;
  var weekCarouselInitialized = false;

  // Update chart based on selected duration
  function updateChart(duration, unit) {
    // Destroy the existing chart if it exists
    if (myChart) {
      myChart.destroy();
    }

    // Sample data for chart (replace with your actual data)
    var labels = [];
    var data = [];

    if (unit === "week") {
      for (var i = 1; i <= 7; i++) {
        labels.push("Day " + i);
        data.push(Math.floor(Math.random() * 100) + 1); // Random data for example
      }
    } else if (unit === "month") {
      for (var i = 1; i <= 30; i++) {
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);

        labels.push(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i
          ).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        );
        data.push(Math.floor(Math.random() * 100) + 1); // Random data for example
      }
    } else if (unit === "year") {
      for (var i = 1; i <= 12; i++) {
        labels.push("Month " + i);
        data.push(Math.floor(Math.random() * 100) + 1); // Random data for example
      }
    }

    // Create a gradient fill color
    var ctx = document.getElementById("myChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 200); // Start from top (0) and end at bottom (200)
    gradient.addColorStop(1, 'rgba(203,27,100,1)'); // Start color with transparency
    gradient.addColorStop(0, 'rgba(51,29,102,1)'); // End color with higher opacity

    // Calculate bar thickness based on unit
    var barThickness = unit === "month" ? 20 : 40; // Adjust bar thickness for month

    // Create a new chart
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Price over time",
            data: data,
            backgroundColor: gradient, // Use the gradient color as background
            borderWidth: 0,
            barThickness: barThickness, // Set bar thickness dynamically
            borderRadius: {
              topLeft: 10, // Adjust the top left corner radius
              topRight: 10, // Adjust the top right corner radius
              bottomLeft: 0, // Set the bottom left corner radius to 0
              bottomRight: 0, // Set the bottom right corner radius to 0
            },
          },
          
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          tooltip: {
            enabled: false, // Disable tooltips
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Hide vertical grid lines
            },
          },
          y: {
            display: false, // Hide the left line with numbers
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Year Carousel Controls
  $("#year-carousel").on("slid.bs.carousel", function () {
    var duration = $(".carousel-item.active")
      .find("p")
      .text()
      .split(":")[1]
      .trim()
      .split(" ")[0];
    updateChart(parseInt(duration), "year");
  });

  // Month Slider Change
  $("#month-carousel").on("slid.bs.carousel", function () {
    var duration = $("#month-carousel .carousel-item.active").index() + 1;
    updateChart(30, "month"); // Fixed to 30 days for each month
  });

  // Week Slider Change
  $("#week-carousel").on("slid.bs.carousel", function () {
    var duration = $("#week-carousel .carousel-item.active").index() + 1;
    updateChart(7, "week"); // Fixed to 7 days for each week
  });

  // Initialize chart with default duration
  updateChart(1, "year"); // Default duration for example

  // Month Tab Click
  $('#month-tab').on('click', function (e) {
    e.preventDefault();
    updateChart(30, "month"); // Fixed to 30 days for each month
  });

  // Week Tab Click
  $('#week-tab').on('click', function (e) {
    e.preventDefault();
    updateChart(7, "week"); // One week duration
  });

  $('#year-tab').on('click', function (e) {
    e.preventDefault();
    var duration = $(".carousel-item.active")
      .find("p")
      .text()
      .split(":")[1]
      .trim()
      .split(" ")[0];
    updateChart(parseInt(duration), "year");
  });

  $('.carousel').carousel({ interval: false, });
  $('.carousel').carousel({ wrap: false, });

  // Set chart gradient color
  var ctx = document.getElementById("myChart").getContext("2d");
  var gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(168, 53, 153, 1.0)'); // Start color with transparency
  gradient.addColorStop(1, 'rgba(41, 31, 44, 1.0)'); // End color with higher opacity

  Chart.defaults.color = gradient;
});
