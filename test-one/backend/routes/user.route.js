const express = require('express');
const userRoute = express.Router();

let UserModel = require('../models/User');

userRoute.route('/').get((req, res, next) => {
    UserModel.find((error, data) => {
        if (error) {
            return next(error);
        } else{
            res.json(data);
        }
    })
})

userRoute.route('/store').post((req, res, next) => {
    UserModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else{
            res.json(data);
        }
    })
})

userRoute.route('/edit/:modelId').get((req, res, next) => {
    UserModel.findById(req.params.modelId, (error, data) => {
        if (error) {
            return next(error);
        } else{
            res.json(data);
        }
    })
})

userRoute.route('/update/:modelId').put((req, res, next) => {
    UserModel.findByIdAndUpdate(req.params.modelId,{
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else{
            res.json(data);
            console.log('Success Update')
        }
    })
})

userRoute.route('/delete/:id').delete((req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else{
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = userRoute;