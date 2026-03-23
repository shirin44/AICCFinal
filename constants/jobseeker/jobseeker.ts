// src/content/jobseekerHistoryContent.ts
import { Language } from "@/types";

export const JOBSEEKER_HISTORY_CONTENT = {
  // Progress / header
  progressTitle: {
    [Language.EN]: "Your Progress",
    [Language.VN]: "Tiến độ của bạn",
  },
  clearAll: {
    [Language.EN]: "Clear All",
    [Language.VN]: "Xóa tất cả",
  },
  levelLabel: {
    [Language.EN]: "Level",
    [Language.VN]: "Cấp",
  },
  xpLabel: {
    [Language.EN]: "XP",
    [Language.VN]: "XP",
  },
  streakLabel: {
    [Language.EN]: "Streak",
    [Language.VN]: "Chuỗi ngày",
  },
  streakSuffix: {
    [Language.EN]: "d",
    [Language.VN]: " ngày",
  },
  xpToNextLabel: {
    [Language.EN]: "XP to next level",
    [Language.VN]: "XP tới cấp tiếp theo",
  },
  sessionsLabel: {
    [Language.EN]: "Sessions",
    [Language.VN]: "Phiên",
  },
  avgScoreLabel: {
    [Language.EN]: "Avg score",
    [Language.VN]: "Điểm TB",
  },
  thisWeekLabel: {
    [Language.EN]: "This week",
    [Language.VN]: "Tuần này",
  },

  // Badges section
  badgesTitle: {
    [Language.EN]: "Your Badges",
    [Language.VN]: "Huy hiệu của bạn",
  },
  badgesEmpty: {
    [Language.EN]:
      "No badges yet — complete a practice to earn your first badge.",
    [Language.VN]:
      "Chưa có huy hiệu — hãy hoàn thành một buổi luyện tập để nhận huy hiệu đầu tiên.",
  },

  // Sessions section
  sessionsTitle: {
    [Language.EN]: "Past Sessions",
    [Language.VN]: "Các buổi trước",
  },
  sessionsEmpty: {
    [Language.EN]:
      "No sessions yet. Start a practice to see your history here.",
    [Language.VN]:
      "Chưa có phiên luyện tập. Hãy bắt đầu để xem lịch sử tại đây.",
  },
  overallScoreLabel: {
    [Language.EN]: "Overall Score",
    [Language.VN]: "Điểm tổng",
  },

  // Dialogs
  clearConfirm: {
    [Language.EN]: "Clear all history?",
    [Language.VN]: "Xóa toàn bộ lịch sử?",
  },
} as const;

// Badge-specific translations
export const JOBSEEKER_BADGE_LABELS = {
  first: {
    name: {
      [Language.EN]: "First Step",
      [Language.VN]: "Bước đầu tiên",
    },
    description: {
      [Language.EN]: "Completed your first practice session!",
      [Language.VN]: "Hoàn thành buổi luyện tập đầu tiên của bạn!",
    },
  },
  five: {
    name: {
      [Language.EN]: "High-Five",
      [Language.VN]: "Năm lần cố gắng",
    },
    description: {
      [Language.EN]: "Reached 5 total sessions.",
      [Language.VN]: "Đã hoàn thành 5 buổi luyện tập.",
    },
  },
  ten: {
    name: {
      [Language.EN]: "Double Digits",
      [Language.VN]: "Hai chữ số",
    },
    description: {
      [Language.EN]: "Completed 10 sessions — consistency pays!",
      [Language.VN]:
        "Hoàn thành 10 buổi luyện tập — sự kiên trì được đền đáp!",
    },
  },
  "four-star": {
    name: {
      [Language.EN]: "STAR Expert",
      [Language.VN]: "Chuyên gia STAR",
    },
    description: {
      [Language.EN]: "Achieved an overall score ≥ 4.",
      [Language.VN]: "Đạt điểm tổng từ 4 trở lên.",
    },
  },
  perfect: {
    name: {
      [Language.EN]: "Perfect Answer",
      [Language.VN]: "Câu trả lời hoàn hảo",
    },
    description: {
      [Language.EN]: "Hit a 5-star overall score.",
      [Language.VN]: "Đạt điểm tuyệt đối 5 sao.",
    },
  },
  streak2: {
    name: {
      [Language.EN]: "On a Roll",
      [Language.VN]: "Đà tiến bộ",
    },
    description: {
      [Language.EN]: "Practiced several days in a row.",
      [Language.VN]: "Luyện tập liên tiếp nhiều ngày.",
    },
  },
  streak7: {
    name: {
      [Language.EN]: "Weekly Streak",
      [Language.VN]: "Chuỗi 7 ngày",
    },
    description: {
      [Language.EN]: "7-day practice streak!",
      [Language.VN]: "Chuỗi luyện tập 7 ngày liên tiếp!",
    },
  },
  weekly5: {
    name: {
      [Language.EN]: "Week Warrior",
      [Language.VN]: "Chiến binh tuần",
    },
    description: {
      [Language.EN]: "Practiced 5+ times this week.",
      [Language.VN]: "Luyện tập ít nhất 5 lần trong tuần này.",
    },
  },
  "star-specialist": {
    name: {
      [Language.EN]: "STAR Specialist",
      [Language.VN]: "Chuyên sâu STAR",
    },
    description: {
      [Language.EN]: "3 STAR Interview sessions.",
      [Language.VN]: "Hoàn thành 3 buổi luyện tập STAR Interview.",
    },
  },
  "common-pro": {
    name: {
      [Language.EN]: "Common Q Pro",
      [Language.VN]: "Chuyên gia câu hỏi thường gặp",
    },
    description: {
      [Language.EN]: "3 Common Questions sessions.",
      [Language.VN]: "Hoàn thành 3 buổi luyện tập Common Questions.",
    },
  },
  smalltalker: {
    name: {
      [Language.EN]: "Small Talker",
      [Language.VN]: "Người giỏi trò chuyện",
    },
    description: {
      [Language.EN]: "3 Small Talk sessions.",
      [Language.VN]: "Hoàn thành 3 buổi luyện tập Small Talk.",
    },
  },
  "early-bird": {
    name: {
      [Language.EN]: "Early Bird",
      [Language.VN]: "Chim sớm",
    },
    description: {
      [Language.EN]: "Practiced in the morning.",
      [Language.VN]: "Luyện tập vào buổi sáng.",
    },
  },
  "night-owl": {
    name: {
      [Language.EN]: "Night Owl",
      [Language.VN]: "Cú đêm",
    },
    description: {
      [Language.EN]: "Practiced in the evening.",
      [Language.VN]: "Luyện tập vào buổi tối.",
    },
  },
  comeback: {
    name: {
      [Language.EN]: "Comeback",
      [Language.VN]: "Trở lại đường đua",
    },
    description: {
      [Language.EN]: "Returned after a long break.",
      [Language.VN]: "Quay lại luyện tập sau một thời gian gián đoạn.",
    },
  },
  twenty: {
    name: {
      [Language.EN]: "Unstoppable",
      [Language.VN]: "Không thể ngăn cản",
    },
    description: {
      [Language.EN]: "Reached 20 total sessions.",
      [Language.VN]: "Đã hoàn thành 20 buổi luyện tập.",
    },
  },
  streak3: {
    name: {
      [Language.EN]: "3-Day Run",
      [Language.VN]: "Chuỗi 3 ngày",
    },
    description: {
      [Language.EN]: "3 days of practice in a row.",
      [Language.VN]: "Luyện tập 3 ngày liên tiếp.",
    },
  },
  streak14: {
    name: {
      [Language.EN]: "Two-Week Streak",
      [Language.VN]: "Chuỗi hai tuần",
    },
    description: {
      [Language.EN]: "14 straight days of practice!",
      [Language.VN]: "14 ngày luyện tập liên tiếp!",
    },
  },
  "avg-four": {
    name: {
      [Language.EN]: "Consistent Quality",
      [Language.VN]: "Chất lượng ổn định",
    },
    description: {
      [Language.EN]: "Average score of 4 or above.",
      [Language.VN]: "Điểm trung bình đạt 4 trở lên.",
    },
  },
  "high-scorer": {
    name: {
      [Language.EN]: "High Scorer",
      [Language.VN]: "Điểm cao liên tục",
    },
    description: {
      [Language.EN]: "Scored 4+ three separate times.",
      [Language.VN]: "Đạt điểm từ 4 trở lên ba lần riêng biệt.",
    },
  },
  diverse: {
    name: {
      [Language.EN]: "All-Rounder",
      [Language.VN]: "Toàn diện",
    },
    description: {
      [Language.EN]: "Tried all three practice types.",
      [Language.VN]: "Đã thử cả ba loại hình luyện tập.",
    },
  },
  "star-master": {
    name: {
      [Language.EN]: "STAR Master",
      [Language.VN]: "Bậc thầy STAR",
    },
    description: {
      [Language.EN]: "Completed 10 STAR Interview sessions.",
      [Language.VN]: "Hoàn thành 10 buổi luyện tập STAR Interview.",
    },
  },
  "speed-runner": {
    name: {
      [Language.EN]: "Speed Runner",
      [Language.VN]: "Luyện tập dồn dập",
    },
    description: {
      [Language.EN]: "Completed 2 or more sessions in a single day.",
      [Language.VN]: "Hoàn thành 2 buổi trở lên trong một ngày.",
    },
  },
  consistency: {
    name: {
      [Language.EN]: "Show Up",
      [Language.VN]: "Kiên trì xuất hiện",
    },
    description: {
      [Language.EN]: "Practiced at least 3 times this week.",
      [Language.VN]: "Luyện tập ít nhất 3 lần trong tuần này.",
    },
  },
  explorer: {
    name: {
      [Language.EN]: "Explorer",
      [Language.VN]: "Khám phá",
    },
    description: {
      [Language.EN]: "Practiced 2 different question types.",
      [Language.VN]: "Đã luyện tập 2 loại câu hỏi khác nhau.",
    },
  },
} as const;
