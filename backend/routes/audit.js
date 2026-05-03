import express from 'express';
import AuditLog from '../models/AuditLog.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Middleware para registrar visitas de páginas (público)
router.post('/visit', async (req, res) => {
  try {
    const { page, details } = req.body;
    
    const log = new AuditLog({
      eventType: 'page_visit',
      page: page || req.body.path,
      details: details || {},
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
    
    await log.save();
    
    res.json({ success: true, message: 'Visit logged' });
  } catch (error) {
    console.error('Error logging visit:', error);
    res.status(500).json({ success: false, message: 'Error logging visit' });
  }
});

// Obtener todos los logs (solo admin)
router.get('/logs', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { limit = 50, skip = 0, eventType, userId, page } = req.query;
    
    const filter = {};
    if (eventType) filter.eventType = eventType;
    if (userId) filter.userId = userId;
    if (page) filter.page = page;
    
    const logs = await AuditLog
      .find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate('userId', 'name email');
    
    const total = await AuditLog.countDocuments(filter);
    
    res.json({
      success: true,
      logs,
      total,
      stats: {
        totalVisits: await AuditLog.countDocuments({ eventType: 'page_visit' }),
        totalAdminActions: await AuditLog.countDocuments({ eventType: 'admin_action' }),
        totalLogins: await AuditLog.countDocuments({ eventType: 'login' }),
        totalReviews: await AuditLog.countDocuments({ eventType: 'review_created' })
      }
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ success: false, message: 'Error fetching logs' });
  }
});

// Obtener estadísticas resumidas (solo admin)
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    
    const thisMonth = new Date();
    thisMonth.setDate(thisMonth.getDate() - 30);
    
    const [todayVisits, weekVisits, monthVisits, uniquePages] = await Promise.all([
      AuditLog.countDocuments({ eventType: 'page_visit', timestamp: { $gte: today } }),
      AuditLog.countDocuments({ eventType: 'page_visit', timestamp: { $gte: thisWeek } }),
      AuditLog.countDocuments({ eventType: 'page_visit', timestamp: { $gte: thisMonth } }),
      AuditLog.distinct('page', { eventType: 'page_visit' })
    ]);
    
    // Visitas por página
    const pageVisits = await AuditLog.aggregate([
      { $match: { eventType: 'page_visit' } },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // Eventos por tipo
    const eventsByType = await AuditLog.aggregate([
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      stats: {
        today: todayVisits,
        week: weekVisits,
        month: monthVisits,
        uniquePages: uniquePages.length,
        pageVisits,
        eventsByType
      }
    });
  } catch (error) {
    console.error('Error fetching audit stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
});

// Limpiar logs antiguos (solo admin)
router.delete('/cleanup', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { days = 30 } = req.body;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const result = await AuditLog.deleteMany({ timestamp: { $lt: cutoffDate } });
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} logs older than ${days} days`
    });
  } catch (error) {
    console.error('Error cleaning up logs:', error);
    res.status(500).json({ success: false, message: 'Error cleaning up logs' });
  }
});

export default router;
