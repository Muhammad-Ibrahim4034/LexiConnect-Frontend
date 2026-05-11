import { useState, useEffect } from 'react';
import { Shield, Car, Heart, BookOpen, Globe, Briefcase, ChevronRight, Search, Loader2, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

interface LegalArticle {
  title: string;
  content: string;
  section: string;
}

interface LegalCategory {
  icon: any;
  title: string;
  description: string;
  color: string;
  lawType: string;
  articles: LegalArticle[];
}

// Maps CSV law_type → display config (icon, label, description, color)
const CATEGORY_CONFIG: Record<string, { icon: any; title: string; description: string; color: string }> = {
  domestic_violence: {
    icon: Heart,
    title: 'Domestic Violence Laws',
    description: 'Protection against domestic abuse, harassment, and family rights',
    color: 'bg-red-500',
  },
  traffic: {
    icon: Car,
    title: 'Traffic Laws & Violations',
    description: 'Vehicle regulations, traffic offences, and road-use procedures',
    color: 'bg-blue-500',
  },
  Drug_laws: {
    icon: Shield,
    title: 'Drug Laws',
    description: 'Narcotic substances regulation, enforcement, and rehabilitation',
    color: 'bg-purple-500',
  },
  'Student Laws': {
    icon: BookOpen,
    title: 'Student Laws',
    description: 'Education rights, academic institutions, and student protections',
    color: 'bg-green-500',
  },
  'Workplace Harassment Laws': {
    icon: Briefcase,
    title: 'Workplace Harassment Laws',
    description: 'Protection against harassment and discrimination at the workplace',
    color: 'bg-orange-500',
  },
  'Other Laws': {
    icon: Globe,
    title: 'Other Laws',
    description: 'Cyber crime prevention, child protection, and miscellaneous legislation',
    color: 'bg-indigo-500',
  },
};

// Fallback config for any unexpected law_type in future CSV updates
function getFallbackConfig(lawType: string) {
  return {
    icon: Globe,
    title: lawType,
    description: 'Legal information and documentation',
    color: 'bg-gray-500',
  };
}

// Parse the raw CSV text into LegalCategory[]
function parseCsvToCategories(csvText: string): LegalCategory[] {
  const lines = csvText.split('\n').filter(Boolean);
  if (lines.length < 2) return [];

  // Parse header
  const header = lines[0].split(',').map(h => h.trim());
  const idx = {
    lawType:     header.indexOf('law_type'),
    source:      header.indexOf('source'),
    description: header.indexOf('description'),
    docId:       header.indexOf('doc_id'),
  };

  // Group rows by law_type
  const groups: Record<string, LegalArticle[]> = {};

  for (let i = 1; i < lines.length; i++) {
    // Handle quoted CSV fields properly
    const row = parseCSVLine(lines[i]);
    if (!row || row.length < 4) continue;

    const lawType    = (row[idx.lawType]     || '').trim();
    const source     = (row[idx.source]      || '').trim();
    const description = (row[idx.description] || '').trim();

    if (!lawType || !source) continue;

    if (!groups[lawType]) groups[lawType] = [];

    groups[lawType].push({
      title:   source,
      content: description || 'No description available.',
      section: lawType.replace(/_/g, ' '),
    });
  }

  // Convert groups → LegalCategory[]
  // Sort so known types come first in our preferred order
  const ORDER = ['domestic_violence', 'traffic', 'Drug_laws', 'Student Laws', 'Workplace Harassment Laws', 'Other Laws'];

  const allTypes = Object.keys(groups);
  const sorted = [
    ...ORDER.filter(t => allTypes.includes(t)),
    ...allTypes.filter(t => !ORDER.includes(t)),
  ];

  return sorted.map(lawType => {
    const config = CATEGORY_CONFIG[lawType] ?? getFallbackConfig(lawType);
    return {
      ...config,
      lawType,
      articles: groups[lawType],
    };
  });
}

// Minimal CSV line parser that handles quoted fields with commas inside
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

export function LegalInfoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery]           = useState('');
  const [categories, setCategories]             = useState<LegalCategory[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState<string | null>(null);

  useEffect(() => {
    // Load the CSV from the public folder
    // Place combined_metadata.csv in your project's /public directory
    fetch('/combined_metadata.csv')
      .then(res => {
        if (!res.ok) throw new Error(`Could not load legal data (${res.status})`);
        return res.text();
      })
      .then(text => {
        const parsed = parseCsvToCategories(text);
        if (parsed.length === 0) throw new Error('No categories found in data file');
        setCategories(parsed);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const selectedCategoryData = categories.find(c => c.title === selectedCategory);

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #1a0f08 0%, #2e1a0e 35%, #3B2319 60%, #5a3420 100%)',
          padding: '32px 24px',
        }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-4xl font-serif mb-3"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #C49F2F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
              }}
            >
              Legal Information Center
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '18px' }}>
              Browse verified legal information and understand your rights
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'rgba(212,175,55,0.5)' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal topics..."
                className="w-full outline-none transition-all"
                style={{
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                  background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: '12px',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.6)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                  e.currentTarget.style.background = 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)';
                }}
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2
                className="w-10 h-10 animate-spin"
                style={{ color: 'rgba(212,175,55,0.6)' }}
              />
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)' }}>
                Loading legal information...
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
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
                Make sure <code>combined_metadata.csv</code> is in your <code>/public</code> folder
              </p>
            </div>
          )}

          {/* Main Content */}
          {!loading && !error && (
            <>
              {!selectedCategory ? (
                /* Categories Grid */
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(category.title)}
                        className="group text-left transition-all hover:scale-[1.02] active:scale-95"
                        style={{
                          background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(212,175,55,0.25)',
                          borderRadius: '16px',
                          padding: '24px',
                          boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.border = '1px solid rgba(212,175,55,0.55)';
                          e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.border = '1px solid rgba(212,175,55,0.25)';
                          e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)';
                        }}
                      >
                        <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3
                          className="text-xl font-serif mb-2"
                          style={{ color: 'rgba(255,255,255,0.9)' }}
                        >
                          {category.title}
                        </h3>
                        <p
                          className="text-sm mb-4"
                          style={{ color: 'rgba(255,255,255,0.45)' }}
                        >
                          {category.description}
                        </p>
                        <div className="flex items-center gap-1 mb-4">
                          <span
                            style={{
                              fontSize: '11px',
                              color: 'rgba(212,175,55,0.6)',
                              background: 'rgba(212,175,55,0.1)',
                              border: '1px solid rgba(212,175,55,0.2)',
                              padding: '2px 8px',
                              borderRadius: '999px',
                            }}
                          >
                            {category.articles.length} {category.articles.length === 1 ? 'document' : 'documents'}
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-2 group-hover:gap-3 transition-all"
                          style={{ color: '#D4AF37' }}
                        >
                          <span className="text-sm">Learn more</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    );
                  })}

                  {/* Empty search state */}
                  {filteredCategories.length === 0 && (
                    <div
                      className="col-span-full text-center py-16"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p style={{ fontSize: '16px' }}>No categories match your search</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Category Detail View */
                <div>
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="mb-6 flex items-center gap-2 transition-all hover:gap-3"
                    style={{ color: '#D4AF37', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    <span>Back to Categories</span>
                  </button>

                  {selectedCategoryData && (
                    <>
                      {/* Category Header */}
                      <div
                        className="p-8 rounded-2xl mb-8"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 100%)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(212,175,55,0.4)',
                          boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
                        }}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`w-16 h-16 ${selectedCategoryData.color} rounded-xl flex items-center justify-center`}>
                            <selectedCategoryData.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h2
                              className="text-3xl font-serif"
                              style={{ color: 'rgba(255,255,255,0.95)' }}
                            >
                              {selectedCategoryData.title}
                            </h2>
                            <span
                              style={{
                                fontSize: '12px',
                                color: 'rgba(212,175,55,0.6)',
                                background: 'rgba(212,175,55,0.1)',
                                border: '1px solid rgba(212,175,55,0.2)',
                                padding: '2px 10px',
                                borderRadius: '999px',
                                display: 'inline-block',
                                marginTop: '6px',
                              }}
                            >
                              {selectedCategoryData.articles.length} documents
                            </span>
                          </div>
                        </div>
                        <p style={{ color: 'rgba(212,175,55,0.75)', fontSize: '16px' }}>
                          {selectedCategoryData.description}
                        </p>
                      </div>

                      {/* Articles */}
                      <div className="space-y-4">
                        {selectedCategoryData.articles.map((article, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: 'linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)',
                              backdropFilter: 'blur(20px)',
                              WebkitBackdropFilter: 'blur(20px)',
                              border: '1px solid rgba(212,175,55,0.2)',
                              borderRadius: '16px',
                              padding: '24px',
                              boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                            }}
                          >
                            <div className="flex items-start justify-between mb-3 gap-4">
                              <h3
                                className="text-lg font-serif"
                                style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.4' }}
                              >
                                {article.title}
                              </h3>
                              <span
                                className="text-sm flex-shrink-0"
                                style={{
                                  color: 'rgba(212,175,55,0.85)',
                                  background: 'rgba(212,175,55,0.12)',
                                  border: '1px solid rgba(212,175,55,0.25)',
                                  padding: '4px 12px',
                                  borderRadius: '999px',
                                  fontSize: '11px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                #{idx + 1}
                              </span>
                            </div>
                            <p
                              className="whitespace-pre-line leading-relaxed"
                              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}
                            >
                              {article.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}

          {/* Disclaimer */}
          {!loading && (
            <div
              className="mt-10"
              style={{
                background: 'linear-gradient(160deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.04) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '16px',
                padding: '20px 24px',
              }}
            >
              <p style={{ fontSize: '13px', color: 'rgba(212,175,55,0.7)', lineHeight: '1.6' }}>
                <span style={{ color: 'rgba(212,175,55,0.9)', fontWeight: '500' }}>Disclaimer: </span>
                The information provided here is for general educational purposes only and should not be considered as legal advice. Laws are subject to change and interpretation. For specific legal matters, please consult with a qualified attorney.
              </p>
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}
