create table if not exists ERROR
(
    error_id      varchar(64)            not null primary key,
    error_name    tinytext               null,
    error_message tinytext               null,
    error_stack   text                   null,
    error_cause   tinytext               null,
    context       json                   null,
    error_at      DATETIME default now() not null
);

create table if not exists GUILD
(
    guild_id       bigint unsigned                  not null primary key,
    message_point  int             default 1        not null,
    voice_point    int             default 5        not null,
    bump_point     int             default 10       not null,
    boost_point    int             default 50       not null,
    daily_point    int             default 5        not null,
    weekly_point   int             default 10       not null,
    special_point  int             default 30       not null,
    all_time_point int             default 50       not null,
    point_name     varchar(25)     default 'points' not null,
    lang           char(2)         default 'en'     null,
    log_channel    bigint unsigned default 0        not null
);

create table if not exists BOOST
(
    boost_id      bigint unsigned auto_increment primary key,
    guild_id      bigint unsigned          null,
    boosted_id    bigint unsigned          null,
    boost_type    tinyint                  not null,
    starting_at   DATETIME   default now() not null,
    ending_at     DATETIME                 not null,
    multiplier    int        default 2     not null,
    recurrent     tinyint(1) default 0     not null,
    execute_every DATETIME                 null,
    foreign key (guild_id) references GUILD (guild_id) on delete cascade
);

create table if not exists DISABLED_CHANNEL
(
    channel_id bigint unsigned not null,
    guild_id   bigint unsigned not null,
    primary key (channel_id, guild_id),
    foreign key (guild_id) references GUILD (guild_id) on delete cascade
);

create table if not exists SHOP
(
    item_id        int unsigned auto_increment primary key,
    guild_id       bigint unsigned      null,
    label          varchar(255)         not null,
    description    varchar(255)         not null,
    price          int unsigned         not null,
    max_quantity   int        default 0 not null,
    action         int        default 0 not null,
    available      tinyint(1) default 1 not null,
    applied_id     bigint unsigned      null,
    multiplier     int                  null,
    boost_type     tinyint              null,
    boost_duration VARCHAR(30)          null,
    foreign key (guild_id) references GUILD (guild_id) on delete cascade
);

create table if not exists TEXT
(
    text_id  int unsigned         not null,
    guild_id bigint unsigned      null,
    value    varchar(255)         not null,
    used     tinyint(1) default 0 not null,
    foreign key (guild_id) references GUILD (guild_id) on delete cascade,
    foreign key (text_id) references SHOP (item_id) ON DELETE CASCADE
);

create table if not exists USER
(
    user_id            bigint unsigned           not null,
    guild_id           bigint unsigned           not null,
    store_points       int             default 0 not null,
    leaderboard_points int             default 0 not null,
    messages_sent      int             default 0 not null,
    voice_duration     bigint unsigned default 0 not null,
    nitro_boost        tinyint(1)      default 0 not null,
    bump_count         int             default 0 not null,
    primary key (user_id, guild_id),
    foreign key (guild_id) references GUILD (guild_id) on delete cascade
);

CREATE TABLE IF NOT EXISTS INVENTORY
(
    -- Identifier
    id               bigint unsigned auto_increment PRIMARY KEY,
    user_id          bigint unsigned        null,
    guild_id         bigint unsigned        null,
    item_id          int unsigned           null,
    item_name        varchar(255)           not null,
    purchase_date    DATETIME default now() not null,
    purchase_price   int unsigned           not null,
    used             boolean  default 0     not null,
    refunded         boolean  default 0     not null,
    item_type        tinyint                not null,
    text_value       varchar(255)           null,
    boost_multiplier int                    null,
    boost_duration   VARCHAR(30)            null,
    boost_type       tinyint                null,
    applied_id       bigint unsigned        null,
    FOREIGN KEY (user_id, guild_id) references USER (user_id, guild_id),
    FOREIGN KEY (item_id) references SHOP (item_id) ON DELETE CASCADE
);

create table RGPD
(
    userID      bigint unsigned not null primary key,
    nextRequest datetime        not null,
    data        json            not null
);