
export interface Book {
  id: number;
  title: string;
  titleEn: string;
  year: number;
  publisher: string;
  publisherEn: string;
  genre: string;
  genreEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  isbn?: string;
  price?: number;
  stock_quantity?: number;
  featured?: boolean;
}

// Collection complète des livres du Professeur Mahougnon KAKPO
export const books: Book[] = [
  {
    id: 1,
    title: "Entre Mythes et Modernités : Aspects de la poésie négro-africaine d'expression française",
    titleEn: "Between Myths and Modernities: Aspects of French-language Negro-African poetry",
    year: 1998,
    publisher: "Editions du Septentrion",
    publisherEn: "Septentrion Publishing",
    genre: "Essai",
    genreEn: "Essay",
    description: "Une analyse approfondie de la poésie négro-africaine d'expression française, explorant les tensions entre traditions mythiques et aspirations modernes.",
    descriptionEn: "An in-depth analysis of French-language Negro-African poetry, exploring tensions between mythical traditions and modern aspirations.",
    image: "/lovable-uploads/f35c927d-b277-4b96-b988-45b75303d0ee.png",
    price: 25000,
    stock_quantity: 10,
    featured: true
  },
  {
    id: 4,
    title: "Introduction à une poétique du Fa",
    titleEn: "Introduction to a Poetics of Fa",
    year: 2006,
    publisher: "Editions des Diasporas/Editions du Flamboyant",
    publisherEn: "Diasporas/Flamboyant Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Une exploration de la poétique du Fa, système divinatoire et philosophique yoruba, analysant ses dimensions littéraires et spirituelles.",
    descriptionEn: "An exploration of the poetics of Fa, a Yoruba divinatory and philosophical system, analyzing its literary and spiritual dimensions.",
    image: "/lovable-uploads/5ac549c1-30f8-4faf-8b2c-9bd82ba89faa.png",
    price: 20000,
    stock_quantity: 15,
    featured: true
  },
  {
    id: 15,
    title: "L'Iroko, l'arbre de vie dans la mystique Vodun",
    titleEn: "The Iroko, Tree of Life in Vodun Mysticism",
    year: 2017,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Étude symbolique et spirituelle de l'Iroko dans la tradition Vodun, révélant ses dimensions cosmiques et sacrées.",
    descriptionEn: "Symbolic and spiritual study of the Iroko in Vodun tradition, revealing its cosmic and sacred dimensions.",
    image: "/lovable-uploads/9a4cabd7-18d1-47ff-ad00-b09e76b4d2d8.png",
    price: 19500,
    stock_quantity: 12,
    featured: true
  },
  {
    id: 17,
    title: "Jogbe, La revue des humanités, No1",
    titleEn: "Jogbe, The Humanities Review, No1",
    year: 2018,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Revue scientifique",
    genreEn: "Scientific Journal",
    description: "Premier numéro de la revue scientifique Jogbe, dédiée aux humanités et aux recherches sur le Vodun.",
    descriptionEn: "First issue of the scientific journal Jogbe, dedicated to humanities and Vodun research.",
    image: "/lovable-uploads/138cf336-12e6-44f1-bfe7-b27ca4048e1d.png",
    price: 15000,
    stock_quantity: 20,
    featured: false
  },
  {
    id: 18,
    title: "Jogbe, La revue des humanités, No2",
    titleEn: "Jogbe, The Humanities Review, No2",
    year: 2019,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Revue scientifique",
    genreEn: "Scientific Journal",
    description: "Deuxième numéro de Jogbe, explorant les savoirs localisés en Afrique de l'Ouest.",
    descriptionEn: "Second issue of Jogbe, exploring localized knowledge in West Africa.",
    image: "/lovable-uploads/6898414f-5655-422e-a976-6e94c3412237.png",
    price: 15000,
    stock_quantity: 18,
    featured: false
  },
  {
    id: 21,
    title: "L'Agitateur des étoiles, Poèmes à Nouréini",
    titleEn: "The Star Agitator, Poems to Nouréini",
    year: 2021,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Poème",
    genreEn: "Poetry",
    description: "Hommage poétique à Nouréini Tidjani-Serpos, figure majeure de la littérature béninoise.",
    descriptionEn: "Poetic tribute to Nouréini Tidjani-Serpos, major figure of Beninese literature.",
    image: "/lovable-uploads/a4098836-d0ea-49b6-9442-388973f75256.png",
    price: 16000,
    stock_quantity: 11,
    featured: true
  },
  {
    id: 26,
    title: "Le Fá, la Gnose Àjɛ́ et la Mécanique quantique",
    titleEn: "Fa, Àjɛ́ Gnosis and Quantum Mechanics",
    year: 2023,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Exploration fascinante des parallèles entre la spiritualité africaine traditionnelle et la physique quantique moderne.",
    descriptionEn: "Fascinating exploration of parallels between traditional African spirituality and modern quantum physics.",
    image: "/lovable-uploads/20ff9cd3-e282-4357-9e69-a0d80d9f37ad.png",
    price: 19000,
    stock_quantity: 9,
    featured: true
  },
  {
    id: 27,
    title: "La Théologie Vodun. Fondement de la pensée classique Ajǎ-Tádó, suivie de Ainsi parla Ifá. Code Gbɛ̀sù",
    titleEn: "Vodun Theology. Foundation of Classical Ajǎ-Tádó Thought, followed by Thus Spoke Ifá. Gbɛ̀sù Code",
    year: 2024,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Ouvrage majeur sur les fondements théologiques du Vodun et les codes sacrés d'Ifá.",
    descriptionEn: "Major work on the theological foundations of Vodun and the sacred codes of Ifá.",
    image: "/lovable-uploads/074418fc-4ae6-449c-aa84-4b5327f930f7.png",
    price: 24000,
    stock_quantity: 8,
    featured: true
  },
  {
    id: 29,
    title: "Le Testateur stellaire. Nouréini TIDJANI-SERPOS - Entretiens et Témoignages",
    titleEn: "The Stellar Testator. Nouréini TIDJANI-SERPOS - Interviews and Testimonies",
    year: 2024,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Entretiens",
    genreEn: "Interviews",
    description: "Recueil d'entretiens et de témoignages sur Nouréini Tidjani-Serpos, figure emblématique de la littérature béninoise.",
    descriptionEn: "Collection of interviews and testimonies about Nouréini Tidjani-Serpos, emblematic figure of Beninese literature.",
    image: "/lovable-uploads/7410117d-2862-4067-b7db-cc9d1dc21a03.png",
    price: 20000,
    stock_quantity: 12,
    featured: false
  },
  // Livres sans couvertures mais avec toutes les informations
  {
    id: 2,
    title: "Créations burlesques et Déconstruction chez Ken Bugul",
    titleEn: "Burlesque Creations and Deconstruction in Ken Bugul",
    year: 2001,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Une étude littéraire sur les techniques burlesques et déconstructivistes dans l'œuvre de Ken Bugul.",
    descriptionEn: "A literary study on burlesque and deconstructive techniques in Ken Bugul's work.",
    image: "",
    price: 15000,
    stock_quantity: 8,
    featured: false
  },
  {
    id: 3,
    title: "Ce Regard de la Mer… Anthologie de la poésie béninoise d'aujourd'hui",
    titleEn: "This Gaze from the Sea... Anthology of Today's Beninese Poetry",
    year: 2001,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Anthologie",
    genreEn: "Anthology",
    description: "Une collection soigneusement sélectionnée de la poésie béninoise contemporaine, reflétant la diversité et la richesse de l'expression poétique du Bénin.",
    descriptionEn: "A carefully selected collection of contemporary Beninese poetry, reflecting the diversity and richness of Benin's poetic expression.",
    image: "",
    price: 18000,
    stock_quantity: 12,
    featured: false
  },
  {
    id: 5,
    title: "La petite fille des eaux",
    titleEn: "The Little Girl of the Waters",
    year: 2006,
    publisher: "Edition NDZE",
    publisherEn: "NDZE Publishing",
    genre: "Roman",
    genreEn: "Novel",
    description: "Un roman collectif explorant les mystères aquatiques et les traditions spirituelles liées à l'eau dans la culture africaine.",
    descriptionEn: "A collective novel exploring aquatic mysteries and spiritual traditions related to water in African culture.",
    image: "",
    price: 16000,
    stock_quantity: 6,
    featured: false
  },
  {
    id: 6,
    title: "Les Epouses de Fa",
    titleEn: "The Wives of Fa",
    year: 2007,
    publisher: "L'Harmattan",
    publisherEn: "L'Harmattan",
    genre: "Récits de la parole sacrée",
    genreEn: "Sacred Word Tales",
    description: "Récits traditionnels révélant les mystères et enseignements du Fa à travers les figures féminines sacrées.",
    descriptionEn: "Traditional tales revealing the mysteries and teachings of Fa through sacred feminine figures.",
    image: "",
    price: 18500,
    stock_quantity: 9,
    featured: false
  },
  {
    id: 7,
    title: "Poétique baroque dans les littératures africaines francophones, Tome 1 : Olympe Bhêly-Quenum : Thèmes et Styles",
    titleEn: "Baroque Poetics in Francophone African Literature, Volume 1: Olympe Bhêly-Quenum: Themes and Styles",
    year: 2007,
    publisher: "Edition des Diasporas",
    publisherEn: "Diasporas Publishing",
    genre: "Essai",
    genreEn: "Essay",
    description: "Analyse stylistique et thématique de l'œuvre d'Olympe Bhêly-Quenum dans le contexte de la poétique baroque africaine.",
    descriptionEn: "Stylistic and thematic analysis of Olympe Bhêly-Quenum's work in the context of African baroque poetics.",
    image: "",
    price: 22000,
    stock_quantity: 7,
    featured: false
  },
  {
    id: 8,
    title: "Pour circoncire le sel",
    titleEn: "To Circumcise Salt",
    year: 2009,
    publisher: "Les Editions de la Rose Bleue",
    publisherEn: "Blue Rose Publications",
    genre: "Poème",
    genreEn: "Poetry",
    description: "Recueil poétique explorant les thèmes de la purification, de la tradition et de la modernité à travers des métaphores saisissantes.",
    descriptionEn: "Poetry collection exploring themes of purification, tradition and modernity through striking metaphors.",
    image: "",
    price: 14000,
    stock_quantity: 11,
    featured: false
  },
  {
    id: 9,
    title: "Si Dieu était une femme… Anthologie de la poésie béninoise d'aujourd'hui",
    titleEn: "If God Were a Woman... Anthology of Today's Beninese Poetry",
    year: 2009,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Anthologie",
    genreEn: "Anthology",
    description: "Une anthologie révolutionnaire questionnant les représentations divines à travers la poésie béninoise contemporaine.",
    descriptionEn: "A revolutionary anthology questioning divine representations through contemporary Beninese poetry.",
    image: "",
    price: 19000,
    stock_quantity: 8,
    featured: false
  },
  {
    id: 10,
    title: "Introduction à une poétique du Fa (2ème Edition revue et augmentée)",
    titleEn: "Introduction to a Poetics of Fa (2nd Revised and Expanded Edition)",
    year: 2010,
    publisher: "Presses Universitaires de Yaoundé",
    publisherEn: "University Press of Yaoundé",
    genre: "Essai",
    genreEn: "Essay",
    description: "Version enrichie et mise à jour de l'exploration fondamentale de la poétique du Fa, avec de nouveaux développements théoriques.",
    descriptionEn: "Enriched and updated version of the fundamental exploration of Fa poetics, with new theoretical developments.",
    image: "",
    price: 21000,
    stock_quantity: 13,
    featured: false
  },
  {
    id: 11,
    title: "Dieu, cet apprenti-sorcier, suivi de Destin d'un Dieu",
    titleEn: "God, This Sorcerer's Apprentice, followed by Destiny of a God",
    year: 2011,
    publisher: "L'Harmattan",
    publisherEn: "L'Harmattan",
    genre: "Théâtre",
    genreEn: "Theater",
    description: "Deux pièces théâtrales questionnant la nature divine et les responsabilités cosmiques dans un style dramatique saisissant.",
    descriptionEn: "Two theatrical plays questioning divine nature and cosmic responsibilities in a striking dramatic style.",
    image: "",
    price: 16500,
    stock_quantity: 5,
    featured: false
  },
  {
    id: 12,
    title: "Littératures africaines : Langues et Ecritures",
    titleEn: "African Literatures: Languages and Writings",
    year: 2011,
    publisher: "Abis Editions",
    publisherEn: "Abis Editions",
    genre: "Essai",
    genreEn: "Essay",
    description: "Étude comprehensive des langues et systèmes d'écriture dans les littératures africaines, analysant leur évolution et impact culturel.",
    descriptionEn: "Comprehensive study of languages and writing systems in African literatures, analyzing their evolution and cultural impact.",
    image: "",
    price: 28000,
    stock_quantity: 6,
    featured: false
  },
  {
    id: 13,
    title: "Voix et voies nouvelles de la littérature béninoise",
    titleEn: "New Voices and Paths of Beninese Literature",
    year: 2011,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Analyse des tendances émergentes et des nouvelles orientations de la littérature béninoise contemporaine.",
    descriptionEn: "Analysis of emerging trends and new directions in contemporary Beninese literature.",
    image: "",
    price: 23000,
    stock_quantity: 9,
    featured: false
  },
  {
    id: 14,
    title: "Yɛku-Mɛnji : Une théologie de la mort dans les œuvres de Fa : Essai d'herméneutique littéraire",
    titleEn: "Yɛku-Mɛnji: A Theology of Death in Fa Works: Essay on Literary Hermeneutics",
    year: 2012,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Exploration herméneutique des concepts de mort et de transcendance dans la tradition du Fa.",
    descriptionEn: "Hermeneutical exploration of concepts of death and transcendence in the Fa tradition.",
    image: "",
    price: 20000,
    stock_quantity: 7,
    featured: false
  },
  {
    id: 16,
    title: "La naissance de Fa, l'enfant qui parle dans le ventre de sa mère",
    titleEn: "The Birth of Fa, the Child Who Speaks in His Mother's Womb",
    year: 2018,
    publisher: "Laha Editions",
    publisherEn: "Laha Editions",
    genre: "Récits de la parole sacrée",
    genreEn: "Sacred Word Tales",
    description: "Récits mystiques sur l'origine du Fa, révélant les mystères de la naissance divine et de la parole sacrée.",
    descriptionEn: "Mystical tales about the origin of Fa, revealing mysteries of divine birth and sacred speech.",
    image: "",
    price: 17500,
    stock_quantity: 10,
    featured: false
  },
  {
    id: 19,
    title: "Les fils de Ra (Nous sommes parents d'âme)",
    titleEn: "The Sons of Ra (We Are Soul Relatives)",
    year: 2020,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Poème",
    genreEn: "Poetry",
    description: "Recueil poétique explorant les liens spirituels et cosmiques entre les peuples africains et l'Égypte antique.",
    descriptionEn: "Poetry collection exploring spiritual and cosmic links between African peoples and ancient Egypt.",
    image: "",
    price: 14500,
    stock_quantity: 8,
    featured: false
  },
  {
    id: 20,
    title: "Pour circoncire le sel (2ème édition)",
    titleEn: "To Circumcise Salt (2nd Edition)",
    year: 2020,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Poème",
    genreEn: "Poetry",
    description: "Édition révisée et enrichie du recueil poétique emblématique sur la purification et les traditions.",
    descriptionEn: "Revised and enriched edition of the emblematic poetry collection on purification and traditions.",
    image: "",
    price: 15000,
    stock_quantity: 14,
    featured: false
  },
  {
    id: 22,
    title: "Ecritures, Sociétés et Imaginaire",
    titleEn: "Writings, Societies and Imagination",
    year: 2021,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Ouvrage collectif dirigé explorant les relations entre écritures, structures sociales et imaginaires culturels.",
    descriptionEn: "Collective work exploring relationships between writings, social structures and cultural imaginaries.",
    image: "",
    price: 26000,
    stock_quantity: 5,
    featured: false
  },
  {
    id: 23,
    title: "Logiques et rationalités dans les traditions africaines",
    titleEn: "Logic and Rationalities in African Traditions",
    year: 2021,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Vaste étude dirigée sur les systèmes de pensée et les logiques traditionnelles africaines.",
    descriptionEn: "Vast directed study on African thought systems and traditional logics.",
    image: "",
    price: 35000,
    stock_quantity: 3,
    featured: false
  },
  {
    id: 24,
    title: "Le Fá expliqué aux profanes. Epitomé d'Ifá ɔrúnmìlà",
    titleEn: "Fa Explained to the Uninitiated. Epitome of Ifá ɔrúnmìlà",
    year: 2022,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Guide accessible pour comprendre les fondements du système divinatoire Ifá et ses enseignements.",
    descriptionEn: "Accessible guide to understanding the foundations of the Ifá divinatory system and its teachings.",
    image: "",
    price: 18000,
    stock_quantity: 16,
    featured: false
  },
  {
    id: 25,
    title: "L'Autoréférentialité et son actualité",
    titleEn: "Self-Referentiality and Its Relevance",
    year: 2023,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Réflexion philosophique sur l'autoréférentialité dans la pensée contemporaine et les traditions africaines.",
    descriptionEn: "Philosophical reflection on self-referentiality in contemporary thought and African traditions.",
    image: "",
    price: 22500,
    stock_quantity: 7,
    featured: false
  },
  {
    id: 28,
    title: "Etudes africaines. Langues et formes de la pensée",
    titleEn: "African Studies. Languages and Forms of Thought",
    year: 2024,
    publisher: "Les Editions des Diasporas",
    publisherEn: "Diasporas Publications",
    genre: "Essai",
    genreEn: "Essay",
    description: "Somme magistrale sur les langues africaines et leurs modes de conceptualisation du monde.",
    descriptionEn: "Masterful compendium on African languages and their ways of conceptualizing the world.",
    image: "",
    price: 45000,
    stock_quantity: 4,
    featured: true
  }
];
