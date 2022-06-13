FROM node:16.14

RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxshmfence-dev libdrm-dev \
    libdrm2 libgconf2-dev libgbm-dev xvfb dbus-x11 libxtst6 \
    libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 \
    libudev-dev libgtkextra-dev libgbm1\
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /redisomm
COPY package.json /redisomm
COPY . /redisomm
RUN npm i
EXPOSE 8080
ENTRYPOINT npm run docker