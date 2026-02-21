// --- DOM Elements ---
const authScreen = document.getElementById('auth-screen');
const appContainer = document.getElementById('app-container');
const loginBox = document.getElementById('login-box');
const registerBox = document.getElementById('register-box');
const forgotBox = document.getElementById('forgot-box');
// --- 1. Authentication System (Local Storage) ---
document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    loadTheme();
    initDropdowns();
    initMusicPlayer();
});

function checkAuth() {
    const currentUser = localStorage.getItem('everlynx_activeUser');
    if (currentUser) {
        // User is logged in, hide auth, show app
        authScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
        document.getElementById('nav-username').innerText = currentUser;
        
        // INITIALIZE SCROLL REVEAL HERE:
        initScrollReveal(); 

    } else {
        // Show auth, hide app
        authScreen.classList.remove('hidden');
        appContainer.classList.add('hidden');
    }
}


function toggleAuth(type) {
    // Hide everything first
    loginBox.classList.add('hidden');
    registerBox.classList.add('hidden');
    forgotBox.classList.add('hidden');

    // Show the requested box
    if (type === 'register') {
        registerBox.classList.remove('hidden');
    } else if (type === 'forgot') {
        forgotBox.classList.remove('hidden');
    } else {
        loginBox.classList.remove('hidden');
    }
}

// Handle Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('login-username').value.trim();
    const pass = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('everlynx_users')) || {};

    if (users[user] && users[user].password === pass) {
        localStorage.setItem('everlynx_activeUser', user);
        checkAuth(); // Switch view
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

// Handle Register
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-password').value;
    const users = JSON.parse(localStorage.getItem('everlynx_users')) || {};

    if (users[user]) {
        document.getElementById('reg-error').classList.remove('hidden');
    } else {
        users[user] = { 
            password: pass, 
            email: email, 
            avatar: `https://ui-avatars.com/api/?name=${user}&background=random` 
        };
        localStorage.setItem('everlynx_users', JSON.stringify(users));
        localStorage.setItem('everlynx_activeUser', user);
        checkAuth(); // Switch view
    }
});

function logout() {
    localStorage.removeItem('everlynx_activeUser');
    // Pause music on logout
    document.getElementById('bg-music').pause();
    checkAuth(); // Switch view back to auth
}
// Handle Forgot Password
document.getElementById('forgot-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('forgot-username').value.trim();
    const email = document.getElementById('forgot-email').value.trim();
    const newPass = document.getElementById('forgot-new-password').value;
    const users = JSON.parse(localStorage.getItem('everlynx_users')) || {};

    const errorMsg = document.getElementById('forgot-error');
    const successMsg = document.getElementById('forgot-success');

    // Reset messages
    errorMsg.classList.add('hidden');
    successMsg.classList.add('hidden');

    // Verify if the user exists AND the email matches
    if (users[user] && users[user].email === email) {
        // Update the password in local storage
        users[user].password = newPass;
        localStorage.setItem('everlynx_users', JSON.stringify(users));
        
        // Show success message, wait 2 seconds, then send back to login
        successMsg.classList.remove('hidden');
        setTimeout(() => {
            toggleAuth('login');
            successMsg.classList.add('hidden');
            document.getElementById('forgot-form').reset();
        }, 2000);
    } else {
        // Show error if username or email is wrong
        errorMsg.classList.remove('hidden');
    }
});
// --- 2. Top Controls & Dropdowns ---
function initDropdowns() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeDrop = document.getElementById('themeDropdown');
    const musicBtn = document.getElementById('musicToggleBtn');
    const musicDrop = document.getElementById('musicDropdown');
    const userBtn = document.getElementById('userToggleBtn');
    const userDrop = document.getElementById('userDropdown');

    function closeAll() {
        themeDrop.classList.remove('show');
        musicDrop.classList.remove('show');
        userDrop.classList.remove('show');
    }

    themeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeAll(); themeDrop.classList.toggle('show'); });
    musicBtn.addEventListener('click', (e) => { e.stopPropagation(); closeAll(); musicDrop.classList.toggle('show'); });
    userBtn.addEventListener('click', (e) => { e.stopPropagation(); closeAll(); userDrop.classList.toggle('show'); });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher-container') && !e.target.closest('.music-container')) {
            closeAll();
        }
    });
}

// --- 3. Theme System ---
function setTheme(themeKey, themeName) {
    document.body.setAttribute('data-theme', themeKey);
    document.getElementById('themeLabel').innerText = themeName;
    localStorage.setItem('everlynx_theme', themeKey);
    localStorage.setItem('everlynx_theme_name', themeName);
    document.getElementById('themeDropdown').classList.remove('show');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('everlynx_theme') || 'everlynx';
    const savedName = localStorage.getItem('everlynx_theme_name') || 'Everlynx Theme';
    setTheme(savedTheme, savedName);
}

// --- 4. Music Player System ---
function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('musicPlay');
    const playIcon = document.getElementById('playIcon');
    const volSlider = document.getElementById('musicVolume');
    const trackStatus = document.getElementById('musicTrackStatus');
    const trackName = document.getElementById('musicTrackName');
    const uploadInput = document.getElementById('custom-music-upload');

    // Play/Pause toggle
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.className = 'fas fa-pause';
            trackStatus.innerText = 'Playing';
        } else {
            audio.pause();
            playIcon.className = 'fas fa-play';
            trackStatus.innerText = 'Paused';
        }
    });

    // Volume control
    volSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });

    // Handle Custom Audio Upload
    uploadInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            document.getElementById('audio-source').src = fileURL;
            audio.load();
            audio.play();
            
            trackName.innerText = file.name;
            playIcon.className = 'fas fa-pause';
            trackStatus.innerText = 'Playing';
        }
    });
}
// --- 5. Contact Form Submission (Web3Forms API) ---
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const contactBtn = document.getElementById('contact-submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload
        
        // Change button state
        const originalBtnText = contactBtn.innerText;
        contactBtn.innerText = 'Sending...';
        contactBtn.disabled = true;

        // Gather form data
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        // Send request to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success
                contactStatus.innerText = "✅ Message sent successfully!";
                contactStatus.style.color = "#2ecc71"; // Green
                contactStatus.classList.remove('hidden');
                contactForm.reset();
            } else {
                // API Error
                contactStatus.innerText = "❌ Error: " + json.message;
                contactStatus.style.color = "#e74c3c"; // Red
                contactStatus.classList.remove('hidden');
            }
        })
        .catch(error => {
            // Network/Fetch Error
            contactStatus.innerText = "❌ Something went wrong. Please try again.";
            contactStatus.style.color = "#e74c3c";
            contactStatus.classList.remove('hidden');
        })
        .finally(() => {
            // Reset button and hide message after 5 seconds
            contactBtn.innerText = originalBtnText;
            contactBtn.disabled = false;
            setTimeout(() => {
                contactStatus.classList.add('hidden');
            }, 5000);
        });
    });
}
// --- 6. Copy to Clipboard Utility ---
let toastTimeout;

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Email copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
        showToast("Failed to copy!");
        document.getElementById('toast').style.borderLeftColor = "#e74c3c"; // Red on fail
        document.querySelector('#toast i').className = "fas fa-times-circle";
        document.querySelector('#toast i').style.color = "#e74c3c";
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    
    // Set message and slide in
    toastMsg.innerText = message;
    toast.classList.add('show');
    
    // Clear any existing timeouts so it doesn't glitch if clicked multiple times quickly
    clearTimeout(toastTimeout);
    
    // Hide after 3 seconds
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        
        // Reset colors back to green success state after it hides
        setTimeout(() => {
            toast.style.borderLeftColor = "#2ecc71";
            document.querySelector('#toast i').className = "fas fa-check-circle";
            document.querySelector('#toast i').style.color = "#2ecc71";
        }, 500);
    }, 3000);
}

// --- 7. Scroll Reveal Animation ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed so it doesn't re-animate on scroll up
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, // Triggers when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the very bottom of the screen
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

