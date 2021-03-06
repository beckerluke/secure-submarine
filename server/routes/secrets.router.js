const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.user:', req.user);
    const queryText = `SELECT * FROM "secret" WHERE "secrecy_level" <= $1;`;
    // see if user is authenticated and if so respond with data user is cleared for
    // if user is not authenticated respond with forbidden error
    if (req.isAuthenticated()) {
        pool.query(queryText,[req.user.clearance_level])
            .then((response) => {
                res.send(response.rows);
            })
            .catch((err) => {
                console.log(`${err}`);
                res.sendStatus(500);
            })   
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;