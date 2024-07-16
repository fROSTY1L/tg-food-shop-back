const uuid = require('uuid')
const path = require('path')
const { Dish, DishInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class dishController {
    async create(req, res, next){
        try{
            const {name, price, dishTypeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    DishInfo.create({
                        title: i.title,
                        description: i.description,
                        dishId: dish.id
                    })
                )
            }
            const dish = await Dish.create({name, price, dishTypeId, img: fileName})
    
            return res.json(dish)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res){
        let {dishTypeId, limit, page} = req.query
        limit = limit || 6
        page = page || 1
        let offset = page * limit - limit 
        let dishes
        if (!dishTypeId) {
            dishes = await Dish.findAll({limit, offset, attributes: ['id', 'name', 'price', 'img']})
        }
        else {
            dishes = await Dish.findAll({where: {dishTypeId}, limit, offset})
        }
        return res.json({dishes})

    }

    async getOne(res, req) {
        const {id} = req.params
        const dish = await Dish.findOne(
            {
                where: {id},
                include: [{model: DishInfo, as: 'info'}]
            }
        )
        return res.json(dish)

    }

    async deleteOne(req, res, next){
        try{
            const {id} = req.params
            const deleted = await Dish.findOne({id})
            if (deleted) {
                deleted.destroy()
                return res.json({ message: 'Блюдо удалено' });
            } else {
                return res.json({ message: 'Блюдо не найдено' });
            }
        } catch(e){
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new dishController()