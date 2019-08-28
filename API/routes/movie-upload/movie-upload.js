const express = require('express');
const path = require('path');
const router = express.Router()
const movieUploadController = require('../../controllers/admin/upload-movie/upload-movie');
const multer = require('multer');
const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        fs.exists('./uploads/', (exist) => {
            if (exist) {
                next(null, './uploads/')
            } else {
                fs.mkdir('./uploads/', (err, folder) => {
                    next(null, './uploads/')
                })
            }
        })
    },
    filename: (req, file, next) => {
        var time = Math.random().toString(36).substring(7);
        next(null, file.fieldname + '-' + time + path.extname(file.originalname));
    }
})

const upload = multer({
    storage,
})

router.post('/movie', upload.any(), movieUploadController.UPLOAD_MOVIE)
router.patch('/movie/:id', upload.any(), movieUploadController.UPDATE_MOVIE)
router.delete('/movie/:id', movieUploadController.DELETE_MOVIE)

module.exports = router