const JwtStrategy = require("passport-jwt").Strategy;
const PassportFacebook = require('passport-facebook').Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require('../db/models/Users');
const Admin = require('../db/models/Admin')
const keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Admin.findById(jwt_payload.id)
                .then(admin => {
                    if (admin) {
                        return done(null, admin);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
    passport.use(new PassportFacebook({
        clientID: '343489216327951',
        clientSecret: '16c01d7f8a146b9e17845334126650b1',
        callbackURL: "http://localhost:5000/api/users/auth/facebook/callback/",
        profileFields: ['email']
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log('profile', profile);
                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);

                const existingUser = await User.findOne({ "facebook.id": profile.id });
                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new User({
                    method: 'facebook',
                    facebook: {
                        id: profile.id,
                        email: profile.emails[0].value
                    }
                });

                await newUser.save();
                done(null, newUser);
            } catch (error) {
                done(error, false, error.message);
            }
        }
    ))
};