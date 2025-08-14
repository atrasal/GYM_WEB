import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageTransition from "../components/PageTransition";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi"; // 📌 Import icons

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    setValue, // ✅ FIXED: Imported setValue
    formState: { isSubmitting }
  } = useForm();

  const [submittedData, setSubmittedData] = useState(null);
  const [membershipNumber, setMembershipNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (membershipNumber) {
      setValue("email", `${membershipNumber}@powerfitgym.com`);
    }
  }, [membershipNumber, setValue]);

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    alert("Message sent successfully!");
    reset();
  };

  return (
    <PageTransition>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Heading */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions? Get in touch with us!
            </p>
          </motion.div>

          {/* 📩 Contact Info Section */}
          <div className="grid md:grid-cols-2 gap-8 bg-gray-800 p-6 rounded-lg items-center">
            {/* Email & Phone */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FiMail className="text-xl text-blue-400" />
                <div>
                  <h4 className="text-lg font-semibold">Email</h4>
                  <p className="text-gray-300">contact@powerfitgym.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FiPhone className="text-xl text-green-400" />
                <div>
                  <h4 className="text-lg font-semibold">Phone</h4>
                  <p className="text-gray-300">+91 00000 00000</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FiMapPin className="text-xl text-red-400" />
                <div>
                  <h4 className="text-lg font-semibold">Address</h4>
                  <p className="text-gray-300">Sukhsagar Nagar, Katraj, Pune, Maharashtra</p>
                </div>
              </div>
            </div>

            {/* 📬 Contact Form */}
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg"
                />
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg"
                />
                <textarea
                  {...register("message", { required: true })}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 w-full bg-red-600 text-white py-3 rounded-lg font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* 🗺️ Map Section */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Find Us</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.9182289800935!2d73.85861437482291!3d18.45153277114068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb08c4900001%3A0x948f6f7d4c071f9f!2sSukhsagar%20Nagar%2C%20Katraj%2C%20Pune%2C%20Maharashtra%20411046!5e0!3m2!1sen!2sin!4v1711278394896!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </motion.div>

          {/* ❓ FAQ Section */}
          <div className="mt-4 bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">FAQ</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">What's included in the membership?</h4>
                <p className="text-gray-400">Access to all equipment, group classes, and amenities.</p>
              </div>
              <div>
                <h4 className="font-semibold">Do you offer personal training?</h4>
                <p className="text-gray-400">Yes, we have certified trainers available for one-on-one sessions.</p>
              </div>
              <div>
                <h4 className="font-semibold">Can I freeze my membership?</h4>
                <p className="text-gray-400">Yes, members can freeze their membership for up to 3 months.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
