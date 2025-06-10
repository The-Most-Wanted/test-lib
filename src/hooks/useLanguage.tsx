
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    catalogue: 'Catalogue',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Professeur Mahougnon Kakpo',
    heroSubtitle: 'Académicien • Écrivain • Ministre • Député',
    heroDescription: 'Découvrez l\'univers littéraire et académique du Professeur Mahougnon Kakpo, figure emblématique de la littérature africaine francophone et homme politique engagé.',
    exploreCatalogue: 'Explorer le Catalogue',
    
    // About Section
    aboutTitle: 'À propos du Professeur',
    aboutP1: 'Né en 1965 à Bopa (département du Mono, Bénin), le Professeur Mahougnon Kakpo est une figure emblématique du monde académique et politique béninois. Docteur en littérature française (Université Bordeaux III, 1996), il enseigne depuis 1998 à l\'Université d\'Abomey-Calavi.',
    aboutP2: 'Professeur titulaire au CAMES depuis 2014, il dirige plusieurs laboratoires de recherche en littérature africaine. Écrivain, poète, conteur et essayiste, il a fondé l\'association littéraire Le Scribe Noir et les éditions Diasporas.',
    aboutP3: 'Ministre des Enseignements secondaire, technique et de la Formation professionnelle (2017-2021), député élu de la 9ᵉ législature (2019-2023) et 1er secrétaire parlementaire depuis février 2023. Il préside également le Comité des rites Vodun depuis octobre 2023.',
    
    // Books Section
    featuredBooksTitle: 'Œuvres en Vedette',
    featuredBooksSubtitle: 'Découvrez quelques-unes des œuvres les plus remarquables du Professeur Kakpo',
    
    // Search
    searchPlaceholder: 'Rechercher par titre, genre ou année...',
    searchButton: 'Rechercher',
    clearFilters: 'Effacer les filtres',
    filterByGenre: 'Filtrer par genre',
    allGenres: 'Tous les genres',
    sortBy: 'Trier par',
    titleAsc: 'Titre (A-Z)',
    titleDesc: 'Titre (Z-A)',
    yearAsc: 'Année (croissant)',
    yearDesc: 'Année (décroissant)',
    
    // Contact
    contactTitle: 'Contactez le Professeur Kakpo',
    contactSubtitle: 'Pour toute demande concernant ses œuvres ou ses activités académiques',
    
    // Footer
    footerDescription: 'Découvrez l\'univers littéraire et académique du Professeur Mahougnon Kakpo à travers ses œuvres et publications.',
    navigation: 'Navigation',
    allRightsReserved: 'Tous droits réservés.'
  },
  en: {
    // Navigation
    home: 'Home',
    catalogue: 'Catalogue',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Professor Mahougnon Kakpo',
    heroSubtitle: 'Academic • Writer • Minister • Deputy',
    heroDescription: 'Discover the literary and academic universe of Professor Mahougnon Kakpo, emblematic figure of francophone African literature and committed politician.',
    exploreCatalogue: 'Explore Catalogue',
    
    // About Section
    aboutTitle: 'About the Professor',
    aboutP1: 'Born in 1965 in Bopa (Mono department, Benin), Professor Mahougnon Kakpo is an emblematic figure of the Beninese academic and political world. Doctor in French literature (University Bordeaux III, 1996), he has been teaching at the University of Abomey-Calavi since 1998.',
    aboutP2: 'Full Professor at CAMES since 2014, he directs several research laboratories in African literature. Writer, poet, storyteller and essayist, he founded the literary association Le Scribe Noir and Diasporas editions.',
    aboutP3: 'Minister of Secondary, Technical Education and Vocational Training (2017-2021), elected deputy of the 9th legislature (2019-2023) and 1st parliamentary secretary since February 2023. He also chairs the Vodun Rites Committee since October 2023.',
    
    // Books Section
    featuredBooksTitle: 'Featured Works',
    featuredBooksSubtitle: 'Discover some of Professor Kakpo\'s most remarkable works',
    
    // Search
    searchPlaceholder: 'Search by title, genre or year...',
    searchButton: 'Search',
    clearFilters: 'Clear filters',
    filterByGenre: 'Filter by genre',
    allGenres: 'All genres',
    sortBy: 'Sort by',
    titleAsc: 'Title (A-Z)',
    titleDesc: 'Title (Z-A)',
    yearAsc: 'Year (ascending)',
    yearDesc: 'Year (descending)',
    
    // Contact
    contactTitle: 'Contact Professor Kakpo',
    contactSubtitle: 'For any inquiries regarding his works or academic activities',
    
    // Footer
    footerDescription: 'Discover the literary and academic universe of Professor Mahougnon Kakpo through his works and publications.',
    navigation: 'Navigation',
    allRightsReserved: 'All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
