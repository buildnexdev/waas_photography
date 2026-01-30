import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const team = [
        { name: 'Anand', role: 'Sales', phone: '85082 36736' },
        { name: 'Wasim', role: 'DOP & Sales', phone: '95005 44922' },
        { name: 'Shankar', role: 'Marketing', phone: '90035 50703' },
        { name: 'Hari', role: 'Marketing', phone: '95978 11966' },
        { name: 'Kumaran', role: 'Marketing', phone: '96290 06033' },
    ];

    // Sales team to receive the form message (Anand & Wasim)
    // const salesContacts = team.slice(0, 2);

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



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.message.trim()) {
            alert('Please enter your name and message.');
            return;
        }

        const emailRecipient = 'waasphotography4@gmail.com';
        const subject = encodeURIComponent(`New Inquiry: ${formData.inquiryType} from ${formData.name}`);
        const bodyContent =
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Inquiry Type: ${formData.inquiryType}\n\n` +
            `Message:\n${formData.message}`;

        const body = encodeURIComponent(bodyContent);

        window.location.href = `mailto:${emailRecipient}?subject=${subject}&body=${body}`;
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
                                    <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="phone-link">
                                        {member.phone}
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="quick-links">
                            <a href="https://wa.me/918508236736" className="whatsapp-cta" target="_blank" rel="noreferrer">
                                <span className="icon">💬</span> Chat on WhatsApp
                            </a>
                            <div className="instagram-link">
                                Follow us on Instagram: <strong>@waas_photography_</strong>
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
                            <button type="submit" className="btn-primary">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
