import { Language } from "@/types";

export const ROUTINE_CONTENT = {
  ui: {
    pillLabel: {
      [Language.EN]: "Calm pre-interview routine",
      [Language.VN]: "Thói quen giúp bình tĩnh trước phỏng vấn",
    },
    evidenceLine: {
      [Language.EN]:
        "Short, predictable steps before an interview can lower anxiety and help the brain switch into “ready” mode.",
      [Language.VN]:
        "Một vài bước ngắn, dễ đoán trước buổi phỏng vấn có thể giảm lo âu và giúp não chuyển sang trạng thái “sẵn sàng”.",
    },
    emptyTitle: {
      [Language.EN]: "No steps selected yet",
      [Language.VN]: "Chưa có bước nào được chọn",
    },
    emptyBody: {
      [Language.EN]:
        "Choose up to three small actions you can repeat before every interview.",
      [Language.VN]:
        "Hãy chọn tối đa ba bước nhỏ mà bạn có thể lặp lại trước mỗi buổi phỏng vấn.",
    },
  },

  // Title / headings / sections
  title: {
    [Language.EN]: "Build your pre-interview routine",
    [Language.VN]: "Tạo thói quen trước phỏng vấn",
  },
  subtitle: {
    [Language.EN]:
      "Pick up to 3 simple steps you can repeat. You can drag to reorder them.",
    [Language.VN]:
      "Chọn tối đa 3 bước đơn giản để lặp lại. Bạn có thể kéo để sắp xếp lại thứ tự.",
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
    [Language.EN]: "Suggested steps",
    [Language.VN]: "Các bước gợi ý",
  },
  yourRoutine: {
    [Language.EN]: "Your routine",
    [Language.VN]: "Thói quen của bạn",
  },
  noStepsYet: {
    [Language.EN]: "No steps yet. Pick up to 3 from the suggestions above.",
    [Language.VN]: "Chưa có bước nào. Hãy chọn tối đa 3 bước trong danh sách gợi ý phía trên.",
  },

  // Buttons / tooltips / statuses
  suggestForMe: {
    [Language.EN]: "Suggest for me",
    [Language.VN]: "Gợi ý giúp tôi",
  },
  clear: {
    [Language.EN]: "Reset",
    [Language.VN]: "Đặt lại",
  },
  copy: {
    [Language.EN]: "Copy routine",
    [Language.VN]: "Sao chép thói quen",
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
    [Language.VN]: "Kéo để sắp xếp lại thứ tự",
  },

  // Routine option texts (IDs + localized labels)
  options: [
    {
      id: "review_one_question",
      label: {
        [Language.EN]: "Review one practice interview question",
        [Language.VN]: "Xem lại một câu hỏi phỏng vấn mẫu",
      },
    },
    {
      id: "listen_calm_music",
      label: {
        [Language.EN]: "Listen to calm music for a few minutes",
        [Language.VN]: "Nghe nhạc nhẹ trong vài phút",
      },
    },
    {
      id: "stretch_5_min",
      label: {
        [Language.EN]: "Stretch or move your body for 5 minutes",
        [Language.VN]: "Duỗi người hoặc vận động nhẹ trong 5 phút",
      },
    },
    {
      id: "drink_water",
      label: {
        [Language.EN]: "Drink a glass of water",
        [Language.VN]: "Uống một ly nước",
      },
    },
    {
      id: "wear_comfy_clothes",
      label: {
        [Language.EN]: "Choose comfortable clothes",
        [Language.VN]: "Chọn trang phục thoải mái",
      },
    },
    {
      id: "use_fidget_tool",
      label: {
        [Language.EN]: "Prepare a small fidget or comfort item",
        [Language.VN]: "Chuẩn bị một đồ cầm tay hoặc vật giúp giảm căng thẳng",
      },
    },
    {
      id: "deep_breaths_3",
      label: {
        [Language.EN]: "Take 3 slow, deep breaths",
        [Language.VN]: "Hít thở sâu và chậm 3 lần",
      },
    },
    {
      id: "posture_check",
      label: {
        [Language.EN]: "Do a quick posture and seating check",
        [Language.VN]: "Kiểm tra nhanh tư thế ngồi/đứng",
      },
    },
    {
      id: "prepare_device",
      label: {
        [Language.EN]: "Check your device, sound, and internet",
        [Language.VN]: "Kiểm tra thiết bị, âm thanh và kết nối internet",
      },
    },
    {
      id: "write_positive_note",
      label: {
        [Language.EN]: "Write one short, positive reminder to yourself",
        [Language.VN]: "Viết một câu nhắc nhở tích cực cho bản thân",
      },
    },
  ] as Array<{
    id: string;
    label: Record<Language, string>;
  }>,
} as const;