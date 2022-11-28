from websocket import create_connection
import json

headers = json.dumps({
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cache-Control": "no-cache",
  "Connection": "Upgrade",
  "Host": "streamer.cryptocompare.com",
  "Origin": "https://www.cryptocompare.com",
  "Pragma": "no-cache",
  "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
  "Sec-WebSocket-Key": "b/V2HBZ2+s3hGehDMHfVGg==",
  "Sec-WebSocket-Version": "13",
  "Upgrade": "websocket",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
});



# Launch the connection to the server.
ws = create_connection('wss://streamer.cryptocompare.com/v2?format=streamer',headers=headers)

# Perform the handshake.

ws.send(json.dumps({
    "action": "SubAdd",
    "subs": [
        "11~BTC",
        "21~BTC",
        "11~ETH",
        "21~ETH",
        "11~BUSD",
        "21~BUSD",
        "5~CCCAGG~BUSD~USD",
        "11~DOGE",
        "21~DOGE",
        "5~CCCAGG~DOGE~USD",
        "11~USDT",
        "21~USDT",
        "5~CCCAGG~USDT~USD",
        "11~XRP",
        "21~XRP",
        "11~BNB",
        "21~BNB",
        "5~CCCAGG~BNB~USD",
        "11~LTC",
        "21~LTC",
        "11~LINK",
        "21~LINK",
        "5~CCCAGG~LINK~USD",
        "11~USDC",
        "21~USDC",
        "5~CCCAGG~USDC~USD"
    ]
}))


# Printing all the result
while True:
    try:
        result = ws.recv()
        print(result)
    except Exception as e:
        print(e)
        break

# just in cmd type 
# py server.py