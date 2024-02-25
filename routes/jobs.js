const express = require('express');
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).patch(editJob).delete(deleteJob);

module.exports = router;
