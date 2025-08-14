import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Clock, Users, Trophy } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import FeaturesSection from '../components/Features';
import Navbar from "../components/Navbar";

export default function Home() {
  const stats = [
    { icon: Users, label: 'Active Members', value: '1000+' },
    { icon: Calendar, label: 'Weekly Classes', value: '50+' },
    { icon: Clock, label: 'Operating Hours', value: '24/7' },
    { icon: Trophy, label: 'Expert Trainers', value: '20+' }
  ];

  const membershipRef = useRef(null);
  const navigate = useNavigate();
  const [hoveredPlan, setHoveredPlan] = useState(null);

  // Membership Plans Data
  const membershipPlans = [
    {
      name: "Basic",
      price: "$29",
      facilities: ["Access to Gym", "Locker Room Access", "Group Classes", "Basic Equipment"],
    },
    {
      name: "Premium",
      price: "$59",
      facilities: ["Everything in Basic", "Personal Trainer", "Sauna & Spa", "Nutrition Plan"],
    },
    {
      name: "Elite",
      price: "$99",
      facilities: ["Everything in Premium", "Private Coaching", "Advanced Equipment", "VIP Lounge"],
    }
  ];

  // Scroll to Membership Plans
  const handleScrollToPlans = () => {
    if (membershipRef.current) {
      membershipRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageTransition>
      <Navbar />
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <div
          className="h-screen bg-cover bg-center relative"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <motion.h1 className="text-5xl md:text-7xl font-bold mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              Transform Your Life
            </motion.h1>
            <motion.p className="text-xl md:text-2xl mb-8 max-w-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
              Join PowerFit Gym and embark on a journey to become the best version of yourself.
            </motion.p>
            <motion.div className="space-x-4" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
              <button onClick={() => navigate("/members")} className="hero-button bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors">
                Get Started
              </button>
              <button onClick={handleScrollToPlans} className="hero-button bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-colors">
                View Plans
              </button>
            </motion.div>
          </div>

          <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white scroll-down cursor-pointer" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </div>

        {/* Stats Section */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div key={index} className="text-center text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-red-500" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* Membership Plans with Hover Effect */}
        <section ref={membershipRef} className="py-20 bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Membership Plans</h2>
              <p className="text-gray-400">Choose the perfect plan for your fitness journey</p>
            </div>

            <div className="membership-plans grid grid-cols-1 md:grid-cols-3 gap-8">
              {membershipPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className="relative bg-gray-900 rounded-lg p-8 text-center cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredPlan(index)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-red-500 mb-6">{plan.price} <span className="text-lg text-gray-400">/month</span></div>

                  {/* Hover Card */}
                  {hoveredPlan === index && (
                    <motion.div className="absolute inset-0 bg-gray-950 p-6 rounded-lg text-left opacity-90 shadow-lg transition-transform transform scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    > 
                      <ul className="text-gray-300 space-y-2">
                        {plan.facilities.map((facility, i) => (
                          <li key={i} className="flex items-center">
                            ✅ {facility}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}