const Discord = require("discord.js");
const client = new Discord.Client();
const mysql = require('mysql');
var prefix = '!';
var EloRank = require ('elo-rank');
var elo = new EloRank (15);


var sql = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'repbot'
});

client.on('ready', () => {
	console.log(`This is RepBot, here to protect the universe aaanddd, give you reps i guess`);

	sql.connect(err => {
		if (err) {
			throw err;
		}
		console.log('yaya database has arrived.');
	});
});

client.on('message', (msg) => {

	if (msg.content.startsWith(prefix + 'retard')) {
		msg.reply('Ya thats thijsje183 (alias = SCUMBAGSTEVE) he is quite the retard.')
	}

	if (msg.content.startsWith('+rep')) {
		rankup();
		const command = msg.content.toLowerCase().split(' ')[0].substring(1);
		const suffix = msg.content.substring(command.length + 2);
		let author = msg.author.username;

		if (suffix == "") {
			msg.reply(author + ", I think you forgot something, it rimes with pame");
			return false;
		}

		let userid = suffix.replace(/[|&;$%@"<>()+!,]/g, "");
		let userObj = msg.mentions.users.find(m => m.id === userid);
		let user = userObj.username;

		// Check if guild data is present
		if (msg.guild) {
			// Check if given username exists on server
			if (msg.guild.members.find(m => m.user.username === user)) {
				if (author != user) {
					try {
						sql.query("SELECT * FROM reps WHERE id = " + userid + " LIMIT 1", function (err, result, fields) {
							if (err) throw err;

							if (result.length > 0) {
								var temp_rep = result[0].rep + 1;
								sql.query("UPDATE reps SET rep = " + temp_rep + " WHERE id = " + userid);
							} else {
								sql.query("INSERT INTO reps (id, rep, username) VALUES (" + userid + ", 1, '"+ user +"')");
							}
						});

						msg.reply(author + " added a rep to " + user + "'s account!");
					} catch (err) {
						msg.reply(author + ", This is an absolute disaster!!!");
					}
				} else {
					msg.reply(author + ", You can't add reps to your own account " + author + ". WHAT THE F*@%$ PLEB?");
				}
			} else {
				msg.reply(user + " Yea, soo about that username....");
			}
		}
	};

	if (msg.content.startsWith('-rep')) {
		const command = msg.content.toLowerCase().split(' ')[0].substring(1);
		const suffix = msg.content.substring(command.length + 2);
		let author = msg.author.username;

		if (suffix == "") {
			msg.reply(author + ", I think you forgot something, it rimes with pame");
			return false;
		}

		let userid = suffix.replace(/[|&;$%@"<>()+!,]/g, "");
		let userObj = msg.mentions.users.find(m => m.id === userid);
		let user = userObj.username;

		// Check if guild data is present
		if (msg.guild) {
			// Check if given username exists on server
			if (msg.guild.members.find(m => m.user.username === user)) {
				if (author != user) {
					try {
						sql.query("SELECT * FROM reps WHERE id = " + userid + " LIMIT 1", function (err, result, fields) {
							if (err) throw err;

							if (result.length > 0) {
								var temp_rep = result[0].rep - 1;
								sql.query("UPDATE reps SET rep = " + temp_rep + " WHERE id = " + userid);
							} else {
								sql.query("INSERT INTO reps (id, rep, username) VALUES (" + userid + ", 1, '"+ user +"')");
							}
						});

						msg.reply(user + " get shit on " + author + "just fucked up ur rep ammount");
					} catch (err) {
						msg.reply(author + ", This is an absolute disaster!!!");
					}
				} else {
					msg.reply(author + ", You want to fuck up your rep ammount " + author + ". Are you retarted?");
				}
			} else {
				msg.reply(user + " Yea, soo about that username....");
			}
		}
	};

	function rankup() {

		const command = msg.content.toLowerCase().split(' ')[0].substring(1);
		const suffix = msg.content.substring(command.length + 2);
		let userid = suffix.replace(/[|&;$%@"<>()+!,]/g, "");
		let userObj = msg.mentions.users.find(m => m.id === userid);

		try {
		sql.query("SELECT * FROM reps ", function (err,result,fields) {

			result.forEach(element => {
				var rank = element.Rank + 1;
			if (element.rep >= 10 && element.rep < 20) {
				console.log (userid)
				sql.query("UPDATE reps SET Rank = " + rank + "WHERE id = " + element.id);
			};
			});
			
			return;
		});
	} catch (err) {
		msg.reply("This is an absolute disaster!!!");
	}
	}

	if (msg.content.startsWith(prefix + 'stats')) {
		rankup()
		try {
			sql.query("SELECT * FROM reps ORDER BY rep DESC ", function (err, result, fields) {
				if (err) throw err;
				
				if (result.length > 0) {
					result.forEach(element => {


						var rank = '';
						if (element.Rank == 0)
						{
							rank = 'Noob';
						}
						if (element.Rank == 1)
						{
							rank = 'Noob 2.0 ';
						}
						if (element.Rank == 2)
						{
							rank = 'Noob 3.0';
						}

						msg.reply(element.username + " has " + element.rep + " reps | Rank = " + rank);
					});
				} else {
					msg.reply("THERE ARE NO REPS HERE, I FEEL SO ALONE :(");
				}
			});
		} catch (err) {
			msg.reply("This is an absolute disaster!!!");
		}

	}


	if (msg.content.startsWith(prefix + 'rank')) {
		rankup();
	try {
		sql.query("SELECT * FROM reps WHERE id = " + msg.author.id, function (err, result, fields) {
			if (err) throw err;

			if (result[0].Rank == 0) {
		msg.reply('your current rank is Noob!');
		console.log('het werkt :)');
			}
			else if (result[0].Rank == 1){
				msg.reply('your current rank is Noob 2.0');
			}
			}); 
		} catch (err) {
			msg.reply("This is an absolute disaster!!!");
		}
	}
});
	
		
	




	
client.login("NDA4MzE4NDQyMzA3ODQ2MTc3.DVOjbg.obF5SlK0MyptwzI2Vnx5dAdyBCE");
