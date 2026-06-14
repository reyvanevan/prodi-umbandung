import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ALUMNI_TESTIMONIALS } from '@/lib/site-data';
import { useTestimonials } from '@/hooks/useSupabaseData';

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
        'absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out select-none',
        isCenter
          ? 'z-10 bg-mono-black text-white border-mono-black'
          : 'z-0 bg-white/45 text-mono-black/50 border-mono-black/10 hover:border-mono-black/30'
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.4) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 3.5 : -3.5}deg)
          scale(${isCenter ? 1.05 : 0.88})
        `,
        boxShadow: isCenter ? '0px 8px 0px 4px rgba(11, 37, 69, 0.35)' : '0px 0px 0px 0px transparent',
      }}
    >
      <span
        className={cn(
          'absolute block origin-top-right rotate-45',
          isCenter ? 'bg-white/15' : 'bg-mono-black/5'
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
        className="mb-4 h-14 w-12 bg-mono-black/10 object-cover object-top"
        style={{
          boxShadow: isCenter ? '3px 3px 0px #FFFFFF' : '3px 3px 0px rgba(11, 37, 69, 0.15)',
        }}
      />
      <h3
        className={cn(
          'text-base sm:text-lg font-serif leading-relaxed',
          isCenter ? 'text-white' : 'text-mono-black/60'
        )}
      >
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          'absolute bottom-8 left-8 right-8 mt-2 text-[10px] tech-tag uppercase tracking-widest',
          isCenter ? 'text-white/70' : 'text-mono-black/40'
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

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const englishTestimonials = [
    {
      id: 'test-1',
      tempId: 0,
      testimonial: 'The curriculum focusing on modern software engineering and architecture is highly relevant to today\'s tech industry needs.',
      by: 'Andini Kusuma, S.Kom (Software Engineer at Tokopedia)',
      imgSrc: '/assets/alumni_1.png',
    },
    {
      id: 'test-2',
      tempId: 1,
      testimonial: 'The laboratory internship program gave me the opportunity to network directly with cloud and DevOps practitioners from the very beginning.',
      by: 'Rian Hidayat, S.Kom (DevOps Engineer at GoTo)',
      imgSrc: '/assets/alumni_2.png',
    },
    {
      id: 'test-3',
      tempId: 2,
      testimonial: 'Informatics UMB truly honed my logical thinking and capabilities in solving complex problems using artificial intelligence.',
      by: 'Melati Indah, S.Kom (AI Researcher at Bukalapak)',
      imgSrc: '/assets/alumni_1.png',
    },
    {
      id: 'test-4',
      tempId: 3,
      testimonial: 'The collaborative lab atmosphere got me used to experimenting with systems and coding without being afraid to fail.',
      by: 'Fauzan Adhi, S.Kom (Cybersecurity Analyst at Cyber Security Agency)',
      imgSrc: '/assets/alumni_2.png',
    },
    {
      id: 'test-5',
      tempId: 4,
      testimonial: 'Regular portfolio reviews during my studies made it very easy for me to apply for software engineering positions at global tech companies.',
      by: 'Sarah Amalia, S.Kom (Technical Product Manager at Shopee)',
      imgSrc: '/assets/alumni_1.png',
    },
    {
      id: 'test-6',
      tempId: 5,
      testimonial: 'Thanks to intensive mentoring from industry-practitioner lecturers, I was able to deploy a fully functional capstone product.',
      by: 'Yusuf Maulana, S.Kom (Data Scientist at Telkom Indonesia)',
      imgSrc: '/assets/alumni_2.png',
    },
  ];

  const { testimonials: fetchedTestimonials, loading } = useTestimonials(lang);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);

  useEffect(() => {
    let rawList = [];
    if (testimonialsListProp && testimonialsListProp.length > 0) {
      rawList = testimonialsListProp;
    } else if (fetchedTestimonials && fetchedTestimonials.length > 0) {
      rawList = fetchedTestimonials;
    }

    if (rawList.length === 0 && !loading) {
      rawList = lang === 'en' ? englishTestimonials : ALUMNI_TESTIMONIALS;
    }

    if (rawList.length > 0) {
      // Triple the list to hide the wrapper transition on wide screens
      let finalTestimonials = [...rawList];
      if (finalTestimonials.length < 10) {
        finalTestimonials = [
          ...finalTestimonials,
          ...finalTestimonials.map((t, i) => ({ ...t, id: t.id + `-dup1-${i}` })),
          ...finalTestimonials.map((t, i) => ({ ...t, id: t.id + `-dup2-${i}` }))
        ];
      }

      setTestimonialsList(
        finalTestimonials.map((item, idx) => ({
          ...item,
          tempId: idx
        }))
      );
    }
  }, [lang, testimonialsListProp, fetchedTestimonials, loading]);

  if (loading) {
    return (
      <div
        className="relative w-full overflow-hidden bg-white border-b border-mono-black/10 flex flex-col items-center justify-center"
        style={{ height: 700 }}
      >
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none animate-pulse">
          <p className="tech-tag text-mono-black/70 mb-2">SUCCESS STORIES // ALUMNI NETWORK</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-mono-black">
            {lang === 'en' ? 'Alumni Testimonials' : 'Testimoni Alumni'}
          </h2>
        </div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-100 border-2 border-mono-black/10 p-8 animate-pulse flex flex-col justify-between"
          style={{
            width: cardSize,
            height: cardSize,
            clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
          }}
        >
          <div className="h-14 w-12 bg-neutral-200" />
          <div className="space-y-3">
            <div className="h-5 bg-neutral-200 w-full rounded" />
            <div className="h-5 bg-neutral-200 w-5/6 rounded" />
            <div className="h-5 bg-neutral-200 w-4/5 rounded" />
          </div>
          <div className="h-3 bg-neutral-200 w-32 rounded mt-4" />
        </div>
      </div>
    );
  }

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

  return (
    <div
      className="relative w-full overflow-hidden bg-white border-b border-mono-black/10"
      style={{ height: 700 }}
    >
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <p className="tech-tag text-mono-black/70 mb-2">SUCCESS STORIES // ALUMNI NETWORK</p>
        <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-mono-black">
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
            'flex h-12 w-12 items-center justify-center transition-colors cursor-pointer',
            'bg-white border border-mono-black/25 text-mono-black hover:bg-mono-black hover:text-white hover:border-mono-black',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-black'
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            'flex h-12 w-12 items-center justify-center transition-colors cursor-pointer',
            'bg-white border border-mono-black/25 text-mono-black hover:bg-mono-black hover:text-white hover:border-mono-black',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-black'
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
