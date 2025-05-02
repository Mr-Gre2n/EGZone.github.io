        // Make cards slide animation smoother with JS
        document.addEventListener('DOMContentLoaded', function () {
            const cardsContainer = document.querySelector('.cards-container');
            const cards = document.querySelectorAll('.card');
            
            // Clone cards to create infinite scrolling effect
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                cardsContainer.appendChild(clone);
            });
            // Make timeline items appear on scroll
            const timelineItems = document.querySelectorAll('.timeline-item');
            
            function checkScroll() {
                timelineItems.forEach(item => {
                    const itemTop = item.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (itemTop < windowHeight - 100) {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }
                });
            }

            // Set initial styles for timeline items
            timelineItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(50px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            window.addEventListener('scroll', checkScroll);
            checkScroll();
        });
    