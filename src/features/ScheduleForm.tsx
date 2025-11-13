'use client'

import { useState } from 'react'
import styles from './ScheduleForm.module.css'
import SectionShell from '@/components/ui/SectionShell'
import Typography from '@/components/ui/Typography'
import Text from '@/components/ui/Text'

export default function ScheduleForm() {
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

  const title = 'Schedule a Tour'
  const subtitle = 'Plan Your Visit'
  const description = 'Experience the magic of Rum River Barn in person. Book your private tour today.'
  const submitText = 'Schedule Your Tour'

  return (
    <SectionShell
      className={styles.scheduleTour}
      data-section="schedule-form"
      header={{
        scriptAccent: subtitle,
        title: title,
        lead: description,
        align: 'center'
      }}
      paddingY="lg"
      spacing="content-flow"
      container="content"
      background="surface"
      tone="auto"
    >
        <div className={styles.formContainer}>
        <form className={styles.tourForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <Text as="label" htmlFor="name" size="sm" weight="medium" className={styles.formLabel}>
                Your Name *
              </Text>
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
              <Text as="label" htmlFor="email" size="sm" weight="medium" className={styles.formLabel}>
                Email Address *
              </Text>
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
              <Text as="label" htmlFor="phone" size="sm" weight="medium" className={styles.formLabel}>
                Phone Number
              </Text>
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
              <Text as="label" htmlFor="date" size="sm" weight="medium" className={styles.formLabel}>
                Preferred Date
              </Text>
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
            <Text as="label" htmlFor="guests" size="sm" weight="medium" className={styles.formLabel}>
              Expected Guest Count
            </Text>
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
            <Text as="label" htmlFor="message" size="sm" weight="medium" className={styles.formLabel}>
              Tell Us About Your Vision
            </Text>
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
    </SectionShell>
  );
}
