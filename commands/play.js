const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioResource } = require('@discordjs/voice');
const { Song } = require('../Music/Song');
const play = require('play-dl');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays the specified song')
        .addStringOption(option => option.setName('url')
            .setDescription('Song url')
            .setRequired(true)),
    async execute(interaction, bot) {
        const guild = bot.getGuild(interaction.guild.id);
        const url = interaction.options.getString('url');

        let videoInfo;
        let resource;

        if(play.yt_validate(url) === 'video') 
        {
            const info = await play.video_info(url);
            const stream = await play.stream(url, {discordPlayerCompatibility: true});

            resource = createAudioResource(stream.stream, { inlineVolume: true, });
        } else 
        {
            //videoInfo = await play.search(url)[0];
            //let stream = await play.stream(videoInfo.url);
            //resource = createAudioResource(stream.stream, { inlineVolume: true, });
        }
        
        const song = new Song(videoInfo, resource);
        
        const answer = guild.music.play(song);
        if(typeof answer === 'string')
        {
            interaction.reply(answer);
            return;
        }
        interaction.reply("Playing");
    },
};