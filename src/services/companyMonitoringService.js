import mockMonitoringData from '../mocks/monitoringMock';
import httpClient from './httpClient';

const INDONESIA_BOUNDS = {
  minLat: -11.0,
  maxLat: 6.5,
  minLon: 95.0,
  maxLon: 141.5,
};

const CITY_COORDINATES = {
  Jakarta: { latitude: -6.2087634, longitude: 106.845599 },
  Bandung: { latitude: -6.9174639, longitude: 107.6191228 },
  Yogyakarta: { latitude: -7.7955798, longitude: 110.3694896 },
  Surabaya: { latitude: -7.2574719, longitude: 112.7520883 },
  Semarang: { latitude: -6.966667, longitude: 110.416664 },
  Depok: { latitude: -6.4024844, longitude: 106.7942405 },
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const normalizeCoordinate = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const deriveLifecycle = (subscription) => {
  const now = new Date();
  const status = subscription?.status || 'unknown';
  const validUntil = subscription?.validUntil ? new Date(subscription.validUntil) : null;
  const daysLeft = validUntil ? Math.ceil((validUntil.getTime() - now.getTime()) / 86400000) : null;

  if (status === 'active') {
    const isTrial = subscription?.planId === 'trial';

    if (validUntil && validUntil < now) {
      return {
        lifecycle: 'churn',
        tone: 'danger',
        label: 'Churn',
        detail: 'Langganan kedaluwarsa',
        daysLeft,
      };
    }

    if (daysLeft !== null && daysLeft <= 7) {
      return {
        lifecycle: isTrial ? 'trial_expiring' : 'expiring',
        tone: 'warning',
        label: isTrial ? `Trial berakhir (${Math.max(daysLeft, 0)} hari)` : `Akan berakhir (${Math.max(daysLeft, 0)} hari)`,
        detail: isTrial ? 'Konversi ke berbayar' : 'Butuh follow-up renewal',
        daysLeft,
      };
    }

    return {
      lifecycle: isTrial ? 'trial' : 'subscribed',
      tone: isTrial ? 'info' : 'success',
      label: isTrial ? 'Masa Trial' : 'Berlangganan aktif',
      detail: isTrial ? 'Proses onboarding' : 'Coverage aman',
      daysLeft,
    };
  }

  if (status === 'pending_payment') {
    return {
      lifecycle: 'pending_payment',
      tone: 'warning',
      label: 'Pending payment',
      detail: 'Butuh konfirmasi pembayaran',
      daysLeft,
    };
  }

  if (status === 'inactive') {
    return {
      lifecycle: 'churn',
      tone: 'danger',
      label: 'Churn',
      detail: 'Langganan nonaktif',
      daysLeft,
    };
  }

  return {
    lifecycle: 'non_subscribed',
    tone: 'neutral',
    label: 'Belum berlangganan',
    detail: 'Prospek win-back',
    daysLeft,
  };
};

const extractCity = (address = '') => {
  if (!address || typeof address !== 'string') return 'Unknown';
  const parts = address.split(',').map((value) => value.trim()).filter(Boolean);
  return parts[parts.length - 1] || parts[0] || 'Unknown';
};

const calculateRiskScore = ({ lifecycle, occupancyRate, activeTenants }) => {
  let score = 20;

  if (lifecycle === 'churn') score += 55;
  if (lifecycle === 'pending_payment') score += 35;
  if (lifecycle === 'expiring') score += 25;
  if (occupancyRate < 55) score += 15;
  if (activeTenants === 0) score += 10;

  return clamp(score, 0, 100);
};

const mapRiskPriority = (riskScore) => {
  if (riskScore >= 70) return 'High';
  if (riskScore >= 45) return 'Medium';
  return 'Low';
};

const deriveHealth = ({
  health,
  occupancyRate,
  maintenanceRate,
  overdueBillingCount,
  expiringContracts,
  lifecycle,
}) => {
  if (health?.status) {
    return {
      score: Number(health.score || 0),
      status: health.status,
      tone: health.tone || (health.status === 'healthy' ? 'success' : health.status === 'warning' ? 'warning' : 'danger'),
      label: health.label || (health.status === 'healthy' ? 'Healthy' : health.status === 'warning' ? 'Warning' : 'Critical'),
      reasons: Array.isArray(health.reasons) ? health.reasons : [],
      recommendations: Array.isArray(health.recommendations) ? health.recommendations : [],
      staleDays: health.staleDays ?? null,
    };
  }

  let score = 84;
  const reasons = [];
  const recommendations = [];

  if (lifecycle === 'churn') {
    score -= 30;
    reasons.push('Langganan tidak aktif atau sudah churn.');
    recommendations.push('Lakukan follow up reaktivasi subscription.');
  } else if (lifecycle === 'pending_payment') {
    score -= 18;
    reasons.push('Subscription sedang pending payment.');
    recommendations.push('Konfirmasi pembayaran langganan.');
  }

  if (occupancyRate < 40) {
    score -= 18;
    reasons.push(`Okupansi rendah (${occupancyRate}%).`);
    recommendations.push('Dorong promo untuk meningkatkan okupansi.');
  } else if (occupancyRate < 65) {
    score -= 10;
    reasons.push(`Okupansi perlu perhatian (${occupancyRate}%).`);
  }

  if (maintenanceRate >= 15) {
    score -= 12;
    reasons.push(`Kamar maintenance tinggi (${maintenanceRate}%).`);
    recommendations.push('Prioritaskan perbaikan kamar maintenance.');
  }

  if (overdueBillingCount > 0) {
    score -= Math.min(12, overdueBillingCount * 2);
    reasons.push(`${overdueBillingCount} tagihan overdue masih terbuka.`);
    recommendations.push('Lakukan reminder tenant atas tagihan overdue.');
  }

  if (expiringContracts > 0) {
    score -= Math.min(8, expiringContracts);
    reasons.push(`${expiringContracts} kontrak akan berakhir dalam 30 hari.`);
  }

  const normalizedScore = clamp(Math.round(score), 0, 100);
  const status = normalizedScore >= 80 ? 'healthy' : normalizedScore >= 60 ? 'warning' : 'critical';

  return {
    score: normalizedScore,
    status,
    tone: status === 'healthy' ? 'success' : status === 'warning' ? 'warning' : 'danger',
    label: status === 'healthy' ? 'Healthy' : status === 'warning' ? 'Warning' : 'Critical',
    reasons: reasons.slice(0, 5),
    recommendations: [...new Set(recommendations)].slice(0, 4),
    staleDays: null,
  };
};

const toMapPoint = (branch, companyName, companyId) => {
  const latitude = normalizeCoordinate(branch.latitude);
  const longitude = normalizeCoordinate(branch.longitude);

  if (latitude === null || longitude === null) return null;
  if (
    latitude < INDONESIA_BOUNDS.minLat ||
    latitude > INDONESIA_BOUNDS.maxLat ||
    longitude < INDONESIA_BOUNDS.minLon ||
    longitude > INDONESIA_BOUNDS.maxLon
  ) {
    return null;
  }

  return {
    id: branch.id,
    companyId,
    companyName,
    branchName: branch.name,
    city: extractCity(branch.address),
    latitude,
    longitude,
    activeTenants: Number(branch.activeTenants || 0),
    roomCount: Number(branch.totalRooms || 0),
  };
};

const composeSnapshot = ({ companies, boardingHouses, summaryByHouse, subscriptionByCompany }) => {
  const housesByCompany = boardingHouses.reduce((accumulator, house) => {
    const companyId = house.companyId || house.company?.id;
    if (!companyId) return accumulator;
    if (!accumulator.has(companyId)) accumulator.set(companyId, []);
    accumulator.get(companyId).push(house);
    return accumulator;
  }, new Map());

  const companyInsights = companies.map((company) => {
    const houses = housesByCompany.get(company.id) || [];
    const subscription = subscriptionByCompany.get(company.id) || null;
    const lifecycle = deriveLifecycle(subscription);

    const branches = houses.map((house) => {
      const summary = summaryByHouse.get(house.id) || {};
      const totalRooms = Number(summary.totalRooms || 0);
      const occupiedRooms = Number(summary.occupiedRooms || 0);
      const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : Number(summary.occupancyRate || 0);

      return {
        id: house.id,
        name: house.name || 'Branch tanpa nama',
        address: house.address || company.address || '-',
        latitude: normalizeCoordinate(house.latitude),
        longitude: normalizeCoordinate(house.longitude),
        totalRooms,
        occupiedRooms,
        availableRooms: Number(summary.availableRooms ?? Math.max(totalRooms - occupiedRooms, 0)),
        maintenanceRooms: Number(summary.maintenanceRooms || 0),
        activeTenants: Number(summary.activeTenants || 0),
        activeContracts: Number(summary.activeContracts || 0),
        occupancyRate: Number(occupancyRate.toFixed(2)),
        currentMonthlyRevenue: Number(summary.currentMonthlyRevenue || 0),
        maintenanceRate: Number(summary.maintenanceRate || 0),
        expiringContracts: Number(summary.expiringContracts || 0),
      };
    });

    const branchCount = branches.length;
    const roomCount = branches.reduce((sum, branch) => sum + branch.totalRooms, 0);
    const occupiedRooms = branches.reduce((sum, branch) => sum + branch.occupiedRooms, 0);
    const activeTenants = branches.reduce((sum, branch) => sum + branch.activeTenants, 0);
    const activeContracts = branches.reduce((sum, branch) => sum + branch.activeContracts, 0);
    const monthlyRevenue = branches.reduce((sum, branch) => sum + branch.currentMonthlyRevenue, 0);
    const occupancyRate = roomCount > 0 ? Number(((occupiedRooms / roomCount) * 100).toFixed(2)) : 0;
    const maintenanceRooms = branches.reduce((sum, branch) => sum + Number(branch.maintenanceRooms || 0), 0);
    const availableRooms = branches.reduce((sum, branch) => sum + Number(branch.availableRooms || 0), 0);
    const maintenanceRate = roomCount > 0 ? Number(((maintenanceRooms / roomCount) * 100).toFixed(2)) : 0;
    const riskScore = calculateRiskScore({
      lifecycle: lifecycle.lifecycle,
      occupancyRate,
      activeTenants,
    });
    const metrics = {
      overdueBillingCount: Number(company.metrics?.overdueBillingCount || 0),
      unpaidBillingAmount: Number(company.metrics?.unpaidBillingAmount || 0),
      pendingPaymentCount: Number(company.metrics?.pendingPaymentCount || 0),
      verifiedPaymentCount: Number(company.metrics?.verifiedPaymentCount || 0),
      expiringContracts: Number(company.metrics?.expiringContracts || branches.reduce((sum, branch) => sum + Number(branch.expiringContracts || 0), 0)),
      maintenanceRooms,
      maintenanceRate,
    };
    const health = deriveHealth({
      health: company.health,
      occupancyRate,
      maintenanceRate,
      overdueBillingCount: metrics.overdueBillingCount,
      expiringContracts: metrics.expiringContracts,
      lifecycle: lifecycle.lifecycle,
    });

    return {
      id: company.id,
      name: company.name || 'Company tanpa nama',
      address: company.address || '-',
      ownerUserId: company.userId || null,
      cities: [...new Set(branches.map((branch) => extractCity(branch.address)))],
      branchCount,
      roomCount,
      occupiedRooms,
      availableRooms,
      maintenanceRooms,
      activeTenants,
      activeContracts,
      occupancyRate,
      monthlyRevenue,
      metrics,
      health,
      lastActivityAt: company.lastActivityAt || null,
      subscription: subscription
        ? {
            status: subscription.status || 'unknown',
            planId: subscription.planId || '-',
            validUntil: subscription.validUntil || null,
          }
        : null,
      lifecycle,
      riskScore,
      riskPriority: mapRiskPriority(riskScore),
      branches,
    };
  });

  const totals = companyInsights.reduce(
    (accumulator, company) => {
      const { lifecycle: lc } = company.lifecycle;
      const isTrial = lc === 'trial' || lc === 'trial_expiring';
      const isSubscribed = lc === 'subscribed' || lc === 'expiring' || isTrial;

      return {
        totalCompanies: accumulator.totalCompanies + 1,
        subscribedCount: accumulator.subscribedCount + (isSubscribed ? 1 : 0),
        trialCount: accumulator.trialCount + (isTrial ? 1 : 0),
        nonSubscribedCount: accumulator.nonSubscribedCount + (!isSubscribed ? 1 : 0),
        churnCount: accumulator.churnCount + (lc === 'churn' ? 1 : 0),
        expiringCount: accumulator.expiringCount + (lc === 'expiring' || lc === 'trial_expiring' ? 1 : 0),
        pendingPaymentCount: accumulator.pendingPaymentCount + (lc === 'pending_payment' ? 1 : 0),
        healthyCount: accumulator.healthyCount + (company.health.status === 'healthy' ? 1 : 0),
        warningCount: accumulator.warningCount + (company.health.status === 'warning' ? 1 : 0),
        criticalCount: accumulator.criticalCount + (company.health.status === 'critical' ? 1 : 0),
        averageHealthScoreTotal: accumulator.averageHealthScoreTotal + company.health.score,
        totalBranches: accumulator.totalBranches + company.branchCount,
        totalRooms: accumulator.totalRooms + company.roomCount,
        activeTenants: accumulator.activeTenants + company.activeTenants,
        monthlyRevenue: accumulator.monthlyRevenue + company.monthlyRevenue,
        occupiedRooms: accumulator.occupiedRooms + company.occupiedRooms,
        maintenanceRooms: accumulator.maintenanceRooms + company.maintenanceRooms,
        overdueBillingCount: accumulator.overdueBillingCount + Number(company.metrics?.overdueBillingCount || 0),
      };
    },
    {
      totalCompanies: 0,
      subscribedCount: 0,
      trialCount: 0,
      nonSubscribedCount: 0,
      churnCount: 0,
      expiringCount: 0,
      pendingPaymentCount: 0,
      healthyCount: 0,
      warningCount: 0,
      criticalCount: 0,
      averageHealthScoreTotal: 0,
      totalBranches: 0,
      totalRooms: 0,
      activeTenants: 0,
      monthlyRevenue: 0,
      occupiedRooms: 0,
      maintenanceRooms: 0,
      overdueBillingCount: 0,
    },
  );

  totals.averageOccupancy = totals.totalRooms > 0
    ? Number(((totals.occupiedRooms / totals.totalRooms) * 100).toFixed(2))
    : 0;
  totals.averageHealthScore = totals.totalCompanies > 0
    ? Number((totals.averageHealthScoreTotal / totals.totalCompanies).toFixed(1))
    : 0;
  totals.maintenanceRate = totals.totalRooms > 0
    ? Number(((totals.maintenanceRooms / totals.totalRooms) * 100).toFixed(2))
    : 0;

  const mapPoints = companyInsights
    .flatMap((company) => company.branches.map((branch) => toMapPoint(branch, company.name, company.id)))
    .filter(Boolean);

  const winbackQueue = companyInsights
    .filter((company) => ['churn', 'pending_payment', 'expiring'].includes(company.lifecycle.lifecycle) || company.health.status === 'critical')
    .sort((left, right) => left.health.score - right.health.score || right.riskScore - left.riskScore);

  return {
    generatedAt: new Date().toISOString(),
    totals,
    companies: companyInsights,
    mapPoints,
    winbackQueue,
  };
};

const getFirstAvailable = async (token, paths) => {
  let lastError = null;

  for (const path of paths) {
    try {
      const payload = await httpClient.get(path, { token });
      return payload;
    } catch (error) {
      if (error?.status === 401 || error?.status === 403) {
        throw error;
      }
      lastError = error;
    }
  }

  throw lastError || new Error('Semua endpoint gagal diakses.');
};

const fetchCompaniesSnapshot = async (token) => {
  const result = await getFirstAvailable(token, [
    '/api/companies/monitoring-snapshot',
  ]);
  const companyList = Array.isArray(result) ? result : [];

  const boardingHouses = [];
  const summaryPairs = [];
  const subscriptionPairs = [];

  companyList.forEach((company) => {
    subscriptionPairs.push([company.id, company.subscription]);

    (company.branches || []).forEach((branch) => {
      boardingHouses.push({
        ...branch,
        companyId: company.id,
      });

      summaryPairs.push([branch.id, {
        totalRooms: branch.totalRooms,
        occupiedRooms: branch.occupiedRooms,
        availableRooms: branch.availableRooms,
        maintenanceRooms: branch.maintenanceRooms,
        activeTenants: branch.activeTenants,
        activeContracts: branch.activeContracts,
        currentMonthlyRevenue: branch.currentMonthlyRevenue,
        occupancyRate: branch.occupancyRate,
        maintenanceRate: branch.maintenanceRate,
        expiringContracts: branch.expiringContracts,
      }]);
    });
  });

  return composeSnapshot({
    companies: companyList,
    boardingHouses,
    summaryByHouse: new Map(summaryPairs),
    subscriptionByCompany: new Map(subscriptionPairs),
  });
};

const ensureArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

const fetchLegacySnapshot = async (token) => {
  const companiesPayload = await getFirstAvailable(token, [
    '/api/companies',
  ]);
  const companies = ensureArray(companiesPayload);

  if (!companies.length) {
    return composeSnapshot({
      companies: [],
      boardingHouses: [],
      summaryByHouse: new Map(),
      subscriptionByCompany: new Map(),
    });
  }

  let boardingHouses = [];

  try {
    const housesPayload = await getFirstAvailable(token, [
      '/api/boarding-houses',
    ]);
    boardingHouses = ensureArray(housesPayload);
  } catch (_housesError) {
    boardingHouses = companies.flatMap((company) => (
      (company.branches || []).map((branch) => ({
        ...branch,
        companyId: branch.companyId || company.id,
      }))
    ));
  }

  const summaryPairs = [];
  await Promise.all(
    boardingHouses.map(async (house) => {
      if (!house?.id) return;

      const fallbackSummary = {
        totalRooms: house.totalRooms ?? house.roomCount ?? 0,
        occupiedRooms: house.occupiedRooms ?? 0,
        activeTenants: house.activeTenants ?? 0,
        activeContracts: house.activeContracts ?? 0,
        currentMonthlyRevenue: house.currentMonthlyRevenue ?? 0,
        occupancyRate: house.occupancyRate ?? 0,
      };

      try {
        const summary = await getFirstAvailable(token, [
          `/api/boarding-houses/${house.id}/summary`,
        ]);
        summaryPairs.push([house.id, {
          ...fallbackSummary,
          ...(summary || {}),
        }]);
      } catch (_summaryError) {
        summaryPairs.push([house.id, fallbackSummary]);
      }
    }),
  );

  const subscriptionByCompany = new Map(
    companies.map((company) => [company.id, company.subscription || null]),
  );

  return composeSnapshot({
    companies,
    boardingHouses,
    summaryByHouse: new Map(summaryPairs),
    subscriptionByCompany,
  });
};

const buildFallbackSnapshot = () => {
  const now = Date.now();
  const fallbackCompanies = (mockMonitoringData.companies || []).map((company, index) => {
    const city = company.city || 'Jakarta';
    const seedCoordinates = CITY_COORDINATES[city] || CITY_COORDINATES.Jakarta;
    const branchCount = index % 2 === 0 ? 2 : 1;
    const branches = Array.from({ length: branchCount }).map((_, branchIndex) => {
      const latJitter = (branchIndex * 0.04) + (index * 0.01);
      const lonJitter = (branchIndex * 0.05) + (index * 0.02);
      const totalRooms = Math.max(20, Math.round((company.activeTenants || 0) * 1.45) + (branchIndex * 8));
      const occupiedRooms = Math.min(totalRooms, Math.round(totalRooms * (0.62 + (index * 0.04))));
      const activeTenants = Math.max(0, Math.round((company.activeTenants || 0) / branchCount));

      return {
        id: `mock-branch-${index + 1}-${branchIndex + 1}`,
        name: `${company.company} - Cabang ${branchIndex + 1}`,
        address: `${city}, Indonesia`,
        latitude: seedCoordinates.latitude + latJitter,
        longitude: seedCoordinates.longitude + lonJitter,
        totalRooms,
        occupiedRooms,
        activeTenants,
        activeContracts: Math.round(activeTenants * 0.9),
        occupancyRate: Number(((occupiedRooms / totalRooms) * 100).toFixed(2)),
        currentMonthlyRevenue: Math.round(activeTenants * 950000),
      };
    });

    const subscriptionText = String(company.subscription || '').toLowerCase();
    let subscription = { status: 'inactive', planId: 'basic_monthly', validUntil: null };
    if (subscriptionText.includes('aktif')) {
      subscription = {
        status: 'active',
        planId: 'pro_monthly',
        validUntil: new Date(now + (32 * 86400000)).toISOString(),
      };
    } else if (subscriptionText.includes('h-')) {
      const daysLeft = Number(subscriptionText.replace(/[^0-9]/g, '')) || 5;
      subscription = {
        status: 'active',
        planId: 'basic_monthly',
        validUntil: new Date(now + (daysLeft * 86400000)).toISOString(),
      };
    }

    return {
      id: `mock-company-${index + 1}`,
      name: company.company,
      address: `${city}, Indonesia`,
      userId: `mock-owner-${index + 1}`,
      subscription,
      branches,
    };
  });

  const companies = fallbackCompanies.map((company) => ({
    id: company.id,
    name: company.name,
    address: company.address,
    userId: company.userId,
  }));

  const boardingHouses = fallbackCompanies.flatMap((company) => company.branches.map((branch) => ({
    ...branch,
    companyId: company.id,
  })));

  const summaryByHouse = new Map(
    boardingHouses.map((house) => [house.id, {
      totalRooms: house.totalRooms,
      occupiedRooms: house.occupiedRooms,
      availableRooms: Math.max(house.totalRooms - house.occupiedRooms, 0),
      activeTenants: house.activeTenants,
      activeContracts: house.activeContracts,
      currentMonthlyRevenue: house.currentMonthlyRevenue,
      occupancyRate: house.occupancyRate,
    }]),
  );

  const subscriptionByCompany = new Map(
    fallbackCompanies.map((company) => [company.id, company.subscription]),
  );

  return composeSnapshot({
    companies,
    boardingHouses,
    summaryByHouse,
    subscriptionByCompany,
  });
};

const companyMonitoringService = {
  async getCompanyMonitoringSnapshot(token, options = {}) {
    const { allowMockFallback = false } = options;

    if (!token) {
      if (allowMockFallback) {
        return {
          source: 'mock',
          ...buildFallbackSnapshot(),
        };
      }
      throw new Error('Token login tidak ditemukan. Silakan login ulang.');
    }

    try {
      const snapshot = await fetchCompaniesSnapshot(token);
      return {
        source: 'api',
        ...snapshot,
      };
    } catch (snapshotError) {
      try {
        const legacySnapshot = await fetchLegacySnapshot(token);
        return {
          source: 'api-legacy',
          ...legacySnapshot,
        };
      } catch (legacyError) {
        if (allowMockFallback) {
          return {
            source: 'mock',
            ...buildFallbackSnapshot(),
          };
        }

        const baseMessage = snapshotError?.message || 'Gagal memuat data company dari endpoint utama.';
        const legacyMessage = legacyError?.message || 'Fallback endpoint gagal.';
        throw new Error(`${baseMessage} | ${legacyMessage}`);
      }
    }
  },
};

export default companyMonitoringService;
