        // Make cards slide animation smoother with JS
        document.addEventListener('DOMContentLoaded', function () {
            const cardsContainer = document.querySelector('.cards-container');
            const cards = document.querySelectorAll('.card');
            // theme 
            const img = document.getElementById('missionPhoto');
            const themeAbout = localStorage.getItem('Theme');
            
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
                    else if (itemTop > windowHeight - 200) {
                        item.style.opacity = '0';
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
            function changePhotoTheme(themeAbout){
                if (themeAbout === 'dark-blue'){
                  img.src='../Materials/Images/about-dark-theme.avif';
                }else {
                  img.src='../Materials/Images/mission.png'
                }
              }
              changePhotoTheme(themeAbout);
        });
        
    