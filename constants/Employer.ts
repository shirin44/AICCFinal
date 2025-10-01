import { Language } from "@/types";

export const EMPLOYER_CONTENT = {
  ui: {
    start:        { [Language.EN]: "Get started", [Language.VN]: "Bắt đầu ngay" },
    whyHire:      { [Language.EN]: "Why hire autistic talent", [Language.VN]: "Vì sao nên tuyển người tự kỷ" },
    whatYouWillLearn: { [Language.EN]: "What you’ll learn", [Language.VN]: "Bạn sẽ học gì" },
    completeAndNext:  { [Language.EN]: "Complete & Next", [Language.VN]: "Hoàn thành & Tiếp tục" },
    backToOverview:   { [Language.EN]: "Back to overview", [Language.VN]: "Về danh mục" },
    faq:         { [Language.EN]: "FAQ", [Language.VN]: "Câu hỏi thường gặp" },
    resources:   { [Language.EN]: "Resources", [Language.VN]: "Tài nguyên" },
  },

  modules: [
    {
      id: "whyHire",
      title: { [Language.EN]: "Why hire autistic talent", [Language.VN]: "Vì sao nên tuyển người tự kỷ" },
      time:  { [Language.EN]: "4–6 min", [Language.VN]: "4–6 phút" },
    },
    {
      id: "module1",
      title: { [Language.EN]: "Interview Basics", [Language.VN]: "Cơ bản trong phỏng vấn" },
      time:  { [Language.EN]: "5 min", [Language.VN]: "5 phút" },
    },
    {
      id: "module2",
      title: { [Language.EN]: "Question Cleaner (Tool)", [Language.VN]: "Làm sạch câu hỏi (Công cụ)" },
      time:  { [Language.EN]: "5–7 min", [Language.VN]: "5–7 phút" },
    },
  ],

  intro: {
    heading: { [Language.EN]: "Welcome", [Language.VN]: "Chào mừng" },
    blurb: {
      [Language.EN]: "Run fair, calm interviews. Hire for strengths. Simple steps. Clear tools.",
      [Language.VN]: "Phỏng vấn công bằng, nhẹ nhàng. Tuyển theo điểm mạnh. Bước đơn giản. Công cụ rõ ràng.",
    },
  },

  hero: {
    title: { [Language.EN]: "Hire for real strengths", [Language.VN]: "Tuyển vì sức mạnh thật" },
    subtitle: {
      [Language.EN]: "Autistic talent can boost quality, consistency, and insight.",
      [Language.VN]: "Nhân sự tự kỷ có thể nâng chất lượng, tính ổn định và洞察.",
    },
    badges: [
      { key: "accuracy",  en: "Fewer errors",    vn: "Ít lỗi hơn" },
      { key: "focus",     en: "Deep focus",      vn: "Tập trung cao" },
      { key: "patterns",  en: "Pattern insight", vn: "Nhìn ra quy luật" },
      { key: "integrity", en: "Honest feedback", vn: "Phản hồi thẳng" },
    ],
  },

  kpis: [
    { key: "quality",   en: "↑ Quality of outputs",      vn: "↑ Chất lượng đầu ra" },
    { key: "retention", en: "↑ Role retention",          vn: "↑ Gắn bó công việc" },
    { key: "risk",      en: "↓ Operational risk",        vn: "↓ Rủi ro vận hành" },
    { key: "cost",      en: "↓ Rework / defect costs",   vn: "↓ Chi phí làm lại / lỗi" },
  ],

  strengthsGrid: [
    {
      icon: "🔎",
      label: { [Language.EN]: "Detail focus", [Language.VN]: "Chú ý chi tiết" },
      blurb: { [Language.EN]: "Lower error rates in data/QA.", [Language.VN]: "Giảm lỗi ở dữ liệu/QA." },
    },
    {
      icon: "🧩",
      label: { [Language.EN]: "Pattern finding", [Language.VN]: "Tìm quy luật" },
      blurb: { [Language.EN]: "Spot trends and root causes early.", [Language.VN]: "Nhận ra xu hướng & nguyên nhân sớm." },
    },
    {
      icon: "🧭",
      label: { [Language.EN]: "Consistency", [Language.VN]: "Ổn định" },
      blurb: { [Language.EN]: "High quality in repeat tasks.", [Language.VN]: "Chất lượng ổn định ở việc lặp lại." },
    },
    {
      icon: "🗣️",
      label: { [Language.EN]: "Direct honesty", [Language.VN]: "Thẳng, trung thực" },
      blurb: { [Language.EN]: "Clear feedback; fewer surprises.", [Language.VN]: "Phản hồi rõ; ít bất ngờ." },
    },
    {
      icon: "🛠️",
      label: { [Language.EN]: "Process thinking", [Language.VN]: "Tư duy quy trình" },
      blurb: { [Language.EN]: "Improves checklists & flow.", [Language.VN]: "Cải thiện checklist & luồng việc." },
    },
    {
      icon: "📈",
      label: { [Language.EN]: "Reliability", [Language.VN]: "Đáng tin cậy" },
      blurb: { [Language.EN]: "Steady output under routine.", [Language.VN]: "Đầu ra ổn định với công việc đều." },
    },
  ],

  stories: {
    title: { [Language.EN]: "Real stories. Real value.", [Language.VN]: "Câu chuyện thật. Giá trị thật." },
    items: [
      {
        id: "st1",
        role: { [Language.EN]: "Data Entry", [Language.VN]: "Nhập liệu" },
        headline: {
          [Language.EN]: "40% fewer data errors in 2 weeks",
          [Language.VN]: "Giảm 40% lỗi dữ liệu sau 2 tuần",
        },
        body: {
          [Language.EN]: "After revising the validation checklist, defects dropped and rework time fell.",
          [Language.VN]: "Sau khi sửa checklist kiểm tra, lỗi giảm mạnh và thời gian làm lại giảm.",
        },
      },
      {
        id: "st2",
        role: { [Language.EN]: "QA Tester", [Language.VN]: "Kiểm thử" },
        headline: { [Language.EN]: "3 repeat bugs caught", [Language.VN]: "Phát hiện 3 lỗi lặp" },
        body: {
          [Language.EN]: "Pattern focus exposed edge cases the team missed across sprints.",
          [Language.VN]: "Nhìn quy luật đã lộ ra các edge case nhóm bỏ sót qua nhiều sprint.",
        },
      },
      {
        id: "st3",
        role: { [Language.EN]: "Ops Support", [Language.VN]: "Hỗ trợ vận hành" },
        headline: { [Language.EN]: "15% faster processing", [Language.VN]: "Nhanh hơn 15%" },
        body: {
          [Language.EN]: "Proposed a clearer folder system; handoffs got smoother.",
          [Language.VN]: "Đề xuất cách sắp xếp thư mục rõ hơn; bàn giao mượt hơn.",
        },
      },
    ],
  },

  quotes: {
    title: { [Language.EN]: "What employers say", [Language.VN]: "Nhà tuyển dụng nói gì" },
    items: [
      {
        id: "q1",
        name: { [Language.EN]: "Mai Nguyen", [Language.VN]: "Mai Nguyễn" },
        title: { [Language.EN]: "HR Lead, Retail", [Language.VN]: "Trưởng nhân sự, Bán lẻ" },
        text: {
          [Language.EN]: "Quality jumped quickly. The checklists they built still save us time.",
          [Language.VN]: "Chất lượng tăng rõ. Checklist họ tạo ra vẫn tiết kiệm thời gian cho chúng tôi.",
        },
        avatar: "https://i.pravatar.cc/120?img=5",
      },
      {
        id: "q2",
        name: { [Language.EN]: "Thanh Le", [Language.VN]: "Thành Lê" },
        title: { [Language.EN]: "Ops Manager, Logistics", [Language.VN]: "Quản lý vận hành, Logistics" },
        text: {
          [Language.EN]: "Consistent, calm, and precise. Risk dropped.",
          [Language.VN]: "Ổn định, bình tĩnh, chính xác. Rủi ro giảm.",
        },
        avatar: "https://i.pravatar.cc/120?img=12",
      },
      {
        id: "q3",
        name: { [Language.EN]: "Linh Pham", [Language.VN]: "Linh Phạm" },
        title: { [Language.EN]: "QA Lead, Fintech", [Language.VN]: "Trưởng QA, Fintech" },
        text: {
          [Language.EN]: "They spot patterns fast. We ship with fewer defects.",
          [Language.VN]: "Họ phát hiện quy luật rất nhanh. Sản phẩm lỗi giảm khi phát hành.",
        },
        avatar: "https://i.pravatar.cc/120?img=24",
      },
    ],
  },

  faqs: [
    {
      q: { [Language.EN]: "Why rewrite questions?", [Language.VN]: "Vì sao viết lại câu hỏi?" },
      a: {
        [Language.EN]: "Clear, concrete language reduces anxiety and bias. You get better answers.",
        [Language.VN]: "Ngôn ngữ rõ ràng, cụ thể giúp giảm lo lắng và thiên kiến. Bạn nhận được câu trả lời tốt hơn.",
      },
    },
  ],

  resources: [
    {
      name: "Inclusive Interview Checklist",
      desc: {
        [Language.EN]: "Quick list to prep a fair interview.",
        [Language.VN]: "Danh sách nhanh để chuẩn bị phỏng vấn công bằng.",
      },
      url: "#",
    },
  ],
} as const;
