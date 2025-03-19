const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require("./database.js");
const app = express();

const authCookieName = 'token';

//data structures
let users = [];
let stats = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));


//api path for endpoints
let apiRouter = express.Router();
app.use('/api', apiRouter);

//create new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.password);
  
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    }
  });

//login existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({email: user.email});
            return;
        }
        return res.status(401).send({msg: 'Unauthorized'});
    }
    return res.status(401).send({msg: "User not found"});
});

//logout
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

//verify function
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  };



// Get Stats
apiRouter.get('/stats', verifyAuth, (_req, res) => {
    res.send(stats);
  });

//Submit stats
apiRouter.post('/stat', verifyAuth, (req, res) => {
  const user = users.find(u => u.token === req.cookies[authCookieName]);

  if (!user) {
    return res.status(401).send({msg: "Unauthorized"});
  }

  console.log("Received stats for user:", user.email);

  const updatedStats = updateStats(req.body, user.email);


  if (updatedStats.error) {
    return res.status(404).send(updatedStats);
  }

  console.log("Updated stats:", updatedStats);

  res.json(updatedStats);

});


function updateStats(newStat, userEmail) {
  //check if user stats already exist in array
let userStats = stats.find(s => s.email === userEmail);

  if (!userStats) {
    // If stats don't exist for this user, create them
    userStats = { email: userEmail, gamesPlayed: 0, wins: 0, losses: 0 };
    stats.push(userStats);  // Add the new user stats to the stats array
    console.log(`Created new stats for ${userEmail}:`, userStats);  // Log creation of new stats
  }

  // Update the stats
  userStats.gamesPlayed = (userStats.gamesPlayed || 0) + (newStat.gamesPlayed || 0);
  userStats.wins = (userStats.wins || 0) + (newStat.wins || 0);
  userStats.losses = (userStats.losses || 0) + (newStat.losses || 0);

  console.log(`Updated stats for ${userEmail}:`, userStats);  // Log updated stats

  return userStats;


}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }


// app.get('*', (_req, res) => {
//     res.send({ msg: 'Startup service' });
//   });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });