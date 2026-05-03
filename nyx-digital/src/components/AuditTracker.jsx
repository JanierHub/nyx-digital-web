import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auditAPI } from '../services/api.js';

function AuditTracker() {
  const location = useLocation();

  useEffect(() => {
    // Log page visit
    const page = location.pathname;
    const details = {
      search: location.search,
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    };
    
    auditAPI.logVisit(page, details);
  }, [location]);

  return null; // This component doesn't render anything
}

export default AuditTracker;
