import React, { useState, useEffect } from 'react';
import { MessageSquare, RefreshCw, AlertCircle, CheckCircle2, Clock, Send } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import notificationService from '../../services/notificationService';
import StatusBadge from '../atoms/StatusBadge';

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

function WhatsAppLogPanel({ companyEmail, companyPhone }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryingId, setRetryingId] = useState(null);

  // Get token from Redux store for authenticated API calls
  const token = useSelector((state) => state.authReducers.token);
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      setLoading(true);
      // We can filter by phone if available to make it "company-specific"
      const filters = companyPhone ? { recipientAddress: companyPhone } : {};
      const data = await notificationService.getLogs(filters, token);
      setLogs(data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
      setError('Gagal memuat log WhatsApp');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [companyPhone]);

  const handleRetry = async (logId) => {
    try {
      setRetryingId(logId);
      await notificationService.retryLog(logId, token);
      // Refresh logs after retry
      await fetchLogs();
    } catch (err) {
      alert(`Gagal mengirim ulang: ${err.message}`);
    } finally {
      setRetryingId(null);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'sent':
        return { tone: 'positive', icon: CheckCircle2, label: 'Terkirim' };
      case 'failed':
        return { tone: 'critical', icon: AlertCircle, label: 'Gagal' };
      case 'skipped':
        return { tone: 'warning', icon: Clock, label: 'Diskip' };
      default:
        return { tone: 'neutral', icon: Send, label: status };
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <MessageSquare size={16} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Aktivitas WhatsApp Terbaru</h3>
        </div>
        <button 
          onClick={fetchLogs}
          disabled={loading}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-600 transition-all"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="divide-y divide-slate-50">
        {loading && logs.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">Memuat data...</div>
        ) : error ? (
          <div className="p-8 text-center text-sm text-rose-500">{error}</div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">Belum ada aktivitas WhatsApp terdeteksi.</div>
        ) : (
          logs.map((log) => {
            const statusInfo = getStatusInfo(log.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div key={log.id} className="group p-4 transition-all hover:bg-slate-50/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{log.recipientAddress}</span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] font-medium text-slate-400">{formatDate(log.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {log.message}
                    </p>
                    {log.errorMessage && log.status === 'failed' && (
                      <p className="mt-1.5 text-[10px] font-medium text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                        Error: {log.errorMessage}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <StatusBadge tone={statusInfo.tone}>
                      <div className="flex items-center gap-1">
                        <StatusIcon size={10} />
                        <span>{statusInfo.label}</span>
                      </div>
                    </StatusBadge>

                    {(log.status === 'failed' || log.status === 'skipped') && (
                      <button
                        onClick={() => handleRetry(log.id)}
                        disabled={retryingId === log.id}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-brand-600 hover:text-brand-700 disabled:opacity-50"
                      >
                        {retryingId === log.id ? (
                          <RefreshCw size={10} className="animate-spin" />
                        ) : (
                          <RefreshCw size={10} />
                        )}
                        <span>Retry</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="bg-slate-50/30 px-5 py-3 text-center border-t border-slate-50">
        <button
          onClick={() => navigate('/notifications')}
          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-brand-600 transition-colors"
        >
          Lihat Semua Riwayat Notifikasi &rsaquo;
        </button>
      </div>
    </div>
  );
}

export default WhatsAppLogPanel;
