let music = false;

function toggleMusic() {
  const m = document.getElementById("bgMusic");
  if (!music) {
    m.play();
    music = true;
  } else {
    m.pause();
    music = false;
  }
}

function check() {
  const ans = document.getElementById("ans").value.toLowerCase();
  const msg = document.getElementById("msg");

  if (ans === "pannikutty") {
    msg.innerHTML = "My pannikutty 💕<br>I would choose you again, every single time ❤️";
    celebrate();
  } else {
    msg.innerHTML = "Try again 😄";
  }
}

function celebrate() {
  alert("🎉 Happy Anniversary ❤️");
}
