const STRING_FIELDS = new Set([
  'name',
  'city',
  'lifecycle',
  'subscriptionStatus',
  'riskPriority',
]);

const NUMBER_FIELDS = new Set([
  'activeTenants',
  'branchCount',
  'roomCount',
  'riskScore',
  'occupancyRate',
]);

const ALLOWED_OPERATORS = new Set(['=', '!=', '~', '>=', '<=', '>', '<']);

const MAX_QUERY_LENGTH = 220;
const MAX_CLAUSES = 6;

const normalizeValue = (rawValue) => {
  const value = rawValue.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
};

const getFieldValue = (company, field) => {
  switch (field) {
    case 'name':
      return company.name || '';
    case 'city':
      return (company.cities || []).join(' ');
    case 'lifecycle':
      return company.lifecycle?.lifecycle || '';
    case 'subscriptionStatus':
      return company.subscription?.status || 'none';
    case 'riskPriority':
      return company.riskPriority || '';
    case 'activeTenants':
      return Number(company.activeTenants || 0);
    case 'branchCount':
      return Number(company.branchCount || 0);
    case 'roomCount':
      return Number(company.roomCount || 0);
    case 'riskScore':
      return Number(company.riskScore || 0);
    case 'occupancyRate':
      return Number(company.occupancyRate || 0);
    default:
      return null;
  }
};

const compareString = (leftValue, operator, rightValue) => {
  const left = String(leftValue || '').toLowerCase();
  const right = String(rightValue || '').toLowerCase();

  switch (operator) {
    case '=':
      return left === right;
    case '!=':
      return left !== right;
    case '~':
      return left.includes(right);
    default:
      return false;
  }
};

const compareNumber = (leftValue, operator, rightValue) => {
  const left = Number(leftValue);
  const right = Number(rightValue);

  switch (operator) {
    case '=':
      return left === right;
    case '!=':
      return left !== right;
    case '>':
      return left > right;
    case '>=':
      return left >= right;
    case '<':
      return left < right;
    case '<=':
      return left <= right;
    default:
      return false;
  }
};

export const parseCompanyManualQuery = (input) => {
  const source = String(input || '').trim();
  if (!source) {
    return { clauses: [] };
  }

  if (source.length > MAX_QUERY_LENGTH) {
    throw new Error(`Query terlalu panjang (maks ${MAX_QUERY_LENGTH} karakter).`);
  }

  const rawClauses = source.split(/\s+AND\s+/i).map((part) => part.trim()).filter(Boolean);
  if (rawClauses.length > MAX_CLAUSES) {
    throw new Error(`Clause terlalu banyak (maks ${MAX_CLAUSES} clause).`);
  }

  const clauses = rawClauses.map((clause, index) => {
    const match = clause.match(/^([a-zA-Z][a-zA-Z0-9]*)\s*(=|!=|~|>=|<=|>|<)\s*(.+)$/);
    if (!match) {
      throw new Error(`Format clause ke-${index + 1} tidak valid: "${clause}"`);
    }

    const [, field, operator, rawValue] = match;
    if (!ALLOWED_OPERATORS.has(operator)) {
      throw new Error(`Operator "${operator}" tidak diizinkan.`);
    }

    const value = normalizeValue(rawValue);
    if (!value) {
      throw new Error(`Value di clause ke-${index + 1} tidak boleh kosong.`);
    }

    if (!STRING_FIELDS.has(field) && !NUMBER_FIELDS.has(field)) {
      throw new Error(`Field "${field}" tidak diizinkan.`);
    }

    if (NUMBER_FIELDS.has(field)) {
      if (operator === '~') {
        throw new Error(`Operator "~" tidak bisa dipakai untuk field numerik (${field}).`);
      }
      const numberValue = Number(value);
      if (!Number.isFinite(numberValue)) {
        throw new Error(`Value "${value}" untuk field ${field} harus angka.`);
      }
      return { field, operator, value: numberValue, type: 'number' };
    }

    if (!['=', '!=', '~'].includes(operator)) {
      throw new Error(`Operator "${operator}" tidak bisa dipakai untuk field teks (${field}).`);
    }
    return { field, operator, value, type: 'string' };
  });

  return { clauses };
};

export const applyCompanyManualQuery = (company, compiledQuery) => {
  if (!compiledQuery || !compiledQuery.clauses || !compiledQuery.clauses.length) {
    return true;
  }

  return compiledQuery.clauses.every((clause) => {
    const leftValue = getFieldValue(company, clause.field);
    if (clause.type === 'number') {
      return compareNumber(leftValue, clause.operator, clause.value);
    }
    return compareString(leftValue, clause.operator, clause.value);
  });
};
