const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  // Tipo de evento: page_visit, admin_action, login, logout, etc.
  eventType: {
    type: String,
    required: true,
    enum: ['page_visit', 'admin_action', 'login', 'logout', 'review_created', 'review_deleted', 'review_hidden', 'contact_form']
  },
  
  // Usuario que realizó la acción (opcional para visitas anónimas)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Página visitada o recurso afectado
  page: {
    type: String,
    default: null
  },
  
  // Detalles adicionales de la acción
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // IP del usuario
  ipAddress: {
    type: String,
    default: null
  },
  
  // User Agent del navegador
  userAgent: {
    type: String,
    default: null
  },
  
  // Timestamp automático
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
auditLogSchema.index({ eventType: 1, timestamp: -1 });
auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ page: 1, timestamp: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
