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
  acronym: 'IF',
  name: {
    id: 'Teknik Informatika',
    en: 'Informatics Engineering',
  },
  degree: 'S1',
  degreeTitle: 'S.Kom.',
  degreeTitleFull: {
    id: 'Sarjana Komputer',
    en: 'Bachelor of Computer Science',
  },
  faculty: {
    id: 'Fakultas Sains dan Teknologi',
    en: 'Faculty of Science and Technology',
  },
  university: 'Universitas Muhammadiyah Bandung',
  universityShort: 'UMB',
  theme: {
    primaryColor: '#0B2545',
    primaryTailwind: 'mono-yellow',
  },
  contact: {
    email: 'if@umbandung.ac.id',
    phone: '+62 22 783 0000',
    address: 'Jl. Soekarno-Hatta No. 752, Cipadung Kidul, Panyileukan, Kota Bandung, Jawa Barat 40614',
    instagram: 'if.umbandung',
    youtube: '@ifumbandung',
  },
  headOfDepartment: {
    name: 'M. Yusuf Efendi, S.T., M.T.',
    degree: 'Ketua Program Studi',
  },
  videoProfileUrl: 'https://www.youtube.com/watch?v=12ER7lJyZOc&feature=youtu.be',
  sintaUrl: '#',
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
