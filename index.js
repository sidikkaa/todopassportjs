//lets get started with api
import passport from "passport";
import express from "express";
import session from "express-session"
import mongoose from "mongoose";
import dotenv from "dotenv";
import './auth.js';
import { todoModel } from "./schemas/todo.js"
todoModel
dotenv.config();
//initialize our app
const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.log(e);
    console.log("Error connection to db");
  });
//to check whether user logged in or not(middleware)
function isLoggedIn(req, res, next) {
    req.user ? next() :res.sendStatus(401);
}
//create a route 
app.get('/', (req, res) => {
    res.sendFile("C:/Users/ADMIN/Desktop/passport js/dist/index.html");
})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);
app.get('/auth/failure', (req, res) => {
    res.send('not authenticated user');

});
app.get('/protected', isLoggedIn, (req, res) => {
    res.sendFile("C:/Users/ADMIN/Desktop/passport js/dist/todo.html");
});
app.get('/logout', (req,res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).send('Error during logout');
      }
      res.redirect('/'); 
    });
  });
  app.post('/',(req,res)=>{
  const alltask=todoModel.create(req.body)
    res.json(alltask)
  });
app.listen(3000, () => {
    console.log('listening on 3000');
})