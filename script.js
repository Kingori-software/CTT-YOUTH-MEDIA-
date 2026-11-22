
/*
==================================================
CTT YOUTH MEDIA – All functionality
==================================================
*/

// ---------- EVENTS DATA ----------
const events = [
  {
    title: "YT 2026 FESTIVAL",
    date: "25-27th November",
    description: `It’s time to step into your light! ✨🔥 Get ready for three unforgettable days of life-changing sessions, powerful worship, and next-level connection at the YT 2026 Festival!

Under the theme Arise & Shine (Isaiah 60:1), we’re gathering youth and teens from across the nation for an experience you don’t want to miss. Tag your squad, clear your calendar, and come ready to be transformed! 🙌🏽⚡

📅 Dates: 25th – 27th Nov, 2026
⏰ Time: 8:00 AM – 5:00 PM`,
    image: "https://xsvudifkvccfyycgcjcv.supabase.co/storage/v1/object/public/product-images/CTT/UPCOMING%20EVENTS/IMG-20261120-WA0438.jpg"
  },
  {
    title: "Color Fest Fun day",
    date: "21st November",
    description: "Ready to get messy? Join us for Color Fest Fun Day—a high-energy celebration of music, games, and epic bursts of color! Wear white, bring your crew, and get ready to dance, laugh, and glow from head to toe. Don't just watch the fun—become part of the canvas! 🌈🎉",
    image: "https://xsvudifkvccfyycgcjcv.supabase.co/storage/v1/object/public/product-images/CTT/UPCOMING%20EVENTS/IMG-20261118-WA0216.jpg"
  }
];

// ---------- MEDIA TEAM DATA ---------
const firstTeam = [
  { name: "Lewis", role: "Sound" },
  { name: "Calvin", role: "Projections"},
  { name: "Chris", role: "Stage Management" },
  { name: "Lewiy", role: "Note Taking" },
  { name: "", role: "" }
];

const secondTeam = [
  { name: "Leonard", role: "Sound" },
  { name: "Josh/Chirs", role: "Projections" },
  { name: "Calvin", role: "Stage Management" },
  { name: "Lewis", role: "Note Taking" },
  { name: "", role: "" }
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
function renderEvents() {
  const eventsGrid = document.getElementById("eventsGrid");

  if (!eventsGrid) {
    console.error("CTT: eventsGrid element was not found in HTML.");
    return;
  }

  eventsGrid.innerHTML = events.map(event => {
    const imageLink = event.image;
    const titleLink = event.url || null;

    return `
      <article class="event-card">
        <a href="${imageLink}" target="_blank" rel="noopener noreferrer">
          <img
            src="${imageLink}"
            alt="${event.title}"
            loading="lazy"
            onerror="this.style.display='none'; this.parentElement.insertAdjacentHTML('beforeend', '<div class=\\'image-error\\'>Event image unavailable</div>')"
          />
        </a>

        <div class="event-body">
          <div class="event-date">${event.date}</div>

          ${
            titleLink
              ? `<h3><a href="${titleLink}" target="_blank" rel="noopener noreferrer">${event.title}</a></h3>`
              : `<h3>${event.title}</h3>`
          }

          <p>${event.description.replace(/\n/g, "<br>")}</p>
        </div>
      </article>
    `;
  }).join("");
}

// ---------- RENDER TEAM ----------
function initials(name) {
  if (!name || !name.trim()) return "?";

  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderTeam() {
  const gridFirst = document.getElementById("teamGridFirst");
  const gridSecond = document.getElementById("teamGridSecond");

  function renderGrid(grid, team) {
    if (!grid) {
      console.error("CTT: A team grid element was not found.");
      return;
    }

    grid.innerHTML = team.map(person => `
      <article class="team-card">
        <div class="team-avatar">${initials(person.name)}</div>
        <h3>${person.name}</h3>
        <p>${person.role}</p>
      </article>
    `).join("");
  }

  renderGrid(gridFirst, firstTeam);
  renderGrid(gridSecond, secondTeam);
}

// ---------- CHAT BOT ----------
function botAnswer(question) {
  const q = question.toLowerCase().trim();

  const match = answers.find(item =>
    item.keys.some(key => q.includes(key))
  );

  if (match) return match.answer;

  return "I can help with service timings, the first service, the second service, and upcoming events. Try asking me one of those.";
}

function addMessage(text, type) {
  const chatMessages = document.getElementById("chatMessages");

  if (!chatMessages) return;

  const div = document.createElement("div");
  div.className = `message ${type}`;

  const heading = document.createElement("b");
  heading.textContent = type === "bot" ? "CTT Bot" : "You";

  const content = document.createElement("span");
  content.textContent = text;

  div.appendChild(heading);
  div.appendChild(content);

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function ask(question) {
  addMessage(question, "user");

  setTimeout(() => {
    addMessage(botAnswer(question), "bot");
  }, 250);
}

// ---------- INITIALIZE AFTER HTML LOADS ----------
document.addEventListener("DOMContentLoaded", () => {

  // Chat form
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", e => {
      e.preventDefault();

      const q = chatInput.value.trim();

      if (!q) return;

      ask(q);
      chatInput.value = "";
    });
  }

  // Quick questions
  document.querySelectorAll(".quick-questions button").forEach(btn => {
    btn.addEventListener("click", () => {
      ask(btn.dataset.question || "");
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  function getTheme() {
    return document.documentElement.dataset.theme || "light";
  }

  function updateIcon() {
    if (themeIcon) {
      themeIcon.textContent = getTheme() === "dark" ? "☀️" : "🌑";
    }
  }

  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.dataset.theme = "dark";
      localStorage.setItem("ctt-theme", "dark");
    } else {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("ctt-theme", "light");
    }

    updateIcon();
  }

  // Load saved theme
  const saved = localStorage.getItem("ctt-theme");
  setTheme(saved === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(getTheme() === "dark" ? "light" : "dark");
    });
  }

  // Last updated
  const lastUpdated = document.getElementById("lastUpdated");

  if (lastUpdated) {
    lastUpdated.textContent = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  // Render content
  renderEvents();
  renderTeam();

  console.log("CTT Youth Media: Website functionality initialized successfully.");
});
