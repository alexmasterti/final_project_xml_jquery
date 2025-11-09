<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/reviews">
    <html>
      <body>
        <h2>Reviews</h2>
        <xsl:for-each select="review">
          <div class="review-card">
            <h3><xsl:value-of select="place"/></h3>
            <p><strong>By:</strong> <xsl:value-of select="author"/> — <xsl:value-of select="rating"/> ★</p>
            <p><xsl:value-of select="summary"/></p>
            <div><xsl:value-of select="content"/></div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
