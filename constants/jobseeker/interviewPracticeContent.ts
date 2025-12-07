// src/content/interviewPracticeContent.ts
import { Language } from "@/types";

type PracticeTypeKey = "STAR Interview" | "Common Questions" | "Small Talk";

export const INTERVIEW_PRACTICE_CONTENT = {
  /* ---------- Step labels ---------- */
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

  /* ---------- Setup screen ---------- */
  chooseTypeTitle: {
    [Language.EN]: "Choose your practice type",
    [Language.VN]: "Chọn kiểu luyện tập",
  },
  chooseTypeSubtitle: {
    [Language.EN]:
      "You can change this any time. There is no wrong choice.",
    [Language.VN]:
      "Bạn có thể thay đổi bất cứ lúc nào. Không có lựa chọn nào là sai.",
  },

  practiceTypeLabel: {
    [Language.EN]: {
      "STAR Interview": "STAR Interview",
      "Common Questions": "Common interview questions",
      "Small Talk": "Small talk warm-up",
    } as Record<PracticeTypeKey, string>,
    [Language.VN]: {
      "STAR Interview": "Phỏng vấn STAR",
      "Common Questions": "Câu hỏi phỏng vấn thường gặp",
      "Small Talk": "Khởi động trò chuyện",
    } as Record<PracticeTypeKey, string>,
  },

  practiceTypeDescription: {
    [Language.EN]: {
      "STAR Interview":
        "Practice structured answers using Situation, Task, Action, Result.",
      "Common Questions":
        "Prepare for classic interview questions in a clear, simple way.",
      "Small Talk":
        "Gently warm up with low-pressure conversation-style questions.",
    } as Record<PracticeTypeKey, string>,
    [Language.VN]: {
      "STAR Interview":
        "Luyện trả lời theo cấu trúc Situation, Task, Action, Result.",
      "Common Questions":
        "Chuẩn bị cho các câu hỏi phỏng vấn phổ biến, rõ ràng và đơn giản.",
      "Small Talk":
        "Khởi động nhẹ nhàng với các câu hỏi trò chuyện ít áp lực.",
    } as Record<PracticeTypeKey, string>,
  },

  calmModeLabel: {
    [Language.EN]: "Enable calm practice mode",
    [Language.VN]: "Bật chế độ luyện tập nhẹ nhàng",
  },
  calmModeDescription: {
    [Language.EN]:
      "Slower pace, no timers, and gentle reminders. You can pause any time.",
    [Language.VN]:
      "Nhịp độ chậm hơn, không có đồng hồ đếm, và nhắc nhở nhẹ nhàng. Bạn có thể tạm dừng bất cứ lúc nào.",
  },

  calmModeBanner: {
    [Language.EN]:
      "There is no time limit. You can re-read the question, think, and answer slowly.",
    [Language.VN]:
      "Không có giới hạn thời gian. Bạn có thể đọc lại câu hỏi, suy nghĩ và trả lời thật chậm.",
  },

  savedQuestionsTitle: {
    [Language.EN]: "Saved questions",
    [Language.VN]: "Câu hỏi đã lưu",
  },

  /* ---------- Practice view ---------- */
  backToSetup: {
    [Language.EN]: "Back to practice types",
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

  currentModeLabel: {
    [Language.EN]: "Mode",
    [Language.VN]: "Chế độ",
  },

  savedBadge: {
    [Language.EN]: "Saved",
    [Language.VN]: "Đã lưu",
  },

  // STAR hint block
  starHintTitle: {
    [Language.EN]: "STAR structure (optional guide)",
    [Language.VN]: "Cấu trúc STAR (gợi ý tùy chọn)",
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
    [Language.EN]:
      "R — Result: What changed because of your actions?",
    [Language.VN]:
      "R — Result: Điều gì đã thay đổi nhờ hành động của bạn?",
  },

  /* ---------- Answer section ---------- */
  yourAnswerLabel: {
    [Language.EN]: "Your answer",
    [Language.VN]: "Câu trả lời của bạn",
  },

  answerHelperTitle: {
    [Language.EN]: "You can answer in a way that feels comfortable",
    [Language.VN]: "Bạn có thể trả lời theo cách khiến bạn thấy thoải mái",
  },

  answerHelperList1: {
    [Language.EN]: "Short sentences are okay.",
    [Language.VN]: "Câu ngắn là được.",
  },
  answerHelperList2: {
    [Language.EN]: "You do not need perfect grammar.",
    [Language.VN]: "Bạn không cần ngữ pháp hoàn hảo.",
  },
  answerHelperList3: {
    [Language.EN]: "You can pause and come back later.",
    [Language.VN]: "Bạn có thể tạm dừng và quay lại sau.",
  },

  answerPlaceholder: {
    [Language.EN]:
      "You can type, paste, or speak your answer here. It is okay to take breaks.",
    [Language.VN]:
      "Bạn có thể gõ, dán hoặc nói câu trả lời tại đây. Nghỉ giữa chừng là bình thường.",
  },

  characterCountLabel: {
    [Language.EN]: "characters used",
    [Language.VN]: "kí tự đã dùng",
  },

  voiceLabel: {
    [Language.EN]: "Voice",
    [Language.VN]: "Giọng nói",
  },
  voiceTooltip: {
    [Language.EN]: "Use your voice if typing feels tiring.",
    [Language.VN]: "Dùng giọng nói nếu bạn thấy gõ phím mệt.",
  },

  /* ---------- Summary ---------- */
  summaryTitle: {
    [Language.EN]: "Session summary",
    [Language.VN]: "Tóm tắt buổi luyện tập",
  },

  /* ---------- System / messages ---------- */
  errorNoAnswer: {
    [Language.EN]:
      "Please write or say a short answer before requesting feedback.",
    [Language.VN]:
      "Vui lòng viết hoặc nói một câu trả lời ngắn trước khi xin phản hồi.",
  },

  unknownError: {
    [Language.EN]:
      "Something went wrong while getting feedback. You can try again in a moment.",
    [Language.VN]:
      "Đã có lỗi khi lấy phản hồi. Bạn có thể thử lại sau một chút.",
  },

  endOfSetNoticeTitle: {
    [Language.EN]: "You reached the end of this set",
    [Language.VN]: "Bạn đã hoàn thành bộ câu hỏi này",
  },
  endOfSetNoticeBody: {
    [Language.EN]:
      "You can go back to choose a different practice type or repeat a question that felt useful.",
    [Language.VN]:
      "Bạn có thể quay lại để chọn kiểu luyện tập khác hoặc luyện lại câu hỏi mà bạn thấy hữu ích.",
  },
} as const;
