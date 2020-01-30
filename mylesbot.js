const fs = require('fs');
const {Client, Attachment, Channel, User} = require('discord.js');
var config = JSON.parse(fs.readFileSync('config.json'));
const client = new Client();
const ClientSecret = config.clientSecret;
var quotes = JSON.parse(fs.readFileSync('quotes.json'));
var usedQuotes = [0,0,0,0,0,0,0,0,0,0];
const Token = config.token;
var quoteNum = 49;


//Selectable Quotes /quote #
//Add feature /add quote year
//
client.on('ready',()=>{
	client.user.setActivity('Some Weaboo Anime', { type: 'Watching' });
});

client.on('disconnected',function(){
	console.log('Disconnected: Exiting');
	process.exit(1);
	
});

client.on('error', console.error);

client.on('message',message=>{
	// Setting up our input checking and argument parsing. 
    var isPrefix = message.content.charAt(0);
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if(isPrefix=='/'){
		switch(command){
			case 'quote':
				if (args[0] == null){
					var num = getQuote();
					var quote =quotes.Quotes[num];
					message.delete();
				    message.channel.send(quote+" Quote #"+num);
				}
				else{
					var test = parseInt(args[0]);
					if (test<=quoteNum){
						message.delete();
						message.channel.send(quotes.Quotes[test]);
					}else{
						message.channel.send("Not a valid quote number.");
					}
				}
				
			break;
			/*case 'add':
				//Take input
				//Null check and parse input
				//Write input to file
				//Increase number of quotes in program.
				if(args[0]==null || args[1] == null){
					message.channel.reply("Please make sure you provide both the quote and the year like so /add I'm gay 2020");
				}
				else{
					var temp =parseInput();
					
				}
				
				
				
			break;
			*/
			
			default:
				message.channel.send("How did you mess up? This bot only does 1 thing fuckboi! /quote");
			break;
		
		}
	}
});

function parseInput(args){
	var quote = "\""+args[0]+"\""+"-Myles, "+args[1];
	console.log(quote);
	return quote;
}

function addQuote(){
	
}


function shuffleUsedQuotes(num){
	for (i = 9; i>0; i--){
		usedQuotes[i]=usedQuotes[i-1];
	}
	usedQuotes[0]=num;
}
	
function getQuote(){
	while(true){
		var num = Math.floor(Math.random()*quoteNum);
		var flag = 0;
		for(i = 0; i<10; i++){
			if(num==usedQuotes[i]){
				flag = 1;
				break;
			}
		}
		if(flag==1){
			
		}
		else{
			shuffleUsedQuotes(num);
			return num;
		}
	}
}

	
client.login(Token);