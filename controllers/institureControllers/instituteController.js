const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');



exports.realEscapeString = (str) => {
    console.log(str);
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
    });
}

exports.getAllInstitute = (req, res, next) => {
    try {
        mycon.execute("SELECT institute.iid,institute.`name`,institute.address,institute.contact,institute.email,institute.reg_date,institute.renev_date,institute.price,institute.`status`,institute.type,institute.district,institute.city,institute.postalcode,institute.other1,institute.other2,institute.parent FROM institute",
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


exports.create = (req, res, next) => {
    try {
        let b = req.body;
        console.log(b);
        var datetime = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        mycon.execute("INSERT INTO  `institute` (`name`,`address`,`contact`,`email`,`reg_date`,`renev_date`,`price`,`status`,`type`,`district`,`city`,`postalcode`,`other1`,`other2`,`parent`) " +
            " VALUES ('" + this.realEscapeString(b.name) + "','" + this.realEscapeString(b.address) + "','" + this.realEscapeString(b.contact) + "','" + this.realEscapeString(b.email) + "'," +
            " '" + datetime + "','" + datetime + "','" + b.price + "',1,'" + b.type + "'," +
            " '" + this.realEscapeString(b.district) + "','" + this.realEscapeString(b.city) + "','" + this.realEscapeString(b.postalcode) + "','" + this.realEscapeString(b.other1) + "','" + this.realEscapeString(b.other2) + "','" + b.parent + "');",
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

exports.getById = (req, res, next) => {
    try {
        mycon.execute("SELECT institute.iid,institute.`name`,institute.address,institute.contact,institute.email,institute.reg_date,institute.renev_date,institute.price,institute.`status`,institute.type,institute.district,institute.city,institute.postalcode,institute.other1,institute.other2,institute.parent FROM institute WHERE institute.iid=" + req.body.iid,
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
