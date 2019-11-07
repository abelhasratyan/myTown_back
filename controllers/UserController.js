const Users = require('../models/UserModel')
const Album = require('../models/AlbumModel')
const Valid = require('../helpers/validation')
const Friends = require('../models/frinedsModel')
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

exports.updateUserPassword = (req, res, next) => {
    const newPassword = req.body.password
    const confirmPassword = req.body.c_password
    const userEmail = helper.userEmail
    console.log('pass', newPassword)
    console.log('c_pass', confirmPassword)
    console.log('email', email)

    console.log('log in update password 1')
    Users.findOneAndUpdate({ email: userEmail })
    .then(user => {
        if (user) {
            console.log('log in update password 2')
            if (newPassword == confirmPassword) {
                console.log('log in update password 3')
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                   user.password = hash
                   user.save(err => {
                       next(err)
                   })
                   console.log('log in update password 4')
                   let token = jwt.sign({
                    id: user._id,
                    email: user.email
                }, "SuperSecRetKey", {
                        expiresIn: '365d' // expires in 1 year
                });
                console.log('log in update password 5')
                res.json({
                    success: true,
                    user,
                    token: token
                })
                res.end()
                })
            } else {
                console.log('log in update password 6')
                res.json({
                    success: false
                })
            }
        }
    }).catch(err => {
        console.log('log in update password 7')
        next(err)
    })
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
    console.log('generate Number => |+|+|+|+|', generateNumber)
    console.log('+_+_+_+_+_+', typeof(generateNumber))
    console.log('value of value =>>> ', value);
    console.log('type of value =>>> ', typeof(value));

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


