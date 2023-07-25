const enum_data={
    registration_type:{
       AGGREGATOR :"Aggregator",
       LABEL:"Label",
       ARTIST:'Artist',
       SONG_WRITER:"Songwriter"
    },
    category:{
        INDIVIDUAL:"Individual",
        COMPANY:"Company",
        PROPRIETOR:"Proprietor",
        PARTNERSHIP:"Partnership"
    },
    agreement_type:{
       MUSIC_PUBLISHING_AND_DISTRIBUTION: 'Music_Publishing_And_Distribution',
       CHANNEL_MANAGEMENT_SERVICE: 'Channel_Management_Service',
       ARTIST_MANAGEMENT:'Channel_Management_Service',
       SONG_WRITER_MANAGEMENT:'Songwriters_Managemen'
    }
}

const status={
    ACTIVE:"active",
    VERIFIED:"verified",
    NOT_VERIFIED:'not verified',
    PENDING: 'pending'
}

module.exports={
    enum_data,
    status
}