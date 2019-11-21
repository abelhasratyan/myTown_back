const Users = require('../models/UserModel');
const Album = require('../models/AlbumModel');
const Valid = require('../helpers/validation');
const Friends = require('../models/frinedsModel');
const Posts = require('../models/PostModel');

const Hash = require('../helpers/hash');
const Token = require('../helpers/generateToken');

const helper = require('../constants/helper');
const transporter = require('../lib/mailer').transporter;

exports.login = (req, res, next) => {
    const email = req.body.email.trim();
    let userForRespons = {};
    const userData = {
        email: email,
        password: req.body.password
    };
    Users.findOne({
        email: email
    }).then(user => {
        if (user.role === 'ADMIN') {
            res.json({
                success: false,
                message: "Such USER does not exist"
            })
        } else if (!user) {
            const error = new Error("email is incorrect");
            error.status = 400;
            next(error);
        } else {
            userForRespons = user;
            userData.id = user._id;
            return Hash.ComparyPassword(userData.password, user.password);
        }
    }).then(result => {
        if (!result) {
            const error = new Error("password is wrong");
            error.msg = "password is wrong";
            error.status = 401;
            next(error);
        } else {
            return Token.generateToken(userData.id, userData.email);
        }
    }).then((token) => {
        if (!token) {
            res.json({
                success: false
            })
        } else {
            res.json({
                status: 'success',
                user: userForRespons,
                token: token
            })
        }
    }).catch(err => {
        const error = new Error(err);
        error.message = 'Such Admin doesn\'t exist';
        error.success = false;
        next(error);
    })
};

exports.registration = (req, res, next) => {
    let userForResponse = {};
    const validation = Valid.userValidation(req.body);
    if (!validation.validationType) {
        // next(new Error(validation.messages));
        res.status(400).json({ type: "error", messages: validation.messages });
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
    };
    Users.findOne({
        email: userData.email
    }).then(user => {
        if (user) {
            res.json({

                error: `${user.role} already exist:`
            })
        } else {
            if (userData.password !== req.body.c_password) {
                res.json({
                    error: 'Confirm Password don\'t like Password'
                })
            } else {
                return Hash.HashingPassword(userData.password, 10)
            }
        }
    }).then((hash) => {
        userData.password = hash;
        return Users.create(userData)
    }).then((NewUser) => {
        userForResponse = NewUser;
        Album.create([
            {
                title: "Cover",
                user: NewUser._id
            },
            {
                title: "Profile",
                user: NewUser._id
            }
        ])
        Friends.create({
            user: NewUser._id
        })
        Posts.create({
            userId: NewUser._id
        })
        return Token.generateToken(NewUser._id, NewUser.email)
    }).then((token) => {
        res.json({
            success: true,
            user: userForResponse,
            token: token
        })
    }).catch(err => {
        const error = new Error();
        error.message = err;
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
        if (Number(value) !== Number(generateNumber)) {
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
    const reqUserId = req.params.id || req.user._id;
    const resData = {};
    Users.findOne({ _id: reqUserId })
    .then(user => {
        resData.user = user;
        return Posts.findOne({ userId: reqUserId })
    })
    .then( posts => {
        resData.posts = posts;
        res.json({
            success: true,
            user: resData.user,
            posts: resData.posts
        })
    })
    .catch(err => {
        next(err)
    })
};

/*exports.userForgotPassword = (req, res, next) => {
    const newPassword = req.body.password
    const confirmPassword = req.body.c_password
    const userEmail = req.body.mail
        
    Users.findOne({ email: userEmail })
    .then(user => {
        if (user) {
            if (newPassword == confirmPassword) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log('hashing err =>>>>>', err)
                    }
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
*/

exports.userForgotPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const confirmPassword = req.body.c_password;
    const userEmail = req.body.data.mail;

    Users.findOne({ email: userEmail })
    .then(user => {
        if (user) {
            if (newPassword === confirmPassword) {
                console.log(true)
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    user.password = hash
                    user.save(err => {
                        next(err)
                    });
                    let token = jwt.sign({
                        id: user._id,
                        email: user.email
                    }, "SuperSecRetKey", {
                        expiresIn: '365d' // expires in 1 year
                    });
                    helper.RandNumber = 0;
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
        } else {
            console.log("user is undefined")
        }
    }).catch(err => {
        next(err)
    })
}

exports.UpdateUserData = (req, res, next) => {
    // if (req.body.password != req.body.c_password) {
    //     console.log('log 2 in updateUserData')
    //     res.json({
    //         success: false,
    //         msg: 'Confirm Password don\'t like Password'
    //     })
    // } else {
        const newUserData = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            birthday: req.body.birthday,
            country: req.body.country,
            city: req.body.city,
            // password: req.body.password
        };
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
                    if (!result) {
                        const error = new Error('cant find user');
                        error.msg = 'cant find user';
                        error.status = 404;
                        next(error)
                    } else {
                        let token = jwt.sign({
                            id: result._id,
                            email: result.email
                        }, "SuperSecRetKey", {
                                expiresIn: '365d' // expires in 1 year
                        });
                        res.json({
                            success: true,
                            user: result,
                            token
                        })
                    }
                })
                .catch(err => {
                    next(err);
                })
            // }
        // })
    // }
}

exports.updateUserProfilePhoto = (req, res, next) => {
    const userId = req.user._id;
    let fileData = {};
    if (!req.file) {
        res.json({
            success: false,
            msg: "can't receive file"
        })
    } else {
        fileData.path = `${process.env.SERVER_URL}/uploads/avatars/${req.file.filename}`
    }
    Users.findOneAndUpdate({ _id: userId }, {
        avatar: fileData.path 
    }, {new: true})
    .then(user => {
        if ((user === null) || (user === undefined)) {
            res.json({
                success: false,
                msg: "can't find user"
            })
        } else {
            res.json({
                success: true,
                user
            })
        }
    })
    .catch(err => {
        console.log('log 9 in user controller');
        next(err)
    })
};

exports.updateUserCoverPhoto = (req, res, next) => {
    const userId = req.user._id;
    let fileData = {};
    if (!req.file) {
        res.json({
            success: false,
            msg: "can't receive file"
        })
    } else {
        fileData.path = `${process.env.SERVER_URL}/uploads/cover/${req.file.filename}`
    }
    Users.findOneAndUpdate({ _id: userId }, {
        coverPhoto: fileData.path
    }, { new: true })
    .then(user => {
        if ((user === null) || (user === undefined)) {
            res.json({
                success: false,
                msg: "can't find user"
            })
        } else {
            res.json({
                success: true,
                user
            })
        }
    })
    .catch(err => {
        res.json({
            success: false,
            err
        })
    });
};

