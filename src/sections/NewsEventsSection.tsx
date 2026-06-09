import React, { useState, useEffect } from 'react';
import { getNews, getEvents } from '@/lib/supabase/db';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { ACADEMIC_NEWS, ACADEMIC_EVENTS } from '@/lib/site-data';
import { PRODI_CONFIG } from '@/config/prodi.config';

interface NewsEventsSectionProps {
  lang: 'id' | 'en';
  newsList?: any[];
  eventsList?: any[];
}

export function NewsEventsSection({ lang, newsList, eventsList }: NewsEventsSectionProps) {
  const [dbNews, setDbNews] = useState<any[] | undefined>(newsList);
  const [dbEvents, setDbEvents] = useState<any[] | undefined>(eventsList);

  useEffect(() => {
    // Sync props to state if props are provided
    if (newsList) {
      setDbNews(newsList);
    }
    if (eventsList) {
      setDbEvents(eventsList);
    }

    if (newsList && eventsList) return;
    if (!isSupabaseConfigured) return;

    const loadData = async () => {
      if (!newsList) {
        const fetchedNews = await getNews();
        if (fetchedNews) {
          setDbNews(
            fetchedNews.map((item) => ({
              id: item.id,
              title: lang === 'en' ? (item.title_en || item.title) : item.title,
              category: lang === 'en' ? (item.category_en || item.category) : item.category,
              snippet: lang === 'en' ? (item.snippet_en || item.snippet) : item.snippet,
              date: item.date,
              imgSrc: item.img_src,
            }))
          );
        }
      }

      if (!eventsList) {
        const fetchedEvents = await getEvents();
        if (fetchedEvents) {
          setDbEvents(
            fetchedEvents.map((item) => ({
              id: item.id,
              dateDay: item.date_day,
              dateMonth: item.date_month,
              title: lang === 'en' ? (item.title_en || item.title) : item.title,
              location: lang === 'en' ? (item.location_en || item.location) : item.location,
            }))
          );
        }
      }
    };
    loadData();
  }, [lang, newsList, eventsList]);

  const defaultNews = lang === 'en' ? [
    {
      id: 'news-1',
      title: 'IoT Training for Smart Agriculture in Local Cooperatives',
      date: '02 JUN 2026',
      category: 'COMMUNITY SERVICE',
      snippet: `Training on utilizing Internet of Things (IoT) sensors to monitor soil moisture for local farming cooperatives, led by the faculty of ${PRODI_CONFIG.acronym} ${PRODI_CONFIG.universityShort}.`,
      imgSrc: '/assets/portfolio-ecoprint.jpg',
    },
    {
      id: 'news-2',
      title: `${PRODI_CONFIG.acronym} Student Wins Best App Developer at National Hackathon`,
      date: '28 MAY 2026',
      category: 'STUDENT ACHIEVEMENT',
      snippet: 'Developing a localized disaster alert mobile application, our student team won the first place in the national competition.',
      imgSrc: '/assets/portfolio-woven-bag.jpg',
    },
    {
      id: 'news-3',
      title: 'Collaborative AI Research Partnership with Global Tech Corporation',
      date: '15 MAY 2026',
      category: 'RESEARCH COLLABORATION',
      snippet: 'The study program signed a partnership to build advanced local machine learning research capabilities and internship pathways.',
      imgSrc: '/assets/philosophy-lab-editorial.jpg',
    },
  ] : ACADEMIC_NEWS;

  const defaultEvents = lang === 'en' ? [
    {
      id: 'event-1',
      dateDay: '18',
      dateMonth: 'JUN',
      title: `${PRODI_CONFIG.acronym} Expo 2026: Capstone Project Showcase & Tech Exhibition`,
      location: `MAIN HALL, ${PRODI_CONFIG.universityShort.toUpperCase()}`,
    },
    {
      id: 'event-2',
      dateDay: '25',
      dateMonth: 'JUN',
      title: 'Cybersecurity Bootcamp: Ethical Hacking & Penetration Testing',
      location: `MAIN LAB, ${PRODI_CONFIG.universityShort.toUpperCase()} BUILDING`,
    },
    {
      id: 'event-3',
      dateDay: '05',
      dateMonth: 'JUL',
      title: 'Public Lecture: Future Trends in AI & Large Language Models',
      location: `MAIN AUDITORIUM, ${PRODI_CONFIG.universityShort.toUpperCase()}`,
    },
  ] : ACADEMIC_EVENTS;

  const finalNews = dbNews && dbNews.length > 0 ? dbNews : defaultNews;
  const finalEvents = dbEvents && dbEvents.length > 0 ? dbEvents : defaultEvents;

  return (
    <section id="berita-agenda" className="w-full py-24 lg:py-32 bg-mono-cream border-b border-mono-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* News Stream (7 columns) */}
          <div className="lg:col-span-7 fade-in-element">
            <p className="tech-tag text-mono-black mb-3">
              {lang === 'en' ? 'JOURNAL // NEWS FEED' : 'JOURNAL // NEWS FEED'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide mb-12">
              {lang === 'en' ? 'Latest News' : 'Berita Terkini'}
            </h2>

            <div className="space-y-12">
              {finalNews.map((news) => (
                <article
                  key={news.id}
                  className="group pb-8 border-b border-mono-black/10 last:border-b-0 flex flex-col md:flex-row gap-6"
                >
                  {/* News Thumbnail Image */}
                  <div className="relative w-full md:w-48 aspect-[4/3] overflow-hidden shrink-0 bg-neutral-100 border border-mono-black/10">
                    <img
                      src={news.imgSrc}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* News Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="tech-tag bg-neutral-100 text-mono-black px-2 py-0.5">
                          {news.category}
                        </span>
                        <span className="tech-tag text-mono-black/40">{news.date}</span>
                      </div>
                      <h3 className="font-serif text-xl lg:text-2xl tracking-wide text-mono-black group-hover:underline transition-all duration-300 leading-snug">
                        <a href="#" className="no-underline text-inherit">
                          {news.title}
                        </a>
                      </h3>
                      <p className="font-sans text-neutral-600 mt-2.5 text-xs md:text-sm leading-relaxed">
                        {news.snippet}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Events Timeline (5 columns) */}
          <div className="lg:col-span-5 fade-in-element delay-200">
            <p className="tech-tag text-mono-black mb-3">
              {lang === 'en' ? 'AGENDA // TIMETABLE' : 'AGENDA // TIMETABLE'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide mb-12">
              {lang === 'en' ? 'Upcoming Events' : 'Event Terkini'}
            </h2>

            <div className="space-y-8">
              {finalEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-6 p-6 border border-mono-black/10 hover:border-mono-black transition-colors duration-300 bg-white"
                >
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center bg-mono-black text-white w-16 h-16 shrink-0 border-b-2 border-white">
                    <span className="font-serif text-2xl font-bold leading-none">
                      {event.dateDay}
                    </span>
                    <span className="tech-tag text-[9px] text-white/60 tracking-wider mt-1">
                      {event.dateMonth}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-serif text-lg leading-snug text-mono-black mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-mono-black/50"
                      >
                        <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5C14.5 4.4 11.6 1.5 8 1.5Z" />
                        <circle cx="8" cy="8" r="2.5" />
                      </svg>
                      <span className="tech-tag text-mono-black/50 text-[10px]">
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
