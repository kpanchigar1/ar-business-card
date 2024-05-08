require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const expressBrowserify = require('express-browserify');
const { IamTokenManager } = require('ibm-watson/auth');

if (!process.env.API_KEY) {
    console.log('This example requires the ASSISTANT_APIKEY environment variable');
    process.exit(1);
}

const assistantAuthenticator = new IamTokenManager({
    apikey: process.env.API_KEY,
});

const isDev = app.get('env') === 'development';
app.get(
    '/bundle.js',
    expressBrowserify('public/client.js', {
        watch: isDev,
        debug: isDev,
    })
);

app.use(express.static('public/'));

app.get('/api/token', function (req, res) {
    return assistantAuthenticator
        .requestToken()
        .then(({ result }) => {
            res.json({ accessToken: result.access_token, url: process.env.SERVICE_URL });
        })
        .catch(console.error);
});

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function () {
    console.log('Watson browserify example server running at http://localhost:%s/', port);
});