import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaArrowDown, FaSteam } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolio';
import HexGrid from './HexGrid';
import './Hero.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function Hero() {
  return (
    <section id="hero" className="hero section">
      {/* Background glows */}
      <div className="hero__blob hero__blob--purple" aria-hidden="true" />
      <div className="hero__blob hero__blob--blue" aria-hidden="true" />
      {/* Hexagon grid */}
      <HexGrid />

      <div className="section-inner hero__inner">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="badge hero__badge">🟢 Disponible para trabajar</span>
          </motion.div>

          <motion.h1 className="hero__title" variants={itemVariants}>
            <span className="gradient-text">{personalInfo.fullName}</span>
            <br />
          </motion.h1>

          <motion.p className="hero__subtitle" variants={itemVariants}>
            {personalInfo.subtitle}
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <Link
              to="projects"
              spy
              smooth
              duration={700}
              offset={-72}
              className="btn-primary"
              id="hero-see-projects-btn"
            >
              Ver proyectos
            </Link>
            <Link
              to="contact"
              spy
              smooth
              duration={700}
              offset={-72}
              className="btn-secondary"
              id="hero-contact-btn"
            >
              Contactarme
            </Link>
          </motion.div>

          <motion.div className="hero__socials" variants={itemVariants}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub"
              id="hero-github-link"
            >
              <FaGithub />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn"
              id="hero-linkedin-link"
            >
              <FaLinkedin />
            </a>
            <a
              href={personalInfo.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="Steam"
              id="hero-twitter-link"
            >
              <FaSteam />
            </a>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Link to="about" spy smooth duration={600} offset={-72} className="hero__scroll-link">
          <FaArrowDown />
        </Link>
      </motion.div>
    </section>
  );
}
