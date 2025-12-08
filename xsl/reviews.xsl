<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/reviews">
    <!-- Left Sidebar with Review List -->
    <aside class="sidebar">
      <h3>Reviews</h3>
      <div class="review-list">
        <xsl:for-each select="review">
          <div class="review-item">
            <strong><xsl:value-of select="place"/></strong> — <xsl:call-template name="generateStars">
              <xsl:with-param name="rating" select="rating"/>
            </xsl:call-template><br/>
            <xsl:value-of select="summary"/><br/>
            <em>by <xsl:value-of select="author"/></em>
          </div>
        </xsl:for-each>
      </div>
    </aside>

    <!-- Review Cards with Images -->
    <xsl:for-each select="review">
      <xsl:variable name="reviewId" select="@id"/>
      <section class="review-card">
        <div class="review-media">
          <xsl:choose>
            <xsl:when test="$reviewId = 'review1'">
              <img src="images/diner_breakfast.jpg" alt="review photo" style="width:100%;max-height:320px;object-fit:cover;border-radius:8px"/>
            </xsl:when>
            <xsl:when test="$reviewId = 'review2'">
              <img src="images/rice_and_curry.jpg" alt="review photo" style="width:100%;max-height:320px;object-fit:cover;border-radius:8px"/>
            </xsl:when>
            <xsl:when test="$reviewId = 'review3'">
              <img src="images/sushi_on_brown_wooden_board.jpg" alt="review photo" style="width:100%;max-height:320px;object-fit:cover;border-radius:8px"/>
            </xsl:when>
            <xsl:when test="$reviewId = 'review4'">
              <img src="images/tacos_on_blue_plate.jpg" alt="review photo" style="width:100%;max-height:320px;object-fit:cover;border-radius:8px"/>
            </xsl:when>
          </xsl:choose>
        </div>
        <div class="review-content">
          <h2><xsl:value-of select="place"/> — <xsl:value-of select="summary"/></h2>
          <p><xsl:value-of select="content"/></p>
          <h4>Rating: <xsl:call-template name="generateStars">
            <xsl:with-param name="rating" select="rating"/>
          </xsl:call-template></h4>
        </div>
      </section>

      <!-- Insert sidebar form after second review -->
      <xsl:if test="position() = 2">
        <aside class="sidebar">
          <h3>Add Review</h3>
          <form id="add-review-form" class="review-form" novalidate="novalidate">
            <div class="form-group">
              <label for="name">Your name</label>
              <input id="name" name="name" type="text" class="input"/>
            </div>
            <div class="form-group">
              <label for="place">Place name</label>
              <input id="place" name="place" type="text" class="input"/>
            </div>
            <div class="form-group">
              <label for="rating">Rating (1-5)</label>
              <select id="rating" name="rating" class="input">
                <option value="">Select rating...</option>
                <option value="1">1 ★</option>
                <option value="2">2 ★★</option>
                <option value="3">3 ★★★</option>
                <option value="4">4 ★★★★</option>
                <option value="5">5 ★★★★★</option>
              </select>
            </div>
            <div class="form-group">
              <label for="review">Review</label>
              <textarea id="review" name="review"></textarea>
            </div>
            <button type="button" class="submit-btn">Submit Review</button>
          </form>
        </aside>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>

  <!-- Template to generate star ratings -->
  <xsl:template name="generateStars">
    <xsl:param name="rating"/>
    <xsl:param name="count" select="1"/>
    <xsl:if test="$count &lt;= 5">
      <xsl:choose>
        <xsl:when test="$count &lt;= $rating">★</xsl:when>
        <xsl:otherwise>☆</xsl:otherwise>
      </xsl:choose>
      <xsl:call-template name="generateStars">
        <xsl:with-param name="rating" select="$rating"/>
        <xsl:with-param name="count" select="$count + 1"/>
      </xsl:call-template>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
