
import StudyPlan from "../models/Plan.js";

export const getPlans = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required in the request parameters." });
    }

    const plans = await StudyPlan.find({ userId });

    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: "No study plans found for this user." });
    }

    res.status(200).json(plans);
  } catch (error) {
    console.error("GetPlans Error:", error);
    res.status(500).json({ error: "Failed to retrieve plans" });
  }
};
