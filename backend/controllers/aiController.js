const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateGigDescription = async (req, res) => {
  try {
    const { title, category, keywords } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const prompt = `Generate a professional, SEO-friendly gig description for a freelance service marketplace.

Title: "${title}"
Category: ${category || 'general'}
Keywords: ${keywords || 'professional, quality, reliable'}

Write only the description, no extra text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const description = result.response.text();

    res.json({
      success: true,
      description: description
    });

  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ message: error.message || 'AI service failed' });
  }
};

exports.generateTags = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const prompt = `Generate 5 relevant tags for this freelance gig title: "${title}"
Return only the tags as a comma-separated list, no extra text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const tagsString = result.response.text();
    const tags = tagsString.split(',').map(tag => tag.trim());

    res.json({
      success: true,
      tags: tags
    });

  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ message: error.message || 'AI service failed' });
  }
};
