import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  IndianRupee 
} from 'lucide-react';

export const FarmerSchemes: React.FC = () => {
  const { schemes } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-emerald-600" />
            Central & State Direct Welfare Access
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Government Agriculture Schemes & Subsidies
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Verified institutional subsidies, income support, and crop risk protection schemes for Indian cultivators.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Aadhaar DBT Integrated</span>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map(scheme => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {scheme.category}
                </span>
                <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {scheme.deadline}
                </span>
              </div>

              <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
                {scheme.title}
              </h3>

              <p className="text-[11px] text-stone-400 font-medium mb-3">
                {scheme.ministry}
              </p>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 mb-3 space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-stone-700">
                    <strong className="text-stone-900">Direct Benefit: </strong>
                    {scheme.benefit}
                  </p>
                </div>

                <div className="flex items-start gap-2 pt-1.5 border-t border-stone-200/60">
                  <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <p className="text-stone-600">
                    <strong className="text-stone-800">Eligibility: </strong>
                    {scheme.eligibility}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {scheme.status}
              </span>

              <a
                href={scheme.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
