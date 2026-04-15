import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Mail,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Activity,
  Filter,
} from 'lucide-react';
import SurfaceCard from '../components/atoms/SurfaceCard';
import StatusBadge from '../components/atoms/StatusBadge';
import Spinner from '../components/atoms/Spinner';
import notificationService from '../services/notificationService';

// ── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (value) => {
  if (!value) return '-';
  const d = new Date(value);
  return d.toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(Number(n || 0));

const STATUS_MAP = {
  sent:    { tone: 'success', icon: CheckCircle2, label: 'Terkirim' },
  failed:  { tone: 'danger',  icon: AlertCircle,  label: 'Gagal' },
  skipped: { tone: 'warning', icon: Clock,         label: 'Diskip' },
  pending: { tone: 'neutral', icon: Clock,         label: 'Pending' },
};

const CHANNEL_MAP = {
  whatsapp: { icon: MessageSquare, label: 'WhatsApp', tone: 'success' },
  email:    { icon: Mail,          label: 'Email',    tone: 'info' },
};

const ITEMS_PER_PAGE = 15;

// ── KPI Cards ────────────────────────────────────────────────────────────────

function KpiCard({ icon: Icon, label, value, tone, sub }) {
  const tones = {
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    danger:  'bg-rose-50 text-rose-600 border-rose-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    info:    'bg-sky-50 text-sky-600 border-sky-100',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  const iconTones = {
    success: 'bg-emerald-100 text-emerald-600',
    danger:  'bg-rose-100 text-rose-600',
    warning: 'bg-amber-100 text-amber-600',
    info:    'bg-sky-100 text-sky-600',
    neutral: 'bg-slate-100 text-slate-600',
  };

  return (
    <SurfaceCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconTones[tone] || iconTones.neutral}`}>
          <Icon size={20} />
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${tones[tone] || tones.neutral}`}>
          {label}
        </span>
      </div>
      <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{formatNumber(value)}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </SurfaceCard>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

function NotificationsPage() {
  const token = useSelector((state) => state.authReducers.token);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [retryingId, setRetryingId] = useState(null);
  const [error, setError] = useState(null);

  // Filters
  const [channelFilter, setChannelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Selected log for modal (future detail view)
  // const [selectedLog, setSelectedLog] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const data = await notificationService.getStats(token);
      setStats(data);
    } catch {
      // stats failure is non-critical
    } finally {
      setStatsLoading(false);
    }
  }, [token]);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = { limit: 200 };
      if (channelFilter !== 'all') filters.channel = channelFilter;
      if (statusFilter !== 'all') filters.status = statusFilter;
      const data = await notificationService.getLogs(filters, token);
      setLogs(data || []);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || 'Gagal memuat log notifikasi');
    } finally {
      setLoading(false);
    }
  }, [token, channelFilter, statusFilter]);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const handleRetry = async (logId) => {
    try {
      setRetryingId(logId);
      await notificationService.retryLog(logId, token);
      await Promise.all([fetchLogs(), fetchStats()]);
    } catch (err) {
      alert(`Gagal mengirim ulang: ${err.message}`);
    } finally {
      setRetryingId(null);
    }
  };

  // Client-side search on recipient
  const filteredLogs = useMemo(() => {
    if (!search.trim()) return logs;
    const q = search.trim().toLowerCase();
    return logs.filter(
      (l) =>
        l.recipientAddress?.toLowerCase().includes(q) ||
        l.message?.toLowerCase().includes(q) ||
        l.eventKey?.toLowerCase().includes(q),
    );
  }, [logs, search]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / ITEMS_PER_PAGE));
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  // Reset page on search change
  useEffect(() => setCurrentPage(1), [search]);

  return (
    <div className="page-shell">
      {/* ── Header ── */}
      <section className="page-header">
        <div>
          <p className="eyebrow">Audit & Monitoring Gateway</p>
          <h1 className="page-title">Notification Log Center</h1>
          <p className="page-subtitle">
            Pantau status pengiriman WhatsApp dan Email secara real-time. Kirim ulang pesan yang gagal langsung dari sini.
          </p>
        </div>
        <button
          onClick={() => { fetchLogs(); fetchStats(); }}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </section>

      {/* ── KPI Cards ── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={CheckCircle2}
          label="Total Terkirim"
          value={statsLoading ? '...' : stats?.totals?.sent}
          tone="success"
          sub={statsLoading ? null : `WA: ${stats?.whatsapp?.sent || 0} | Email: ${stats?.email?.sent || 0}`}
        />
        <KpiCard
          icon={AlertCircle}
          label="Gagal"
          value={statsLoading ? '...' : stats?.totals?.failed}
          tone="danger"
          sub={statsLoading ? null : `WA: ${stats?.whatsapp?.failed || 0} | Email: ${stats?.email?.failed || 0}`}
        />
        <KpiCard
          icon={Clock}
          label="Diskip (Anti-Spam)"
          value={statsLoading ? '...' : stats?.totals?.skipped}
          tone="warning"
          sub={statsLoading ? null : `WA: ${stats?.whatsapp?.skipped || 0} | Email: ${stats?.email?.skipped || 0}`}
        />
        <KpiCard
          icon={Activity}
          label="Total Aktivitas"
          value={statsLoading ? '...' : stats?.totals?.total}
          tone="info"
          sub={statsLoading ? null : `WA: ${stats?.whatsapp?.total || 0} | Email: ${stats?.email?.total || 0}`}
        />
      </section>

      {/* ── Filters & Table ── */}
      <SurfaceCard className="overflow-hidden p-0">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-5 py-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Filter size={15} />
            <span className="text-sm font-semibold">Filter:</span>
          </div>

          {/* Channel filter pills */}
          <div className="flex gap-1.5">
            {['all', 'whatsapp', 'email'].map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  channelFilter === ch
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-500 hover:text-slate-700'
                }`}
              >
                {ch === 'all' ? 'Semua Channel' : ch === 'whatsapp' ? '💬 WhatsApp' : '✉️ Email'}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Status filter pills */}
          <div className="flex gap-1.5">
            {['all', 'sent', 'failed', 'skipped'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  statusFilter === st
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-500 hover:text-slate-700'
                }`}
              >
                {st === 'all' ? 'Semua Status' : st === 'sent' ? '✅ Terkirim' : st === 'failed' ? '❌ Gagal' : '⏭ Diskip'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative ml-auto min-w-[220px]">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor / pesan..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm text-slate-700 outline-none ring-brand-200 transition focus:border-brand-300 focus:ring-2"
            />
          </div>
        </div>

        {/* Table body */}
        {loading ? (
          <div className="flex justify-center py-16"><Spinner label="Memuat log notifikasi..." /></div>
        ) : error ? (
          <div className="py-16 text-center text-sm text-rose-500">{error}</div>
        ) : filteredLogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 m-5 bg-slate-50 px-4 py-12 text-center text-sm text-slate-400">
            Tidak ada log yang cocok dengan filter ini.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    <th className="px-5 py-3">Penerima</th>
                    <th className="px-5 py-3">Pesan</th>
                    <th className="px-5 py-3">Event</th>
                    <th className="px-5 py-3">Channel</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Waktu</th>
                    <th className="px-5 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log) => {
                    const statusInfo = STATUS_MAP[log.status] || STATUS_MAP.pending;
                    const StatusIcon = statusInfo.icon;
                    const channelInfo = CHANNEL_MAP[log.channel] || { label: log.channel, tone: 'neutral', icon: Activity };
                    const ChannelIcon = channelInfo.icon;
                    const canRetry = log.status === 'failed' || log.status === 'skipped';

                    return (
                      <tr
                        key={log.id}
                        className="group border-b border-slate-50 transition last:border-0 hover:bg-slate-50/60"
                      >
                        <td className="px-5 py-3">
                          <p className="text-xs font-bold text-slate-900">{log.recipientAddress || '-'}</p>
                          {log.retryCount > 0 && (
                            <p className="mt-0.5 text-[10px] text-slate-400">Retry: {log.retryCount}×</p>
                          )}
                        </td>
                        <td className="px-5 py-3 max-w-[280px]">
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{log.message || '-'}</p>
                          {log.errorMessage && log.status === 'failed' && (
                            <p className="mt-1 text-[10px] font-medium text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
                              {log.errorMessage}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-[10px] text-slate-500 font-mono">{log.eventKey || '-'}</span>
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge tone={channelInfo.tone}>
                            <span className="flex items-center gap-1">
                              <ChannelIcon size={10} />
                              {channelInfo.label}
                            </span>
                          </StatusBadge>
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge tone={statusInfo.tone}>
                            <span className="flex items-center gap-1">
                              <StatusIcon size={10} />
                              {statusInfo.label}
                            </span>
                          </StatusBadge>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap text-[11px] text-slate-400">
                          {formatDate(log.createdAt)}
                        </td>
                        <td className="px-5 py-3">
                          {canRetry && (
                            <button
                              onClick={() => handleRetry(log.id)}
                              disabled={retryingId === log.id}
                              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-brand-600 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 disabled:opacity-50"
                            >
                              <RefreshCw size={10} className={retryingId === log.id ? 'animate-spin' : ''} />
                              Retry
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 px-5 py-3">
              <p className="text-xs text-slate-400">
                Menampilkan {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredLogs.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredLogs.length)} dari {filteredLogs.length} entri
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                </button>
                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  if (totalPages > 7 && page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 1) {
                    if (Math.abs(page - currentPage) === 2) return <span key={page} className="text-slate-300 text-xs">…</span>;
                    return null;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 rounded-lg text-xs font-bold transition ${
                        currentPage === page
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                          : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </>
        )}
      </SurfaceCard>
    </div>
  );
}

export default NotificationsPage;
