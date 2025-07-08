let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let interval = null;
let running = false;

const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const modeToggle = document.getElementById("modeToggle");
const laps = document.getElementById("laps");

function updateDisplay() {
  const format = (n) => String(n).padStart(2, "0");
  display.textContent = `${format(hours)}:${format(minutes)}:${format(
    seconds
  )}`;
}

function timer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

startStopBtn.addEventListener("click", () => {
  if (!running) {
    interval = setInterval(timer, 1000);
    startStopBtn.textContent = "Pause";
    running = true;
  } else {
    clearInterval(interval);
    startStopBtn.textContent = "Start";
    running = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  startStopBtn.textContent = "Start";
  running = false;
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
});

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌕";
});

updateDisplay();
