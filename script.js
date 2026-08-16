/* =========================================================
   FUN TIME ❤️
   CLEAN MAIN SCRIPT
========================================================= */


/* =========================================================
   01. SETTINGS
========================================================= */

const SECRET_PASSWORD = "262430";

/*
Date and time of the birthday countdown.
Format: "Month Day, Year HH:MM:SS"
*/
const targetDate = new Date("August 24,2026 00:00:00").getTime();


/* =========================================================
   02. AUDIO SYSTEM
========================================================= */

const AUDIO_PATH = "./music/";

const audio = {
    countdown: new Audio(AUDIO_PATH + "countdown.mp3"),
    birthday: new Audio(AUDIO_PATH + "birthday.mp3"),
    fireworks: new Audio(AUDIO_PATH + "fireworks.mp3"),
    romantic: new Audio(AUDIO_PATH + "romantic.mp3"),
    game: new Audio(AUDIO_PATH + "game.mp3"),
    click: new Audio(AUDIO_PATH + "click.mp3")
};


/*
   Background music loop karega.
*/
audio.countdown.loop = true;
audio.birthday.loop = true;
audio.romantic.loop = true;
audio.game.loop = true;


/*
   Fireworks bhi sirf fireworks screen ke
   dauran chalega.
*/
audio.fireworks.loop = true;


/*
   Volumes
*/
audio.countdown.volume = 0.30;
audio.birthday.volume = 0.38;
audio.fireworks.volume = 0.55;
audio.romantic.volume = 0.22;
audio.game.volume = 0.32;
audio.click.volume = 0.40;


/* Current background music */
let currentMusic = null;


/* =========================================================
   03. AUDIO FUNCTIONS
========================================================= */

function stopMusic() {

    Object.values(audio).forEach(sound => {

        try {
            sound.pause();
            sound.currentTime = 0;
        } catch (error) {}

    });

    currentMusic = null;
}


function playMusic(sound) {

    if (!sound) return;

    stopMusic();

    currentMusic = sound;

    sound.currentTime = 0;

    sound.play().catch(error => {

        console.log("Audio blocked:", error);

    });

}


/*
   Click sound
*/
function clickSound() {

    try {

        audio.click.pause();
        audio.click.currentTime = 0;

        audio.click.play().catch(() => {});

    } catch (error) {}

}


/* =========================================================
   04. HTML ELEMENTS
========================================================= */

const secretScreen =
    document.getElementById("secretScreen");

const passwordInput =
    document.getElementById("passwordInput");

const unlockButton =
    document.getElementById("unlockButton");

const passwordMessage =
    document.getElementById("passwordMessage");


const countdownScreen =
    document.getElementById("countdownScreen");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


const fireworksCanvas =
    document.getElementById("fireworksCanvas");


const cakeScreen =
    document.getElementById("cakeScreen");

const blowButton =
    document.getElementById("blowButton");


const letterScene =
    document.getElementById("letterScene");

const envelopeWrapper =
    document.getElementById("envelopeWrapper");

const loveLetter =
    document.getElementById("loveLetter");

const letterText =
    document.getElementById("letterText");

const continueLetter =
    document.getElementById("continueLetter");

const continueButton =
    document.getElementById("continueButton");


const wishTransition =
    document.getElementById("wishTransition");

const startGameButton =
    document.getElementById("startGameButton");


const gameScreen =
    document.getElementById("gameScreen");

const gameQuestionNumber =
    document.getElementById("gameQuestionNumber");

const gameTotalQuestions =
    document.getElementById("gameTotalQuestions");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const answerOptions =
    document.getElementById("answerOptions");

const selectionMessage =
    document.getElementById("selectionMessage");

const submitAnswerButton =
    document.getElementById("submitAnswerButton");

const kissCredits =
    document.getElementById("kissCredits");

const boyReaction =
    document.getElementById("boyReaction");

const boyCharacter =
    document.getElementById("boyCharacter");

const kissVoucher =
    document.getElementById("kissVoucher");

const voucherAmount =
    document.getElementById("voucherAmount");


/* =========================================================
   05. SCREEN HELPER
========================================================= */

function showScreen(screen) {

    [
        countdownScreen,
        cakeScreen,
        letterScene,
        wishTransition,
        gameScreen
    ].forEach(item => {

        if (item) {
            item.classList.add("hidden");
        }

    });

    if (screen) {
        screen.classList.remove("hidden");
    }

}


/* =========================================================
   06. PASSWORD
========================================================= */

function unlockSurprise() {

    clickSound();

    const entered =
        passwordInput
            ? passwordInput.value.trim()
            : "";

    if (entered !== SECRET_PASSWORD) {

        if (passwordMessage) {
            passwordMessage.textContent =
                "Wrong password... try again ❤️";
        }

        if (passwordInput) {
            passwordInput.value = "";
            passwordInput.focus();
        }

        return;
    }


    if (passwordMessage) {
        passwordMessage.textContent = "";
    }


    if (secretScreen) {
        secretScreen.classList.add("hidden");
    }


    if (countdownScreen) {
        countdownScreen.classList.remove("hidden");
    }


    /*
       IMPORTANT:
       User ne button click kiya hai,
       isliye browser audio allow karne ke chances high hain.
    */
    playMusic(audio.countdown);

    startCountdown();

}


if (unlockButton) {

    unlockButton.addEventListener(
        "click",
        unlockSurprise
    );

}


if (passwordInput) {

    passwordInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                unlockSurprise();
            }

        }
    );

}


/* =========================================================
   07. BIRTHDAY COUNTDOWN
========================================================= */

let countdownTimer = null;


function startCountdown() {

    clearInterval(countdownTimer);

    updateCountdownDisplay();


    countdownTimer = setInterval(() => {

        const now = Date.now();

        const difference = targetDate - now;


        if (difference <= 0) {

            clearInterval(countdownTimer);

            updateCountdownDisplay();

            startBirthdaySequence();

            return;
        }


        updateCountdownDisplay();

    }, 1000);

}


function updateCountdownDisplay() {

    const difference =
        targetDate - Date.now();


    if (difference <= 0) {

        if (daysElement)
            daysElement.textContent = "00";

        if (hoursElement)
            hoursElement.textContent = "00";

        if (minutesElement)
            minutesElement.textContent = "00";

        if (secondsElement)
            secondsElement.textContent = "00";

        return;
    }


    const totalSeconds =
        Math.floor(difference / 1000);


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    if (daysElement)
        daysElement.textContent =
            String(days).padStart(2, "0");


    if (hoursElement)
        hoursElement.textContent =
            String(hours).padStart(2, "0");


    if (minutesElement)
        minutesElement.textContent =
            String(minutes).padStart(2, "0");


    if (secondsElement)
        secondsElement.textContent =
            String(seconds).padStart(2, "0");

}

/* =========================================================
   08. FIREWORKS
========================================================= */

const ctx =
    fireworksCanvas
        ? fireworksCanvas.getContext("2d")
        : null;


let fireworksRunning = false;
let fireworksAnimation = null;
let fireworksTimer = null;

let rockets = [];
let particles = [];


const fireworkColors = [
    "#ffb6c9",
    "#ffd6e2",
    "#ffffff",
    "#f4c2d7",
    "#ffe9ef"
];


function resizeCanvas() {

    if (!fireworksCanvas || !ctx)
        return;

    const ratio =
        window.devicePixelRatio || 1;

    fireworksCanvas.width =
        window.innerWidth * ratio;

    fireworksCanvas.height =
        window.innerHeight * ratio;

    fireworksCanvas.style.width =
        window.innerWidth + "px";

    fireworksCanvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

}


resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* ---------------------------------------------------------
   Rocket
--------------------------------------------------------- */

class Rocket {

    constructor(targetX, targetY) {

        this.x =
            targetX +
            (Math.random() - 0.5) * 100;

        this.y =
            window.innerHeight + 20;

        this.targetX = targetX;
        this.targetY = targetY;

        this.speed =
            8 + Math.random() * 3;

        this.trail = [];

        this.alive = true;

    }


    update() {

        this.trail.push({
            x: this.x,
            y: this.y
        });


        if (this.trail.length > 12) {
            this.trail.shift();
        }


        const dx =
            this.targetX - this.x;

        const dy =
            this.targetY - this.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distance < 12) {

            explode(
                this.targetX,
                this.targetY
            );

            this.alive = false;

            return;

        }


        this.x +=
            (dx / distance) *
            Math.min(
                this.speed,
                distance * 0.15
            );

        this.y +=
            (dy / distance) *
            Math.min(
                this.speed,
                distance * 0.15
            );

    }


    draw() {

        if (!ctx) return;


        for (
            let i = 0;
            i < this.trail.length;
            i++
        ) {

            const point =
                this.trail[i];

            const alpha =
                i / this.trail.length;


            ctx.beginPath();

            ctx.arc(
                point.x,
                point.y,
                1.5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255,220,235,${alpha})`;

            ctx.fill();

        }


        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ffffff";

        ctx.shadowBlur = 15;

        ctx.shadowColor = "#ffd6e2";

        ctx.fill();

        ctx.shadowBlur = 0;

    }

}


/* ---------------------------------------------------------
   Particle
--------------------------------------------------------- */

class Particle {

    constructor(
        x,
        y,
        angle,
        speed,
        color
    ) {

        this.x = x;
        this.y = y;

        this.vx =
            Math.cos(angle) * speed;

        this.vy =
            Math.sin(angle) * speed;

        this.color = color;

        this.life = 1;

        this.decay =
            0.012 +
            Math.random() * 0.015;

        this.size =
            1.2 +
            Math.random() * 1.8;

    }


    update() {

        this.vx *= 0.985;
        this.vy *= 0.985;

        this.vy += 0.045;

        this.x += this.vx;
        this.y += this.vy;

        this.life -= this.decay;

        return this.life > 0;

    }


    draw() {

        if (!ctx) return;


        ctx.globalAlpha =
            this.life;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            this.color;

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            this.color;

        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.globalAlpha = 1;

    }

}


/* ---------------------------------------------------------
   Explosion
--------------------------------------------------------- */

function explode(x, y) {

    const color =
        fireworkColors[
            Math.floor(
                Math.random() *
                fireworkColors.length
            )
        ];


    const count = 95;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            (
                Math.PI * 2 / count
            ) * i;

        const speed =
            2 +
            Math.random() * 4.5;


        particles.push(
            new Particle(
                x,
                y,
                angle,
                speed,
                color
            )
        );

    }

}


/* ---------------------------------------------------------
   Launch
--------------------------------------------------------- */

function launchFirework() {

    if (!fireworksRunning)
        return;


    const x =
        window.innerWidth *
        (
            0.12 +
            Math.random() * 0.76
        );


    const y =
        window.innerHeight *
        (
            0.12 +
            Math.random() * 0.35
        );


    rockets.push(
        new Rocket(x, y)
    );

}


/* ---------------------------------------------------------
   Animation
--------------------------------------------------------- */

function animateFireworks() {

    if (!fireworksRunning || !ctx) {

        fireworksAnimation = null;

        return;

    }


    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    rockets =
        rockets.filter(rocket => {

            rocket.update();

            if (rocket.alive) {
                rocket.draw();
            }

            return rocket.alive;

        });


    particles =
        particles.filter(particle => {

            const alive =
                particle.update();

            if (alive) {
                particle.draw();
            }

            return alive;

        });


    fireworksAnimation =
        requestAnimationFrame(
            animateFireworks
        );

}


/* ---------------------------------------------------------
   Start fireworks
--------------------------------------------------------- */

function startFireworks() {

    if (fireworksRunning)
        return;


    fireworksRunning = true;

    rockets = [];
    particles = [];


    launchFirework();


    fireworksTimer =
        setInterval(
            launchFirework,
            650
        );


    /*
       Fireworks sound ONLY here.
    */
    try {

        audio.fireworks.currentTime = 0;

        audio.fireworks.play().catch(
            () => {}
        );

    } catch (error) {}


    animateFireworks();

}


/* ---------------------------------------------------------
   Stop fireworks
--------------------------------------------------------- */

function stopFireworks() {

    fireworksRunning = false;


    if (fireworksTimer) {

        clearInterval(
            fireworksTimer
        );

        fireworksTimer = null;

    }


    if (fireworksAnimation) {

        cancelAnimationFrame(
            fireworksAnimation
        );

        fireworksAnimation = null;

    }


    rockets = [];
    particles = [];


    /*
       VERY IMPORTANT:
       Fireworks sound bhi completely stop.
    */
    try {

        audio.fireworks.pause();

        audio.fireworks.currentTime = 0;

    } catch (error) {}


    if (ctx) {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

    }

}


/* =========================================================
   09. BIRTHDAY SEQUENCE
========================================================= */

function startBirthdaySequence() {

    /*
       Countdown sound STOP
    */
    stopMusic();


    if (countdownScreen) {

        countdownScreen.classList.add(
            "fireworks-mode"
        );

    }


    /*
       Fireworks start
    */
    startFireworks();


    /*
       EXACTLY 10 SECONDS
    */
    setTimeout(() => {

        stopFireworks();


        if (countdownScreen) {
            countdownScreen.classList.add(
                "hidden"
            );
        }


        if (cakeScreen) {
            cakeScreen.classList.remove(
                "hidden"
            );
        }


        /*
           Birthday music starts.
        */
        playMusic(audio.birthday);


        /*
           Microphone permission.
        */
        setTimeout(
            startMicrophone,
            800
        );

    }, 10000);

}


/* =========================================================
   10. CANDLE BLOW
========================================================= */

let candlesBlown = false;

let microphoneStream = null;
let microphoneAnimation = null;


function blowCandles() {

    if (candlesBlown)
        return;


    candlesBlown = true;


    stopMicrophone();


    /*
       Birthday music stop
    */
    stopMusic();


    /*
       Flames OFF
    */
    document
        .querySelectorAll(".flame")
        .forEach(flame => {

            flame.style.animation = "none";

            flame.style.opacity = "0";

            flame.style.visibility =
                "hidden";

        });


    /*
       Smoke create
    */
    document
        .querySelectorAll(".candle")
        .forEach(candle => {

            const smoke =
                document.createElement(
                    "span"
                );

            smoke.className =
                "candle-smoke";

            candle.appendChild(smoke);

        });


    /*
       Sparkles
    */
    for (
        let i = 0;
        i < 15;
        i++
    ) {

        setTimeout(
            createCakeSparkle,
            i * 60
        );

    }


    if (blowButton) {

        blowButton.style.opacity = "0";

        blowButton.style.pointerEvents =
            "none";

    }


    const blowText =
        document.querySelector(
            ".blow-text"
        );

    if (blowText) {

        blowText.textContent =
            "Make a wish... ❤️";

    }


    /*
       Small pause before next screen.
    */
    setTimeout(
        showLetterScene,
        2500
    );

}


/* ---------------------------------------------------------
   Cake sparkle
--------------------------------------------------------- */

function createCakeSparkle() {

    if (!cakeScreen)
        return;


    const sparkle =
        document.createElement(
            "span"
        );

    sparkle.className =
        "cake-sparkle";

    sparkle.textContent = "✦";


    sparkle.style.left =
        (
            30 +
            Math.random() * 40
        ) + "%";


    sparkle.style.top =
        (
            25 +
            Math.random() * 40
        ) + "%";


    cakeScreen.appendChild(
        sparkle
    );


    setTimeout(
        () => sparkle.remove(),
        1400
    );

}


/* ---------------------------------------------------------
   Blow button
--------------------------------------------------------- */

if (blowButton) {

    blowButton.addEventListener(
        "click",
        () => {

            clickSound();

            blowCandles();

        }
    );

}


/* =========================================================
   11. MICROPHONE BLOW DETECTION
========================================================= */

async function startMicrophone() {

    if (candlesBlown)
        return;


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        console.log(
            "Microphone not supported."
        );

        return;

    }


    try {

        microphoneStream =
            await navigator.mediaDevices
                .getUserMedia({
                    audio: true
                });


        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {
            return;
        }


        const context =
            new AudioContext();


        const analyser =
            context.createAnalyser();


        analyser.fftSize = 1024;


        const source =
            context.createMediaStreamSource(
                microphoneStream
            );


        source.connect(
            analyser
        );


        const data =
            new Uint8Array(
                analyser.fftSize
            );


        function detect() {

            if (candlesBlown) {
                return;
            }


            analyser.getByteTimeDomainData(
                data
            );


            let sum = 0;


            for (
                let i = 0;
                i < data.length;
                i++
            ) {

                const value =
                    (
                        data[i] - 128
                    ) / 128;

                sum +=
                    value * value;

            }


            const volume =
                Math.sqrt(
                    sum / data.length
                );


            /*
               Blow threshold.
            */
            if (volume > 0.20) {

                blowCandles();

                return;

            }


            microphoneAnimation =
                requestAnimationFrame(
                    detect
                );

        }


        detect();


    } catch (error) {

        console.log(
            "Microphone permission denied:",
            error
        );

    }

}


/* ---------------------------------------------------------
   Stop microphone
--------------------------------------------------------- */

function stopMicrophone() {

    if (microphoneAnimation) {

        cancelAnimationFrame(
            microphoneAnimation
        );

        microphoneAnimation = null;

    }


    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(track => {

                track.stop();

            });

        microphoneStream = null;

    }

}


/* =========================================================
   12. LOVE LETTER
========================================================= */
const LOVE_LETTER_TEXT =
`Happy Birthday, BABYY! 🎂❤️

Okay, first of all… you’re getting older. 😭😂
But don’t worry, you’re still cute. For now. 😌❤️

I just want you to know that you’re one of the most special people in my life. 
I love your smile, your stupid little talks, your cute drama, and honestly… 
even your annoying side. 😂

I hope you get everything you wish for today except a better boyfriend, 
because I’m already here. 😌😂❤️

So enjoy your day, eat lots of cake, smile like crazy, and remember…

You’re stuck with me. No refunds. No exchanges. 😂❤️

I love you more than I can put into words. ❤️`;

function showLetterScene() {

    stopMicrophone();

    stopMusic();


    showScreen(letterScene);


    if (envelopeWrapper) {

        envelopeWrapper.classList.remove(
            "open"
        );

        envelopeWrapper.classList.remove(
            "hidden"
        );

    }


    if (loveLetter) {

        loveLetter.classList.add(
            "hidden"
        );

    }


    if (continueLetter) {

        continueLetter.classList.add(
            "hidden"
        );

    }


    if (letterText) {

        letterText.textContent = "";

    }

}


/* ---------------------------------------------------------
   Envelope
--------------------------------------------------------- */

let envelopeOpened = false;


if (envelopeWrapper) {

    envelopeWrapper.addEventListener(
        "click",
        () => {

            if (envelopeOpened)
                return;


            envelopeOpened = true;

            clickSound();


            envelopeWrapper.classList.add(
                "open"
            );


            setTimeout(() => {

                envelopeWrapper.classList.add(
                    "hidden"
                );


                if (loveLetter) {

                    loveLetter.classList.remove(
                        "hidden"
                    );

                }


                /*
                   Romantic music starts
                   AFTER envelope opens.
                */
                playMusic(
                    audio.romantic
                );


                typeLetter();

            }, 1200);

        }
    );

}


/* ---------------------------------------------------------
   Typing
--------------------------------------------------------- */

function typeLetter() {

    if (!letterText)
        return;


    letterText.textContent = "";


    let index = 0;


    const typing =
        setInterval(() => {

            if (
                index >=
                LOVE_LETTER_TEXT.length
            ) {

                clearInterval(
                    typing
                );


                setTimeout(() => {

                    if (continueLetter) {

                        continueLetter.classList.remove(
                            "hidden"
                        );

                    }

                }, 700);


                return;

            }


            letterText.textContent +=
                LOVE_LETTER_TEXT[index];


            index++;

        }, 28);

}


/* =========================================================
   13. LETTER → GAME INTRO
========================================================= */

if (continueButton) {

    continueButton.addEventListener(
        "click",
        () => {

            clickSound();

            stopMusic();

            if (letterScene) {

                letterScene.classList.add(
                    "hidden"
                );

            }


            if (wishTransition) {

                wishTransition.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


/* =========================================================
   14. FUN TIME QUESTIONS
========================================================= */

const FUN_TIME_QUESTIONS = [

    {
        question:
            "Who fell harder? 👀",

        answers: [
            "Me 😌",
            "You ❤️"
        ],

        credits: [2, 3],

        reactions: [
            "Okayyy... acting confident, I see 😏",
            "I KNEW IT. Come here, you ❤️"
        ],

        reactionClass: "boy-happy"
    },


    {
        question:
            "Who is more likely to steal a kiss first? 💋",

        answers: [
            "Me 😏",
            "You 👀"
        ],

        credits: [3, 4],

        reactions: [
            "Ohhh... someone's confident 😏",
            "I knew you'd admit it eventually 😂❤️"
        ],

        reactionClass: "boy-teasing"
    },


    {
        question:
            "If we had a whole day alone together, what would you choose? 😌",

        answers: [
            "Cuddles & movies 🥰",
            "Trouble & kisses 😏"
        ],

        credits: [3, 5],

        reactions: [
            "Aww... come here then 🥹❤️",
            "Oh? Someone chose chaos 😏"
        ],

        reactionClass: "boy-love"
    },


    {
        question:
            "Who gets jealous more easily? 👀",

        answers: [
            "Me 😤",
            "You 😂"
        ],

        credits: [3, 4],

        reactions: [
            "Protective much? 😂❤️",
            "Don't even try to deny it 😭"
        ],

        reactionClass: "boy-shocked"
    },


    {
        question:
            "What do you secretly love more? ❤️",

        answers: [
            "My hugs 🫂",
            "My kisses 💋"
        ],

        credits: [3, 5],

        reactions: [
            "I'll take that hug... for now 🥹",
            "Now we're talking 💋😏"
        ],

        reactionClass: "boy-love"
    },


    {
        question:
            "If I suddenly pulled you closer... 😏",

        answers: [
            "I'd melt 🫠",
            "I'd tease you back 😈"
        ],

        credits: [4, 6],

        reactions: [
            "That reaction would be adorable 🥹❤️",
            "Ohhh... you're dangerous 😏"
        ],

        reactionClass: "boy-teasing"
    },


    {
        question:
            "Who is more dangerous when we're alone? 👀",

        answers: [
            "Me 😏",
            "Definitely you 😂"
        ],

        credits: [4, 5],

        reactions: [
            "Bold answer. I like it 😏",
            "Exactly. I knew it 😂❤️"
        ],

        reactionClass: "boy-teasing"
    },


    {
        question:
            "Your favorite kind of affection from me? 🥹",

        answers: [
            "Forehead kisses ❤️",
            "Long hugs 🫂"
        ],

        credits: [3, 4],

        reactions: [
            "That's actually really sweet 🥹",
            "Come here then 🫂❤️"
        ],

        reactionClass: "boy-love"
    },


    {
        question:
            "If I whispered 'come here'... 👀",

        answers: [
            "I'm already coming 😌",
            "Make me 😏"
        ],

        credits: [5, 6],

        reactions: [
            "Good choice... come here ❤️",
            "Oh, you're testing me now 😏"
        ],

        reactionClass: "boy-teasing"
    },


    {
        question:
            "Who would lose a staring contest first? 👀",

        answers: [
            "Me 😂",
            "You 😏"
        ],

        credits: [3, 4],

        reactions: [
            "You'd totally look away first 😂",
            "That confidence is dangerous 😏"
        ],

        reactionClass: "boy-happy"
    },


    {
        question:
            "What would you choose right now? ❤️",

        answers: [
            "One long hug 🫂",
            "Three kisses 💋"
        ],

        credits: [4, 6],

        reactions: [
            "Aww... hug incoming 🥹",
            "Three? Someone's greedy 😏💋"
        ],

        reactionClass: "boy-love"
    },


    {
        question:
            "If I started teasing you nonstop... 😈",

        answers: [
            "I'd blush 🥹",
            "I'd get revenge 😏"
        ],

        credits: [4, 6],

        reactions: [
            "That blush would be so cute 😂❤️",
            "Oh no... I'm in trouble 😭😏"
        ],

        reactionClass: "boy-shocked"
    },


    {
        question:
            "Who is more clingy? 😂❤️",

        answers: [
            "Me 🫂",
            "You 👀"
        ],

        credits: [3, 4],

        reactions: [
            "You? Never. Definitely not 😂",
            "I KNEW IT 😭❤️"
        ],

        reactionClass: "boy-happy"
    },


    {
        question:
            "If we were watching a movie together, what would probably happen? 😏",

        answers: [
            "We'd actually watch the movie 😇",
            "The movie would become background noise 😂"
        ],

        credits: [3, 6],

        reactions: [
            "Sure... totally believable 😂",
            "Yeah, I saw that coming 😏"
        ],

        reactionClass: "boy-teasing"
    },


    {
        question:
            "One thing you can never say no to from me? 🥹",

        answers: [
            "A hug ❤️",
            "A kiss 💋"
        ],

        credits: [4, 6],

        reactions: [
            "I'll remember that ❤️",
            "Interesting answer... very interesting 😏💋"
        ],

        reactionClass: "boy-love"
    },


    {
        question:
            "If I gave you a surprise date tonight... 👀",

        answers: [
            "Dress up and come with me ✨",
            "\"Tell me where we're going first!\" 😂"
        ],

        credits: [4, 5],

        reactions: [
            "That's my girl ❤️",
            "Still suspicious, huh? 😂"
        ],

        reactionClass: "boy-happy"
    },


    {
        question:
            "Be honest... who is the bigger flirt? 😏",

        answers: [
            "Me 😌",
            "You 😈"
        ],

        credits: [5, 6],

        reactions: [
            "That's a very confident answer 😏",
            "Finally, the truth comes out 😂❤️"
        ],

        reactionClass: "boy-teasing"
    },


    {
        question:
            "If you could choose one thing from me right now... 💋",

        answers: [
            "A warm hug that lasts forever 🫂❤️",
            "A kiss you won't forget 💋"
        ],

        credits: [8, 10],

        reactions: [
            "Come here... that's actually adorable 🥹❤️",
            "Ohhh... saving the best answer for last 😏💋"
        ],

        reactionClass: "boy-love"
    }

];


/* =========================================================
   15. GAME STATE
========================================================= */

let currentGameQuestion = 0;

let selectedGameAnswer = null;

let totalKissCredits = 0;

let gameLocked = false;

let reactionTimer = null;


/* =========================================================
   16. GAME INITIALIZE
========================================================= */

function initializeGame() {

    currentGameQuestion = 0;

    selectedGameAnswer = null;

    totalKissCredits = 0;

    gameLocked = false;


    if (kissCredits) {
        kissCredits.textContent = "0";
    }


    if (kissVoucher) {
        kissVoucher.classList.add(
            "hidden"
        );
    }


    if (gameScreen) {
        gameScreen.classList.remove(
            "game-completed"
        );
    }


    gameTotalQuestions.textContent =
        FUN_TIME_QUESTIONS.length;


    renderGameQuestion();

}


/* =========================================================
   17. RENDER QUESTION
========================================================= */

function renderGameQuestion() {

    const question =
        FUN_TIME_QUESTIONS[
            currentGameQuestion
        ];


    if (!question) {

        finishGame();

        return;

    }


    selectedGameAnswer = null;

    gameLocked = false;


    if (gameQuestionNumber) {

        gameQuestionNumber.textContent =
            currentGameQuestion + 1;

    }


    if (gameTotalQuestions) {

        gameTotalQuestions.textContent =
            FUN_TIME_QUESTIONS.length;

    }


    if (questionNumber) {

        questionNumber.textContent =
            "QUESTION " +
            (currentGameQuestion + 1);

    }


    if (questionText) {

        questionText.textContent =
            question.question;

    }


    if (selectionMessage) {

        selectionMessage.textContent = "";

    }


    if (submitAnswerButton) {

        submitAnswerButton.disabled = true;

        submitAnswerButton.textContent =
            "Submit ❤️";

    }


    resetBoy();


    renderAnswers(
        question
    );

}


/* =========================================================
   18. ANSWER BUTTONS
========================================================= */

function renderAnswers(question) {

    if (!answerOptions)
        return;


    answerOptions.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "answer-button";

            button.dataset.answer =
                index;

            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(index);

                }
            );


            answerOptions.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   19. SELECT ANSWER
   Answer select = reaction starts
========================================================= */

function selectAnswer(index) {

    if (gameLocked)
        return;


    selectedGameAnswer =
        index;


    const question =
        FUN_TIME_QUESTIONS[
            currentGameQuestion
        ];


    const buttons =
        answerOptions
            ? answerOptions.querySelectorAll(
                ".answer-button"
            )
            : [];


    buttons.forEach(
        (button, buttonIndex) => {

            button.classList.toggle(
                "selected",
                buttonIndex === index
            );

        }
    );


    if (selectionMessage) {

        selectionMessage.textContent =
            "Hmm... interesting choice 👀❤️";

    }


    if (submitAnswerButton) {

        submitAnswerButton.disabled =
            false;

    }


    /*
       BOY REACTION START
    */
    showBoyReaction(
        question.reactions[index],
        question.reactionClass
    );

}


/* =========================================================
   20. BOY REACTION
   (FIXED: face class mapping + body bounce trigger)
========================================================= */

function showBoyReaction(text, reactionClass) {

    if (boyReaction) {

        boyReaction.textContent = text;

        boyReaction.classList.remove(
            "reaction-visible"
        );

        void boyReaction.offsetWidth;

        boyReaction.classList.add(
            "reaction-visible"
        );
    }


    const face =
        document.getElementById("cuteBoy");

    if (!face) return;


    /*
       reactionClass comes in as "boy-happy" etc.
       Face CSS classes are named "face-happy" etc.
    */
    const faceClass =
        (reactionClass || "boy-normal").replace(
            "boy-",
            "face-"
        );


    face.classList.remove(
        "face-normal",
        "face-happy",
        "face-shy",
        "face-teasing",
        "face-love",
        "face-shocked",
        "face-sad"
    );


    void face.offsetWidth;


    face.classList.add(
        faceClass
    );


    /*
       Body-level bounce animation.
    */
    if (boyCharacter) {

        boyCharacter.classList.remove(
            "boy-happy",
            "boy-teasing",
            "boy-love",
            "boy-shocked"
        );

        void boyCharacter.offsetWidth;

        boyCharacter.classList.add(
            reactionClass || "boy-happy"
        );

    }

}


/* =========================================================
   21. RESET BOY
========================================================= */

function resetBoy() {

    if (reactionTimer) {
        clearTimeout(reactionTimer);
        reactionTimer = null;
    }


    if (boyReaction) {
        boyReaction.textContent =
            "I'm waiting... 👀";

        boyReaction.classList.remove(
            "reaction-visible"
        );
    }


    const face =
        document.getElementById("cuteBoy");

    if (face) {

        face.classList.remove(
            "face-normal",
            "face-happy",
            "face-shy",
            "face-teasing",
            "face-love",
            "face-shocked",
            "face-sad"
        );

        face.classList.add(
            "face-normal"
        );

    }


    if (boyCharacter) {

        boyCharacter.classList.remove(
            "boy-happy",
            "boy-teasing",
            "boy-love",
            "boy-shocked"
        );

    }

}


/* =========================================================
   22. SUBMIT ANSWER
   Submit = reaction ends → next question
========================================================= */

function submitAnswer() {

    if (
        selectedGameAnswer === null ||
        gameLocked
    ) {
        return;
    }


    gameLocked = true;


    const question =
        FUN_TIME_QUESTIONS[
            currentGameQuestion
        ];


    const earned =
        question.credits[
            selectedGameAnswer
        ];


    totalKissCredits +=
        earned;


    if (kissCredits) {

        kissCredits.textContent =
            totalKissCredits;

    }


    if (selectionMessage) {

        selectionMessage.textContent =
            "+" +
            earned +
            " Kiss Credits 💋";

    }


    if (submitAnswerButton) {

        submitAnswerButton.disabled =
            true;

        submitAnswerButton.textContent =
            "Next ❤️";

    }


    /*
       Disable answers.
    */
    if (answerOptions) {

        answerOptions
            .querySelectorAll(
                ".answer-button"
            )
            .forEach(button => {

                button.disabled = true;

            });

    }


    /*
       Reaction END.
    */
    if (boyReaction) {

        boyReaction.classList.remove(
            "reaction-visible"
        );

    }


    if (boyCharacter) {

        boyCharacter.classList.remove(
            "boy-happy",
            "boy-teasing",
            "boy-love",
            "boy-shocked"
        );

    }


    /*
       Small pause.
       Then next question gets its own fresh reaction.
    */
    reactionTimer =
        setTimeout(() => {

            currentGameQuestion++;


            if (
                currentGameQuestion >=
                FUN_TIME_QUESTIONS.length
            ) {

                finishGame();

                return;

            }


            renderGameQuestion();

        }, 1500);

}


/* =========================================================
   23. SUBMIT BUTTON
========================================================= */

if (submitAnswerButton) {

    submitAnswerButton.addEventListener(
        "click",
        () => {

            clickSound();

            submitAnswer();

        }
    );

}


/* =========================================================
   FINAL GAME — SHOW VOUCHER
========================================================= */

function finishGame() {

    gameLocked = true;

    if (reactionTimer) {
        clearTimeout(reactionTimer);
        reactionTimer = null;
    }

    // Boy aur question hide karo
    if (boyCharacterArea) {
        boyCharacterArea.classList.add("hidden");
    }

    if (questionArea) {
        questionArea.classList.add("hidden");
    }

    // Existing voucher function ko call karo
    setTimeout(() => {

        showVoucher();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 500);
}
/* =========================================================
   25. KISS VOUCHER
========================================================= */

function showVoucher() {

    if (!kissVoucher)
        return;

    if (voucherAmount) {

        voucherAmount.textContent =
            totalKissCredits +
            " KISS CREDITS 💋";

    }

    kissVoucher.classList.remove(
        "hidden"
    );

    kissVoucher.classList.add(
        "voucher-unlocked"
    );

    if (gameScreen) {

        gameScreen.classList.add(
            "game-completed"
        );

    }

    clickSound();
}
/* =========================================================
   26. START GAME
========================================================= */

if (startGameButton) {

    startGameButton.addEventListener(
        "click",
        () => {

            clickSound();

            stopMusic();


            if (wishTransition) {

                wishTransition.classList.add(
                    "hidden"
                );

            }


            if (gameScreen) {

                gameScreen.classList.remove(
                    "hidden"
                );

            }


            /*
               Game music starts ONLY here.
            */
            playMusic(
                audio.game
            );


            initializeGame();

        }
    );

}


/* =========================================================
   27. EXTRA BUTTON CLICK SOUND
========================================================= */

document
    .querySelectorAll("button")
    .forEach(button => {

        const ignored = [
            "unlockButton",
            "blowButton",
            "continueButton",
            "startGameButton",
            "submitAnswerButton"
        ];


        if (
            ignored.includes(
                button.id
            )
        ) {
            return;
        }


        button.addEventListener(
            "click",
            clickSound
        );

    });


/* =========================================================
   DONE
========================================================= */

console.log(
    "❤️ FUN TIME loaded successfully."
);

console.log(
    "🎆 10-second fireworks ready."
);

console.log(
    "🎤 Microphone candle blow ready."
);

console.log(
    "🎮 18-question game ready."
);

console.log(
    "👦🏻 Boy reaction system ready (face + body fixed)."
);
