let widthCanvas = 1680/2;
let heightCanvas = 1816/2;

let headSelect, leftArmSelect, rightArmSelect, armsSelect, itemSelect, mouthSelect, maskOptions;
let leftArmConfig;
let torsoImg, headImg, leftArmImg, rightArmImg, itemImgs, mouthImg, maskImg;
let torsoOptions, headOptions, leftArmOptions, rightArmOptions, itemOptions;

let timeline = []; // Stocke les keyframes
let currentTime = 0; // Temps actuel sur la timeline
let totalDuration = 5000; // Durée totale en millisecondes (5 secondes par défaut)
let isPlaying = false;
let playbackStartTime;

let gif;
let isRecording = false;
let recordingFrameIndex = 0;

function preload() {
  // Charger les images par défaut
  torsoImg = loadImage('assets/torse/Torse.png');
  headImg = loadImage('assets/head/Head_smile.png');
  leftArmImg = loadImage('assets/arms/Bras_baisse_gauche.png');
  rightArmImg = loadImage('assets/arms/Bras_baisse_droit.png');
  itemImgs = [];
}


// Ajoutez cette fonction après la fonction setup()
function setupGIFRecorder() {
  // Créer une instance de GIF.js
  gif = new GIF({
    workers: 2,
    quality: 10,
    width: widthCanvas,
    height: heightCanvas,
    workerScript: 'libs/gif.worker.js'
  });

  // Ajouter un gestionnaire pour quand le GIF est terminé
  gif.on('finished', function(blob) {
    // Créer un lien de téléchargement
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'animation.gif';
    link.click();
    
    // Réinitialiser l'état d'enregistrement
    isRecording = false;
    document.getElementById('record-button').innerHTML = '🔴 Enregistrer GIF';
    document.getElementById('record-status').innerHTML = '';
  });

  // Créer un bouton pour enregistrer le GIF
  let recordContainer = createDiv().parent("#controls-panel").attribute('class', 'record-container');
  let recordButton = createButton("🔴 Enregistrer GIF").parent(recordContainer);
  recordButton.attribute('id', 'record-button');
  recordButton.mousePressed(startRecording);
  
  // Créer un élément pour afficher le statut d'enregistrement
  let recordStatus = createDiv().parent(recordContainer);
  recordStatus.attribute('id', 'record-status');
}

// Ajoutez cette fonction pour démarrer l'enregistrement
function startRecording() {
  if (isRecording) return;
  
  // Vérifier s'il y a au moins deux keyframes
  if (timeline.length < 2) {
    alert("Vous avez besoin d'au moins deux keyframes pour créer un GIF.");
    return;
  }
  
  // Initialiser l'enregistrement
  isRecording = true;
  recordingFrameIndex = 0;
  gif.frames = [];
  
  document.getElementById('record-button').innerHTML = '⏺️ Enregistrement en cours...';
  document.getElementById('record-status').innerHTML = 'Préparation de l\'enregistrement...';
  
  // Arrêter la lecture si elle est en cours
  if (isPlaying) {
    togglePlay();
  }
  
  // Commencer l'enregistrement au premier keyframe
  currentTime = timeline[0].time;
  updateCharacterAtTime(currentTime);
  select('.timeline-slider').value(currentTime);
  select('.time-display').html((currentTime/1000).toFixed(2) + "s");
  
  // Attendre un cycle de rendu pour s'assurer que le personnage est mis à jour
  setTimeout(captureFrame, 2000);
}

// Fonction pour capturer une frame du GIF
function captureFrame() {
  if (!isRecording) return;
  
  document.getElementById('record-status').innerHTML = `Enregistrement du keyframe ${recordingFrameIndex + 1}/${timeline.length}...`;
  
  // Obtenir le contexte du canvas
  let canvas = document.getElementById('canvas');
  
  // Ajouter la frame au GIF
  let delay = 1000;  // Délai par défaut si c'est le dernier keyframe
  
  if (recordingFrameIndex < timeline.length - 1) {
    // Calculer le délai jusqu'au prochain keyframe
    delay = timeline[recordingFrameIndex + 1].time - timeline[recordingFrameIndex].time;
  }
  
  // Limiter le délai minimum à 100ms pour éviter les problèmes
  delay = Math.max(delay, 100);
  
  gif.addFrame(canvas, {delay: delay, copy: true});
  
  recordingFrameIndex++;
  
  // Passer au keyframe suivant ou terminer
  if (recordingFrameIndex < timeline.length) {
    currentTime = timeline[recordingFrameIndex].time;
    updateCharacterAtTime(currentTime);
    select('.timeline-slider').value(currentTime);
    select('.time-display').html((currentTime/1000).toFixed(2) + "s");
    
    // Attendre que le rendu soit mis à jour avant de capturer la frame suivante
    setTimeout(captureFrame, 100);
  } else {
    // Toutes les frames ont été capturées, rendre le GIF
    document.getElementById('record-status').innerHTML = 'Génération du GIF en cours...';
    gif.render();
  }
}


function setup() {
  createCanvas(widthCanvas, heightCanvas, document.getElementById("canvas"));

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
  ];

  leftArmConfig = {
    "Bras_baisse_gauche": {path: "assets/arms/Bras_baisse_gauche.png", preventRight: false},
    "Bras_feuille_gauche": {path: "assets/arms/Bras_feuille_gauche.png", preventRight: false},
    "Bras_doigt_gauche": {path:  "assets/arms/Bras_doigt_gauche.png", preventRight: false},
    "Bras_ouvert_gauche": {path: "assets/arms/Bras_ouvert_gauche.png", preventRight: false},
    "Bras_shushh_gauche": {path: "assets/arms/Bras_shushh_gauche.png", preventRight: false},
    "Bras_think_gauche": {path: "assets/arms/Bras_think_gauche.png", preventRight: false},
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
  ];

  const rightArmOptions = [
    { label: "Bras baissé", value: "assets/arms/Bras_baisse_droit.png" },
    { label: "Bras tenant feuille", value: "assets/arms/Bras_feuille_droit.png" },
    { label: "Bras regarde l'heure", value: "assets/arms/Bras_montre_droit.png" },
    { label: "Bras ouvert", value: "assets/arms/Bras_ouvert_droit.png" }
  ];

  const itemOptions = [
    { label: "Aucun Accessoires", value: null },
    { label: "Chapeau fête", value: "assets/items/Item_chapeau_fete.png" },
    { label: "Chapeau paille", value: "assets/items/Item_chapeau_paille.png" },
    { label: "Yeux Coeur", value: "assets/items/Eyes_love2.png" },
    { label: "Badge AD", value: "assets/items/Item_ad.png" },
    { label: "Casquette OM", value: "assets/items/Item_cap_om.png" },
    { label: "Pinocchio", value: "assets/items/Nose_pinocchio_5.png" },
    { label: "Lunette soleil", value: "assets/items/Lunette1.png" },
    { label: "Lunette dollars", value: "assets/items/Lunette4.png" },
  ];
  
  
  // Menus pour choisir les parties du corps
  headSelect = createLabeledSelect(headOptions, "Choisissez une tête :");
  mouthSelect = createLabeledSelect(mouthOptions, "Choisissez une bouche :");
  leftArmSelect = createLabeledSelect(leftArmOptions, "Choisissez un bras gauche :");
  rightArmSelect = createLabeledSelect(rightArmOptions, "Choisissez un bras droit :");
  itemSelect = createLabeledSelect(itemOptions, "Choisissez un accessoire (ctrl + clic pour multiple accessoires):", true);
  maskSelect = createLabeledSelect(maskOptions, "Choisissez une masque :");
  
  headSelect.changed(updateImages);
  mouthSelect.changed(updateImages);
  leftArmSelect.changed(updateImages);
  rightArmSelect.changed(updateImages);
  itemSelect.changed(updateImages);
  maskSelect.changed(updateImages);
  
  let saveButton = createButton("Sauvegarder").parent("#controls");
  saveButton.mousePressed(() => saveCanvas("personnage", "png"));


  // Interface de la timeline
  createDiv("<h3>Timeline d'animation</h3>").parent("#controls-panel").attribute('class', 'timeline-header');
  
  let timelineControls = createDiv().parent("#controls-panel").attribute('class', 'timeline-controls');
  
  // Contrôle de la durée totale
  let durationContainer = createDiv().parent(timelineControls).attribute('class', 'duration-control');
  createElement('label', "Durée totale (secondes) : ").parent(durationContainer);
  let durationInput = createInput(totalDuration/1000).parent(durationContainer).attribute('type', 'number').attribute('min', '1');
  durationInput.input(() => {
    totalDuration = durationInput.value() * 1000;
    timelineSlider.attribute('max', totalDuration);
    updateTimelineDisplay();
  });
  
  // Slider unique pour la timeline
  let sliderContainer = createDiv().parent(timelineControls).attribute('class', 'timeline-slider-container');
  createElement('label', "Position actuelle : ").parent(sliderContainer);
  let timelineSlider = createSlider(0, totalDuration, 0, 1).parent(sliderContainer).attribute('class', 'timeline-slider');
  let timeDisplay = createSpan("0.00s").parent(sliderContainer).attribute('class', 'time-display');
  
  timelineSlider.input(() => {
    currentTime = timelineSlider.value();
    timeDisplay.html((currentTime/1000).toFixed(2) + "s");
    updateCharacterAtTime(currentTime);
  });
  
  // Boutons de contrôle
  let buttonsContainer = createDiv().parent(timelineControls).attribute('class', 'timeline-buttons');
  
  let addKeyframeBtn = createButton("+ Ajouter Keyframe").parent(buttonsContainer);
  addKeyframeBtn.mousePressed(addKeyframe);
  
  let playBtn = createButton("▶️ Lecture").parent(buttonsContainer);
  playBtn.attribute('id', 'play-button')
  playBtn.mousePressed(togglePlay);

  // Conteneur pour la timeline visuelle
  let timelineVisualContainer = createDiv().parent("#controls-panel").attribute('id', 'timeline-visual-container').attribute('class', 'timeline-visual-container');
  
  // Ajouter un keyframe initial à 0ms
  addKeyframe();
  
  // Ajouter l'initialisation du générateur de GIF à la fin
  setupGIFRecorder();
}

function updateImages() {
  const headValue = headSelect.selected();
  const mouthValue = mouthSelect.selected();
  const leftArmValue = leftArmSelect.selected();
  const rightArmValue = rightArmSelect.selected();
  const itemValues = itemSelect.selected();
  const maskValue = maskSelect.selected();
  
  headImg = headValue !== "null" ? loadImage(headValue) : null;
  mouthImg = mouthValue !== "null" ? loadImage(mouthValue) : null;
  leftArmImg = loadImage(leftArmConfig[leftArmValue].path);
  rightArmImg = !leftArmConfig[leftArmValue].preventRight ? loadImage(rightArmValue) : null;
  itemImgs = [];
  itemValues.forEach((itemValue) => {
    itemImgs.push(loadImage(itemValue));
  })

  maskImg = maskValue !== "null" ? loadImage(maskValue) : null;
}


function addKeyframe() {
  
  // Créer un objet keyframe avec les sélections actuelles
  let keyframe = {
    time: currentTime,
    head: headSelect.selected(),
    mouth: mouthSelect.selected(),
    leftArm: leftArmSelect.selected(),
    rightArm: rightArmSelect.selected(),
    items: itemSelect.selected(),
    mask: maskSelect.selected()
  };
  
  // Vérifier s'il existe déjà un keyframe à ce moment
  let existingIndex = timeline.findIndex(kf => kf.time === currentTime);
  if (existingIndex >= 0) {
    timeline[existingIndex] = keyframe;
  } else {
    timeline.push(keyframe);
    timeline.sort((a, b) => a.time - b.time);
  }
  
  updateTimelineDisplay();
}

function updateTimelineDisplay() {
  // Effacer l'affichage actuel
  let container = select('#timeline-visual-container');
  container.html('');
  
  // Créer une barre de timeline visuelle
  let timelineBar = createDiv().parent(container).attribute('class', 'timeline-bar');
  
  // Ajouter une marque pour la position actuelle
  let currentTimeMarker = createDiv().parent(timelineBar).attribute('class', 'current-time-marker');
  
  // Ajouter les marqueurs de keyframe sur la barre
  timeline.forEach((keyframe, index) => {
    let percentage = (keyframe.time / totalDuration) * 100;
    let marker = createDiv().parent(timelineBar).attribute('class', 'keyframe-marker');
    marker.style('left', percentage + '%');
    
    // Ajouter les informations et boutons pour ce keyframe
    let keyframeInfo = createDiv().parent(container).attribute('class', 'keyframe-info');
    keyframeInfo.html(`
      <div class="keyframe-time">${(keyframe.time/1000).toFixed(2)}s</div>
      <div class="keyframe-actions">
        <button class="goto-btn">Aller à</button>
        <button class="update-btn">Mettre à jour</button>
        <button class="delete-btn">Supprimer</button>
      </div>
    `);
    
    // Ajouter des gestionnaires d'événements pour les boutons
    let gotoBtn = keyframeInfo.elt.querySelector('.goto-btn');
    gotoBtn.addEventListener('click', () => {
      currentTime = keyframe.time;
      select('.timeline-slider').value(currentTime);
      select('.time-display').html((currentTime/1000).toFixed(2) + "s");
      updateCharacterAtTime(currentTime);
    });
    
    let updateBtn = keyframeInfo.elt.querySelector('.update-btn');
    updateBtn.addEventListener('click', () => {
      addKeyframe();
    });
    
    let deleteBtn = keyframeInfo.elt.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      if (timeline.length > 1) {  // Empêcher de supprimer tous les keyframes
        timeline.splice(index, 1);
        updateTimelineDisplay();
      } else {
        alert("Vous ne pouvez pas supprimer le dernier keyframe restant.");
      }
    });
    
    // Rendre le marqueur cliquable pour aller à ce temps
    marker.mousePressed(() => {
      currentTime = keyframe.time;
      select('.timeline-slider').value(currentTime);
      select('.time-display').html((currentTime/1000).toFixed(2) + "s");
      updateCharacterAtTime(currentTime);
    });
  });
}

function updateCharacterAtTime(time) {
  // Trouver les keyframes avant et après le temps actuel
  let prevKeyframe = null;
  let nextKeyframe = null;
  
  for (let i = 0; i < timeline.length; i++) {
    if (timeline[i].time <= time) {
      prevKeyframe = timeline[i];
    }
    if (timeline[i].time > time && !nextKeyframe) {
      nextKeyframe = timeline[i];
    }
  }
  
  // S'il n'y a pas de keyframe précédent, utiliser le premier
  if (!prevKeyframe && timeline.length > 0) {
    prevKeyframe = timeline[0];
  }
  
  // Appliquer les propriétés du keyframe précédent
  if (prevKeyframe) {
    headSelect.selected(prevKeyframe.head);
    mouthSelect.selected(prevKeyframe.mouth);
    leftArmSelect.selected(prevKeyframe.leftArm);
    rightArmSelect.selected(prevKeyframe.rightArm);
    itemSelect.selected(prevKeyframe.items);
    maskSelect.selected(prevKeyframe.mask);
    updateImages();
  }
  
  // Mettre à jour le marqueur de temps actuel
  if (select('.current-time-marker')) {
    let percentage = (time / totalDuration) * 100;
    select('.current-time-marker').style('left', percentage + '%');
  }
}

function togglePlay() {
  isPlaying = !isPlaying;
  
  if (isPlaying) {
    // Commencer la lecture
    playbackStartTime = millis() - currentTime;
    select('#play-button').html("⏸️ Pause");
  } else {
    // Arrêter la lecture
    select('#play-button').html("▶️ Lecture");
  }
}


function draw() {
  clear();
  
  
  // Mettre à jour le temps si en mode lecture
  if (isPlaying) {
    currentTime = millis() - playbackStartTime;
    
    // Vérifier si nous avons atteint la fin
    if (currentTime >= totalDuration) {
      currentTime = 0;
      playbackStartTime = millis();
    }
    
    // Mettre à jour le slider et l'affichage du temps
    select('.timeline-slider').value(currentTime);
    select('.time-display').html((currentTime/1000).toFixed(2) + "s");
    
    // Mettre à jour l'apparence du personnage
    updateCharacterAtTime(currentTime);
  }

  // Dessiner les parties du personnage
  if (torsoImg) image(torsoImg, 0, 0, widthCanvas, heightCanvas);
  if (headImg) image(headImg, 0, 0, widthCanvas, heightCanvas);
  if (mouthImg) image(mouthImg, 0, 0, widthCanvas, heightCanvas);
  if (maskImg) image(maskImg, 0, 0, widthCanvas, heightCanvas);
  if (leftArmImg) image(leftArmImg, 0, 0, widthCanvas, heightCanvas);
  if (rightArmImg) image(rightArmImg, 0, 0, widthCanvas, heightCanvas);
  itemImgs.forEach((itemImg) => {
    image(itemImg, 0, 0, widthCanvas, heightCanvas);
  })
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