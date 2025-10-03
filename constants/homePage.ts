import { Language } from "@/types";

export const HOME_PAGE_CONTENT = {
  hero: {
    title: {
      [Language.EN]: "This is",
      [Language.VN]: "Đây là",
    },
    brand: {
      [Language.EN]: "AICC",
      [Language.VN]: "AICC",
    },
    ariaPlay: {
      en: "Play intro video",
      vn: "Phát video giới thiệu",
    },

    // 🔹 Keep the original whole-line string (optional / fallback)
    welcomeLead: {
      [Language.EN]:
        "The world’s first all-inclusive AI interview coach for high-functioning autistic adults.",
      [Language.VN]:
        "Huấn luyện viên phỏng vấn AI toàn diện đầu tiên dành cho người tự kỷ chức năng cao.",
    },

    // 🔹 New: split into parts so the component can inject the animated <span>
    welcomeLeadParts: {
      [Language.EN]: {
        before: "The world’s ",
        word: "first",
        after:
          " all-inclusive AI interview coach for high-functioning autistic adults.",
      },
      [Language.VN]: {
        before: "Huấn luyện viên phỏng vấn AI toàn diện ",
        word: "đầu tiên",
        after: " dành cho người tự kỷ chức năng cao.",
      },
    },

    tagline: {
      [Language.EN]:
        "Build confidence, reduce anxiety, and bridge understanding for jobseekers, employers, families, and volunteers.",
      [Language.VN]:
        "Xây dựng tự tin, giảm lo âu và kết nối thấu hiểu giữa ứng viên, nhà tuyển dụng, gia đình và tình nguyện viên.",
    },
    videoLabel: {
      [Language.EN]: "Concept Video",
      [Language.VN]: "Video Hướng dẫn",
    },
    videoComing: {
      [Language.EN]: "Video player coming soon!",
      [Language.VN]: "Trình phát video sẽ có sớm!",
    },
    ariaPlayVideo: {
      [Language.EN]: "Play Concept Video",
      [Language.VN]: "Phát Video Hướng dẫn",
    },
    ariaScroll: {
      [Language.EN]: "Scroll to next section",
      [Language.VN]: "Cuộn đến phần tiếp theo",
    },
  },
  narrators: {
    title: {
      [Language.EN]: "Choose Your Guide",
      [Language.VN]: "Chọn người hướng dẫn của bạn",
    },
  },
  facts: {
    f1: {
      head: { [Language.EN]: "1M+", [Language.VN]: "1M+" },
      body: {
        [Language.EN]:
          "Autistic individuals in Vietnam face employment barriers.",
        [Language.VN]:
          "Nhiều người tự kỷ tại Việt Nam gặp rào cản trong việc làm.",
      },
    },
    f2: {
      head: { [Language.EN]: "Trust Gaps", [Language.VN]: "Khoảng cách niềm tin" },
      body: {
        [Language.EN]:
          "Misunderstanding and stigma block meaningful employment opportunities.",
        [Language.VN]:
          "Hiểu lầm và kỳ thị cản trở cơ hội việc làm ý nghĩa.",
      },
    },
    f3: {
      head: {
        [Language.EN]: "Awareness & Confidence",
        [Language.VN]: "Nhận thức & Tự tin",
      },
      body: {
        [Language.EN]:
          "AICC builds skills and bridges understanding for all stakeholders.",
        [Language.VN]:
          "AICC xây năng lực và kết nối thấu hiểu cho mọi bên liên quan.",
      },
    },
  },
  sponsors: {
    title: {
      [Language.EN]: "Our Sponsors & Partners",
      [Language.VN]: "Nhà tài trợ & Đối tác",
    },
    labels: {
      adc: { [Language.EN]: "ADC 2025", [Language.VN]: "ADC 2025" },
      sponsor: { [Language.EN]: "SPONSOR_LOGO", [Language.VN]: "SPONSOR_LOGO" },
      partner: { [Language.EN]: "PARTNER_LOGO", [Language.VN]: "PARTNER_LOGO" },
      university: {
        [Language.EN]: "UNIVERSITY_LOGO",
        [Language.VN]: "UNIVERSITY_LOGO",
      },
    },
  },
} as const;
