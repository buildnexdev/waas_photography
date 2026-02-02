import React, { useState } from 'react';
import './Contact.css';

// --- Form backend: use Formspree (recommended) or Google Forms ---
// Formspree: sign up at https://formspree.io, create a form, paste your endpoint below.
// Submissions go to your email + Formspree dashboard (no 400 issues).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjzgzoo';

const GOOGLE_FORM_POST_URL =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeLpQA2_86LM2P8EtwL9zKMERnheGsly4rupsg8ZIR0b6E35A/formResponse';
const GOOGLE_FORM_ENTRY_IDS = {
    name: 'entry.1955117638',
    email: 'entry.1162106594',
    inquiryType: 'entry.1485374615',
    message: 'entry.995335697',
};

const Contact = () => {
    const team = [
        { name: 'Anand', role: 'Sales', phone: '85082 36736' },
        { name: 'Wasim', role: 'DOP & Sales', phone: '95005 44922' },
        { name: 'Shankar', role: 'Marketing', phone: '90035 50703' },
        { name: 'Hari', role: 'Marketing', phone: '95978 11966' },
        { name: 'Kumaran', role: 'Marketing', phone: '96290 06033' },
    ];

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiryType: 'Wedding Photography',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.message.trim()) {
            alert('Please enter your name and message.');
            return;
        }

        setLoading(true);

        try {
            if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT.includes('formspree.io')) {
                // Formspree: reliable, submissions to email + dashboard
                const res = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        inquiryType: formData.inquiryType,
                        message: formData.message,
                    }),
                });
                if (!res.ok) throw new Error('Submit failed');
            } else {
                // Google Forms (often returns 400 from external sites)
                const fields = {
                    [GOOGLE_FORM_ENTRY_IDS.name]: formData.name,
                    [GOOGLE_FORM_ENTRY_IDS.email]: formData.email,
                    [GOOGLE_FORM_ENTRY_IDS.inquiryType]: formData.inquiryType,
                    [GOOGLE_FORM_ENTRY_IDS.message]: formData.message,
                };
                const encodedBody = Object.entries(fields)
                    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                    .join('&')
                    .replace(/%20/g, '+');
                await fetch(GOOGLE_FORM_POST_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: encodedBody,
                });
            }
            setSuccess(true);
            setFormData({ name: '', email: '', inquiryType: 'Wedding Photography', message: '' });
            setTimeout(() => setSuccess(false), 4000);
        } catch {
            alert('Could not send. Try Formspree (see comment in Contact.jsx) or try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                

                <div className="contact-grid">
                    <div className="contact-info">
                        <h3>Contact Our Team</h3>
                        <p className="contact-desc">
                            Have a question or want to book a session? Reach out to our dedicated team members directly.
                        </p>

                        <div className="team-list">
                            {team.map((member, index) => (
                                <div key={index} className="team-member">
                                    <div className="member-details">
                                        <h4>{member.name}</h4>
                                        <span>{member.role}</span>
                                    </div>
                                    <a
                                        href={`tel:${member.phone.replace(/\s/g, '')}`}
                                        className="phone-link"
                                    >
                                        {member.phone}
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="quick-links">
                            <a
                                href="https://wa.me/918508236736"
                                className="whatsapp-cta"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="icon">💬</span> Chat on WhatsApp
                            </a>
                            <div className="instagram-link">
                                Follow us on Instagram:
                                <a
                                    href="https://instagram.com/waas_photography_"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <strong>@waas_photography_</strong>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Inquiry Type</label>
                                <select
                                    name="inquiryType"
                                    value={formData.inquiryType}
                                    onChange={handleChange}
                                >
                                    <option>Wedding Photography</option>
                                    <option>Corporate Event</option>
                                    <option>Portrait Session</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    placeholder="Tell us about your event"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                       

                    </div>
                </div>
                {/* Success message – fixed so it's always visible */}
                {success && (
                    <div className="success-toast" role="alert">
                        ✅ Thank you! Your message has been sent successfully.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
