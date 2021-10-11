const db = require('../../data/db-config');
/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted(req, res, next) {
  next();
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  const [usernameExists] = await db('users')
    .where('username', req.body.username);
  if (usernameExists) {
    next({status: 422, message: 'Username taken'});
  } else {
    next();
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists() {

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  if (req.body.password && req.body.password.length > 3) {
    next();
  } else {
    next({status: 422, message: 'Password must be longer than 3 chars'});
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  restricted,
  checkUsernameFree,
  checkPasswordLength
}