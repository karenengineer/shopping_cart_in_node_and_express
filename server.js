import http from 'http';
import app from './app';

const port = process.env.PORT || 3000; // config file sarqel

const server = http.createServer(app);

server.listen(port, () => console.log(`server started on port ${port}`)
);
