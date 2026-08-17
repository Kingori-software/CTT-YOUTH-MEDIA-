/*
==================================================
CTT YOUTH MEDIA – All functionality
==================================================
*/

// ---------- EVENTS DATA ----------
const events = [
  {
    title: "Worship Night",
    date: "21 st AUGUST",
    description: "YOUTH WORSHIP NIGHT is an event where we come to worship, praise and pray to God.",
    image: "https://i.ibb.co/nswf3VYJ/edward-cisneros-QSa-uv4-WJ0k-unsplash.jpg"
  },
  {
    title: "Teens Hangout",
    date: "FROM 18 th AUGUST",
    description: "A fun and engaging space where teens connect, make friends, share experiences, and enjoy great vibes together! 🎉🤝.",
    image: "https://i.ibb.co/WWYM3vx0/istockphoto-2229387307-612x612.jpg"
  }
];

// ---------- MEDIA TEAM DATA ----------
const mediaTeam = [
  { name: "David", role: "Sound" },
  { name: "Steve", role: "Projection" },
  { name: "Ryan", role: "Photography" },
  { name: "Frank", role: "Stage Management" },
  { name: "Lewis", role: "Note taking"},
];

// ---------- BOT ANSWERS ----------
const answers = [
  {
    keys: ["service timing", "service times", "timing", "timings", "time"],
    answer: "The 1st Service is from 8:30am to 10:30am. The 2nd Service is from 11:30am to 1:30pm."
  },
  {
    keys: ["first service", "1st service"],
    answer: "The first service is the Teens Service, from 8:30am to 10:30am."
  },
  {
    keys: ["second service", "2nd service"],
    answer: "The second service is the Youth Service, from 11:30am to 1:30pm."
  },
  {
    keys: ["upcoming event", "upcoming events", "events"],
    answer: "Kindly scroll through to the Upcoming Events section and you'll check them there."
  }
];

// ---------- RENDER EVENTS ----------
const eventsGrid = document.getElementById('eventsGrid');
function renderEvents() {
  eventsGrid.innerHTML = events.map(event => `
    <article class="event-card">
      <img src="${event.image}" alt="${event.title}" loading="lazy" />
      <div class="event-body">
        <div class="event-date">${event.date}</div>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
      </div>
    </article>
  `).join('');
}

// ---------- RENDER TEAM ----------
const teamGrid = document.getElementById('teamGrid');
function initials(name) {
  return name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
function renderTeam() {
  teamGrid.innerHTML = mediaTeam.map(person => `
    <article class="team-card">
      <div class="team-avatar">${initials(person.name)}</div>
      <h3>${person.name}</h3>
      <p>${person.role}</p>
    </article>
  `).join('');
}

// ---------- CHAT BOT ----------
function botAnswer(question) {
  const q = question.toLowerCase().trim();
  const match = answers.find(item => item.keys.some(key => q.includes(key)));
  if (match) return match.answer;
  return "I can help with service timings, the first service, the second service, and upcoming events. Try asking me one of those.";
}

const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

function addMessage(text, type) {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.innerHTML = `<b>${type === 'bot' ? 'CTT Bot' : 'You'}</b><span>${text}</span>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function ask(question) {
  addMessage(question, 'user');
  setTimeout(() => addMessage(botAnswer(question), 'bot'), 250);
}

// Chat form submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = chatInput.value.trim();
  if (!q) return;
  ask(q);
  chatInput.value = '';
});

// Quick questions
document.querySelectorAll('.quick-questions button').forEach(btn => {
  btn.addEventListener('click', () => ask(btn.dataset.question));
});

// ---------- THEME TOGGLE ----------
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function getTheme() {
  return document.documentElement.dataset.theme || 'light';
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem('ctt-theme', 'dark');
  } else {
    delete document.documentElement.dataset.theme;
    localStorage.setItem('ctt-theme', 'light');
  }
  updateIcon();
}

function updateIcon() {
  themeIcon.textContent = getTheme() === 'dark' ? '☀️' : '🌑';
}

// Load saved theme
const saved = localStorage.getItem('ctt-theme');
if (saved === 'dark') setTheme('dark');
else setTheme('light');

themeToggle.addEventListener('click', () => {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
});

// ---------- LAST UPDATED ----------
document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric'
});

// ---------- INIT ----------
renderEvents();
renderTeam();