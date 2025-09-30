/**
 * CareGo Blog Content Populator
 * Populates existing Webflow structure with real blog content
 */

class BlogContentPopulator {
  constructor() {
    this.blogData = null;
    this.filteredPosts = [];
    this.currentCategory = 'all';
    this.currentPage = 1;
    this.postsPerPage = 6;
    
    this.init();
  }

  async init() {
    try {
      await this.loadBlogData();
      this.populateCarousel();
      this.populateBlogGrid();
      this.initializeFilters();
      this.hideEmptyMessages();
    } catch (error) {
      console.error('Error initializing blog content:', error);
    }
  }

  async loadBlogData() {
    try {
      const response = await fetch('data/blog-posts.json');
      this.blogData = await response.json();
      this.filteredPosts = [...this.blogData.posts];
    } catch (error) {
      console.error('Error loading blog data:', error);
      throw error;
    }
  }

  populateCarousel() {
    // Get featured posts for carousel
    const featuredPosts = this.blogData.posts.filter(post => post.featured).slice(0, 6);
    const carouselContainer = document.querySelector('.slick-blog.news.swiper-wrapper');
    
    if (carouselContainer && featuredPosts.length > 0) {
      // Clear existing placeholder
      carouselContainer.innerHTML = '';
      
      // Add featured posts
      featuredPosts.forEach(post => {
        const slideElement = this.createCarouselSlide(post);
        carouselContainer.appendChild(slideElement);
      });
      
      // Reinitialize Swiper after content is added
      this.reinitializeSwiper();
    }
  }

  reinitializeSwiper() {
    // Wait a bit for DOM to update, then reinitialize Swiper
    setTimeout(() => {
      if (typeof Swiper !== 'undefined') {
        // Destroy existing Swiper instance if it exists
        const existingSwiper = document.querySelector('.collection-list-wrapper').swiper;
        if (existingSwiper) {
          existingSwiper.destroy(true, true);
        }
        
        // Create new Swiper instance with the same configuration as the original
        new Swiper(".collection-list-wrapper", {
          slidesPerView: 1,
          centeredSlides: true,
          loop: true,
          spaceBetween: 40,
          speed: 500,
          autoplay: {
            delay: 2500,
          },
          pagination: {
            el: '.slider-blog-pagination',
            type: 'bullets',
            clickable: true,
          },
          breakpoints: {
            769: {
              slidesPerView: 3,
            },
          }
        });
      }
    }, 100);
  }

  createCarouselSlide(post) {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'hb-item swiper-slide swiper-slide-blog w-dyn-item';
    slideDiv.setAttribute('role', 'listitem');
    slideDiv.setAttribute('data-w-id', '46a95147-ce41-afb2-4c92-604532ffd551');
    
    const formattedDate = this.formatDate(post.date);
    
    slideDiv.innerHTML = `
      <a href="blog/${post.slug}.html" class="ns-item-wrap w-inline-block">
        <img src="${post.featured_image}" loading="lazy" alt="${post.title}" class="ns-item-img">
        <article class="ns-item-opacity">
          <div class="post-info-wrap detailed">
            <div class="primary-text-color">by ${post.author}</div>
            <div class="post-info-dot"></div>
            <div class="post-detail-date">
              <div>${formattedDate}</div>
            </div>
          </div>
          <h3 class="margin-bottom-0">${post.title}</h3>
        </article>
      </a>
    `;
    
    return slideDiv;
  }

  populateBlogGrid() {
    const gridContainer = document.querySelector('.news-collection-list.w-dyn-items');
    
    if (gridContainer) {
      // Clear existing placeholder
      gridContainer.innerHTML = '';
      
      // Get posts for current page
      const startIndex = (this.currentPage - 1) * this.postsPerPage;
      const endIndex = startIndex + this.postsPerPage;
      const postsToShow = this.filteredPosts.slice(startIndex, endIndex);
      
      // Add blog posts
      postsToShow.forEach(post => {
        const postElement = this.createBlogGridItem(post);
        gridContainer.appendChild(postElement);
      });
    }
  }

  createBlogGridItem(post) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'news-item w-dyn-item';
    itemDiv.setAttribute('role', 'listitem');
    
    const formattedDate = this.formatDate(post.date);
    
    itemDiv.innerHTML = `
      <div class="news-item-wrap">
        <a href="blog/${post.slug}.html" class="news-image-wrap w-inline-block">
          <img src="${post.featured_image}" loading="lazy" alt="${post.title}" class="news-item-image">
        </a>
        <div class="news-info">
          <div class="news-author-wrap">
            <div>by</div>
            <div>${post.author}</div>
          </div>
          <div class="news-dot"></div>
          <div class="news-date-wrap">
            <div fs-cmssort-type="date" fs-cmssort-field="date">${formattedDate}</div>
          </div>
        </div>
        <a fs-cmssort-field="name" href="blog/${post.slug}.html" class="news-item-title">${post.title}</a>
        <p class="text-grey">${post.excerpt}</p>
        <div fs-cmsfilter-field="category" class="news-category">${post.category}</div>
      </div>
      <a href="blog/${post.slug}.html" class="news-link">View Details</a>
    `;
    
    return itemDiv;
  }

  initializeFilters() {
    const filterButtons = document.querySelectorAll('.news-filter-field input[type="radio"]');
    
    filterButtons.forEach(button => {
      button.addEventListener('change', (e) => {
        const label = e.target.nextElementSibling;
        const filterValue = label.textContent.trim().toLowerCase();
        
        this.currentCategory = filterValue;
        this.currentPage = 1;
        this.filterPosts();
        this.populateBlogGrid();
        this.updateCategoryTitle();
      });
    });
  }

  filterPosts() {
    if (this.currentCategory === 'all') {
      this.filteredPosts = [...this.blogData.posts];
    } else {
      this.filteredPosts = this.blogData.posts.filter(post => 
        post.category.toLowerCase() === this.currentCategory
      );
    }
  }

  updateCategoryTitle() {
    const titleElement = document.querySelector('.news-select-wrap > h2');
    if (titleElement) {
      const categoryName = this.currentCategory === 'all' ? 'All Blog Posts' : 
        this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1);
      titleElement.textContent = categoryName;
    }
  }

  hideEmptyMessages() {
    // Hide "No items found" messages since we're populating with real content
    const emptyMessages = document.querySelectorAll('.w-dyn-empty');
    emptyMessages.forEach(msg => {
      msg.style.display = 'none';
    });
  }

  formatDate(dateString) {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on news page
  if (document.querySelector('.news-collection-list') || document.querySelector('.slick-blog')) {
    // Wait a bit to ensure all other scripts have loaded
    setTimeout(() => {
      new BlogContentPopulator();
    }, 500);
  }
});
