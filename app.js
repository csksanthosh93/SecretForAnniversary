// Anniversary Website JavaScript
let index = 0;
const total = 5;

// Animate hearts on page load
window.addEventListener('load', () => {
  // Mark first section as active
  const firstSection = document.querySelector('.section');
  if(firstSection) firstSection.classList.add('active');
  
  // Show first two hearts
  setTimeout(() => {
    document.getElementById('heart1').classList.add('show');
  }, 500);
  
  setTimeout(() => {
    document.getElementById('heart2').classList.add('show');
  }, 900);
  
  // Wait longer, then show third heart (Moshika) with message
  setTimeout(() => {
    const heart3 = document.getElementById('heart3');
    const heartText = document.getElementById('heart-text');
    if(heart3) {
      heart3.style.visibility = 'visible';
      heart3.classList.add('show');
    }
    if(heartText) heartText.textContent = 'Two hearts became three…';
  }, 5000);
  
  setTimeout(() => {
    document.getElementById('moshika-msg').classList.add('show');
  }, 5600);
  
  // Show family text
  setTimeout(() => {
    document.getElementById('family-text').classList.add('show');
  }, 6400);
  
  // Initialize quiz
  renderQuiz();
  const btnScore = document.getElementById('quiz-score');
  const btnReset = document.getElementById('quiz-reset');
  if(btnScore) btnScore.addEventListener('click', quizScore);
  if(btnReset) btnReset.addEventListener('click', quizReset);
});

// Navigation function
function move(direction) {
  const container = document.getElementById("container");
  const sections = container.querySelectorAll('.section');
  
  // Fade out current section
  if(sections[index]) {
    sections[index].style.opacity = '0.5';
    sections[index].style.transform = 'scale(0.95)';
    sections[index].classList.remove('active');
  }
  
  index = Math.min(Math.max(index + direction, 0), total - 1);
  container.style.transform = `translateX(-${index * 100}vw)`;
  
  // Fade in new section
  setTimeout(() => {
    if(sections[index]) {
      sections[index].style.opacity = '1';
      sections[index].style.transform = 'scale(1)';
      sections[index].classList.add('active');
    }
  }, 300);
  
  // Reset heart animations when returning to first page
  if (index === 0) {
    setTimeout(() => {
      const h1 = document.getElementById('heart1');
      const h2 = document.getElementById('heart2');
      const h3 = document.getElementById('heart3');
      const msg = document.getElementById('moshika-msg');
      const fam = document.getElementById('family-text');
      
      if(h1) h1.classList.add('show');
      if(h2) h2.classList.add('show');
      if(h3) h3.classList.add('show');
      if(msg) msg.classList.add('show');
      if(fam) fam.classList.add('show');
    }, 600);
  }
}

// Check secret answer
function check() {
  const ans = document.getElementById("ans").value.toLowerCase();
  const msg = document.getElementById("msg");
  const letter = document.getElementById("love-letter");

  if (ans === "pannikutty" || ans === "pannikutti" || ans === "piggy") {
    msg.style.color = "#ff69b4";
    msg.innerHTML = "✅ Correct! My pannikutty 💕<br>Revealing your love letter...";
    
    // Show and fade in the love letter with animation
    setTimeout(() => {
      if(letter) {
        letter.style.display = "block";
        letter.style.animation = "revealLetter 1.5s ease forwards";
        setTimeout(() => {
          letter.style.opacity = "1";
          letter.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 100);
      }
      confetti();
    }, 800);
  } else {
    msg.style.color = "#ffb6c1";
    msg.innerHTML = "Try again 😄";
    if(letter) {
      letter.style.display = "none";
      letter.style.opacity = "0";
    }
  }
}

// Confetti celebration
function confetti() {
  // Simple confetti effect using alert for now
  // You can integrate a confetti library like canvas-confetti for better effect
  setTimeout(() => {
    alert("🎉 Happy Anniversary! 🎉\n\nI love you more each day ❤️");
  }, 100);
}

function scrollGallery(direction) {
  const gallery = document.getElementById('memories-gallery');
  if (!gallery) return;
  const step = gallery.clientWidth + 16;
  gallery.scrollBy({ left: direction * step, behavior: 'smooth' });
}

function initGalleryNavigation() {
  const gallery = document.getElementById('memories-gallery');
  if (!gallery) return;

  gallery.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      gallery.scrollBy({ left: event.deltaY * 1.2, behavior: 'smooth' });
    }
  }, { passive: false });
}

// Mobile swipe support
let startX = 0;
let touchStartedInGallery = false;
document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  touchStartedInGallery = !!e.target.closest('#memories-gallery');
}, { passive: true });

document.addEventListener("touchend", e => {
  if (touchStartedInGallery) {
    touchStartedInGallery = false;
    return;
  }
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? move(1) : move(-1);
  }
});

window.addEventListener('load', initGalleryNavigation);

// ==== Quiz Data & Logic ====
const quizData = [
  {
    q: 'In our relationship, who is always right?',
    options: ['Divya (Obviously)', 'Santhosh', 'Moshika', 'Google'],
    answer: 0,
    messages: {
      correct: 'Correct! Choosing Divya is always the right choice 😌',
      wrong: 'Nice try! The law (of love) says: Divya wins.'
    }
  },
  {
    q: 'When a small fight happens, who apologizes first?',
    options: ['Santhosh', 'Divya', 'Moshika', 'Nobody'],
    answer: 0,
    messages: {
      correct: 'Peace > ego. Santhosh presses the reset button 😇',
      wrong: 'Hmm… try the one who loves peace the most.'
    }
  },
  {
    q: 'What does Santhosh fear the most?',
    options: ["Divya's silence", 'Forgetting an important date', 'Not getting her food when she craves', "Moshika's 'Appaaaaa!'"],
    answer: [0, 2],
    messages: {
      correct: 'Yes! Both silence AND food cravings = maximum danger 😶🍕',
      wrong: 'Danger levels vary… but silence and food both win.'
    }
  },
  {
    q: "What was Divya's first impression of me?",
    options: ['"Cute fellow… maybe."', '"Why is he smiling like that?"', '"He looks harmless."', '"Okay let me think."'],
    answer: 0,
    messages: {
      correct: "We'll take that \"maybe\" as a yes 😊",
      wrong: 'Ahem, surely a little cuteness was noticed!'
    }
  },
  {
    q: 'Which one describes our love story best?',
    options: ['Started with a smile', 'Unlimited teasing', 'Powered by biryani', 'Certified by Moshika'],
    answer: 3,
    messages: {
      correct: 'Certified by the boss herself 👶💖',
      wrong: 'All true, but one tiny queen seals the deal.'
    }
  },
  {
    q: "What's Santhosh's survival strategy at home?",
    options: ['Say YES to everything', 'Blame it on Moshika', 'Pretend not to hear', 'Offer chocolate as bribe'],
    answer: 0,
    messages: {
      correct: 'Smart man! "Yes, dear" = peace formula 😄',
      wrong: 'Close, but universal YES is the golden rule!'
    }
  },
  {
    q: 'What is the most romantic thing Santhosh has done?',
    options: ['This website', 'Chocolate at the right time', 'Random hugs', 'Not disturbing when she sleeps'],
    answer: 0,
    messages: {
      correct: 'This site = heart project 🥹',
      wrong: "Sweet options, but this one is today's star!"
    }
  },
  {
    q: 'Who does Moshika love the most (dangerous question)?',
    options: ['Appa', 'Amma', 'Herself', 'Awkward silence when tricky questions pop up 😬'],
    answer: 3,
    messages: {
      correct: 'Haha! Classic dad move = deflect with silence 🤫😂',
      wrong: 'Nice try, but dad knows how to dodge this one!'
    }
  }
];

function renderQuiz(){
  const wrap = document.getElementById('quiz-container');
  if(!wrap) return;
  wrap.innerHTML = '';

  quizData.forEach((item, qi)=>{
    const q = document.createElement('div');
    q.className = 'q';
    q.setAttribute('data-qi', qi);

    const title = document.createElement('div');
    title.className = 'q-title';
    title.textContent = `${qi+1}. ${item.q}`;
    q.appendChild(title);

    const opts = document.createElement('div');
    opts.className = 'options';

    item.options.forEach((opt, oi)=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option';
      btn.setAttribute('data-oi', oi);
      btn.innerHTML = `
        <span>${['✔️','❌','🍼','🤖','😆','😇','💖','🍫','🍿','🎉'][oi%10] || '•'}</span>
        <span>${opt}</span>`;

      btn.addEventListener('click', ()=>{
        if(q.classList.contains('answered')) return;
        const correctAnswers = Array.isArray(item.answer) ? item.answer : [item.answer];
        const correct = correctAnswers.includes(oi);
        btn.classList.add('selected');
        btn.classList.add(correct ? 'correct' : 'wrong');
        q.classList.add('answered');
        const all = opts.querySelectorAll('.option');
        all.forEach((b, j)=>{
          if(correctAnswers.includes(j)) b.classList.add('correct');
          if(b !== btn) b.disabled = true;
        });
        fb.textContent = correct ? item.messages.correct : item.messages.wrong;
      });

      opts.appendChild(btn);
    });

    const fb = document.createElement('div');
    fb.className = 'feedback';
    fb.textContent = '';

    q.appendChild(opts);
    q.appendChild(fb);
    wrap.appendChild(q);
  });
}

function quizScore(){
  const qs = Array.from(document.querySelectorAll('.q'));
  let correct = 0, answered = 0;
  qs.forEach(q=>{
    if(q.classList.contains('answered')){
      answered++;
      const chosen = q.querySelector('.option.selected');
      if(chosen && chosen.classList.contains('correct')) correct++;
    }
  });
  const out = document.getElementById('quiz-result');
  if(out){
    out.textContent = `Answered: ${answered}/${quizData.length} · Score: ${correct}`;
    if(answered === quizData.length){
      if(correct === quizData.length){
        confetti();
        out.textContent += ' — Perfect! You know us best! 💯';
      } else if(correct >= Math.ceil(quizData.length*0.7)){
        out.textContent += ' — Great job! 🥳';
      } else {
        out.textContent += ' — Cute try! Now ask for a hug ❤️';
      }
    }
  }
}

function quizReset(){
  renderQuiz();
  const out = document.getElementById('quiz-result');
  if(out) out.textContent = '';
}