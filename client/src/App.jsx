import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CareerCoach from "./pages/CareerCoach";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ProfileSetup from "./pages/ProfileSetup";
import ResumeGenerator from "./pages/ResumeGenerator";
import ATSChecker from "./pages/ATSChecker";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import LearningRoadmap from "./pages/LearningRoadmap";
import JobTracker from "./pages/JobTracker";
import InterviewSimulator from "./pages/InterviewSimulator";
import ResumeHistory from "./pages/ResumeHistory";

export default function App() {
  return ( 
    <>
    <Navbar />
    <Routes>
      <Route path="/career-coach" element={<ProtectedRoute><CareerCoach /> </ProtectedRoute>} />
      <Route path="/learning-roadmap" element={<ProtectedRoute><LearningRoadmap/></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/job-tracker" element={<ProtectedRoute><JobTracker/></ProtectedRoute>} />
      <Route path="/interview-simulator" element={<ProtectedRoute><InterviewSimulator /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/resume-analyzer" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/resume-generator" element={<ProtectedRoute><ResumeGenerator /></ProtectedRoute>}/>
      <Route path="/ats-checker" element={<ProtectedRoute><ATSChecker /></ProtectedRoute>} />
      <Route path="/skill-gap" element={<ProtectedRoute><SkillGapAnalyzer /></ProtectedRoute>} />
      <Route path="/resume-history" element={<ProtectedRoute><resumeHistory /></ProtectedRoute>} />
    </Routes>
    </>
  );
}