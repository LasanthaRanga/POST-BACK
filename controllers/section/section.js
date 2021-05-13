const mycon = require('../../util/conn');
const jwt = require('jsonwebtoken');
const bcript = require('bcrypt');
var dateFormat = require('dateformat');
const mg = require('../../middleware/email');

exports.realEscapeString = (str) => {
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


exports.createSection = (req, res, next) => {
    try {
        mycon.execute("INSERT INTO `section`( `instituteid`, `section_name`, `description`) VALUES ( '" + req.body.iid + "', '" + this.realEscapeString(req.body.section) + "', '" + this.realEscapeString(req.body.description) + "')",
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

exports.getSectionByInstitute = (req, res, next) => {
    try {
        mycon.execute("SELECT section.idsection,section.instituteid,section.section_name,section.description FROM section WHERE section.instituteid=" + req.body.iid,
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

exports.deleteSection = (req, res, next) => {
    try {
        mycon.execute("DELETE FROM section WHERE idsection = " + req.body.idsection,
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

exports.updateSection = (req, res, next) => {
    try {
        mycon.execute("UPDATE `section` SET `section_name`='" + this.realEscapeString(req.body.section) + "',`description`='" + this.realEscapeString(req.body.description) + "' WHERE `idsection`=" + req.body.idsection,
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


exports.createPosition = (req, res, next) => {
    try {
        mycon.execute("INSERT INTO  `position`( `instituteid`, `position`, `description`, `sectionid`) VALUES ( '" + req.body.iid + "', '" + this.realEscapeString(req.body.position) + "', '" + this.realEscapeString(req.body.description) + "', '" + req.body.idsection + "')",
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

exports.getPositionByInstitute = (req, res, next) => {
    try {
        mycon.execute("SELECT position.idposition,position.instituteid,position.position,position.description,position.sectionid FROM position WHERE position.instituteid=" + req.body.iid,
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

exports.getPositionBySection = (req, res, next) => {
    try {
        mycon.execute("SELECT position.idposition,position.instituteid,position.position,position.description,position.sectionid FROM position WHERE position.sectionid=" + req.body.idsection,
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

exports.deletePosition = (req, res, next) => {
    try {
        mycon.execute("DELETE from position WHERE idposition = " + idposition,
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

exports.updatePosition = (req, res, next) => {
    try {
        mycon.execute("UPDATE `position` SET `position`='" + this.realEscapeString(req.body.position) + "',`description`='" + this.realEscapeString(req.body.description) + "'' WHERE `idposition`=" + req.body.idposition,
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


exports.createLtype = (req, res, next) => {
    try {
        mycon.execute("INSERT INTO `latertype` (`type`,`instituteid`,`description`) VALUES ('" + this.realEscapeString(req.body.ltype) + "','" + req.body.iid + "','" + req.body.ltypeDes + "')",
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

exports.getLtypeByInstitute = (req, res, next) => {
    try {
        mycon.execute("SELECT latertype.idLaterType,latertype.type,latertype.instituteid,latertype.description FROM latertype WHERE latertype.instituteid=" + req.body.iid,
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

exports.createSubLtype = (req, res, next) => {
    console.log(req.body);
    try {
        mycon.execute("INSERT INTO `latersubtype` (`subtype`,`description`,`instituteid`,`ltypeId`) VALUES ('" + this.realEscapeString(req.body.subType) + "','" + this.realEscapeString(req.body.subTypeDes) + "','" + req.body.iid + "','" + req.body.ltype + "')",
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

exports.getSubLtypeByLtype = (req, res, next) => {
    try {
        mycon.execute("SELECT latersubtype.idlaterSubType,latersubtype.subtype,latersubtype.description,latersubtype.ltypeId,latersubtype.instituteid FROM latersubtype WHERE latersubtype.ltypeId=" + req.body.ltype,
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