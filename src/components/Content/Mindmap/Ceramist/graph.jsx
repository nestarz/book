
export const graph = {
    nodes: [
        { id: 1, label: "Ceramique", mass: 100, value: 100 },
        { id: 2, label: "Impression Numérique", group: "digital" },
        { id: 3, label: "Formes", group: "digital" },
        { id: 4, label: "Intéractions", group: "digital" },
        { id: 5, label: "Instruments", group: "digital" },
        { id: 6, label: "Thérémine", group: "digital" },
        { id: 7, label: "Synthétiseur", group: "digital" },
        { id: 8, label: "Open Data", group: "digital" },
        { id: 9, label: "Open Source", group: "digital" },
        { id: 10, label: "Design Génératif", group: "digital" },
        { id: 11, label: "Generative adversarial network (GAN)", group: "digital" },
        { id: 12, label: "Megumi Naitoh", group: "people" },
        { id: 13, label: "APIs", group: "digital" },
        { id: 14, label: "Machines", group: "digital" },
        { id: 15, label: "Imprimante 3D", group: "digital" },
        { id: 16, label: "Open Food Facts", group: "ressource" },
        { id: 17, label: "Caméra", group: "digital" },
        { id: 18, label: "Microphone", group: "digital" },
        { id: 19, label: "Vases#44", group: "project" },
        { id: 20, label: "Francois Brument", group: "people" },
        { id: 21, label: "Mouvements", group: "digital" },
        {
            id: 22, label: "Plotter 2D", group: "digital", notes: ["https://www.blackpepper.co.uk/what-we-think/blog/plots-and-plans-with-a-raspberry-pi-a-diy-polar-plotter",
                "https://www.lafabriqueduloch.org/un-plotter-pour-2-francs-et-7-sous/?doing_wp_cron=1543890029.1575388908386230468750"]
        },
        { id: 23, label: "The Power of Love", group: "project" },
        { id: 24, label: "Mosaic Virus\nBitcoin per hour", group: "project" },
        { id: 25, label: "L'artisan électronique", group: "project" },
        { id: 26, label: "Tim Knapen", group: "people" },
        { id: 27, label: "Roue de potterie virtuelle", group: "digital" },
        { id: 28, label: "Wearables", group: "digital" },
        { id: 29, label: "MOOC Design Numérique", group: "ressource", url: "http://moocdigitalmedia.paris/cours/design-numerique/" },
        { id: 30, label: "Matteo Nasini", group: "people" },
        { id: 31, label: "Électroencéphalo\n-graphie (EEG)", group: "digital" },
        { id: 32, label: "Sparkling Matter", group: "project", url: "http://www.makery.info/2018/02/20/la-nuit-je-reve-en-ceramique/" },
        { id: 33, label: "Magic Ceramic Custom Synth", group: "project", url: "http://www.creativegallery.nl/index.php?option=com_content&view=article&id=9:theremin-magic-ceramic-doepfer-a-100-controller&catid=6:projects&Itemid=36" },
        { id: 34, label: "Électroaimants", group: "digital" },
        { id: 35, label: "data.gouv.fr\nDonnées Publiques de l’État et des administrations", group: "ressource", url: "https://www.data.gouv.fr/fr/" },
        { id: 36, label: "3D Machine Learning", group: "ressource", url: "https://github.com/timzhang642/3D-Machine-Learning" },
        { id: 37, label: "AI", group: "digital", url: "" },
        { id: 38, label: "Open Hardware", group: "digital", url: "" },
        { id: 39, label: "FabLab", group: "digital", url: "" },
        { id: 41, label: "Jack", group: "project", url: "" },
        { id: 42, label: "La Maker Faire", group: "project", url: "" },
        { id: 43, label: "La Paillasse", group: "project", url: "" },
        { id: 44, label: "Catherine Ramus", group: "people", url: "" },
        { id: 45, label: "Open Mind Innovation", group: "project", url: "https://lab.omind.me" },
        { id: 46, label: "Celia Hodent", group: "people", url: "https://celiahodent.com/" },
        { id: 47, label: "Sciences Cognitives" },
        { id: 48, label: "CeramBot", group: "project", url: "https://www.kickstarter.com/projects/210413417/cerambot-the-most-affordable-ceramic-3d-printer?ref=checkout_rewards_page" },
        { id: 49, label: "Frameworks CAD", group: "digital" },
        { id: 50, label: "OpenJSCAD", group: "project", url: "https://openjscad.org" },
        { id: 51, label: "CraftML", group: "project", url: "http://docs.craftml.io/" },
        { id: 52, label: "Ressources 3D", group: "ressource", url: "http://www.celles.net/wiki/TroisD" },
        { id: 53, label: "api.gouv.fr", group: "ressource", url: "https://api.gouv.fr/" },
        { id: 54, label: "Daniel Browns", group: "people", url: "http://danielbrowns.com/" },
        { id: 55, label: "Evan Wallace", group: "people", url: "http://madebyevan.com/" },
        { id: 100, label: "Usages" },
        { id: 101, label: "Design Culinaire" },
        { id: 102, label: "Restaurant Belafonte", group: "people" },
        { id: 103, label: "MOOC Design Culinaire", group: "ressource", url: "https://www.ferrandi-paris.fr/actualites/mooc-design-culinaire-2017-retour-sur-une-experience-pedagogique-reussie" },
        { id: 200, label: "Santé" },
        { id: 300, label: "Architecture" },
        { id: 301, label: "Danila Babko-Malyi", group: "people" },
    ],
    edges: [
        { from: 55, to: 52, label: "" },
        { from: 300, to: 10, label: "" },
        { from: 300, to: 301, label: "" },
        { from: 54, to: 4, label: "" },
        { from: 53, to: 13, label: "" },
        { from: 52, to: 49, label: "" },
        { from: 49, to: 50, label: "" },
        { from: 49, to: 51, label: "" },
        { from: 49, to: 15, label: "" },
        //{ from: 49, to: 3, label: ""},
        { from: 48, to: 15, label: "" },
        { from: 100, to: 47, label: "" },
        { from: 46, to: 47, label: "" },
        { from: 45, to: 47, label: "" },
        { from: 103, to: 101, label: "" },
        { from: 43, to: 39, label: "" },
        { from: 44, to: 42, label: "" },
        { from: 38, to: 14, label: "" },
        { from: 39, to: 38, label: "" },
        { from: 41, to: 39, label: "" },
        { from: 42, to: 39, label: "" },
        { from: 8, to: 37, label: "" },
        { from: 37, to: 10, label: "" },
        { from: 36, to: 37, label: "" },
        { from: 35, to: 13, label: "" },
        { from: 34, to: 14, label: "" },
        { from: 33, to: 6, label: "" },
        { from: 31, to: 28, label: "" },
        { from: 30, to: 32, label: "" },
        { from: 31, to: 32, label: "" },
        { from: 29, to: 20 },
        { from: 16, to: 200, label: "" },
        { from: 2, to: 1, label: "" },
        { from: 2, to: 9, label: "" },
        { from: 12, to: 9, label: "Ceramics Commons:\nSending ceramic works\nelectronically for a show" },
        { from: 3, to: 1 },
        { from: 4, to: 3 },
        { from: 10, to: 3 },
        { from: 5, to: 28 },
        { from: 25, to: 26 },
        { from: 25, to: 27 },
        { from: 4, to: 2, label: "Contrôle" },
        { from: 4, to: 5 },
        { from: 5, to: 17 },
        { from: 5, to: 18 },
        { from: 19, to: 18 },
        { from: 19, to: 20 },
        { from: 23, to: 20 },
        { from: 24, to: 13 },
        { from: 27, to: 21 },
        { from: 14, to: 22, label: "Découpe sur plaque\nà consistance cuir" },
        { from: 8, to: 10 },
        { from: 21, to: 17 },
        { from: 5, to: 6, label: "Traduction du mouvement\nvers l'imprimante 3D" },
        { from: 5, to: 7, label: "" },
        { from: 11, to: 37, label: "" },
        { from: 13, to: 8, label: "" },
        { from: 2, to: 14, label: "Peut-on penser d'autres\ntypologies d'imprimantes ?" },
        { from: 14, to: 15, label: "" },
        { from: 100, to: 1, label: "" },
        { from: 101, to: 100, label: "" },
        { from: 101, to: 102, label: "" },
        { from: 13, to: 16, label: "" },
        { from: 16, to: 101, label: "" },
    ]
};

export const options = {
    autoResize: true,
    clickToUse: true,
    physics: {
        enabled: true,
        solver: "repulsion",
        repulsion: {
            springConstant: 0.225,
            centralGravity: 0,
            damping: 0.08
        },
    },
    interaction: {
        dragNodes: true,
        dragView: false,
        hideEdgesOnDrag: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: false,
            speed: { x: 10, y: 10, zoom: 0.02 },
            bindToWindow: true
        },
        multiselect: false,
        navigationButtons: true,
        selectable: true,
        selectConnectedEdges: true,
        zoomView: false
    },
    layout: {
        //randomSeed: 29,
        hierarchical: {
            enabled: false,
            levelSeparation: 550,
            nodeSpacing: 1000,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize'   // hubsize, directed
        }
    },
    groups: {
        digital: {
            color: { background: '#3CD670' },
            shape: 'box',
        },
        culinaire: {
            color: { background: 'red' },
            shape: 'box',
        },
        people: {
            color: { background: 'black' },
            shape: 'box',
        },
        project: {
            color: { background: '#999999' },
            shape: 'box',
        },
        ressource: {
            color: { background: 'rgb(10,20,200)' },
            shape: 'box',
        },
    },
    nodes: {
        shape: 'box',
        margin: 10,
        widthConstraint: {
            maximum: 200
        },
        size: 30,
        font: {
            size: 22,
            color: '#ffffff'
        },
        color: {
            background: '#707290',
            hover: 'rgb(250,70,10)',
            highlight: 'rgb(250,70,10)'
        },
        borderWidth: 0
    },
    edges: {
        smooth: {
            forceDirection: "none",
            roundness: 0.4
        },
        color: {
            color: '#3CD670',
            highlight: '#3CD670',
            inherit: false,
            opacity: 1.0
        },
        width: 2
    }
};

export const events = {
    select: function (event) {
        var { nodes, edges } = event;
        ////console.log("Selected nodes:");
        ////console.log(nodes);
        ////console.log("Selected edges:");
        ////console.log(edges);
        if (nodes.length === 1) {
            var node = graph.nodes[nodes[0]];
            if (node.url) {
                ////console.log(node, graph.nodes, nodes[0]);
                window.open(node.url, '_blank');
            }
        }
    }
};
