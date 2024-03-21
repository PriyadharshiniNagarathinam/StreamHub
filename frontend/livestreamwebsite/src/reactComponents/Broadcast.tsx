import React from 'react';
import { Socket,io } from 'socket.io-client';

const Broadcast: React.FC = () => {
    const handleGoLive = () => {
        const socket : Socket = io('http://localhost:3001');
    };

    return (
        <div>
            <button onClick={handleGoLive}>Go Live</button>
        </div>
    );
};

export default Broadcast;