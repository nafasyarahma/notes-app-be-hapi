/* eslint-disable import/no-extraneous-dependencies */
const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    const artifacts = Jwt.token.decode(refreshToken);
    try {
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;

/*
- Payload => objek yg disimpan ke dalam salah satu artifacts
- Payload berisi properti pengguna
- Fungsi verifySignature hanya menerima token dalam bentuk artifacts atau token yg sudah didecoded
- Encoded token string random yg dipisahkan titik
- Decode yg bentuknya object (artifatcs) : ada 3 -> header, payload, signature
- nilai dalam 'return payload' akan digunakan dalam membuat akses token baru
*/
