// Theme Switcher with icon change + saving theme
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");

// ===== INITIAL LOAD =====
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀️"; // Light icon when dark mode is active
} else {
    document.body.classList.remove("dark-mode");
    themeIcon.textContent = "🌙"; // Dark icon when light mode is active
}

// ===== ON CLICK =====
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeIcon.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});
