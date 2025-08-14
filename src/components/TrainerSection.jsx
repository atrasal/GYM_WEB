import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import trainer1 from "../assets/trainer1.jpg";
import trainer2 from "../assets/trainer2.jpg";
import trainer3 from "../assets/trainer3.jpg";
import trainer4 from "../assets/trainer4.jpg";

const trainers = [
  {
    id: 1,
    name: "John Doe",
    specialization: "Strength & Conditioning",
    experience: "10+ years",
    image: trainer1,
  },
  {
    id: 2,
    name: "Sarah Lee",
    specialization: "Yoga & Mindfulness",
    experience: "8+ years",
    image: trainer2,
  },
  {
    id: 3,
    name: "Mike Johnson",
    specialization: "CrossFit & HIIT",
    experience: "6+ years",
    image: trainer3,
  },
  {
    id: 4,
    name: "Emily Smith",
    specialization: "Personal Training",
    experience: "12+ years",
    image: trainer4,
  },
];

export default function TrainersSection() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet Our Expert Trainers</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our certified trainers bring years of experience and specialized knowledge to help you achieve your fitness goals safely and effectively.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              className="trainer-card bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedTrainer(trainer)}
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{trainer.name}</h3>
                <p className="text-red-500 mb-2">{trainer.specialization}</p>
                <p className="text-gray-400 text-sm">{trainer.experience} experience</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trainer Details Modal */}
        {selectedTrainer && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-gray-900 rounded-lg max-w-lg w-full p-6 relative">
              <button
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-2 right-2 text-white text-2xl"
              >
                &times;
              </button>
              <img
                src={selectedTrainer.image}
                alt={selectedTrainer.name}
                className="w-full h-96 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-bold">{selectedTrainer.name}</h3>
              <p className="text-red-500">{selectedTrainer.specialization}</p>
              <p className="text-gray-400 mt-2">{selectedTrainer.experience} of experience</p>
              <p className="text-gray-300 mt-4">
                {selectedTrainer.name} is a dedicated fitness professional who specializes in {selectedTrainer.specialization}.
                With {selectedTrainer.experience}, they are committed to helping you reach your full potential.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
