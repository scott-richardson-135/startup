const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require("./database.js");
const app = express();
const { peerProxy } = require('./peerProxy.js');

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
            await DB.updateUser(user);
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
        DB.updateUser(user);
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
apiRouter.get('/stats', verifyAuth, async (req, res) => {
    const user = await DB.getUserByToken(req.cookies[authCookieName]);

    if (!user) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    const stats = await DB.getStats(user.email)
    res.json(stats);
  });


//Submit stats
apiRouter.post('/stat', verifyAuth, async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);

  if (!user) {
    return res.status(401).send({msg: "Unauthorized"});
  }

  console.log("Received stats for user:", user.email);

  await DB.updateStats(user.email, req.body)
  const updatedStats = await DB.getStats(user.email);


  console.log("Updated stats:", updatedStats);

  res.json(updatedStats);

});



async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };

    await DB.addUser(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    if (field === "token") {
      return DB.getUserByToken(value);
    }
    return DB.getUser(value);
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
  
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);