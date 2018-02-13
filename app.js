
const Discord = require("discord.js");
const client = new Discord.Client();
const mysql = require('mysql');
var prefix = '+';
const apiUrl = "http://localhost:3000/";


var sql = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'repbot'
});

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}!`);

  sql.connect(err => {
  if(err) {
    throw err;}
  console.log('Connected to database!');
});
});

client.on('message', (msg) => {

      if (msg.content.startsWith(prefix + 'user')) {
        sql.query("INSERT INTO reps (id, rep) VALUES (?, ?)",[msg.author.discriminator, 0])
      }


      if (msg.content.startsWith(prefix + 'rep')) {

          sql.query("SELECT * FROM reps WHERE id = 4836 LIMIT 1", function (err, result, fields) {
          if (err) throw err;
          sql.query("UPDATE reps SET rep = rep +1 WHERE id = " + msg.author.discriminator);

             // update
          });


        //sql.query('INSERT INTO reps (id, rep) VALUES (?, ?)', [msg.author.discriminator, 1]);
    };

    if (msg.content.startsWith('-rep')) {
      sql.query("SELECT * FROM reps WHERE id = 4836 LIMIT 1");
      sql.query("UPDATE reps SET rep = rep -1 WHERE id =" + msg.author.discriminator);
    }
    if (msg.content.startsWith('+bal')) {
      sql.query(`SELECT rep FROM reps WHERE id = '${msg.author.discriminator}'`, function(err, rows, fields)
      {
      if (err) throw err; 
      msg.reply('Has ' + (msg.author.rep) + ' reps!');
      });
     };
    if (message.content[0] === "+") {
      const command = msg.content.toLowerCase().split(' ')[0].substring(1);
      const suffix = msg.content.substring(command.length + 2);

      switch (command) {
        case "+rep":
            repManagment(msg, suffix, "add");
            break
        case "-rep":
            repManagment(msg, suffix, "subtract");
      }
    }


    if (msg.guild) {
      if (msg.guild.members.find(m => m.user.username === user))
    {
        if (author != user) {
          try {
            request(apiUrl + 'users/' + user, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                userData = JSON.parse (body);
              }
            }
          
        
    
     
     
     
     function repManagment(msg, suffix, action)
          let author = msg.author.username;
    });






































































 

      

  











client.login("NDA4MzE4NDQyMzA3ODQ2MTc3.DVOjbg.obF5SlK0MyptwzI2Vnx5dAdyBCE");