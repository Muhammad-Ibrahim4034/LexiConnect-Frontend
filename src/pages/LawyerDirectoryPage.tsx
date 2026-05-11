import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Phone, Mail, Briefcase, Filter, Star, Loader2, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

interface Lawyer {
  id: string;
  name: string;
  specialization: string[];
  city: string;
  experience: number;
  phone: string;
  email: string;
  address: string;
  rating: number;
  cases: number;
}

const API_BASE = 'http://localhost:8000';

export function LawyerDirectoryPage() {
  const [searchQuery, setSearchQuery]               = useState('');
  const [selectedCity, setSelectedCity]             = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  const [lawyers, setLawyers]       = useState<Lawyer[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  // Derived lists from fetched data
  const cities           = ['all', ...Array.from(new Set(lawyers.map(l => l.city))).sort()];
  const specializations  = ['all', ...Array.from(new Set(lawyers.map(l => l.specialization[0]).filter(Boolean))).sort()];
  // Fetch from backend — city and search are server-side; specialization is client-side
  const fetchLawyers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCity !== 'all')   params.set('city', selectedCity);
      if (searchQuery.trim())       params.set('search', searchQuery.trim());

      const url = `${API_BASE}/lawyers${params.toString() ? `?${params}` : ''}`;
      const res = await fetch(url);

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data: Lawyer[] = await res.json();
      setLawyers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load lawyers. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCity, searchQuery]);

  // Debounce search input so we don't fire on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => { fetchLawyers(); }, 400);
    return () => clearTimeout(timer);
  }, [fetchLawyers]);

  // Client-side specialization filter (backend doesn't have this param)
  const filteredLawyers = selectedSpecialization === 'all'
    ? lawyers
    : lawyers.filter(l => l.specialization.includes(selectedSpecialization));

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-serif mb-3"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Verified Lawyer Directory
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px' }}>
            Connect with qualified legal professionals across Pakistan
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className="p-6 rounded-2xl mb-8"
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          <div className="grid md:grid-cols-3 gap-4">

            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: 'rgba(212,175,55,0.6)' }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or specialization..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    color: 'rgba(255,255,255,0.88)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                />
              </div>
            </div>

            {/* City Filter */}
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'rgba(212,175,55,0.6)' }}
              />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg appearance-none focus:outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: 'rgba(255,255,255,0.88)',
                }}
              >
                {cities.map(city => (
                  <option key={city} value={city} style={{ background: '#2e1a0e' }}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialization Filter */}
            <div className="relative">
              <Filter
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'rgba(212,175,55,0.6)' }}
              />
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg appearance-none focus:outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: 'rgba(255,255,255,0.88)',
                }}
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec} style={{ background: '#2e1a0e' }}>
                    {spec === 'all' ? 'All Specializations' : spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {loading ? (
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                Loading...
              </span>
            ) : (
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                Showing {filteredLawyers.length} of {lawyers.length} lawyers
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2
              className="w-10 h-10 animate-spin"
              style={{ color: 'rgba(212,175,55,0.6)' }}
            />
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)' }}>
              Loading lawyers...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div
            className="flex flex-col items-center justify-center py-16 gap-4 rounded-2xl"
            style={{
              background: 'rgba(255,80,80,0.06)',
              border: '1px solid rgba(255,80,80,0.2)',
            }}
          >
            <AlertCircle className="w-12 h-12" style={{ color: 'rgba(255,100,100,0.7)' }} />
            <p style={{ fontSize: '16px', color: 'rgba(255,150,150,0.9)' }}>{error}</p>
            <button
              onClick={fetchLawyers}
              className="px-5 py-2 rounded-xl transition-all"
              style={{
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.35)',
                color: 'rgba(212,175,55,0.9)',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,175,55,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(212,175,55,0.15)'; }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Lawyers Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredLawyers.map(lawyer => (
              <div
                key={lawyer.id}
                className="p-6 rounded-2xl transition-all"
                style={{
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.5)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.2)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="text-xl font-serif mb-1"
                      style={{ color: 'rgba(255,255,255,0.88)' }}
                    >
                      {lawyer.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: '#D4AF37', fill: '#D4AF37' }} />
                        <span style={{ fontSize: '13px', color: 'rgba(212,175,55,0.9)' }}>
                          {lawyer.rating > 0 ? lawyer.rating.toFixed(1) : 'N/A'}
                        </span>
                      </div>
                      {lawyer.cases > 0 && (
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
                          • {lawyer.cases} cases
                        </span>
                      )}
                    </div>
                  </div>
                  {lawyer.experience > 0 && (
                    <div
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: 'rgba(212,175,55,0.15)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        color: 'rgba(212,175,55,0.9)',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {lawyer.experience} yrs exp
                    </div>
                  )}
                </div>

                {/* Specializations */}
                {lawyer.specialization.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lawyer.specialization.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-sm"
                        style={{
                          background: 'rgba(212,175,55,0.1)',
                          border: '1px solid rgba(212,175,55,0.2)',
                          color: 'rgba(212,175,55,0.85)',
                          fontSize: '12px',
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                {/* Contact Details */}
                <div
                  className="space-y-3 mb-5 pb-5"
                  style={{ borderBottom: '1px solid rgba(212,175,55,0.12)' }}
                >
                  {lawyer.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
                      <div>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                          {lawyer.address}
                        </p>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                          {lawyer.city}
                        </p>
                      </div>
                    </div>
                  )}
                  {lawyer.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4" style={{ color: '#D4AF37' }} />
                      <a
                        href={`tel:${lawyer.phone}`}
                        style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                      >
                        {lawyer.phone}
                      </a>
                    </div>
                  )}
                  {lawyer.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4" style={{ color: '#D4AF37' }} />
                      <a
                        href={`mailto:${lawyer.email}`}
                        style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                      >
                        {lawyer.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {lawyer.phone && (
                    <a
                      href={`tel:${lawyer.phone}`}
                      className="flex-1 py-2.5 rounded-xl text-center transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #C49F2F 100%)',
                        color: '#2e1a0e',
                        fontSize: '14px',
                        fontWeight: 500,
                        boxShadow: '0 2px 10px rgba(212,175,55,0.35)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(212,175,55,0.35)';
                      }}
                    >
                      Call Now
                    </a>
                  )}
                  {lawyer.email && (
                    <a
                      href={`mailto:${lawyer.email}`}
                      className="flex-1 py-2.5 rounded-xl text-center transition-all"
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(212,175,55,0.4)',
                        color: 'rgba(212,175,55,0.9)',
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                        e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.border = '1px solid rgba(212,175,55,0.4)';
                      }}
                    >
                      Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredLawyers.length === 0 && (
          <div className="text-center py-16">
            <Briefcase
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: 'rgba(212,175,55,0.25)' }}
            />
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.45)' }}>
              No lawyers found matching your criteria
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)', marginTop: '8px' }}>
              Try adjusting your filters
            </p>
          </div>
        )}

        {/* Info Box */}
        <div
          className="mt-10 p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          <h3
            className="text-lg font-serif mb-4"
            style={{ color: 'rgba(255,255,255,0.88)' }}
          >
            How to Choose a Lawyer
          </h3>
          <ul className="space-y-2">
            {[
              'Verify their enrollment with Pakistan Bar Council',
              'Check their specialization matches your legal need',
              'Consider their experience and track record',
              'Schedule an initial consultation to discuss your case',
              'Discuss fees and payment terms upfront',
              'Ensure clear communication and regular updates',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                  style={{ background: '#D4AF37' }}
                />
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.65' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </DashboardLayout>
  );
}
