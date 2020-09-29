import socket from 'socket.io';

export default (http) => {
  const io = socket(http);

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
};
