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
	console.log('SERVER connected', socket.authorized ? 'authorized' : 'unauthorized');

	socket.write('welcome!\n');
	setTimeout(() => {socket.write("Send after second")}, 1000);
	socket.setEncoding('utf8');

	socket.on('error', console.error);
	socket.on('data', console.log);

	// socket.pipe(socket);
	// process.stdin.pipe(socket);
	// process.stdin.resume();
});

server.listen(port, () => {console.log('server bound');});
