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


exports.sendLatter = (req, res, next) => {

    console.log(req.body);
    var b = req.body;
    var dd = {
        to: {
            idUser: 8,
            email: 'asdf@asdf.com',
            mobileno: '0702517628',
            status: 1,
            utypeId: 3,
            instituteid: 14,
            parent: 0,
            gender: 'Male',
            name: 'Mrs. asdf asdf asdf ',
            nic: 'asdfasdf',
            section_name: 'IT',
            position: 'Software Engineer',
            fullName: 'asdf asdf asdf ',
            idsection: 4,
            idposition: 4
        },
        from: {
            uid: 6,
            email: 'rm.lasantharanga@gmail.com',
            mobile: '0702517628',
            uType: 2,
            iid: 14,
            section: null,
            position: null,
            parent: null,
            name: null,
            nic: null,
            iat: 1622176648,
            exp: 1622180248
        },
        latter: { laterId: 69, status_int: 1, status_string: 'sent' }
    }

    var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

    try {
        mycon.execute("INSERT INTO `fromto` ( `laterid`, `from_iid`, `from_uid`, `from_dip`, `from_posh`, `to_iid`, `to_uid`, `to_dip`, `to_posh`, `status_int`, `status_string`, `date_sent`, `date_status_change` ) " +
            " VALUES(" + b.latter.laterId + ", " + b.from.iid + ", " + b.from.uid + ", " + b.from.section + ", " + b.from.position +
            ", " + b.to.instituteid + ", " + b.to.idUser + ", " + b.to.idsection + ", " + b.to.idposition + ", " + b.latter.status_int + ", '" + b.latter.status_string + "', '" + day + "', NULL)",
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

exports.getInbox = (req, res, next) => {
    try {
        mycon.execute("SELECT fromto.idFromTo,fromto.laterid,fromto.from_iid,fromto.from_uid,fromto.from_dip,fromto.from_posh,fromto.to_iid,fromto.to_uid,fromto.to_dip,fromto.to_posh,fromto.status_int,fromto.status_string,fromto.date_sent,fromto.date_status_change,letter.idLetter,letter.title,`user`.idUser,`user`.`name`,section.section_name,position.position,position.idposition,section.idsection FROM fromto INNER JOIN letter ON letter.idLetter=fromto.laterid INNER JOIN `user` ON `user`.idUser=fromto.from_uid LEFT JOIN section ON section.idsection=`user`.section LEFT JOIN position ON position.idposition=`user`.position WHERE fromto.to_iid='" + req.body.iid + "' AND fromto.to_uid='" + req.body.uid + "' AND fromto.status_int=" + req.body.status,
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

exports.getLatter = (req, res, next) => {
    try {
        mycon.execute("SELECT letter.idLetter,letter.instituteid,letter.ltype,letter.lstype,letter.title,letter.subtitle,letter.description,letter.barcode,letter.`from`,letter.from_email,letter.from_mobile,letter.created,letter.dedline,letter.`option`,letter.statusint,letter.statusstring FROM letter WHERE letter.idLetter=" + req.body.idLatter,
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

exports.getAttachment = (req, res, next) => {
    try {
        mycon.execute("SELECT attach.idAttach,attach.page_number,attach.`comment`,attach.`status`,attach.type,attach.path,attach.latterID FROM attach WHERE attach.latterID=" + req.body.idLatter,
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


exports.statusChange = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        mycon.execute("UPDATE `fromto` SET `status_int`=" + req.body.status_int + ",`status_string`='" + req.body.status_string + "',`date_status_change`='" + day + "' WHERE `idFromTo`=" + req.body.idFromTo,
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

exports.saveEdit = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
        mycon.execute("INSERT INTO `edit` (`userid`,`description`,`updated`,`status`,`latterid`) VALUES ('" + req.body.uid + "','" + this.rES(req.body.description) + "','" + day + "',1,'" + req.body.latterid + "')",
            (error, rows, fildData) => {
                if (!error) {
                    res.send(rows);
                } else {
                    console.log(error)
                }
            });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.updateEdit = (req, res, next) => {
    try {
        var day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
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