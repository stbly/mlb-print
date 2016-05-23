export function removeSpaces (str) {
	str.replace(/\s+/g, '');
}


export function getTeamName (firstName, lastName) {
	var name = firstName;
	switch (firstName) {
		case 'Los Angeles':
			if (lastName) {
				name = lastName.toLowerCase() === 'angels' ? 'LA Angels' : 'LA Dodgers'
			} else {
				name = 'LA Angels';
			}
			break
		case 'San Francisco':
			name = 'SF Giants'
			break
	}
	return name;
}

