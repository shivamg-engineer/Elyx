document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img[data-src]");

  const lazyLoad = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.onload = () => img.classList.add("loaded");
         img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  };

  const observer = new IntersectionObserver(lazyLoad, { threshold: 0.1 });
  lazyImages.forEach(img => observer.observe(img));
});