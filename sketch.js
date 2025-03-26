//let widthCanvas = 1680/2;
//let heightCanvas = 1816/2;
let widthCanvas = 1792;
let heightCanvas = 1024;

let widthCharacter = 1680/3;
let heightCharacter = 1816/3;
let xOffsetCharacter = widthCanvas/2 - widthCharacter/2;
let yOffsetCharacter = heightCanvas/2 - heightCharacter/2 - 150;


let headSelect, leftArmSelect, rightArmSelect, armsSelect, itemSelect, mouthSelect, maskOptions;
let leftArmConfig;
let backgroundImg, deskImg, torsoImg, headImg, leftArmImg, rightArmImg, itemImgs, mouthImg, maskImg, plateauItemImgs, deskItemImg, deskItemRightImg;
let torsoOptions, headOptions, leftArmOptions, rightArmOptions, itemOptions;

let showBackground = true;

let plateauItemOptions = [];


function preload() {
  // Charger les images par défaut
  backgroundImg = loadImage('assets/plateau/Fond1.png');
  //deskImg = loadImage('assets/plateau/bureau.png');
  deskImg = loadImage('assets/plateau/bureau_2.png');
  torsoImg = loadImage('assets/torse/Torse.png');
  headImg = loadImage('assets/head/Head_smile.png');
  leftArmImg = loadImage('assets/arms/Bras_baisse_gauche.png');
  rightArmImg = loadImage('assets/arms/Bras_baisse_droit.png');
  itemImgs = [];
  plateauItemImgs = [];
  deskItemImg = null;
  deskItemRightImg = null;
}


function setup() {
  createCanvas(widthCanvas, heightCanvas, document.getElementById("canvas"));

  const backgroundOptions = [
    { label: "Plateau TV", value: "assets/plateau/Fond1.png" },
    { label: "Bunker", value: "assets/plateau/FondBunker.jpg" }
  ];

  const headOptions = [
    { label: "Souriant", value: "assets/head/Head_smile.png" },
    { label: "Enervé", value: "assets/head/Head_angry.png" },
    { label: "Choqué", value: "assets/head/Head_shocked.png" },
    { label: "Perplexe", value: "assets/head/Head_perplexe.png" },
    { label: "Triste", value: "assets/head/Head_sad.png" }
  ];
  
  const mouthOptions = [
    { label: "Bouche par default du visage", value: null },
    { label: "Bouche ouverte", value: "assets/mouth/mouth_shocked.png" },
    { label: "Bouche enervée", value: "assets/mouth/mouth_angry.png" },
    { label: "Bouche sourire 1", value: "assets/mouth/mouth_smile1.png" },
    { label: "Bouche sourire 2", value: "assets/mouth/mouth_smile2.png" },
    { label: "Bouche sourire 3", value: "assets/mouth/mouth_smile3.png" },
    { label: "Bouche sourire 4", value: "assets/mouth/mouth_smile4.png" },
    { label: "Bouche triste", value: "assets/mouth/mouth_sad.png" }
  ]
  
  
  const maskOptions = [
    { label: "pas de masque", value: null },
    { label: "Anonymous", value: "assets/head/Head_anonymous.png" },
    { label: "Pharaon", value: "assets/head/Head_pharaon2.png" },
  ];

  leftArmConfig = {
    "Bras_baisse_gauche": {path: "assets/arms/Bras_baisse_gauche.png", preventRight: false},
    "Bras_feuille_gauche": {path: "assets/arms/Bras_feuille_gauche.png", preventRight: false},
    "Bras_doigt_gauche": {path:  "assets/arms/Bras_doigt_gauche.png", preventRight: false},
    "Bras_ouvert_gauche": {path: "assets/arms/Bras_ouvert_gauche.png", preventRight: false},
    "Bras_shushh_gauche": {path: "assets/arms/Bras_shushh_gauche.png", preventRight: false},
    "Bras_think_gauche": {path: "assets/arms/Bras_think_gauche.png", preventRight: false},
    "Bras_pioche": {path: "assets/arms/Bras_pioche.png", preventRight: false},
    "Bras_croises": {path: "assets/arms/Bras_croises.png", preventRight: true},
    "Bras_sut_tete": {path: "assets/arms/Bras_sut_tete.png", preventRight: true},
  }
  
  const leftArmOptions = [
    { label: "Bras baissé", value: "Bras_baisse_gauche"},
    { label: "Bras tenant feuille", value: "Bras_feuille_gauche"},
    { label: "Bras pointant en le ciel", value: "Bras_doigt_gauche"},
    { label: "Bras ouvert", value: "Bras_ouvert_gauche"},
    { label: "Bras chut", value: "Bras_shushh_gauche"},
    { label: "Bras pensée", value: "Bras_think_gauche"},
    { label: "Bras croisés", value: "Bras_croises"},
    { label: "Bras tenant la tête", value: "Bras_sut_tete"},
    { label: "Bras avec pioche", value: "Bras_pioche"},
  ];

  const rightArmOptions = [
    { label: "Bras baissé", value: "assets/arms/Bras_baisse_droit.png" },
    { label: "Bras tenant feuille", value: "assets/arms/Bras_feuille_droit.png" },
    { label: "Bras regarde l'heure", value: "assets/arms/Bras_montre_droit.png" },
    { label: "Bras ouvert", value: "assets/arms/Bras_ouvert_droit.png" }
  ];

  const itemOptions = [
    { label: "Aucun Accessoires", value: null },
    { label: "Casque chantier", value: "assets/items/Item_chantier.png" },
    { label: "Chapeau fête", value: "assets/items/Item_chapeau_fete.png" },
    { label: "Chapeau paille", value: "assets/items/Item_chapeau_paille.png" },
    { label: "Yeux Coeur", value: "assets/items/Eyes_love2.png" },
    { label: "Badge AD", value: "assets/items/Item_ad.png" },
    { label: "Casquette OM", value: "assets/items/Item_cap_om.png" },
    { label: "Pinocchio", value: "assets/items/Nose_pinocchio_5.png" },
    { label: "Lunette soleil", value: "assets/items/Lunette1.png" },
    { label: "Lunette dollars", value: "assets/items/Lunette4.png" },
  ];
  

  plateauItemOptions = [
    { label: "Aucun objets", value: null },
    { label: "Sans fond", value: "no-background" },
    { label: "Innondation", value: "assets/plateau/Item_eau.png" },
    { label: "Dynamites", value: "assets/plateau/Item_dynamite.png"},
    { label: "Panneau Chute de pierre", value: "assets/plateau/Item_rockfall_sign.png", back: true},
    { label: "Panneau Stop (gauche)", value: "assets/plateau/Item_stop.png", back: true},
    { label: "Panneau Stop (droite)", value: "assets/plateau/Item_right_stop.png", back: true },
    { label: "Panneau demi-tour (gauche)", value: "assets/plateau/Item_reverse_sign.png", back: true },
    { label: "Panneau demi-tour (droite)", value: "assets/plateau/Item_right_reverse_sign.png", back: true },
    { label: "Paperboard (gauche)", value: "assets/plateau/Item_paperboard.png", back: true},
    { label: "Paperboard (droite)", value: "assets/plateau/Item_right_paperboard.png", back: true },
    { label: "Spot lumiere", value: "assets/plateau/Light_spot.png" },
    { label: "banane plafond", value: "assets/plateau/Item_attache_banana.png" },
    { label: "roue plafond", value: "assets/plateau/Item_attache_wheel.png" },
    //{ label: "Barils", value: "assets/plateau/Item_barils.png" },
    //{ label: "Panneau polution", value: "assets/plateau/Item_pollution_sign.png" },
    { label: "Atmo pollution", value: "assets/plateau/Atmo_pollution.png" },
  ];


  const deskItemOptions = [
    { label: "Aucun objets", value: null },
    { label: "Urbanana", value: "assets/items-desk/Item_urbanana.png" },
    { label: "Broopyn", value: "assets/items-desk/Item_broopyn.png" },
    { label: "Camion", value: "assets/items-desk/Item_truck.png" },
    { label: "Bateau", value: "assets/items-desk/Item_boat.png" },
    { label: "Pyramid", value: "assets/items-desk/Item_pyramid_2.png" },
    { label: "Lingots", value: "assets/items-desk/Item_lingot.png" },
    { label: "Sac d'argent", value: "assets/items-desk/Item_money_bag.png" },
    { label: "Mini roue", value: "assets/items-desk/Item_mini_wheel.png" },
    { label: "Petit soldats", value: "assets/items-desk/Item_soldat.png" },
    { label: "Boite vote", value: "assets/items-desk/Item_vote.png" }
  ];
  
  
  
  const deskItemRightOptions = [
    { label: "Aucun objets", value: null },
    { label: "Broopyn", value: "assets/items-desk/Item_right_broopyn.png" },
    { label: "Camion", value: "assets/items-desk/Item_right_truck.png" },
    { label: "Bateau", value: "assets/items-desk/Item_right_boat.png" },
    { label: "Pyramid", value: "assets/items-desk/Item_right_pyramid.png" },
    { label: "Lingots", value: "assets/items-desk/Item_right_lingot.png" },
    { label: "Sac d'argent", value: "assets/items-desk/Item_right_money_bag.png" },
    { label: "Mini roue", value: "assets/items-desk/Item_right_mini_wheel.png" },
    { label: "Petit soldats", value: "assets/items-desk/Item_right_soldat.png" },
    { label: "Boite vote", value: "assets/items-desk/Item_right_vote.png" }
  ];
  
  
  backgroundSelect = createLabeledSelect(backgroundOptions, "Fond :");

  // Menus pour choisir les parties du corps
  headSelect = createLabeledSelect(headOptions, "Tête :");
  mouthSelect = createLabeledSelect(mouthOptions, "Bouche :");
  leftArmSelect = createLabeledSelect(leftArmOptions, "Bras gauche :");
  rightArmSelect = createLabeledSelect(rightArmOptions, "Bras droit :");
  itemSelect = createLabeledSelect(itemOptions, "Accessoire:", true);
  maskSelect = createLabeledSelect(maskOptions, "Masque :");
  plateauItemSelect = createLabeledSelect(plateauItemOptions, "Object du plateau (ctrl+clic pour multiple):", true);
  deskItemSelect = createLabeledSelect(deskItemOptions, "Object du bureau:");
  deskItemRightSelect = createLabeledSelect(deskItemRightOptions, "Object du bureau (droite):");
  
  backgroundSelect.changed(updateImages);
  headSelect.changed(updateImages);
  mouthSelect.changed(updateImages);
  leftArmSelect.changed(updateImages);
  rightArmSelect.changed(updateImages);
  itemSelect.changed(updateImages);
  maskSelect.changed(updateImages);
  plateauItemSelect.changed(updateImages);
  deskItemSelect.changed(updateImages);
  deskItemRightSelect.changed(updateImages);
  
  let saveButton = createButton("Sauvegarder").parent("#controls");
  saveButton.mousePressed(() => saveCanvas("personnage", "png"));
}

function updateImages() {
  const backgroundValue = backgroundSelect.selected();
  const headValue = headSelect.selected();
  const mouthValue = mouthSelect.selected();
  const leftArmValue = leftArmSelect.selected();
  const rightArmValue = rightArmSelect.selected();
  const itemValues = itemSelect.selected();
  const maskValue = maskSelect.selected();
  const plateauItemValues = plateauItemSelect.selected();
  const deskItemValue = deskItemSelect.selected();
  const deskItemRightValue = deskItemRightSelect.selected();
  
  backgroundImg = backgroundValue !== "null" ? loadImage(backgroundValue) : null;
  if (backgroundValue === "assets/plateau/FondBunker.jpg") {
    deskImg = loadImage('assets/plateau/Bureau2.png');
  } else {
    deskImg = loadImage('assets/plateau/bureau_2.png');
  }
  headImg = headValue !== "null" ? loadImage(headValue) : null;
  mouthImg = mouthValue !== "null" ? loadImage(mouthValue) : null;
  leftArmImg = loadImage(leftArmConfig[leftArmValue].path);
  rightArmImg = !leftArmConfig[leftArmValue].preventRight ? loadImage(rightArmValue) : null;
  itemImgs = [];
  itemValues.forEach((itemValue) => {
    console.log(itemValue, "itemValue")
    itemImgs.push(loadImage(itemValue));
  })
  maskImg = maskValue !== "null" ? loadImage(maskValue) : null;
  
  
  plateauItemImgs = [];
  showBackground = true;
  
  
  plateauItemValues.forEach((plateauItemValue) => {
    if (plateauItemValue === "no-background") {
      showBackground = false;
    } else if (plateauItemValue !== "null") {
      // Trouver l'objet option correspondant
      const itemOption = plateauItemOptions.find(option => option.value === plateauItemValue);
      // Créer un objet avec l'image et l'attribut back
      const plateauItemInfo = {
        img: loadImage(plateauItemValue),
        back: itemOption.back || false  // par défaut, les objets sont au premier plan
      };
      plateauItemImgs.push(plateauItemInfo);
    }
  });
  
  deskItemImg = deskItemValue !== "null" ? loadImage(deskItemValue) : null;
  deskItemRightImg = deskItemRightValue !== "null" ? loadImage(deskItemRightValue) : null;
  
}

function draw() {
  clear();
  
  //Dessiner le plateau TV
  if (showBackground) {
    image(backgroundImg, 0, 0, widthCanvas, heightCanvas);
  }
  
  // Dessiner les objets du plateau qui doivent être EN ARRIÈRE du bureau
  plateauItemImgs.forEach((plateauItemInfo) => {
    if (plateauItemInfo.back) {
      image(plateauItemInfo.img, 0, 0, widthCanvas, heightCanvas);
    }
  });
  
  // Dessiner les parties du personnage
  if (torsoImg) image(torsoImg, xOffsetCharacter, yOffsetCharacter, widthCharacter, heightCharacter);
  if (headImg) image(headImg, xOffsetCharacter, yOffsetCharacter, widthCharacter, heightCharacter);
  if (mouthImg) image(mouthImg, xOffsetCharacter, yOffsetCharacter, widthCharacter, heightCharacter);
  if (maskImg) image(maskImg, xOffsetCharacter, yOffsetCharacter, widthCharacter, heightCharacter);
  if (leftArmImg) image(leftArmImg, xOffsetCharacter, yOffsetCharacter, widthCharacter, heightCharacter);
  if (rightArmImg) image(rightArmImg, xOffsetCharacter, yOffsetCharacter, widthCharacter, heightCharacter);
  itemImgs.forEach((itemImg) => {
    image(itemImg, xOffsetCharacter, yOffsetCharacter, widthCharacter, heightCharacter);
  })
  
  
  //Dessiner le bureau TV
  image(deskImg, 0, 0, widthCanvas, heightCanvas);
  
  // Dessiner les objets du plateau qui doivent être EN AVANT du bureau
  plateauItemImgs.forEach((plateauItemInfo) => {
    if (!plateauItemInfo.back) {
      image(plateauItemInfo.img, 0, 0, widthCanvas, heightCanvas);
    }
  });
  
  //Dessiner les object du desk
  if(deskItemImg) image(deskItemImg, 0, 0, widthCanvas, heightCanvas);
  if(deskItemRightImg) image(deskItemRightImg, 0, 0, widthCanvas, heightCanvas);
}


function createLabeledSelect(options, labelText, multiple = false) {
  let container = createDiv().parent("#controls").attribute('class', 'labeled-select');

  let label = createElement('label', labelText);
  label.parent(container);

  let select = createSelect(multiple);
  select.parent(container);

  options.forEach(option => {
    select.option(option.label, option.value);
  });

  return select;
}