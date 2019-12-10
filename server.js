const tls = require('tls');
const fs = require('fs');

const port  = 8000;
const options = {
	key: fs.readFileSync(`${__dirname}/tsl/server-key.pem`),
	cert: fs.readFileSync(`${__dirname}/tsl/server-cert.pem`),

	rejectUnauthorized: true,
};

const server = tls.createServer(options, (socket) => {
	console.log('server connected',
		socket.authorized ? 'authorized' : 'unauthorized');
	socket.write('welcome!\n');
	socket.setEncoding('utf8');
	socket.pipe(socket);
});

server.listen(port, () => {console.log('server bound');});
