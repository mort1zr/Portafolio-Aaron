import { motion, type Variants } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolio';
import './About.css';
import avatarImg from '../../assets/descarga.jfif';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};


export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section-inner about__inner">
        {/* Avatar side */}
        <motion.div
          className="about__avatar-wrap"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="about__avatar-glow" aria-hidden="true" />
          <div className="about__avatar">
            <img src={avatarImg} alt="Avatar" className="about__avatar-image" />
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          className="about__content"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p className="section-label" variants={fadeUp}>Sobre mí</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Pasión por la tecnología,<br />
            <span className="gradient-text">enfoquado en resultados</span>
          </motion.h2>
          <div className="divider" />
          <motion.p className="about__bio" variants={fadeUp}>
            {personalInfo.bio}
          </motion.p>

          <motion.div className="about__details" variants={fadeUp}>
            <div className="about__detail">
              <FaEnvelope className="about__detail-icon" />
              <a href={`mailto:${personalInfo.email}`} className="about__detail-link">
                {personalInfo.email}
              </a>
            </div>
          </motion.div>

          <motion.div className="about__actions" variants={fadeUp}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="about-github-btn"
            >
              Ver GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              id="about-linkedin-btn"
            >
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
