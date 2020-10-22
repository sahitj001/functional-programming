console.log('hello');

const survey = data;

let info = [];
let column = "oogKleur";

for (answer of survey){
    info.push(answer[column]);
}

console.log(info[0]);

for (let i = 0; i < info.length; i++) {
    let checkElement = info[i].startsWith('#');
    console.log (checkElement);

    if (checkElement){
        console.log("hashtag is there");
    } else {    
        let fix = '#' + info[i];
        console.log("fixed version: ", fix);
        
    }
    
}

