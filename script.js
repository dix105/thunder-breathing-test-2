document.addEventListener('DOMContentLoaded', () => {
    
    // ==============================================
    // 1. MOBILE MENU TOGGLE
    // ==============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    const icon = menuToggle.querySelector('i');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ==============================================
    // 2. HERO ANIMATION (Sparks/Lightning)
    // ==============================================
    const heroBg = document.getElementById('hero-particles');
    
    if (heroBg) {
        function createSpark() {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            
            // Random position
            spark.style.left = Math.random() * 100 + 'vw';
            
            // Random delay and duration
            const duration = Math.random() * 2 + 3; // 3-5s
            spark.style.animationDuration = duration + 's';
            
            // Random color variance (Yellow or Indigo)
            spark.style.backgroundColor = Math.random() > 0.5 ? '#facc15' : '#6366f1';
            
            // Random opacity
            spark.style.opacity = Math.random() * 0.5 + 0.2;
            
            heroBg.appendChild(spark);
            
            // Remove after animation
            setTimeout(() => {
                spark.remove();
            }, duration * 1000);
        }
        
        // Generate sparks periodically
        setInterval(createSpark, 300);
        
        // Initial burst
        for(let i=0; i<20; i++) setTimeout(createSpark, i*100);
    }

    // ==============================================
    // 3. SCROLL REVEAL ANIMATION
    // ==============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe step cards, gallery items, testimonial cards
    const animatedElements = document.querySelectorAll('.step-card, .gallery-item, .testimonial-card, .section-header');
    animatedElements.forEach(el => observer.observe(el));

    // ==============================================
    // 4. FAQ ACCORDION
    // ==============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                
                otherQuestion.classList.remove('active');
                otherAnswer.style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ==============================================
    // 5. LEGAL MODALS
    // ==============================================
    function openModal(id) {
        const modal = document.getElementById(id + '-modal');
        if (modal) {
            modal.classList.add('active');
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    function closeModal(id) {
        const modal = document.getElementById(id + '-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300); // Wait for transition
            document.body.style.overflow = '';
        }
    }

    // Event Listeners for Open
    document.querySelectorAll('[data-modal-target]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-modal-target');
            openModal(targetId);
        });
    });

    // Event Listeners for Close
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-modal-close');
            closeModal(targetId);
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        document.querySelectorAll('.modal.active').forEach(modal => {
            if (e.target === modal) {
                const id = modal.id.replace('-modal', '');
                closeModal(id);
            }
        });
    });

    // Update dates
    const dateElements = ['privacy-date', 'terms-date'];
    const today = new Date().toLocaleDateString();
    dateElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = today;
    });

    // ==============================================
    // 6. LOCKED UI INTERACTIONS (Fun Factor)
    // ==============================================
    const lockedBtn = document.querySelector('.locked-actions button');
    if (lockedBtn) {
        lockedBtn.addEventListener('click', () => {
            lockedBtn.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                lockedBtn.style.animation = '';
            }, 500);
        });
    }

    // Add CSS for shake animation
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(styleSheet);
});