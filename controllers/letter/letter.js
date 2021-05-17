const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');

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


exports.create = (req, res, next) => {
    console.log(req.body);
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        var dd = null;
        if (req.body.ded_line.length && req.body.ded_line.length > 2) {
            dd = dateFormat(new Date(req.body.ded_line), "yyyy-mm-dd");
            dd = "'" + dd + "'";
        }


        mycon.execute("INSERT INTO `letter` (`instituteid`,`ltype`,`lstype`,`title`,`subtitle`,`description`,`barcode`,`from`,`from_email`,`from_mobile`,`created`,`dedline`,`option`,`statusint`,`statusstring`)" +
            " VALUES (" + req.body.iid + "," + req.body.type + "," + req.body.subtype + ",'" + this.rES(req.body.title) + "','" + this.rES(req.body.subtitle) +
            "','" + this.rES(req.body.description) + "','" + this.rES(req.body.barcode) + "','" + this.rES(req.body.from_address) + "','" + this.rES(req.body.from_email) + "','" + this.rES(req.body.from_mobile) +
            "','" + day + "'," + dd + ",'" + this.rES(req.body.option) + "','" + req.body.statusint + "','" + this.rES(req.body.statusstring) + "')",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.update = (req, res, next) => {
    try {
        mycon.execute("",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getByInstitute = (req, res, next) => {
    try {
        mycon.execute("",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getByUser = (req, res, next) => {
    try {
        mycon.execute("",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}