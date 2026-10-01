import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, Clock, ShieldCheck, ShoppingCart, Sprout, Truck } from 'lucide-react';

export const NotificationDropdown: React.FC = () => {
  const { notifications, currentRole, currentUser, markNotificationAsRead, markAllNotificationsAsRead, unreadCount } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // Filter notifications relevant to current role & user
  const relevantNotifications = notifications.filter(n => {
    if (!currentRole) return false;
    if (n.targetRole === 'all') return true;
    if (n.targetRole === currentRole) {
      if (n.targetUserId && currentUser) {
        return n.targetUserId === currentUser.id;
      }
      return true;
    }
    return false;
  });

  const getIcon = (targetRole: string) => {
    switch (targetRole) {
      case 'farmer':
        return <Sprout className="w-4 h-4 text-emerald-600" />;
      case 'customer':
        return <ShoppingCart className="w-4 h-4 text-teal-600" />;
      case 'delivery':
        return <Truck className="w-4 h-4 text-amber-600" />;
      case 'admin':
        return <ShieldCheck className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-stone-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto divide-y divide-stone-100">
              {relevantNotifications.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-500">
                  <Bell className="w-8 h-8 mx-auto text-stone-300 mb-2 stroke-1" />
                  No new notifications
                </div>
              ) : (
                relevantNotifications.map(item => (
                  <div
                    key={item.id}
                    onClick={() => markNotificationAsRead(item.id)}
                    className={`p-3.5 hover:bg-stone-50 cursor-pointer transition-colors ${
                      !item.read ? 'bg-emerald-50/40' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-xl bg-stone-100 shrink-0">
                        {getIcon(item.targetRole)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <p className="text-xs font-bold text-stone-900 truncate">{item.title}</p>
                          <span className="text-[10px] text-stone-400 shrink-0 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(item.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
