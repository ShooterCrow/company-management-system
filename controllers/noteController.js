const Note  = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET / notes
// @access private
const getAllNotes = asyncHandler(async (req, res) => {

})

// @desc create new note
// @route POST / notes
// @access private
const createNote = asyncHandler(async (req, res) => {

})

// @desc update note
// @route PATCH / notes
// @access private
const updateNote = asyncHandler(async (req, res) => {

})

// @desc delete note
// @route DELETE / notes
// @access private
const deleteNote = asyncHandler(async (req, res) => {

})

module.exports = {getAllNotes, createNote, updateNote, deleteNote}