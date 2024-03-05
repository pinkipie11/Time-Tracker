const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "https://localhost:7047",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
