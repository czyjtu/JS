chart_div = document.getElementById("chart_div");
chart_div.style.width = "60%";
chart_div.style.height = "60%";

var SetIntervalTime = [];
var SetTimeoutTime = [];
var meanInterval = 0;
var meanTimeout = 0;
var timeout;
var interval;
var requestAnimationFrame;
var isRunning = false;
var N = 10;
var M;

var ctx = document.getElementById("chart").getContext("2d");
var chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Interval", "Timeout"],
    datasets: [
      {
        label: "mean ",
        data: [meanInterval, meanTimeout],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    animation: {
      duration: 0,
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1200,
          },
        },
      ],
    },
  },
});

function doTimeConsumingCallculationsWithSetInterval() {
  SetIntervalTime.push(performance.now());
  if (SetIntervalTime.length > N) {
    SetIntervalTime.shift();
  }
  worker();
}

function doTimeConsumingCallculationsWithSetTimeout() {
  SetTimeoutTime.push(performance.now());
  if (SetIntervalTime.length > N) {
    SetTimeoutTime.shift();
  }
  worker();
  window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, M);
}

function average([x, ...xs]) {
  return (
    xs.reduce(([acc, last], x) => [acc + (x - last), x], [0, x])[0] / xs.length
  );
}

function updateMeans() {
  let newMeanInterval = average(SetIntervalTime);
  let newMeanTimeout = average(SetTimeoutTime);
  if (newMeanInterval == meanInterval && newMeanTimeout == meanTimeout) {
    return false;
  }
  meanTimeout = newMeanTimeout;
  meanInterval = newMeanInterval;
  return true;
}

function drawChart() {
  if (updateMeans()) {
    chart.data.datasets[0].data = [meanInterval, meanTimeout];
    chart.update();
    console.log(chart.data.datasets[0].data);
  }
  if (isRunning) {
    window.requestAnimationFrame(drawChart);
  }
}

function start() {
  if (!isRunning) {
    isRunning = true;
    M = document.getElementById("liczba").value;
    repeatDrawing = true;
    timeout = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, M);
    interval = window.setInterval(
      doTimeConsumingCallculationsWithSetInterval,
      M
    );
    window.requestAnimationFrame(drawChart);
  }
}

function stopp() {
  clearTimeout(timeout);
  clearInterval(interval);
  isRunning = false;
}

function worker() {
  calculatePrimes(1000, 10000000);
}

function calculatePrimes(iterations, multiplier) {
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}
