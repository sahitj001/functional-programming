const data = require('./v2.json')
const fs = require('fs')


//retrieving garage data from id
const garageId = data.ParkingFacilities.map(getId)


const garages = garageId
.map(retrieveGarageData) //get all garages with the unique ID
.filter(getCapacity) //check which keys contain garage values
.filter(getProvince) //check which keys that contain garages also contain a province
.map(mapData)	//after checking for any wrong objects, we will map only the data we need

checkDash(garages) //there was one province that wasn't written with a dash (-) inbetween the names -- Noord Brabant. so i had to fix that
console.log(garages.length)


convertJSON(garages)

function convertJSON(data){
	const convert = JSON.stringify(data)
	fs.writeFile('garages.json', convert, () => {
		console.log('saved')
	})
}


// sanity check if everything is correct
// for (let i = 0; i < garages.length; i++) {
// 	console.log(garages[i].parkingFacilityInformation.specifications[0].capacity)
// }


function getCapacity(data){
	const check = data.parkingFacilityInformation.hasOwnProperty('specifications')

	if (check) {
		if (data.parkingFacilityInformation.specifications[0] === null) {
			//do nothing
		} else if (data.parkingFacilityInformation.specifications[0].hasOwnProperty('capacity') == true) {
			// console.log('it works')
			const getCapacity = data.parkingFacilityInformation.specifications[0].capacity
			return getCapacity
		}
	}
}

function getProvince(data) {
		const checkAp = data.parkingFacilityInformation.hasOwnProperty('accessPoints')

	if (checkAp) {
		if (data.parkingFacilityInformation.operator.administrativeAddresses === undefined || data.parkingFacilityInformation.operator.administrativeAddresses[0] === null) {
			//do nothing
		} else {
			// console.log('found it')
			const getProv = data.parkingFacilityInformation.operator.administrativeAddresses[0].province
			return getProv
		}
	}
}

function mapData(data){
	return {
		name:data.parkingFacilityInformation.name,
		id: data.parkingFacilityInformation.identifier,
		province: data.parkingFacilityInformation.operator.administrativeAddresses[0].province,
		capacity: data.parkingFacilityInformation.specifications[0].capacity
	}
}

function retrieveGarageData (data){
	const entry = require('./dummyData/' + data + '.json')
	return entry
}

function getId(data) {
	return data.identifier
}

function checkDash(data){
	for (let i = 0; i < data.length; i++) {
		if(data[i].province == 'Noord Brabant'){
			data.splice(i, 1)
		}
	}
}


