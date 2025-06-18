import mongoose from 'mongoose';

const DaySchema = new mongoose.Schema({
  task: String,
  resources: [String],
  milestone: String
}, { _id: false });

const WeekSchema = new mongoose.Schema({
  title: String,
  description: String,
  day1: DaySchema,
  day2: DaySchema,
  day3: DaySchema,
  day4: DaySchema,
  day5: DaySchema,
    day6: DaySchema,
    day7: DaySchema,
}, { _id: false });

const StudyPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  careerGoal: String,
  level: String,
  weeklyHours: Number,
  description: String,
  weeks: {
    type: Map,
    of: WeekSchema
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('StudyPlan', StudyPlanSchema);
