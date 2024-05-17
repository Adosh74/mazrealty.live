const fs = require('fs');
// get .env file from ../root to ./server

const copyEnv = () => {
	fs.copyFileSync(`${process.cwd()}/.env`, `${process.cwd()}/server/.env`);
};

copyEnv();
