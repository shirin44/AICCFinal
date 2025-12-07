import { Language } from "@/types";

export const BREATHING_CONTENT = {
  ui: {
    title: {
      [Language.EN]: "Calm breathing",
      [Language.VN]: "Bài thở bình tĩnh",
    },
    start: {
      [Language.EN]: "Start",
      [Language.VN]: "Bắt đầu",
    },
    pause: {
      [Language.EN]: "Pause",
      [Language.VN]: "Tạm dừng",
    },
    reset: {
      [Language.EN]: "Reset",
      [Language.VN]: "Đặt lại",
    },
    timingHint: {
      [Language.EN]: "4 seconds in · 4 seconds hold · 6 seconds out",
      [Language.VN]: "Hít 4 giây · Giữ 4 giây · Thở 6 giây",
    },
  },
  breatheIn: {
    [Language.EN]: "Breathe In",
    [Language.VN]: "Hít vào",
  },
  hold: {
    [Language.EN]: "Hold",
    [Language.VN]: "Giữ hơi",
  },
  breatheOut: {
    [Language.EN]: "Breathe Out",
    [Language.VN]: "Thở ra",
  },

  // Longer instruction text
  breatheInInstruction: {
    [Language.EN]: "Slowly breathe in through your nose.",
    [Language.VN]: "Hít vào chậm rãi bằng mũi.",
  },
  holdInstruction: {
    [Language.EN]: "Hold your breath gently.",
    [Language.VN]: "Nhẹ nhàng giữ hơi thở.",
  },
  breatheOutInstruction: {
    [Language.EN]: "Exhale slowly through your mouth.",
    [Language.VN]: "Thở ra từ từ bằng miệng.",
  },

  // Helper texts
  followGuide: {
    [Language.EN]: "Follow the guide. Let’s breathe together.",
    [Language.VN]: "Làm theo hướng dẫn. Hãy cùng thở.",
  },
  phase: {
    [Language.EN]: "Phase",
    [Language.VN]: "Giai đoạn",
  },
  done: {
    [Language.EN]: "Done! You’ve completed the breathing cycle.",
    [Language.VN]: "Hoàn thành! Bạn đã kết thúc chu kỳ thở.",
  },
};
