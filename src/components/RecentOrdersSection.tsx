import React, { useState } from 'react';
import { UserState } from '../types';
import { RECENT_ORDERS_STATE_C } from '../data/mockData';
import { 
  Download, 
  RefreshCw, 
  Send, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  FileText,
  AlertCircle,
  HelpCircle,
  Eye
} from 'lucide-react';

interface RecentOrdersSectionProps {
  currentState: UserState;
  onRequestReEditing: () => void;
  onOpenEnquiry: () => void;
}

export const RecentOrdersSection: React.FC<RecentOrdersSectionProps> = ({
  currentState,
  onRequestReEditing,
  onOpenEnquiry,
}) => {
  const isReturningUser = currentState === 'STATE_C';
  const orders = isReturningUser ? RECENT_ORDERS_STATE_C : [];
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (orderNumber: string) => {
    setDownloadSuccess(orderNumber);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <section id="orders-section" className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="text-xs font-semibold text-[#0052CC] uppercase tracking-wider">
              Account History
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Your Recent Activity
            </h2>
          </div>

          {isReturningUser && (
            <div className="text-xs text-slate-500">
              Showing 2 of 2 orders · <span className="text-[#0052CC] hover:underline cursor-pointer">View full archive</span>
            </div>
          )}
        </div>

        {downloadSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Downloaded certified editorial package for {downloadSuccess} (Clean & Track Changes versions included).</span>
            </span>
            <button onClick={() => setDownloadSuccess(null)} className="text-emerald-700 font-bold hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Orders List or Empty State */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const isDelivered = order.status === 'Delivered';
              const isInProgress = order.status === 'In Progress';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Order Info & Metadata */}
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 font-tabular">
                          {order.orderNumber}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-[#0052CC]">
                          {order.serviceName}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        
                        {/* Status badge */}
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isDelivered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-slate-800 leading-snug">
                        {order.manuscriptTitle}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-tabular">
                        <span>Ordered: {order.orderDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {isDelivered ? `Delivered: ${order.deliveryDate}` : `Est. Completion: ${order.deliveryDate}`}
                        </span>
                        {order.reEditingEligible && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-700 font-medium">
                              Free re-editing: 356 days left
                            </span>
                          </>
                        )}
                      </div>

                      {/* Progress bar if In Progress */}
                      {isInProgress && order.progressPercent && (
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                            <span>Artwork drafting & editorial validation in progress</span>
                            <span className="font-semibold font-tabular">{order.progressPercent}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-[#0052CC] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${order.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Specific Contextual Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      {isDelivered && (
                        <>
                          <button
                            onClick={() => handleDownload(order.orderNumber)}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-600" />
                            <span>Download Files</span>
                          </button>

                          <button
                            onClick={onRequestReEditing}
                            className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Request Re-Editing</span>
                          </button>

                          <button
                            onClick={onOpenEnquiry}
                            className="px-3.5 py-2 bg-[#0052CC] hover:bg-[#0047B3] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Get Submission Support</span>
                          </button>
                        </>
                      )}

                      {isInProgress && (
                        <button
                          onClick={() => alert(`Tracking ${order.orderNumber}: Phase 2 of 3 (Scientific Illustrator Review). Delivery on schedule for ${order.deliveryDate}.`)}
                          className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-600" />
                          <span>Track Milestone Progress</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Clean Empty State for New Users */
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              No Previous Orders Yet
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Once you start an enquiry or order, your live manuscript milestones, deliverables, downloadable track-changes versions, and 365-day free re-editing window will appear here.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
