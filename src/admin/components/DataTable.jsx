// src/admin/components/DataTable.jsx
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ 
  columns, 
  data, 
  loading = false,
  emptyMessage = 'אין נתונים',
  emptyAction = null,
  pageSize = 10,
  sortable = true
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key) => {
    if (!sortable) return;
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) {
    return (
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl overflow-hidden">
        <div className="animate-pulse">
          {/* Header */}
          <div className="border-b border-neutral-700 p-4">
            <div className="flex gap-4">
              {columns.map((col, i) => (
                <div key={i} className="h-4 bg-neutral-700 rounded flex-1"></div>
              ))}
            </div>
          </div>
          {/* Rows */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-neutral-700 p-4 last:border-0">
              <div className="flex gap-4">
                {columns.map((col, j) => (
                  <div key={j} className="h-6 bg-neutral-700 rounded flex-1"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-12 text-center">
        <p className="text-neutral-500 mb-3">{emptyMessage}</p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={`px-4 py-3 text-right text-sm font-medium text-neutral-400 ${
                    sortable && column.sortable !== false ? 'cursor-pointer hover:text-white' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && sortConfig.key === column.key && (
                      sortConfig.direction === 'asc' 
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr 
                key={row.id || index} 
                className="border-b border-neutral-700 last:border-0 hover:bg-neutral-700/30 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-neutral-700 px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-neutral-400">
            מציג {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, data.length)} מתוך {data.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-sm text-neutral-400">
              עמוד {currentPage} מתוך {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
