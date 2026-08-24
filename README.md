# Career Compass AI

Overview

Career Compass AI is an intelligent career guidance and development platform designed to help students, fresh graduates,and job seekers make informed career decisions and improve their employability.The platform acts as a virtual career mentor by analyzing user's resumes, skills, intrests, and career goals to provide personalized recommendations, learning paths, and job preparation assistance.

Built using the MERN Stack with Artificial Intelligence and Machine Learning integration, Career Compass AI bridges the gap between a candidate's current skills and industry requirements. The system provides real-time insights, career suggestions, and actionable roadmaps that helps users progress toward their dream career.

Key Features

1. Resume Analyzer

The Resumw Analyzer evaluates a user's resume using AI and Natural Language Processing techniques.It identifies grammatical errors, formating issues, missing keywords, and weak descriptions.The system then generates suggestions to improve the resume's quality and ATS compatibility.

Benefits:

Professional resume enhancemennt
Grammar and formatting correction
Keyword optimization
Better chances of shortlisting by recruiters

2. ATS Score Checker

Many companies use Applicant Tracking Systems (ATS) to filter resumes before they reach recruiters.The ATS Score Checkerr analyzes resume against industry standards and job descriptions to calculate an ATS score.

Features:

ATS compatibility assessment
Missing keyword detection
Resume optimization suggestions
Score improvement recommendations

Benefits:

Higher visibility during recruitment
Increased interview oppourtinities

3. Skill Gap Analysis
The Skill Gap Analysis module compares a user's current skills with the skills required for their target role.The AI identifies missing competencies and recommends areas for improvement.

Example:
If a user wants to become a Full Stack Developer but lacks Node.js and MongoDB skills, the platform highlights these gaps and suggests learning resources.

Benefits:

Personalized skill assessment
Targeted learning recommendations
Better career planning

4. Learning Roadmaps
Based on the user's career goals and skill gaps, the platform generates structured learning roadmaps.
These roadmaps provide a step-by-step plan for acquiring the necessary skills.

Roadmap includes:

Topics to learn
Recommended courses
Project suggestions
Estimated completion timelines

Benefits:

Clear learning direction
Faster skill development
Goal-oriented preparation

5. Interview Simulator
The Interview Simulator uses AI to conduct mock interviews tailored to the user's desired job role. It generates technical, behavioral, and HR questions and evaluates responses.

Features:

Role-specific interview questions
Real-time feedback
Performance scoring
Improvement suggestions

Benefits:
Increased confidence
Better interview performance
Reduced interview anxiety

6. Job Tracker
The Job Tracker helps users manage and monitir their job applications efficiently.

Features:

Application status tracking
Interview scheduling
Company-wise records
Application history management

Benefits:

Organized job search process
Better application management
Improved follow-up tracking

7. AI Career Coach
The ai career coach acts as a personalized mentor available 24/7. it provides career guidance,learning recommendations, industry insights and professional development advice 

Capabilities:

Career path recommendations
Skill development guidance
Industry trend analysis
Goal-setting assistance 

Benefits:   

Personalized career support 
Continuous guidance
Data-driven career decisions


Technology Stack 

Frontend:
React.js
HTML5
CSS3
JavaScript
Tailwind CSS

Backend:
Node.js
Express.js

Database:
MongoDB

AI & Machine Learning:
OpenAI/ Gemini APIs


INSTRUCTIONS TO RUN:

// Prefer using Google Chrome

Use Signup to create new user
Complete the profile setup
Login using Signup details

Dashboard will open
Start by analysing a resume.
followed by Ats Analyzer.

Use the skill gap feature.
Use the learning roadmap feature.

Take the interview simulator to check your progress.
// Use Google Chrome, Brave does not support voice recoginition.

Get your answers from career coach feature.

Then see out the job recommendations feature.

Followed by job tracker to keep record of applied jobs.

You can also use resume builder to generate and save new AI-powered resumes.


AI Usage:
AI was used in this project for:
-Purpose of dubbing.
-Refinement of Prompts.
-Solving project related queries.

HOW TO RUN LOCALLY:

Create .env file inside srever/ directory with this structure,
PORT=5000
MONGO_URI=XXXX
JWT_SECRET=XXXX
OPENROUTER_API_KEY=XXXX
CLIENT_URL=http://localhost:5173

Start backend server:
cd server
npm install
npm start

Your expected output should be:
Server running on Port 5000
MongoDB Connected

Start frontend server:
cd client
npm install
npm run dev

Open you browser with the link provided in client terminal