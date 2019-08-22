const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //BearerToken 방식으로 
opts.secretOrKey = 'SECRET_KEY'; //보통은 process.env에 저장해서 key가 노출되지 않도록 한다.
module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    //원래는 자신의 데이터 베이스값과 비교해야하지만 예제 편의상 리터럴로 바로사용
    if (jwt_payload.email === "1jin94@naver.com") {
        return done(null, true)
    }
    return done(null, false)
}) 