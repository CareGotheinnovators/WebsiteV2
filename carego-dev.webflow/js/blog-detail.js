/**
 * Blog Detail Page JavaScript
 * Handles recent posts population for individual blog pages
 */

class BlogDetailPage {
  constructor() {
    this.currentPostId = this.getCurrentPostId();
    this.init();
  }

  getCurrentPostId() {
    // Extract post ID from URL path
    const path = window.location.pathname;
    const segments = path.split('/');
    const filename = segments[segments.length - 1];
    return filename.replace('.html', '');
  }

  async init() {
    try {
      await this.loadBlogData();
      this.populateRecentPosts();
    } catch (error) {
      console.error('Error initializing blog detail page:', error);
    }
  }

  async loadBlogData() {
    try {
      const response = await fetch('../data/blog-posts.json');
      this.blogData = await response.json();
    } catch (error) {
      console.error('Error loading blog data:', error);
      throw error;
    }
  }

  populateRecentPosts() {
    const recentPostsContainer = document.getElementById('recent-posts-container');
    
    if (recentPostsContainer && this.blogData) {
      // Get other posts (exclude current post)
      const otherPosts = this.blogData.posts
        .filter(post => post.id !== this.currentPostId)
        .slice(0, 3); // Show 3 recent posts
      
      if (otherPosts.length > 0) {
        const postsHTML = otherPosts.map(post => this.createRecentPostItem(post)).join('');
        recentPostsContainer.innerHTML = postsHTML;
      } else {
        recentPostsContainer.innerHTML = '<p style="color: #cccccc; text-align: center;">No recent posts available.</p>';
      }
    }
  }

  createRecentPostItem(post) {
    const formattedDate = this.formatDate(post.date);
    
    return `
      <div class="recent-post-item">
        <a href="${post.slug}.html">
          <img src="../${post.featured_image}" alt="${post.title}" class="recent-post-image">
        </a>
        <div class="recent-post-content">
          <a href="${post.slug}.html" style="text-decoration: none;">
            <h3 class="recent-post-title">${post.title}</h3>
          </a>
          <p class="recent-post-excerpt">${post.excerpt}</p>
          <div class="recent-post-meta">
            <span>${formattedDate}</span>
            <span class="recent-post-category">${post.category}</span>
          </div>
        </div>
      </div>
    `;
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
  // Only initialize on blog detail pages
  if (document.getElementById('recent-posts-container')) {
    new BlogDetailPage();
  }
});
