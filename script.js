// Reveal Elements on Scroll
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// Current Page Active State (Header Navigation)
const currentLocation = location.href;
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    if (link.href === currentLocation) {
        link.classList.add('active');
    }
});

// Page Transition Interceptor
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Close mobile nav if open
        const nav = document.querySelector('nav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (nav && nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            const icon = menuBtn && menuBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
        }

        // Prevent default only if it's internal navigation and not the current page
        if (this.hostname === window.location.hostname && this.href !== currentLocation) {
            e.preventDefault();
            const targetUrl = this.href;

            // Trigger exit animation
            document.body.classList.add('fade-out');

            // Wait for animation to finish before navigating
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 350); // Matches CSS transition time
        }
    });
});

console.log('FEVETI animations loaded.');

// GSAP Text Reveal Animation (Exact CodePen "Chars" Replica)
function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero h2');
    const heroDesc = document.querySelector('.hero p');

    // Check if GSAP is available
    if (!heroTitle || typeof gsap === 'undefined') return;

    // Mimic SplitText {type: "words,chars"}
    function splitTextIntoChars(element) {
        const parts = element.innerHTML.split(/(<br\s*\/?>)/i);
        let newHtml = '';

        parts.forEach(part => {
            if (part.toLowerCase().includes('<br')) {
                newHtml += part;
                return;
            }
            // Split into words first
            const words = part.trim().split(/\s+/);
            words.forEach((word, wordIdx) => {
                if (!word) return;
                
                newHtml += `<span class="gsap-word">`;
                
                // Split each word into characters
                const chars = word.split('');
                chars.forEach(char => {
                    newHtml += `<span class="gsap-char">${char}</span>`;
                });

                newHtml += `</span>`;
                
                // Add space after word if it's not the last one
                if (wordIdx < words.length - 1) {
                    newHtml += ' ';
                }
            });
        });
        element.innerHTML = newHtml;
    }

    splitTextIntoChars(heroTitle);
    if (heroDesc) splitTextIntoChars(heroDesc);

    // Exact animation matching the CodePen 'Chars' effect
    gsap.fromTo('.gsap-char', {
        x: 150,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power4.out',
        stagger: 0.04,
        delay: 0.2 // Wait for initial CSS page load transition
    });
}

setTimeout(initHeroAnimation, 100);

// ============================================
// RESULTS ACCORDION SYSTEM
// ============================================
function initResultsAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');

        // Si el acordeón ya está activo por defecto en el HTML, abrirlo
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
        }

        // Usamos onclick en lugar de addEventListener para evitar que se ejecute dos veces y se anule
        header.onclick = function() {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = null; // Quita el max-height inline para que la transición CSS cierre
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px"; // Aplica el alto exacto para animación fluida
            }
        };
    });
}

// Ejecutar inmediatamente (ya que el script está al final del body)
initResultsAccordion();

// ============================================
// MOBILE NAVIGATION SYSTEM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (!menuBtn || !nav) return;

    // Toggle open/close on hamburger click
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // prevent body click from immediately closing it
        nav.classList.toggle('nav-active');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('nav-active') &&
            !nav.contains(e.target) &&
            !menuBtn.contains(e.target)) {
            nav.classList.remove('nav-active');
            const icon = menuBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
        }
    });
});

// ============================================
// LENIS SMOOTH SCROLLING
// ============================================
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}
