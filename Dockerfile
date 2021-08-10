# Base image
FROM node:lts-alpine3.14

# Labels:
LABEL "maintainer"="maxwattez"
LABEL "version"="1.0.0"

# Copy Node dependencies in /mailserver directory
WORKDIR /mailserver
COPY mailserver/package.json mailserver/package-lock.json ./

# Install node dependencies
# --> set -eux; will stop the script if error during npm install
RUN set -eux; \
    npm install

# Copy application files in /mailserver
COPY mailserver/index.js ./

# Declare environement variables
ENV MAILSERVER_HOST=
ENV MAILSERVER_USERNAME=
ENV MAILSERVER_PSW=
ENV MAILSERVER_DESTINATIONEMAIL=

# Launch server
CMD node index.js

# Expose port 3002
EXPOSE 3002
