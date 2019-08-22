//express 서버 
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//jwt 받아오는 부분
const jwt = require("jsonwebtoken");

//passport 엔진과 전략 받아오기   

const passport = require("passport");
const jwtStrategry  = require("./jwt")
passport.use(jwtStrategry); //전략 사용

//request된 요청 파라메타를 Json  방식으로 파싱에서 request.body에 넣어주는 미들웨어이다.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//라우터 설정
app.get("/", (req, res) => {
    res.send("hello express server")
})

app.post("/login", (req, res) => {
   
    let { email, password } = req.body;
  //원래는 데이터베이스에서의 데이터를 가저와서 사용
    if (email === "1jin94@naver.com") {
        if (password === "1234") { //보통은 bcrypt를 사용하여 암호화된 패스워드 끼리 비교, 비밀번호의 원본을 가지고 있지 않게....
            console.log(req.body.email);
            const opts = {}
            opts.expiresIn = 120;  //토큰 만료시간 설정 ===> 2분
            const secret = "SECRET_KEY" //보통은 보안을 위해 process.env.secret에 저장
            const token = jwt.sign({ email }, secret, opts); //토큰 생성
            return res.status(200).json({
                message: "인증 성공",
                token
            })
        }
    }
    return res.status(401).json({ message: "인증 실패" })
});

//jwt는 토큰을 사용하지 않기 떄문에 session:false
//인증이 필요한 라우트에서 passport.authenticate()함수를 통해 인정전략을 사용할 수 있다.
app.get("/user", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("YAY! 이곳은 보호되고있는 라우터 입니다.")
})

app.listen(3000);