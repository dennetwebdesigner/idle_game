import cors from 'cors';
import express from 'express';
import http from 'http';

import { server_init } from './multiplayer';

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

server_init(server);

const PORT = process.env.PORT || 3000;

app.get('/', (_: any, res: any) => {
  return res.json({ server: 'online' });
});

server.listen(PORT, () => console.log(`Server online in port ${PORT}`));
