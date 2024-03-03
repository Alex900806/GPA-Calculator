let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();
// parameter1 是要控制的對象
// parameter2 是duration
// parameter3 是控制對象的原始狀態
// parameter4 是控制對象的動畫結束後的狀態
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(slider, 1, { z: "-100%" }, { z: "0%", ease: Power2.easeInOut }, "-=1")
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// 動畫結束設定
setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2000);
