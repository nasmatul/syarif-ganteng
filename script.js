document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for memory section
    const memoryText = document.querySelector('.memory-text');
    const messages = [
        "Setiap momen bersamamu sangat berharga...",
        "Kamu membuat hidupku penuh jamet...",
        "Bayang bayangan yang tak terbayang...",
        "I love you everymet yahh..."
    ];
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            memoryText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            memoryText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing when memory section is visible
    const memoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'section5') {
                setTimeout(type, 1000);
            }
        });
    }, { threshold: 0.5 });

    memoryObserver.observe(document.getElementById('section5'));

    // Heart explosion effect
    const canvas = document.getElementById('heart-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create initial floating hearts
    function createFloatingHearts() {
        const heartColors = ['#ff6d6d', '#ff9e80', '#ff80ab', '#b388ff'];
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }
    
    // Create floating hearts occasionally
    setInterval(createFloatingHearts, 800);

    // Big heart explosion when clicking
    document.addEventListener('click', function(e) {
        createHeartExplosion(e.clientX, e.clientY);
    });

    function createHeartExplosion(x, y) {
        const particles = [];
        const colors = ['#ff6d6d', '#ff9e80', '#ff80ab', '#b388ff', '#ea80fc'];
        
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: x,
                y: y,
                size: Math.random() * 25 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: Math.random() * 10 - 5,
                speedY: Math.random() * 10 - 5,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 8 - 4,
                life: 100
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.font = `${p.size}px Arial`;
                ctx.fillText('❤', -p.size/2, p.size/4);
                ctx.restore();
                
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;
                p.life--;
                
                if (p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            
            if (particles.length > 0) {
                requestAnimationFrame(animate);
            }
        }
        
        animate();
    }

    // Auto heart explosion when reaching love section
    const loveSection = document.getElementById('section3');
    const loveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rect = entry.target.getBoundingClientRect();
                const x = rect.left + rect.width/2;
                const y = rect.top + rect.height/2;
                
                // Create multiple explosions
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createHeartExplosion(
                            x + (Math.random() * 300 - 150),
                            y + (Math.random() * 300 - 150)
                        );
                    }, i * 300);
                }
            }
        });
    }, { threshold: 0.7 });

    loveObserver.observe(loveSection);

    // Animate photo cards when they appear
    const photoCards = document.querySelectorAll('.photo-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    photoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });
});