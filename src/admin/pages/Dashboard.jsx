// src/admin/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { 
  FileText, 
  Wrench, 
  MessageSquareQuote, 
  Image, 
  Users,
  TrendingUp,
  Plus,
  ArrowLeft,
  Calendar,
  Eye
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ActivityFeed from '../components/ActivityFeed';

export default function Dashboard() {
  const [stats, setStats] = useState({
    articles: { total: 0, published: 0, loading: true },
    tools: { total: 0, loading: true },
    testimonials: { total: 0, loading: true },
    portfolio: { total: 0, loading: true },
    contacts: { total: 0, thisMonth: 0, loading: true },
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentActivity();
    fetchRecentArticles();
  }, []);

  const fetchStats = async () => {
    try {
      // Parallelize all Firestore queries for 3-5x faster loading
      const [articlesSnap, toolsSnap, testimonialsSnap, portfolioSnap, contactsSnap] = await Promise.all([
        getDocs(collection(db, 'articles')),
        getDocs(collection(db, 'tools')),
        getDocs(collection(db, 'testimonials')),
        getDocs(collection(db, 'portfolio')),
        getDocs(collection(db, 'contactMessages'))
      ]);

      // Calculate derived data
      const publishedArticles = articlesSnap.docs.filter(doc => doc.data().published).length;

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const thisMonthContacts = contactsSnap.docs.filter(doc => {
        const createdAt = doc.data().createdAt?.toDate?.();
        return createdAt && createdAt >= startOfMonth;
      }).length;

      // Update all stats at once
      setStats({
        articles: { total: articlesSnap.size, published: publishedArticles, loading: false },
        tools: { total: toolsSnap.size, loading: false },
        testimonials: { total: testimonialsSnap.size, loading: false },
        portfolio: { total: portfolioSnap.size, loading: false },
        contacts: { total: contactsSnap.size, thisMonth: thisMonthContacts, loading: false }
      });

    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching stats:', error);
      // Set all to not loading on error
      setStats(prev => ({
        articles: { ...prev.articles, loading: false },
        tools: { ...prev.tools, loading: false },
        testimonials: { ...prev.testimonials, loading: false },
        portfolio: { ...prev.portfolio, loading: false },
        contacts: { ...prev.contacts, loading: false },
      }));
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const q = query(
        collection(db, 'activityLogs'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const activities = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentActivity(activities);
    } catch (error) {
      console.error('Error fetching activity:', error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const fetchRecentArticles = async () => {
    try {
      const q = query(
        collection(db, 'articles'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const articles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentArticles(articles);
    } catch (error) {
      console.error('Error fetching recent articles:', error);
    }
  };

  const quickActions = [
    { label: 'מאמר חדש', icon: FileText, href: '/admin/articles/new', color: 'primary' },
    { label: 'כלי חדש', icon: Wrench, href: '/admin/tools?action=new', color: 'secondary' },
    { label: 'המלצה חדשה', icon: MessageSquareQuote, href: '/admin/testimonials?action=new', color: 'green' },
    { label: 'עבודה חדשה', icon: Image, href: '/admin/portfolio?action=new', color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">דאשבורד</h1>
          <p className="text-neutral-400 mt-1">ברוך הבא לממשק הניהול של Joya-Tech</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('he-IL', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="מאמרים"
          value={stats.articles.total}
          icon={FileText}
          color="primary"
          loading={stats.articles.loading}
          trend="up"
          trendValue={`${stats.articles.published} מפורסמים`}
        />
        <StatsCard
          title="כלים"
          value={stats.tools.total}
          icon={Wrench}
          color="secondary"
          loading={stats.tools.loading}
        />
        <StatsCard
          title="המלצות"
          value={stats.testimonials.total}
          icon={MessageSquareQuote}
          color="green"
          loading={stats.testimonials.loading}
        />
        <StatsCard
          title="תיק עבודות"
          value={stats.portfolio.total}
          icon={Image}
          color="purple"
          loading={stats.portfolio.loading}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">פעולות מהירות</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex items-center gap-3 p-4 bg-neutral-700/30 hover:bg-neutral-700/50 border border-neutral-600 rounded-xl transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg bg-${action.color}-500/20 flex items-center justify-center`}>
                <action.icon className={`w-5 h-5 text-${action.color}-400`} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-white">{action.label}</span>
              </div>
              <Plus className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">מאמרים אחרונים</h2>
            <Link to="/admin/articles" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
              הצג הכל
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          
          {recentArticles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-500">אין מאמרים עדיין</p>
              <Link 
                to="/admin/articles/new" 
                className="inline-block mt-3 text-sm text-primary-400 hover:text-primary-300"
              >
                צור מאמר ראשון
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/admin/articles/${article.id}`}
                  className="flex items-center gap-3 p-3 bg-neutral-700/20 hover:bg-neutral-700/40 rounded-lg transition-colors group"
                >
                  {article.featuredImage ? (
                    <img 
                      src={article.featuredImage} 
                      alt="" 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-neutral-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">
                      {article.title_he || article.title_en}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {article.category} • {article.published ? 'מפורסם' : 'טיוטה'}
                    </p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">פעילות אחרונה</h2>
            <Link to="/admin/activity" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
              הצג הכל
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          
          <ActivityFeed activities={recentActivity} loading={loadingActivity} maxItems={6} />
        </div>
      </div>

      {/* Contacts Summary */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">פניות מהאתר</h2>
          <span className="text-sm text-neutral-400">
            {stats.contacts.thisMonth} פניות החודש
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-neutral-700/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.contacts.total}</p>
                <p className="text-sm text-neutral-400">סה"כ פניות</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-700/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.contacts.thisMonth}</p>
                <p className="text-sm text-neutral-400">החודש</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
