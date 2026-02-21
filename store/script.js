const authScreen = document.getElementById('auth-screen');
const appContainer = document.getElementById('app-container');
const loginBox = document.getElementById('login-box');
const registerBox = document.getElementById('register-box');
const forgotBox = document.getElementById('forgot-box');

document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    loadTheme();
    initDropdowns();
    initMusicPlayer();
});

function checkAuth() {
    const currentUser = localStorage.getItem('everlynx_activeUser');
    if (currentUser) {
        authScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
        document.getElementById('nav-username').innerText = currentUser;
        initScrollReveal(); 
    } else {
        authScreen.classList.remove('hidden');
        appContainer.classList.add('hidden');
    }
}

function toggleAuth(type) {
    loginBox.classList.add('hidden');
    registerBox.classList.add('hidden');
    forgotBox.classList.add('hidden');

    if (type === 'register') {
        registerBox.classList.remove('hidden');
    } else if (type === 'forgot') {
        forgotBox.classList.remove('hidden');
    } else {
        loginBox.classList.remove('hidden');
    }
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('login-username').value.trim();
    const pass = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('everlynx_users')) || {};

    if (users[user] && users[user].password === pass) {
        localStorage.setItem('everlynx_activeUser', user);
        checkAuth();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
});

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
        checkAuth();
    }
});

function logout() {
    localStorage.removeItem('everlynx_activeUser');
    document.getElementById('bg-music').pause();
    checkAuth();
}

document.getElementById('forgot-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('forgot-username').value.trim();
    const email = document.getElementById('forgot-email').value.trim();
    const newPass = document.getElementById('forgot-new-password').value;
    const users = JSON.parse(localStorage.getItem('everlynx_users')) || {};

    const errorMsg = document.getElementById('forgot-error');
    const successMsg = document.getElementById('forgot-success');

    errorMsg.classList.add('hidden');
    successMsg.classList.add('hidden');

    if (users[user] && users[user].email === email) {
        users[user].password = newPass;
        localStorage.setItem('everlynx_users', JSON.stringify(users));
        
        successMsg.classList.remove('hidden');
        setTimeout(() => {
            toggleAuth('login');
            successMsg.classList.add('hidden');
            document.getElementById('forgot-form').reset();
        }, 2000);
    } else {
        errorMsg.classList.remove('hidden');
    }
});

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

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher-container') && !e.target.closest('.music-container')) {
            closeAll();
        }
    });
}

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

function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('musicPlay');
    const playIcon = document.getElementById('playIcon');
    const volSlider = document.getElementById('musicVolume');
    const trackStatus = document.getElementById('musicTrackStatus');
    const trackName = document.getElementById('musicTrackName');
    const uploadInput = document.getElementById('custom-music-upload');

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

    volSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });

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

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const contactBtn = document.getElementById('contact-submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const originalBtnText = contactBtn.innerText;
        contactBtn.innerText = 'Sending...';
        contactBtn.disabled = true;

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

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
                contactStatus.innerText = "✅ Message sent successfully!";
                contactStatus.style.color = "#2ecc71";
                contactStatus.classList.remove('hidden');
                contactForm.reset();
            } else {
                contactStatus.innerText = "❌ Error: " + json.message;
                contactStatus.style.color = "#e74c3c";
                contactStatus.classList.remove('hidden');
            }
        })
        .catch(error => {
            contactStatus.innerText = "❌ Something went wrong. Please try again.";
            contactStatus.style.color = "#e74c3c";
            contactStatus.classList.remove('hidden');
        })
        .finally(() => {
            contactBtn.innerText = originalBtnText;
            contactBtn.disabled = false;
            setTimeout(() => {
                contactStatus.classList.add('hidden');
            }, 5000);
        });
    });
}

let toastTimeout;

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Email copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
        showToast("Failed to copy!");
        document.getElementById('toast').style.borderLeftColor = "#e74c3c";
        document.querySelector('#toast i').className = "fas fa-times-circle";
        document.querySelector('#toast i').style.color = "#e74c3c";
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    
    toastMsg.innerText = message;
    toast.classList.add('show');
    
    clearTimeout(toastTimeout);
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        
        setTimeout(() => {
            toast.style.borderLeftColor = "#2ecc71";
            document.querySelector('#toast i').className = "fas fa-check-circle";
            document.querySelector('#toast i').style.color = "#2ecc71";
        }, 500);
    }, 3000);
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            const icon = hamburgerBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                if (icon && icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    }
});
