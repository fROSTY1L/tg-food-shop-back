const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJWT = (id, tgId, role) => {
    return jwt.sign(
        {id, tgId, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {id, tgId, role} = req.body
        
        const user = await User.create({id, tgId, role})
        const basket = await Basket.create({userId: user.id})
        const token = generateJWT(user.id, user.tgId, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {tgId} = req.body
        const user = await User.findOne({where: {tgId}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const token = generateJWT(user.id, user.tgId, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.tgId, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController() 