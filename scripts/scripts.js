const isMobile = () => window.innerWidth <= 640;

const showMoreButtonAction = () => {
    const button = document.querySelector("#show-more");
    const productsContainer = document.querySelector("#products-container");
    const productsSlider = productsContainer.querySelectorAll("#products-slider article");

    let productsCardsRowHeight = 0;
    let dynamicClass;

    for (let i = 0; i < 4; i++) {
        const element = productsSlider[i];
        productsCardsRowHeight += element.clientHeight;
    }

    productsCardsRowHeight = `${productsCardsRowHeight/2}px`;
    dynamicClass = `max-h-[${productsCardsRowHeight}]`;
    
    productsContainer.classList.add(dynamicClass);

    button.addEventListener("click", (e) => {
        e.preventDefault();

        productsContainer.classList.remove(dynamicClass);
        button.remove();
    })
}

const customScrollbar = () => {
    const scrollContainer = document.getElementById("products-container");
    const scrollbar = document.getElementById("custom-scrollbar");
    const thumb = document.getElementById("thumb");

    let isDragging = false;
    let startX, startLeft;

    thumb.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX;
        startLeft = parseInt(window.getComputedStyle(thumb).left, 10);
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        let newLeft = startLeft + dx;

        newLeft = Math.max(0, Math.min(newLeft, scrollbar.clientWidth - thumb.clientWidth));
        thumb.style.left = newLeft + "px";

        const scrollPercent = newLeft / (scrollbar.clientWidth - thumb.clientWidth);
        scrollContainer.scrollLeft = scrollPercent * (scrollContainer.scrollWidth - scrollContainer.clientWidth);
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

const handleViewportChange = () => {
  if (isMobile()) {
    showMoreButtonAction();
  } else {
    customScrollbar();
  }
};

handleViewportChange();

window.addEventListener("resize", () => {
    handleViewportChange();
});
