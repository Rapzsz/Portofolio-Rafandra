document.addEventListener('DOMContentLoaded', function() {
    const typewriterText = document.querySelector('.text-typewriter');
    const phrases = ["Siswa SMK AK Nusa Bangsa", "Pelajar", "Peminat Progammer", "Pengguna Java script", "Peminat Bahasa JS"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100; 
    let deleteSpeed = 60; 
    let pauseBeforeDelete = 1500; 
    let pauseBeforeType = 500; 
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = deleteSpeed;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, pauseBeforeDelete);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(() => typeWriter(), pauseBeforeType);
            return;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    if (typewriterText) {
        typeWriter();
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }


    const sections = document.querySelectorAll('section[id]');
    const navHighlighter = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; 

            let sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    navLink.classList.add('active');
                }
            } else {
                if (navLink) {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', navHighlighter);
    navHighlighter();

    
    const fadeElements = document.querySelectorAll('.section-padding h2, .section-padding p.lead, .hero-content, .hero-image, .skill-category, .project-item, .contact-form, .social-links');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-out'); 
        observer.observe(el);
    });

  
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

});