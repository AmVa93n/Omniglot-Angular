const Notification = require('../models/Notification.model');
const { formatDistanceToNow } = require('date-fns');

module.exports = async (req, res, next) => {
    const user = req.session.currentUser
    if (user) {
      const notifications = await Notification.find({ target: user._id }).sort({ createdAt: -1 }).populate('source')
      notifications.forEach(notif => {
        notif.timeDiff = formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })
      })
      res.locals.notifications = notifications;
      const unread = notifications.filter(n => !n.read).length
      res.locals.unread = unread;
    }
    next();
};