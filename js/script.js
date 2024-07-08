window.addEventListener("DOMContentLoaded", () => {
  const slideWrapper = document.querySelector(".offer__slider-wrapper"),
    slideField = document.querySelector(".offer__slider-inner"),
    slides = document.querySelectorAll(".offer__slide"),
    next = document.querySelector(".offer__slider-next"),
    prev = document.querySelector(".offer__slider-prev"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    width = getComputedStyle(slideField).width,
    slider = document.querySelector(".offer__slider");

  let slideIndex = 1,
    offset = 0;

  slideField.style.width = 100 * slides.length + "%";
  slideField.style.display = "flex";
  slideField.style.transition = ".5s ease";
  slideWrapper.style.overflow = "hidden";

  slider.style.position = "relative";
  let indicator = document.createElement("ol"),
    dots = [];
  indicator.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicator);

  for (let i = 1; i <= slides.length; i++) {
    const dot = document.createElement("ul");
    dot.setAttribute("data-slide-to", i);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      margin-bottom: 10px;
      cursor: pointer;
      background-color: #fff;
      bvackground-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opasity .6 ease;
      border-radius: 50%;
    `;
    indicator.append(dot);

    if (i == 1) {
      dot.style.opacity = 1;
    }

    dots.push(dot);
  }

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = `${slides.length}`;
    current.textContent = `${slideIndex}`;
  }

  slides.forEach((item) => {
    item.style.width = width;
  });

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slideField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    current.textContent = `0${slideIndex}`;

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slideField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((item) => {
    item.addEventListener("click", (e) => {
      const dataTo = e.target.getAttribute("data-slide-to");
      slideIndex = dataTo;

      offset = +width.slice(0, width.length - 2) * (dataTo - 1);
      slideField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
});
