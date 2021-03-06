const { createAudioPlayer, NoSubscriberBehavior } = require("@discordjs/voice");
const { BaseManager } = require("../BaseManager");
const Queue = require("../utility/Queue");

class MusicManager extends BaseManager {
    constructor(client, bot, guild) {
        super(client, bot, guild);

        this.songQueue = new Queue();

        this.audioPlayer = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause, } });
        this.audioPlayer.on('stateChange', (oldState, newState) => 
        {
            if(this.songQueue.empty) return;
            if(oldState.status === 'playing' && newState.status === 'idle') {
                this.nextInQueue(guild.id);
            }
        });
    }

    get subscription() {
        const connection = this.guild.voice.connection;
        if (typeof connection === "string") return connection;

        const subscription = connection.state.subscription;
        return subscription;
    }

    setVolume(volume) {
        const subscription = this.subscription;
        subscription.player.state.resource.volume.setVolume(volume / 100);
    }

    play(song) {
        const connection = this.guild.voice.connection;
        if(typeof connection === 'string') return connection;

        this.audioPlayer.play(song.resource);
        this.audioPlayer.on('error', err => 
        {
            console.log(err.message);
        })

        connection.subscribe(this.audioPlayer);
    }

    pause() {
        const subscription = this.subscription;
        subscription.player.pause();
    }

    unPause() {
        const subscription = this.subscription;
        subscription.player.unpause();
    }

    getQueue(guildId) 
    {
        return this.songQueue;
    }

    addToQueue(song) {
        if (typeof song !== 'song') return;
        this.songQueue.push(song);
    }
    nextInQueue() 
    {
        if (typeof song !== 'song') return;
        this.songQueue.next();
        this.play(this.songQueue.current, this.guild.id);
    }
}
module.exports.MusicManager = MusicManager;