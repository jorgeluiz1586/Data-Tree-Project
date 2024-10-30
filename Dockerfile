FROM oven/bun:latest

RUN apt update && apt upgrade -y &&apt install lynx -y

COPY . /app

WORKDIR /app

