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
 [Name], [Artist], [Genre], [DateAdded], [OwnerId], [Lyrics]
)
values
('Honeymoon Avenue', 'Ariana Grande', 'Pop', dateadd(day,-1, getdate()), 1,
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

('Folsom Prison Blues', 'Johnny Cash', 'Country', dateadd(day,-2, getdate()), 4, ''),
('Panic Station', 'Muse', 'Metal', dateadd(day,-3, getdate()), 2, ''),
('Into the Unknown', 'Panic at the Disco', 'Pop Rock', dateadd(day,-4, getdate()), 3, '')
go

-- Create a new table called '[Note]' in schema '[dbo]'
-- Drop the table if it already exists
if object_id('[dbo].[Note]', 'U') is not null
drop table [dbo].[Note]
go
-- Create the table in the specified schema
create table [dbo].[Note]
(
    [Id] int identity(1,1) not null primary key,
	[Natural] nvarchar(255),
    [Sharp] nvarchar(255),
    [Flat] nvarchar(255),
	[Sound] nvarchar(255) not null,
	[IsNatural] bit not null,
	[IsDeleted] bit not null default (0),
);
go

-- Insert rows into table '[Note]' in schema '[dbo]'
insert into [dbo].[Note]
( -- Columns to insert data into
 [Natural], [Sharp], [Flat], [Sound], [IsNatural]
)
values
('A', null, null, 'asoundurl', 1),
(null, 'A\u266F', 'B\u266D', 'asharpsoundurl', 0),
('B', null, null, 'bsoundurl', 1),
('C', null, null, 'csoundurl', 1),
(null, 'C\u266F', 'D\u266D', 'csharpsoundurl', 0),
('D', null, null, 'dsoundurl', 1),
(null, 'D\u266F', 'E\u266D', 'dsharpsoundurl', 0),
('E', null, null, 'esoundurl', 1),
('F', null, null, 'fsoundurl', 1),
(null, 'F\u266F', 'G\u266D', 'fsharpsoundurl', 0),
('G', null, null, 'gsoundurl', 1),
(null, 'G\u266F', 'A\u266D', 'gsharpsoundurl', 0)
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
	[RootNoteId] int not null
		foreign key (RootNoteId)
		references [Note] (Id), 
    [Quality] nvarchar(255) not null,
	[SongId] int not null
		foreign key (SongId)
		references [Song] (Id),
	[IsDeleted] bit not null default (0)
);
go

-- Insert rows into table '[Chord]' in schema '[dbo]'
insert into [dbo].[Chord]
( -- Columns to insert data into
 [RootNoteId], [Quality], [SongId]
)
values
(4, 'sus7', 1),
(4, 'sus7', 1),
(4, 'sus7', 1),
(11, '6', 1),
(9, '6/9', 1)
go

-- Create a new table called '[ChordNote]' in schema '[dbo]'
-- Drop the table if it already exists
if object_id('[dbo].[ChordNote]', 'U') is not null
drop table [dbo].[ChordNote]
go
-- Create the table in the specified schema
create table [dbo].[ChordNote]
(
    [Id] int identity(1,1) not null primary key,
    [ChordId] int not null
		foreign key (ChordId)
		references [Chord] (Id),
	[NoteId] int not null
		foreign key (NoteId)
		references [Note] (Id),
	[IsDeleted] bit not null default (0),
);
go

-- Insert rows into table '[ChordNote]' in schema '[dbo]'
insert into [dbo].[ChordNote]
( -- Columns to insert data into
 [ChordId], [NoteId]
)
values
(4, 4),
(4, 8),
(4, 11),
(4, 4),
(4, 8),
(4, 11),
(4, 4),
(4, 8),
(4, 11)
go
