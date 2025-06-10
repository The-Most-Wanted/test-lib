
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
    home: "Accueil",
    catalogue: "Catalogue",
    contact: "Contact",
    navigation: "Navigation",
    
    // Hero
    heroTitle: "Prof. Mahougnon Kakpo",
    heroSubtitle: "Écrivain • Professeur • Homme Politique",
    heroDescription: "Découvrez l'univers littéraire et académique du Professeur Mahougnon Kakpo à travers ses œuvres remarquables qui explorent la culture, la spiritualité et les traditions du Bénin.",
    exploreCatalogue: "Explorer le Catalogue",
    contactUs: "Nous Contacter",
    
    // Stats
    booksPublished: "Livres Publiés",
    yearsTeaching: "Années d'Enseignement",
    readersReached: "Lecteurs Touchés",
    
    // About
    aboutTitle: "À Propos du Professeur",
    aboutP1: "Professeur titulaire à l'Université d'Abomey-Calavi depuis 1998, Mahougnon Kakpo est un éminent spécialiste de la littérature africaine francophone.",
    aboutP2: "Docteur en littérature française (Bordeaux III, 1996), il dirige plusieurs laboratoires de recherche et a été fait Chevalier de l'Ordre national du Bénin en 2016.",
    aboutP3: "Ancien ministre des Enseignements secondaire, technique et de la Formation professionnelle (2017-2021), il œuvre pour la promotion du patrimoine culturel béninois.",
    
    // Featured Books
    featuredBooksTitle: "Œuvres Remarquables",
    featuredBooksSubtitle: "Découvrez une sélection des livres les plus importants du Professeur Kakpo",
    learnMore: "En Savoir Plus",
    viewAllBooks: "Voir Tous les Livres",
    
    // Catalogue
    catalogueDescription: "Explorez la riche collection d'œuvres du Professeur Mahougnon Kakpo, spécialiste de la littérature africaine francophone et des traditions spirituelles du Bénin.",
    searchAndFilter: "Rechercher et Filtrer",
    searchPlaceholder: "Rechercher par titre, année ou description...",
    filterByGenre: "Filtrer par genre",
    allGenres: "Tous les genres",
    sortBy: "Trier par",
    titleAsc: "Titre (A-Z)",
    titleDesc: "Titre (Z-A)",
    yearAsc: "Année (croissant)",
    yearDesc: "Année (décroissant)",
    searchButton: "Rechercher",
    clearFilters: "Effacer les filtres",
    noBooksFound: "Aucun livre trouvé",
    tryDifferentSearch: "Essayez avec des critères de recherche différents",
    showAllBooks: "Afficher tous les livres",
    interestedInBooks: "Intéressé par ces ouvrages ?",
    contactForMoreInfo: "Contactez-nous pour plus d'informations sur les livres disponibles",
    booksFound: "livres trouvés",
    totalBooks: "Livres Total",
    genres: "Genres",
    
    // Book Detail
    description: "Description",
    aboutThisBook: "À propos de ce livre",
    genre: "Genre",
    publicationYear: "Année de publication",
    publisher: "Éditeur",
    contactForInfo: "Contacter pour informations",
    exploreOtherBooks: "Explorer d'autres livres",
    bookNotFound: "Livre non trouvé",
    backToCatalogue: "Retour au catalogue",
    
    // Contact
    contactDescription: "Entrez en contact avec le Professeur Mahougnon Kakpo pour toute question concernant ses œuvres, ses recherches ou ses activités académiques.",
    sendMessage: "Envoyer un Message",
    fullName: "Nom Complet",
    fullNamePlaceholder: "Votre nom complet",
    email: "Email",
    emailPlaceholder: "votre.email@exemple.com",
    subject: "Sujet",
    subjectPlaceholder: "Objet de votre message",
    message: "Message",
    messagePlaceholder: "Écrivez votre message ici...",
    contactInfo: "Informations de Contact",
    phone: "Téléphone",
    address: "Adresse",
    achievements: "Distinctions",
    knightOrder: "Chevalier de l'Ordre national du Bénin (2016)",
    professorTitle: "Professeur titulaire au CAMES (2014)",
    ministerEducation: "Ancien ministre de l'Éducation (2017-2021)",
    vodunCommittee: "Président du Comité des rites Vodun (2023)",
    exploreMore: "Explorer Plus",
    viewBooks: "Voir les Livres",
    backToHome: "Retour à l'Accueil",
    messageSent: "Message envoyé !",
    messageResponse: "Nous vous répondrons dans les plus brefs délais.",
    
    // Footer
    footerDescription: "Découvrez l'univers littéraire et académique du Professeur Mahougnon Kakpo à travers ses œuvres remarquables.",
    footerQuote: "La littérature est le miroir de l'âme d'un peuple.",
    allRightsReserved: "Tous droits réservés.",
  },
  en: {
    // Navigation
    home: "Home",
    catalogue: "Catalogue",
    contact: "Contact",
    navigation: "Navigation",
    
    // Hero
    heroTitle: "Prof. Mahougnon Kakpo",
    heroSubtitle: "Writer • Professor • Politician",
    heroDescription: "Discover the literary and academic universe of Professor Mahougnon Kakpo through his remarkable works that explore the culture, spirituality and traditions of Benin.",
    exploreCatalogue: "Explore Catalogue",
    contactUs: "Contact Us",
    
    // Stats
    booksPublished: "Books Published",
    yearsTeaching: "Years of Teaching",
    readersReached: "Readers Reached",
    
    // About
    aboutTitle: "About the Professor",
    aboutP1: "Full Professor at the University of Abomey-Calavi since 1998, Mahougnon Kakpo is an eminent specialist in French-speaking African literature.",
    aboutP2: "Doctor in French Literature (Bordeaux III, 1996), he directs several research laboratories and was made Knight of the National Order of Benin in 2016.",
    aboutP3: "Former Minister of Secondary, Technical and Vocational Education (2017-2021), he works to promote Beninese cultural heritage.",
    
    // Featured Books
    featuredBooksTitle: "Remarkable Works",
    featuredBooksSubtitle: "Discover a selection of Professor Kakpo's most important books",
    learnMore: "Learn More",
    viewAllBooks: "View All Books",
    
    // Catalogue
    catalogueDescription: "Explore the rich collection of works by Professor Mahougnon Kakpo, specialist in French-speaking African literature and spiritual traditions of Benin.",
    searchAndFilter: "Search and Filter",
    searchPlaceholder: "Search by title, year or description...",
    filterByGenre: "Filter by genre",
    allGenres: "All genres",
    sortBy: "Sort by",
    titleAsc: "Title (A-Z)",
    titleDesc: "Title (Z-A)",
    yearAsc: "Year (ascending)",
    yearDesc: "Year (descending)",
    searchButton: "Search",
    clearFilters: "Clear filters",
    noBooksFound: "No books found",
    tryDifferentSearch: "Try different search criteria",
    showAllBooks: "Show all books",
    interestedInBooks: "Interested in these works?",
    contactForMoreInfo: "Contact us for more information about available books",
    booksFound: "books found",
    totalBooks: "Total Books",
    genres: "Genres",
    
    // Book Detail
    description: "Description",
    aboutThisBook: "About this book",
    genre: "Genre",
    publicationYear: "Publication year",
    publisher: "Publisher",
    contactForInfo: "Contact for information",
    exploreOtherBooks: "Explore other books",
    bookNotFound: "Book not found",
    backToCatalogue: "Back to catalogue",
    
    // Contact
    contactDescription: "Get in touch with Professor Mahougnon Kakpo for any questions about his works, research or academic activities.",
    sendMessage: "Send a Message",
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    email: "Email",
    emailPlaceholder: "your.email@example.com",
    subject: "Subject",
    subjectPlaceholder: "Subject of your message",
    message: "Message",
    messagePlaceholder: "Write your message here...",
    contactInfo: "Contact Information",
    phone: "Phone",
    address: "Address",
    achievements: "Achievements",
    knightOrder: "Knight of the National Order of Benin (2016)",
    professorTitle: "Full Professor at CAMES (2014)",
    ministerEducation: "Former Minister of Education (2017-2021)",
    vodunCommittee: "Chairman of the Vodun Rites Committee (2023)",
    exploreMore: "Explore More",
    viewBooks: "View Books",
    backToHome: "Back to Home",
    messageSent: "Message sent!",
    messageResponse: "We will respond to you as soon as possible.",
    
    // Footer
    footerDescription: "Discover the literary and academic universe of Professor Mahougnon Kakpo through his remarkable works.",
    footerQuote: "Literature is the mirror of a people's soul.",
    allRightsReserved: "All rights reserved.",
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
