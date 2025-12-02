// Basic JS for restaurant template
$(function(){

  // Load and transform XML with XSLT for reviews page
  if ($('#reviews-container').length > 0) {
    loadReviewsFromXML();
  }

  // Initialize add review form validation when it's loaded (dynamically via XSLT)
  $(document).on('DOMNodeInserted', function() {
    if ($('#add-review-form').length && !$('#add-review-form').hasClass('validated')) {
      $('#add-review-form').addClass('validated').validate({
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
            required: true,
            number: true,
            min: 1,
            max: 5
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
            required: "Please select a rating.",
            number: "Please enter a valid number.",
            min: "Rating must be between 1 and 5.",
            max: "Rating must be between 1 and 5."
          },
          review: {
            required: "Please enter your review.",
            minlength: "Review must be at least 10 characters."
          }
        },
        submitHandler: function(form) {
          // Extract form values
          const name = $('#name').val();
          const place = $('#place').val();
          const rating = $('#rating').val();
          const review = $('#review').val();

          // Append to review list (demo only) - using safe DOM methods to prevent XSS
          const item = $('<div class="review-item"></div>');
          const placeStrong = $('<strong></strong>').text(place);
          const ratingText = $('<span></span>').text(' — ' + rating + ' ★');
          const reviewText = $('<span></span>').text(review);
          const authorEm = $('<em></em>').text('by ' + name);

          item.append(placeStrong).append(ratingText).append('<br>').append(reviewText).append('<br>').append(authorEm);
          $('.review-list').append(item);

          // Clear form
          form.reset();
          return false;
        }
      });
    }
  });

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
