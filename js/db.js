let db=[];
if(localStorage.db){
    db=JSON.parse(localStorage.db);
 }

 let parametriZaOblikDatuma = {
    dateFormat : "d.m.Y",
    maxDate: "31.12.2024",
    minDate: "01.01.2000",
    locale : "hr"
}

 let zemlje=['Hrvatska','Slovenija','Mađarska','Srbija','Brazil','Njemačka'];
// db=[
//     {
//      id:1,
//      naziv:"Mirko",
//      email:"mirko@mail",
//      zanimanje:"bravar",
//      drzava:"Portugal",
//      datum:"19.11.1923"  
//     },
//     {
//      id:2,
//      naziv:"Marko",
//      email:"marko@mail",
//      zanimanje:"tenisač",
//      drzava:"Austrija",
//      datum:"20.12.2022"  
//     },
//     {
//      id:1,
    //  naziv:"Darko",
    //  email:"darko@mail",
    //  zanimanje:"stolar",
    //  drzava:"Portugal",
    //  datum:"09.01.2023"  
//     },
//     {
//      id:2,
//      naziv:"Ana",
//      email:"anao@mail",
//      zanimanje:"Referent",
//      drzava:"Njemačka",
//      datum:"20.07.2022"  
//     }
// ];