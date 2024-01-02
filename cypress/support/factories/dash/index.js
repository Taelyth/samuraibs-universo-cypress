import _ from 'underscore'

exports.customer = {
	name: 'Phoenix Wright',
	email: 'phoenix@teste.com',
	password: 'pwd123',
	is_provider: false
}

exports.provider = {
	name: 'Gale Baldur',
	email: 'gale@teste.com',
	password: 'pwd123',
	is_provider: true
}

exports.appointment = {
	//hour: _.sample['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'] //sample - escolhe um valor aletaório dentro de um array
	hour: '17:00'
}
