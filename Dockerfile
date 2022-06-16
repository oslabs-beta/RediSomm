# FROM node:14
FROM node:16.13
RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxshmfence-dev libdrm-dev \
    libdrm2 libgconf2-dev libgbm-dev xvfb dbus-x11 libxtst6 \
    libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    libudev-dev libgtkextra-dev libgbm1\
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -d /RediSomm redisomm
#creates home directory for the user and ensures bash is default shell 
# USER spearmint
USER root
# root here to bypass permissions, not the best way to do this 
WORKDIR /RediSomm
# WORKDIR sets the working directory for subsequent commands
# copy the source into /app
WORKDIR /RediSomm
COPY . .
COPY package.json .
RUN chown -R node /RediSomm

# install node modules and perform an electron rebuild
USER node
RUN rm -rf node_modules
RUN npm install -force
RUN npx electron-rebuild -f -w node-pty

EXPOSE 8080
EXPOSE 3000
# Electron needs root for sand boxing
# see https://github.com/electron/electron/issues/17972
USER root
RUN chown root /RediSomm/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /RediSomm/node_modules/electron/dist/chrome-sandbox

# Electron doesn't like to run as root
USER node
CMD bash
# CMD npm run start