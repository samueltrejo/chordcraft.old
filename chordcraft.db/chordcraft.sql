-- Create a new database called 'ChordCraft'
-- Connect to the 'master' database to run this snippet
use master
go

-- Create the new database if it does not exist already
if exists (
    select [name]
    from sys.databases
    where [name] = N'ChordCraft'
)
alter database [ChordCraft] set single_user with rollback immediate;
use master
drop database [ChordCraft]
go

if not exists (
select [name]
from sys.databases
where [name] = N'ChordCraft'
)
create database ChordCraft
go

use ChordCraft

-- Create a new table called '[User]' in schema '[dbo]'
-- Drop the table if it already exists
if object_id('[dbo].[User]', 'U') is not null

drop table [dbo].[User]
go

create table [dbo].[User]
(
	[Id] int identity(1,1) not null primary key,
	[FirebaseUid] nvarchar(255) not null,
	[Username] nvarchar(255),
	[Email] nvarchar(255) not null,
	[Name] nvarchar (255),
	[Country] nvarchar (255),
	[Avatar] nvarchar (255),
	[Bio] nvarchar (255),
	[IsDeleted] bit not null default (0)
)
go

-- Insert rows into table '[User]' in schema '[dbo]'
insert into [dbo].[User]
( -- Columns to insert data into
 [FirebaseUid], [Username], [Email], [Country], [Bio]
)
values
('CyeosVZLLwQdhxtozRJ7s0Bq5wD3', 'To0ns', 'trejomsamuel@gmail.com', 'US', 'I like space!'),
('002', 'BlindZniper', 'isaactrejo@gmail.com', 'US', 'I like dinosaurs!'),
('003', 'LilMrD', 'davidtrejo@gmail.com', 'US', 'I like music!'),
('004', 'DryestOmnivore', 'danielmunoz@gmail.com', 'US', 'I like Fallout!')
go

-- Create a new table called '[Song]' in schema '[dbo]'
-- Drop the table if it already exists
if object_id('[dbo].[Song]', 'U') is not null
drop table [dbo].[Song]
go
-- Create the table in the specified schema
create table [dbo].[Song]
(
    [Id] int identity(1,1) not null primary key,
	[Name] nvarchar(255) not null,
	[IsPublic] bit not null default(0),
	[Artist] nvarchar(255),
	[Genre] nvarchar(255),
	[Transposition] int,
	[DateAdded] datetime2 not null default getdate(),
	[Lyrics] nvarchar(4000) default '',
    [OwnerId] int not null
		foreign key (OwnerId)
		references [User] (Id),
	[IsDeleted] bit not null default (0)
);
go

-- Insert rows into table '[Song]' in schema '[dbo]'
insert into [dbo].[Song]
( -- Columns to insert data into
 [Name], [Artist], [Genre], [DateAdded], [OwnerId], [IsPublic], [Lyrics]
)
values
('Honeymoon Avenue', 'Ariana Grande', 'Pop', dateadd(day,-1, getdate()), 1, 1,
'[D]I looked in my rear view mirror [Am]and' + CHAR(10) +
'It seemed to make a lot more s[Em]ense' + CHAR(10) +
'Than what I see ah[G]ead of us, ahead of us, yeah.' + CHAR(10) +
'[D]I''m ready to make that t[Am]urn' + CHAR(10) +
'Before we both crash and b[Em]urn' + CHAR(10) +
'Cause that could be the d[G]eath of us, the death of us, baby' + CHAR(10) +
'[Pre-Chorus]' + CHAR(10) +
'[D]You know how to drive in rain' + CHAR(10) +
'And [Am]you decided not to make a ch[Em]ange' + CHAR(10) +
'Stuck in the same old lane' + CHAR(10) +
'G[G]oing the wrong way home' + CHAR(10) +
'[Chorus]' + CHAR(10) +
'I feel like my h[D]eart is stuck in bumper to bumper t[Am]raffic,' + CHAR(10) +
'I''m under pressure' + CHAR(10) +
'Cause I can''t h[Em]ave you the way that I want' + CHAR(10) +
'Let''s just go b[G]ack to the way it was' + CHAR(10) +
'When we were on H[D]oneymoon Avenue' + CHAR(10) +
'H[Am]oneymoon Avenue' + CHAR(10) +
'B[Em]aby, coastin'' like crazy' + CHAR(10) +
'Can we get b[G]ack to the way it was?'),

('Folsom Prison Blues', 'Johnny Cash', 'Country', dateadd(day,-2, getdate()), 4, 0, ''),
('Panic Station', 'Muse', 'Metal', dateadd(day,-3, getdate()), 2, 1, ''),
('Into the Unknown', 'Panic at the Disco', 'Pop Rock', dateadd(day,-4, getdate()), 3, 1, '')
go

-- Create a new table called '[Chord]' in schema '[dbo]'
-- Drop the table if it already exists
if object_id('[dbo].[Chord]', 'U') is not null
drop table [dbo].[Chord]
go
-- Create the table in the specified schema
create table [dbo].[Chord]
(
    [Id] int identity(1,1) not null primary key,
	[Name] nvarchar(255) not null,
	[Root] int not null,
    [Quality] nvarchar(255) not null,
	[SongId] int not null
		foreign key (SongId)
		references [Song] (Id),
	[Note1] int,
	[Note2] int,
	[Note3] int,
	[IsDeleted] bit not null default (0),
);
go

-- Insert rows into table '[Chord]' in schema '[dbo]'
insert into [dbo].[Chord]
( -- Columns to insert data into
 [Name], [Root], [Quality], [SongId], [Note1], [Note2], [Note3]
)
values
('A6', 1, '6', 1, 5, 8, 10),
('E7', 5, '7', 2, 12, 3, 6)
go
