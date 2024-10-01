// Tab functionality
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.querySelectorAll(".tabcontent");
    tabcontent.forEach(content => content.style.display = "none");

    // Remove active class from all buttons
    tablinks = document.querySelectorAll(".tablinks");
    tablinks.forEach(link => link.classList.remove("active"));

    // Show the current tab and add an "active" class to the clicked button
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");

    // If the Achievements tab is opened, trigger the counter animation
    if (tabName === "Achievements") {
        startCounters();
    }
}

// Function to start the counters when the "Achievements" tab is opened
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Speed of the counter animation

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20); // Repeat every 20ms
            } else {
                counter.innerText = target;
            }
        };

        // Reset counters to 0 before starting them
        counter.innerText = '0';
        updateCount();
    });
}

// Initialize first tab as active on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tablinks.active').click();
});
