import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, FarmerProfile, CustomerProfile, DeliveryPartnerProfile } from '../../types';
import { 
  Users, 
  Sprout, 
  ShoppingCart, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Ban, 
  Check, 
  X, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Eye 
} from 'lucide-react';

export const AdminUserManagement: React.FC = () => {
  const { farmers, customers, deliveryPartners, updateUserStatus } = useApp();
  
  const [activeRoleTab, setActiveRoleTab] = useState<'farmers' | 'customers' | 'delivery'>('farmers');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    role: UserRole;
    id: string;
    userName: string;
    newStatus: 'active' | 'suspended';
  } | null>(null);

  const handleApplyStatusChange = () => {
    if (!confirmDialog) return;
    updateUserStatus(confirmDialog.role, confirmDialog.id, confirmDialog.newStatus);
    setConfirmDialog(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            Platform User Directory & KYC Verification
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage KYC approvals, account activations, and access suspensions across all registered participants.
          </p>
        </div>

        {/* Role Tab Switcher */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveRoleTab('farmers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeRoleTab === 'farmers' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-600" />
            <span>Farmers ({farmers.length})</span>
          </button>

          <button
            onClick={() => setActiveRoleTab('customers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeRoleTab === 'customers' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-teal-600" />
            <span>Customers ({customers.length})</span>
          </button>

          <button
            onClick={() => setActiveRoleTab('delivery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeRoleTab === 'delivery' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            <span>Delivery Partners ({deliveryPartners.length})</span>
          </button>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by name, district, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500 border-b border-stone-200 font-semibold">
              <tr>
                <th className="py-3 px-4">User Name & Details</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">
                  {activeRoleTab === 'farmers' ? 'Farm & Crop' : activeRoleTab === 'delivery' ? 'Vehicle' : 'Orders Placed'}
                </th>
                <th className="py-3 px-4">Registration Date</th>
                <th className="py-3 px-4">KYC / Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {activeRoleTab === 'farmers' && farmers.map(farmer => (
                <tr key={farmer.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={farmer.profileImage} alt={farmer.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-stone-900">{farmer.name}</p>
                        <p className="text-[11px] text-stone-400">{farmer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-stone-800">{farmer.district}</td>
                  <td className="py-3 px-4">{farmer.phone}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-stone-800">{farmer.farmName}</p>
                    <p className="text-[11px] text-stone-500">{farmer.primaryCrop} ({farmer.farmingType})</p>
                  </td>
                  <td className="py-3 px-4 text-stone-500">{farmer.joinedDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      farmer.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {farmer.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {farmer.status === 'active' ? (
                      <button
                        onClick={() => setConfirmDialog({
                          open: true,
                          role: 'farmer',
                          id: farmer.id,
                          userName: farmer.name,
                          newStatus: 'suspended'
                        })}
                        className="text-xs font-semibold text-red-600 hover:underline"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmDialog({
                          open: true,
                          role: 'farmer',
                          id: farmer.id,
                          userName: farmer.name,
                          newStatus: 'active'
                        })}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {activeRoleTab === 'customers' && customers.map(cust => (
                <tr key={cust.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-stone-900">{cust.name}</p>
                    <p className="text-[11px] text-stone-400">{cust.email}</p>
                  </td>
                  <td className="py-3 px-4 font-medium text-stone-800">{cust.district}</td>
                  <td className="py-3 px-4">{cust.phone}</td>
                  <td className="py-3 px-4 font-medium">{cust.ordersCount} orders</td>
                  <td className="py-3 px-4 text-stone-500">{cust.joinedDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      cust.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {cust.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {cust.status === 'active' ? (
                      <button
                        onClick={() => setConfirmDialog({
                          open: true,
                          role: 'customer',
                          id: cust.id,
                          userName: cust.name,
                          newStatus: 'suspended'
                        })}
                        className="text-xs font-semibold text-red-600 hover:underline"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmDialog({
                          open: true,
                          role: 'customer',
                          id: cust.id,
                          userName: cust.name,
                          newStatus: 'active'
                        })}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {activeRoleTab === 'delivery' && deliveryPartners.map(partner => (
                <tr key={partner.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={partner.profilePhoto} alt={partner.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-stone-900">{partner.name}</p>
                        <p className="text-[11px] text-stone-400">{partner.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-stone-800">{partner.district}</td>
                  <td className="py-3 px-4">{partner.phone}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-stone-800">{partner.vehicleType}</p>
                    <p className="text-[11px] text-stone-500 font-mono">{partner.vehicleNumber}</p>
                  </td>
                  <td className="py-3 px-4 text-stone-500">{partner.joinedDate}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                      {partner.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {partner.status !== 'suspended' ? (
                      <button
                        onClick={() => setConfirmDialog({
                          open: true,
                          role: 'delivery',
                          id: partner.id,
                          userName: partner.name,
                          newStatus: 'suspended'
                        })}
                        className="text-xs font-semibold text-red-600 hover:underline"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmDialog({
                          open: true,
                          role: 'delivery',
                          id: partner.id,
                          userName: partner.name,
                          newStatus: 'active'
                        })}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Confirm Status Change
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to change account status for <strong className="text-stone-900">{confirmDialog.userName}</strong> to <strong className="uppercase text-stone-900">{confirmDialog.newStatus}</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyStatusChange}
                className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
