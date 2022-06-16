module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: "javascript/auto",
            test: /\.mjs$/,
            include: /node_modules/,
          },
        ],
      },
    },
  },
};
// crate-react-app에 craco <- script 대체
//  crate-react-app  EcmaSript 자바스크립트 모듈이해하게하기
