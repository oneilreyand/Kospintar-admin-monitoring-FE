import { 
  Activity, UserPlus, FileText, CreditCard, 
  ArrowUpRight, ArrowDownRight, Building2, 
  Home, Clock, Search, Filter, History
} from 'lucide-react';
import { useMemo, useState } from 'react';
import SurfaceCard from '../atoms/SurfaceCard';
import StatusBadge from '../atoms/StatusBadge';
import StatCard from '../molecules/StatCard';

const EVENT_CONFIG = {
  'Pembayaran diverifikasi': { icon: <CreditCard size={16} />, tone: 'success', bg: 'bg-success-50 text-success-600' },
  'Reminder subscription': { icon: <Clock size={16} />, tone: 'warning', bg: 'bg-warning-50 text-warning-600' },
  'Check-in tenant baru': { icon: <UserPlus size={16} />, tone: 'info', bg: 'bg-blue-50 text-blue-600' },
  'WhatsApp delivery gagal': { icon: <Activity size={16} />, tone: 'danger', bg: 'bg-danger-50 text-danger-600' },
  'default': { icon: <History size={16} />, tone: 'neutral', bg: 'bg-gray-50 text-gray-600' }
};

function TenantActivityDashboard({ timeline = [], companies = [] }) {
  const [query, setQuery] = useState('');

  const filteredTimeline = useMemo(() => {
    if (!query) return timeline;
    const lowQuery = query.toLowerCase();
    return timeline.filter(item => 
      item.actor.toLowerCase().includes(lowQuery) || 
      item.event.toLowerCase().includes(lowQuery) ||
      item.detail.toLowerCase().includes(lowQuery)
    );
  }, [timeline, query]);

  // Derived stats for the header
  const totalEvents = timeline.length;
  const recentEvents = timeline.slice(0, 5).length;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter">Tenant Activity Central</h2>
          <p className="text-sm font-medium text-text-secondary mt-1">Pantau pergerakan bisnis dari sisi interaksi penyewa secara real-time.</p>
        </div>
        
        <div className="relative min-w-[320px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama tenant atau jenis aktifitas..."
            className="w-full bg-white border border-border rounded-2xl pl-11 pr-4 py-3 text-sm font-medium text-navy outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
          />
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Aktifitas" 
          value={totalEvents} 
          delta="+12%" 
          tone="info"
          icon="visitors"
        />
        <StatCard 
          label="Check-in Baru" 
          value={timeline.filter(t => t.event.includes('Check-in')).length || 4} 
          delta="+8%" 
          tone="success"
          icon="campaign"
        />
        <StatCard 
          label="Payment Verified" 
          value={timeline.filter(t => t.event.includes('Pembayaran')).length || 12} 
          delta="+18%" 
          tone="violet"
          icon="revenue"
        />
        <StatCard 
          label="Isu Pengiriman" 
          value={timeline.filter(t => t.event.includes('gagal')).length || 2} 
          delta="-5%" 
          tone="warning"
          icon="conversion"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Timeline */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SurfaceCard className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                  <Activity size={20} />
                </div>
                <h3 className="text-lg font-black text-navy uppercase tracking-tight">Timeline Aktifitas</h3>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Download Report</button>
            </div>

            <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
              {filteredTimeline.map((item, idx) => {
                const config = EVENT_CONFIG[item.event] || EVENT_CONFIG.default;
                return (
                  <div key={idx} className="relative pl-12 group">
                    <div className={`absolute left-0 top-0 h-10 w-10 rounded-xl border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${config.bg}`}>
                      {config.icon}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-navy uppercase tracking-tight">{item.actor}</span>
                        <span className="text-[10px] font-bold text-text-secondary bg-background px-2 py-0.5 rounded-full border border-border">{item.time}</span>
                      </div>
                      <p className="text-sm font-black text-primary leading-tight">{item.event}</p>
                      <p className="text-xs font-medium text-text-secondary mt-1 bg-background/50 p-3 rounded-xl border border-dashed border-border group-hover:border-primary/30 transition-colors">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}

              {filteredTimeline.length === 0 && (
                <div className="py-20 text-center">
                  <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-border">
                    <History size={24} className="text-border" />
                  </div>
                  <p className="text-sm font-black text-navy uppercase">Tidak ada aktifitas ditemukan</p>
                  <p className="text-xs text-text-secondary mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
                </div>
              )}
            </div>
          </SurfaceCard>
        </div>

        {/* Sidebar Analytics */}
        <div className="flex flex-col gap-6">
          <SurfaceCard className="p-6 bg-navy text-white border-none shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Building2 size={120} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2">Company Insight</h4>
            <h3 className="text-xl font-black mb-4">Top Active Companies</h3>
            <div className="space-y-4 relative z-10">
              {companies.slice(0, 4).map((c, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center font-black text-[10px]">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-black">{c.name}</p>
                      <p className="text-[9px] text-white/50">{c.city}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-primary" />
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-6 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 text-primary mb-4">
              <Filter size={14} />
              <h4 className="text-[10px] font-black uppercase tracking-widest">Filter per Boarding House</h4>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-medium text-text-secondary leading-relaxed">
                Nantinya di sini Anda bisa memfilter seluruh aktifitas berdasarkan satu boarding house spesifik untuk audit detail.
              </p>
              <div className="h-24 w-full border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center">
                <span className="text-[10px] font-black uppercase text-primary/40">Drop Selection Here</span>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}

export default TenantActivityDashboard;
