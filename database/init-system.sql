CREATE DATABASE IF NOT EXISTS app_db;
USE mysql;

-- Essential system tables for MySQL 8.0
SOURCE /usr/share/mysql/mysql_system_tables.sql;
SOURCE /usr/share/mysql/mysql_system_tables_data.sql;

-- Create your application user
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'temp_password';
GRANT ALL PRIVILEGES ON app_db.* TO 'app_user'@'%';
FLUSH PRIVILEGES;