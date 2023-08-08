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
    PENDING: 'pending',
    COMPLETED: 'completed',
    HOLD:'hold',
    IN_PROGRESS:'in progress',
    APPROVED: "approved"
}
const dashboard_type={
    PRO:'pro',
    BASIC: 'basic',
    SONGWRITER_EXCLUSIVE:'songwriter exclusive',
    ADVANCE:'advance',
    ARTIST_EXCLUSIVE: 'artist exclusive'
}
const dashboard_status={
    LOGGED_IN: 'logged in',
    REQUESTED: 'requested',
    HOLD: 'hold'
}
module.exports={
    enum_data,
    status,
    dashboard_type,
    dashboard_status
}