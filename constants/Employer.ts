// src/constants/Employer.ts
import { Language } from "@/types";

export type EmployerViewMode = "calm" | "research";

export const EMPLOYER_CONTENT = {
  /* ----------------------------- UI / Global labels ----------------------------- */
  ui: {
    start: {
      [Language.EN]: "Get started",
      [Language.VN]: "Bắt đầu ngay",
    },
    whyHire: {
      [Language.EN]: "Why hire autistic talent",
      [Language.VN]: "Vì sao nên tuyển người tự kỷ",
    },
    whatYouWillLearn: {
      [Language.EN]: "What you’ll learn",
      [Language.VN]: "Bạn sẽ học gì",
    },
    completeAndNext: {
      [Language.EN]: "Complete & next",
      [Language.VN]: "Hoàn thành & tiếp tục",
    },
    backToOverview: {
      [Language.EN]: "Back to overview",
      [Language.VN]: "Về danh mục",
    },
    faq: {
      [Language.EN]: "FAQ",
      [Language.VN]: "Câu hỏi thường gặp",
    },
    resources: {
      [Language.EN]: "Resources",
      [Language.VN]: "Tài nguyên",
    },

    // Calm vs research toggle
    calmModeLabel: {
      [Language.EN]: "Calm view",
      [Language.VN]: "Chế độ nhẹ nhàng",
    },
    calmModeDescription: {
      [Language.EN]:
        "Short, plain-language summaries. Good for a quick overview or when you feel tired or overloaded.",
      [Language.VN]:
        "Tóm tắt ngắn, ngôn ngữ đơn giản. Phù hợp khi bạn cần xem nhanh hoặc đang mệt / quá tải.",
    },
    researchModeLabel: {
      [Language.EN]: "Full context",
      [Language.VN]: "Chế độ chi tiết",
    },
    researchModeDescription: {
      [Language.EN]:
        "More detail, evidence, and context. Good when you have time to explore the research behind inclusive hiring.",
      [Language.VN]:
        "Nhiều chi tiết, dẫn chứng và bối cảnh hơn. Phù hợp khi bạn có thời gian tìm hiểu kỹ về tuyển dụng hòa nhập.",
    },

    calmHint: {
      [Language.EN]:
        "Take one strength at a time and imagine how it fits a real role in your team.",
      [Language.VN]:
        "Chọn một điểm mạnh mỗi lần và tưởng tượng nó phù hợp với một vị trí thực tế trong đội ngũ của bạn.",
    },
    researchHint: {
      [Language.EN]:
        "Link each strength to quality, risk, and retention metrics you already track.",
      [Language.VN]:
        "Liên kết từng điểm mạnh với số đo chất lượng, rủi ro và mức độ gắn bó mà bạn đang theo dõi.",
    },

    metricsTitle: {
      [Language.EN]: "How strengths turn into business outcomes",
      [Language.VN]: "Cách điểm mạnh chuyển thành kết quả kinh doanh",
    },
    metricsSubtitle: {
      [Language.EN]:
        "Use autistic strengths to improve quality, reduce risk, and build a more stable team.",
      [Language.VN]:
        "Khai thác điểm mạnh của ứng viên tự kỷ để nâng chất lượng, giảm rủi ro và xây dựng đội ngũ ổn định.",
    },

    // Bias quiz UI strings
    quizRevealCalmLabel: {
      [Language.EN]: "Reveal gentle guidance",
      [Language.VN]: "Xem gợi ý nhẹ nhàng",
    },
    quizRevealResearchLabel: {
      [Language.EN]: "Reveal full explanation",
      [Language.VN]: "Xem giải thích chi tiết",
    },
    quizNextLabel: {
      [Language.EN]: "Next scenario",
      [Language.VN]: "Tình huống tiếp theo",
    },
  },

  /* --------------------------------- Modules --------------------------------- */
  modules: [
    {
      id: "whyHire",
      title: {
        [Language.EN]: "Why hire autistic talent",
        [Language.VN]: "Vì sao nên tuyển người tự kỷ",
      },
      time: {
        [Language.EN]: "4–6 min",
        [Language.VN]: "4–6 phút",
      },
    },
    {
      id: "module1",
      title: {
        [Language.EN]: "Interview basics",
        [Language.VN]: "Cơ bản trong phỏng vấn",
      },
      time: {
        [Language.EN]: "5 min",
        [Language.VN]: "5 phút",
      },
    },
    {
      id: "module2",
      title: {
        [Language.EN]: "Question Cleaner (tool)",
        [Language.VN]: "Làm sạch câu hỏi (công cụ)",
      },
      time: {
        [Language.EN]: "5–7 min",
        [Language.VN]: "5–7 phút",
      },
    },
  ],

  /* ---------------------------------- Intro ---------------------------------- */
  intro: {
    heading: {
      [Language.EN]: "Welcome",
      [Language.VN]: "Chào mừng",
    },
    blurb: {
      [Language.EN]:
        "Run calm, fair interviews. Hire for real strengths. Simple steps, clear tools, and more detail when you need it.",
      [Language.VN]:
        "Phỏng vấn nhẹ nhàng, công bằng. Tuyển vì điểm mạnh thật. Bước đơn giản, công cụ rõ ràng và thêm chi tiết khi bạn cần.",
    },
  },

  /* ----------------------------- Hero / strengths ----------------------------- */
  hero: {
    title: {
      [Language.EN]: "Hire for real strengths",
      [Language.VN]: "Tuyển vì sức mạnh thật",
    },
    subtitleCalm: {
      [Language.EN]:
        "Autistic talent can bring focus, honesty, and stable quality to your team.",
      [Language.VN]:
        "Nhân sự tự kỷ có thể mang lại sự tập trung, trung thực và chất lượng ổn định cho đội ngũ.",
    },
    subtitleResearch: {
      [Language.EN]:
        "Autistic professionals often show strong pattern recognition, detail focus, and process thinking that reduce defects and risk.",
      [Language.VN]:
        "Nhiều chuyên gia tự kỷ có khả năng nhận diện quy luật, chú ý chi tiết và tư duy quy trình, giúp giảm lỗi và rủi ro vận hành.",
    },
    badges: [
      {
        key: "accuracy",
        label: {
          [Language.EN]: "Fewer errors",
          [Language.VN]: "Ít lỗi hơn",
        },
        calm: {
          [Language.EN]: "Good fit for data, QA, and documentation work.",
          [Language.VN]:
            "Phù hợp với công việc dữ liệu, kiểm thử và tài liệu.",
        },
        research: {
          [Language.EN]:
            "Detail focus can reduce data-entry and QA error rates over time.",
          [Language.VN]:
            "Khả năng chú ý chi tiết có thể làm giảm tỷ lệ lỗi nhập liệu và lỗi kiểm thử theo thời gian.",
        },
      },
      {
        key: "focus",
        label: {
          [Language.EN]: "Deep focus",
          [Language.VN]: "Tập trung cao",
        },
        calm: {
          [Language.EN]: "Stays with tasks that many people find repetitive.",
          [Language.VN]:
            "Có thể kiên trì với công việc mà nhiều người thấy lặp lại, nhàm chán.",
        },
        research: {
          [Language.EN]:
            "Sustained attention supports monitoring, log review, and regression testing.",
          [Language.VN]:
            "Khả năng tập trung lâu giúp ích cho giám sát, xem log và kiểm thử hồi quy.",
        },
      },
      {
        key: "patterns",
        label: {
          [Language.EN]: "Pattern insight",
          [Language.VN]: "Nhìn ra quy luật",
        },
        calm: {
          [Language.EN]: "Spots links others miss.",
          [Language.VN]:
            "Nhận ra mối liên hệ mà người khác dễ bỏ sót.",
        },
        research: {
          [Language.EN]:
            "Pattern recognition surfaces recurring root causes and informs better process design.",
          [Language.VN]:
            "Khả năng nhìn quy luật giúp phát hiện nguyên nhân gốc lặp lại và hỗ trợ thiết kế quy trình tốt hơn.",
        },
      },
      {
        key: "integrity",
        label: {
          [Language.EN]: "Honest feedback",
          [Language.VN]: "Phản hồi thẳng",
        },
        calm: {
          [Language.EN]: "Clear, direct communication style.",
          [Language.VN]: "Phong cách giao tiếp rõ ràng, thẳng thắn.",
        },
        research: {
          [Language.EN]:
            "Direct feedback can reduce misalignment and support a culture of psychological safety when handled respectfully.",
          [Language.VN]:
            "Phản hồi trực tiếp có thể giảm lệch hướng và nuôi dưỡng văn hóa an toàn tâm lý nếu được đón nhận tôn trọng.",
        },
      },
    ],
  },

  /* ----------------------------------- KPIs ---------------------------------- */
  kpis: [
    {
      key: "quality",
      label: {
        [Language.EN]: "↑ Quality of outputs",
        [Language.VN]: "↑ Chất lượng đầu ra",
      },
      calm: {
        [Language.EN]: "Fewer mistakes in everyday work.",
        [Language.VN]: "Ít sai sót trong công việc hằng ngày.",
      },
      research: {
        [Language.EN]:
          "Detail focus and process thinking systematically reduce rework, defects, and customer-facing errors.",
        [Language.VN]:
          "Chú ý chi tiết và tư duy quy trình có thể giảm dần việc làm lại, lỗi sản phẩm và lỗi ảnh hưởng khách hàng.",
      },
    },
    {
      key: "retention",
      label: {
        [Language.EN]: "↑ Role retention",
        [Language.VN]: "↑ Gắn bó công việc",
      },
      calm: {
        [Language.EN]: "Good match can mean longer stay.",
        [Language.VN]: "Công việc phù hợp có thể giúp nhân sự gắn bó lâu hơn.",
      },
      research: {
        [Language.EN]:
          "When roles align with strengths and supports are clear, autistic employees often show strong loyalty and stability.",
        [Language.VN]:
          "Khi công việc phù hợp với điểm mạnh và hỗ trợ rõ ràng, nhiều nhân sự tự kỷ gắn bó ổn định và trung thành.",
      },
    },
    {
      key: "risk",
      label: {
        [Language.EN]: "↓ Operational risk",
        [Language.VN]: "↓ Rủi ro vận hành",
      },
      calm: {
        [Language.EN]: "More eyes on detail means fewer surprises.",
        [Language.VN]:
          "Để ý chi tiết hơn giúp giảm bất ngờ không mong muốn.",
      },
      research: {
        [Language.EN]:
          "Systematic checking, documentation, and pattern spotting reduce overlooked risks and compliance issues.",
        [Language.VN]:
          "Kiểm tra, ghi chép và nhận diện quy luật có hệ thống giúp giảm rủi ro bị bỏ sót và lỗi tuân thủ.",
      },
    },
    {
      key: "cost",
      label: {
        [Language.EN]: "↓ Rework / defect costs",
        [Language.VN]: "↓ Chi phí làm lại / lỗi",
      },
      calm: {
        [Language.EN]: "Doing it right the first time saves budget.",
        [Language.VN]: "Làm đúng ngay từ đầu giúp tiết kiệm chi phí.",
      },
      research: {
        [Language.EN]:
          "Higher first-time quality reduces the time and budget spent on rework, incident handling, and escalations.",
        [Language.VN]:
          "Chất lượng tốt ngay từ đầu giảm thời gian và chi phí cho làm lại, xử lý sự cố và leo thang vấn đề.",
      },
    },
  ],

  /* --------------------------- Strengths “grid” view -------------------------- */
  strengthsGrid: [
    {
      icon: "🔎",
      label: {
        [Language.EN]: "Detail focus",
        [Language.VN]: "Chú ý chi tiết",
      },
      blurb: {
        [Language.EN]: "Lower error rates in data, QA, and documentation.",
        [Language.VN]:
          "Giảm lỗi trong dữ liệu, kiểm thử và tài liệu.",
      },
    },
    {
      icon: "🧩",
      label: {
        [Language.EN]: "Pattern finding",
        [Language.VN]: "Tìm quy luật",
      },
      blurb: {
        [Language.EN]:
          "Spots trends and root causes other people miss.",
        [Language.VN]:
          "Nhận ra xu hướng và nguyên nhân gốc mà nhiều người dễ bỏ qua.",
      },
    },
    {
      icon: "🧭",
      label: {
        [Language.EN]: "Consistency",
        [Language.VN]: "Ổn định",
      },
      blurb: {
        [Language.EN]:
          "Delivers high quality on repeat tasks and routines.",
        [Language.VN]:
          "Giữ chất lượng ổn định với công việc lặp lại và theo quy trình.",
      },
    },
    {
      icon: "🗣️",
      label: {
        [Language.EN]: "Direct honesty",
        [Language.VN]: "Thẳng, trung thực",
      },
      blurb: {
        [Language.EN]:
          "Gives clear feedback that can improve decisions.",
        [Language.VN]:
          "Đưa ra phản hồi rõ ràng giúp cải thiện quyết định.",
      },
    },
    {
      icon: "🛠️",
      label: {
        [Language.EN]: "Process thinking",
        [Language.VN]: "Tư duy quy trình",
      },
      blurb: {
        [Language.EN]: "Improves checklists, SOPs, and workflows.",
        [Language.VN]:
          "Cải thiện checklist, quy trình và luồng công việc.",
      },
    },
    {
      icon: "📈",
      label: {
        [Language.EN]: "Reliability",
        [Language.VN]: "Đáng tin cậy",
      },
      blurb: {
        [Language.EN]:
          "Reliable output under clear and predictable routines.",
        [Language.VN]:
          "Đầu ra đáng tin cậy nếu công việc rõ ràng và ổn định.",
      },
    },
  ],

  /* ---------------------------- Stories / caselets --------------------------- */
  stories: {
    title: {
      [Language.EN]: "Real stories. Real value.",
      [Language.VN]: "Câu chuyện thật. Giá trị thật.",
    },
    items: [
      {
        id: "st1",
        role: {
          [Language.EN]: "Data entry specialist",
          [Language.VN]: "Chuyên viên nhập liệu",
        },
        headline: {
          [Language.EN]: "40% fewer data errors in 2 weeks",
          [Language.VN]: "Giảm 40% lỗi dữ liệu sau 2 tuần",
        },
        bodyCalm: {
          [Language.EN]:
            "After improving the checklist, errors dropped and the team trusted the reports more.",
          [Language.VN]:
            "Sau khi cải thiện checklist, lỗi giảm và nhóm tin tưởng báo cáo hơn.",
        },
        bodyResearch: {
          [Language.EN]:
            "By reworking the validation checklist and highlighting edge cases, error rates fell and rework time shrank noticeably.",
          [Language.VN]:
            "Bằng cách điều chỉnh checklist kiểm tra và bổ sung các trường hợp biên, tỷ lệ lỗi giảm rõ rệt và thời gian làm lại cũng giảm.",
        },
      },
      {
        id: "st2",
        role: {
          [Language.EN]: "QA tester",
          [Language.VN]: "Nhân viên kiểm thử",
        },
        headline: {
          [Language.EN]: "Recurring bugs finally caught",
          [Language.VN]: "Bắt được lỗi lặp khó phát hiện",
        },
        bodyCalm: {
          [Language.EN]:
            "Pattern focus uncovered bugs that had slipped through multiple releases.",
          [Language.VN]:
            "Khả năng nhìn quy luật giúp phát hiện lỗi đã lọt qua nhiều lần phát hành.",
        },
        bodyResearch: {
          [Language.EN]:
            "By tracking where bugs repeated, they identified a fragile part of the system and helped the team design a safer flow.",
          [Language.VN]:
            "Bằng cách theo dõi các lỗi lặp, họ xác định được phần hệ thống dễ hỏng và hỗ trợ nhóm thiết kế luồng an toàn hơn.",
        },
      },
      {
        id: "st3",
        role: {
          [Language.EN]: "Operations support",
          [Language.VN]: "Hỗ trợ vận hành",
        },
        headline: {
          [Language.EN]: "15% faster processing time",
          [Language.VN]: "Tốc độ xử lý tăng 15%",
        },
        bodyCalm: {
          [Language.EN]:
            "They suggested a clearer folder system that made handovers smoother.",
          [Language.VN]:
            "Họ đề xuất cách sắp xếp thư mục rõ ràng hơn, giúp bàn giao công việc trơn tru hơn.",
        },
        bodyResearch: {
          [Language.EN]:
            "By reorganising digital folders by process stage, they reduced search time and friction between shifts.",
          [Language.VN]:
            "Bằng cách sắp xếp lại thư mục theo giai đoạn quy trình, họ giảm thời gian tìm kiếm và ma sát giữa các ca làm.",
        },
      },
    ],
  },

  /* ------------------------------ Employer quotes ----------------------------- */
  quotes: {
    title: {
      [Language.EN]: "What employers say",
      [Language.VN]: "Nhà tuyển dụng nói gì",
    },
    items: [
      {
        id: "q1",
        name: {
          [Language.EN]: "Mai Nguyen",
          [Language.VN]: "Mai Nguyễn",
        },
        title: {
          [Language.EN]: "HR lead, retail",
          [Language.VN]: "Trưởng nhân sự, bán lẻ",
        },
        textCalm: {
          [Language.EN]:
            "Quality jumped quickly. The checklists they built still save us time every week.",
          [Language.VN]:
            "Chất lượng tăng nhanh. Checklist họ xây dựng đến giờ mỗi tuần vẫn giúp chúng tôi tiết kiệm thời gian.",
        },
        textResearch: {
          [Language.EN]:
            "After we adjusted our interview style and onboarding, their structured checklists became our standard and cut many small mistakes.",
          [Language.VN]:
            "Sau khi điều chỉnh cách phỏng vấn và onboarding, các checklist có cấu trúc của họ trở thành chuẩn chung và cắt giảm nhiều lỗi nhỏ.",
        },
        avatar: "https://i.pravatar.cc/120?img=5",
      },
      {
        id: "q2",
        name: {
          [Language.EN]: "Thanh Le",
          [Language.VN]: "Thành Lê",
        },
        title: {
          [Language.EN]: "Ops manager, logistics",
          [Language.VN]: "Quản lý vận hành, logistics",
        },
        textCalm: {
          [Language.EN]: "Consistent, calm, and precise. Operational risk dropped.",
          [Language.VN]: "Ổn định, điềm tĩnh, chính xác. Rủi ro vận hành giảm.",
        },
        textResearch: {
          [Language.EN]:
            "Clear role expectations plus a quiet workspace helped them thrive, and our incident tickets reduced over the next quarter.",
          [Language.VN]:
            "Kỳ vọng công việc rõ ràng cùng không gian làm việc yên tĩnh giúp họ phát huy, và số ticket sự cố giảm trong quý tiếp theo.",
        },
        avatar: "https://i.pravatar.cc/120?img=12",
      },
      {
        id: "q3",
        name: {
          [Language.EN]: "Linh Pham",
          [Language.VN]: "Linh Phạm",
        },
        title: {
          [Language.EN]: "QA lead, fintech",
          [Language.VN]: "Trưởng QA, fintech",
        },
        textCalm: {
          [Language.EN]:
            "They spot patterns fast. We ship with fewer defects now.",
          [Language.VN]:
            "Họ phát hiện quy luật rất nhanh. Sản phẩm phát hành giờ ít lỗi hơn.",
        },
        textResearch: {
          [Language.EN]:
            "Once we let them focus on test design rather than meetings, they uncovered critical edge cases we had missed.",
          [Language.VN]:
            "Khi cho họ tập trung vào thiết kế test thay vì họp, họ phát hiện các edge case quan trọng mà chúng tôi đã bỏ sót.",
        },
        avatar: "https://i.pravatar.cc/120?img=24",
      },
    ],
  },

  /* ----------------------------- Bias quiz section ---------------------------- */
  quiz: {
    title: {
      [Language.EN]: "Bias check: quick scenarios",
      [Language.VN]: "Kiểm tra thiên kiến: tình huống nhanh",
    },
    qas: [
      {
        id: "q1",
        q: {
          [Language.EN]:
            "You notice a candidate avoids eye contact but gives very detailed answers. What should you focus on when deciding?",
          [Language.VN]:
            "Bạn thấy ứng viên ít nhìn vào mắt nhưng trả lời rất chi tiết. Khi quyết định, bạn nên tập trung vào điều gì?",
        },
        aCalm: {
          [Language.EN]:
            "Focus on the content of their answers and how it fits the role, not eye contact style.",
          [Language.VN]:
            "Tập trung vào nội dung câu trả lời và mức độ phù hợp với công việc, không dựa vào cách nhìn mắt.",
        },
        aResearch: {
          [Language.EN]:
            "Eye contact varies across neurotypes and cultures. For autistic candidates, it often has no link to honesty or ability. Evaluate structure, problem-solving, and job-relevant examples instead.",
          [Language.VN]:
            "Giao tiếp mắt khác nhau giữa các kiểu não và văn hóa. Với ứng viên tự kỷ, điều này thường không liên quan đến sự trung thực hay năng lực. Hãy đánh giá cấu trúc câu trả lời, cách giải quyết vấn đề và ví dụ liên quan đến công việc.",
        },
      },
      {
        id: "q2",
        q: {
          [Language.EN]:
            "A candidate asks for questions in writing or extra time to think. What is the most inclusive response?",
          [Language.VN]:
            "Một ứng viên xin được nhận câu hỏi bằng văn bản hoặc thêm thời gian suy nghĩ. Phản hồi bao dung nhất là gì?",
        },
        aCalm: {
          [Language.EN]:
            "Agree where possible. Clear written questions and thinking time help many candidates, not just autistic people.",
          [Language.VN]:
            "Đồng ý nếu có thể. Câu hỏi rõ ràng bằng văn bản và thời gian suy nghĩ giúp nhiều ứng viên, không chỉ người tự kỷ.",
        },
        aResearch: {
          [Language.EN]:
            "Providing written questions and flexible processing time is a low-cost adjustment that improves fairness and reduces anxiety, especially for autistic and anxious candidates.",
          [Language.VN]:
            "Cung cấp câu hỏi bằng văn bản và thời gian xử lý linh hoạt là điều chỉnh chi phí thấp, tăng công bằng và giảm lo lắng, đặc biệt với ứng viên tự kỷ hoặc lo âu.",
        },
      },
      {
        id: "q3",
        q: {
          [Language.EN]:
            "A colleague says, “They answered well but seemed a bit ‘awkward’, so I’m not sure about culture fit.” What’s a better way to frame this?",
          [Language.VN]:
            "Đồng nghiệp nói: “Họ trả lời tốt nhưng hơi ‘kỳ’, nên tôi không chắc hợp văn hóa công ty.” Cách nhìn nào tốt hơn?",
        },
        aCalm: {
          [Language.EN]:
            "Shift from “culture fit” to job skills, values, and the support you can offer.",
          [Language.VN]:
            "Chuyển từ “hợp văn hóa” sang xem xét kỹ năng công việc, giá trị chung và hỗ trợ bạn có thể cung cấp.",
        },
        aResearch: {
          [Language.EN]:
            "‘Culture fit’ often hides bias against different communication styles. Focus on shared values, essential collaboration needs, and whether reasonable adjustments can make the role workable.",
          [Language.VN]:
            "“Hợp văn hóa” thường che giấu thiên kiến với kiểu giao tiếp khác biệt. Hãy tập trung vào giá trị chung, yêu cầu hợp tác cốt lõi và liệu các điều chỉnh hợp lý có giúp công việc phù hợp hay không.",
        },
      },
    ],
  },

  /* --------------------------- Interview basics text -------------------------- */
    /* --------------------------- Interview basics text -------------------------- */
    interviewBasics: {
      subheading: {
        [Language.EN]: "Simple habits that reduce anxiety and bias",
        [Language.VN]: "Thói quen đơn giản giúp giảm lo lắng và thiên kiến",
      },
  
      bullets: [
        {
          id: "b1",
          text: {
            [Language.EN]:
              "Use short, concrete questions. Avoid double questions in one sentence.",
            [Language.VN]:
              "Dùng câu hỏi ngắn, cụ thể. Tránh gộp hai câu hỏi trong một câu.",
          },
        },
        {
          id: "b2",
          text: {
            [Language.EN]:
              "Avoid sarcasm, idioms, and vague hints. Say what you mean directly.",
            [Language.VN]:
              "Tránh mỉa mai, thành ngữ và gợi ý mơ hồ. Hãy nói rõ điều bạn muốn hỏi.",
          },
        },
        {
          id: "b3",
          text: {
            [Language.EN]:
              "Give 5–10 seconds of quiet time for thinking before you repeat or rephrase.",
            [Language.VN]:
              "Cho 5–10 giây yên lặng để ứng viên suy nghĩ trước khi lặp lại hoặc diễn đạt lại.",
          },
        },
        {
          id: "b4",
          text: {
            [Language.EN]:
              "Offer notes, examples, or a small task if verbal answers are hard.",
            [Language.VN]:
              "Đưa ghi chú, ví dụ hoặc bài tập nhỏ nếu ứng viên khó trả lời bằng lời nói.",
          },
        },
        {
          id: "b5",
          text: {
            [Language.EN]:
              "Judge skills and impact, not eye contact, small talk, or “vibes”.",
            [Language.VN]:
              "Đánh giá kỹ năng và tác động, không dựa vào giao tiếp mắt, chuyện xã giao hay “cảm giác”.",
          },
        },
      ],
  
      recap: {
        [Language.EN]:
          "Short, direct questions plus quiet thinking time help autistic candidates show their real skills.",
        [Language.VN]:
          "Câu hỏi ngắn, rõ ràng cùng thời gian suy nghĩ yên lặng giúp ứng viên tự kỷ thể hiện đúng năng lực.",
      },
  
      tryTitle: {
        [Language.EN]: "Try this in your next interview:",
        [Language.VN]: "Hãy thử trong buổi phỏng vấn tới:",
      },
      tryBody: {
        [Language.EN]:
          "Ask one focused question. Pause. Then ask one follow-up to clarify skills, not personality.",
        [Language.VN]:
          "Đặt một câu hỏi rõ trọng tâm. Tạm dừng. Sau đó hỏi một câu phụ để làm rõ kỹ năng, không phải tính cách.",
      },
  
      supportTitle: {
        [Language.EN]: "Practical supports you can offer",
        [Language.VN]: "Các hỗ trợ thực tế bạn có thể áp dụng",
      },
      supportPoints: [
        {
          id: "s1",
          text: {
            [Language.EN]:
              "Share the interview structure and topics in advance when possible.",
            [Language.VN]:
              "Gửi trước cấu trúc buổi phỏng vấn và các chủ đề chính nếu có thể.",
          },
        },
        {
          id: "s2",
          text: {
            [Language.EN]:
              "Allow written notes or prompts during the interview.",
            [Language.VN]:
              "Cho phép ứng viên mang ghi chú hoặc gợi ý ngắn trong buổi phỏng vấn.",
          },
        },
        {
          id: "s3",
          text: {
            [Language.EN]:
              "Offer a quieter room or fewer people in the panel if the candidate requests it.",
            [Language.VN]:
              "Sắp xếp phòng yên tĩnh hơn hoặc ít người phỏng vấn hơn nếu ứng viên đề nghị.",
          },
        },
        {
          id: "s4",
          text: {
            [Language.EN]:
              "Explain any time limits clearly and give a gentle reminder before time runs out.",
            [Language.VN]:
              "Nói rõ giới hạn thời gian và nhắc nhẹ trước khi sắp hết giờ.",
          },
        },
      ],
    },

  /* --------------------------- FAQ / resources blocks ------------------------- */
  faqs: [
    {
      q: {
        [Language.EN]: "Why rewrite interview questions?",
        [Language.VN]: "Vì sao nên viết lại câu hỏi phỏng vấn?",
      },
      aCalm: {
        [Language.EN]:
          "Clear, concrete language lowers anxiety and gives you better answers from more candidates.",
        [Language.VN]:
          "Ngôn ngữ rõ ràng, cụ thể giúp giảm lo lắng và mang lại câu trả lời tốt hơn từ nhiều ứng viên.",
      },
      aResearch: {
        [Language.EN]:
          "Abstract or metaphor-heavy questions add noise. For autistic candidates, concrete prompts are fairer and more predictive of real job performance.",
        [Language.VN]:
          "Câu hỏi trừu tượng hoặc nhiều ẩn dụ tạo thêm nhiễu. Với ứng viên tự kỷ, câu hỏi cụ thể công bằng hơn và dự đoán tốt hơn hiệu quả công việc.",
      },
    },
  ],

  resources: [
    {
      id: "r1",
      name: {
        [Language.EN]: "Inclusive interview checklist",
        [Language.VN]: "Checklist phỏng vấn hòa nhập",
      },
      desc: {
        [Language.EN]: "Quick list to prepare a calm, structured interview.",
        [Language.VN]:
          "Danh sách nhanh để chuẩn bị buổi phỏng vấn nhẹ nhàng, có cấu trúc.",
      },
      url: "#",
    },
    {
      id: "r2",
      name: {
        [Language.EN]: "Sample role-focused questions",
        [Language.VN]: "Bộ câu hỏi tập trung vào công việc",
      },
      desc: {
        [Language.EN]:
          "Templates you can adapt and run through the Question Cleaner.",
        [Language.VN]:
          "Mẫu câu hỏi có thể chỉnh sửa và dùng với công cụ Làm sạch câu hỏi.",
      },
      url: "#",
    },
  ],

  /* --------------------- Optional: metrics summary mapping -------------------- */
  metricsSummary: {
    cards: [
      {
        id: "m1",
        title: {
          [Language.EN]: "Detail focus → Fewer errors",
          [Language.VN]: "Chú ý chi tiết → Ít lỗi hơn",
        },
        body: {
          [Language.EN]:
            "Use autistic strengths in QA, data, and documentation to cut rework and protect customers.",
          [Language.VN]:
            "Tận dụng điểm mạnh chú ý chi tiết trong QA, dữ liệu và tài liệu để giảm làm lại và bảo vệ khách hàng.",
        },
      },
      {
        id: "m2",
        title: {
          [Language.EN]: "Consistency → Stable operations",
          [Language.VN]: "Ổn định → Vận hành vững",
        },
        body: {
          [Language.EN]:
            "Assign clear, repeatable tasks and track how reliability supports your service level targets.",
          [Language.VN]:
            "Giao nhiệm vụ rõ ràng, lặp lại và theo dõi cách sự ổn định hỗ trợ các chỉ số dịch vụ của bạn.",
        },
      },
      {
        id: "m3",
        title: {
          [Language.EN]: "Pattern insight → Better decisions",
          [Language.VN]: "Nhìn quy luật → Quyết định tốt hơn",
        },
        body: {
          [Language.EN]:
            "Invite autistic team members to flag repeating issues and co-design small process changes.",
          [Language.VN]:
            "Khuyến khích thành viên tự kỷ nêu ra vấn đề lặp lại và cùng thiết kế điều chỉnh quy trình nhỏ.",
        },
      },
    ],
  },
} as const;