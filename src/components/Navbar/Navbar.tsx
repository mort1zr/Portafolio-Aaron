import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useActiveSection } from '../../hooks/useActiveSection';
import { personalInfo } from '../../data/portfolio';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'contact', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link
          to="hero"
          spy smooth duration={600}
          className="navbar__logo"
          onClick={() => setMobileOpen(false)}
        >
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="gradient-text">{personalInfo.name}</span>
          <span className="navbar__logo-bracket"> /&gt;</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                spy
                smooth
                duration={600}
                offset={-72}
                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={personalInfo.cv}
          className="btn-primary navbar__cta"
          target="_blank"
          rel="noopener noreferrer"
          id="navbar-cv-btn"
        >
          Mi CV
        </a>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          id="navbar-hamburger-btn"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                spy
                smooth
                duration={600}
                offset={-72}
                className={`navbar__mobile-link ${activeSection === link.id ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={personalInfo.cv}
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
            >
              Mi CV
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
