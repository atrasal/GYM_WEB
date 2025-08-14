import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageTransition from "../components/PageTransition";
import Navbar from "../components/Navbar";
import { QRCodeSVG } from "qrcode.react";

export default function Membership() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const [submittedData, setSubmittedData] = useState(null);
  const [membershipNumber, setMembershipNumber] = useState(() =>
    Math.floor(1000 + Math.random() * 9000)
  ); // Auto-incremented Membership ID

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
    alert("Member registered successfully!");
    reset();
    setMembershipNumber((prev) => prev + 1); // Increment membership ID for next user
  };

  return (
    <PageTransition>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-4">Register as a Member</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Fill in the details below to register as a PowerFit Gym member.
            </p>
          </motion.div>

          {/* Registration Form */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <form className="bg-gray-800 p-8 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Personal Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                        {...register("name", { required: "Name is required" })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                        {...register("email", { required: "Email is required" })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                        {...register("phone", { required: "Phone number is required" })}
                      />
                    </div>
                  </div>
                </div>

                {/* Membership Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Membership Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Membership Number</label>
                      <input
                        type="text"
                        value={membershipNumber}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Batch</label>
                      <select className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600" {...register("batch")}>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Membership Duration</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                        {...register("membershipDuration", { required: "Duration is required" })}
                      />
                    </div>
                  </div>
                </div>

                {/* Fitness Goals & Trainer */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Fitness Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Personal Trainer</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                        {...register("personalTrainer")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Fitness Goals</label>
                      <input
                        type="text"
                        placeholder="e.g., Weight Loss, Muscle Gain"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                        {...register("fitnessGoals")}
                      />
                    </div>
                  </div>
                </div>

                {/* Membership Plan Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Plan</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                        {...register("membershipPlan", { required: "Please select a plan" })}
                      >
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                        <option value="Elite">Elite</option>
                      </select>
                      <div className="flex justify-center mt-4">
                        <div className="bg-white p-4 rounded-lg inline-block">
                          <QRCodeSVG value={""} size={200} />                 /* ADD QR Code  */
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-10 w-full bg-red-600 text-white py-3 rounded-lg font-semibold 
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"} transition-colors`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </motion.div>

          {/* Show Submitted Data */}
          {submittedData && (
            <motion.div className="bg-gray-800 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-bold">Submitted Member Details</h2>
              <pre className="text-gray-300 mt-4">{JSON.stringify(submittedData, null, 2)}</pre>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
