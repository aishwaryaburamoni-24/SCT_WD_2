let timer = 0;
let interval;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const toggleThemeBtn = document.getElementById("toggle-theme");
const lapList = document.getElementById("lap-list");
const beepSound = document.getElementById("beep-sound");

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    (hrs < 10 ? "0" : "") + hrs + ":" +
    (mins < 10 ? "0" : "") + mins + ":" +
    (secs < 10 ? "0" : "") + secs
  );
}

function updateDisplay() {
  display.textContent = formatTime(timer);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  interval = setInterval(() => {
    timer++;
    updateDisplay();

    if (timer % 60 === 0) {
      beepSound.play().catch(err => {
        console.error("Sound playback error:", err);
      });
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  timer = 0;
  updateDisplay();
  lapList.innerHTML = "";
}

function recordLap() {
  const lapTime = formatTime(timer);
  const lapItem = document.createElement("div");
  lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
  lapList.appendChild(lapItem);
}

// Button events
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

// Dark Mode Toggle
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case 's': startTimer(); break;
    case 'p': pauseTimer(); break;
    case 'r': resetTimer(); break;
    case 'l': recordLap(); break;
  }
});

updateDisplay(); // initial display
