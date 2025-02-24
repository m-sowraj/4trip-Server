const express = require('express');
const router = express.Router();
const upload = require('../config/s3');
const { uploadFile, uploadFiles } = require('../controllers/fileUploadController');
const UserAuth = require('../middleware/userAuth');

// Single file upload
router.post('/single',  upload.single('file'), uploadFile);

// Multiple files upload
router.post('/multiple', UserAuth, upload.array('files', 10), uploadFiles);

module.exports = router;