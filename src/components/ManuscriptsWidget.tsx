import React from 'react';
import { UserState, Manuscript } from '../types';
import { FileText, Plus, ChevronRight, Clock, MoreVertical } from 'lucide-react';

interface ManuscriptsWidgetProps {
  currentState: UserState;
  activeManuscript: Manuscript | null;
  onSelectManuscript: (ms: Manuscript) => void;
  onNewUpload: () => void;
}

export const ManuscriptsWidget: React.FC<ManuscriptsWidgetProps> = ({
  currentState,
  activeManuscript,
  onSelectManuscript,
  onNewUpload,
}) => {
  const isReturningUser = currentState === 'STATE_C';

  const mockManuscripts: Manuscript[] = isReturningUser
    ? [
        {
          id: 'ms-741',
          fileName: 'CRISPR_microbiome_dynamics_v3.docx',
          fileSize: '6.2 MB',
          wordCount: 12482,
          uploadedAt: '14 Sep 2026',
          lastUpdated: '28 Sep 2026',
          subjectArea: 'Molecular Biology',
          stage: 'journal_selection',
          statusText: 'English editing completed · Ready for submission',
        },
        {
          id: 'ms-742',
          fileName: 'gut_metabolome_supplementary_fig2.docx',
          fileSize: '2.1 MB',
          wordCount: 3840,
          uploadedAt: '19 Sep 2026',
          lastUpdated: '22 Sep 2026',
          subjectArea: 'Microbiology',
          stage: 'preparation',
          statusText: 'Drafting response to reviewers',
        },
      ]
    : activeManuscript
    ? [activeManuscript]
    : [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#0052CC]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            My Manuscripts ({mockManuscripts.length})
          </h3>
        </div>
        <button
          onClick={onNewUpload}
          className="text-xs font-semibold text-[#0052CC] hover:text-[#0041A3] flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3 h-3" />
          <span>Upload</span>
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {mockManuscripts.length > 0 ? (
          mockManuscripts.map((ms) => {
            const isActive = activeManuscript?.id === ms.id || (!activeManuscript && isReturningUser && ms.id === 'ms-741');
            return (
              <div
                key={ms.id}
                onClick={() => onSelectManuscript(ms)}
                className={`p-2.5 transition-colors cursor-pointer flex items-center justify-between gap-2.5 ${
                  isActive ? 'bg-blue-50/50 border-l-2 border-[#0052CC]' : 'hover:bg-slate-50'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate block">
                      {ms.fileName}
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#0052CC] text-white rounded uppercase shrink-0">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-500 font-tabular">
                    <span>{ms.wordCount.toLocaleString()} words</span>
                    <span>·</span>
                    <span>{ms.lastUpdated}</span>
                  </div>

                  <div className="text-[10px] text-slate-600 mt-0.5 truncate">
                    {ms.statusText}
                  </div>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              </div>
            );
          })
        ) : (
          <div className="p-4 text-center text-slate-400 text-xs">
            <p>No manuscripts uploaded yet.</p>
            <button
              onClick={onNewUpload}
              className="mt-1 text-[#0052CC] font-semibold hover:underline"
            >
              Upload your first draft
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
