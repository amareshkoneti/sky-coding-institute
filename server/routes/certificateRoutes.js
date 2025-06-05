const express = require('express');
const { getSignedUrl } = require('../services/certificateService');

const router = express.Router();

router.get('/:certificateNumber', async (req, res) => {
  try {
    const certificateNumber = req.params.certificateNumber;
    const imageKey = `${certificateNumber}.png`;
    const pdfKey = `${certificateNumber}.pdf`;

    // First try PNG
    try {
      const pngUrl = await getSignedUrl(imageKey);
      return res.json({ url: pngUrl });
    } catch (err) {
      console.warn('PNG not found or failed:', err.message);
    }

    // Fallback to PDF
    const pdfUrl = await getSignedUrl(pdfKey);
    return res.json({ url: pdfUrl });
  } catch (err) {
    res.status(404).json({ message: 'Certificate not found', error: err.message });
  }
});

module.exports = router;
