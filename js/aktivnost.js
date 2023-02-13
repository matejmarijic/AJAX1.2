// spremamo vrijednosti iz polja db u memoriju browsera
window.addEventListener('beforeunload',perzistiraj);

let tijeloTablice=document.querySelector("#table-body");
////////////////AJAX funkcije ////////////
// funkcija za dohvat podataka sa Web servera
function dohvatiPodatkeZaTablicuSaAjaxom(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload= function (){
        //callback funkcija
        db =JSON.parse(this.responseText);
        db.forEach ( x => x.datum = parsirajDatumCrtica(x.datum).toLocaleDateString() );
        popuniTablicu();
    }
    xhttp.open("GET","korisnici.php");
    xhttp.send();  
}

dohvatiPodatkeZaTablicuSaAjaxom();

// funkcija za brisanje podataka sa Web servera
function obrisiIzBazeSaAjaxom(paramID){
    const xhttp = new XMLHttpRequest();
    xhttp.onload= function (){
        //callback funkcija
        popuniTablicu();
    }
    xhttp.open("POST","korisnici_delete.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id="+paramID);  
}

// funkcija za slanje zahtjeva za dodavanje sloga 
function dodajNoviUBazuSaAjaxom(param){
    const xhttp = new XMLHttpRequest();
    xhttp.onload= function (){
        dohvatiPodatkeZaTablicuSaAjaxom();//poziva drugu ajax funkciju za dohvat podatka iz baze
    }
    xhttp.open("POST","korisnici_dodaj.php");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(param));  
}
// funkcija za slanje zahtjeva za izmjenu sloga 
function izmjeniUBaziSaAjaxom(param){
    const xhttp = new XMLHttpRequest();
    xhttp.onload= function (){
        dohvatiPodatkeZaTablicuSaAjaxom();//poziva drugu ajax funkciju za dohvat podatka iz baze
    }
    xhttp.open("POST","korisnici_izmjeni.php");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(param));  
}

/////////////////

function popuniTablicu(){
    let tekstTijelaTablice='';
    for(let brojac = 0 ; brojac< db.length; brojac++){
        const redak=db[brojac];
        tekstTijelaTablice = tekstTijelaTablice + `<tr>
            <td>${redak.id}</td> 
            <td>${redak.naziv}</td> 
            <td>${redak.email}</td> 
            <td>${redak.zanimanje}</td> 
            <td>${redak.drzava}</td> 
            <td>${redak.datum}</td> 
            <td><button data-id="${ redak.id }" class="edit-btn btn btn-sm btn-warning form-control"> Izmjeni </button></td>
            <td><button data-id2="${ redak.id }" class="delete-btn btn btn-sm btn-danger form-control"> Obriši </button></td>
            </tr> `; 
    }
    tijeloTablice.innerHTML=tekstTijelaTablice;
    
    let gumbiZaIzmjenu= document.querySelectorAll(".edit-btn");
    console.log('broj gumba za izmjenu:'+ gumbiZaIzmjenu.length);
    for(let x=0; x < gumbiZaIzmjenu.length; x++){
        const g=gumbiZaIzmjenu[x];    
        g.addEventListener('click', dohvatiPodatak);
    }

    let gumbiZaBrisnje= document.querySelectorAll(".delete-btn");
    console.log('broj gumba za brisanje:'+ gumbiZaBrisnje.length);
    for(let x=0; x < gumbiZaBrisnje.length; x++){
        const g=gumbiZaBrisnje[x];    
        // g.addEventListener('click', ukloniPodatak);
        g.addEventListener('click', ukloniPodatakSaNovomPotvrdom);
    }
}

//pozivam funkciju
popuniTablicu();

let idN ;
let odabraniSlog;
let vrstaAkcije;

// dohvaćamo objekt za ciljani ID
function dohvatiElementPremaIdu( paramID){
    const x = db.filter( el => el.id==paramID);
    return x[0];
}
// dohvaćamo index elementa iz baze za ciljani ID retka
function dohvatiIndexUbazi( paramID){    
    for(let x=0; x<=db.length; x++){
        if(db[x].id == paramID){
            return x;
        }
    }
}

// uklanjanje objekta iz polja kao baze  - 'stari' koji koristi ugrađeni potvrdni alert
function ukloniPodatak(){   
    idN = this.getAttribute('data-id2');
    // let odabraniSlog=db[idN];
    let odabraniSlog=dohvatiElementPremaIdu(idN);
    let upitZaPotvrdu=`Želite li ukloniti korisnika: ${odabraniSlog.naziv} ?`;
   
    if(mojaPotvrdaNamjere(upitZaPotvrdu)){ 
        idN = dohvatiIndexUbazi (odabraniSlog.id);
        db.splice(idN,1);
        popuniTablicu();
    }
}
function izvrsiAkciju(){
    if(vrstaAkcije=='Izmjeni'){
        spremiIzmjenu();
        vrstaAkcije='';
    }
    if(vrstaAkcije=='Briši'){  
        obrisiIzBazeSaAjaxom(idN) ; //ovo je ID zapisa   
        idN = dohvatiIndexUbazi (idN); //ovdje se prema id-u dohvća index pozicije u db polju
        db.splice(idN,1);
        vrstaAkcije='';
        
    }     
    pretrazi(); 

    let viewModalnogDialoga=document.querySelector(".modal");
    viewModalnogDialoga.style.display='none';
}

/* funkcija za fency modalni prozor */
function ukloniPodatakSaNovomPotvrdom(){
    vrstaAkcije="Briši" ;
    idN = this.getAttribute('data-id2');
    // let odabraniSlog=db[idN];
    let odabraniSlog=dohvatiElementPremaIdu(idN);
    let upitZaPotvrdu=`Želite li ukloniti korisnika: ${odabraniSlog.naziv} ?`;
  
    let naslovDialoga=document.querySelector(".modal-title");
    naslovDialoga.innerHTML= "Brisanje Korisnika !";
    let porukaDialoga=document.querySelector("#tekstZaModalniProzor");    
    porukaDialoga.innerHTML = upitZaPotvrdu;

    let spremiModalnogDialoga=document.querySelector("#modalSpremiButton");
    let brisiModalnogDialoga=document.querySelector("#modalUkloniButton");
    spremiModalnogDialoga.style.display='none';
    brisiModalnogDialoga.style.display='block';

    let viewModalnogDialoga=document.querySelector(".modal");
    viewModalnogDialoga.style.display='block';
}

/* funkcija za fency modalni prozor */
function izmjeniPodatakSaNovomPotvrdom(){
    vrstaAkcije="Izmjeni" ;
   let upitZaPotvrdu=`Želite li Izmjeni podatke za korisnika: ${odabraniSlog.naziv} ?`;

    let naslovDialoga=document.querySelector(".modal-title");
    naslovDialoga.innerHTML= "Izmjena postojećeg Korisnika !";
    let porukaDialoga=document.querySelector("#tekstZaModalniProzor");    
    porukaDialoga.innerHTML = upitZaPotvrdu;

    let spremiModalnogDialoga=document.querySelector("#modalSpremiButton");
    let brisiModalnogDialoga=document.querySelector("#modalUkloniButton");
    spremiModalnogDialoga.style.display='block';
    brisiModalnogDialoga.style.display='none';

    let viewModalnogDialoga=document.querySelector(".modal");
    viewModalnogDialoga.style.display='block';
}

/* funkcija za modalni prozor */
function sakrijModalniDialog(){
    let potvrdivPotvrda=document.querySelector(".modal");
    potvrdivPotvrda.style.display='none';
    vrstaAkcije='';
}


let spremiIzmjenuBtn = document.querySelector('#edit');
let eidI = document.querySelector('.eid');
let enazivI  =document.querySelector('.eNaziv');
let emailI   =document.querySelector('.eMail');
let edrzavaI =document.querySelector('.eDrzava');
let ezanimanjeI  =document.querySelector('.eZanimanje');
let edatumI  =document.querySelector('.eDatum');

function dohvatiPodatak(){            
        idN = this.getAttribute('data-id');
        odabraniSlog=dohvatiElementPremaIdu(idN);
        eidI.value=     odabraniSlog.id;
        enazivI.value=  odabraniSlog.naziv;
        emailI.value=   odabraniSlog.email;
        // edrzavaI.value= odabraniSlog.drzava;

        if (zemlje.length == 0){
            //upit prema serveru ide isključivo ako je prazno polje!
            ucitajDrzaveSaServera(
                document.querySelector("#eDrzava") ,//referenca na lookup listu u formi
                odabraniSlog.drzava); //odobrana država odabranog unosa
        } 
        popuniLookupListu(document.querySelector("#eDrzava") ,
                odabraniSlog.drzava);

        ezanimanjeI.value=odabraniSlog.zanimanje;
        edatumI.value=odabraniSlog.datum;

        // skrivanje ili prikazivanje komponenti na fronti (sučelju stranice)
        editKorisniciView.style.display= "block";
        addKorisniciView.style.display= "none";
        korisniciView.style.display= "none";
        
        // let edatumI  =document.querySelector('.eDatum');

        flatpickr(edatumI, parametriZaOblikDatuma);
}

let editKorisniciView = document.querySelector("#edit-korisnik-view");

function mojaPotvrdaNamjere(upitnik){
    return confirm(upitnik, 'Želim', 'Odustani');
}

spremiIzmjenuBtn.addEventListener('click',izmjeniPodatakSaNovomPotvrdom );

function spremiIzmjenu(){
  
    const novi={
        id: eidI.value,
        naziv:  enazivI.value,
        email:   emailI.value,
        drzava: edrzavaI.value,
        zanimanje:  ezanimanjeI.value,
        datum:  edatumI.value
    }
    idN=dohvatiIndexUbazi(odabraniSlog.id);
    db[idN]=novi;
    izmjeniUBaziSaAjaxom(novi);  
    eidI.value='';
    enazivI.value='';
    emailI.value='';
    edrzavaI.value='';
    ezanimanjeI.value='';
    edatumI.value='';

    editKorisniciView.style.display= "none";
    addKorisniciView.style.display= "none";
    korisniciView.style.display= "block";
    pretrazi(); //jer iz pretraži , također pozivamo popuniTablicu
    
}

let addKorisniciView = document.querySelector("#add-korisnik-view");
let korisniciView = document.querySelector("#korisnici-view");

let addKorisniciViewGumb= document.querySelector('[href="add-korisnik-view"]');
let korisniciViewGumb= document.querySelector('[href="korisnici-view"]');

let filterViewGumb= document.querySelector('[href="filter-view"]');
let filterView = document.querySelector("#filter-view");

addKorisniciViewGumb.addEventListener('click', function(e){
    e.preventDefault();
    addKorisniciView.style.display= "block";
    korisniciView.style.display= "none";
    
    if (zemlje.length == 0){
        let domElement=document.querySelector("#iDrzava");
        ucitajDrzaveSaServera( domElement );
    }     
    popuniLookupListu(document.querySelector("#iDrzava"));
    flatpickr(datumI, parametriZaOblikDatuma);    
});

//poziv prema serveru
function ucitajDrzaveSaServera(domElement,odabraniSelect){
    const xhttp = new XMLHttpRequest();
    xhttp.onload= function (){
        //callback funkcija
        zemlje =JSON.parse(this.responseText);
        popuniLookupListu(domElement,odabraniSelect);
    }
    xhttp.open("GET","drzave.php");
    xhttp.send();    
}
// osviježavanje liste po zahtjevu
function popuniLookupListu(domLista,postavljenaStavka){
    let temp;
    let korak1=zemlje.map(d => d.naziv);
    if(postavljenaStavka === undefined){
        temp = temp + `<option value="0">Odaberi državu...</option>`;
        korak1.forEach( d =>{
            temp = temp + `<option value="${d}">${d}</option>`;
        });  
        domLista.innerHTML=temp;
    }else{
        korak1.forEach( d =>{
            if(d == postavljenaStavka ){
                temp = temp + `<option value="${d}" selected>${d}</option>`;
            }else{
                temp = temp + `<option value="${d}">${d}</option>`;
            }         
        });  
        domLista.innerHTML = temp;
    }
    return temp;
}


korisniciViewGumb.addEventListener('click', function(e){
    e.preventDefault();
    korisniciView.style.display= "block";
    addKorisniciView.style.display= "none";
    editKorisniciView.style.display= "none";
});


filterViewGumb.addEventListener('click', function(e){
    e.preventDefault();
    if(filterView.style.display == "block"){
        filterView.style.display = 'none';
        filterViewGumb.innerHTML = 'Otkrij filter';
    }else{
        filterView.style.display = 'block';
        filterViewGumb.innerHTML = 'Sakrij filter';
    };
    ocistiPretragu();
});


let saveBtn = document.querySelector("#save");
let idI =document.querySelector('[placeholder="id"]');
let nazivI  =document.querySelector('[placeholder="Naziv"]');
let mailI   =document.querySelector('[placeholder="Mail"]');
// let drzavaI =document.querySelector('[placeholder="Drzava"]');
let drzavaI = document.querySelector("#iDrzava");
let zanimanjeI  =document.querySelector('[placeholder="Zanimanje"]');
let datumI  =document.querySelector('[placeholder="Datum"]');

saveBtn.addEventListener('click', spremiNoviPodatak);

function spremiNoviPodatak(){
    const novi={
        id: idI.value,
        naziv:  nazivI.value,
        email:   mailI.value,
        drzava: drzavaI.value,
        zanimanje:  zanimanjeI.value,
        datum:  datumI.value
    }
    db.push(novi);
    dodajNoviUBazuSaAjaxom(novi);
    pretrazi();  
    idI.value='';
    nazivI.value='';
    mailI.value='';
    drzavaI.value='';
    zanimanjeI.value='';
    datumI.value='';

    korisniciView.style.display= "block";
    addKorisniciView.style.display= "none";
    editKorisniciView.style.display= "none";
}


function perzistiraj(){
    localStorage.db1=JSON.stringify(db);
} 


let textPretrage = document.querySelector('[placeholder="pojam za pretragu"]');
let searchGumb = document.querySelector('#search');
searchGumb.addEventListener("click",pretrazi);

function pretrazi(){
    
   const p=textPretrage.value;
   let regTest = new RegExp(p,'i');
   const p2 = db.filter( x => {
        return ( 
            regTest.test(x.naziv)
            || regTest.test(x.email)
            || regTest.test(x.drzava)
            || regTest.test(x.zanimanje)
        );
   });

//    console.log(db);
   let db2 = db;
   db = p2;
//    console.log(db);
   popuniTablicu();
   db = db2;
//    console.log(db);
}


let gumbXsearch=document.querySelector('.btn-outline-secondary');
gumbXsearch.addEventListener('click', ocistiPretragu);

function ocistiPretragu(){
    textPretrage.value='';
    popuniTablicu();
}

////---------------sortiranje -----------
let atributi=['id','naziv','email','zanimanje','drzava','datum'];
let indexPolja=0;

const zglavlje = document.querySelector('thead');
const kolone=zglavlje.querySelectorAll('td');
kolone.forEach(x =>{
    x.id=atributi[indexPolja];
    indexPolja++;   
    if (indexPolja <= atributi.length){
        x.addEventListener('click',function(){
            sortirajKolonu(x.id);
        });
    }
});

function sortirajKolonu(p){
    if(p =='id'){
        // alert(p);
        db.sort( function(a, b){
            return smjer * (a.id - b.id);
        });        
    } else if(p=='datum'){
        db.sort(function(a,b){
            let x = parsirajDatum(a.datum);
            let y = parsirajDatum(b.datum);
            if(x>y) return smjer * 1;
            if(y>x) return smjer * -1;
            return 0;
        });

    }else {
        db.sort(function(a,b){
            let x = a[p].toLowerCase();
            let y = b[p].toLowerCase();
            if(x>y) return smjer * 1;
            if(y>x) return smjer * -1;
            return 0;
        });
       
    }  
    pretrazi();  
    promjeniSmjer();
}

let smjer = 1;

function promjeniSmjer(){
    smjer = smjer * -1
}

function parsirajDatum(paramDatum){
    let poljeBrojevi = paramDatum.split('.');
    poljeBrojevi=poljeBrojevi.map(s => parseInt(s));
    poljeBrojevi[0];//dan
    poljeBrojevi[1]=poljeBrojevi[1] - 1 ; //mjesec
    poljeBrojevi[2];//godina    
    // let datum = new Date(poljeBrojevi[2] ,poljeBrojevi[1] ,poljeBrojevi[0] );
    let temp= [poljeBrojevi[2], poljeBrojevi[1],poljeBrojevi[0]]; 
    let datum = new Date(...temp );//spread operator
    return datum;
}
function parsirajDatumCrtica(paramDatum){
    let poljeBrojevi = paramDatum.split('-'); ///ovo je razlika i mogla se proslijediti kao parametar već postojeće funkcije
    poljeBrojevi=poljeBrojevi.map(s => parseInt(s));
    poljeBrojevi[2];//dan
    poljeBrojevi[1]=poljeBrojevi[1] - 1 ; //mjesec
    poljeBrojevi[0];//godina    
    // let datum = new Date(poljeBrojevi[2] ,poljeBrojevi[1] ,poljeBrojevi[0] );
    let temp= [poljeBrojevi[0], poljeBrojevi[1],poljeBrojevi[2]]; 
    let datum = new Date(...temp );//spread operator
    return datum;
}

