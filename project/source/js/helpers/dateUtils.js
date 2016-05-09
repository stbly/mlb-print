export function formatDate (date) {
	console.log(date.getDate())
	var day = addZeros(date.getDate().toString(), 2),
		month = addZeros((date.getMonth()+1).toString(), 2),
		year = date.getFullYear().toString()
	console.log(day, month, year)
	var formattedDate = year + month + day
	console.log(formattedDate)
	return formattedDate
}

function addZeros(string, number) {
	if(string.length < number) {
		while (string.length < number) {
			string = '0' + string
		}
	}
	return string;
}