'use client'

import { useState } from 'react'
import { storyblokEditable } from '@storyblok/react'
import type { SbBlokData } from '@storyblok/react'
import styles from './ScheduleForm.module.css'

interface ScheduleFormStoryblok extends SbBlokData {
  title?: string
  subtitle?: string
  description?: string
  submit_text?: string
}

export default function ScheduleForm({ blok }: { blok: ScheduleFormStoryblok }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const title = blok.title || 'Schedule a Tour'
  const subtitle = blok.subtitle || 'Plan Your Visit'
  const description = blok.description || 'Experience the magic of Rum River Barn in person. Book your private tour today.'
  const submitText = blok.submit_text || 'Schedule Your Tour'

  return (
    <section {...storyblokEditable(blok)} className={styles.scheduleTour} data-section="schedule-form">
        <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <span className={styles.formScript}>{subtitle}</span>
          <h2 className={styles.formTitle}>{title}</h2>
          <p className={styles.formDescription}>
            {description}
          </p>
        </div>

        <form className={styles.tourForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.formInput}
                placeholder="John & Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.formInput}
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.formLabel}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={styles.formInput}
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.formLabel}>
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className={styles.formInput}
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="guests" className={styles.formLabel}>
              Expected Guest Count
            </label>
            <select
              id="guests"
              name="guests"
              className={styles.formSelect}
              value={formData.guests}
              onChange={handleChange}
            >
              <option value="">Select guest count</option>
              <option value="1-50">1-50 guests</option>
              <option value="51-100">51-100 guests</option>
              <option value="101-150">101-150 guests</option>
              <option value="151-200">151-200 guests</option>
              <option value="200+">200+ guests</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              Tell Us About Your Vision
            </label>
            <textarea
              id="message"
              name="message"
              className={styles.formTextarea}
              placeholder="Share your dream wedding details, special requests, or questions..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.formSubmit}>
            {submitText}
          </button>
        </form>
      </div>
    </section>
  );
}
