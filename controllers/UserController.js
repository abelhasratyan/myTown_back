const Users = require('../models/UserModel')
const Album = require('../models/AlbumModel')
const Valid = require('../helpers/validation')
const Friends = require('../models/frinedsModel')
const Posts = require('../models/PostModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const helper = require('../constants/helper')
const transporter = require('../lib/mailer').transporter

exports.login = (req, res, next) => {
    const email = req.body.email.trim()
    const userData = {
        email: email,
        password: req.body.password
    }
    
    Users.findOne({
        email: email
    }).then(user => {
        if (user.role === 'ADMIN') {
            res.json({
                success: false,
                message: "Such USER does not exist"
            })
        } else if (!user) {
            const error = new Error("email is uncorrect")
            error.status = 400
            next(error)
        } else {
            bcrypt.compare(userData.password, user.password, (err, hash) => {
                if (hash) {
                    let token = jwt.sign({
                        id: user._id,
                        email: user.email
                    }, "SuperSecRetKey", {
                            expiresIn: '365d' // expires in 1 year
                        });
                    res.json({
                        status: "success",
                        user,
                        token: token
                    })
                } else {
                    const error = new Error("password is wrong")
                    error.msg = "password is wrong"
                    error.status = 401
                    next(error)
                }
            })
        }
    }).catch(err => {
        const error = new Error(err)
        error.message = 'Such Admin doesn\'t exist'
        error.success = false
        next(error)
    })
}

exports.registration = (req, res, next) => {
    
    const validation = Valid.userValidation(req.body)
    if (!validation.validationType) {
        // next(new Error(validation.messages));
        res.status(400).json({ type: "error", messages: validation.messages })
        return;
    }

    const userData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        country: req.body.country,
        city: req.body.city,
    }
    Users.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            res.json({
                error: `${user.role} already exist:`
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (req.body.password === req.body.c_password) {
                    userData.password = hash;
                    Users.create(userData)
                        .then(user => {
                            let token = jwt.sign({
                                id: user._id,
                                email: user.email
                            }, "SuperSecRetKey", {
                                    expiresIn: '365d' // expires in 1 year
                            });
                            res.json({
                                success: true,
                                user,
                                token: token
                            })
                            Album.create([
                                {
                                    title: "Cover",
                                    user: user._id
                                },
                                {
                                    title: "Profile",
                                    user: user._id
                                }
                            ])
                            Friends.create({
                                user: user._id
                            })
                            Posts.create({
                                userId: user._id
                            })
                        })
                        .catch(err => {
                            res.json({ error: err, msg: "error" })
                        })
                } else {
                    res.json({
                        error: 'Confirm Password don\'t like Password'
                    })
                }

            })
        }
            
    }).catch(err => {
        const error = new Error()
        error.message = err
        next(error)
    })
}

exports.validateUser = (req, res, next) => {
    const emailFromReq = req.body.email;
    
    Users.findOne({email: emailFromReq})
    .then(result => {
        if (result) {
            helper.RandNumber = Math.floor(100000 + Math.random() * 900000)
            const mailOptions = {
                from: `<${process.env.ADMIN_EMAIL}`, // sender address
                to: `${emailFromReq}`, // list of receivers
                subject: 'Hello', // Subject line
                html: `please enter this number in input field: <strong>${helper.RandNumber}</strong>`// plain text body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(400).json({
                        success: false,
                    })
                } else {
                    res.status(200).json({
                        success: true,
                    });
                }
                transporter.close()
            })
        } else {
            res.json({
                success: false
            })
        }
    })
    .catch(err => {
        console.log('err => ', err)
        const error = new Error(err)
        error.message = "Can't fine user with this email"
        error.success = false
        next(error) 
    })
}

exports.validateNumber = (req, res, next) => {
    const value = req.body.value
    const generateNumber = helper.RandNumber

    if(value.length !== 6 ) {
        res.json({
            success: false
        })
    } else {
        if (Number(value) != Number(generateNumber)) {
            res.json({
                success: false
            })
        } else {
            res.json({
                success: true
            })
        }
    }
}

exports.getUser = (req, res, next) => {
    if (!req.params.id) {
        Users.findOne({_id: req.user._id}).then(user => {
            if (user) {
                res.json({
                    user,
                    success: true
                })
            }
        }).catch(err => {
            next(new Error(err))
        })
    } else {
        Users.findOne({_id: req.params.id}).then(user => {
            if (user) {
                res.json({
                    user,
                    success: true
                })
            }
        }).catch(err => {
            next(err)
        })
    }
}

exports.userForgotPassword = (req, res, next) => {
    const newPassword = req.body.password
    const confirmPassword = req.body.c_password
    const userEmail = helper.userEmail
        
    Users.findOne({ email: userEmail })
    .then(user => {
        if (user) {
            if (newPassword == confirmPassword) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                   user.password = hash
                   user.save(err => {
                       next(err)
                   })
                   let token = jwt.sign({
                    id: user._id,
                    email: user.email
                }, "SuperSecRetKey", {
                        expiresIn: '365d' // expires in 1 year
                });
                helper.userEmail = ''
                helper.RandNumber = 0
                
                res.status(200).json({
                    success: true,
                    user,
                    token: token
                })
                
                })
            } else {
                return res.json({
                    success: false
                })
            }
        }
    }).catch(err => {
        next(err)
    })
}

exports.UpdateUserData = (req, res, next) => {
    console.log('log 1 in updateUserData')
    // if (req.body.password != req.body.c_password) {
    //     console.log('log 2 in updateUserData')
    //     res.json({
    //         success: false,
    //         msg: 'Confirm Password don\'t like Password'
    //     })
    // } else {
        console.log('log 3 in updateUserData')
        const newUserData = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            birthday: req.body.birthday,
            country: req.body.country,
            city: req.body.city,
            // password: req.body.password
        } 
        // console.log('NewUserData = >>>>>>', newUserData)
        // bcrypt.hash(newUserData.password, 10, (err, hash) => {
        //     if (!hash) {
        //         console.log('log 4 in updateUserData')
        //         next(err)
        //     } else { 
        //         console.log('log 5 in updateUserData')
        //         newUserData.password = hash
        //         console.log('newUserData.password before hashing', newUserData.password)
                Users.findOneAndUpdate({ _id: req.body.id}, {
                    $set: {
                            name: newUserData.name,
                            surname: newUserData.surname,
                            email: newUserData.email,
                            birthday: newUserData.birthday,
                            country: newUserData.country,
                            city: newUserData.city,
                            // password: newUserData.password
                        }
                }, { new: true })
                .then(result => {
                    console.log('log 7 in updateUserData')
                    if (!result) {
                        console.log('log 8 in updateUserData')
                        const error = new Error('cant find user')
                        error.msg = 'cant find user'
                        error.status = 404
                        next(error)
                    } else {
                        console.log('log 9 in updateUserData')
                        console.log('result ->>>>>', result)
                        let token = jwt.sign({
                            id: result._id,
                            email: result.email
                        }, "SuperSecRetKey", {
                                expiresIn: '365d' // expires in 1 year
                        });
                        console.log('log 10 in updateUserData')
                        res.json({
                            success: true,
                            user: result,
                            token
                        })
                    }
                })
                .catch(err => {
                    console.log('log 11 in updateUserData')
                    console.log('log in catch err =>>>', err)
                    next(err);
                })
            // }
        // })
    // }
}

exports.updateUserProfilePhoto = (req, res, next) => {
    console.log('req.file =>>>', req.file)
    console.log('req.body =>>>', req.body.userId)
    Users.findOneAndUpdate({_id: req.body.userId}, {
        $set: { avatar: `${process.env.SERVER_URL}/uploads/avatars/${req.file.filename}`}
    }, { new: true})
    .then(result => {
        if (!result) {
            console.log('case if result is null =>', result)
        } else {
            console.log('case if result is true =>', result)
        }
    })
    .catch(err => {
        next(err)
    })
}

