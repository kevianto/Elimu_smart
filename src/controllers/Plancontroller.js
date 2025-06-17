import { getGeminiResponse } from "../services/geminiService.js";

export const generatePlan = async (req, res) => {
  const { career, grades, time} = req.body;

  if (!career || !grades || !time ) {
    return res.status(400).json({ error: "Missing input fields" });
  }

  try {
    const prompt = `Create a personalized 8-week study plan for a student.
Career Goal: ${career}
Level: ${grades}
Available Hours per Week: ${time}
The plan should include daily tasks, resources, and milestones.
The plan should be detailed and structured, ensuring the student can achieve their career goal effectively.
The plan should be flexible to accommodate different learning paces.
The plan should be suitable for a beginner in the field of ${career} at the ${grades} level.
also include any recommended resources, links to youtube vides or tools that can help the student in their learning journey.`;

    const plan = await getGeminiResponse(prompt);
    res.json({ plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate plan" });
  }
};

export const getPlan = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const mockPlan = {
      userId,
      plan: "Mock study plan for user",
    };

    res.json(mockPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve plan" });
  }
};
