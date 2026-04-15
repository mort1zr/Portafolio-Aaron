import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaSteam } from 'react-icons/fa';
import { personalInfo } from '../../data/portfolio';
import './Contact.css';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      formRef.current?.reset();
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact__bg-blob" aria-hidden="true" />
      <div className="section-inner">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Contacto</p>
          <h2 className="section-title">
            ¡Trabajemos <span className="gradient-text">juntos!</span>
          </h2>
          <p className="section-subtitle">
            ¿Tienes un proyecto en mente o quieres hablar? No dudes en escribirme.
          </p>
          <div className="divider" />
        </motion.div>

        <div className="contact__grid">
          {/* Info panel */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="contact__info-item glass-card">
              <FaEnvelope className="contact__info-icon" />
              <div>
                <p className="contact__info-label">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="contact__info-value">
                  {personalInfo.email}
                </a>
              </div>
            </div>
            <div className="contact__info-item glass-card">
              <FaMapMarkerAlt className="contact__info-icon" />
              <div>
                <p className="contact__info-label">Ubicación</p>
              </div>
            </div>

            <div className="contact__socials">
              <p className="contact__socials-label">Redes sociales</p>
              <div className="contact__socials-row">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  aria-label="GitHub"
                  id="contact-github-btn"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  aria-label="LinkedIn"
                  id="contact-linkedin-btn"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.steam}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  aria-label="Steam"
                  id="contact-steam-btn"
                >
                  <FaSteam />
                  <span>Steam</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="contact__success glass-card">
                <span className="contact__success-icon">✅</span>
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por escribir. Te responderé pronto.</p>
                <button
                  className="btn-secondary"
                  onClick={() => setSubmitted(false)}
                  id="contact-send-another-btn"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                className="contact__form glass-card"
                onSubmit={handleSubmit}
                noValidate
                id="contact-form"
              >
                <h3 className="contact__form-title">Envíame un mensaje</h3>
                <div className="contact__form-group">
                  <label htmlFor="contact-name" className="contact__label">Nombre</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    className="contact__input"
                    required
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="contact-email" className="contact__label">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    className="contact__input"
                    required
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact__form-group">
                  <label htmlFor="contact-message" className="contact__label">Mensaje</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="contact__input contact__textarea"
                    required
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary contact__submit"
                  disabled={sending}
                  id="contact-submit-btn"
                >
                  {sending ? (
                    <span className="contact__spinner" />
                  ) : (
                    <>
                      <FaPaperPlane />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
