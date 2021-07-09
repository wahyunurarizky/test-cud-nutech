const express = require('express');
const authController = require('../controllers/authControllers');
const viewController = require('../controllers/viewControllers');
// const scheduleController = require('../controllers/scheduleControllers');

const router = express.Router();

router.get('/login', (req, res) => {
  res.status(200).render('login');
});

router.use(authController.protect);

router.get('/', viewController.showItems);
router.get('/:slug', viewController.showDetail);

// router.get('/manage-teams', viewController.manageTeams);
// router.get('/manage-teams/:id', viewController.managePlayers);
// router.get('/manage-schedule', viewController.manageSchedules);
// router.get('/start', viewController.start);
// router.post('/start-now', scheduleController.start);
// router.get('/deleteSchedule', scheduleController.deleteAll);

module.exports = router;
