# Webhook Emitter CF Workers
## Motivation
There is a risk of SSRF(Server Side Request Forgery) if you access untrusted URLs directly from the server.
Also, if you access an unreliable server directly from the origin server, the IP address will be leaked, which will increase the risk of DoS / DDoS to some extent. 

## Security 
This application has not authorization mechanism!!
Please use mTLS or any other authorization mechanism.

## Developing
```
git clone https://github.com/virtualCrypto-discord/webhook-emitter-cf-workers.git
cd webhook-emitter-cf-workers
yarn
wrangler dev
```
