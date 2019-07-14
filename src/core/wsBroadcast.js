import WebSocket from "ws";
import jwt from 'jsonwebtoken';
import {jwtConfig} from "../core";

let wss;

export const init = server => {
    wss = new WebSocket.Server({ server });
    wss.on('connection', ws => {
        ws.on('message', message => {
            // console.log('received: %s', message);
            const {token} = JSON.parse(message);
            try {
                const signInfo = jwt.verify(token, jwtConfig.secret);
                ws.user = {userId: signInfo._id};
                // console.log(signInfo);
            }
            catch (e) {
                console.log('auth error ', e);
                ws.close();
            }

        });
    });
};

export const brodcast = ({event, payload}) => {
    // console.log("broadcast: ");
    // console.log(event, payload);
    wss.clients.forEach(ws => {
        const userId = ws.user ? ws.user.userId : null;
        // console.log('userid:', userId);
        // console.log('payloaduserid:', payload.userId);
        if (ws.readyState === WebSocket.OPEN && userId === payload.userId) {
            console.log('send: ', event, payload);
            ws.send(JSON.stringify({event, payload}));
        }
    });
};
