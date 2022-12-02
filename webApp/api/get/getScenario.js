const fs = require('fs');

function checkIsNumber(rest) {
    let isnum = /^\d+$/.test(rest);
    return (isnum);
}

const readJSON = (path) => {
    try {
        let fullpath =  path;
        if (fs.existsSync(fullpath)) {
            let obj = fs.readFileSync(fullpath, 'utf8');
            let ret = JSON.parse(obj);
            return ret;
        } else {
            return undefined;
        }
    } catch (err) {
        throw err;
    }
}

function getNodeScene(id, urlFile) {
    const file = readJSON(urlFile);
    if (file === undefined)
        return (undefined)
    return (file[id]);
}

const getScenario = (req, res) => {
    try {
        const id = req.params.id;
        if (id !== undefined && checkIsNumber(id)) {
            const obj = getNodeScene(id, './script.json');
            if (obj !== undefined) {
                res.status(200).json(obj);
            } else
                res.status(400).json({ msg: "Invalid Credentials" });
        } else
            res.status(400).json({ msg: "Invalid Credentials" });
    } catch (e){
        console.log(e);
    }
}

module.exports = getScenario;
