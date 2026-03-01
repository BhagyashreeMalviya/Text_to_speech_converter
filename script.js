// Check support
if (!('speechSynthesis' in window)) {
  alert("Your browser doesn't support Speech Synthesis API.");
}

// Get elements
const textArea = document.getElementById('text');
const speakBtn = document.getElementById('speakBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const stopBtn = document.getElementById('stopBtn');
const voiceSelect = document.getElementById('voiceSelect');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const rateValue = document.getElementById('rateValue');
const pitchValue = document.getElementById('pitchValue');

let voices = [];
let currentUtterance = null;

// Load voices
function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';

  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' - default' : ''}`;
    voiceSelect.appendChild(option);
  });
}

// Some browsers fire voiceschanged event
window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Update displayed values
rateInput.addEventListener('input', () => {
  rateValue.textContent = rateInput.value;
});

pitchInput.addEventListener('input', () => {
  pitchValue.textContent = pitchInput.value;
});

// Speak function
function speakText() {
  const text = textArea.value.trim();
  if (!text) {
    alert('Please enter some text.');
    return;
  }

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const selectedVoiceIndex = voiceSelect.value;
  if (voices[selectedVoiceIndex]) {
    utterance.voice = voices[selectedVoiceIndex];
  }

  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

// Button events
speakBtn.addEventListener('click', speakText);

pauseBtn.addEventListener('click', () => {
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
  }
});

resumeBtn.addEventListener('click', () => {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
});

stopBtn.addEventListener('click', () => {
  if (window.speechSynthesis.speaking || window.speechSynthesis.paused) {
    window.speechSynthesis.cancel();
  }
});
