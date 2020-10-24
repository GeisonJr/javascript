


/* YouTubeDownLoad */
const ytdl = require("ytdl-core");
/* /YouTubeDownLoad */

/* Initial Configs */
const queue = new Map();
/* /Initial Configs */

/* Player */
const ServerQueue = queue.get(message.guild.id);
// play
if (message.content.toLowerCase().startsWith(`${PREFIX}play`)) {
  execute(message, ServerQueue);
  return undefined;
}
// skip
else if (message.content.toLowerCase().startsWith(`${PREFIX}skip`)) {
  skip(message, ServerQueue);
  return undefined;
}
// pause
else if (message.content.toLowerCase().startsWith(`${PREFIX}stop`)) {
  stop(message, ServerQueue);
  return undefined;
}


async function execute(message, ServerQueue) {

  const args = message.content.split(" ");
  const voiceChannel = message.member.voiceChannel;

  if (!voiceChannel) {
    await message.channel.send("You need to be in a voice channel to play music!");
    return undefined;
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);

  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    await message.channel.send("I need the permissions to join and speak in your voice channel!");
    return undefined;
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
  }

  if (!ServerQueue) {
    // creating the contract for our queue
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    }

    // setting the queue using our contract
    queue.set(message.guild.id, queueConstruct);

    // pushing the song to our songs array
    queueConstruct.songs.push(song);

    try {
      // participates in voice chat and saves the connection
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;

      // call the Play function
      play(message.guild, queueConstruct.songs[0]);
    }
    catch (err) {
      // error connecting to voice channel 
      console.log(err);
      queue.delete(message.guild.id);
      await message.channel.send(err);
      return undefined;
    }
  } else {
    ServerQueue.songs.push(song);
    console.log(ServerQueue.songs);
    await message.channel.send(`${song.title} has been added to the queue! :headphones: :headphones: `);
    return undefined;
  }
}

// skip
async function skip(message, ServerQueue) {

  // user not connected to voice channel
  if (!message.member.voiceChannel) {
    await message.channel.send("You have to be in a voice channel to skip the music!");
    return undefined;
  }

  // no songs in the queue
  if (!ServerQueue) {
    ServerQueue.connection.dispatcher.end();
    await message.channel.send("There is no song that I could skip!");
    return undefined;
  }
}

// stop
async function stop(message, ServerQueue) {

  // user not connected to voice channel
  if (!message.member.voiceChannel) {
    ServerQueue.songs = [];
    ServerQueue.connection.dispatcher.end();
    await message.channel.send("You have to be in a voice channel to stop the music!");
    return undefined;
  }
}

// play
function play(guild, song) {

  const ServerQueue = queue.get(guild.id);

  // no songs in the queue
  if (!song) {
    ServerQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return undefined;
  }

  const dispatcher = ServerQueue.connection.playStream(ytdl(song.url))
    .on("end", () => {
      console.log(`Music ended! server: ${guild.name} (id: ${guild.id})`);
      ServerQueue.songs.shift();
      play(guild, ServerQueue.songs[0]);
    })
    .on("error", err => {
      console.error(err + `` + `server: ${guild.name} (id: ${guild.id})`);
    });
  dispatcher.setVolumeLogarithmic(ServerQueue.volume / 5);
}