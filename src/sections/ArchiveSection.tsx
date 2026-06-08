import { MONO_PRODUCTS } from '@/lib/site-data';
import { PRODI_CONFIG } from '../config/prodi.config';

interface ArchiveSectionProps {
  lang: 'id' | 'en';
}

export function ArchiveSection({ lang }: ArchiveSectionProps) {
  return (
    <section id="archive" className="w-full py-24 lg:py-32 px-6 lg:px-12 bg-white border-b border-mono-black/10">
      {/* Section Header */}
      <div className="mb-16 max-w-7xl mx-auto fade-in-element">
        <div className="flex items-end justify-between">
          <div>
            <p className="tech-tag text-mono-black/50 mb-3">ACHIEVEMENTS // EXHIBITION GALLERY</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-wide">
              {lang === 'en' ? 'Achievement Gallery' : 'Galeri Prestasi'}
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="tech-tag text-mono-black/40 text-right">
              {MONO_PRODUCTS.length} FEATURED AWARDS
            </p>
            <p className="tech-tag text-mono-black/40 text-right">ACADEMIC EXCELLENCE</p>
          </div>
        </div>
      </div>

      {/* Asymmetric Achievements Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {MONO_PRODUCTS.map((product, index) => {
          // Stagger animation delay classes
          const delayClass =
            index % 3 === 1
              ? 'delay-100'
              : index % 3 === 2
                ? 'delay-200'
                : 'delay-300';

          return (
            <div
              key={product.sku}
              className={`product-card group fade-in-element ${product.gridClass || ''} ${delayClass}`}
            >
              <div className={`relative overflow-hidden bg-neutral-100 ${product.aspectRatio} group`}>
                <img
                  src={product.imgSrc}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Technical Tags Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                  <span className="tech-tag bg-white/90 px-2 py-1 text-mono-black font-semibold">{product.sku}</span>
                  <span className="tech-tag bg-white/90 px-2 py-1 text-mono-yellow font-bold">{product.fabric}</span>
                </div>

                {/* View Karya Button */}
                <a
                  href={`mailto:${PRODI_CONFIG.contact.email}?subject=Prestasi%20Karya%20-%20${product.name}`}
                  className="add-to-cart absolute bottom-4 left-4 right-4 py-3 bg-mono-black text-white text-xs tracking-ultra-wide block text-center hover:bg-mono-yellow hover:text-mono-black transition-colors no-underline z-10"
                >
                  {lang === 'en' ? 'VIEW WORK' : 'LIHAT KARYA'}
                </a>
              </div>

              <div className="mt-4">
                <h3 className="font-serif text-xl">{product.name}</h3>
                <p className="tech-tag text-mono-black/50 mt-1">{product.material}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-16 text-center fade-in-element">
        <button className="ghost-btn px-12 py-4 border border-mono-black text-mono-black text-xs tracking-ultra-wide bg-transparent hover:bg-mono-black hover:text-white transition-colors">
          {lang === 'en' ? 'VIEW ALL ACHIEVEMENTS' : 'LIHAT SEMUA PRESTASI'}
        </button>
      </div>
    </section>
  );
}
