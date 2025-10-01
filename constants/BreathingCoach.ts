import { Language } from "@/types";

export const BREATHING_CONTENT = {
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
