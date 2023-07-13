# Youtube Video Sharing - Remitano Test

## Introduction
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project includes two main pages:
#### `Home`
- Show all videos from database with the following informations: `title`, `shared by`, `like count`, `dislike count`, `description` and `youtube video player` to play video.
- `Loadmore` feature can be load more videos when loadmore button is cliked.

#### `Share a video`
- The second page is a screen to share a Youtube video by video URL.

Otherwise the application has also authentication feature when user login/register or logout.

## Prerequisites
  - node: v16
  - posgresql

## Installation & Configuration

#### `Database installation`
Make sure you have posgresql installed on your machine before you create the database with name is `ytb-video-sharing`.

#### `Backend installation`

Make sure your terminal is in `api-gateways` directory.
Run `npm install` to install dependencies.

Run `npm run start:dev` to start development server.

Note that you have to copy `sample.development.env` to `development.env` and change into correct environment variables for your machine in `src/cores/environments`.

#### `Client installation`
Make sure your terminal is in `web-apps` directory.

Run `npm install` to install dependencies.

Run `npm run start` to start development server.

Run `npm run test` to execute tests.

Note that you have to copy `.sample.env` to `.env` and change into correct evironment variables for your machine.

Runs the app in the development mode in `http://localhost:3000` to view it in the browser.
