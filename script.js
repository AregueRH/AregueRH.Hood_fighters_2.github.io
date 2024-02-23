
class Personnage {
    constructor(nomPersonnage, classPersonnage, pvPersonnage, niveauPersonage, attaquePersonnage) {
        this.nom = nomPersonnage;
        this.class = classPersonnage;
        this.pv = pvPersonnage;
        this.niveau = niveauPersonage;
        this.attaque = attaquePersonnage;
    }

    blessures_recues (blessures) {
        this.pv -= blessures;
        console.log(`l'attaque de ${this.nom} vient de faire ${this.attaque} dégâts`);
        console.log(`il lui reste, ${this.pv} PV restants.`);
    }
    blessures_bouclier (blessures) {
        this.pv -= blessures - 10;
        this.attaque = Math.max(this.attaque - 5, 0); 
        console.log(`l'attaque de ${this.nom} vient de faire ${this.attaque} dégâts`);
        console.log(`il lui reste, ${this.pv} PV restants.`);
    }
}

class Gobelin extends Personnage  {
    attaqueAutomatique(cible){
        let blessures_infligees = this.attaque; 
        cible.blessures_recues(blessures_infligees);
    }
}
class Squelette extends Personnage  {
    attaqueAutomatique(cible){
        let blessures_infligees = this.attaque; 
        cible.blessures_recues(blessures_infligees);
    }
}
class Necromancien extends Personnage  {
    attaqueAutomatique(cible){
        let blessures_infligees = this.attaque; 
        cible.blessures_recues(blessures_infligees);
    }
}

class Guerrier extends Personnage  {   
}

let joueur_guerrier = new Guerrier("Crom", "barbare", 350, 1, 50);
let gobelin_ordi = new Gobelin ("Raïvax", "gobelin", 200, 1, 30);
let squelette_ordi = new Squelette ("Racleur d'os", "squelette", 300, 1, 30);
let necromancien_ordi = new Squelette ("Nécromage", "nécromancien", 300, 1, 100);

const app = Vue.createApp({
    data(){
        return{
            html: "Vous entrez dans Xar Saroth !!!",
            htmlCombat: " ",
            compteurAvancement: 0,
            joueur: joueur_guerrier,
            ennemi: gobelin_ordi,
            modeCombat: false,
            text: "",
        };
    },
    
    methods: {
        coupEpee(cible){
            let blessures_infligees = this.joueur.attaque; 
            cible.blessures_recues(blessures_infligees);
            this.htmlCombat = " ";
            this.htmlCombat += `<p>${this.joueur.nom} lance un coup d'épée. ${this.ennemi.nom} a ${this.ennemi.pv} PV restants.</p>`;
    
            if (this.ennemi.pv > 0) {
                this.ennemi.attaqueAutomatique(this.joueur);  // Attaque automatique du gobelin après le coup du joueur
                this.htmlCombat += `<p>${this.ennemi.nom} contre-attaque ${this.joueur.nom}. ${this.joueur.nom} a ${this.joueur.pv} PV restants.</p>`;
                this.tourDeCombat();
            } else {
                this.modeCombat = false;
                }
        },

        contreBouclier(cible){
            let blessures_infligees = this.joueur.attaque; 
            cible.blessures_bouclier(blessures_infligees);
            this.htmlCombat = " ";
            this.htmlCombat += `<p>${this.joueur.nom} lance un contre du bouclier. ${this.ennemi.nom} a ${this.ennemi.pv} PV restants.</p>`;
    
            if (this.ennemi.pv > 0) {
                this.ennemi.attaqueAutomatique(this.joueur);  // Attaque automatique du gobelin après le coup du joueur
                this.htmlCombat += `<p>${this.ennemi.nom} contre-attaque ${this.joueur.nom}. ${this.joueur.nom} a ${this.joueur.pv} PV restants.</p>`;
                this.tourDeCombat();
            } else {
                this.modeCombat = false;
            }
        },
        
        lancerCombat() {
            this.modeCombat = true;
            this.htmlCombat = "Le combat commence !";
            this.htmlCombat = this.text;  // Assurez-vous que le texte approprié est ajouté ici.
            this.tourDeCombat();
        },

        tourDeCombat() {
            if (this.joueur.pv <= 0 || this.ennemi.pv <= 0) {
                this.modeCombat = false;
                this.htmlCombat += `<p>Le combat est terminé !</p>`;
            }
        },

        compteurSalle(){
            this.compteurAvancement++;
            this.passerSalle();
            this.htmlCombat = " ";
        },

        passerSalle(){
            switch (this.compteurAvancement) {
                case 0 :
                    this.salle0();
                    break;
                case 1 :
                    this.salle1();
                    break;
                
                case 2 :
                    this.salle2();
                    break;
                    
                case 3 :
                    this.salle3();
                    break;
                    
                case 4 :
                    this.salle4();
                    break;
                    
                case 5 :
                    this.ennemi = squelette_ordi;
                    this.salle5();
                    break;
                case 6 :
                    this.salle6();
                    break;
                case 7 :
                    this.ennemi = necromancien_ordi;
                    this.salle7();
                    break;
                case 8 :
                    this.salle8();
                    break;
                    
                default:
                    console.log('Traitement par défaut');
                    break;
            }
        },

        salle0(){
            this.html = "Vous vous réveillez dans une cage et désarmé tandis que des torches éclairent faiblement la piece de leurs ombres lugubres. Un simple regard autour de vous trahi les ambitions hostiles de votre tortionnaire à votre regard. Peu importe qui vous a ammené là , vous devez vous enfuir! En constatant la rouille qui a rongé certains barreaux vous les frappez de toute vos forces. C'est alors qu'après le 3eme coup, votre coeur s'embale en entendant les barres tomber au sol. Vous pouvez sortir de la cage et de cet endroit effroyable !";
            this.html += this.text;
        },
        salle1(){
            this.html = "Vous passez la porte et etes surpris de la quantité d'armes qui vous entourent, il doit s'agir de l'armurerie ! Sans tardez vous récupérez une épée et un bouclier. En prenant le bouclier vous faites tomber une rangée d'armes et d'objet metalliques dans un grand fracas. Alors que vous realisez l'erreur que vous venez de commettre vous entendez des bruits de pas au loin. Le temps presse et vous courrez vers la seule porte au fond de la salle";
            this.html += this.text;
        },
        salle2(){
            this.html = "Alors que la porte se referme derriere vous, vous entendez un ricanement à votre gauche : Jamais tu ne sortiras d'ici. Du coin de l'oeil vous comprenez que la forme aux oreilles pointues et à la peau verte est un gobelin. En reculant d'un pas vous vous mettez face à la creature qui lance sa dague d'une main à l'autre. ";
            // this.html += this.text;
            this.lancerCombat();        
        },
        salle3(){
            this.html = "A peine la creature lâcha son dernier soupir que vous entendez d'autres de ses congénaires dont les pas résonnent dans les murs. Vous parcourez la piece à la recherche d'une sortie et l'espace d'un instant vous retournez vers là où vous est apparue la créature. Un petit passage semble se dessiner dans le coin où se tenait le gobelin. Alors que vous vous précépitez dans le passage de la porte vous manquez de vous tomber dans l'escalier étroit qui semble descendre.";
            this.html += this.text;
        },
        salle4(){
            this.html = "vous trébuchez et vous retrouvez à terre à l'entrée d'une cave délabrée dont les odeurs de moisissures vous donne la nausée. toutefois un couloir de l'autre côté de la piece. En evitant de glisser sur le sol humide vous parvenez à vous faufiler vers ce qui semble être l'entrée d'un couloir.";
            this.html += this.text;
        },
        salle5(){
            this.html = "Vous vous engouffrez dans le couloir qui ouvre vers un dédale où l'odeur de pourriture se fait inssuportable. Alors même que vous décidez de revenir sur vos pas, vous entendez un cliqueti irrégulier venir de derriere vous. Au bout de quelques instant il vous semble dicerner des bandelettes flottantes. Vous realisez qu'il s'agit d'ossements animés par une force inconnue. Des ossements tranchants recouvrent la créature qui se dirige déjà vers vous.";
            this.html += this.text;
            this.lancerCombat();        
        },
        salle6(){
            this.html = "Les ossements retombés au sol semblent avoir été libérés du sort qui les maintenait animés. Reprenant votre chemin, vous realisez que vous êtes grievement blessez. La paroi se fait terreuse et le sol inégal. Votre vue se trouble à mesure que vos pas se font difficiles. Une lumière devant vous semble représentez votre dernier espoir de survivre.";
            this.html += this.text;
        },
        salle7(){
            this.html = "La lumière n'était pas un délire, elle semble venir d'une caverne au bout du dédalle. Au moment où vous y entrez vous voyez un être décharné mais dont les yeux brillent dans la lumiere des torches et qui se retourne désormais sur vous. Ses mains commencent à crépiter d'une énergie étrangement violette et bleu ";
            this.html += this.text;
            this.lancerCombat();        
        },
        salle8(){
            this.html = "Malgré votre acharnement vous finissez par lâcher votre arme qui tombe à vos pied. Vous tombez à votre tour, vos dernières forces vous quittes. Votre vue se trouble et les sons se font de plus en plus lointains. Mais quelques instants plus tard , la créature murmure quelque chose à votre oreille. Sans en avoir conscience, le regard vide, vous vous relevez tandis que la chose retourne à ses occupations. La créatures semble vous avoir dès lors accueilli à son service pour le reste de votre éternité...";
            this.html += this.text;
        }
    },
    
    mounted() {
        this.passerSalle();
    }
});
app.mount('#app');

