import { useState, useEffect } from 'react'
import { Sun, Moon, Calendar, BookOpen, Clock, Plus, Check, X, Trash2, Archive, History, Settings, ChevronDown, BarChart3 } from 'lucide-react'
import { useNotifications } from './hooks/useNotifications.js'
import StatisticsChart from './components/StatisticsChart.jsx'
import PWAInstallPrompt from './components/PWAInstallPrompt.jsx'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [activeTab, setActiveTab] = useState('timetable')
  const [showHistory, setShowHistory] = useState(false)
  const [showWeekend, setShowWeekend] = useState(true)
  const [assignmentReminder, setAssignmentReminder] = useState(true)
  const [timeFormat, setTimeFormat] = useState('24h')
  const [reminderDays, setReminderDays] = useState('1')
  const [showTimeFormatDropdown, setShowTimeFormatDropdown] = useState(false)
  const [showReminderDropdown, setShowReminderDropdown] = useState(false)
  
  // 新增的時間顯示設定
  const [showTime, setShowTime] = useState(true)
  const [showDate, setShowDate] = useState(true)
  const [dateFormat, setDateFormat] = useState('MM/DD')
  const [showDateFormatDropdown, setShowDateFormatDropdown] = useState(false)
  
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [showAddAssignment, setShowAddAssignment] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // 新增功能狀態
  const [currentView, setCurrentView] = useState('timetable')
  
  // 初始化通知功能
  const { 
    permission, 
    requestPermission, 
    sendNotification, 
    checkAndNotifyAssignments 
  } = useNotifications()
  
  const [newCourse, setNewCourse] = useState({
    name: '',
    instructor: '',
    day: 1,
    periods: [],
    location: ''
  })
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    course: '',
    description: '',
    startDate: '',
    dueDate: ''
  })
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: '微積分',
      instructor: '王教授',
      schedule: '週一234節',
      location: '理學院 101',
      day: 1,
      periods: [2, 3, 4]
    },
    {
      id: 2,
      name: '程式設計',
      instructor: '李教授',
      schedule: '週三78節',
      location: '資訊館 201',
      day: 3,
      periods: [7, 8]
    },
    {
      id: 3,
      name: '英文',
      instructor: '張教授',
      schedule: '週五4節',
      location: '文學院 301',
      day: 5,
      periods: [4]
    }
  ])

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: '微積分作業第三章',
      course: '微積分',
      startDate: '2025-08-20',
      dueDate: '2025-08-30',
      status: 'pending',
      description: '完成第三章習題 1-20 題'
    },
    {
      id: 2,
      title: 'Python 專案',
      course: '程式設計',
      startDate: '2025-08-25',
      dueDate: '2025-09-05',
      status: 'pending',
      description: '開發一個簡單的計算器應用程式'
    },
    {
      id: 3,
      title: '英文口說報告',
      course: '英文',
      startDate: '2025-08-15',
      dueDate: '2025-08-25',
      status: 'overdue',
      description: '準備 5 分鐘的自我介紹'
    }
  ])

  const [archivedAssignments, setArchivedAssignments] = useState([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-dropdown')) {
        setShowTimeFormatDropdown(false)
        setShowReminderDropdown(false)
        setShowDateFormatDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // PWA 和通知功能初始化
  useEffect(() => {
    // 註冊 Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration)
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
          })
      })
    }

    // 如果開啟作業提醒且有權限，檢查並發送通知
    if (assignmentReminder && permission === 'granted') {
      checkAndNotifyAssignments(assignments)
    }
  }, [])

  // 監聽作業變化並發送通知
  useEffect(() => {
    if (assignmentReminder && permission === 'granted') {
      checkAndNotifyAssignments(assignments)
    }
  }, [assignments, assignmentReminder, permission, checkAndNotifyAssignments])

  // 請求通知權限
  useEffect(() => {
    if (assignmentReminder && permission !== 'granted') {
      requestPermission()
    }
  }, [assignmentReminder, permission, requestPermission])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // 匯出資料為 JSON
  const exportData = () => {
    const data = {
      courses,
      assignments,
      archivedAssignments,
      settings: {
        theme,
        showWeekend,
        assignmentReminder,
        timeFormat,
        reminderDays,
        showTime,
        showDate,
        dateFormat
      },
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    }
    
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `課表資料_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    alert('資料已成功匯出！')
  }

  // 清除所有資料
  const clearAllData = () => {
    const confirmed = window.confirm(
      '確定要清除所有資料嗎？這個操作無法復原！\n\n將會清除：\n• 所有課程\n• 所有作業\n• 所有封存作業\n• 設定偏好'
    )
    
    if (confirmed) {
      const doubleConfirm = window.confirm('再次確認：真的要清除所有資料嗎？')
      
      if (doubleConfirm) {
        // 重置所有狀態到初始值
        setCourses([])
        setAssignments([])
        setArchivedAssignments([])
        setTheme('dark')
        setShowWeekend(true)
        setAssignmentReminder(true)
        setTimeFormat('24h')
        setReminderDays('1')
        setShowTime(true)
        setShowDate(true)
        setDateFormat('MM/DD')
        setActiveTab('timetable')
        setShowHistory(false)
        
        alert('所有資料已清除！')
      }
    }
  }

  // 導入資料
  const importData = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    
    input.onchange = (event) => {
      const file = event.target.files[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          
          // 驗證資料格式
          if (!data.courses && !data.assignments) {
            alert('無效的資料格式！')
            return
          }
          
          const confirmed = window.confirm(
            '導入資料將會覆蓋現有的所有資料，確定要繼續嗎？'
          )
          
          if (confirmed) {
            // 導入課程資料
            if (data.courses) setCourses(data.courses)
            
            // 導入作業資料
            if (data.assignments) setAssignments(data.assignments)
            
            // 導入封存作業資料
            if (data.archivedAssignments) setArchivedAssignments(data.archivedAssignments)
            
            // 導入設定
            if (data.settings) {
              if (data.settings.theme) setTheme(data.settings.theme)
              if (data.settings.showWeekend !== undefined) setShowWeekend(data.settings.showWeekend)
              if (data.settings.assignmentReminder !== undefined) setAssignmentReminder(data.settings.assignmentReminder)
              if (data.settings.timeFormat) setTimeFormat(data.settings.timeFormat)
              if (data.settings.reminderDays) setReminderDays(data.settings.reminderDays)
              if (data.settings.showTime !== undefined) setShowTime(data.settings.showTime)
              if (data.settings.showDate !== undefined) setShowDate(data.settings.showDate)
              if (data.settings.dateFormat) setDateFormat(data.settings.dateFormat)
            }
            
            alert('資料導入成功！')
          }
        } catch (error) {
          alert('資料格式錯誤，無法導入！')
          console.error('Import error:', error)
        }
      }
      reader.readAsText(file)
    }
    
    input.click()
  }

  const toggleAssignmentStatus = (id) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id 
        ? { ...assignment, status: assignment.status === 'completed' ? 'pending' : 'completed' }
        : assignment
    ))
  }

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id))
  }

  const archiveAssignment = (id) => {
    const assignmentToArchive = assignments.find(assignment => assignment.id === id)
    if (assignmentToArchive) {
      setArchivedAssignments([...archivedAssignments, { ...assignmentToArchive, archivedDate: new Date().toISOString() }])
      setAssignments(assignments.filter(assignment => assignment.id !== id))
    }
  }

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
  }

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.instructor && newCourse.location && newCourse.periods.length > 0) {
      const dayNames = ['', '週一', '週二', '週三', '週四', '週五', '週六', '週日']
      const periodsText = newCourse.periods.sort((a, b) => a - b).join('')
      const schedule = `${dayNames[newCourse.day]}${periodsText}節`
      
      const course = {
        id: Date.now(),
        ...newCourse,
        schedule
      }
      
      setCourses([...courses, course])
      setNewCourse({ name: '', instructor: '', day: 1, periods: [], location: '' })
      setShowAddCourse(false)
    }
  }

  const handlePeriodToggle = (period) => {
    setNewCourse(prev => ({
      ...prev,
      periods: prev.periods.includes(period)
        ? prev.periods.filter(p => p !== period)
        : [...prev.periods, period]
    }))
  }

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.course && newAssignment.description && 
        newAssignment.startDate && newAssignment.dueDate) {
      const assignment = {
        id: Date.now(),
        ...newAssignment,
        status: 'pending'
      }
      
      setAssignments([...assignments, assignment])
      setNewAssignment({ title: '', course: '', description: '', startDate: '', dueDate: '' })
      setShowAddAssignment(false)
    }
  }

  // 時間格式選項
  const timeFormats = [
    { value: '24h', label: '24小時制' },
    { value: '12h', label: '12小時制' }
  ]

  // 日期格式選項
  const dateFormats = [
    { value: 'MM/DD', label: 'MM/DD' },
    { value: 'DD/MM', label: 'DD/MM' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' }
  ]

  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0]
  }

  // 更新時間格式化函數
  const formatTime = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = date.getHours()
    const minute = String(date.getMinutes()).padStart(2, '0')
    const second = String(date.getSeconds()).padStart(2, '0')

    let timeString = ''
    let dateString = ''

    // 時間部分
    if (showTime) {
      if (timeFormat === '12h') {
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
        const ampm = hour >= 12 ? ' PM' : ' AM'
        timeString = `${hour12}:${minute}:${second}${ampm}`
      } else {
        timeString = `${String(hour).padStart(2, '0')}:${minute}:${second}`
      }
    }

    // 日期部分
    if (showDate) {
      switch (dateFormat) {
        case 'MM/DD':
          dateString = `${month}/${day}`
          break
        case 'DD/MM':
          dateString = `${day}/${month}`
          break
        case 'YYYY-MM-DD':
          dateString = `${year}-${month}-${day}`
          break
        case 'MM/DD/YYYY':
          dateString = `${month}/${day}/${year}`
          break
        case 'DD/MM/YYYY':
          dateString = `${day}/${month}/${year}`
          break
        default:
          dateString = `${year}年${month}月${day}日`
      }
    }

    // 組合時間和日期
    if (showTime && showDate) {
      return `${dateString} ${timeString}`
    } else if (showTime) {
      return timeString
    } else if (showDate) {
      return dateString
    } else {
      return `${year}年${month}月${day}日${String(hour).padStart(2, '0')}點${minute}分${second}秒` // 預設格式
    }
  }

  // 時間記錄功能
  const getCurrentPeriod = () => {
    const now = currentTime
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentDay = now.getDay() === 0 ? 7 : now.getDay() // 將週日(0)轉為7
    
    // 將當前時間轉換為分鐘數以便比較
    const currentTimeInMinutes = currentHour * 60 + currentMinute
    
    // 定義每個時段的開始和結束時間（以分鐘為單位）
    const timeRanges = [
      { period: 1, start: 7 * 60, end: 7 * 60 + 50 },      // 7:00-7:50
      { period: 2, start: 8 * 60 + 10, end: 9 * 60 },      // 8:10-9:00
      { period: 3, start: 9 * 60 + 10, end: 10 * 60 },     // 9:10-10:00
      { period: 4, start: 10 * 60 + 10, end: 11 * 60 },    // 10:10-11:00
      { period: 5, start: 11 * 60 + 10, end: 12 * 60 },    // 11:10-12:00
      { period: 6, start: 12 * 60 + 10, end: 13 * 60 },    // 12:10-13:00
      { period: 7, start: 13 * 60 + 10, end: 14 * 60 },    // 13:10-14:00
      { period: 8, start: 14 * 60 + 10, end: 15 * 60 },    // 14:10-15:00
      { period: 9, start: 15 * 60 + 10, end: 16 * 60 },    // 15:10-16:00
      { period: 10, start: 16 * 60 + 10, end: 17 * 60 },   // 16:10-17:00
      { period: 11, start: 17 * 60 + 10, end: 18 * 60 },   // 17:10-18:00
      { period: 12, start: 18 * 60 + 20, end: 19 * 60 + 10 }, // 18:20-19:10
      { period: 13, start: 19 * 60 + 15, end: 20 * 60 + 5 },  // 19:15-20:05
      { period: 14, start: 20 * 60 + 10, end: 21 * 60 },   // 20:10-21:00
      { period: 15, start: 21 * 60 + 5, end: 21 * 60 + 55 } // 21:05-21:55
    ]
    
    const currentPeriod = timeRanges.find(range => 
      currentTimeInMinutes >= range.start && currentTimeInMinutes <= range.end
    )
    
    return {
      day: currentDay,
      period: currentPeriod ? currentPeriod.period : null
    }
  }

  const isCurrentTimeSlot = (day, period) => {
    const current = getCurrentPeriod()
    return current.day === day && current.period === period
  }

  const timeSlots = [
    { period: 1, time: '7:00~7:50' },
    { period: 2, time: '8:10~9:00' },
    { period: 3, time: '9:10~10:00' },
    { period: 4, time: '10:10~11:00' },
    { period: 5, time: '11:10~12:00' },
    { period: 6, time: '12:10~13:00' },
    { period: 7, time: '13:10~14:00' },
    { period: 8, time: '14:10~15:00' },
    { period: 9, time: '15:10~16:00' },
    { period: 10, time: '16:10~17:00' },
    { period: 11, time: '17:10~18:00' },
    { period: 12, time: '18:20~19:10' },
    { period: 13, time: '19:15~20:05' },
    { period: 14, time: '20:10~21:00' },
    { period: 15, time: '21:05~21:55' }
  ]
  const days = showWeekend 
    ? ['時間', '週一', '週二', '週三', '週四', '週五', '週六', '週日']
    : ['時間', '週一', '週二', '週三', '週四', '週五']

  // 計算本週的日期
  const getWeekDates = () => {
    const today = new Date()
    const currentDay = today.getDay() // 0 = 周日, 1 = 周一, ..., 6 = 周六
    const mondayDate = new Date(today)
    
    // 計算到周一的偏移量
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1
    mondayDate.setDate(today.getDate() - daysToMonday)
    
    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(mondayDate)
      date.setDate(mondayDate.getDate() + i)
      weekDates.push(date)
    }
    
    return weekDates
  }

  const weekDates = getWeekDates()

  const renderTimetable = () => (
    <div>
      {courses.length === 0 && (
        <div className="empty-state" style={{ marginBottom: '2rem' }}>
          <div className="empty-state-icon">📅</div>
          <h3>尚無課程</h3>
          <p>點擊右上角的「+」按鈕新增你的第一門課程</p>
        </div>
      )}
      
      <div 
        className="timetable" 
        style={{ 
          gridTemplateColumns: showWeekend 
            ? 'minmax(120px, 1fr) repeat(7, 1fr)' 
            : 'minmax(120px, 1fr) repeat(5, 1fr)' 
        }}
      >
      {days.map((day, index) => {
        if (index === 0) {
          return (
            <div key={index} className="day-header">
              {day}
            </div>
          )
        }
        
        const date = weekDates[index - 1]
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`
        const isToday = date.toDateString() === new Date().toDateString()
        
        return (
          <div key={index} className={`day-header ${isToday ? 'today' : ''}`}>
            <div className="day-name">{day}</div>
            <div className="day-date">{dateStr}</div>
          </div>
        )
      })}
      
      {timeSlots.map(slot => (
        <>
          <div key={slot.period} className="time-slot">
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>第{slot.period}節</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{slot.time}</div>
          </div>
          {Array.from({ length: showWeekend ? 7 : 5 }, (_, dayIndex) => {
            const course = courses.find(c => 
              c.day === dayIndex + 1 && 
              c.periods.includes(slot.period)
            )
            
            const isCurrentSlot = isCurrentTimeSlot(dayIndex + 1, slot.period)
            
            return (
              <div 
                key={`${slot.period}-${dayIndex}`} 
                className={`course-slot ${isCurrentSlot ? 'current-time-slot' : ''}`}
              >
                {course && (
                  <div className="course" onClick={() => handleCourseClick(course)}>
                    <div>{course.name}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                      {course.instructor}
                    </div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                      {course.location}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </>
      ))}
      </div>
    </div>
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'status-completed'
      case 'overdue': return 'status-overdue'
      default: return 'status-pending'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'overdue': return '已逾期'
      default: return '待完成'
    }
  }

  const calculateRemainingDays = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    
    // 設定時間為當天的開始（00:00:00）
    today.setHours(0, 0, 0, 0)
    due.setHours(0, 0, 0, 0)
    
    const timeDiff = due.getTime() - today.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    
    return daysDiff
  }

  const formatRemainingDays = (days) => {
    if (days > 0) {
      return `還有 ${days} 天`
    } else if (days === 0) {
      return '今天截止'
    } else {
      return `逾期 ${Math.abs(days)} 天`
    }
  }

  const getRemainingDaysColor = (days) => {
    if (days > 7) return 'var(--success-color)'
    if (days > 3) return 'var(--warning-color)'
    if (days >= 0) return 'var(--danger-color)'
    return 'var(--text-secondary)'
  }

  const renderAssignments = () => {
    // 如果沒有作業，顯示空狀態
    if (assignments.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>尚無作業</h3>
          <p>點擊右上角的「+」按鈕新增你的第一個作業</p>
        </div>
      )
    }

    // 排序：剩餘天數越少的優先，已逾期的放最下方
    const sortedAssignments = assignments.sort((a, b) => {
      const daysA = calculateRemainingDays(a.dueDate)
      const daysB = calculateRemainingDays(b.dueDate)
      
      // 已逾期的放最後（負數天數）
      if (daysA < 0 && daysB >= 0) return 1
      if (daysB < 0 && daysA >= 0) return -1
      
      // 都是逾期的，按日期排序（最近逾期的在前）
      if (daysA < 0 && daysB < 0) return daysB - daysA
      
      // 都是未來的，剩餘天數少的在前
      return daysA - daysB
    })

    return (
      <div className="grid grid-2">
        {sortedAssignments.map(assignment => {
          const remainingDays = calculateRemainingDays(assignment.dueDate)
        
        return (
          <div key={assignment.id} className="assignment-item">
            <div className="assignment-header">
              <div className="assignment-title">{assignment.title}</div>
              <div 
                className="remaining-days"
                style={{ color: getRemainingDaysColor(remainingDays) }}
              >
                {formatRemainingDays(remainingDays)}
              </div>
            </div>
            <div style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              {assignment.course}
            </div>
            <div style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
              {assignment.description}
            </div>
            <div className="assignment-dates">
              <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                開始日期: {assignment.startDate}
              </div>
              <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                截止日期: {assignment.dueDate}
              </div>
            </div>
            <div className="assignment-meta">
              <span className={`status-badge ${getStatusColor(assignment.status)}`}>
                {getStatusText(assignment.status)}
              </span>
              <div className="assignment-actions">
                <button 
                  className="btn btn-danger"
                  onClick={() => deleteAssignment(assignment.id)}
                  style={{ padding: '0.25rem', minWidth: 'auto', marginRight: '0.5rem' }}
                  title="刪除作業"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  className="btn btn-warning"
                  onClick={() => archiveAssignment(assignment.id)}
                  style={{ padding: '0.25rem', minWidth: 'auto', marginRight: '0.5rem' }}
                  title="封存作業"
                >
                  <Archive size={16} />
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => toggleAssignmentStatus(assignment.id)}
                  style={{ padding: '0.25rem', minWidth: 'auto' }}
                  title={assignment.status === 'completed' ? '標記為未完成' : '標記為已完成'}
                >
                  {assignment.status === 'completed' ? <X size={16} /> : <Check size={16} />}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
    )
  }

  // 自定義下拉選單組件
  const CustomDropdown = ({ value, options, onChange, isOpen, setIsOpen, placeholder }) => (
    <div className="custom-dropdown">
      <div 
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{options.find(opt => opt.value === value)?.label || placeholder}</span>
        <ChevronDown size={16} className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map(option => (
            <div
              key={option.value}
              className={`dropdown-item ${value === option.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderArchivedAssignments = () => (
    <div className="grid grid-2">
      {archivedAssignments.length === 0 ? (
        <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
          <Archive size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-secondary)' }}>暫無封存的作業</p>
        </div>
      ) : (
        archivedAssignments.map(assignment => {
          const remainingDays = calculateRemainingDays(assignment.dueDate)
          const archivedDate = new Date(assignment.archivedDate).toLocaleDateString('zh-TW')
          
          return (
            <div key={assignment.id} className="assignment-item" style={{ opacity: 0.7 }}>
              <div className="assignment-header">
                <div className="assignment-title">{assignment.title}</div>
                <div 
                  className="remaining-days"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  已封存
                </div>
              </div>
              <div className="assignment-course">{assignment.course}</div>
              <div className="assignment-description">{assignment.description}</div>
              <div className="assignment-dates">
                <div>開始日期: {assignment.startDate}</div>
                <div>截止日期: {assignment.dueDate}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85em' }}>
                  封存日期: {archivedDate}
                </div>
              </div>
              <div className="assignment-meta">
                <span className={`status-badge ${getStatusColor(assignment.status)}`}>
                  {getStatusText(assignment.status)}
                </span>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setAssignments([...assignments, { ...assignment, id: Date.now() }])
                    setArchivedAssignments(archivedAssignments.filter(a => a.id !== assignment.id))
                  }}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.85em' }}
                  title="恢復作業"
                >
                  恢復
                </button>
              </div>
            </div>
          )
        })
      )}
    </div>
  )

  return (
    <div className="app">
      <header className="header">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          學生助手
          <span style={{ fontSize: '0.6em', color: 'var(--text-secondary)', fontWeight: '400' }}>v1.0</span>
        </h1>
        
        <div className="header-center">
          <div className="current-time">
            <Clock size={16} color="white" />
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>
        
        <div className="header-right">
          <nav className="nav">
            <div 
              className={`nav-item ${activeTab === 'timetable' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('timetable')
                setCurrentView('timetable')
                setShowHistory(false)
              }}
            >
              <Calendar size={16} className="nav-icon" />
              課表總覽
            </div>
            <div 
              className={`nav-item ${activeTab === 'assignments' || showHistory ? 'active' : ''}`}
              onClick={() => {
                if (activeTab === 'assignments' && !showHistory) {
                  setShowHistory(true)
                } else {
                  setActiveTab('assignments')
                  setCurrentView('assignments')
                  setShowHistory(false)
                }
              }}
            >
              {showHistory ? <History size={16} className="nav-icon" /> : <BookOpen size={16} className="nav-icon" />}
              {showHistory ? '歷史作業' : '作業追蹤'}
            </div>
            <div 
              className={`nav-item ${currentView === 'statistics' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('statistics')
                setActiveTab('')
                setShowHistory(false)
              }}
            >
              <BarChart3 size={16} className="nav-icon" />
              統計分析
            </div>
            <div 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings')
                setCurrentView('settings')
                setShowHistory(false)
              }}
            >
              <Settings size={16} className="nav-icon" />
              設定
            </div>
          </nav>

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="container">
        {currentView === 'statistics' && (
          <StatisticsChart 
            assignments={assignments} 
            courses={courses} 
          />
        )}

        {activeTab === 'timetable' && currentView === 'timetable' && (
          <div>
            {renderTimetable()}
          </div>
        )}

        {activeTab === 'assignments' && currentView === 'assignments' && (
          <div>
            {showHistory ? renderArchivedAssignments() : renderAssignments()}
          </div>
        )}

        {activeTab === 'settings' && currentView === 'settings' && (
          <div className="settings-page">
            <h2>設定</h2>
            
            <div className="settings-section">
              <h3>外觀設定</h3>
              <div className="setting-item">
                <label>主題模式</label>
                <div className="theme-selector">
                  <button 
                    className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun size={16} />
                    亮色模式
                  </button>
                  <button 
                    className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon size={16} />
                    深色模式
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>課表設定</h3>
              <div className="setting-item">
                <label>顯示週末</label>
                <div 
                  className={`toggle-switch ${showWeekend ? 'active' : ''}`}
                  onClick={() => setShowWeekend(!showWeekend)}
                >
                  <div className="toggle-slider"></div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>時間顯示設定</h3>
              <div className="setting-item">
                <label>顯示時間</label>
                <div 
                  className={`toggle-switch ${showTime ? 'active' : ''}`}
                  onClick={() => setShowTime(!showTime)}
                >
                  <div className="toggle-slider"></div>
                </div>
              </div>
              <div className="setting-item">
                <label>顯示日期</label>
                <div 
                  className={`toggle-switch ${showDate ? 'active' : ''}`}
                  onClick={() => setShowDate(!showDate)}
                >
                  <div className="toggle-slider"></div>
                </div>
              </div>
              {showTime && (
                <div className="setting-item">
                  <label>時間格式</label>
                  <CustomDropdown
                    value={timeFormat}
                    options={timeFormats}
                    onChange={setTimeFormat}
                    isOpen={showTimeFormatDropdown}
                    setIsOpen={setShowTimeFormatDropdown}
                    placeholder="選擇時間格式"
                  />
                </div>
              )}
              {showDate && (
                <div className="setting-item">
                  <label>日期格式</label>
                  <CustomDropdown
                    value={dateFormat}
                    options={dateFormats}
                    onChange={setDateFormat}
                    isOpen={showDateFormatDropdown}
                    setIsOpen={setShowDateFormatDropdown}
                    placeholder="選擇日期格式"
                  />
                </div>
              )}
            </div>

            <div className="settings-section">
              <h3>通知設定</h3>
              <div className="setting-item">
                <label>作業提醒</label>
                <div 
                  className={`toggle-switch ${assignmentReminder ? 'active' : ''}`}
                  onClick={() => setAssignmentReminder(!assignmentReminder)}
                >
                  <div className="toggle-slider"></div>
                </div>
              </div>
              <div className="setting-item">
                <label>提前提醒時間</label>
                <CustomDropdown
                  value={reminderDays}
                  options={[
                    { value: '1', label: '1天前' },
                    { value: '2', label: '2天前' },
                    { value: '3', label: '3天前' },
                    { value: '7', label: '1週前' }
                  ]}
                  onChange={setReminderDays}
                  isOpen={showReminderDropdown}
                  setIsOpen={setShowReminderDropdown}
                  placeholder="選擇提醒時間"
                />
              </div>
            </div>

            <div className="settings-section">
              <h3>資料管理</h3>
              <div className="setting-item">
                <label>備份與恢復</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-primary" onClick={exportData}>
                    📥 匯出 JSON
                  </button>
                  <button className="btn btn-success" onClick={importData}>
                    📤 導入 JSON
                  </button>
                </div>
              </div>
              <div className="setting-item">
                <label>清除所有資料</label>
                <button className="btn btn-danger" onClick={clearAllData}>
                  🗑️ 清除資料
                </button>
              </div>
            </div>

            <div className="settings-section">
              <h3>關於</h3>
              <div className="about-info">
                <p><strong>課表管理工具</strong></p>
                <p>版本: 1.0.0</p>
                <p>一個現代化的課表與作業管理應用程式</p>
                <div className="features-list">
                  <span className="feature-tag">課表總覽</span>
                  <span className="feature-tag">作業追蹤</span>
                  <span className="feature-tag">深色模式</span>
                  <span className="feature-tag">響應式設計</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 懸浮新增作業按鈕 */}
      {activeTab === 'assignments' && !showHistory && (
        <button 
          className="floating-add-btn" 
          onClick={() => setShowAddAssignment(true)}
          title="新增作業"
        >
          <Plus size={24} />
        </button>
      )}

      {/* 懸浮新增課程按鈕 */}
      {activeTab === 'timetable' && (
        <button 
          className="floating-add-btn" 
          onClick={() => setShowAddCourse(true)}
          title="新增課程"
        >
          <Plus size={24} />
        </button>
      )}

      {/* 課程詳情彈窗 */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>課程資訊</h3>
              <button className="close-btn" onClick={() => setSelectedCourse(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="course-info-item">
                <strong>課程名稱：</strong> {selectedCourse.name}
              </div>
              <div className="course-info-item">
                <strong>授課老師：</strong> {selectedCourse.instructor}
              </div>
              <div className="course-info-item">
                <strong>上課節次：</strong> {selectedCourse.schedule}
              </div>
              <div className="course-info-item">
                <strong>上課教室：</strong> {selectedCourse.location}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 新增課程彈窗 */}
      {showAddCourse && (
        <div className="modal-overlay" onClick={() => setShowAddCourse(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>新增課程</h3>
              <button className="close-btn" onClick={() => setShowAddCourse(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>課程名稱</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={e => setNewCourse({...newCourse, name: e.target.value})}
                  placeholder="輸入課程名稱"
                />
              </div>
              <div className="form-group">
                <label>授課老師</label>
                <input
                  type="text"
                  value={newCourse.instructor}
                  onChange={e => setNewCourse({...newCourse, instructor: e.target.value})}
                  placeholder="輸入授課老師"
                />
              </div>
              <div className="form-group">
                <label>星期</label>
                <select
                  value={newCourse.day}
                  onChange={e => setNewCourse({...newCourse, day: parseInt(e.target.value)})}
                >
                  <option value={1}>週一</option>
                  <option value={2}>週二</option>
                  <option value={3}>週三</option>
                  <option value={4}>週四</option>
                  <option value={5}>週五</option>
                  <option value={6}>週六</option>
                  <option value={7}>週日</option>
                </select>
              </div>
              <div className="form-group">
                <label>上課節次</label>
                <div className="periods-grid">
                  {timeSlots.map(slot => (
                    <button
                      key={slot.period}
                      type="button"
                      className={`period-btn ${newCourse.periods.includes(slot.period) ? 'selected' : ''}`}
                      onClick={() => handlePeriodToggle(slot.period)}
                    >
                      第{slot.period}節
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>上課教室</label>
                <input
                  type="text"
                  value={newCourse.location}
                  onChange={e => setNewCourse({...newCourse, location: e.target.value})}
                  placeholder="輸入上課教室"
                />
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowAddCourse(false)}>
                  取消
                </button>
                <button className="btn" onClick={handleAddCourse}>
                  新增
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 新增作業彈窗 */}
      {showAddAssignment && (
        <div className="modal-overlay" onClick={() => setShowAddAssignment(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>新增作業</h3>
              <button className="close-btn" onClick={() => setShowAddAssignment(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label>作業名稱</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="輸入作業名稱"
                />
              </div>
              <div className="form-group">
                <label>哪門課程</label>
                <select
                  value={newAssignment.course}
                  onChange={e => setNewAssignment({...newAssignment, course: e.target.value})}
                >
                  <option value="">請選擇課程</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.name}>
                      {course.name} ({course.instructor})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>作業要求</label>
                <textarea
                  value={newAssignment.description}
                  onChange={e => setNewAssignment({...newAssignment, description: e.target.value})}
                  placeholder="詳細描述作業要求..."
                  rows={4}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>開始日期</label>
                  <input
                    type="date"
                    value={newAssignment.startDate}
                    onChange={e => setNewAssignment({...newAssignment, startDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>截止日期</label>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    min={newAssignment.startDate}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowAddAssignment(false)}>
                  取消
                </button>
                <button className="btn" onClick={handleAddAssignment}>
                  新增
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <PWAInstallPrompt />
    </div>
  )
}

export default App
