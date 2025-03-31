-- Wait for MySQL to be ready
SELECT SLEEP(5);

-- Create application user with least privileges
SET @db_user = LOAD_FILE('/run/secrets/db_user');
SET @db_password = LOAD_FILE('/run/secrets/db_password');

SET @sql = CONCAT('CREATE USER IF NOT EXISTS \'', @db_user, '\'@\'%\' IDENTIFIED BY \'', @db_password, '\'');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

GRANT SELECT, INSERT, UPDATE, DELETE ON app_db.* TO @db_user;
FLUSH PRIVILEGES;