// Call Osmosis webSocket from tendermint
// https://docs.tendermint.com/master/rpc/


import WebSocket from 'isomorphic-ws';
const ws = new WebSocket('wss://rpc.osmosis.zone/websocket');

const send = (method, params) => {
  ws.send(JSON.stringify({
    "method": method,
    "params": params,
    "id": "1",
    "jsonrpc": "2.0"
  }));
}

ws.on('open', function open() {
  let timeout = setTimeout(function () {
    console.log('Connection timed out! Please check your endpoint');
  }, 5000);

  // if the connection is not timed out
  if (!timeout) {
    console.log('Connected to WebSocket');
  }
  const params = ["tm.event='NewBlock'"]
  const method = "subscribe"
  send(method, params)
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function incoming(data) {
  var finalData = JSON.parse(data.toString('utf-8'));
  if (finalData.result.data)
    console.log("------------------------------------------------------");
  console.log(finalData.result);
});