create database h_heroesdb;

CREATE USER 'h_heroes_user'@'%' IDENTIFIED WITH mysql_native_password BY 'superheroes';

GRANT ALL ON h_heroesdb.* TO 'h_heroes_user'@'%';

USE h_heroesdb;

CREATE TABLE heroes (
    id INT auto_increment,
    name VARCHAR(255),
    realname VARCHAR(255),
    firstappearance VARCHAR(255),
    slug VARCHAR(255),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deletedAt DATETIME,
    PRIMARY KEY(id)
)

INSERT INTO heroes (name, realname, firstappearance, slug)
VALUES
    ('Captain America', 'Steve Rogers', 'Captain America Comics #1', 'captain-america'),
    ('Spider-Man', 'Peter Parker', 'Amazing Fantasy #15', 'spider-man'),
    ('Iron Man', 'Tony Stark', 'Tales of Suspense #39', 'iron-man'),
    ('Thor', 'Thor Odinson', 'Journey into Mystery #83', 'thor');

select * from heroes;