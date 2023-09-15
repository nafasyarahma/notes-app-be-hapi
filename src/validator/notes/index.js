// Berkas ini fokus dalam membuat fungsi sebagai validator yang menggunakan schema dari schema.js
const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
  // memvalidasi payload berdasarkan schema yg telah dibuat
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    // mengevaluasi hasil validasi
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
