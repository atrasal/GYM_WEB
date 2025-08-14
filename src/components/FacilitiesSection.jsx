import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react"; // Make sure to install Lucide if not already installed

export default function FacilitiesSection() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Facilities & Training Programs */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* World-Class Facilities */}
            <div>
              <h2 className="text-3xl font-bold mb-6">World-Class Facilities</h2>
              <ul className="space-y-4 text-gray-400">
                {[
                  "State-of-the-art cardio equipment",
                  "Free weights and strength machines",
                  "Dedicated yoga and stretching area",
                  "Luxury locker rooms with showers",
                  "Protein shake and smoothie bar",
                  "Recovery and stretching zone",
                  "Functional training area",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Dumbbell className="h-6 w-6 text-red-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Training Programs */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Training Programs</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Strength Training", desc: "Build muscle and increase strength" },
                  { title: "HIIT Classes", desc: "High-intensity interval training" },
                  { title: "Yoga Sessions", desc: "Improve flexibility and mindfulness" },
                  { title: "Group Classes", desc: "Motivating group workouts" },
                ].map((program, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{program.title}</h3>
                    <p className="text-gray-400 text-sm">{program.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Training Schedule */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Training Schedule</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Morning Batch",
                    time: "6:00 AM - 10:00 AM",
                    activities: ["Personal Training Sessions", "Group HIIT Classes", "Yoga and Meditation"],
                  },
                  {
                    title: "Afternoon Batch",
                    time: "12:00 PM - 4:00 PM",
                    activities: ["Strength Training", "Circuit Training", "Cardio Classes"],
                  },
                  {
                    title: "Evening Batch",
                    time: "5:00 PM - 10:00 PM",
                    activities: ["CrossFit Sessions", "Boxing Classes", "Flexibility Training"],
                  },
                ].map((batch, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold mb-3">{batch.title}</h3>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-gray-400">{batch.time}</p>
                      <ul className="mt-2 space-y-1 text-sm">
                        {batch.activities.map((activity, i) => (
                          <li key={i}>• {activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
