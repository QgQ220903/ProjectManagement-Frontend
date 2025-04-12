import { useEffect, useState } from "react";

const api = "wss://3.24.47.52/ws"

const useWebSocket = (name) => {
    const url = `${api}${name}`;

    const [data, setData] = useState(null);
    useEffect(() => {
        const socket = new WebSocket(url);
        socket.onmessage = (event) => {
            setData(JSON.parse(event.data));
        };
        return () => socket.close();
    }, [url]);
    return data;
};

export default useWebSocket;
