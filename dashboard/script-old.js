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
    for (var i = 1; i <= 7; i++) { // Limit to 7 days for week
      labels.push("Day " + i);
      data.push(Math.floor(Math.random() * 100) + 1); // Random data for example
    }
  } else if (unit === "month") {
    for (var i = 1; i <= 30; i++) { // Limit to 30 days for month
      var currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 1); // Subtract one month to get the start date

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
    for (var i = 1; i <= 12; i++) { // Limit to 12 months for one year
      labels.push("Month " + i);
      data.push(Math.floor(Math.random() * 100) + 1); // Random data for example
    }
  }
// Create a linear gradient fill color 

    // Create a gradient fill color
    var ctx = document.getElementById("myChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(255, 99, 132, 0.2)'); // Start color with transparency
    gradient.addColorStop(1, 'rgba(255, 99, 132, 0.8)'); // End color with higher opacity

  // Create a new chart
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Price over time",
          data: data,
          // backgroundColor: "linear-gradient(9.37deg, #CB1B64 0%, #331D66 93.83%)",
          borderWidth: 1,
          barThickness:40,
        },
      ],
    },
    options: {
      scales: {
        y: {
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
  $('#month-tab').on('click', function(e) {
    e.preventDefault();
    updateChart(30, "month"); // Fixed to 30 days for each month
  });

  // Week Tab Click
  $('#week-tab').on('click', function(e) {
    e.preventDefault();
    updateChart(7, "week"); // One week duration
  });

  $('#year-tab').on('click', function(e) {
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
});
