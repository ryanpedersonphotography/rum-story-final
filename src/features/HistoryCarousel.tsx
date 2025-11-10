'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import SectionWrapper from '@/components/ui/SectionWrapper'
import styles from './HistoryCarousel.module.css'

export default function HistoryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplayOn, setIsAutoplayOn] = useState(true)

  const slides = [
    {
      year: '2010',
      title: 'The Beginning',
      description: 'From a vision to reality, Rum River Barn opened its doors to couples seeking a rustic yet elegant wedding venue in the heart of Minnesota.',
      image: 'https://a.storyblok.com/f/288003/1600x1000/a1b2c3d4e5/history-2010.jpg'
    },
    {
      year: '2015',
      title: 'Expansion & Growth',
      description: 'As word spread about our stunning venue and exceptional service, we expanded our facilities to accommodate larger celebrations while maintaining our intimate charm.',
      image: 'https://a.storyblok.com/f/288003/1600x1000/b2c3d4e5f6/history-2015.jpg'
    },
    {
      year: '2018',
      title: 'Award Recognition',
      description: 'Honored to be featured in Minnesota Bride and recognized by The Knot as a top wedding venue. Our couples\' joy became our greatest achievement.',
      image: 'https://a.storyblok.com/f/288003/1600x1000/c3d4e5f6g7/history-2018.jpg'
    },
    {
      year: '2024',
      title: 'A Decade of Love',
      description: 'Over 10 years and hundreds of weddings later, we continue to create unforgettable moments for couples. Thank you for making Rum River Barn your choice.',
      image: 'https://a.storyblok.com/f/288003/1600x1000/d4e5f6g7h8/history-2024.jpg'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoplay = () => {
    setIsAutoplayOn(!isAutoplayOn);
  };

  return (
    <SectionWrapper
      paddingY="lg"
      maxWidth="wide"
      background="surface-2"
      theme="inherit"
      className={styles.history}
      header={{
        scriptAccent: 'Our Story',
        title: 'A Journey Through Time',
        lead: 'Discover how Rum River Barn became Minnesota\'s premier wedding destination',
        align: 'center'
      }}
    >

        <div className={styles.carousel}>
          <div className={styles.viewport}>
            <div
              className={styles.container}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {slides.map((slide, index) => (
                <div key={index} className={styles.slide}>
                  <div className={styles.slideInner}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={slide.image}
                        alt={`${slide.title} - ${slide.year}`}
                        className={styles.image}
                        width={1600}
                        height={1000}
                        priority={index === currentSlide}
                      />
                      <div className={styles.gradient}></div>

                      <div className={styles.badge}>
                        <span>{slide.year}</span>
                      </div>

                      <div className={styles.text}>
                        <h3 className={styles.slideTitle}>{slide.title}</h3>
                        <p className={styles.slideDescription}>{slide.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className={`${styles.nav} ${styles.navPrev}`}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            className={`${styles.nav} ${styles.navNext}`}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Autoplay Toggle */}
          <button
            className={styles.autoplay}
            onClick={toggleAutoplay}
            aria-label={isAutoplayOn ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {isAutoplayOn ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Progress Dots */}
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className={styles.counter}>
          <span>
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
