var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var address = process.argv[2];
var port = parseInt(process.argv[3],10);


process.stdin.resume();

process.stdin.on('data',function(message){
    if(message.toString().trim() != 'quit')
    {
        console.log("\nSending data to client...");
        client.send(message,0,message.length,port,address,function(err,bytes){
        if(err)
            console.log('Oops! Theres a issue, message not send!');});    
    }
    else
        {
            console.log("Until next time!!");
            client.close();
            process.exit();
        }
});

client.on('message',function(message){
    console.log('Recieved new message from server: '+message);
});

console.log("Start typing to send the message to server and type quit to exit...");