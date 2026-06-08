import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALUMNI_TESTIMONIALS } from '@/lib/site-data';

const SQRT_5000 = Math.sqrt(5000);

interface TestimonialCardProps {
  position: number;
  testimonial: typeof ALUMNI_TESTIMONIALS[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out',
        isCenter
          ? 'z-10 bg-mono-yellow text-mono-black border-mono-yellow'
          : 'z-0 bg-neutral-900 text-white/60 border-white/15 hover:border-mono-yellow/50'
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 40 : 10}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? '0px 8px 0px 4px #000000' : '0px 0px 0px 0px transparent',
      }}
    >
      <span
        className={cn(
          'absolute block origin-top-right rotate-45',
          isCenter ? 'bg-mono-black/10' : 'bg-white/10'
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split('(')[0]}`}
        className="mb-4 h-14 w-12 bg-neutral-800 object-cover object-top"
        style={{
          boxShadow: isCenter ? '3px 3px 0px #0D0D0D' : '3px 3px 0px var(--primary-color)',
        }}
      />
      <h3
        className={cn(
          'text-base sm:text-lg font-serif leading-relaxed',
          isCenter ? 'text-mono-black' : 'text-white/95'
        )}
      >
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          'absolute bottom-8 left-8 right-8 mt-2 text-[10px] tech-tag uppercase tracking-widest',
          isCenter ? 'text-mono-black/70' : 'text-white/40'
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

interface StaggerTestimonialsProps {
  lang: 'id' | 'en';
  testimonialsListProp?: any[];
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ lang, testimonialsListProp }) => {
  const [cardSize, setCardSize] = useState(365);

  const englishTestimonials = [
    {
      id: 'test-1',
      tempId: 0,
      testimonial: 'The curriculum focusing on traditional craft techniques with a touch of modern design is highly relevant to today\'s textile craft industry.',
      by: 'Andini Kusuma, S.Ds (Creative Designer at Oltre Textile Studio)',
      imgSrc: '/assets/alumni_1.png',
    },
    {
      id: 'test-2',
      tempId: 1,
      testimonial: 'The studio internship program gave me the opportunity to network directly with the national creative industry from the very beginning.',
      by: 'Rian Hidayat, S.Ds (Textile Designer at PT Sritex Tbk)',
      imgSrc: '/assets/alumni_2.png',
    },
    {
      id: 'test-3',
      tempId: 2,
      testimonial: 'KTF UMB truly honed my creative thinking in combining local materials with modern technology.',
      by: 'Melati Indah, S.Ds (Founder of Bumi Eco-Wear)',
      imgSrc: '/assets/alumni_1.png',
    },
    {
      id: 'test-4',
      tempId: 3,
      testimonial: 'The collaborative studio atmosphere got me used to experimenting with designs without being afraid to fail.',
      by: "Fauzan Adhi, S.Ds (Fashion Stylist at Harper's Bazaar)",
      imgSrc: '/assets/alumni_2.png',
    },
    {
      id: 'test-5',
      tempId: 4,
      testimonial: 'Regular portfolio guidance during my studies made it very easy for me to apply for jobs at international fashion retail brands.',
      by: 'Sarah Amalia, S.Ds (Visual Merchandiser at H&M)',
      imgSrc: '/assets/alumni_1.png',
    },
    {
      id: 'test-6',
      tempId: 5,
      testimonial: 'Thanks to intensive mentoring from industry-practitioner lecturers, I was able to release my graduation collection at a national exhibition.',
      by: 'Yusuf Maulana, S.Ds (Independent Fiber Artist)',
      imgSrc: '/assets/alumni_2.png',
    },
  ];

  const getInitialList = () => {
    if (testimonialsListProp && testimonialsListProp.length > 0) {
      return testimonialsListProp;
    }
    return lang === 'en' ? englishTestimonials : ALUMNI_TESTIMONIALS;
  };
  const [testimonialsList, setTestimonialsList] = useState(getInitialList);

  useEffect(() => {
    if (testimonialsListProp && testimonialsListProp.length > 0) {
      setTestimonialsList(testimonialsListProp);
    } else {
      setTestimonialsList(lang === 'en' ? englishTestimonials : ALUMNI_TESTIMONIALS);
    }
  }, [lang, testimonialsListProp]);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-mono-black border-b border-white/10"
      style={{ height: 650 }}
    >
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <p className="tech-tag text-mono-yellow mb-2">SUCCESS STORIES // ALUMNI NETWORK</p>
        <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-white">
          {lang === 'en' ? 'Alumni Testimonials' : 'Testimoni Alumni'}
        </h2>
      </div>

      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length - 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.id + '-' + testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 z-10">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            'flex h-12 w-12 items-center justify-center transition-colors',
            'bg-neutral-900 border border-white/10 text-white hover:bg-mono-yellow hover:border-mono-yellow hover:text-mono-black',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-yellow'
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            'flex h-12 w-12 items-center justify-center transition-colors',
            'bg-neutral-900 border border-white/10 text-white hover:bg-mono-yellow hover:border-mono-yellow hover:text-mono-black',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-yellow'
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
