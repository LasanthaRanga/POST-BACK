const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const mycon = require('../util/conn');
var filePath = require('path');
var fs = require('fs');
var dateFormat = require('dateformat');
let path = '';
const multer = require('multer');
var appRoot = require('app-root-path');

const uppath = "./uploads";
// const uppath = "../public_html/uploads";
// const downpath = "https://www.coopshop.lk/uploads/profile/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uppath);
    },
    filename: function (req, file, cb) {
        const date = dateFormat(new Date(), 'yyyyMMddHHmmss_', 'en-US', '+0530');
        path = date + file.originalname;
        cb(null, path);
    }
}
);

const upload = multer(
    { storage: storage }
);

router.post("/upload", upload.single('attach'), (req, res, next) => {
    console.log("call method");
    try {
        console.log(req.file.path + "  --> Path ");
        const ftype = filePath.extname(req.file.path);
        console.log(ftype + "  --> Type ");
        console.log(req.body);
        let pp = path;

        mycon.execute("INSERT INTO `attach` (`idInstitute`,`iduser`,`page_number`,`comment`,`status`,`type`,`path`,`latterID`) VALUES ('" + req.body.iid + "','" + req.body.uid + "','" + req.body.page + "','" + this.rES(req.body.comment) + "',1,'" + ftype + "','" + req.file.path + "','" + req.body.latterID + "')", (error, rows, next) => {
            if (!error) {
                res.send({ imgpath: pp });
            } else {
                console.log(error);
            }
        });

    } catch (error) {
        console.log("-----")
        console.log(error);
    }
});



exports.rES = (str) => {
    if (str.length > 0) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\" + char; // prepends a backslash to backslash, percent,
                // and double/single quotes
            }
        })
    } else {
        return '';
    }
}


router.get('/getUploadList/:id', (req, res, nex) => {
    console.log(req.params);
    try {
        mycon.execute("" + req.params.id, (error, rows, next) => {
            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
});


router.get('/:path', (req, res, nex) => {
    //    console.log("hit");
    var path = req.params.path;
    //  console.log(appRoot);
    res.sendFile(appRoot + '/uploads/' + path);
});



module.exports = router;