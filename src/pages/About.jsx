import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, Users, Dumbbell } from "lucide-react";
import PageTransition from "../components/PageTransition";
import FacilitiesSection from "../components/FacilitiesSection";
import TrainersSection from "../components/TrainerSection";
import Navbar from "../components/Navbar";

const achievements = [
  { icon: Award, label: "Best Gym 2024", value: "City Fitness Awards" },
  { icon: Users, label: "Happy Clients", value: "10,000+" },
  { icon: Clock, label: "Years of Service", value: "15+" },
  { icon: Dumbbell, label: "Equipment Pieces", value: "200+" },
];

export default function About() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    const smoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
      }
    };

    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((link) => link.addEventListener("click", smoothScroll));

    return () => {
      links.forEach((link) => link.removeEventListener("click", smoothScroll));
    };
  }, []);

  return (
    <PageTransition>
      <Navbar />
      <div className="pt-16 bg-gray-900 text-white min-h-screen">
        {/* Hero Section */}
        <section className="flex justify-center items-center relative py-20 bg-black min-h-[95vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">About PowerFit Gym</h1>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                Since 2009, PowerFit has been more than just a gym - we're a community dedicated to transforming lives through fitness.
              </p>
            </motion.div>

            {/* Achievements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <achievement.icon className="h-12 w-12 mx-auto mb-4 text-red-500" />
                  <div className="text-2xl font-bold mb-2">{achievement.value}</div>
                  <div className="text-gray-400">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <TrainersSection />

        {/* Facilities Section */}
        <FacilitiesSection />

        {/* Trainer Modal */}
        <AnimatePresence>
          {selectedTrainer && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-800 p-8 rounded-lg max-w-md w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <img src={selectedTrainer.image} alt={selectedTrainer.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover transition-transform duration-300 hover:scale-110" />
                <h3 className="text-2xl font-bold text-center mb-2">{selectedTrainer.name}</h3>
                <p className="text-red-500 text-center mb-4">{selectedTrainer.specialization}</p>
                <p className="text-gray-400 text-center mb-6">{selectedTrainer.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Experience:</h4>
                  <p className="text-gray-400">{selectedTrainer.experience}</p>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Qualifications:</h4>
                  <ul className="list-disc list-inside text-gray-400">
                    {selectedTrainer.qualifications.map((qual, index) => (
                      <li key={index}>{qual}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setSelectedTrainer(null)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
