import User from '../models/user.model';
import _ from 'lodash';
// import errorHandler from './error.controller';

const create = (req, res, next) =>{
  const user = new User(req.body)
  user.save((err, result) =>{
    if(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: 'Successfully signed up'
    })
  })
}

const list = (req, res) =>{
  User.find((err, users) =>{
    if(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(users)
  }).select('name email updated created')
}

const userByID = (req, res, next, id) =>{
  User.findById(id).exec((err, user) =>{
    if(err || !user)
      return res.status('400').json({
        error: "User not found"
      })
      res.profile = user
      next()
  })
}

const read = (req, res) =>{
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const update = (req, res, next) =>{
  let user = req.profile
  user = _.exten(user, req.body)
  user.updated = Date.now()
  user.save((err) =>{
    if(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  })
}

const remove = (req, res, next) =>{
  let user = req.profile
  user.remove((err, deleteUser) =>{
    if(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deleteUser.hashed_password = undefined
    deleteUser.salt = undefined
    res.json(deleteUser)
  })
}

export default {create, userByID, read, list, remove, update}
