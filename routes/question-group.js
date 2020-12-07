const router = require('express').Router();
const questionGroupController = require('../controllers/question-group');

router.get('/', questionGroupController.getQuestionGroupList);

router.get('/add-question-group', questionGroupController.getAddQuestionGroup);
router.post('/add-question-group', questionGroupController.postAddQuestionGroup);

router.get('/edit-question-group/:id', questionGroupController.getEditQuestionGroup);
router.post('/edit-question-group', questionGroupController.postEditQuestionGroup);

router.post('/delete-question-group', questionGroupController.postDeleteQuestionGroup);

module.exports = router;