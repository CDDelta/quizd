# Quizd

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/cddelta/ngx-monetization/issues)

This is a platform on the Arweave permaweb where users can play quizzes made by others and create their own!

## Development

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Packaging and Deployment

First, build the app using `ng build --prod`, then deploy it on the Arweave permaweb using `arweave deploy dist/quizd/index.html --key-file path/to/arweave-key.json --package`.

To test the app packaging, run `arweave package dist/quizd/index.html dist/quizd-packaged/index.html` and serve the resulting package using `http-server ./dist/quizd-packaged`.
