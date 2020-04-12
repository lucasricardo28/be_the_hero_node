const connection = require('../database/connection');
const DATABASE = 'incidents';

module.exports = {
	async store(request, response){
		const {title, description, value} = request.body
		const ong_id = request.headers.authorization;

		let [id] = await connection(DATABASE).insert({
			title, description, value, ong_id
		});

		return response.json({id})
	},
	async index(request,response){
		let { page = 1 } = request.query;

		let [count] = await connection(DATABASE).count();
		let incidents = await connection(DATABASE)
			.join('ongs','ongs.id','=','incidents.ong_id')
			.limit(5)
			.offset((page - 1) * 5)
			.select(['incidents.*','ongs.name','ongs.phone','ongs.email','ongs.city','ongs.uf']);

		response.header('X-Total-Count', count['count(*)']);
		return response.json(incidents);
	},
	async delete(request, response){
		let { id } = request.params;
		const ong_id = request.headers.authorization;

		const incident = await connection(DATABASE).select('ong_id').where('id',id).first();

		if(incident.ong_id != ong_id){
			return response.status(401).json({error: "Operação não permitida"})
		}

		await connection(DATABASE).where('id',id).delete();

		return response.status(204).send();
	}
}