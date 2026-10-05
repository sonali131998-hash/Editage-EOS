import React, { useState } from 'react';
import { UserState } from '../types';
import { RECENT_ORDERS_STATE_C } from '../data/mockData';
import { Download, RefreshCw, Clock, CheckCircle2, ChevronRight, Send, AlertCircle } from 'lucide-react';

interface OrdersWidgetProps {
  currentState: UserState;
  onRequestReEditing: () => void;
  onOpenEnquiry: () => void;
}

export const OrdersWidget: React.FC<OrdersWidgetProps> = ({
  currentState,
  onRequestReEditing,
  onOpenEnquiry,
}) => {
  const isReturningUser = currentState === 'STATE_C';
  const orders = isReturningUser ? RECENT_ORDERS_STATE_C : [];
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (orderNum: string) => {
    setDownloadSuccess(orderNum);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div id="orders-widget" className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      
      {/* Header */}
      <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Recent Orders & Files ({orders.length})
        </h3>
        {orders.length > 0 && (
          <span className="text-[10px] text-[#0052CC] font-semibold hover:underline cursor-pointer">
            View All
          </span>
        )}
      </div>

      {downloadSuccess && (
        <div className="p-2 bg-emerald-50 border-b border-emerald-100 text-emerald-800 text-[10px] flex items-center justify-between">
          <span className="flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Files downloaded for {downloadSuccess}</span>
          </span>
          <button onClick={() => setDownloadSuccess(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Orders List */}
      <div className="divide-y divide-slate-100">
        {orders.length > 0 ? (
          orders.map((ord) => {
            const isDelivered = ord.status === 'Delivered';
            const isInProgress = ord.status === 'In Progress';

            return (
              <div key={ord.id} className="p-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 font-tabular">{ord.orderNumber}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      isDelivered ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-tabular">{ord.orderDate}</span>
                </div>

                <div className="text-xs font-semibold text-slate-800 leading-snug line-clamp-1">
                  {ord.serviceName}
                </div>

                <div className="text-[10px] text-slate-500 truncate">
                  Paper: {ord.fileName}
                </div>

                {/* Progress bar if in progress */}
                {isInProgress && ord.progressPercent && (
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] text-slate-500 font-tabular">
                      <span>Scientific Illustrator drafting</span>
                      <span className="font-bold text-slate-800">{ord.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#0052CC] h-1.5 rounded-full" style={{ width: `${ord.progressPercent}%` }} />
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="pt-2 flex items-center gap-2 text-xs">
                  {isDelivered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDownload(ord.orderNumber)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-[11px] flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>

                      <button
                        type="button"
                        onClick={onRequestReEditing}
                        className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-semibold text-[11px] flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Re-edit</span>
                      </button>
                    </>
                  )}

                  {isInProgress && (
                    <button
                      type="button"
                      onClick={() => alert(`Order ${ord.orderNumber} is on schedule for delivery on ${ord.deliveryDate}.`)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded font-medium text-[11px]"
                    >
                      Track Delivery
                    </button>
                  )}
                </div>

              </div>
            );
          })
        ) : (
          <div className="p-6 text-center text-slate-400 text-xs">
            <p>No active orders or enquiries.</p>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Once an order is submitted, live tracking and free re-editing appear here.
            </span>
          </div>
        )}
      </div>

      {/* 365-Day Free Re-Editing Callout for Dr. Verma */}
      {isReturningUser && (
        <div className="p-3.5 bg-emerald-50/60 border-t border-emerald-200/80 flex items-start gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-900 block leading-tight">
              365-Day Free Re-Editing Active
            </span>
            <p className="text-[11px] text-emerald-800 mt-0.5 leading-snug">
              Valid until 21 Sep 2027 (356 days left) for <em>CRISPR_microbiome_dynamics_v3.docx</em>.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
