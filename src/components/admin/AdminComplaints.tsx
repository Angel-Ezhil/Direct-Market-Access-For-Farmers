import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Complaint } from '../../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  MessageSquare, 
  X, 
  Check 
} from 'lucide-react';

export const AdminComplaints: React.FC = () => {
  const { complaints, updateComplaintStatus } = useApp();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [adminReply, setAdminReply] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Complaint['status']>('Resolved');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    updateComplaintStatus(selectedComplaint.id, selectedStatus, adminReply);
    setSelectedComplaint(null);
    setAdminReply('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Customer Grievances & Quality Complaints Desk
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Resolve consumer disputes regarding produce freshness, damaged transport, or delivery timing.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
          {complaints.filter(c => c.status !== 'Resolved').length} Open Grievances
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500 border-b border-stone-200 font-semibold">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Issue Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {complaints.map(complaint => (
                <tr key={complaint.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-stone-900">#{complaint.id}</td>
                  <td className="py-3 px-4 font-mono text-stone-700">#{complaint.orderId}</td>
                  <td className="py-3 px-4 font-medium text-stone-800">{complaint.customerName}</td>
                  <td className="py-3 px-4 font-semibold text-stone-900">{complaint.type}</td>
                  <td className="py-3 px-4 text-stone-600 max-w-xs truncate">{complaint.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      complaint.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : complaint.status === 'Under Review'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedComplaint(complaint);
                        setSelectedStatus(complaint.status === 'Resolved' ? 'Resolved' : 'Under Review');
                        setAdminReply(complaint.adminResponse || '');
                      }}
                      className="text-xs font-semibold text-stone-900 hover:underline"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investigation Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900">
                Investigate Grievance #{selectedComplaint.id}
              </h3>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 space-y-1">
                <p><strong className="text-stone-900">Customer: </strong> {selectedComplaint.customerName}</p>
                <p><strong className="text-stone-900">Associated Order: </strong> #{selectedComplaint.orderId}</p>
                <p><strong className="text-stone-900">Issue Category: </strong> {selectedComplaint.type}</p>
                <p><strong className="text-stone-900">Customer Statement: </strong> "{selectedComplaint.description}"</p>
              </div>

              <form onSubmit={handleUpdate} className="space-y-3 pt-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Update Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-900"
                  >
                    <option value="Open">Open</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Admin Action / Resolution Note</label>
                  <textarea
                    rows={3}
                    placeholder="Enter resolution notes, refund confirmation, or partner advisory..."
                    value={adminReply}
                    onChange={(e) => setAdminReply(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedComplaint(null)}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs"
                  >
                    Save Resolution
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
