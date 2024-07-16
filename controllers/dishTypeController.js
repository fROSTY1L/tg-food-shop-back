const { DishType } = require('../models/models')
const ApiError = require('../error/ApiError')

class dishTypeController {

    async deleteOne(req, res, next){
        try{
            const {id} = req.params
            const deleted = await DishType.findOne({id})
            if (deleted) {
                deleted.destroy()
                return res.json({ message: 'Тип блюда удален' });
            } else {
                return res.json({ message: 'Тип блюда не найден' });
            }
        } catch(e){
            next(ApiError.badRequest(e.message));
        }
    }
        

    async createNew(req, res){
        const {name} = req.body
        const dishType = await DishType.create({name}) 
        return res.json(dishType)
    }

    async getAll(req, res) {
        try {
            const dishTypes = await DishType.findAll({
                attributes: ['id', 'name']
            });
            return res.json({ dishTypes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Произошла ошибка при получении видов блюд' });
        }
    }
    
   
}

module.exports = new dishTypeController()