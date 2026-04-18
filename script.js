//Dashboard

function updateVitals() {

  let hr = Math.floor(Math.random() * (100 - 60) + 60);
  let sys = Math.floor(Math.random() * (130 - 110) + 110);
  let dia = Math.floor(Math.random() * (85 - 70) + 70);
  let glucose = Math.floor(Math.random() * (140 - 70) + 70);
  let blood = (Math.random() * (11 - 4) + 4).toFixed(1);

  document.getElementById("heartRate").innerText = hr + " bpm";
  document.getElementById("bp").innerText = sys + "/" + dia;
  document.getElementById("glucose").innerText = glucose + " mg/dL";
  document.getElementById("blood").innerText = blood + " K/µL";
}
setInterval(updateVitals, 3000);


const tips = [
  "Drink at least 2L of water daily💦",
  "Exercise 30 minutes every day💪🏻🏋🏻",
  "Maintain a balanced diet🥗",
  "Sleep 7-8 hours regularly😴",
  "Avoid too much sugar intake🍬",
  "Check blood pressure regularly🩺",
  "Practice meditation or yoga🧘",
  "Limit salt in food🧂",
  "Stay physically active🏃🏻",
  "Take regular health checkups❤️"
];

document.getElementById("tipBtn").addEventListener("click", () => {
  let random = Math.floor(Math.random() * tips.length);
  document.getElementById("tipText").innerText = tips[random];
});


const canvas = document.getElementById("heartChart");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = 220;

const padding = 40;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let points = [72, 75, 70, 78, 74, 80, 76];

function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const width = canvas.width - padding * 2;
  const height = canvas.height - padding * 2;

  ctx.strokeStyle = "#ccc";
  ctx.fillStyle = "black";
  ctx.font = "15px Arial";

  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  
  for (let i = 60; i <= 100; i += 10) {
    let y = canvas.height - padding - ((i - 60) / 40) * height;
    ctx.fillText(i, 5, y);
  }

  
  days.forEach((day, i) => {
    let x = padding + i * (width / (days.length - 1));
    ctx.fillText(day, x - 10, canvas.height - 10);
  });

  ctx.fillStyle = "black";
  ctx.font = "14px Georgia";
  ctx.fillText("Heart Rate Performance", padding, 20);
  ctx.fillText("bpm", canvas.width - 40, 20);

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  let step = width / (points.length - 1);

  points.forEach((point, i) => {
    let x = padding + i * step;
    let y = canvas.height - padding - ((point - 60) / 40) * height;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  points.forEach((point, i) => {
    let x = padding + i * step;
    let y = canvas.height - padding - ((point - 60) / 40) * height;

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  });
}


function updateGraph() {
  let newValue = Math.floor(Math.random() * 40 + 60);

  points.shift();
  points.push(newValue);

  drawGraph();
}
drawGraph();
setInterval(updateGraph, 1400);


document.addEventListener("DOMContentLoaded", function () {

  const healthAds = [
    {
      title: "Full Body Checkup",
      desc: "Get 20% off on your first comprehensive diagnostic test this month.",
      btnText: "Book Now"
    },
    {
      title: "Premium Health Plan",
      desc: "Unlimited doctor consultations and free home sample collection.",
      btnText: "Upgrade"
    },

  ];

  let currentAdIndex = 0;

  const titleElem = document.getElementById('ad-title');
  const descElem = document.getElementById('ad-description');
  const btnElem = document.querySelector('.ad-btn');

  function rotateAds() {
    if (titleElem && descElem && btnElem) {
      currentAdIndex = (currentAdIndex + 1) % healthAds.length;

      titleElem.style.opacity = 0;
      descElem.style.opacity = 0;

      setTimeout(() => {
        titleElem.innerText = healthAds[currentAdIndex].title;
        descElem.innerText = healthAds[currentAdIndex].desc;
        btnElem.innerText = healthAds[currentAdIndex].btnText;

        titleElem.style.opacity = 1;
        descElem.style.opacity = 1;
      }, 300);
    }
  }
  setInterval(rotateAds, 3000);

  window.handleAdClick = function () {
    const currentTitle = healthAds[currentAdIndex].title;
    alert(" Confirm to " + currentTitle);
  };

}); 

//appointment form

document.addEventListener('DOMContentLoaded', () => {
  const specialitySelect = document.getElementById('speciality');
  const doctorSelect = document.getElementById('doctor');
  const dateInput = document.getElementById('date');
  const slotsHint = document.querySelector('.slot-hint');
  const slotsContainer = document.getElementById('slots-container');
  const appointmentForm = document.getElementById('appointmentForm');


  dateInput.addEventListener('change', (e) => {
    if (e.target.value) {
      slotsHint.style.display = 'none';
      // Simulate loading slots
      slotsContainer.innerHTML = `
                <div class="slot-buttons" style="display: flex; gap: 10px; margin-top: 10px;">
                    <button type="button" class="slot-btn">10:00 AM</button>
                    <button type="button" class="slot-btn">11:30 AM</button>
                    <button type="button" class="slot-btn">02:00 PM</button>
                </div>
        `;
      const btns = document.querySelectorAll('.slot-btn');
      btns.forEach(btn => {
        btn.style.padding = '8px 15px';
        btn.style.border = '1px solid #2c4a9e';
        btn.style.borderRadius = '5px';
        btn.style.background = 'none';
        btn.style.cursor = 'pointer';
        btn.onclick = () => {
          btns.forEach(b => b.style.background = 'none');
          btn.style.background = '#eef2ff';
        };
      });
    }
  });

  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(appointmentForm);
    const data = Object.fromEntries(formData.entries());

    console.log("Form Submitted Successfully:", data);
    alert("Your request has been submitted successfully");

  });
});


function openModal(service) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("serviceName").innerText = service;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function confirmBooking() {
  alert("Appointment Confirmed!");
  closeModal();
}

function searchService() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? "block" : "none";
  });
}

window.onclick = function (e) {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

//Mobile responsive

const menuIcon = document.querySelector(".navbar_s4");
const navLinks = document.querySelector(".navbar_s2");

menuIcon.addEventListener("click", () =>{
  navLinks.classList.toggle("active");
})


//speciality page
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".doctor-card");

searchInput.addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  cards.forEach(card => {
    let text = card.innerText.toLowerCase();

    if (text.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});


function openModal() {
  alert("Your appointment was confirmed!");
}

function openModal() {
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function submitForm() {
  alert("Your appointment was confirmed!");
  closeModal();
}

