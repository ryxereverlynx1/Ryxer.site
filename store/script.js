// Smooth scroll to section
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Discord modal
function openDiscordCard() {
    document.getElementById('discordOverlay').style.display = 'flex';
}
function closeDiscordCard(event) {
    if(!event || event.target.id==='discordOverlay') {
        document.getElementById('discordOverlay').style.display='none';
    }
}

// Hero animation (fade in)
window.addEventListener('load', () => {
    const heroItems = document.querySelectorAll('.hero-avatar, .hero h2, .hero p, .hero button');
    heroItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = '0.8s ease';
        }, index * 180);
    });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
function handleReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);


// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navbar links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

function setActiveNavLink() {
    let scrollPos = window.scrollY + 70; // navbar height offset
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        const id = sec.getAttribute('id');

        if(scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
            if(activeLink) activeLink.classList.add('active');
        }
    });
}

// Run on scroll and on page load
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);
// Open Discord card when clicking on product
const products = document.querySelectorAll('.product');

products.forEach(product => {
    product.addEventListener('click', () => {
        openDiscordCard(); // use your existing function
    });
});