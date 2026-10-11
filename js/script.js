const cars = [
  {
    id: 1,
    name: "Urban Comfort",
    type: "comfort",
    price: 2000,
    image: "images/car1.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    description: "A comfortable everyday car for city drives, airport runs, and relaxed weekend plans.",
    tag: "Popular"
  },
  {
    id: 2,
    name: "City Explorer",
    type: "city",
    price: 1800,
    image: "images/car2.jpg",
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    description: "Compact and easy to handle, a practical choice for busy streets and short trips.",
    tag: "City"
  },
  {
    id: 3,
    name: "Weekend Cruiser",
    type: "suv",
    price: 2800,
    image: "images/car3.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    description: "Extra room and comfort for longer drives and weekends away.",
    tag: "Adventure"
  },
  {
    id: 4,
    name: "Family Traveller",
    type: "suv",
    price: 3200,
    image: "images/car4.jpg",
    seats: 7,
    transmission: "Manual",
    fuel: "Diesel",
    description: "A spacious option for family plans, luggage, and group journeys.",
    tag: "Spacious"
  },
  {
    id: 5,
    name: "Premium Drive",
    type: "premium",
    price: 4500,
    image: "images/car5.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    description: "A refined ride for special occasions and trips when comfort comes first.",
    tag: "Premium"
  },
  {
    id: 6,
    name: "Road Trip Plus",
    type: "comfort",
    price: 2500,
    image: "images/car6.jpg",
    seats: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    description: "A versatile companion for day trips and longer routes.",
    tag: "Comfort"
  }
];

const money = amount =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

const byId = id => document.getElementById(id);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

// Automatically update the footer year.
document.querySelectorAll("[data-year]").forEach(element => {
  element.textContent = new Date().getFullYear();
});

// Mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Reusable car card.
function createCarCard(car) {
  return `
    <article class="car-card">
      <a href="details.html?car=${car.id}">
        <img src="${car.image}" alt="${escapeHTML(car.name)}" loading="lazy">
      </a>

      <div class="car-info">
        <div class="car-title">
          <h3>${escapeHTML(car.name)}</h3>
          <span class="pill">${escapeHTML(car.tag)}</span>
        </div>

        <p class="muted">${escapeHTML(car.description)}</p>

        <div class="specs">
          <span>${car.seats} seats</span>
          <span>${escapeHTML(car.transmission)}</span>
          <span>${escapeHTML(car.fuel)}</span>
        </div>

        <div class="car-bottom">
          <p><strong>${money(car.price)}</strong><small>/ day</small></p>
          <a class="btn outline" href="details.html?car=${car.id}">
            View details
          </a>
        </div>
      </div>
    </article>
  `;
}

// Car listing page: search, filter and sort.
const allCarsContainer = byId("allCars");

if (allCarsContainer) {
  const searchInput = byId("carSearch");
  const categoryFilter = byId("categoryFilter");
  const sortSelect = byId("sortCars");

  function renderCars() {
    const keyword = searchInput.value.trim().toLowerCase();

    let filteredCars = cars.filter(car => {
      const matchesCategory =
        categoryFilter.value === "all" ||
        car.type === categoryFilter.value;

      const searchableText =
        `${car.name} ${car.type} ${car.description}`.toLowerCase();

      return matchesCategory && searchableText.includes(keyword);
    });

    if (sortSelect.value === "low") {
      filteredCars.sort((a, b) => a.price - b.price);
    }

    if (sortSelect.value === "high") {
      filteredCars.sort((a, b) => b.price - a.price);
    }

    allCarsContainer.innerHTML = filteredCars
      .map(createCarCard)
      .join("");

    byId("carCount").textContent =
      `${filteredCars.length} vehicle${filteredCars.length === 1 ? "" : "s"} found`;

    byId("noCars").hidden = filteredCars.length > 0;
  }

  [searchInput, categoryFilter, sortSelect].forEach(element => {
    element.addEventListener("input", renderCars);
  });

  renderCars();
}

// Homepage quick search.
const quickSearch = byId("quickSearch");

if (quickSearch) {
  quickSearch.addEventListener("submit", event => {
    event.preventDefault();

    const pickup = byId("homePickup").value;
    const returnDate = byId("homeReturn").value;

    if (returnDate < pickup) {
      alert("Return date must be on or after pickup date.");
      return;
    }

    sessionStorage.setItem("driveEaseSearch", JSON.stringify({
      location: byId("homeLocation").value,
      pickup,
      returnDate
    }));

    window.location.href = "cars.html";
  });
}

// Get the selected vehicle from the URL.
function getSelectedCar() {
  const carId = Number(
    new URLSearchParams(window.location.search).get("car") || 1
  );

  return cars.find(car => car.id === carId) || cars[0];
}

// Individual car details page.
const detailContainer = byId("carDetail");

if (detailContainer) {
  const car = getSelectedCar();

  document.title = `${car.name} | DriveEase`;

  detailContainer.innerHTML = `
    <p class="eyebrow">VEHICLE DETAILS</p>

    <div class="detail-layout">
      <div>
        <img class="detail-image"
             src="${car.image}"
             alt="${escapeHTML(car.name)}">

        <div class="detail-list">
          <span>${car.seats} seats</span>
          <span>${escapeHTML(car.transmission)}</span>
          <span>${escapeHTML(car.fuel)}</span>
          <span>${escapeHTML(car.tag)}</span>
        </div>

        <h2>About this car</h2>
        <p class="muted">
          ${escapeHTML(car.description)}
          Select dates on the booking page to calculate an estimate.
        </p>
      </div>

      <aside class="detail-panel">
        <p class="eyebrow">YOUR NEXT RIDE</p>
        <h1>${escapeHTML(car.name)}</h1>
        <p class="detail-price">${money(car.price)} <small>/ day</small></p>
        <p class="muted">
          A simple, transparent estimate to help plan your trip.
        </p>

        <a class="btn dark full" href="booking.html?car=${car.id}">
          Book this car ↗
        </a>

        <p class="fine-print">
          Demo booking only. Availability is not checked with a provider.
        </p>
      </aside>
    </div>
  `;
}

// Booking page.
const bookingForm = byId("bookingForm");

if (bookingForm) {
  const carSelect = byId("bookingCar");

  carSelect.innerHTML = cars.map(car => `
    <option value="${car.id}">
      ${escapeHTML(car.name)} — ${money(car.price)}/day
    </option>
  `).join("");

  const params = new URLSearchParams(window.location.search);
  const requestedCar = Number(params.get("car"));

  if (cars.some(car => car.id === requestedCar)) {
    carSelect.value = String(requestedCar);
  }

  // Restore dates and location from homepage quick search.
  const savedSearch = JSON.parse(
    sessionStorage.getItem("driveEaseSearch") || "null"
  );

  if (savedSearch) {
    byId("pickupLocation").value = savedSearch.location || "";
    byId("pickupDate").value = savedSearch.pickup || "";
    byId("returnDate").value = savedSearch.returnDate || "";
  }

  // Prevent selecting dates in the past.
  const todayDate = new Date();
  todayDate.setMinutes(
    todayDate.getMinutes() - todayDate.getTimezoneOffset()
  );

  const today = todayDate.toISOString().slice(0, 10);

  byId("pickupDate").min = today;
  byId("returnDate").min = today;

  function updateBookingSummary() {
    const car = cars.find(item =>
      item.id === Number(carSelect.value)
    ) || cars[0];

    const pickup = byId("pickupDate").value;
    const returnDate = byId("returnDate").value;

    byId("summaryCar").textContent = car.name;
    byId("summaryRate").textContent = money(car.price);

    if (!pickup || !returnDate || returnDate < pickup) {
      byId("summaryDates").textContent =
        "Choose valid pickup and return dates.";
      byId("summaryDays").textContent = "—";
      byId("summaryTotal").textContent = "—";
      return;
    }

    // Same-day rentals are counted as one day.
    const difference = Math.ceil(
      (new Date(returnDate + "T00:00:00") -
       new Date(pickup + "T00:00:00")) / 86400000
    );

    const days = Math.max(1, difference);

    byId("summaryDates").textContent =
      `${pickup} → ${returnDate}`;

    byId("summaryDays").textContent =
      `${days} day${days === 1 ? "" : "s"}`;

    byId("summaryTotal").textContent = money(days * car.price);
  }

  [carSelect, byId("pickupDate"), byId("returnDate")].forEach(element => {
    element.addEventListener("change", () => {
      if (element.id === "pickupDate") {
        byId("returnDate").min = element.value || today;
      }

      updateBookingSummary();
    });
  });

  updateBookingSummary();

  bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    const pickup = byId("pickupDate").value;
    const returnDate = byId("returnDate").value;
    const message = byId("bookingMessage");

    if (pickup < today) {
      message.textContent = "Pickup date cannot be in the past.";
      return;
    }

    if (returnDate < pickup) {
      message.textContent =
        "Return date must be on or after pickup date.";
      return;
    }

    const car = cars.find(item =>
      item.id === Number(carSelect.value)
    );

    const days = Math.max(1, Math.ceil(
      (new Date(returnDate + "T00:00:00") -
       new Date(pickup + "T00:00:00")) / 86400000
    ));

    const booking = {
      reference: "DE" + Date.now().toString().slice(-7),
      car: car.name,
      pickup,
      returnDate,
      location: byId("pickupLocation").value,
      name: byId("customerName").value,
      email: byId("customerEmail").value,
      notes: byId("bookingNotes").value,
      days,
      total: days * car.price,
      createdAt: new Date().toISOString()
    };

    // Store the demo request in this browser only.
    const savedBookings = JSON.parse(
      localStorage.getItem("driveEaseBookings") || "[]"
    );

    savedBookings.push(booking);

    localStorage.setItem(
      "driveEaseBookings",
      JSON.stringify(savedBookings)
    );

    message.textContent =
      `Request saved in this browser. Reference: ${booking.reference}. ` +
      "This is not a confirmed reservation.";

    bookingForm.reset();
    carSelect.value = String(car.id);
    updateBookingSummary();
  });
}

// Contact form: prepares an email in the user's email application.
const contactForm = byId("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const subject = encodeURIComponent("DriveEase website enquiry");

    const body = encodeURIComponent(
      `Name: ${byId("contactName").value}\n` +
      `Email: ${byId("contactEmail").value}\n\n` +
      `${byId("contactMessage").value}`
    );

    byId("contactStatus").textContent =
      "Opening your email application to prepare the message.";

    window.location.href =
      `mailto:?subject=${subject}&body=${body}`;
  });
}