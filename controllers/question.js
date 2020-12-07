const QuestionGroup = require('../models/question-group');

exports.getQuestionGroup = (req, res, next) => {
    console.log('GET /question-group/' + req.params.id);

    QuestionGroup.findById(req.params.id).exec()
        .then(result => {
            res.render('question/question-group', {
                pageTitle: result.name,
                questionGroup: result
            })
        })
        .catch(err => console.log(err));
}

exports.getAddQuestion = (req, res, next) => {
    console.log('GET /add-question/' + req.params.id);

    res.render('question/edit-question', {
        pageTitle: 'New question',
        editing: false,
        questionGroupId: req.params.id
    });
}

exports.postAddQuestion = (req, res, next) => {
    console.log('POST /add-question/' + req.body.questionGroupId);

    QuestionGroup.findById(req.body.questionGroupId).exec()
        .then(result => {
            result.questions.push({
                title: req.body.title,
                content: req.body.content
            });
            return result.save();
        })
        .then(() => {
            res.redirect('question-group/' + req.body.questionGroupId);
        })
        .catch(err => console.log(err));

    
}

exports.getEditQuestion = (req, res, next) => {
    console.log('GET /edit-question');

    QuestionGroup.findById(req.params.questionGroupId).exec()
        .then(result => {
            res.render('question/edit-question', {
                pageTitle: 'New question',
                editing: true,
                questionGroupId: req.params.questionGroupId,
                question: result.questions.id(req.params.questionId)
            });
        })
        .catch(err => console.log(err));
}

exports.postEditQuestion = (req, res, next) => {
    console.log('POST /edit-question');

    QuestionGroup.findById(req.body.questionGroupId).exec()
        .then(result => {
            const question = result.questions.id(req.body.questionId);
            question.title = req.body.title;
            question.content = req.body.content;
            return result.save();
        })
        .then(() => {
            res.redirect('question-group/' + req.body.questionGroupId);
        })
        .catch(err => console.log(err));
}

exports.postDeleteQuestion = (req, res, next) => {
    console.log('POST /delete-question');

    QuestionGroup.findById(req.body.questionGroupId).exec()
        .then(result => {
            result.questions.pull(req.body.questionId);
            return result.save();
        })
        .then(() => {
            res.redirect('question-group/' + req.body.questionGroupId);
        })
        .catch(err => console.log(err));
}