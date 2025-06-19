import Profile from "../models/Profile.js";
import StudyPlan from "../models/Plan.js";
import { getGeminiResponse } from "../services/geminiService.js"; // Your AI service

export const createProfileAndGeneratePlan = async (req, res) => {
  const { career, grades, time } = req.body;

  // Assuming req.user.id comes from middleware (auth)
  const userId = req.user?.id;

  if (!userId || !career || !grades || !time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // const existingProfile = await Profile.findOne({ userId });
    // if (existingProfile) {
    //   return res.status(400).json({ error: "Profile already exists for this userId" });
    // }

    // 1. Create Profile
    const newProfile = new Profile({ userId, career, grades, time });
    await newProfile.save();

    // 2. Generate prompt
    const prompt = `Create a personalized 8-week study plan for a student.
Career Goal: ${career}
Level: ${grades}
Available Hours per Week: ${time}
The plan should include:
- A title and description for each week.
- For each day (day1 to day7), include:
  - task: a short description of what to learn or do that day,
  - resources: a list of helpful materials (as an array of strings, including links to YouTube, articles, or tools),
  - milestone: a short measurable goal or outcome for the day.

Ensure the plan is:
- Structured and detailed for a beginner in ${career} at the ${grades} level,
- Flexible for different learning paces,
- Designed to help the student achieve their career goal effectively.

Respond with a raw JSON object structured with keys from "week1" to "week8". Each week should follow this format:

{
  "week1": {
    "title": "Week 1 Title",
    "description": "Overview of the week's goals and focus.",
    "day1": {
      "task": "Description of the learning task",
      "resources": ["Resource 1", "Resource 2", "Link to YouTube or article"],
      "milestone": "Milestone or outcome for the day"
    },
    ...
    "day7": {
      "task": "Description",
      "resources": ["..."],
      "milestone": "..."
    }
  },
  ...
  "week8": {
    ...
  }
}

⚠️ Do not include any markdown, headings, explanations, or code blocks. Only return the raw JSON object.`;


    // 3. Generate study plan
    const response = await getGeminiResponse(prompt);
   let parsedPlan;
try {
  const cleanedResponse = typeof response === "string"
    ? response.replace(/```(?:json)?|```/g, "").trim()
    : response;

  parsedPlan = typeof cleanedResponse === "string"
    ? JSON.parse(cleanedResponse)
    : cleanedResponse;

} catch (parseError) {
  console.error("Failed to parse AI response:", parseError);
  return res.status(500).json({ error: "AI returned invalid or malformed JSON" });
}


    // 4. Save StudyPlan
    const newPlan = new StudyPlan({
      userId,
      careerGoal: career,
      level: grades,
      weeklyHours: time,
      description: parsedPlan?.description || "Generated Study Plan",
      weeks: parsedPlan?.weeks || parsedPlan,
    });
    await newPlan.save();

    // 5. Respond with both
    res.status(201).json({
      message: "Profile and Study Plan created successfully",
      // profile: newProfile,
      // plan: newPlan,
    });

  } catch (error) {
    console.error("CreateProfileAndGeneratePlan Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
     const { userId } = req.params;
   ;
        try {const profile = await Profile.findOne({ userId });
            if (!profile) {
                return res.status(404).json({ error: "Profile not found for this userId" });
            }
            res.status(200).json({ profile });

        } catch (error) {
            console.error("GetProfile Error:", error);
            res.status(500).json({ error: "Internal server error" });
            
        }
    
    }


