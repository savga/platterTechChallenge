class ProductCard extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        const imgSrc = this.getAttribute('img-src') || '';
        const imgAlt = this.getAttribute('img-alt') || '';
        const title = this.getAttribute('title') || 'Product Title';
        const price = this.getAttribute('price') || '$0.00';
        const leftBadge = this.getAttribute('left-badge') || '';
        const rightBadge = this.getAttribute('right-badge') || '';
        const rating = parseFloat(this.getAttribute('rating')) || 0;
        const reviews = this.getAttribute('reviews') || '0';

        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) starsHtml += '<span class="text-font-2xs md:text-xs">★</span>';
        for (let i = 0; i < emptyStars; i++) starsHtml += '<span class="text-gray-300 text-font-2xs md:text-xs">★</span>';

        this.innerHTML = `
          <article class="flex-none">
            <figure class="relative">
              <img src="${imgSrc}" alt="${imgAlt}" class="w-full object-cover aspect-square rounded-xl" />
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
                <div class="flex text-[var(--color-text-neutral-black)]" aria-hidden="true">
                  ${starsHtml}
                </div>
                <span class="text-xs text-[var(--color-text-gray)] ml-2 font-poppins font-normal">${reviews} reviews</span>
              </div>

              <p class="text-[var(--color-text-primary)] text-base font-medium font-poppins">$${price}</p>
            </div>
          </article>
        `;
      }
    }

    customElements.define('product-card', ProductCard);