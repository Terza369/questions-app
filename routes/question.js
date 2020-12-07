const router = require('express').Router();
const questionController = require('../controllers/question');

router.get('/question-group/:id', questionController.getQuestionGroup);

router.get('/add-question/:id', questionController.getAddQuestion);
router.post('/add-question', questionController.postAddQuestion);

router.get('/edit-question/:questionGroupId/:questionId', questionController.getEditQuestion);
router.post('/edit-question', questionController.postEditQuestion);

router.post('/delete-question', questionController.postDeleteQuestion);

module.exports = router;