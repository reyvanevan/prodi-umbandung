import { PROGRAM_HIGHLIGHTS } from '@/lib/site-data';
import { cn } from '@/lib/utils';

interface ProgramsSectionProps {
  lang: 'id' | 'en';
}

export function ProgramsSection({ lang }: ProgramsSectionProps) {
  const highlightsList = lang === 'en' ? [
    {
      id: 'prog-1',
      title: 'MBKM Internal & External',
      tag: 'PROGRAM: MERDEKA_BELAJAR',
      description: 'Convert SKS through tech industry internships, smart systems research, digital village community work, student exchanges, and startup entrepreneurship.',
      details: ['Software & Cloud Industry Internship', 'Collaborative AI Research', 'National Student Exchange', 'UMB Merdeka Entrepreneurship'],
    },
    {
      id: 'prog-2',
      title: 'Global IT Professional Certification',
      tag: 'CREDENTIAL: LSP_COMPETENCY',
      description: 'Each graduate is equipped with information technology competency certifications recognized nationally and internationally.',
      details: ['Software Engineer Competency', 'CCNA/Mikrotik Network Certification', 'BNSP National Recognition', 'Project Portfolio Assessment Support'],
    },
    {
      id: 'prog-3',
      title: 'Accelerated Study / Fast Track',
      tag: 'TIMELINE: ACCELERATED_STUDY',
      description: 'An integrated curriculum design that helps students complete their undergraduate studies efficiently with ready-to-work outcomes.',
      details: ['Project-Integrated Curriculum', 'Focused Final Project Advising', 'Industry Expert Mentorship', 'Graduate Project Solo Exhibition'],
    },
    {
      id: 'prog-4',
      title: 'Outcome-Based Education',
      tag: 'METHODOLOGY: OBE_CURRICULUM',
      description: 'Learning methodology focused on real outcomes (software products, IoT systems, and periodic collaborative projects).',
      details: ['Project-Based Outcomes Assessment', 'Regular Portfolio Evaluation', 'Industrial Alignment', 'Studio-Theory Synthesis'],
    },
  ] : PROGRAM_HIGHLIGHTS;

  return (
    <section id="program" className="w-full py-24 lg:py-32 bg-neutral-50 border-b border-mono-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 fade-in-element">
          <p className="tech-tag text-mono-black mb-3">CURRICULUM // EXCELLENCE</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide">
            {lang === 'en' ? 'Featured Programs' : 'Program Unggulan'}
          </h2>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {highlightsList.map((program, index) => {
            const delayClass = index % 2 === 1 ? 'delay-200' : '';

            return (
              <div
                key={program.id}
                className={cn(
                  'bg-white border border-mono-black/10 p-8 flex flex-col justify-between hover:border-mono-black transition-colors duration-300 fade-in-element',
                  delayClass
                )}
              >
                <div>
                  {/* Technical Header */}
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-mono-black/10">
                    <span className="tech-tag text-mono-black font-semibold">
                      {program.tag}
                    </span>
                    <span className="tech-tag text-mono-black/30">
                      KEY: 00{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl lg:text-3xl mb-4 text-mono-black">
                    {program.title}
                  </h3>
                  <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-8">
                    {program.description}
                  </p>
                </div>

                {/* Bullets List */}
                <ul className="space-y-2.5 p-0 m-0 list-none">
                  {program.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-mono-black shrink-0" />
                      <span className="tech-tag text-mono-black/70 text-xs">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
