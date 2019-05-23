const express     = require("express"),
      http        = require("http"),
      socketIO    = require("socket.io"),
      mongoose    = require("mongoose"),
      bodyParser  = require("body-parser"),
      User        = require("./models/user"),
      auth        = require("./middleware/auth"),
      port        = process.env.PORT || 8000;





let app     = express();
let server  = http.createServer(app);
let io      = socketIO(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/major_pong",
                {
                  useNewUrlParser: true,
                  useCreateIndex: true
                }
);

app.use(require("express-session")({
    secret: "Life's like it",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
  res.locals.currentUser = req.session.user;
  next();
});

io.on("connection", (socket) => {

      socket.on("image", (data) => {
      //  console.log(data.image);
        io.emit("image", data.image);

      });

});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("./index/register");
});

app.post("/register", async (req, res) => {
  try {
    const data = req.body.user;
    const user = new User(data);
    await user.save();
    let token = await user.generateAuthToken();
    res.header("x-auth", token)
    req.session.token = token;
    //req.headers.set("x-auth", token);
    req.session.user = user;
    //res.send(req.session.user);
    res.redirect("/home");
  } catch(err) {
    res.send(err);
  }
});

app.get("/login", (req, res) => {
  res.render("./index/login");
});

app.post("/login", async (req, res) => {
  try{
    const user = await User.findCredentials(req.body.user.username, req.body.user.password);
    const token = await user.generateAuthToken();
    res.header("x-auth", token);
    req.session.token = token;
    req.session.user = user;
    res.redirect("/home");
  } catch(err) {
    console.log(err);
  }
});

app.get("/logout",auth,  async (req, res) => {
try{
  await req.user.removeToken(req.session.token);
  req.session.destroy(function(err) {
    res.redirect("/home");
  });
} catch(err){
  console.log(err);
}
});

app.get("/face",auth, (req, res) => {
  res.render("face")
});

app.get("/pong",auth,  (req, res) =>{
  res.render("pong");
});


server.listen(9000, () => {
  console.log("Server running at port 9000");
})
