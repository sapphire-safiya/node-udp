var dgram = require('dgram');
var StringDecoder = require('string_decoder').StringDecoder;
var port = 4000;
var server = dgram.createSocket('udp4');
var reply;

server.on('message',function(message,rinfo){
    //console.log("Recieved message: %s from %s of %d port",message,rinfo.address,rinfo.port);
    
    /* Echoing the same message that is recieved
       IMP if you want to reuse message buffer do so in the call back function for 'message'*/
    
    reply='';
    
    switch(message.toString().trim().toLowerCase()){
        case 'hey':
            reply = '\nHey I am good, How about you';
            break;
        case 'bye':
            reply = '\nSee you next time';
            break;
        case 'how are you?':
            reply = '\nI am good Thanks for asking.';
            break;
        case 'who made you?':
            reply = '\nI was made by sapphire';
            break;
        case 'who are you?':
            reply = '\nI am a simple UDP robot';
            break;
        default:
            reply = '\nI don\'t understand what you meant by that';
    }
    
    server.send(reply,0,reply.length,rinfo.port,rinfo.address,function(err,bytes){
        if(err)
            console.log(err.message);
    });
});

server.on('listening',function(){
   var address = server.address();
   console.log("Server is waiting for message on "+address.address+":"+address.port); 
});

server.bind(port);

