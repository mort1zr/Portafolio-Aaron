// ===================================
// PORTFOLIO DATA — Edit this file to
// customize all your content
// ===================================

import cvFile from './CV_Aaron_Ortiz.pdf';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: string; // react-icons name abbreviation
  category: 'frontend' | 'backend' | 'frameworks' | 'database' | 'tools';
}

export interface Experience {
  id: number;
  type: 'work' | 'education';
  title: string;
  company: string;
  period: string;
  description: string | string[];
  tags?: string[];
}

export const personalInfo = {
  name: 'Aaron',
  fullName: 'Aaron Eduardo Ortiz Valdivia',
  subtitle: 'Estudiante de 9° ciclo de la carrera de Ingeniería de Sistemas de Información en la Universidad San Ignacio de Loyola (USIL)',
  email: 'aaronov23@gmail.com',
  bio: 'Estudiante de 9no ciclo de Ingeniería en Sistemas de Información en la Universidad San Ignacio de Loyola (USIL), perteneciente al quinto superior, con habilidades en liderazgo, gestión de proyectos y resolución de problemas. Apasionado por la tecnología y el aprendizaje continuo, con experiencia en bases de datos, herramientas analíticas y automatización de procesos. Me caracterizo por un enfoque analítico, organizado y orientado a resultados, con capacidad para aprender rápidamente, documentar procesos y colaborar con equipos multidisciplinarios. Me encuentro en la búsqueda de oportunidades para desarrollar mis conocimientos y aportar soluciones innovadoras en el campo de la ingeniería de sistemas.',
  github: 'https://github.com/mort1zr',
  linkedin: 'https://linkedin.com/in/aaron-ortiz-0b2057311',
  steam: 'https://steamcommunity.com/profiles/76561198990074923/',
  cv: cvFile,
};

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: 'react_dark.svg', category: 'frontend' },
  { name: 'TypeScript', icon: 'typescript.svg', category: 'frontend' },
  { name: 'HTML', icon: 'html5.svg', category: 'frontend' },
  { name: 'CSS', icon: 'css_old.svg', category: 'frontend' },
  { name: 'JavaScript', icon: 'javascript.svg', category: 'frontend' },
  // Backend
  { name: 'Java', icon: 'java.svg', category: 'backend' },
  { name: "C#", icon: "csharp.svg", category: "backend" },
  { name: "C++", icon: "c-plusplus.svg", category: "backend" },
  { name: "Python", icon: "python.svg", category: "backend" },
  { name: 'REST APIs', icon: 'rest-api-svgrepo-com.svg', category: 'backend' },
  // Frameworks
  { name: "ASP.NET", icon: "dotnet.svg", category: "frameworks" },
  { name: 'Spring Boot', icon: 'spring.svg', category: 'frameworks' },
  // Database
  { name: 'MySQL', icon: 'MySQL_dark.svg', category: 'database' },
  { name: "SQL Server", icon: "sql-server.svg", category: "database" },
  { name: 'Oracle', icon: 'oracle-corporation-logo.svg', category: 'database' },
  { name: 'MongoDB', icon: 'MongoDB_dark.svg', category: 'database' },
  // Tools
  { name: 'Git', icon: 'git.svg', category: 'tools' },
  { name: 'GitHub', icon: 'GitHub_dark.svg', category: 'tools' },
  { name: 'Docker', icon: 'docker.svg', category: 'tools' },
  { name: "Postman", icon: "postman.svg", category: "tools" },
  { name: "Figma", icon: "figma.svg", category: "tools" }
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Personal',
    description: 'Este mismo portafolio — construido con React + TypeScript, Framer Motion y Vite. Diseño dark mode con animaciones fluidas.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Vite'],
    githubUrl: 'https://github.com/mort1zr/Portafolio-Aaron',
    liveUrl: 'https://mort1zr.github.io/Portafolio-Aaron/'
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    type: 'work',
    title: 'Cast Member - Quick Service Food & Beverage',
    company: 'The Walt Disney Company',
    period: 'Diciembre 2025 — Febrero 2026 ',
    description: [
      'Brindé atención al cliente de alto volumen en un entorno dinámico, garantizando la satisfacción de los visitantes bajo los estándares de calidad global de Disney.',
      'Operé sistemas de punto de venta (POS) y procesé transacciones de manera eficiente, manteniendo la precisión en el manejo de caja.',
      'Colaboré dentro de un equipo de trabajo multicultural para optimizar los tiempos de servicio y cumplir con protocolos de seguridad, higiene y eficiencia.',
      'Resolví dudas y problemas operativos en tiempo real para mantener el flujo de servicio y proteger la experiencia del huésped.'
    ],
    tags: [],
  }
];
