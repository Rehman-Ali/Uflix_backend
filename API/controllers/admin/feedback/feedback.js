const Feedback = require('../../../db/models/Feedback');
exports.GET_ALL_FEEDBACK = (req, res, next) => {
    Feedback.find()
    .exec()
    .then(allFeedbacks => {
        if (allFeedbacks.length < 0) {
            return res.status(404).json({ success: false, message: 'There is no feedback exists' })
        }
        res.status(200).json({ success: true, message: 'All Feedbacks', allFeedbacks, totalFeedbacks: allFeedbacks.length })
    })
    .catch(err => {
        res.status(500).json({ Error: 'Finding all feedbacks error :', err })
    })
}

exports.GET_ONE_FEEDBACK = (req, res, next) => {
    const { feedbackId } = req.params
    Feedback.findById(feedbackId)
        .select('_movieId title review ratings')
        .populate('_movieId')
        .exec()
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ success: false, message: 'Movie not found' })
            }
            res.status(200).json({ success: true, message: 'Movie found', movie, })
        })
        .catch(err => {
            res.status(500).json({ Error: err })
        })
}
exports.REMOVE_FEEDBACK = (req, res, next) => {
    const { feedbackId } = req.params
    Feedback.findByIdAndRemove({ _id: feedbackId })
        .exec()
        .then(feedback => {
            if (!feedback) {
                return res.status(404).json({ success: false, message: 'Feedback not found' })
            }
            return res.status(200).json({ success: true, message: 'Feedback Removed successfully', deletedfeedback: feedback, })
        })
        .catch(err => {
            console.log('Error during remove feedback:', err)
        })
}

exports.UPDATE_FEEDBACK = (req, res, next) => {
    Feedback.findByIdAndUpdate({ _id: req.params.feedbackId })
        .exec()
        .then(feedback => {
            if (!feedback) {
                return res.status(404).json({ success: false, Error: 'FeedBack of Movie not Found'  })
            }
            feedback.title = req.body.title;
            feedback.review = req.body.review;
            feedback.ratings = req.body.ratings;
            return feedback.save()
        })
        .then((updatedFeedback) => {
            res.status(200).json({
                success: true,
                message: 'Feedback updated successfully',
                updatedFeedback,
            })
        })
        .catch(err => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    return res.status(422).send({ succes: false, message: 'custom Mongodb error occur!' });
                }
            }
        })
}