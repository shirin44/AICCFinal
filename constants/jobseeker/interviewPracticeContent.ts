// src/content/interviewPracticeContent.ts
import { Language } from "@/types";

export const INTERVIEW_PRACTICE_CONTENT = {
  // General steps
  stepLabelSetup: {
    [Language.EN]: "Step 1 · Choose how you want to practice",
    [Language.VN]: "Bước 1 · Chọn cách bạn muốn luyện tập",
  },
  stepLabelPractice: {
    [Language.EN]: "Step 2 · Read the question and answer at your own pace",
    [Language.VN]: "Bước 2 · Đọc câu hỏi và trả lời theo nhịp của bạn",
  },
  stepLabelSummary: {
    [Language.EN]: "Step 3 · Review your feedback and next steps",
    [Language.VN]: "Bước 3 · Xem lại phản hồi và bước tiếp theo",
  },

  // Setup screen
  chooseTypeTitle: {
    [Language.EN]: "Choose Your Practice Type",
    [Language.VN]: "Chọn kiểu luyện tập",
  },
  chooseTypeSubtitle: {
    [Language.EN]: "Pick one option. You can always change it later.",
    [Language.VN]: "Chọn một tùy chọn. Bạn luôn có thể đổi sau.",
  },

  practiceTypeLabel: {
    [Language.EN]: {
      "STAR Interview": "STAR Interview",
      "Common Questions": "Common Questions",
      "Small Talk": "Small Talk",
    },
    [Language.VN]: {
      "STAR Interview": "Phỏng vấn STAR",
      "Common Questions": "Câu hỏi thường gặp",
      "Small Talk": "Trò chuyện nhẹ nhàng",
    },
  },

  practiceTypeDescription: {
    [Language.EN]: {
      "STAR Interview":
        "Practice structured answers using Situation, Task, Action, Result.",
      "Common Questions":
        "Prepare for classic interview questions in a clear format.",
      "Small Talk":
        "Warm up with gentle conversation-style questions.",
    },
    [Language.VN]: {
      "STAR Interview":
        "Luyện trả lời theo cấu trúc Situation, Task, Action, Result.",
      "Common Questions":
        "Chuẩn bị cho các câu hỏi phỏng vấn phổ biến, rõ ràng.",
      "Small Talk":
        "Khởi động với các câu hỏi trò chuyện nhẹ nhàng.",
    },
  },

  calmModeLabel: {
    [Language.EN]: "Enable Calm Practice Mode",
    [Language.VN]: "Bật Chế độ luyện tập nhẹ nhàng",
  },
  calmModeDescription: {
    [Language.EN]:
      "Slower pace, gentle reminders, and no time pressure.",
    [Language.VN]:
      "Nhịp độ chậm hơn, nhắc nhở nhẹ nhàng, không áp lực thời gian.",
  },

  calmModeBanner: {
    [Language.EN]:
      "You can pause, read again, and answer slowly. There is no time limit.",
    [Language.VN]:
      "Bạn có thể tạm dừng, đọc lại và trả lời từ từ. Không có giới hạn thời gian.",
  },

  savedQuestionsTitle: {
    [Language.EN]: "Saved Questions",
    [Language.VN]: "Câu hỏi đã lưu",
  },

  // Practice view
  backToSetup: {
    [Language.EN]: "Back to Practice Types",
    [Language.VN]: "Quay lại chọn kiểu luyện tập",
  },
  questionLabel: {
    [Language.EN]: "Question",
    [Language.VN]: "Câu hỏi",
  },
  questionOf: {
    [Language.EN]: "of",
    [Language.VN]: "trên",
  },
  savedBadge: {
    [Language.EN]: "Saved",
    [Language.VN]: "Đã lưu",
  },
  yourAnswerLabel: {
    [Language.EN]: "Your answer",
    [Language.VN]: "Câu trả lời của bạn",
  },
  answerPlaceholder: {
    [Language.EN]:
      "You can type, speak, or paste your answer here. It’s okay to take your time.",
    [Language.VN]:
      "Bạn có thể gõ, nói hoặc dán câu trả lời tại đây. Cứ bình tĩnh, không cần vội.",
  },
  characterCountLabel: {
    [Language.EN]: "characters used",
    [Language.VN]: "kí tự đã dùng",
  },

  starHintTitle: {
    [Language.EN]: "Need structure?",
    [Language.VN]: "Cần cấu trúc rõ hơn?",
  },
  starHintLine1: {
    [Language.EN]: "S — Situation: What was happening?",
    [Language.VN]: "S — Situation: Chuyện gì đang xảy ra?",
  },
  starHintLine2: {
    [Language.EN]: "T — Task: What was your role or goal?",
    [Language.VN]: "T — Task: Vai trò hoặc mục tiêu của bạn là gì?",
  },
  starHintLine3: {
    [Language.EN]: "A — Action: What did you do?",
    [Language.VN]: "A — Action: Bạn đã làm gì?",
  },
  starHintLine4: {
    [Language.EN]: "R — Result: What changed because of your actions?",
    [Language.VN]: "R — Result: Kết quả sau đó là gì?",
  },

  // Summary
  summaryTitle: {
    [Language.EN]: "Session Summary",
    [Language.VN]: "Tóm tắt buổi luyện tập",
  },

  // Errors / messages
  errorNoAnswer: {
    [Language.EN]: "Please write or say a short answer before requesting feedback.",
    [Language.VN]:
      "Vui lòng viết hoặc nói một câu trả lời ngắn trước khi xin phản hồi.",
  },
  unknownError: {
    [Language.EN]:
      "Something went wrong while getting feedback. You can try again in a moment.",
    [Language.VN]:
      "Đã có lỗi khi lấy phản hồi. Bạn có thể thử lại sau một chút.",
  },
  endOfSetNotice: {
    [Language.EN]:
      "You’ve reached the end of this question set. You can go back and choose another type or repeat a question.",
    [Language.VN]:
      "Bạn đã hoàn thành bộ câu hỏi này. Bạn có thể quay lại để chọn kiểu khác hoặc luyện lại một câu hỏi.",
  },
} as const;
