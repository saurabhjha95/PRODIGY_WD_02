let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearLapsBtn = document.getElementById("clearLapsBtn");
const lapsContainer = document.getElementById("laps");

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 1);
    startStopBtn.innerHTML = "Pause";
    running = true;
  } else {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    startStopBtn.innerHTML = "Start";
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  startStopBtn.innerHTML = "Start";
  difference = 0;
  display.innerHTML = "00:00:00";
  laps = [];
  lapsContainer.innerHTML = "";
}

function lap() {
  if (running) {
    const lapTime = display.innerHTML;
    laps.push(lapTime);
    const lapElement = document.createElement("li");
    lapElement.innerHTML = lapTime;
    lapsContainer.appendChild(lapElement);
  }
}

function clearLaps() {
  laps = [];
  lapsContainer.innerHTML = "";
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  display.innerHTML = hours + ":" + minutes + ":" + seconds;
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
clearLapsBtn.addEventListener("click", clearLaps);
