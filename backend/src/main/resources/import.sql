INSERT INTO DEPARTMENT (NAME) VALUES ('COMPUTER ENGINEERING');
INSERT INTO DEPARTMENT (NAME) VALUES ('ARTIFICIAL INTELLIGENCE ENGINEERING');
INSERT INTO DEPARTMENT (NAME) VALUES ('ELECTRONICAL AND ELECTRONICS ENGINEERING');
INSERT INTO DEPARTMENT (NAME) VALUES ('MECHANICAL ENGINEERING');
INSERT INTO DEPARTMENT (NAME) VALUES ('INDUSTRY ENGINEERING');
INSERT INTO DEPARTMENT (NAME) VALUES ('CIVIL ENGINEERING');

-- Sttudents
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, SCHOOL_ID, DEPARTMENT_ID, BANNED) VALUES ('Yunus', 'Terzi', 'https://avatars.githubusercontent.com/u/72995775?v=4', 0, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'yunus@gmail.com', '31.10.2001', '', '', '2200356021', 1, false);
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, SCHOOL_ID, DEPARTMENT_ID, BANNED) VALUES ('Numan', 'Kafadar', 'https://avatars.githubusercontent.com/u/72977168?v=4', 0, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'numan@gmail.com', '31.10.2001', '', '', '21946242', 4, false);
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, SCHOOL_ID, DEPARTMENT_ID, BANNED) VALUES ('Umut', 'Gungor', 'https://avatars.githubusercontent.com/u/72995496?v=4', 0, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'umut@gmail.com', '31.10.2001', '', '', '21946198', 3, false);
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, SCHOOL_ID, DEPARTMENT_ID, BANNED) VALUES ('Faruk', 'Derdiyok', 'https://avatars.githubusercontent.com/u/72977897?v=4', 0, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'faruk@gmail.com', '31.10.2001', '', '', '21946036', 2, false);
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, SCHOOL_ID, DEPARTMENT_ID, BANNED) VALUES ('Cagri', 'Korkmaz', 'https://avatars.githubusercontent.com/u/128552053?v=4', 0, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'cagri@gmail.com', '31.10.2001', '', '', '2200356833', 6, false);

--Admin
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS) VALUES ('System', 'Admin', 'https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg', 3, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'admin@gmail.com', '31.10.2001', '', '');

-- Instructors
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, DEPARTMENT_ID) VALUES ('Engin', 'Demir', 'https://www.cs.hacettepe.edu.tr/images/staff/94.jpg', 2, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'engindemir@gmail.com', '31.10.2001', '', '',1);
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, DEPARTMENT_ID) VALUES ('Erkut', 'Erdem', 'https://www.cs.hacettepe.edu.tr/images/staff/12.jpg', 2, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'erkuterdem@gmail.com', '31.10.2001', '', '',1);
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, DEPARTMENT_ID) VALUES ('Özgür', 'Erkent', 'https://www.cs.hacettepe.edu.tr/images/staff/ozgur_old.png', 2, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'ozgurerkent@gmail.com', '31.10.2001', '', '',2);
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, DEPARTMENT_ID) VALUES ('Fuat', 'Akal', 'https://www.cs.hacettepe.edu.tr/images/staff/57.jpg', 2, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'fuatakal@gmail.com', '31.10.2001', '', '',1);


--Department Managers
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, DEPARTMENT_ID) VALUES ('Ebru Akçapınar', 'Sezer', 'https://www.cs.hacettepe.edu.tr/images/staff/7.jpg', 1, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'ebruakcapinarsezer@gmail.com', '31.10.2001', '', '',2);
INSERT INTO USERS (NAME, SURNAME, PROFILE_PHOTO, ROLE, PASSWORD, EMAIL, BIRTH_DATE, ABOUT, ADDRESS, DEPARTMENT_ID) VALUES ('İlyas', 'Çiçekli', 'https://www.cs.hacettepe.edu.tr/images/staff/3.jpg', 1, '$2a$10$eNPZWR/LvI/8OvDJzlUzrO4hg7ZOJ/Yvuhg/RUqbv5zf6/dONXb6.', 'ilyascicekli@gmail.com', '31.10.2001', '', '',1);