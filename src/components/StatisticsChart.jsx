import React from 'react';

// 簡化版統計組件（不依賴 Chart.js）
const StatisticsChart = ({ assignments = [], courses = [] }) => {
  // 計算作業完成率
  const calculateCompletionRate = () => {
    if (assignments.length === 0) return 0;
    const completed = assignments.filter(a => a.status === 'completed').length;
    return Math.round((completed / assignments.length) * 100);
  };

  // 獲取未完成作業
  const getUpcomingAssignments = () => {
    const upcoming = assignments
      .filter(a => a.status !== 'completed' && a.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
    
    return upcoming.map(assignment => {
      const dueDate = new Date(assignment.dueDate);
      const now = new Date();
      const timeDiff = dueDate.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return {
        ...assignment,
        daysLeft: daysDiff,
        isOverdue: daysDiff < 0,
        isUrgent: daysDiff <= 3 && daysDiff >= 0
      };
    });
  };

  const completionRate = calculateCompletionRate();
  const upcomingAssignments = getUpcomingAssignments();

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h2>📊 學習統計</h2>
        <p>追蹤你的學習進度和表現</p>
      </div>

      <div className="stats-grid">
        {/* 作業完成率 */}
        <div className="stat-card completion-card">
          <div className="stat-header">
            <h3>📝 作業完成率</h3>
          </div>
          <div className="completion-display">
            <div className="completion-circle">
              <svg viewBox="0 0 100 100" className="progress-ring">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--background-secondary)"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="10"
                  strokeDasharray={`${completionRate * 2.83} 283`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="completion-text">
                <span className="completion-number">{completionRate}%</span>
              </div>
            </div>
            <div className="completion-details">
              <div className="detail-item">
                <span className="detail-label">已完成</span>
                <span className="detail-value">{assignments.filter(a => a.status === 'completed').length}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">總數</span>
                <span className="detail-value">{assignments.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 即將到期的作業 */}
        <div className="stat-card upcoming-card">
          <div className="stat-header">
            <h3>⏰ 即將到期</h3>
          </div>
          <div className="upcoming-list">
            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map(assignment => (
                <div key={assignment.id} className="upcoming-item">
                  <div className="upcoming-info">
                    <span className="assignment-title">{assignment.title}</span>
                    <span className="assignment-subject">{assignment.course}</span>
                  </div>
                  <div className={`days-left ${assignment.isOverdue ? 'overdue' : assignment.isUrgent ? 'urgent' : ''}`}>
                    {assignment.isOverdue ? '已逾期' : `${assignment.daysLeft}天`}
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">沒有即將到期的作業</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
