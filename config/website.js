module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  siteTitle: 'Elias Rhouzlane', // Navigation and Site Title
  siteTitleAlt: 'Elias Rhouzlane — Works', // Alternative Site title for SEO
  siteTitleShort: 'Elias Rhouzlane', // short_name for manifest
  siteUrl: 'https://eliasrhouzlane.com', // Domain of your site. No trailing slash!
  siteUrlShort: 'eliasrhouzlane.com', // Domain of your site. No trailing slash!
  siteLanguage: 'fr', // Language Tag on <html> element
  siteLogo: '/logo.png', // Used for SEO and manifest
  siteDescription: 'Interaction Design and Deep Learning engineer',
  author: 'Elias Rhouzlane', // Author for schemaORGJSONLD
  authorTitle: {
    fr: "Design d'interaction et Ingénieur Deep Learning",
    en: "Interaction Design and Deep Learning engineer"
  },

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@nestarz', // Twitter Username
  ogSiteName: 'nestarz', // Facebook Site Name
  ogLanguage: 'fr_FR',
  googleAnalyticsID: 'UA-127385143-1',

  // Manifest and Progress color
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  bioCV: {
    fr: "Intéressé par de multiples champs : objet, céramique, architecture,  animation, dessin, culture, édition, mode, jeu vidéo, réalité virtuelle, interactions. Je recherche à allier mon profil scientifique pour des expérimentations et productions tangibles, éthiques et créatives.",
    en: 'Currently focusing on Interaction and Object Design exploring the interaction of objects, people, art, technology and science using form and code with a mix of analog and digital materials.',
  },

  // Social Links
  twitter: 'https://twitter.com/nestarz',
  instagram: 'https://instagram.com/eliasrhouzlane',
  github: 'https://github.com/nestarz',
  linkedin: 'https://linkedin.com/in/elias-rhouzlane-56070197/',
  pinterest: 'https://www.pinterest.fr/eliasrhouzlane/',
  email: 'elias.rhouzlane@gmail.com',
  
  // Work + School Experience
  skills: {
    languages: [
      {
        name: { fr: "Français", en: "French" },
        score: { fr: "Natif", en: "Native" }
      },
      {
        name: { fr: "Anglais", en: "English" },
        score: { fr: "TOEIC 955", en: "TOEIC 955" }
      },
    ],
    publications: [
      {
        title: { fr: "Une naturalisation de la conscience", en: "A naturalization of consciousness" },
        url: ""
      }
    ],
    main: [
      { fr: "Python", en: "Python" },
      { fr: "Machine Learning", en: "Machine Learning" },
      { fr: "Vision par ordinateur", en: "Computer Vision" },
      { fr: "Céramique", en: "Ceramics" },
      { fr: "Design d'objet", en: "Object Design" },
      { fr: "Web", en: "Web" }
    ],
    ceramicsAndDesign: [
      { fr: "Composer une engobe", en: "Ceramics Slip Design" },
      { fr: "Techniques de la plaque", en: "Plate techniques" },
      { fr: "Dessin industriel", en: "Industrial design" },
      { fr: "Cuisson", en: "Ceramics Firing" },
      { fr: "Décoration par trempage", en: "Dipping decoration" },
      { fr: "Sérigraphie sur céramique", en: "Silkscreen on Ceramics" }
    ],
    computerScience: [
      "Python, JS, Matlab",
      "Tensorflow, Caffe, pyTorch",
      "React, GatsbyJS",
      "Flask, Django, REST APIs",
      "Timber, Wordpress",
      "Blender, OpenSCAD",
      "Three.js, p5.js",
      "Google Cloud",
      "Illustrator, Photoshop, InDesign",
    ]
  },
  schools: [
    {
      from: "2018",
      to: "Curr.",
      title: {
        fr: "DNMADE Objet(s) et système(s) d'objet(s) céramiques",
        en: "DNMADE Product and Ceramics Design",
      },
      etablishment: "LTAA Auguste Renoir",
      location: "Paris, France",
      description: {
        en: "The DNAMDE designer in art and ceramics industry aims to train ceramic designers capable of designing and producing models of shapes and decorations in the sectors covered by the arts and ceramics industries: ceramic design, art ceramics (single piece or small series), tableware and decoration, sanitary ceramics, architectural ceramics, heritage ceramics...",
        fr: "Le designer DNAMDE dans les industries de l'art et de la céramique a pour objectif de former des designers en céramique capables de concevoir et de produire des modèles de formes et de décorations dans les secteurs couverts par les industries des arts et de la céramique: design en céramique, céramique d'art (pièces uniques ou petites séries), arts de la table et décoration , céramiques sanitaires, céramiques architecturales, céramiques du patrimoine ..."
      }
    },
    {
      from: "2015",
      to: "2017",
      etablishment: "Sorbonne Universités × Télécom ParisTech",
      location: "Paris, France",
      title: {
        fr: "Master Informatique Spécialité IMA",
        en: "M. Sc. in Computer Science, Specialized in Computer Graphics and Computer Vision",
      },
    },
    {
      from: "2012",
      to: "2015",
      title: {
        fr: "Licence Mathématiques et Informatique Appliquées aux Sciences Humaines et Sociales, Parcours Sciences Cognitives",
        en: "B. Sc. in Mathematics and Computer Sciences, Specialized in Cognitive Sciences, Magna cum laude « Mention bien »",
      },
      etablishment: "Université de Bordeaux",
      location: "Bordeaux, France"

    }
  ],
  works: [
    {
      from: "2018",
      to: "",
      title: { fr: "Développeur Full-Stack", en: "Full-Stack Developer" },
      etablishment: "Freelance",
      description: {
        fr: "Sous-traitance de l’intégration de maquettes pour l’agence de webdesign Dvtk.us à Londres pour des clients comme Prada et Management+Artists.",
        en: "Subcontracting the integration of models for the Dvtk.us web design agency in London for clients such as Prada and Management + Artists"
      },
      location: "Paris, France"
    },
    {
      from: "2018",
      to: "",
      title: { en: "Machine Learning Engineer", fr: "Ingénieur Machine Learning" },
      etablishment: "Hubstairs",
      description: {
        en: "Automation in interior architecture based on various data (users, trades, retail, open-source). Work in machine and deep learning using framework like Tensorflow or pyTorch, in 3D content generation from 2D with Blender and OpenCV and in Datamining with BeautifulSoup and Scrapy. Assigned production with Docker and cloud services.",
        fr: "Aide et automatisation en architecture d'intérieur sur la base de données variées (utilisateurs, métiers, retail, open-source data). Oeuvre en apprentissage machine à l'aide de framework comme Tensorflow ou pyTorch, en génération de contenu 3D à partir de 2D avec Blender et OpenCV et en Datamining avec BeautifulSoup et Scrapy. Mise en production assurée avec Docker et des services de cloud."
      },
      location: "Paris, France"
    },
    {
      from: "2017",
      to: "",
      title: { en: "Computer Vision Data Science Intern", fr: "Data Scientist Stagiaire en Vision par Ordinateur" },
      etablishment: "Rakuten Institute of Technology",
      description: {
        en: "Internship in Data Science and Deep Learning for Computer Vision at Rakuten where my mission is to classify, segment and localize garments in natural images for fashion image-based recommendation using state-of-the-art Deep Learning techniques.",
        fr: "Classifier, segmenter et localiser des pièces de vêtement dans des images naturelles pour de la recommandation de vêtements de mode via un état de l’art en Deep Learning. Proposition d’une solution adaptée aux données de PriceMinister."
      },
      location: "Paris, France"
    }
  ]
}
