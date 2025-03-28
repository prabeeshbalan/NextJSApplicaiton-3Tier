# Use the official MySQL image as the base image
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=Qwerty1914!
ENV MYSQL_DATABASE=app_database
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=Qwerty1914!

# Copy initialization scripts to the Docker entrypoint directory
COPY init.sql /docker-entrypoint-initdb.d/

# Copy custom MySQL configuration file (optional)
COPY my.cnf /etc/mysql/conf.d/

# Expose the MySQL port
EXPOSE 3306