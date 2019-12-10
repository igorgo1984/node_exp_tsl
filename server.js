const tls = require('tls');
const fs  = require('fs');

const port  = 8000;
/** Note: With example use only server cert */
const options = {
	key: fs.readFileSync(`${__dirname}/tsl/server-key.pem`),
	cert: fs.readFileSync(`${__dirname}/tsl/server-cert.pem`),

	// This is necessary only if using client certificate authentication.
	requestCert: true,
	// rejectUnauthorized: false,

	//client
	ca: [ fs.readFileSync(`${__dirname}/tsl/server-cert.pem`) ]
};

const server = tls.createServer(options, (socket) => {
	console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');

	console.log('authorizationError ', socket.authorizationError);
	console.log('getProtocol()  ', socket.getProtocol());

	socket.write('welcome!\n');
	socket.setEncoding('utf8');
	socket.pipe(socket);
});

server.listen(port, () => {console.log('server bound');});
