import { useState } from 'react';
import { FaGithub, FaLinkedin, FaHeart, FaSteam, FaCopy, FaCheck } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { personalInfo } from '../../data/portfolio';
import './Footer.css';

const NAV_LINKS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'experience', label: 'Experiencia' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <footer className="footer" id="footer">
      <div className="footer__top-line" aria-hidden="true" />
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <span className="footer__logo-bracket">&lt;</span>
            <span className="gradient-text">{personalInfo.name}</span>
            <span className="footer__logo-bracket"> /&gt;</span>
          </span>
          <p></p>
          <div className="footer__socials">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="GitHub"
              id="footer-github-link"
            >
              <FaGithub />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="LinkedIn"
              id="footer-linkedin-link"
            >
              <FaLinkedin />
            </a>
            <a
              href={personalInfo.steam}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="Steam"
              id="footer-steam-link"
            >
              <FaSteam />
            </a>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <p className="footer__nav-title">Secciones</p>
          <ul className="footer__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  spy
                  smooth
                  duration={600}
                  offset={-72}
                  className="footer__nav-link"
                  id={`footer-link-${link.id}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact">
          <p className="footer__nav-title">Contacto</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a href={`mailto:${personalInfo.email}`} className="footer__contact-email">
              {personalInfo.email}
            </a>
            <button 
              onClick={handleCopyEmail}
              aria-label="Copiar correo"
              style={{
                background: 'none',
                border: 'none',
                color: copied ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.2rem',
                transition: 'color 0.2s',
              }}
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {currentYear} {personalInfo.fullName}. Todos los derechos reservados.
        </p>
        <p className="footer__made-with">
          Hecho con <FaHeart className="footer__heart" /> y React + TypeScript
        </p>
      </div>
    </footer>
  );
}
