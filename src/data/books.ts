
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
  price: number;
  image: string;
  isbn?: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Le Fá expliqué aux profanes",
    titleEn: "Fa Explained to the Uninitiated",
    year: 2021,
    publisher: "Éditions des Diasporas, Cotonou",
    publisherEn: "Diasporas Publications, Cotonou",
    genre: "Essai",
    genreEn: "Essay",
    description: "Une exploration accessible du système divinatoire Fá, patrimoine spirituel du Bénin. L'auteur décrypte avec pédagogie cette tradition millénaire pour la rendre compréhensible au grand public.",
    descriptionEn: "An accessible exploration of the Fa divination system, spiritual heritage of Benin. The author pedagogically deciphers this ancient tradition to make it understandable to the general public.",
    price: 25,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "L'Iroko : l'arbre de vie dans la mystique Vodun",
    titleEn: "The Iroko: Tree of Life in Vodun Mysticism",
    year: 2017,
    publisher: "Éditions des Diasporas, Cotonou",
    publisherEn: "Diasporas Publications, Cotonou",
    genre: "Essai",
    genreEn: "Essay",
    description: "Étude approfondie de l'arbre Iroko dans la cosmogonie vodun. Une analyse ethnobotanique et spirituelle qui révèle l'importance de cet arbre sacré dans les traditions béninoises.",
    descriptionEn: "In-depth study of the Iroko tree in vodun cosmogony. An ethnobotanical and spiritual analysis that reveals the importance of this sacred tree in Beninese traditions.",
    price: 22,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Les épouses de Fa : récits de la parole sacrée du Bénin",
    titleEn: "The Wives of Fa: Tales of Sacred Words from Benin",
    year: 2007,
    publisher: "L'Harmattan, Paris",
    publisherEn: "L'Harmattan, Paris",
    genre: "Récits",
    genreEn: "Narratives",
    description: "Recueil de récits traditionnels puisés dans la sagesse du Fá. Ces histoires sacrées transmettent les enseignements ancestraux à travers des personnages féminins emblématiques.",
    descriptionEn: "Collection of traditional tales drawn from Fa wisdom. These sacred stories transmit ancestral teachings through emblematic female characters.",
    price: 28,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Dieu, cet apprenti-sorcier, suivi de Destin d'un dieu",
    titleEn: "God, This Sorcerer's Apprentice, followed by Destiny of a God",
    year: 2011,
    publisher: "L'Harmattan, Paris",
    publisherEn: "L'Harmattan, Paris",
    genre: "Théâtre",
    genreEn: "Theater",
    description: "Pièce théâtrale qui interroge la condition divine et humaine. Une réflexion philosophique mise en scène avec humour et profondeur sur les rapports entre divinité et humanité.",
    descriptionEn: "Theatrical play that questions the divine and human condition. A philosophical reflection staged with humor and depth on the relationship between divinity and humanity.",
    price: 20,
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Introduction à une poétique du Fâ",
    titleEn: "Introduction to a Poetics of Fa",
    year: 2006,
    publisher: "Éditions du Flamboyant, Cotonou",
    publisherEn: "Flamboyant Publications, Cotonou",
    genre: "Essai",
    genreEn: "Essay",
    description: "Analyse littéraire et anthropologique du corpus oral du Fá. L'auteur établit les bases d'une poétique spécifique à cette tradition orale béninoise.",
    descriptionEn: "Literary and anthropological analysis of the oral corpus of Fa. The author establishes the foundations of a poetics specific to this Beninese oral tradition.",
    price: 24,
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Créations burlesques et déconstruction chez Ken Bugul",
    titleEn: "Burlesque Creations and Deconstruction in Ken Bugul",
    year: 2001,
    publisher: "Éditions des Diasporas, Cotonou",
    publisherEn: "Diasporas Publications, Cotonou",
    genre: "Critique littéraire",
    genreEn: "Literary Criticism",
    description: "Première publication majeure de l'auteur, cette étude analyse l'œuvre de Ken Bugul sous l'angle du burlesque et de la déconstruction narrative.",
    descriptionEn: "The author's first major publication, this study analyzes Ken Bugul's work from the angle of burlesque and narrative deconstruction.",
    price: 26,
    image: "/placeholder.svg"
  },
  {
    id: 7,
    title: "Si Dieu était une femme… : anthologie de la poésie béninoise d'aujourd'hui",
    titleEn: "If God Were a Woman...: Anthology of Contemporary Beninese Poetry",
    year: 2009,
    publisher: "Éditions des Diasporas, Cotonou",
    publisherEn: "Diasporas Publications, Cotonou",
    genre: "Anthologie",
    genreEn: "Anthology",
    description: "Anthologie rassemblant les voix poétiques contemporaines du Bénin. Une collection qui met en lumière la richesse et la diversité de la création poétique béninoise actuelle.",
    descriptionEn: "Anthology gathering contemporary poetic voices from Benin. A collection that highlights the richness and diversity of current Beninese poetic creation.",
    price: 23,
    image: "/placeholder.svg"
  },
  {
    id: 8,
    title: "Littératures africaines : langues et écritures",
    titleEn: "African Literatures: Languages and Writings",
    year: 2011,
    publisher: "Éditions des Diasporas, Cotonou",
    publisherEn: "Diasporas Publications, Cotonou",
    genre: "Études littéraires",
    genreEn: "Literary Studies",
    description: "Ouvrage collectif dirigé avec Apey Esobe Lete, explorant les enjeux linguistiques et scripturaires des littératures africaines contemporaines.",
    descriptionEn: "Collective work directed with Apey Esobe Lete, exploring the linguistic and scriptural issues of contemporary African literatures.",
    price: 30,
    image: "/placeholder.svg"
  },
  {
    id: 9,
    title: "La Naissance de Fa : L'enfant qui parle dans le ventre de sa mère",
    titleEn: "The Birth of Fa: The Child Who Speaks in His Mother's Womb",
    year: 2020,
    publisher: "Éditions des Diasporas, Cotonou",
    publisherEn: "Diasporas Publications, Cotonou",
    genre: "Récits",
    genreEn: "Narratives",
    description: "Récit mystique autour de la naissance du système divinatoire Fá. Une narration captivante qui mêle mythologie et spiritualité béninoise.",
    descriptionEn: "Mystical tale around the birth of the Fa divination system. A captivating narration that blends Beninese mythology and spirituality.",
    price: 21,
    image: "/placeholder.svg"
  },
  {
    id: 10,
    title: "Voix et voies nouvelles de la littérature béninoise",
    titleEn: "New Voices and Paths of Beninese Literature",
    year: 2011,
    publisher: "Éditions des Diasporas, Cotonou",
    publisherEn: "Diasporas Publications, Cotonou",
    genre: "Études littéraires",
    genreEn: "Literary Studies",
    description: "Panorama de la littérature béninoise contemporaine, analysant les nouvelles tendances et les jeunes auteurs qui renouvellent le paysage littéraire du pays.",
    descriptionEn: "Panorama of contemporary Beninese literature, analyzing new trends and young authors who are renewing the country's literary landscape.",
    price: 27,
    image: "/placeholder.svg"
  }
];
