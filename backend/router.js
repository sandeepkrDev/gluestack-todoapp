module.exports = () => [
  {
    "server_name": "your-app-name"
  },
  {
    "path": "/engine",
    "proxy": {
      "path": "/"
    }
  }
];
