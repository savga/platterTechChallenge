class ProductCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const imgName = this.getAttribute('img-name') || '';
    const imgNameHover = this.getAttribute('img-name-hover') || '';
    const imgAlt = this.getAttribute('img-alt') || '';
    const title = this.getAttribute('title') || 'Product Title';
    const price = this.getAttribute('price') || '$0.00';
    const leftBadge = this.getAttribute('left-badge') || '';
    const rightBadge = this.getAttribute('right-badge') || '';
    const rating = parseFloat(this.getAttribute('rating')) || 0;
    const reviews = this.getAttribute('reviews') || '0';

    this.innerHTML = `
      <article class="flex-none">
        <figure class="relative">
          <img
            src="./images/${imgName}-1200.jpg"
            srcset="
              ./images/${imgName}-400.jpg 400w,
              ./images/${imgName}-800.jpg 800w
            "
            sizes="(max-width: 600px) 400px, (max-width: 900px) 800px"
            class="w-full object-cover aspect-square rounded-xl default-image"
            alt="${imgAlt}"
          />
          <img
            src="./images/${imgNameHover}-1200.jpg"
            srcset="
              ./images/${imgNameHover}-400.jpg 400w,
              ./images/${imgNameHover}-800.jpg 800w
            "
            sizes="(max-width: 600px) 400px, (max-width: 900px) 800px"
            class="w-full object-cover aspect-square rounded-xl hover-image"
            alt="${imgAlt}"
          />
          ${leftBadge ? `<span 
            class="absolute top-2 left-1 bg-white border border-black rounded-2xl py-[4px] px-[8px]
                    font-bebas-neue font-normal text-font-2xs uppercase tracking-6pct
                    leading-[100%] text-center text-xs"
          >${leftBadge}</span>` : ''}
          ${rightBadge ? `<span 
            class="absolute top-2 right-1 bg-[var(--color-bg-secondary)] border border-black rounded-2xl py-[4px] px-[8px]
                    font-bebas-neue font-normal text-font-2xs uppercase tracking-6pct
                    leading-[100%] text-center text-white text-xs"
          >${rightBadge}</span>` : ''}
        </figure>

        <div class="p-[8px] md:p-[12px] text-[var(--color-text-primary)] flex flex-wrap md:flex-col">
          <h2 class="font-bebas-neue text-base md:text-lg font-normal text-gray-900 uppercase tracking-3pct leading-[100%] whitespace-normal">
            ${title}
          </h2>

          <div class="flex items-center my-1" aria-label="${rating} out of 5 stars based on ${reviews} reviews">
            <div class="flex text-[var(--color-text-neutral-black)] stars" aria-hidden="true">
              ★★★★★
            </div>
            <span class="text-xs text-[var(--color-text-gray)] ml-2 font-poppins font-normal">${reviews} reviews</span>
          </div>

          <p class="text-[var(--color-text-primary)] text-base font-medium font-poppins">
            $${price}
          </p>
        </div>
      </article>
    `;

    this.calculateStarsRating();
    this.handleViewportChange();

    window.addEventListener("resize", () => this.handleViewportChange());
  }  

  isMobile = () => window.innerWidth <= 640;

  showMoreButtonAction = () => {
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

  customScrollbar = () => {
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

  calculateStarsRating = () => {
    const stars = this.querySelectorAll('.stars');
    const rating = this.dataset.rating || 0;

    stars.forEach(star => {
      star.style.setProperty('--rating', rating);
    });
  }

  handleViewportChange = () => {
    if (this.isMobile()) {
      this.showMoreButtonAction();
    } else {
      this.customScrollbar();
    }
  }
}

customElements.define('product-card', ProductCard);
