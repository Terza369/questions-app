const QuestionGroup = require('../models/question-group');

exports.getQuestionGroupList = (req, res, next) => {
    console.log('GET /list-question-groups');

    QuestionGroup.find().select('-questions').exec()
        .then(result => {
            res.render('question-group/list-question-groups', {
                pageTitle: 'Question groups',
                questionGroups: result
            })
        })
        .catch(err => console.log(err));
}

exports.getAddQuestionGroup = (req, res, next) => {
    console.log('GET /add-question-group');

        res.render('question-group/edit-question-group', {
            pageTitle: 'New question group',
            editing: false
        });
}

exports.postAddQuestionGroup = (req, res, next) => {
    console.log('POST /add-question-group');

    const questionGroup = new QuestionGroup(req.body);

    questionGroup.save()
        .then(() => {
            res.status(201).redirect('/');
        })
        .catch(err => console.log(err));
}

exports.getEditQuestionGroup = (req, res, next) => {
    console.log('GET /edit-question-group');

    QuestionGroup.findById(req.params.id).exec()
        .then(result => {
            res.render('question-group/edit-question-group', {
                pageTitle: 'New question group',
                editing: true,
                questionGroup: result
            });
        })
        .catch(err => console.log(err));
}

exports.postEditQuestionGroup = (req, res, next) => {
    console.log('POST /edit-question-group');

    QuestionGroup.findOneAndUpdate({_id: req.body._id}, req.body).exec()
        .then(() => {
            res.status(201).redirect('/question-group/' + req.body._id);
        })
        .catch(err => console.log(err));
}

exports.postDeleteQuestionGroup = (req, res, next) => {
    console.log('POST /delete-question-group');

    QuestionGroup.deleteOne({ _id: req.body.id }).exec()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
}