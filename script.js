const message = 
"Wishing you endless smiles, happiness, and success 💖🎂✨";
let index = 0;

function startSurprise() {
    // Disable button
    const btn = document.getElementById("wishBtn");
    btn.disabled = true;
    btn.innerText = "🎉 Enjoy the Surprise!";

    // Play music
    document.getElementById("music").play();

    // Change background
    document.getElementById("page").style.background =
        "linear-gradient(135deg, #a18cd1, #fbc2eb)";

    // Typing effect
    const typing = document.getElementById("typing");
    typing.innerHTML = "";
    index = 0;
    const typingInterval = setInterval(() => {
        typing.innerHTML += message[index];
        index++;
        if (index === message.length) clearInterval(typingInterval);
    }, 70);

    // Confetti
    startConfetti();
}

/* 🎆 Confetti Logic */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 5 + 2,
            color: `hsl(${Math.random()*360},100%,50%)`
        });
    }
    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();
        c.y += c.d;
        if (c.y > canvas.height) c.y = 0;
    });
    requestAnimationFrame(animateConfetti);
}
