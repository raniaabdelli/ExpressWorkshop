const express = require("express");
const app = express();

const { userList } = require("./userList");
// const bodyParser = require("body-parser");

// //console.log(app)
// app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); //body parsing
app.use("/views", require("./routes/view"));
const getDate = (req, res, next) => {
  console.log("Time:", new Date())
  if ((new Date().getDay() > 0 && new Date().getDay() < 6) && (new Date().getHours() >= 9 && (new Date().getHours() + 1) <= 17)) {
      console.log("app is open 🕖")
      next()
  } else {
      //console.error(err.stack);
      //res.status(500).send('Something broke ⛔!');
      console.log("app error ⛔")
  }
}
// application level middleware
app.use(getDate);

//console.log(userList);
//3-get
app.get("/users", (req, res) => {
  res.json(userList);
});
//4-post
app.post("/users", (req, res) => {
  const newuser = req.body;
  // id: req.body.id,
  // name: req.body.name,
  // age: req.body.age,
  // isworking: req.body.isworking,

  userList.push(newuser);
  res.json(userList);
  //res.json(userList);
});
//5-delete:
app.delete("/users/:id", (req, res) => {
  const newuserlist=userList.filter(user=>user.id!=req.params.id)
  res.json(newuserlist)})
//6-put
app.put("/users/:id", (req, res) => {
  const newupdateuserlist=userList.map(user=>user.id==req.params.id?{...user,...req.body}:user)
  res.json(newupdateuserlist)})

app.listen(5000, (err) => {
  if (err) throw err;
  else console.log("server is running on port 5000");
});
// //2-middleware
// const authMiddleware = (req, res, next) => {
//   const auth = true;
//   if (auth) {
//     console.log("user authorized");
//     next();
//   } else {
//     res.send("user is not authorized");
//   }
// };

// // 1- routes
// app.get("/t", authMiddleware, (req, res) => {
//   res.sendFile(__dirname + "/routes/home.html");
//   console.log(__dirname + "/home.html")
// });
// app.get("/tcontact", (req, res) => {
//   res.sendFile(__dirname + "/routes/contact.html");
//   console.log(__dirname + "/contact.html")
// });
