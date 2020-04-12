const connection = require('../database/connection');

module.exports = {
	async login(request,response){
		let { id } = request.body;

		let ong = await connection('ongs').where('id',id).select('name').first();

		if(!ong){
			return response.status(400).json({ error: "Ong not found" })
		}

		return response.json(ong);
	}
}