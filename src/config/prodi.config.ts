export interface ProdiConfig {
  acronym: string;
  name: {
    id: string;
    en: string;
  };
  degree: string;
  degreeTitle: string;
  degreeTitleFull: {
    id: string;
    en: string;
  };
  faculty: {
    id: string;
    en: string;
  };
  university: string;
  universityShort: string;
  theme: {
    primaryColor: string; // Hex code of accent color (e.g. #D49A17)
    primaryTailwind: string; // Tailwind accent class (e.g. mono-yellow)
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
    youtube?: string;
  };
  headOfDepartment: {
    name: string;
    degree: string;
    photoSrc?: string;
  };
  videoProfileUrl?: string;
  sintaUrl?: string;
  portals: {
    id: { label: string; href: string }[];
    en: { label: string; href: string }[];
  };
}

export const PRODI_CONFIG: ProdiConfig = {
  acronym: 'KTF',
  name: {
    id: 'Kriya Tekstil dan Fashion',
    en: 'Textile and Fashion Design',
  },
  degree: 'S1',
  degreeTitle: 'S.Sn.',
  degreeTitleFull: {
    id: 'Sarjana Seni',
    en: 'Bachelor of Applied Arts',
  },
  faculty: {
    id: 'Fakultas Sosial dan Humaniora',
    en: 'Faculty of Social Sciences and Humanities',
  },
  university: 'Universitas Muhammadiyah Bandung',
  universityShort: 'UMB',
  theme: {
    primaryColor: '#CC7722',
    primaryTailwind: 'mono-yellow',
  },
  contact: {
    email: 'ktf@umbandung.ac.id',
    phone: '+62 22 783 0000',
    address: 'Jl. Soekarno-Hatta No. 752, Cipadung Kidul, Panyileukan, Kota Bandung, Jawa Barat 40614',
    instagram: 'kriyatekstilfashion.umb',
    youtube: '@kriyatekstilfashionumb',
  },
  headOfDepartment: {
    name: 'Dra. Saftiyaningsih Ken Atik, M.Ds.',
    degree: 'Ketua Program Studi',
  },
  videoProfileUrl: 'https://www.youtube.com/watch?v=12ER7lJyZOc&feature=youtu.be',
  sintaUrl: 'https://sinta.kemdiktisaintek.go.id/departments/authors/4508/B1E2C1BA-7DA9-4D94-AD8D-03A55689849E/00F7C6DB-046D-499C-B6A9-4EBE970BB955',
  portals: {
    id: [
      { label: 'PORTAL IGRACIAS', href: 'https://igracias.umbandung.ac.id' },
      { label: 'TUR KAMPUS', href: '#' },
      { label: 'PANDUAN AKADEMIK', href: '#' },
      { label: 'BEASISWA', href: '#' },
    ],
    en: [
      { label: 'IGRACIAS PORTAL', href: 'https://igracias.umbandung.ac.id' },
      { label: 'CAMPUS TOUR', href: '#' },
      { label: 'ACADEMIC GUIDANCE', href: '#' },
      { label: 'SCHOLARSHIP', href: '#' },
    ],
  },
};
