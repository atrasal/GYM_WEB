import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // To auto-fill from URL
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";       // Qr- code
import { Calendar, Clock, Award, Dumbbell } from "lucide-react";
import PageTransition from "../../components/PageTransition";
import Navbar from "../../components/Navbar";
import membersData from "../../data/data.json"; // Import mock members

export default function AdminMembers() {
  const [searchParams] = useSearchParams();
  const [membershipNumber, setMembershipNumber] = useState(searchParams.get("membershipNumber") || ""); // Autofill from URL
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Fix: Trigger handleSubmit only when `membershipNumber` exists
  useEffect(() => {
    if (membershipNumber.trim() !== "") {
      handleSubmit();
    }
  }, [membershipNumber]); // ✅ Now only triggers when membershipNumber changes

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");  // Reset error before searching
    setMember(null); // 🔥 Ensure old member details are cleared before searching

    setTimeout(() => {
      const foundMember = membersData.find((m) =>
        m.membershipNumber.toLowerCase() === membershipNumber.toLowerCase()
      );

      if (foundMember) {
        setMember(foundMember);
        setError("");  // 🔥 Ensure error is cleared when member is found
      } else {
        setError("Member not found");
        setMember(null); // 🔥 Ensure member is NULL when no match
      }

      setIsLoading(false);
    }, 1000);
  };


  const stats = [
    { icon: Calendar, label: "Member Since", value: member?.joinDate || "N/A" },
    { icon: Clock, label: "Last Visit", value: member?.lastVisit || "N/A" },
    { icon: Award, label: "Classes Attended", value: member ? `${member.attendedClasses}/${member.totalClasses}` : "N/A" },
    { icon: Dumbbell, label: "Personal Trainer", value: member?.personalTrainer || "N/A" }
  ];

  return (
    <PageTransition>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-4">Member Portal</h1>
            <p className="text-gray-400">Access your membership details and track your fitness journey</p>
          </motion.div>

          {/* Search Form */}
          <motion.form className="bg-gray-800 p-8 rounded-lg mb-8" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                value={membershipNumber}
                onChange={(e) => setMembershipNumber(e.target.value)}
                placeholder="Enter membership number (e.g., MEM001)"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
                required
              />
              <button type="submit" disabled={isLoading} className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold">
                {isLoading ? "Loading..." : "View Details"}
              </button>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </motion.form>

          {member && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Member Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg text-center">
                    <stat.icon className="h-8 w-8 mx-auto mb-4 text-red-500" />
                    <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                    <div className="font-semibold">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Member Details and Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-gray-800 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6">Member Details</h2>
                  <div className="space-y-4">
                    <p><span className="text-gray-400">Name: </span> <span className="font-semibold">{member?.name}</span></p>
                    <p><span className="text-gray-400">Email: </span> <span className="font-semibold">{member?.email}</span></p>
                    <p><span className="text-gray-400">Membership Number: </span> <span className="font-semibold">{member?.membershipNumber}</span></p>
                    <p><span className="text-gray-400">Batch: </span> <span className="font-semibold">{member?.batch}</span></p>
                    <p><span className="text-gray-400">Membership Duration: </span> <span className="font-semibold">{member?.membershipDuration}</span></p>
                    <p><span className="text-gray-400">Expiry Date: </span> <span className="font-semibold">{member?.expiryDate}</span></p>
                    <p>
                      <span className="text-gray-400">Fees Status: </span>
                      <span className={`font-semibold ${member?.feesStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                        {member?.feesStatus?.toUpperCase()}
                      </span>
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Fitness Goals</h3>
                    <div className="flex flex-wrap gap-2">
                      {member?.fitnessGoals?.length > 0 ? (
                        member.fitnessGoals.map((goal, index) => (
                          <span key={index} className="bg-gray-700 text-sm px-3 py-1 rounded-full">{goal}</span>
                        ))
                      ) : (
                        <p className="text-gray-400">No fitness goals set</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {member?.feesStatus === 'unpaid' && (
                    <div className="bg-gray-800 p-8 rounded-lg text-center">
                      <h3 className="text-xl font-semibold mb-4">Pay Your Fees</h3>
                      <div className="bg-white p-4 rounded-lg inline-block">
                        <QRCodeSVG value={`https://payment.powerfitgym.com/${member?.membershipNumber}`} size={200} />
                      </div>
                      <p className="mt-4 text-sm text-gray-400">Scan the QR code to pay your membership fees</p>
                    </div>
                  )}

                  <div className="bg-gray-800 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Upcoming Classes</h3>
                    <div className="space-y-4">
                      {member?.upcomingClasses?.map((class_, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-semibold">{class_.name}</h4>
                          <p className="text-gray-400">{class_.date} at {class_.time}</p>
                        </div>
                      )) || <p className="text-gray-400">No upcoming classes</p>}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
