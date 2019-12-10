
const tls = require('tls');
const fs = require('fs');

const port = 8000;
/** Note: With example use only server cert */
const options = {

	// Necessary only if the server requires client certificate authentication.
	key: fs.readFileSync(`${__dirname}/tsl/server-key.pem`),
	cert: fs.readFileSync(`${__dirname}/tsl/server-cert.pem`),

	// Necessary only if the server uses a self-signed certificate.
	ca: [ fs.readFileSync(`${__dirname}/tsl/server-cert.pem`) ],

	// Necessary only if the server's cert isn't for "localhost".
	checkServerIdentity: () => { return null; },
};
const host = 'localhost';

const socket = tls.connect(port, host, options, () => {
	console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized');
	console.log('authorizationError ', socket.authorizationError);

	process.stdin.pipe(socket);
	process.stdin.resume();
});

socket.setEncoding('utf8');

socket.on('error', console.error)

socket.on('data', (data) => {
	console.log(data);
});

socket.on('end', () => {
	console.log('Ended')
});
