// let data = require('./dv-survey.json');
console.log('hello');
// console.log(data);

const survey = data;

// console.log(survey);
let ogen = [];
let column = "oogKleur";

for (answer of survey){
    ogen.push(answer[column]);
}

console.log(ogen[0]);

for (let i = 0; i < ogen.length; i++) {
    let checkElement = ogen[i].startsWith('#');
    console.log (checkElement);
    // let check = checkElement.startsWith('#');

    if (checkElement){
        console.log("hashtag is there");
    } else {    
        let fix = '#' + ogen[i];
        console.log("fixed version: ", fix);
        
    }
    
}
// for (let i = 0; i < survey.length; i++) {

//     let columnName = "oogKleur";
//     let eyeColor = survey[i];
//     let color = eyeColor.oogKleur;
//     console.log(color);

//     ogen.push(i["oogKleur"]);

//     console.log('aantal ogen', ogen);

    // let check = color.startsWith('#');

    // if(check){
    //     console.log('hashtag is there')
    // } else {
    //     let hashtag = '#';
    //     let fix = hashtag.concat(color[i]);
    //     console.log('fixed: ', fix);
    // }
//   }

// data.forEach(Element => console.log(Element.oogKleur));

