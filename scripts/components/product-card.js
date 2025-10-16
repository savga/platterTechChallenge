class ProductCard extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        const imgSrc = this.getAttribute('img-src') || '';
        const imgAlt = this.getAttribute('img-alt') || '';
        const title = this.getAttribute('title') || 'Product Title';
        const price = this.getAttribute('price') || '$0.00';
        const badge = this.getAttribute('badge') || '';
        const rating = parseFloat(this.getAttribute('rating')) || 0;
        const reviews = this.getAttribute('reviews') || '0';

        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) starsHtml += '<span>★</span>';
        for (let i = 0; i < emptyStars; i++) starsHtml += '<span class="text-gray-300">★</span>';

        this.innerHTML = `
          <article class="max-w-xs bg-white overflow-hidden">
            <figure class="relative">
              <img src="${imgSrc}" alt="${imgAlt}" class="w-full object-cover aspect-square rounded-xl" />
              ${badge ? `<span 
                class="absolute top-2 left-2 bg-white border border-black rounded-2xl py-[3px] px-[8px]
                       font-bebas-neue font-normal text-font-2xs uppercase tracking-6pct
                       leading-[100%] text-center"
              >${badge}</span>` : ''}
            </figure>

            <div class="py-4 px-3 text-[var(--color-text-primary)]">
              <h2 class="font-bebas-neue text-lg font-normal text-gray-900 uppercase tracking-3pct leading-[100%]">
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