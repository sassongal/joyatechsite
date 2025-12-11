// src/admin/pages/ActivityLog.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { 
  Activity, 
  Filter, 
  Calendar,
  FileText,
  Wrench,
  Image,
  MessageSquare,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { he } from 'date-fns/locale';

const actionIcons = {
  create: Plus,
  update: Edit,
  delete: Trash2,
  publish: Eye,
};

const collectionIcons = {
  articles: FileText,
  tools: Wrench,
  portfolio: Image,
  testimonials: MessageSquare,
  settings: Settings,
  carousels: Activity,
};

const actionColors = {
  create: 'bg-green-500/20 text-green-400 border-green-500/30',
  update: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  delete: 'bg-red-500/20 text-red-400 border-red-500/30',
  publish: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const actionLabels = {
  create: 'יצירה',
  update: 'עדכון',
  delete: 'מחיקה',
  publish: 'פרסום',
};

const collectionLabels = {
  articles: 'מאמרים',
  tools: 'כלים',
  portfolio: 'תיק עבודות',
  testimonials: 'המלצות',
  settings: 'הגדרות',
  carousels: 'קרוסלות',
};

export default function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState('all');
  const [filterCollection, setFilterCollection] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    fetchActivities();
  }, [filterAction, filterCollection]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      let q = query(
        collection(db, 'activityLogs'),
        orderBy('createdAt', 'desc'),
        limit(100)
      );
      
      const snapshot = await getDocs(q);
      let data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Client-side filtering
      if (filterAction !== 'all') {
        data = data.filter(item => item.action === filterAction);
      }
      if (filterCollection !== 'all') {
        data = data.filter(item => item.collection === filterCollection);
      }

      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const paginatedActivities = activities.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalPages = Math.ceil(activities.length / pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">יומן פעילות</h1>
          <p className="text-neutral-400 mt-1">{activities.length} פעולות</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-500" />
            <select
              value={filterAction}
              onChange={(e) => { setFilterAction(e.target.value); setPage(1); }}
              className="px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">כל הפעולות</option>
              {Object.entries(actionLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={filterCollection}
              onChange={(e) => { setFilterCollection(e.target.value); setPage(1); }}
              className="px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">כל הסוגים</option>
              {Object.entries(collectionLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl overflow-hidden">
        {paginatedActivities.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-500">אין פעילות להצגה</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-700">
            {paginatedActivities.map((activity) => {
              const ActionIcon = actionIcons[activity.action] || Edit;
              const CollectionIcon = collectionIcons[activity.collection] || FileText;
              const timestamp = activity.createdAt?.toDate?.() || new Date();

              return (
                <div key={activity.id} className="p-4 hover:bg-neutral-700/30 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${actionColors[activity.action] || 'bg-neutral-700 text-neutral-400 border-neutral-600'}`}>
                      <ActionIcon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white">
                          {activity.userEmail?.split('@')[0] || 'Admin'}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${actionColors[activity.action] || 'bg-neutral-700 text-neutral-400'}`}>
                          {actionLabels[activity.action] || activity.action}
                        </span>
                        <span className="text-neutral-500 flex items-center gap-1">
                          <CollectionIcon className="w-4 h-4" />
                          {collectionLabels[activity.collection] || activity.collection}
                        </span>
                      </div>
                      
                      <p className="text-sm text-neutral-300 mt-1">
                        {activity.documentTitle || activity.documentId}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(timestamp, 'dd/MM/yyyy HH:mm', { locale: he })}
                        </span>
                        <span>
                          {formatDistanceToNow(timestamp, { addSuffix: true, locale: he })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-neutral-700 px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-neutral-400">
              מציג {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, activities.length)} מתוך {activities.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-sm text-neutral-400">
                עמוד {page} מתוך {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
