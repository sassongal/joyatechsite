// src/admin/components/ActivityFeed.jsx
import React from 'react';
import { 
  FileText, 
  Wrench, 
  Image, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
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
};

const actionColors = {
  create: 'bg-green-500/20 text-green-400',
  update: 'bg-blue-500/20 text-blue-400',
  delete: 'bg-red-500/20 text-red-400',
  publish: 'bg-purple-500/20 text-purple-400',
};

const actionLabels = {
  create: 'יצר',
  update: 'עדכן',
  delete: 'מחק',
  publish: 'פרסם',
};

const collectionLabels = {
  articles: 'מאמר',
  tools: 'כלי',
  portfolio: 'עבודה',
  testimonials: 'המלצה',
  settings: 'הגדרות',
};

export default function ActivityFeed({ activities = [], loading = false, maxItems = 10 }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start gap-3 animate-pulse">
            <div className="w-10 h-10 bg-neutral-700 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-neutral-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        <p>אין פעילות אחרונה</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.slice(0, maxItems).map((activity) => {
        const ActionIcon = actionIcons[activity.action] || Edit;
        const CollectionIcon = collectionIcons[activity.collection] || FileText;
        const timeAgo = activity.createdAt?.toDate 
          ? formatDistanceToNow(activity.createdAt.toDate(), { addSuffix: true, locale: he })
          : activity.createdAt;

        return (
          <div key={activity.id} className="flex items-start gap-3 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${actionColors[activity.action] || 'bg-neutral-700 text-neutral-400'}`}>
              <ActionIcon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white">
                <span className="font-medium">{activity.userEmail?.split('@')[0] || 'Admin'}</span>
                {' '}
                <span className="text-neutral-400">{actionLabels[activity.action] || activity.action}</span>
                {' '}
                <span className="text-neutral-400">{collectionLabels[activity.collection] || activity.collection}:</span>
                {' '}
                <span className="font-medium text-primary-400 truncate">
                  {activity.documentTitle || activity.documentId}
                </span>
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">{timeAgo}</p>
            </div>

            <CollectionIcon className="w-4 h-4 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        );
      })}
    </div>
  );
}
