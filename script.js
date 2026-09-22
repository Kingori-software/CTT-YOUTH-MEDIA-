/*
==================================================
CTT YOUTH MEDIA – All functionality
==================================================
*/

// ---------- EVENTS DATA ----------
const events = [
  {
    title: "Missions Month",
date: "September ",
description: "Missions.",
image: "https://i.ibb.co/d0SQskDQ/IMG-20260906-WA7380.jpg"
},
{
  title: "Sunday",
  date: "September",
  description: "Church.",
  image:"https://i.ibb.co/dJrgqtkN/FSai5-UPXIAE0g-Y6.jpg"
}
];

// ---------- MEDIA TEAM DATA (Two separate arrays) ----------
const firstTeam = [
  { name: "Blank", role: "Sound" },
  { name: "Blank", role: "Projection" },
  { name: "Blank", role: "Photography" },
  { name: "Blank", role: "Cable and Stage Management" },
  { name: "Blank", role: "Note taking" }
];

const secondTeam = [
  { name: "Blank", role: "Sound" },
  { name: "Blank", role: "Projections" },
  { name: "Blank", role: "Socials" },
  { name: "Blank", role: "Photography" },
  { name: "Blank", role: "Cable and Stage management" }
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

// ---------- RENDER EVENTS (with clickable images and titles) ----------
const eventsGrid = document.getElementById('eventsGrid');
function renderEvents() {
  eventsGrid.innerHTML = events.map(event => {
    // Image click: opens the image in a new tab
    const imageLink = event.image; // or you could use a separate field: event.imageLink
    const titleLink = event.url || null; // if url exists, title becomes a link

    return `
      <article class="event-card">
        <a href="${imageLink}" target="_blank" rel="noopener noreferrer">
          <img src="${event.image}" alt="${event.title}" loading="lazy" />
        </a>
        <div class="event-body">
          <div class="event-date">${event.date}</div>
          ${titleLink 
            ? `<h3><a href="${titleLink}" target="_blank" rel="noopener noreferrer" style="color: var(--red); text-decoration: underline; transition: color 0.2s;" onmouseover="this.style.color='var(--red-dark)'" onmouseout="this.style.color='var(--red)'">${event.title}</a></h3>`
            : `<h3>${event.title}</h3>`
          }
          <p>${event.description}</p>
        </div>
      </article>
    `;
  }).join('');
}

// ---------- RENDER TEAM (two grids) ----------
function initials(name) {
  return name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function renderTeam() {
  const gridFirst = document.getElementById('teamGridFirst');
  const gridSecond = document.getElementById('teamGridSecond');

  function renderGrid(grid, team) {
    grid.innerHTML = team.map(person => `
      <article class="team-card">
        <div class="team-avatar">${initials(person.name)}</div>
        <h3>${person.name}</h3>
        <p>${person.role}</p>
      </article>
    `).join('');
  }

  renderGrid(gridFirst, firstTeam);
  renderGrid(gridSecond, secondTeam);
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