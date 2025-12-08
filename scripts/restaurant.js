// Basic JS for restaurant template
$(function(){

  // Load and transform XML with XSLT for reviews page
  if ($('#reviews-container').length > 0) {
    loadReviewsFromXML();
  }

  // Contact form jQuery validation
  $('#contact-form').validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      name: {
        required: "Please enter your name.",
        minlength: "Your name must be at least 2 characters long."
      },
      email: {
        required: "Please enter your email address.",
        email: "Please enter a valid email address."
      },
      message: {
        required: "Please enter a message.",
        minlength: "Your message must be at least 10 characters long."
      }
    },
    submitHandler: function(form) {
      // This function runs when form is valid
      alert('Thanks! Message received from ' + $('#name').val() + '. We will get back to you shortly.');
      form.reset();
      return false; // Prevent actual form submission
    }
  });

});

// Function to load XML and transform with XSLT
function loadReviewsFromXML() {
  // Load XML file
  $.ajax({
    url: 'xml/reviews.xml',
    dataType: 'xml',
    success: function(xml) {
      // Load XSLT file
      $.ajax({
        url: 'xsl/reviews.xsl',
        dataType: 'xml',
        success: function(xsl) {
          // Perform XSLT transformation
          const resultDocument = transformXML(xml, xsl);

          // Insert transformed HTML into the page
          if (resultDocument) {
            $('#reviews-container').html(resultDocument);

            // Initialize form validation after content is loaded
            initializeAddReviewForm();
          }
        },
        error: function() {
          console.error('Error loading XSL file');
          $('#reviews-container').html('<p style="color:red;">Error loading XSLT stylesheet.</p>');
        }
      });
    },
    error: function() {
      console.error('Error loading XML file');
      $('#reviews-container').html('<p style="color:red;">Error loading reviews data.</p>');
    }
  });
}

// Cross-browser XSLT transformation function
function transformXML(xml, xsl) {
  let resultDocument;

  // Check for browser support
  if (window.XSLTProcessor) {
    // Modern browsers (Chrome, Firefox, Safari, Edge)
    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);
  } else if (window.ActiveXObject || 'ActiveXObject' in window) {
    // Internet Explorer (legacy support)
    resultDocument = xml.transformNode(xsl);
  } else {
    console.error('XSLT transformation not supported in this browser');
    return null;
  }

  return resultDocument;
}

// Initialize add review form validation
function initializeAddReviewForm() {
  if ($('#add-review-form').length) {
    // Set up validation rules
    $('#add-review-form').validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        place: {
          required: true,
          minlength: 2
        },
        rating: {
          required: true
        },
        review: {
          required: true,
          minlength: 10
        }
      },
      messages: {
        name: {
          required: "Please enter your name.",
          minlength: "Name must be at least 2 characters."
        },
        place: {
          required: "Please enter the restaurant name.",
          minlength: "Restaurant name must be at least 2 characters."
        },
        rating: {
          required: "Please select a rating."
        },
        review: {
          required: "Please enter your review.",
          minlength: "Review must be at least 10 characters."
        }
      }
    });

    // Handle button click instead of form submit
    $('.submit-btn').on('click', function(e) {
      e.preventDefault();

      // Trigger validation
      if ($('#add-review-form').valid()) {
        // Form is valid, extract values
        const name = $('#name').val();
        const place = $('#place').val();
        const rating = $('#rating').val();
        const review = $('#review').val();

        // Append to review list - using safe DOM methods to prevent XSS
        const item = $('<div class="review-item"></div>');
        const placeStrong = $('<strong></strong>').text(place);

        // Generate stars based on rating
        const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
        const ratingText = $('<span></span>').text(' — ' + stars);

        const reviewText = $('<span></span>').text(review);
        const authorEm = $('<em></em>').text('by ' + name);

        item.append(placeStrong).append(ratingText).append('<br>').append(reviewText).append('<br>').append(authorEm);
        $('.review-list').append(item);

        // Clear form
        $('#add-review-form')[0].reset();
        $('#add-review-form').validate().resetForm();

        // Show success message
        alert('Thank you for sharing your review! Your feedback has been added to our list.');
      }
      // If form is not valid, jQuery validation will show error messages automatically
    });
  }
}
