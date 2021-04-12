const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');
const passport = require('passport');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_PASSWORD,
        callbackURL: "http://localhost:3051/auth/google/callback",
    }, async (accessToken, refreshToken, profile, cd) => {
        console.log('profile', profile);
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'google' },
            });
            if (exUser) {
                cd(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json.email,
                    nick: profile.displayName,
                    provider: 'google',
                    snsId: profile.id,
                });
                cd(null, newUser);
            }
        } catch (error) {
            console.error(error);
            cd(error);
        }
    }))
}