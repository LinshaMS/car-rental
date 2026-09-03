const cars = [
    {
        id: 1,
        name: "BMW 3 Series",
        category: "Luxury",
        transmission: "Automatic",
        seats: 5,
        price: 4500,
        image: "images/car1.jpg"
    },
    {
        id: 2,
        name: "Mercedes Benz C-Class",
        category: "Luxury",
        transmission: "Automatic",
        seats: 5,
        price: 5500,
        image: "images/car2.jpg"
    },
    {
        id: 3,
        name: "Toyota Fortuner",
        category: "SUV",
        transmission: "Automatic",
        seats: 7,
        price: 4000,
        image: "images/car3.jpg"
    },
    {
        id: 4,
        name: "Honda City",
        category: "Sedan",
        transmission: "Manual",
        seats: 5,
        price: 2500,
        image: "images/car4.jpg"
    },
    {
        id: 5,
        name: "Hyundai Creta",
        category: "SUV",
        transmission: "Automatic",
        seats: 5,
        price: 3000,
        image: "images/car5.jpg"
    },
    {
        id: 6,
        name: "Audi A4",
        category: "Luxury",
        transmission: "Automatic",
        seats: 5,
        price: 6000,
        image: "images/car6.jpg"
    }
];

const carsContainer = document.getElementById("carsContainer");

function displayCars(carList) {

    if (!carsContainer) {
        return;
    }

    carsContainer.innerHTML = "";

    carList.forEach(function (car) {

        const carCard = document.createElement("div");

        carCard.classList.add("car-card");

        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}">

            <div class="car-info">
                <h3>${car.name}</h3>

                <p>
                    ${car.category} •
                    ${car.transmission} •
                    ${car.seats} Seats
                </p>

                <h4>₹${car.price} / Day</h4>

                <a href="details.html?id=${car.id}" class="car-btn">
                    View Details
                </a>
            </div>
        `;

        carsContainer.appendChild(carCard);
    });
}

displayCars(cars);

const carSearch = document.getElementById("carSearch");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");

function updateCars() {
    let filteredCars = [...cars];

    // Search by car name
    if (carSearch) {
        const searchText = carSearch.value.toLowerCase();

        filteredCars = filteredCars.filter(function (car) {
            return car.name.toLowerCase().includes(searchText);
        });
    }

    // Filter by category
    if (categoryFilter && categoryFilter.value !== "all") {
        filteredCars = filteredCars.filter(function (car) {
            return car.category === categoryFilter.value;
        });
    }

    // Sort by price
    if (priceSort) {

        if (priceSort.value === "low-high") {
            filteredCars.sort(function (a, b) {
                return a.price - b.price;
            });
        }

        if (priceSort.value === "high-low") {
            filteredCars.sort(function (a, b) {
                return b.price - a.price;
            });
        }
    }

    displayCars(filteredCars);
}
if (carSearch) {
    carSearch.addEventListener("input", updateCars);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", updateCars);
}

if (priceSort) {
    priceSort.addEventListener("change", updateCars);
}


const carDetails = document.getElementById("carDetails");

if (carDetails) {

    const urlParams = new URLSearchParams(window.location.search);
    const carId = Number(urlParams.get("id"));

    const selectedCar = cars.find(function (car) {
        return car.id === carId;
    });

    if (selectedCar) {

        carDetails.innerHTML = `
            <img src="${selectedCar.image}" alt="${selectedCar.name}">

            <div class="details-info">
                <h1>${selectedCar.name}</h1>

                <p><strong>Category:</strong> ${selectedCar.category}</p>
                <p><strong>Transmission:</strong> ${selectedCar.transmission}</p>
                <p><strong>Seats:</strong> ${selectedCar.seats}</p>

                <p class="details-price">
                    ₹${selectedCar.price} / Day
                </p>

                <a href="booking.html?id=${selectedCar.id}" class="book-btn">
                    Book This Car
                </a>
            </div>
        `;

    } else {

        carDetails.innerHTML = `
            <div class="details-info">
                <h1>Car Not Found</h1>
                <p>Sorry, the selected car could not be found.</p>
                <a href="cars.html" class="book-btn">
                    Back to Cars
                </a>
            </div>
        `;
    }
}




const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const car = document.getElementById("carSelect").value;
        const pickupDate = document.getElementById("bookingPickupDate").value;
        const returnDate = document.getElementById("bookingReturnDate").value;

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const phoneError = document.getElementById("phoneError");
        const carError = document.getElementById("carError");
        const pickupError = document.getElementById("pickupError");
        const returnError = document.getElementById("returnError");
        const bookingMessage = document.getElementById("bookingMessage");

        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        carError.textContent = "";
        pickupError.textContent = "";
        returnError.textContent = "";
        bookingMessage.textContent = "";

        let isValid = true;

        // Name validation
        if (fullName === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email.";
            isValid = false;
        }

        // Phone validation
        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {
            phoneError.textContent = "Phone number must contain 10 digits.";
            isValid = false;
        }

        // Car validation
        if (car === "") {
            carError.textContent = "Please select a car.";
            isValid = false;
        }

        // Date validation
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedPickupDate = new Date(pickupDate);
        const selectedReturnDate = new Date(returnDate);

        if (pickupDate === "") {
            pickupError.textContent = "Please select a pickup date.";
            isValid = false;
        } else if (selectedPickupDate < today) {
            pickupError.textContent = "Pickup date must be in the future.";
            isValid = false;
        }

        if (returnDate === "") {
            returnError.textContent = "Please select a return date.";
            isValid = false;
        } else if (
            pickupDate !== "" &&
            selectedReturnDate <= selectedPickupDate
        ) {
            returnError.textContent =
                "Return date must be after pickup date.";
            isValid = false;
        }

        if (isValid) {
            bookingMessage.textContent =
                "Booking successful! Your car has been reserved.";

            bookingForm.reset();
        }
    });
}



const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const contactName = document.getElementById("contactName").value.trim();
        const contactEmail = document.getElementById("contactEmail").value.trim();
        const contactMessage = document.getElementById("contactMessage").value.trim();
        const status = document.getElementById("contactMessageStatus");

        if (contactName === "") {
            status.textContent = "Please enter your name.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(contactEmail)) {
            status.textContent = "Please enter a valid email.";
            return;
        }

        if (contactMessage === "") {
            status.textContent = "Please enter your message.";
            return;
        }

        status.textContent = "Thank you! Your message has been sent.";

        contactForm.reset();
    });
}

const darkModeBtn = document.getElementById("darkModeBtn");

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            darkModeBtn.textContent = "☀️";
        } else {
            darkModeBtn.textContent = "🌙";
        }

    });

}

const hero = document.querySelector(".hero");
const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

const heroSlides = [
    {
        image: "images/car-hero.jpg",
        title: "Rent Your Dream Car",
        text: "Choose from a wide range of cars and enjoy a smooth, comfortable journey."
    },
    {
        image: "images/car2.jpg",
        title: "Luxury For Every Journey",
        text: "Travel in comfort and style with our premium collection of cars."
    },
    {
        image: "images/car3.jpg",
        title: "Adventure Starts Here",
        text: "Choose an SUV and make your next journey unforgettable."
    }
];

let currentSlide = 0;

function showSlide(index) {

    if (!hero || !heroTitle || !heroText) {
        return;
    }

    currentSlide = index;

    hero.style.backgroundImage =
        `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), 
         url("${heroSlides[currentSlide].image}")`;

    heroTitle.textContent = heroSlides[currentSlide].title;

    heroText.textContent = heroSlides[currentSlide].text;
}

if (nextSlide) {
    nextSlide.addEventListener("click", function () {

        currentSlide++;

        if (currentSlide >= heroSlides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    });
}

if (prevSlide) {
    prevSlide.addEventListener("click", function () {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = heroSlides.length - 1;
        }

        showSlide(currentSlide);
    });
}

if (hero) {
    showSlide(0);
}

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const answer = question.nextElementSibling;
        const icon = question.querySelector("span");

        if (answer.style.display === "block") {

            answer.style.display = "none";
            icon.textContent = "+";

        } else {

            answer.style.display = "block";
            icon.textContent = "−";

        }

    });

});




const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}