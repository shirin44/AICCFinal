import { Language } from "@/types";

export const ROUTINE_CONTENT = {
  // Title / headings / sections
  title: {
    [Language.EN]: "Build your pre-interview routine",
    [Language.VN]: "Tạo thói quen trước phỏng vấn",
  },
  subtitle: {
    [Language.EN]: "Pick up to 3 simple steps. You can drag to reorder.",
    [Language.VN]: "Chọn tối đa 3 bước đơn giản. Bạn có thể kéo để sắp xếp lại.",
  },
  stepsSelected: {
    [Language.EN]: "Steps selected",
    [Language.VN]: "Số bước đã chọn",
  },
  pickMore_singular: {
    [Language.EN]: "Pick 1 more step.",
    [Language.VN]: "Chọn thêm 1 bước.",
  },
  pickMore_plural: {
    [Language.EN]: "Pick {n} more steps.",
    [Language.VN]: "Chọn thêm {n} bước.",
  },
  optionsSection: {
    [Language.EN]: "Options",
    [Language.VN]: "Tùy chọn",
  },
  yourRoutine: {
    [Language.EN]: "Your routine",
    [Language.VN]: "Thói quen của bạn",
  },
  noStepsYet: {
    [Language.EN]: "No steps yet. Pick up to 3 above.",
    [Language.VN]: "Chưa có bước nào. Hãy chọn tối đa 3 bước ở trên.",
  },

  // Buttons / tooltips / statuses
  suggestForMe: {
    [Language.EN]: "Suggest for me",
    [Language.VN]: "Gợi ý cho tôi",
  },
  clear: {
    [Language.EN]: "Clear",
    [Language.VN]: "Xóa",
  },
  copy: {
    [Language.EN]: "Copy",
    [Language.VN]: "Sao chép",
  },
  copied: {
    [Language.EN]: "Copied!",
    [Language.VN]: "Đã sao chép!",
  },
  remove: {
    [Language.EN]: "Remove",
    [Language.VN]: "Xóa",
  },
  add: {
    [Language.EN]: "Add",
    [Language.VN]: "Thêm",
  },
  limitReached: {
    [Language.EN]: "Limit reached",
    [Language.VN]: "Đã đạt giới hạn",
  },
  dragToReorder: {
    [Language.EN]: "Drag to reorder",
    [Language.VN]: "Kéo để sắp xếp lại",
  },

  // Routine option texts (IDs + localized labels)
  options: [
    {
      id: "review_one_question",
      label: {
        [Language.EN]: "Review one practice question",
        [Language.VN]: "Xem lại một câu hỏi luyện tập",
      },
    },
    {
      id: "listen_calm_music",
      label: {
        [Language.EN]: "Listen to calm music",
        [Language.VN]: "Nghe nhạc nhẹ",
      },
    },
    {
      id: "stretch_5_min",
      label: {
        [Language.EN]: "Stretch for 5 minutes",
        [Language.VN]: "Duỗi người 5 phút",
      },
    },
    {
      id: "drink_water",
      label: {
        [Language.EN]: "Drink water",
        [Language.VN]: "Uống nước",
      },
    },
    {
      id: "wear_comfy_clothes",
      label: {
        [Language.EN]: "Wear comfy clothes",
        [Language.VN]: "Mặc đồ thoải mái",
      },
    },
    {
      id: "use_fidget_tool",
      label: {
        [Language.EN]: "Use a fidget tool",
        [Language.VN]: "Dùng đồ cầm tay giảm căng thẳng",
      },
    },
    {
      id: "deep_breaths_3",
      label: {
        [Language.EN]: "Take 3 deep breaths",
        [Language.VN]: "Hít thở sâu 3 lần",
      },
    },
    {
      id: "posture_check",
      label: {
        [Language.EN]: "Do a quick posture check",
        [Language.VN]: "Chỉnh tư thế ngồi/đứng",
      },
    },
    {
      id: "prepare_device",
      label: {
        [Language.EN]: "Prepare your device and internet",
        [Language.VN]: "Kiểm tra thiết bị và internet",
      },
    },
    {
      id: "write_positive_note",
      label: {
        [Language.EN]: "Write one positive reminder",
        [Language.VN]: "Viết một câu nhắc tích cực",
      },
    },
  ] as Array<{
    id: string;
    label: Record<Language, string>;
  }>,
} as const;
