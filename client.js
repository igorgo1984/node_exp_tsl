
const tls = require('tls');
const fs = require('fs');

const options = {
	ca: [ fs.readFileSync(`${__dirname}/tsl/server-cert.pem`) ]
};

const port = 8000;
const host = 'localhost';

const socket = tls.connect(port, host, options, () => {
	console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized');
	process.stdin.pipe(socket);
	process.stdin.resume();
});

socket.setEncoding('utf8');

socket.on('data', (data) => {
	console.log(data);
});

socket.on('end', () => {
	console.log('Ended')
});
