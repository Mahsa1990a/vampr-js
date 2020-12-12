class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  //1 Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  //2 Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  //3 Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numOfVampires++;
    }
    return numOfVampires;
  }

  //4 Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  //6 Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    } else {
      if (this.offspring) {
        for (let i = 0; i < this.offspring.length; i++) {
          if (this.offspring[i].vampireWithName(name)) {
            return this.offspring[i].vampireWithName(name);
          }
        }
      }
    }
    return null;
  }

  //7 Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVampires = 0;
    for (const offspring1 of this.offspring) {
      totalVampires += 1 + offspring1.totalDescendents;
    }
    return totalVampires;
  }

  //8 Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
   let year = 1980;
   let vamp = [];
   if (this.yearConverted > year) {
     vamp.push(this);
   }
   for (const child of this.offspring) {
    vamp = vamp.concat(child.allMillennialVampires);
   }
   return vamp;
  }

  /**5  Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

const original = new Vampire("Original", 1990);
const ansel = new Vampire("Ansel", 1991);
const bart = new Vampire("Bart", 1991);
const elgort = new Vampire("Elgort", 1992);
const sarah = new Vampire("Sarah", 1992);
const andrew = new Vampire("Andrew", 1993);

original.addOffspring(ansel);
original.addOffspring(bart);
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);
elgort.addOffspring(andrew);

module.exports = Vampire;

