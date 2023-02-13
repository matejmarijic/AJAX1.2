// // jednostavno polje
// let zemlje=['Hrvatska','Slovenija','Mađarska','Srbija','Brazil'];

// for(let i=0;i<zemlje.length; i++){
//     console.error(zemlje[i]);
// }
// // console.log("================1");
// // for(let j=zemlje.length;j>0; j--){
// //     console.log(zemlje[i]); //polja.js:7  Uncaught ReferenceError: i is not defined
// // }
// console.log("================2");

// // scope ili doseg var i let tipa varijable
// for(var x=0;x<zemlje.length; x++){
//     console.warn(`zemlje[${x}] = ` + zemlje[x] );
// }
// console.log("================3");
// for(;x>0; x--){
//     console.log(`zemlje[${x}] = ` + zemlje[x] );
// }

// console.log("========== noviji oblik for petlje ==========");
// // Drugačiji oblik iteracije po elemengtima polja
// for(let x of zemlje){
//     console.log(x);
// }

// // postojeće funkcije za rad sa poljem
// zemlje.forEach( element => {
//     console.log('forEach funkcija:'+element);
// });
// // single line arrow fukcija
// zemlje.forEach(Element => console.log(' funkcija sa jednom linijom='+Element));
// const ljubimci = [
//     {
//         naziv : "Max",
//         vrsta : "pas"
//     } ,
//     {
//         naziv : "Keti",
//         vrsta : "papagaj"
//     } ,
//     {
//         naziv : "Miki",
//         vrsta : "pas"
//     } ,
//     {
//         naziv : "Tom",
//         vrsta : "maca"
//     } 
// ]

// // const polje2 = ljubimci.map( d => d.naziv = d.naziv.toLowerCase());
// // ljubimci.forEach(d => console.log(d.naziv) );
// // ljubimci.forEach(d => console.log(d));

// // console.log('==============filter ==============')
// // // const psi = ljubimci.filter(d => d.vrsta=='pas');
// // const psi = ljubimci.filter( function(d) {
// //         if (d.vrsta == 'pas') {
// //                 return true;
// //         } else {
// //             return false;
// //         }
// //     } );
// // psi.forEach(d => console.log(d));

// // console.log('==============filter i map ==============')

// ljubimci.filter( d => d.vrsta =='pas')
//         .map( x => x.naziv) 
//         .forEach( y => console.log(y));   

// // ljubimci[3]=null;

// console.log('==============splice ili brisanje elemnta iz polja ==============')
// console.log('==============prije: ==============')
// ljubimci.forEach( y => console.log(y));  
// console.log('==============isčupano: ==============')
// ljubimci.splice(1,1).forEach( y => console.log(y));  
// console.log('==============ostaje: ==============')
// ljubimci.forEach( y => console.log(y)); 
        
// console.log('==============primjena regularnog izraza: ==============')
// const patern= /m/i;
// const lj2=ljubimci.filter( p => patern.test(p.naziv));
// lj2.forEach(x => console.log(x));

// sortiranje elementa --------------------------------------
// let toggleDirection=11;

// let poljeBrojeva=[28, 34, 1, 4, 27, 36, 1000, 10, 100];
// poljeBrojeva.sort( function(a,b){
//     return toggleDirection*(a-b);
// });
// poljeBrojeva.forEach(x =>console.log(x));
// // >0  ili <0  ili 0

// let zemlje=['Hrvatska','Mašarska','Slovenija','Mađarska','Srbija','Brazil'];

// zemlje.sort(function(a,b){
//     let x = a.toLocaleLowerCase();
//     let y = b.toLocaleLowerCase();
//     if (x>y) return toggleDirection * 1;
//     if (y>x) return  toggleDirection * -1;
//     return 0;
// });

// zemlje.forEach(x=>console.log(x));

let datum = new Date();
console.log(datum);
/* Fri Jan 27 2023 20:11:03 GMT+0100 (srednjoeuropsko standardno vrijeme) */
console.log(datum.toString());
console.log(datum.toLocaleString());
console.log(datum.toLocaleDateString());
console.log(datum.toLocaleTimeString());
let kvaziDatum='31.12.2022';

// mjeseci idu od 0 do 11 , inače ih prebaci u iduću  godinu: 2022g + xx mj. + xxx .
let datum2 = new Date(2022,0,1);
console.log(datum2);
console.log(datum > datum2);
console.log(datum > kvaziDatum);
console.log( kvaziDatum > datum);


