// Birthday message
const message = 
"Wishing you endless smiles, boundless happiness, incredible adventures, and success in everything you do! 💖🎂✨ May this year bring you wonderful memories and joy beyond measure! 🌟";

let index = 0;
let candlesBlown = 0;
let surpriseActivated = false;

// Initialize on page load
window.addEventListener('load', () => {
    setupCandles();
    createBalloons();
    setTimeout(() => {
        document.getElementById('wishesSection').classList.add('show');
    }, 500);
});

// Setup candle click events
function setupCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach((candle, index) => {
        candle.addEventListener('click', function() {
            blowCandle(this);
        });
    });
}

// Blow out candle effect
function blowCandle(candleElement) {
    const flame = candleElement.querySelector('.flame');
    if (flame && !flame.classList.contains('blown-out')) {
        flame.classList.add('blown-out');
        candlesBlown++;
        
        // Play blow sound effect (you can add this)
        createSmokeEffect(candleElement);
        
        // Check if all candles are blown
        if (candlesBlown === 3) {
            setTimeout(() => {
                allCandlesBlown();
            }, 800);
        }
    }
}

// Create smoke effect
function createSmokeEffect(candleElement) {
    const rect = candleElement.getBoundingClientRect();
    const smoke = document.createElement('div');
    smoke.style.position = 'fixed';
    smoke.style.left = rect.left + rect.width/2 + 'px';
    smoke.style.top = rect.top + 'px';
    smoke.style.fontSize = '20px';
    smoke.innerHTML = '💨';
    smoke.style.zIndex = '1000';
    smoke.style.pointerEvents = 'none';
    smoke.style.animation = 'smokeRise 1s ease-out forwards';
    document.body.appendChild(smoke);
    
    setTimeout(() => smoke.remove(), 1000);
}

// All candles blown celebration
function allCandlesBlown() {
    document.getElementById('cakeInstruction').innerHTML = '🎉 Make a wish! 🌟';
    createMagicSparkles();
    
    // Auto-trigger surprise after a moment
    if (!surpriseActivated) {
        setTimeout(() => {
            const btn = document.getElementById('wishBtn');
            btn.style.animation = 'pulse 0.5s infinite';
        }, 1000);
    }
}

// Create magic sparkles effect
function createMagicSparkles() {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const cake = document.querySelector('.cake');
    const rect = cake.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            sparkle.style.fontSize = '20px';
            sparkle.style.zIndex = '1000';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkleExplode 1s ease-out forwards';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 100);
    }
}

// Add sparkle explosion animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleExplode {
        0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Start surprise function
function startSurprise() {
    if (surpriseActivated) return;
    surpriseActivated = true;
    
    // Disable button
    const btn = document.getElementById("wishBtn");
    btn.disabled = true;
    btn.querySelector('.btn-text').innerText = "🎉 Enjoy Your Special Day!";
    btn.style.animation = 'none';

    // Play Happy Birthday melody
    setTimeout(() => {
        playHappyBirthdayMelody();
    }, 500);

    // Change background with smooth transition
    const page = document.getElementById("page");
    page.style.background = "linear-gradient(135deg, #fa709a 0%, #fee140 50%, #30cfd0 100%)";

    // Typing effect
    const typing = document.getElementById("typing");
    typing.innerHTML = "";
    index = 0;
    
    const typingInterval = setInterval(() => {
        typing.innerHTML += message[index];
        index++;
        if (index === message.length) {
            clearInterval(typingInterval);
            // Show surprise message after typing
            setTimeout(() => {
                document.getElementById('surpriseMessage').classList.add('show');
            }, 500);
        }
    }, 50);

    // Start all effects
    startConfetti();
    startHearts();
    startFireworks();
    
    // Animate card
    const card = document.getElementById('mainCard');
    card.style.animation = 'cardCelebrate 1s ease-out';
}

// Create balloons
function createBalloons() {
    const colors = ['#ff6b9d', '#c44569', '#f8b500', '#48dbfb', '#0abde3', '#ee5a6f'];
    const container = document.getElementById('balloons');
    
    for (let i = 0; i < 8; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.animationDelay = Math.random() * 5 + 's';
        balloon.style.animationDuration = (8 + Math.random() * 4) + 's';
        container.appendChild(balloon);
    }
}

// Start floating hearts
function startHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💝', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (15 + Math.random() * 15) + 'px';
        heart.style.animationDuration = (4 + Math.random() * 3) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 7000);
    }, 300);
}

// Fireworks effect
function startFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff6b6b', '#4ecdc4'];
    
    setInterval(() => {
        createFirework(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight * 0.5,
            colors[Math.floor(Math.random() * colors.length)]
        );
    }, 1000);
}

function createFirework(x, y, color) {
    const particles = 30;
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        
        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

/* 🎆 Enhanced Confetti Logic */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let confetti = [];
let confettiActive = false;

function startConfetti() {
    if (confettiActive) return;
    confettiActive = true;
    
    // Create more confetti pieces
    for (let i = 0; i < 300; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 5 + 2,
            d: Math.random() * 5 + 2,
            color: `hsl(${Math.random()*360}, 100%, 60%)`,
            tilt: Math.random() * 10 - 5,
            tiltAngle: 0,
            tiltAngleIncrement: Math.random() * 0.1 + 0.05
        });
    }
    animateConfetti();
}

function animateConfetti() {
    if (!confettiActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confetti.forEach((c, index) => {
        ctx.beginPath();
        ctx.arc(c.x + c.tilt, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
        
        // Update position
        c.tiltAngle += c.tiltAngleIncrement;
        c.y += c.d;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        
        // Reset confetti that falls off screen
        if (c.y > canvas.height) {
            confetti[index] = {
                x: Math.random() * canvas.width,
                y: -20,
                r: Math.random() * 5 + 2,
                d: Math.random() * 5 + 2,
                color: `hsl(${Math.random()*360}, 100%, 60%)`,
                tilt: Math.random() * 10 - 5,
                tiltAngle: 0,
                tiltAngleIncrement: Math.random() * 0.1 + 0.05
            };
        }
    });
    
    requestAnimationFrame(animateConfetti);
}

// Add celebration animation
const celebrateStyle = document.createElement('style');
celebrateStyle.textContent = `
    @keyframes cardCelebrate {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.05) rotate(-2deg); }
        75% { transform: scale(1.05) rotate(2deg); }
    }
`;
document.head.appendChild(celebrateStyle);

// Happy Birthday Melody using Web Audio API
function playHappyBirthdayMelody() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const audioContext = new AudioContext();
    
    // Happy Birthday melody (simplified version)
    // Note frequencies: C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
    const melody = [
        { note: 392.00, duration: 0.5 },  // G4 - Hap-
        { note: 392.00, duration: 0.5 },  // G4 - py
        { note: 440.00, duration: 1.0 },  // A4 - birth-
        { note: 392.00, duration: 1.0 },  // G4 - day
        { note: 523.25, duration: 1.0 },  // C5 - to
        { note: 493.88, duration: 2.0 },  // B4 - you
        
        { note: 392.00, duration: 0.5 },  // G4 - Hap-
        { note: 392.00, duration: 0.5 },  // G4 - py
        { note: 440.00, duration: 1.0 },  // A4 - birth-
        { note: 392.00, duration: 1.0 },  // G4 - day
        { note: 587.33, duration: 1.0 },  // D5 - to
        { note: 523.25, duration: 2.0 },  // C5 - you
        
        { note: 392.00, duration: 0.5 },  // G4 - Hap-
        { note: 392.00, duration: 0.5 },  // G4 - py
        { note: 783.99, duration: 1.0 },  // G5 - birth-
        { note: 659.25, duration: 1.0 },  // E5 - day
        { note: 523.25, duration: 1.0 },  // C5 - dear
        { note: 493.88, duration: 1.0 },  // B4 - Ga-
        { note: 440.00, duration: 2.0 },  // A4 - na-vi
        
        { note: 698.46, duration: 0.5 },  // F5 - Hap-
        { note: 698.46, duration: 0.5 },  // F5 - py
        { note: 659.25, duration: 1.0 },  // E5 - birth-
        { note: 523.25, duration: 1.0 },  // C5 - day
        { note: 587.33, duration: 1.0 },  // D5 - to
        { note: 523.25, duration: 2.0 },  // C5 - you!
    ];
    
    let startTime = audioContext.currentTime;
    
    melody.forEach(({ note, duration }) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = note;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
        
        startTime += duration;
    });
    
    // Loop the melody
    setTimeout(() => {
        if (surpriseActivated) {
            playHappyBirthdayMelody();
        }
    }, startTime * 1000);
}
