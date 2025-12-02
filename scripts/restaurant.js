// Basic JS for restaurant template
$(function(){
  // Example: handle add review form submission (client-side only)
  $('#add-review-form').on('submit', function(e){
    e.preventDefault();
    const name = $('#name').val();
    const place = $('#place').val();
    const rating = $('#rating').val();
    const review = $('#review').val(); 

    if(!name || !place || !rating || !review){
      alert('Please fill all fields');
      return;
    }

    // Append to review list (demo only) - using safe DOM methods to prevent XSS
    const item = $('<div class="review-item"></div>');
    const placeStrong = $('<strong></strong>').text(place);
    const ratingText = $('<span></span>').text(' — ' + rating + ' ★');
    const reviewText = $('<span></span>').text(review);
    const authorEm = $('<em></em>').text('by ' + name);

    item.append(placeStrong).append(ratingText).append('<br>').append(reviewText).append('<br>').append(authorEm);
    $('.review-list').append(item);

    // Clear form
    this.reset();
  });

  // Contact form demo
  $('#contact-form').on('submit', function(e){
    e.preventDefault();
    alert('Thanks! Message received (demo)');
    this.reset();
  });

});
