const showMoreButtonAction = () => {
    const button = document.querySelector("#show-more");
    const productsContainer = document.querySelector("#products-container");
    const productsSlider = productsContainer.querySelectorAll("#products-slider article");
    const isMobile =  window.innerWidth <= 640;
    let productsCardsRowHeight = 0;
    let dynamicClass;

    for (let i = 0; i < 4; i++) {
        const element = productsSlider[i];
        productsCardsRowHeight += element.clientHeight;
    }

    productsCardsRowHeight = `${productsCardsRowHeight/2}px`;
    dynamicClass = `max-h-[${productsCardsRowHeight}]`;

    if (isMobile) {
        productsContainer.classList.add(dynamicClass);
    }

    button.addEventListener("click", (e) => {
        e.preventDefault();

        productsContainer.classList.remove(dynamicClass);
        button.remove();
    })
}

showMoreButtonAction();