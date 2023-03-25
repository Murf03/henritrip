const tls1 = require("../assets/images/toulouse1.jpg");
const tls2 = require("../assets/images/toulouse2.jpg");
const tls3 = require("../assets/images/toulouse3.jpg");
const tls4 = require("../assets/images/toulouse4.jpg");
const tls5 = require("../assets/images/toulouse5.jpg");
const tls6 = require("../assets/images/toulouse6.jpg");
const tls7 = require("../assets/images/toulouse7.jpg");
const tls8 = require("../assets/images/toulouse8.jpg");

const barca1 = require("../assets/images/barca1.jpg");
const barca2 = require("../assets/images/barca2.jpg");
const barca3 = require("../assets/images/barca3.jpg");
const barca4 = require("../assets/images/barca4.jpg");
const barca5 = require("../assets/images/barca5.jpg");

const paris1 = require("../assets/images/paris1.jpg");
const paris2 = require("../assets/images/paris2.jpg");
const paris3 = require("../assets/images/paris3.jpg");
const paris4 = require("../assets/images/paris4.jpg");
const paris5 = require("../assets/images/paris5.jpg");
const paris6 = require("../assets/images/paris6.jpg");

const londre1 = require("../assets/images/londre1.jpg");
const londre2 = require("../assets/images/londre2.jpg");
const londre3 = require("../assets/images/londre3.jpg");
const londre4 = require("../assets/images/londre4.jpg");

const porto1 = require("../assets/images/porto1.jpg");
const porto2 = require("../assets/images/porto2.jpg");
const porto3 = require("../assets/images/porto3.jpg");
const porto4 = require("../assets/images/porto4.jpg");
const porto5 = require("../assets/images/porto5.jpg");
const porto6 = require("../assets/images/porto6.jpg");

const toulouse = [tls1, tls2, tls3, tls4, tls5, tls6, tls7, tls8];
const paris = [paris1, paris2, paris3, paris4, paris5, paris6];
const londre = [londre1, londre2, londre3, londre4];
const porto = [porto1, porto2, porto3, porto4, porto5, porto6];
const barca = [barca1, barca2, barca3, barca4, barca5];

const villes = [toulouse, paris, londre, porto, barca];
// toulouse: 0; paris: 1; londre: 2; porto: 3; barca: 4;

export function getRandImage() {
  const numVilleRandom = Math.floor(Math.random() * (villes.length - 1));
  const ville = villes[numVilleRandom];

  const numImageRandom = Math.floor(Math.random() * (ville.length - 1));
  const image = ville[numImageRandom];
  return image;
}

export function getRandImageOfCity(numVille) {
  const ville = villes[numVille];

  const numImageRandom = Math.floor(Math.random() * (ville.length - 1));
  const image = ville[numImageRandom];
  return image;
}

export function getImage(numVille, numImage) {
  // Vérifications
  if (numVille >= 0 && numVille < villes.length) {
    const ville = villes[numVille];
    if (numImage >= 0 && numImage < ville.length) {
      return ville[numImage];
    } else return getRandImageOfCity(numVille);
  } else return getRandImage();
}
