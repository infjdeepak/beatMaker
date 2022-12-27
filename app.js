class Beatmaker {
  constructor() {
    this.muteBtns = document.querySelectorAll(".mute");
    this.selects = document.querySelectorAll("select");
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.currentKickAudio = "./sounds/kick-classic.wav";
    this.currentSnareAudio = "./sounds/snare-acoustic01.wav";
    this.currentHihatAudio = "./sounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-audio");
    this.snareAudio = document.querySelector(".snare-audio");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  padActive() {
    this.classList.toggle("active");
  }
  repeat() {
    const step = this.index % 8;
    const activebars = document.querySelectorAll(`.b${step}`);
    activebars.forEach((bar) => {
      bar.style.animation = "animationScale 0.4s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeAudio(e) {
    const selectName = e.target.name;
    this.currentKickAudio = e.target.value;
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = this.currentKickAudio;
        break;
      case "snare-select":
        this.snareAudio.src = this.currentKickAudio;
        break;
      case "hihat-select":
        this.hihatAudio.src = this.currentKickAudio;
        break;
    }
  }
  mute(e) {
    const track = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (track) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (track) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  updateTempo(e) {
    const tempo = e.target.value;
    const tempoNr = document.querySelector(".tempo-nr");
    tempoNr.innerText = tempo;
  }
  changeTempo(e) {
    const tempo = e.target.value;
    this.bpm = tempo;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumkit = new Beatmaker();

drumkit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    drumkit.mute(e);
  });
});
drumkit.selects.forEach((select) => {
  select.addEventListener("change", (e) => {
    drumkit.changeAudio(e);
  });
});

drumkit.pads.forEach((pad) => {
  pad.addEventListener("click", drumkit.padActive);
  pad.addEventListener("animationend", () => {
    pad.style.animation = "";
  });
});
drumkit.playBtn.addEventListener("click", () => {
  drumkit.start();
  drumkit.updateBtn();
});

drumkit.tempoSlider.addEventListener("input", (e) => {
  drumkit.updateTempo(e);
});

drumkit.tempoSlider.addEventListener("change", (e) => {
  drumkit.changeTempo(e);
});
