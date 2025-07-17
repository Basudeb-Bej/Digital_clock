  const speech = window.speechSynthesis;
  let voices = [];
  let lastSpoken = null;

  function loadVoices() {
    voices = speech.getVoices();
  }

  if (speech) {
    speech.onvoiceschanged = loadVoices;
    loadVoices();
  }

  function speak(text) {
    if (speech.speaking) {
      speech.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const preferredVoices = ['Google UK English Female', 'Microsoft Zira Desktop'];
    const voice = voices.find(v => preferredVoices.includes(v.name)) || voices[0];

    if (voice) {
      utterance.voice = voice;
    }

    if (lastSpoken) {
      lastSpoken.classList.add('active');
      setTimeout(() => {
        lastSpoken.classList.remove('active');
      }, 2000);
    }

    speech.speak(utterance);
  }

  function speakTime() {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = now.getMinutes();

    let timeText;
    if (minutes === 0) {
      timeText = `It's ${hours} o'clock ${ampm}`;
    } else if (minutes === 15) {
      timeText = `It's quarter past ${hours} ${ampm}`;
    } else if (minutes === 30) {
      timeText = `It's half past ${hours} ${ampm}`;
    } else if (minutes === 45) {
      timeText = `It's quarter to ${(hours % 12) + 1} ${ampm}`;
    } else {
      timeText = `It's ${hours} ${minutes} ${ampm}`;
    }

    lastSpoken = document.getElementById('speakTimeIcon');
    speak(timeText);
  }

  function speakDate() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();

    let suffix;
    if (date % 100 >= 11 && date % 100 <= 13) {
      suffix = 'th';
    } else {
      switch (date % 10) {
        case 1: suffix = 'st'; break;
        case 2: suffix = 'nd'; break;
        case 3: suffix = 'rd'; break;
        default: suffix = 'th'; break;
      }
    }

    const dateText = `Today is ${dayName}, ${monthName} ${date}${suffix}, ${year}`;
    lastSpoken = document.getElementById('speakDateIcon');
    speak(dateText);
  }

  function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('seconds').textContent = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('ampm').textContent = ampm;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    document.getElementById('date').textContent = `Date: ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    document.getElementById('day').textContent = `Day: ${days[now.getDay()]}`;

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const analogHours = now.getHours() % 12;

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = (analogHours / 12) * 360 + (minutes / 60) * 30;

    document.querySelector('.second-hand').style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    document.querySelector('.minute-hand').style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
  }

  document.getElementById('speakTimeIcon').addEventListener('click', speakTime);
  document.getElementById('speakDateIcon').addEventListener('click', speakDate);

  updateClock();
  setInterval(updateClock, 1000);
