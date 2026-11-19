document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.getElementById("todayDate");

    if (dateElement) {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("ar-EG", {
            weekday: "long",
            month: "short",
            day: "numeric"
        });

        dateElement.textContent = formatter.format(now);
    }

    document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelectorAll(".nav-item").forEach((link) => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    const slides = Array.from(document.querySelectorAll(".slide"));
    const dots = Array.from(document.querySelectorAll(".slider-dot"));
    const previousButton = document.querySelector(".slider-arrow.prev");
    const nextButton = document.querySelector(".slider-arrow.next");
    const slider = document.querySelector(".header-slider");
    let currentSlide = 0;
    let sliderTimer;

    function showSlide(index) {
        if (!slides.length) return;

        currentSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("active", slideIndex === currentSlide);
        });
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === currentSlide);
        });
    }

    function restartSlider() {
        window.clearInterval(sliderTimer);
        sliderTimer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    if (slides.length) {
        let touchStartX = 0;

        previousButton.addEventListener("click", () => {
            showSlide(currentSlide - 1);
            restartSlider();
        });

        nextButton.addEventListener("click", () => {
            showSlide(currentSlide + 1);
            restartSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showSlide(index);
                restartSlider();
            });
        });

        slider.addEventListener("mouseenter", () => window.clearInterval(sliderTimer));
        slider.addEventListener("mouseleave", restartSlider);
        slider.addEventListener("touchstart", (event) => {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });
        slider.addEventListener("touchend", (event) => {
            const touchEndX = event.changedTouches[0].clientX;
            const distance = touchEndX - touchStartX;

            if (Math.abs(distance) > 45) {
                showSlide(currentSlide + (distance < 0 ? 1 : -1));
                restartSlider();
            }
        }, { passive: true });
        restartSlider();
    }

    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    sidebarToggle?.addEventListener("click", () => sidebar.classList.toggle("collapsed"));

    const searchToggle = document.querySelector(".search-toggle");
    const searchClose = document.querySelector(".search-close");
    const commandSearch = document.querySelector(".command-search");
    const searchInput = document.getElementById("dashboardSearch");

    function setSearch(open) {
        commandSearch.classList.toggle("open", open);
        commandSearch.setAttribute("aria-hidden", String(!open));
        if (open) window.setTimeout(() => searchInput.focus(), 180);
    }

    searchToggle?.addEventListener("click", () => setSearch(!commandSearch.classList.contains("open")));
    searchClose?.addEventListener("click", () => setSearch(false));

    searchInput?.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        document.querySelectorAll(".course-item, .activity-list li, .stat-card").forEach((item) => {
            item.style.opacity = !query || item.textContent.toLowerCase().includes(query) ? "1" : ".22";
        });
    });

    const courseModal = document.getElementById("courseModal");
    const addCourseButton = document.getElementById("addCourseBtn");
    const closeModalButton = courseModal?.querySelector(".modal-close");
    const modalBackdrop = courseModal?.querySelector(".modal-backdrop");
    const courseForm = document.getElementById("courseForm");
    const toast = document.querySelector(".toast");

    function setModal(open) {
        courseModal.classList.toggle("open", open);
        courseModal.setAttribute("aria-hidden", String(!open));
        if (open) window.setTimeout(() => courseForm.elements.courseName.focus(), 180);
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2600);
    }

    addCourseButton?.addEventListener("click", () => setModal(true));
    closeModalButton?.addEventListener("click", () => setModal(false));
    modalBackdrop?.addEventListener("click", () => setModal(false));

    courseForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(courseForm);
        const courseName = data.get("courseName");
        const studentCount = data.get("studentCount");
        const courseList = document.querySelector(".course-list");
        const item = document.createElement("div");
        item.className = "course-item";
        item.innerHTML = `
            <div class="course-main">
                <span class="course-dot blue"></span>
                <div><strong></strong><small></small></div>
            </div>
            <span class="pill info">جديد</span>`;
        item.querySelector("strong").textContent = courseName;
        item.querySelector("small").textContent = `${studentCount} طالباً`;
        courseList.prepend(item);
        courseForm.reset();
        setModal(false);
        showToast("تمت إضافة الدورة بنجاح");
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setModal(false);
            setSearch(false);
        }
    });
});
