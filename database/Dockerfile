# Use the official MySQL image with Debian base
FROM mysql:8.0-debian

# Set environment variables (overridden by docker-compose)
ENV MYSQL_ROOT_PASSWORD_FILE=/run/secrets/db_root_password \
    MYSQL_USER_FILE=/run/secrets/db_user \
    MYSQL_PASSWORD_FILE=/run/secrets/db_password \
    MYSQL_DATABASE=app_db \
    TZ=UTC

# Copy configuration files
COPY ./database/my.cnf /etc/mysql/conf.d/99-custom.cnf
COPY ./database/init.sql /docker-entrypoint-initdb.d/10-schema.sql
COPY ./database/grants.sql /docker-entrypoint-initdb.d/20-permissions.sql

# Set secure permissions
RUN chmod 0444 /etc/mysql/conf.d/99-custom.cnf && \
    chmod 0444 /docker-entrypoint-initdb.d/*.sql && \
    chown -R mysql:mysql /docker-entrypoint-initdb.d

# Install monitoring tools (optional)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    mysql-client \
    percona-toolkit \
    && rm -rf /var/lib/apt/lists/*

VOLUME /var/lib/mysql
EXPOSE 3306

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD mysqladmin ping -uroot -p$$(cat /run/secrets/db_root_password) || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]