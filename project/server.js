var apiConfig = require('./data/config.json');

var path = require('path')
var express = require('express')
var https = require('https');
var moment = require('moment-timezone');
var nodeCache = require('node-cache');
var util = require('util');
var zlib = require('zlib');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var fs = require('fs');

var userAgent = util.format('xmlstats-exnode/%s (%s)', apiConfig.version, apiConfig.user_agent_contact);
var authorization = util.format('Bearer %s', apiConfig.access_token);

var shortDate = 'YYYYMMDD';
var longDate = 'dddd, MMMM D, YYYY';

// instruct cache to keep items for 10 minutes
var cache = new nodeCache({ stdTTL: 600 });

var app = express()
var compiler = webpack(config)

app.locals.moment = require('moment-timezone');

// See https://erikberg.com/api/endpoints#requrl Request URL Convention
// for an explanation
var xmlEventsUrl = {
    host: 'erikberg.com',
    sport: undefined,
    endpoint: 'events',
    id: undefined,
    format: 'json',
    params: {
      sport: 'mlb',
      date: ''
    }
};

var xmlBoxscoreUrl = {
    host: 'erikberg.com',
    sport: 'mlb',
    endpoint: 'boxscore',
    id: undefined,
    format: 'json',
    params: {
      sport: 'mlb',
      date: ''
    }
};


// serve our static stuff like index.css

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	history: true
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

/*app.get('/api/players', function(req, res) {
	console.log('server.js', res);
	fs.readFile(PLAYERS_FILE, function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		res.json(JSON.parse(data));
	});
})
*/

// This web app responds to requests to "GET /" and "GET /yyyyMMdd"
// and returns 404 for everything else. The default is to return
// data for the current date. Otherwise, it checks for an 'id' parameter
// that contains a valid date in yyyyMMdd format and returns data for that
// date.

function handleResponse (res, url, statusCode, contentType, data) {
  if (statusCode !== 200) {
    console.warn('Server did not return a "200 OK" response! ' +
        'Got "%s" instead.', statusCode);
    // If error response is of type 'application/json', it will be an
    // XmlstatsError see https://erikberg.com/api/objects/xmlstats-error
    // var reason = (contentType === 'application/json')
    //     ? data.error.description
    //     : data;
    // res.status(statusCode).render('error', { code: statusCode, reason: reason });
    return;
  } else {
    res.json(data);
    // Store good response in cache
    cache.set(url, data);
  }

    // var titleDate = formatDate(data.events_date, longDate);
    // res.render('index', { header: titleDate, events: data });
}

app.get('/api/:id?', function (req, res) {
  xmlEventsUrl.params.date = moment().format(shortDate);
  if (req.params.id) {
    if (moment(req.params.id, shortDate, true).isValid()) {
      xmlEventsUrl.params.date = formatDate(req.params.id, shortDate);
    } else {
      res.status(404).render('error', { code: 404, reason: 'Invalid date.' });
      return;
    }
  }

  var url = buildUrl(xmlEventsUrl);

  httpGet(url, function (statusCode, contentType, data) {
    handleResponse(res, url, statusCode, contentType, data)
  });

});

app.get('/api/boxscore/:id', function (req, res) {
  if (req.params.id) {
  }else {
    res.status(404).render('error', { code: 404, reason: 'Invalid game ID.' });
    return;
  }

  xmlBoxscoreUrl.id = req.params.id;

  var url = buildUrl(xmlBoxscoreUrl);

  httpGet(url, function (statusCode, contentType, data) {
    handleResponse(res, url, statusCode, contentType, data)
  });

});

function httpGet(url, callback) {
  var data = cache.get(url);
  if (data) {
    callback(200, 'application/json', data);
    return;
  }

  var options = {
    hostname: xmlEventsUrl.host,
    path: url,
    headers: {
      'Accept-Encoding': 'gzip',
      Authorization: authorization,
      'User-Agent': userAgent
    }
  };

  var req = https.get(options, function(res) {
    var content;
    var data = [];

    if (res.headers['content-encoding'] === 'gzip') {
      var gzip = zlib.createGunzip();
      res.pipe(gzip);
      content = gzip;
    } else {
      content = res;
    }

    content.on('data', function (chunk) {
      data.push(chunk);
    });

    content.on('end', function() {
      var json = JSON.parse(Buffer.concat(data));
      callback(res.statusCode, res.headers['content-type'], json);
    });
  });

  req.on('error', function (err) {
    callback(500, 'text/plain', 'Unable to contact server: ' + err.message);
    console.error('Unable to contact server: %s', err.message);
  });
}

function formatDate(date, fmt) {
  return moment.tz(date, config.time_zone).format(fmt);
}

// See https://erikberg.com/api/endpoints#requrl Request URL Convention
// for an explanation
function buildUrl(opts) {
  console.log('building url');
  var ary = [opts.sport, opts.endpoint, opts.id];

  var path = ary.filter(function (element) {
    return element !== undefined;
  }).join('/');
  var url = util.format('https://%s/%s.%s', opts.host, path, opts.format);

  // check for parameters and create parameter string
  if (opts.params) {
    var paramList = [];
    for (var key in opts.params) {
      if (opts.params.hasOwnProperty(key)) {
        paramList.push(util.format('%s=%s',
            encodeURIComponent(key), encodeURIComponent(opts.params[key])));
      }
    }
    var paramString = paramList.join('&');
    if (paramList.length > 0) {
      url += '?' + paramString;
    }
  }
  console.log('requesting api @ url:',url)
  return url;
}

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
})

var PORT = process.env.PORT || 8888

app.listen(PORT, 'localhost', function(err) {
	if (err) {
		console.log(err)
		return
	}

	console.log('Listening at http://localhost:8888')
})