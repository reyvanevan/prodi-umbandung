import { useState } from 'react';

interface PortfolioCardProps {
  image: string;
  title: string;
  medium: string;
  technique: string;
  year: string;
}

export function PortfolioCard({
  image,
  title,
  medium,
  technique,
  year,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div
        className="relative overflow-hidden bg-[#E5E5E5] flex-1 border border-[#E5E5E5]"
        style={{ minHeight: 250 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
          loading="lazy"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-x-0 bottom-0 transition-opacity duration-300 ease-out flex flex-col justify-end"
          style={{
            background: 'linear-gradient(transparent, rgba(13,13,13,0.8))',
            padding: '48px 16px 16px',
            opacity: isHovered ? 1 : 0,
          }}
        >
          <h3 className="text-white font-display text-2xl leading-none">{title}</h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              { label: 'Medium', value: medium },
              { label: 'Technique', value: technique },
              { label: 'Year', value: year },
            ].map((tag) => (
              <span
                key={tag.label}
                className="tech-tag px-2 py-0.5"
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                }}
              >
                {tag.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Static info below image */}
      <h3
        className="font-body text-[15px] font-medium mt-3"
        style={{ color: '#111111' }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5 mt-1.5">
        {[
          { label: 'Medium', value: medium },
          { label: 'Technique', value: technique },
          { label: 'Year', value: year },
        ].map((tag) => (
          <span
            key={tag.label}
            className="tech-tag px-2 py-0.5"
            style={{
              color: '#8A8A8A',
              backgroundColor: 'rgba(0,0,0,0.04)',
            }}
          >
            {tag.value}
          </span>
        ))}
      </div>
    </div>
  );
}
