
// PlanController.js

import StudyPlan from "../models/Plan.js";

// Fetch all study plans for a specific user
export const getPlansByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }

  try {
    const plans = await StudyPlan.find({ userId });

    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: "No study plans found for this user" });
    }

    res.status(200).json({ plans });
  } catch (error) {
    console.error("GetPlansByUserId Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
