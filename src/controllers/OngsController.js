const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
	async store(request, response){
		const { name, email, phone, city, uf } = request.body;
		const id = crypto.randomBytes(4).toString('HEX');
		
		await connection('ongs').insert({id, name, email, phone, city, uf })

		return response.json({ id });
	},
	async index(request, response){
		let ongs = await connection('ongs').select('*');
		return response.json(ongs);
	},
	async edit(request, response){	
		let { id } = request.params;
		let ong = await connection('ongs').select('*').where('id',id);
		return response.json(ong);
	},
	async getAllIncidentsByOng(request, response){
		let ong_id = request.headers.authorization;
		let incidents = await connection('incidents').where('ong_id',ong_id).select('*');
		return response.json(incidents);
	}
}