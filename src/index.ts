import cors from 'cors';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
app.use(cors({ origin: '*' }));
app.use(express.json());

const wss = new WebSocket.Server({ noServer: true });

// Lida com conexões WebSocket
wss.on('connection', (ws) => {
  console.log('📡 Cliente WebSocket conectado');

  ws.on('message', (message) => {
    console.log('📩 Mensagem WS:', message.toString());

    // Echo simples
    // ws.send(`Recebido: ${message}`);
  });

  ws.on('close', () => {
    console.log('🔌 Cliente WS desconectado');
  });
});

// Faz o upgrade manual e aceita qualquer origem
server.on('upgrade', (req, socket, head) => {
  console.log('🔄 Upgrade solicitado');

  // Aqui você pode checar o origin se quiser
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req); // Emite uma nova conexão com o cliente
  });
});

const PORT = process.env.PORT || 3000;

app.get('/', (_, res: any) => {
  return res.json({ server: 'online' });
});

server.listen(PORT, () => console.log(`Server online in port ${PORT}`));
