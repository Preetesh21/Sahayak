create schema if not exists menderschema;
set search_path to menderschema;

-- TABLES:

create table if not exists users(userID serial primary key, email varchar(100) not null,username varchar(100) not null,password varchar(100) not null,age integer not null, gender varchar(20) not null, creditCardNumber varchar(12), phoneNumber varchar(10) not null, whatsappNumber varchar(10), sessionsTaken integer not null,talksAttended integer not null);

create table if not exists counselors(counselorID serial primary key, name varchar(100) not null,email varchar(100) not null, username varchar(100) not null,password VARCHAR(100) not null,age integer not null, gender varchar(20) not null, bankAccountNumber varchar(18) not null, IFSCcode varchar(20) not null, priority1 varchar(100) not null,priority2 varchar(100) not null, priority3 varchar(100) not null,priority4 varchar(100) not null,phoneNumber varchar(10) not null, whatsappNumber varchar(10) not null, fee integer not null,sessionsTaken integer not null,bDegree varchar(100) not null,mDegree varchar(100) not null, extraCourses integer not null,practicalExperience integer not null,portfolio varchar(2083) not null,sessionRatings float(3) not null);

create table if not exists speakers(speakerID serial primary key, name varchar(100) not null,email varchar(100) not null, username varchar(100) not null,password varchar(100) not null,age integer not null, gender varchar(20) not null, bankAccountNumber varchar(18) not null, IFSCcode varchar(20) not null, phoneNumber varchar(10) not null, sessionsTaken integer not null,practicalExperience integer not null,portfolio varchar(2083) not null,talksRatings float(3) not null);

create table if not exists appointments(appointmentID serial primary key, bookDate varchar(10) not null, bookTime time not null, venue varchar(2083) not null, rating float(3) not null);

create table if not exists bookedBy(appointmentID serial references appointments(appointmentID), userID serial references users(userID) );

create table if not exists bookedFor(appointmentID serial references appointments(appointmentID), counselorID serial references counselors(counselorID));

create table if not exists objectiveResponses(responseID serial primary key, ans1 varchar(1), ans2 varchar(1), ans3 varchar(1), ans4 varchar(1), ans5 varchar(1), ans6 varchar(1), ans7 varchar(1), ans8 varchar(1), ans9 varchar(1), ans10 varchar(1), ans11 varchar(1), ans12 varchar(1), ans13 varchar(1), ans14 varchar(1), ans15 varchar(1));

create table if not exists objectivelyRespondedBy(responseID serial references objectiveResponses(responseID),userID serial references users(userID));

create table if not exists talks(talkID serial primary key, talktitle text not null, talkdesc text not null,talkDate VARCHAR(10) not null, talkTime Time not null, maxEntries integer not null, venue varchar(2083) not null, bookedSeats integer not null, fee integer not null, rating float(3) not null);

create table if not exists gives(talkID serial references talks(talkID), speakerID serial references speakers(speakerID));

create table if not exists attends(talkID serial references talks(talkID), userID serial references users(userID));

create table if not exists posts(postID serial primary key, text varchar(2000), userID serial references users(userID));