# Foody (Fridgella) - Uix.js rewrite

A remake of https://github.com/spasimir21/vvv made using [Uix.js](https://github.com/spasimir21/uixjs)

The above mentioned project is an app for keeping track of expiring food in your fridge made with a team during a summer
academy.

# Server

The app requires a Node.js server to be running. The server can be found in the repository of the original project. It's
IP needs to be put in the config.ts file of the client (this repo) in the form of a base URL.

# Notes

- The barcode scanning functionality of the original app is currently mocked, but will be implemented in the future.
- Capacitor isn't added yet in this repo so you currently can't build it into an app.
