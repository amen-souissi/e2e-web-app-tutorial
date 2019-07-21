create table channels(
    id serial PRIMARY KEY,
    title VARCHAR (50) UNIQUE NOT NULL
);

create table comments(
    id serial PRIMARY KEY,
    text  TEXT NOT NULL,
    channel_id int NOT NULL,
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
);

insert into channels (title) values ('General');

insert into comments (text, channel_id) values ('Hello!', 1);
insert into comments (text, channel_id) values ('Bonjour !', 1);
