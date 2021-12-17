 class HelpController {
    getHelp(req, res) {
        res.render('help')
    }

    addHelp(req, res) {
        res.render('add-help')
    }

    addHelpFinally(req, res) {
        try {
            upload(req, res, function(err) {
                if (err) {
                    res.render('upload');
                }
            })
        } catch (err) {
            console.log(err)
        } finally {
            var fileName = req.files.map(function(item, index) {
                return `uploads/` + item.filename;
            })
            var data = req.body;
            data.srcImg = fileName;
            res.send(data);
        }
    }


    editHelp(req, res) {
        res.render('edit-help')
    }

    editHelpFinally(req, res) {
        try {
            upload(req, res, function(err) {
                if (err) {
                    res.render('upload');
                }
            })
        } catch (err) {
            console.log(err)
        } finally {
            var fileName = req.files.map(function(item, index) {
                return `uploads/` + item.filename;
            })
            var data = req.body;
            data.srcImg = fileName;
            res.send(data);
        }
    }
}

module.exports = HelpController;
