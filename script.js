u/*
==================================================
CTT YOUTH MEDIA
==================================================

NO DATABASE
NO SUPABASE
NO BACKEND

Everything below runs directly in the browser.

To update events:
Edit the "events" section.

To update media team:
Edit the "mediaTeam" section.
==================================================
*/


/* =========================================
   UPCOMING EVENTS

   ADD YOUR EVENTS HERE
========================================= */

const events = [

  {
  title: "Youth Event",
  date: "COMING SOON",
  description: "Replace this with your upcoming event details.",
  image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
}


  {
    title: "Youth Gathering",

    date: "DATE TO BE ADDED",

    description:
      "Add your event information here.",

      "image: "https://i.ibb.co/8ntTW2Wm/photo-1522158637959-30385a09e0da.jpg"}

];



/* =========================================
   MEDIA TEAM SERVING THIS SUNDAY
========================================= */

const mediaTeam = [

  {
    name: "Media Person 1",
    role: "Camera"
  },

  {
    name: "Media Person 2",
    role: "Live / Screens"
  },

  {
    name: "Media Person 3",
    role: "Photography"
  },

  {
    name: "Media Person 4",
    role: "Social Media"
  }

];



/* =========================================
   DISPLAY EVENTS
========================================= */

const eventsGrid =
  document.getElementById("eventsGrid");


function renderEvents() {

  eventsGrid.innerHTML =
    events.map(event => `

      <article class="event-card">

        <img
          src="${event.image}"
          alt="${event.title}"
          loading="lazy">

        <div class="event-body">

          <div class="event-date">
            ${event.date}
          </div>

          <h3>
            ${event.title}
          </h3>

          <p>
            ${event.description}
          </p>

        </div>

      </article>

    `).join("");

}



/* =========================================
   DISPLAY MEDIA TEAM
========================================= */

const teamGrid =
  document.getElementById("teamGrid");


function initials(name) {

  return name
    .split(/\s+/)
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

}


function renderTeam() {

  teamGrid.innerHTML =
    mediaTeam.map(person => `

      <article class="team-card">

        <div class="team-avatar">

          ${initials(person.name)}

        </div>

        <h3>
          ${person.name}
        </h3>

        <p>
          ${person.role}
        </p>

      </article>

    `).join("");

}



/* =========================================
   CTT BOT ANSWERS
========================================= */

const answers = [

  {

    keys: [
      "service timing",
      "service times",
      "timing",
      "timings",
      "time"
    ],

    answer:
      "The 1st Service is from 8:30am to 10:30am. The 2nd Service is from 11:30am to 1:30pm."

  },


  {

    keys: [
      "first service",
      "1st service"
    ],

    answer:
      "The first service is the Teens Service, from 8:30am to 10:30am."

  },


  {

    keys: [
      "second service",
      "2nd service"
    ],

    answer:
      "The second service is the Youth Service, from 11:30am to 1:30pm."

  },


  {

    keys: [
      "upcoming event",
      "upcoming events",
      "events"
    ],

    answer:
      "Kindly scroll through to the Upcoming Events section and you'll check them there."

  }

];



/* =========================================
   FIND BOT ANSWER
========================================= */

function botAnswer(question) {

  const q =
    question
      .toLowerCase()
      .trim();


  const match =
    answers.find(item =>

      item.keys.some(key =>
        q.includes(key)
      )

    );


  if (match) {

    return match.answer;

  }


  return `
    I can help with service timings,
    the first service, the second service,
    and upcoming events.
    Try asking me one of those.
  `;

}



/* =========================================
   CHAT
========================================= */

const chatMessages =
  document.getElementById("chatMessages");


const chatForm =
  document.getElementById("chatForm");


const chatInput =
  document.getElementById("chatInput");



function addMessage(text, type) {

  const div =
    document.createElement("div");


  div.className =
    `message ${type}`;


  div.innerHTML = `

    <b>
      ${type === "bot" ? "CTT Bot" : "You"}
    </b>

    <span></span>

  `;


  div.querySelector("span")
    .textContent = text;


  chatMessages.appendChild(div);


  chatMessages.scrollTop =
    chatMessages.scrollHeight;

}



function ask(question) {

  addMessage(
    question,
    "user"
  );


  setTimeout(() => {

    addMessage(
      botAnswer(question),
      "bot"
    );

  }, 250);

}



/* =========================================
   CHAT FORM
========================================= */

chatForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const question =
      chatInput.value.trim();


    if (!question) return;


    ask(question);


    chatInput.value = "";

  }
);



/* =========================================
   QUICK QUESTIONS
========================================= */

document
  .querySelectorAll(
    ".quick-questions button"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        ask(
          button.dataset.question
        );

      }
    );

  });



/* =========================================
   DARK / LIGHT THEME
========================================= */

const themeToggle =
  document.getElementById(
    "themeToggle"
  );


const savedTheme =
  localStorage.getItem(
    "ctt-theme"
  );


if (savedTheme === "dark") {

  document.documentElement
    .dataset.theme = "dark";

}



/* Update theme icon */

function updateThemeIcon() {

  themeToggle.textContent =
    document.documentElement
      .dataset.theme === "dark"

      ? "☀️"

      : "🌑";

}


updateThemeIcon();



/* Theme button */

themeToggle.addEventListener(
  "click",
  function() {

    const isDark =
      document.documentElement
        .dataset.theme === "dark";


    if (isDark) {

      delete document.documentElement
        .dataset.theme;

      localStorage.setItem(
        "ctt-theme",
        "light"
      );

    }

    else {

      document.documentElement
        .dataset.theme = "dark";

      localStorage.setItem(
        "ctt-theme",
        "dark"
      );

    }


    updateThemeIcon();

  }
);



/* =========================================
   START WEBSITE
========================================= */

renderEvents();

renderTeam();