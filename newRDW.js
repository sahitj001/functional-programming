const data = require('./v2.json')
//console.log(data)

const garageData = []

//retrieving garage data from id
const garageId = data.ParkingFacilities.map(getId)

const getGarage = garageId.map(retrieveGarageData)
console.log(getGarage)

// const garages = getGarage(garageId)
// // console.log(garages)

// function getGarage(id){
// 	const currentId = id.forEach(element => {
// 		const entry = require('./dummyData/' + element + '.json')
// 		console.log(entry)
// 		garageData.push(entry)
// 	})
// 	console.log(currentId)
// }


function retrieveGarageData (data){
	const entry = require('./dummyData/' + data + '.json')
	return entry
}

function getId(data) {
	return data.identifier
}
