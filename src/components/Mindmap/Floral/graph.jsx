
export const graph = {
    nodes: [
      { id: 1, label: "Végétal", mass: 100, value: 100, group: "digital" },
      { id: 2, label: "Vegetal Chair", group: "project" },
      { id: 3, label: "Ronan et Erwan Bouroullec", group: "people" },
      { id: 4, label: "Algaegraphie", group: "digital" },
      { id: 5, label: "Lia Giraud", group: "people" },
      { id: 6, label: "Cellulaire", group: "" },
      { id: 7, label: "Littérature", group: "" },
      { id: 8, label: "Le Livre des Symboles", group: "ressource" },
      { id: 9, label: "Jardin", group: "digital" },
      { id: 10, label: "Racine", group: "digital" },
      { id: 11, label: "Fleur", group: "digital" },
      { id: 12, label: "Pomme", group: "digital" },
      { id: 13, label: "Blanche Neige", group: "project" },
      { id: 14, label: "Champignon", group: "digital" },
      { id: 15, label: "Raisin", group: "digital" },
      { id: 16, label: "Arbre", group: "digital" },
      { id: 17, label: "Chêne", group: "digital" },
      { id: 18, label: "Olivier", group: "digital" },
      { id: 19, label: "Palmier", group: "digital" },
      { id: 20, label: "Pin", group: "digital" },
      { id: 21, label: "Arbre kabbalistique", group: "digital"},
      { id: 22, label: "Atelier Luma", group: "people" },
      { id: 23, label: "Algae Lab", group: "project" },
      { id: 24, label: "Algues", group: "digital" },
      { id: 25, label: "Druides", group: "" },
      { id: 26, label: "Celtes", group: "" },
      { id: 27, label: "Médecine Végétale", group: "" },
      { id: 28, label: "Panoramix (Astérix)", group: "people" },
      { id: 29, label: "Nausicaä de la vallée du vent", group: "project" },
      { id: 30, label: "Studio Ghibli", group: "people" },
      { id: 31, label: "Lady Oscar", group: "project" },
      { id: 32, label: "Timbres", group: "" },
      { id: 33, label: "Mode", group: "" },
      { id: 34, label: "Brittany Asch", group: "people" },
      { id: 35, label: "Arbre Monde", group: "digital" },
      { id: 36, label: "Jelte van Abbema", group: "people" },
      { id: 37, label: "Bactéries", group: "digital" },
      { id: 38, label: "Symbiosis", group: "project" },
    ],
    edges: [
      { from: 37, to: 6, label: ""},
      { from: 38, to: 36, label: ""},
      { from: 36, to: 37, label: ""},
      { from: 35, to: 16, label: ""},
      { from: 33, to: 34, label: ""}, 
      { from: 33, to: 11, label: ""}, 
      { from: 32, to: 11, label: ""}, 
      { from: 31, to: 11, label: ""}, 
      { from: 17, to: 28, label: ""}, 
      { from: 29, to: 7, label: ""}, 
      { from: 29, to: 30, label: ""}, 
      { from: 25, to: 28, label: ""}, 
      { from: 25, to: 27, label: ""}, 
      { from: 25, to: 26, label: ""}, 
      { from: 1, to: 25, label: ""}, 
      { from: 1, to: 24, label: ""}, 
      { from: 23, to: 24, label: ""}, 
      { from: 22, to: 23, label: ""}, 
      { from: 1, to: 2, label: ""}, 
      { from: 2, to: 3, label: ""}, 
      { from: 4, to: 24, label: ""}, 
      { from: 4, to: 5, label: ""}, 
      { from: 6, to: 24, label: ""}, 
      { from: 6, to: 1, label: ""}, 
      { from: 7, to: 1, label: ""}, 
      { from: 7, to: 8, label: ""}, 
      { from: 9, to: 8, label: ""}, 
      { from: 10, to: 8, label: ""}, 
      { from: 11, to: 8, label: ""}, 
      { from: 12, to: 8, label: ""}, 
      { from: 13, to: 12, label: ""}, 
      { from: 14, to: 8, label: ""}, 
      { from: 15, to: 8, label: ""}, 
      { from: 16, to: 8, label: ""}, 
      { from: 17, to: 16, label: ""}, 
      { from: 18, to: 16, label: ""}, 
      { from: 19, to: 16, label: ""}, 
      { from: 20, to: 16, label: ""}, 
      { from: 21, to: 16, label: ""}, 
      ]
  };
  
  export const options = {
    physics: {
      solver: "repulsion",
      repulsion: {
        springConstant: 0.225,
        centralGravity: 0,
        damping: 0.08
      },
    },
    interaction:{
      dragNodes:true,
      dragView: false,
      hideEdgesOnDrag: false,
      hideNodesOnDrag: false,
      hover: true,
      hoverConnectedEdges: true,
      keyboard: {
        enabled: false,
        speed: {x: 10, y: 10, zoom: 0.02},
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
        enabled:false,
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
            color: {background:'#3CD670'},
            shape: 'box',
        },
        culinaire: {
            color: {background:'red'},
            shape: 'box',
        },
        people: {
            color: {background:'black'},
            shape: 'box',
        },
        project: {
            color: {background:'#999999'},
            shape: 'box',
        },
        ressource: {
            color: {background:'rgb(10,20,200)'},
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
          background:'#707290',
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
              color:'#000000',
              highlight:'#3CD670',
              inherit: false,
              opacity:1.0
          },      
          width: 2
    }
  };
  
  export const events = {
    select: function(event) {
      var { nodes, edges } = event;
      //console.log("Selected nodes:");
      //console.log(nodes);
      //console.log("Selected edges:");
      //console.log(edges);
      if (nodes.length === 1) {
          var node = graph.nodes[nodes[0]];
          if (node.url) {
            //console.log(node, graph.nodes, nodes[0]);
            window.open(node.url, '_blank');
          }
      }
    }
  };
  