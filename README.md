# video-timeline
Create your own YouTube playlist on your own host with delightful UI.
> Still developing

## Project setup
```
npm install
```

### Firebase setup
New a file named config.js in src/database and wrap your app tokens of Firebase with export default { }.
> Your config.js should look like:
```JavaScript
export default {
  apiKey: "yourAppKey",
  authDomain: "your-authDomain",
  databaseURL: "your-databaseURL",
  projectId: "your-projectId",
  storageBucket: "your-storageBucket",
  messagingSenderId: "yourMessagingSenderId"
}
```
If you want to fast setup an example, you can import the src/database/mock-data.json to your Real-time Database of Firebase.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Powered by
- [Vue](https://github.com/vuejs/vue)
- [PortalVue](https://github.com/LinusBorg/portal-vue)
- [YouTube Iframe API](https://developers.google.com/youtube/iframe_api_reference)
- [Firebase](https://firebase.google.com/)