
import React from 'react';
import { Project, SkillCategory, Education } from './types';

export const RESUME_DATA = {
  name: "Prajapati Jayesh R.",
  role: "Engineering Student & Aspiring Data Analyst",
  location: "Vadodara, India",
  email: "jayeshprajapati2701@gmail.com",
  phone: "+91 9104058002",
  github: "https://github.com/jayeshprajapati2701-coder",
  linkedin: "https://www.linkedin.com/in/jayesh-prajapati-6185653a7",
  summary: "Engineering student with strong foundations in data analytics and software development. Skilled in Python, Pandas, NumPy, SQL, and data visualization, with hands-on experience building analytical pipelines and working on real-world time-series forecasting projects. Seeking a Data Analytics Intern role to apply quantitative, technical, and problem-solving skills to meaningful business challenges.",
  technicalStrengths: [
    "Strong analytical reasoning and ability to break down complex datasets.",
    "Solid understanding of Python libraries such as Pandas, NumPy, and Matplotlib.",
    "Hands-on experience with data cleaning, EDA, and time-series trend analysis.",
    "Ability to document workflows and interpret insights clearly."
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Data Analytics",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Excel"]
  },
  {
    category: "Databases",
    skills: ["SQL", "MySQL"]
  },
  {
    category: "Software Dev",
    skills: ["Python", "Java", "C/C++"]
  },
  {
    category: "Tools",
    skills: ["Jupyter Notebook", "Git", "VS Code", "Android Studio"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "TSLA Stock Time-Series Forecasting",
    subtitle: "Data Analytics Project Experience",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib"],
    points: [
      "Performed full data preprocessing, cleaning, and feature extraction on real TSLA stock datasets.",
      "Conducted exploratory data analysis (EDA) to identify patterns, seasonality, and anomaly behaviors.",
      "Built forecasting models and evaluated performance metrics to understand market trend movement.",
      "Designed visual reporting outputs to communicate insights clearly."
    ]
  },
  {
    title: "Local Network Chat Application",
    subtitle: "Prototype for Cross-Platform",
    techStack: ["Python", "Sockets", "Local Database"],
    points: [
      "Built a LAN/Wi-Fi chat system using socket programming for fast device-to-device messaging.",
      "Implemented message storage using a lightweight local database for offline persistence.",
      "Designed modular architecture for extending future features such as background services and secure communication."
    ]
  },
  {
    title: "Modular App Development Prototype",
    subtitle: "Cluster Ecosystem Concept",
    techStack: ["Python", "Java", "Local Storage"],
    points: [
      "Designed early modular structures for multi-component applications.",
      "Focused on local-device storage, interoperability, and system-level efficiency.",
      "Configured clean UI interactions and ensured cross-module compatibility during testing."
    ]
  }
];

export const EDUCATION: Education = {
  degree: "Bachelor of Technology (B.Tech)",
  field: "Computer Engineering",
  institution: "Sigma Institute of Technology",
  location: "Vadodara",
  graduation: "Expected Graduation: 2026"
};

export const COURSEWORK = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Statistics for Data Science",
  "Python Programming",
  "Machine Learning Basics",
  "Data Visualization"
];
