// src/constants/Ourstory.ts
import { Language, StoryEntry, PlaceholderKey } from "@/types";

/** Per-tile media schema for the gallery. */
export type GalleryItem = {
  type: "image" | "video";
  file: string;
  poster?: string;
  caption: Record<Language, string>;
};

export type Achievement = {
  icon: string;
  label: Record<Language, string>;
  title: Record<Language, string>;
  body: Record<Language, string>;
  color: string;
};

export type TeamMember = {
  name: string;
  role: Record<Language, string>;
  school: string;
  bio: Record<Language, string>;
};

export type Stat = {
  value: string;
  label: Record<Language, string>;
};

export interface OurStoryContent {
  rmitArticleUrl: string;
  ui: {
    heroTitle: Record<Language, string>;
    heroTagline: Record<Language, string>;
    heroCopy: Record<Language, string>;
    team: Record<Language, string>;
    diary: Record<Language, string>;
    beyondADC: Record<Language, string>;
    recognition: Record<Language, string>;
    impact: Record<Language, string>;
    lessons: Record<Language, string>;
    reflections: Record<Language, string>;
    appreciation: Record<Language, string>;
    media: Record<Language, string>;
    rmitBadge: Record<Language, string>;
    placeholders: Record<PlaceholderKey, Record<Language, string>>;
  };
  marqueeItems: Record<Language, string[]>;
  team: TeamMember[];
  stats: Stat[];
  sandyQuote: Record<Language, string>;
  sandyQuoteAttr: Record<Language, string>;
  entries: StoryEntry[];
  beyondADC: Record<Language, string>;
  achievements: Achievement[];
  impact: Record<Language, string>;
  lessons: Record<Language, string[]>;
  reflections: Record<Language, string>;
  appreciation: Record<Language, string[]>;
  gallery?: Record<Language, string[]>;
  galleryItems: GalleryItem[];
}

export const OUR_STORY_CONTENT: OurStoryContent = {
  rmitArticleUrl:
    "https://www.rmit.edu.vn/students/student-news-and-events/student-news/2025/neuroaicc-autistic-interview-accessibility-design-competition",

  ui: {
    heroTitle: {
      [Language.EN]: "Our Story · NeuroPilot AICC Journey",
      [Language.VN]: "Câu chuyện của chúng tôi · Hành trình NeuroPilot AICC",
    },
    heroTagline: {
      [Language.EN]: "Built with the community. Not for it.",
      [Language.VN]: "Được xây dựng cùng cộng đồng. Không phải cho họ.",
    },
    heroCopy: {
      [Language.EN]:
        "The ADC 2025 wasn't just a competition. It was a months-long process of listening, failing, rebuilding, and learning — shaped by the people we built for, and the mentors who pushed us to think bigger. This is how NeuroAICC came to life.",
      [Language.VN]:
        "ADC 2025 không chỉ là một cuộc thi. Đó là quá trình lắng nghe, thất bại, xây dựng lại và học hỏi kéo dài nhiều tháng — được định hình bởi những người chúng tôi xây dựng cùng, và những người cố vấn đã thúc đẩy chúng tôi nghĩ xa hơn. Đây là cách NeuroAICC ra đời.",
    },
    team: { [Language.EN]: "The Team", [Language.VN]: "Đội ngũ" },
    diary: { [Language.EN]: "The Journey", [Language.VN]: "Hành trình" },
    beyondADC: { [Language.EN]: "What Happened Next", [Language.VN]: "Điều xảy ra tiếp theo" },
    recognition: { [Language.EN]: "Recognition", [Language.VN]: "Thành tích" },
    impact: { [Language.EN]: "Why This Matters", [Language.VN]: "Tại sao điều này quan trọng" },
    lessons: { [Language.EN]: "What We Learned", [Language.VN]: "Những gì chúng tôi học được" },
    reflections: { [Language.EN]: "Reflections", [Language.VN]: "Suy ngẫm" },
    appreciation: { [Language.EN]: "With Gratitude", [Language.VN]: "Tri ân" },
    media: { [Language.EN]: "Media Gallery", [Language.VN]: "Thư viện hình ảnh" },
    rmitBadge: {
      [Language.EN]: "Featured by RMIT Vietnam →",
      [Language.VN]: "Được giới thiệu bởi RMIT Việt Nam →",
    },
    placeholders: {
      TEAM_PHOTO: { [Language.EN]: "TEAM PHOTO", [Language.VN]: "ẢNH ĐỘI NGŨ" },
      BRAINSTORM: { [Language.EN]: "BRAINSTORM IMAGE", [Language.VN]: "ẢNH Ý TƯỞNG" },
      TEAM_CALL: { [Language.EN]: "TEAM CALL IMAGE", [Language.VN]: "ẢNH CUỘC GỌI" },
      BOOTCAMP: { [Language.EN]: "BOOTCAMP IMAGE", [Language.VN]: "ẢNH BOOTCAMP" },
      MEETING_THUY: { [Language.EN]: "MEETING THUY IMAGE", [Language.VN]: "ẢNH GẶP CÔ THUÝ" },
      IDEA_REFINEMENT: { [Language.EN]: "IDEA REFINEMENT IMAGE", [Language.VN]: "ẢNH TINH CHỈNH Ý TƯỞNG" },
      TEAM_LAUGH: { [Language.EN]: "TEAM LAUGH IMAGE", [Language.VN]: "ẢNH CƯỜI ĐÊM KHUYA" },
      SANDY_WORKSHOP: { [Language.EN]: "SANDY WORKSHOP IMAGE", [Language.VN]: "ẢNH WORKSHOP SANDY" },
      DRAFT: { [Language.EN]: "DRAFT IMAGE", [Language.VN]: "ẢNH BẢN NHÁP" },
      TRUNG_MEETING: { [Language.EN]: "TRUNG MEETING IMAGE", [Language.VN]: "ẢNH GẶP ANH TRUNG" },
      SURVEY: { [Language.EN]: "SURVEY IMAGE", [Language.VN]: "ẢNH KHẢO SÁT" },
      FEEDBACK: { [Language.EN]: "FEEDBACK IMAGE", [Language.VN]: "ẢNH PHẢN HỒI" },
      PROPOSAL: { [Language.EN]: "PROPOSAL WORK IMAGE", [Language.VN]: "ẢNH SOẠN ĐỀ XUẤT" },
      KRISTEN: { [Language.EN]: "KRISTEN IMAGE", [Language.VN]: "ẢNH KRISTEN" },
      BUG: { [Language.EN]: "BUG IMAGE", [Language.VN]: "ẢNH LỖI CODE" },
      CODING: { [Language.EN]: "CODING IMAGE", [Language.VN]: "ẢNH CODE" },
      SIMONA: { [Language.EN]: "SIMONA IMAGE", [Language.VN]: "ẢNH SIMONA" },
      TROY: { [Language.EN]: "TROY IMAGE", [Language.VN]: "ẢNH TROY" },
      FINAL_SPRINT: { [Language.EN]: "FINAL SPRINT IMAGE", [Language.VN]: "ẢNH NƯỚC RÚT" },
      REFLECTION: { [Language.EN]: "REFLECTION IMAGE", [Language.VN]: "ẢNH SUY NGẪM" },
      GALLERY: { [Language.EN]: "MEDIA GALLERY", [Language.VN]: "THƯ VIỆN" },
      ADC_WIN: { [Language.EN]: "ADC FINAL IMAGE", [Language.VN]: "ẢNH VÒNG CHUNG KẾT ADC" },
      SPARK_HUB: { [Language.EN]: "SPARK HUB IMAGE", [Language.VN]: "ẢNH SPARK HUB" },
    },
  },

  marqueeItems: {
    [Language.EN]: [
      "First Runner-Up · ADC 2025",
      "Best Presentation · RMIT SPARKHub",
      "Selected · RMIT SPARKHub Incubation 2025",
      "Featured by RMIT Vietnam",
      "Vietnam's First Bilingual Platform for Autistic Job Seekers",
      "Clinic Adoption Interest · HCMC Child Development Dept.",
    ],
    [Language.VN]: [
      "Á Quân · ADC 2025",
      "Thuyết trình Xuất sắc nhất · RMIT SPARKHub",
      "Được chọn · Ươm tạo RMIT SPARKHub 2025",
      "Được giới thiệu bởi RMIT Việt Nam",
      "Nền tảng Song ngữ Đầu tiên cho Ứng viên Tự kỷ tại Việt Nam",
      "Quan tâm Ứng dụng Lâm sàng · Sở Phát triển Trẻ em TPHCM",
    ],
  },

  team: [
    {
      name: "Shirin Shuja",
      role: {
        [Language.EN]: "Co-founder · Product & Growth Lead",
        [Language.VN]: "Đồng sáng lập · Trưởng Sản phẩm & Phát triển",
      },
      school: "Software Engineering, RMIT Vietnam",
      bio: {
        [Language.EN]:
          "Research background in LLM evaluation and bias detection. Brought technical depth and strategic vision to NeuroAICC.",
        [Language.VN]:
          "Nền tảng nghiên cứu về đánh giá LLM và phát hiện thiên kiến. Mang đến chiều sâu kỹ thuật và tầm nhìn chiến lược cho NeuroAICC.",
      },
    },
    {
      name: "Trịnh Phương Thảo",
      role: {
        [Language.EN]: "Co-founder · UX & Research Lead",
        [Language.VN]: "Đồng sáng lập · Trưởng UX & Nghiên cứu",
      },
      school: "Software Engineering, RMIT Vietnam",
      bio: {
        [Language.EN]:
          "Personal connection to autism through her younger brother shaped the team's commitment to co-creation and lived experience.",
        [Language.VN]:
          "Kết nối cá nhân với tự kỷ qua người em trai đã định hình cam kết của đội ngũ đối với đồng sáng tạo và trải nghiệm sống thực.",
      },
    },
    {
      name: "Trịnh Hoàng Xuân Nghi",
      role: {
        [Language.EN]: "Co-founder · Design & Communications",
        [Language.VN]: "Đồng sáng lập · Trưởng Thiết kế & Truyền thông",
      },
      school: "Digital Communications & Multimedia Design, UEH",
      bio: {
        [Language.EN]:
          "Brought creative vision and visual storytelling to bridge technical ideas with human-centred design.",
        [Language.VN]:
          "Mang đến tầm nhìn sáng tạo và kể chuyện bằng hình ảnh để kết nối ý tưởng kỹ thuật với thiết kế lấy con người làm trung tâm.",
      },
    },
  ],

  stats: [
    {
      value: "54",
      label: {
        [Language.EN]: "Competing submissions from 21 universities",
        [Language.VN]: "Bài dự thi từ 21 trường đại học",
      },
    },
    {
      value: "4",
      label: {
        [Language.EN]: "Stakeholder groups supported by the platform",
        [Language.VN]: "Nhóm người dùng được hỗ trợ bởi nền tảng",
      },
    },
    {
      value: "3",
      label: {
        [Language.EN]: "Months of research, co-creation & building",
        [Language.VN]: "Tháng nghiên cứu, đồng sáng tạo & phát triển",
      },
    },
    {
      value: "2×",
      label: {
        [Language.EN]: "Award recognition — ADC & SPARKHub",
        [Language.VN]: "Lần được ghi nhận giải thưởng — ADC & SPARKHub",
      },
    },
  ],

  sandyQuote: {
    [Language.EN]:
      "As a neurodivergent educator and sister to my late autistic brother Jimmy, I see in their work a future that might have been for him — a world where his unique talents would be celebrated rather than overlooked.",
    [Language.VN]:
      "Là một nhà giáo dục neurodivergent và là chị gái của người em trai tự kỷ đã mất của tôi là Jimmy, tôi thấy trong công việc của họ một tương lai có thể đã là của anh ấy — một thế giới nơi tài năng độc đáo của anh ấy sẽ được tôn vinh thay vì bị bỏ qua.",
  },
  sandyQuoteAttr: {
    [Language.EN]: "Sandy Sinn, Founder, Center for Positive Psychology & Wellbeing",
    [Language.VN]: "Sandy Sinn, Nhà sáng lập, Trung tâm Tâm lý học Tích cực & Phúc lợi",
  },

  entries: [
    {
      id: "0801-1208",
      date: { [Language.EN]: "1–12 Aug", [Language.VN]: "1–12/8" },
      category: { [Language.EN]: "Research", [Language.VN]: "Nghiên cứu" },
      title: {
        [Language.EN]: "Insight Scouting & Early Confusion",
        [Language.VN]: "Tìm Hiểu & Những Bối Rối Ban Đầu",
      },
      body: {
        [Language.EN]:
          "Our first week was a whirlwind of ideas flying in every direction. We explored neurodivergence broadly, and were left with more questions than answers. The chaos was necessary — it forced us to slow down and ask the deeper question: why?\n\nWe created our first personas, sketched rough user flows, and mapped possible problem areas. It wasn't perfect, but it gave us a starting point.",
        [Language.VN]:
          "Tuần đầu tiên là một cơn bão ý tưởng. Chúng tôi khám phá nhiều chủ đề về rối loạn thần kinh và đọng lại với nhiều câu hỏi hơn câu trả lời. Sự hỗn loạn là cần thiết — nó buộc chúng tôi chậm lại và đặt câu hỏi sâu hơn: tại sao?\n\nChúng tôi tạo ra các nhân vật đại diện đầu tiên, phác thảo trải nghiệm người dùng sơ bộ và xác định các vùng vấn đề tiềm ẩn. Chưa hoàn hảo, nhưng đã cho chúng tôi điểm khởi đầu.",
      },
      placeholderKey: "BRAINSTORM" as PlaceholderKey,
    },
    {
      id: "0813",
      date: { [Language.EN]: "13 Aug", [Language.VN]: "13/8" },
      category: { [Language.EN]: "Pivot", [Language.VN]: "Bước ngoặt" },
      title: {
        [Language.EN]: "Bootcamp Kickoff: \u201cNothing About Us Without Us\u201d",
        [Language.VN]: "Khai mạc Bootcamp: \u201cKhông gì về chúng tôi nếu không có chúng tôi\u201d",
      },
      body: {
        [Language.EN]:
          "After sessions on Accessibility & Universal Design and AI & Innovation, the phrase \u201cNothing about us, without us\u201d landed with force. We realised inclusion is not about creating tools for communities — it\u2019s about building with them.\n\nThat day we made a complete pivot: we decided to focus on supporting autistic adults (Level 1), where autism, often invisible to the eye, hides enormous barriers in interviews and workplaces. We saw an underserved space, fragile with mistrust, and knew this was where we could make a difference.",
        [Language.VN]:
          "Sau các buổi chia sẻ về Khả năng tiếp cận & Thiết kế phổ quát và AI & Đổi mới sáng tạo, câu nói \u201cKhông gì về chúng tôi nếu không có chúng tôi\u201d in sâu trong đầu. Chúng tôi nhận ra sự bao gồm không phải là tạo công cụ cho cộng đồng — mà là xây dựng cùng họ.\n\nNgày hôm đó chúng tôi quyết định một bước ngoặt quan trọng: tập trung hỗ trợ người lớn tự kỷ (Level 1), nơi chứng tự kỷ thường vô hình lại ẩn chứa những rào cản khổng lồ trong phỏng vấn và nơi làm việc.",
      },
      placeholderKey: "BOOTCAMP" as PlaceholderKey,
    },
    {
      id: "0814-0815",
      date: { [Language.EN]: "14–15 Aug", [Language.VN]: "14–15/8" },
      category: { [Language.EN]: "Mentor Session", [Language.VN]: "Gặp gỡ Mentor" },
      title: {
        [Language.EN]: "Meeting with Ms. Thanh Thu\u00fd",
        [Language.VN]: "G\u1eb7p g\u1ee1 Thanh Thu\u00fd",
      },
      body: {
        [Language.EN]:
          "We had the privilege of speaking with Ms. Thanh Thu\u00fd, an autistic social worker from \u0110\u00e0 N\u1eb5ng. She opened up about her personal struggles — from daily communication hurdles to the anxiety of navigating workplaces.\n\nListening to her shifted our project from abstract idea to something deeply human. It gave us urgency and responsibility to design with care.",
        [Language.VN]:
          "Chúng tôi được trò chuyện với cô Thanh Thuý, một nhân viên xã hội tự kỷ từ Đà Nẵng. Cô chia sẻ những khó khăn cá nhân — từ rào cản giao tiếp hàng ngày đến nỗi lo âu khi hòa nhập nơi làm việc.\n\nLắng nghe cô đã chuyển đổi dự án của chúng tôi từ ý tưởng trừu tượng thành điều gì đó sâu sắc về mặt con người.",
      },
      placeholderKey: "MEETING_THUY" as PlaceholderKey,
    },
    {
      id: "0816-0819",
      date: { [Language.EN]: "16–19 Aug", [Language.VN]: "16–19/8" },
      category: { [Language.EN]: "Research", [Language.VN]: "Nghiên cứu" },
      title: {
        [Language.EN]: "Brainstorming & Refinement Days",
        [Language.VN]: "Lên Ý Tưởng & Tinh Chỉnh",
      },
      body: {
        [Language.EN]:
          "Many heated debates later, we kept returning to one recurring problem: the \u201ctrust gap\u201d — between autistic jobseekers, parents, employers, and society. With every pivot, the picture became clearer.\n\nInnovation isn\u2019t linear — it\u2019s messy, frustrating, and full of backtracking. Yet persistence carried us forward.",
        [Language.VN]:
          "Sau nhiều cuộc tranh luận, chúng tôi luôn quay lại với một vấn đề: \u201ckhoảng cách niềm tin\u201d — giữa người tự kỷ tìm việc, cha mẹ, nhà tuyển dụng và xã hội. Với mỗi lần điều chỉnh, bức tranh trở nên rõ ràng hơn.\n\nĐổi mới không phải là con đường thẳng — nó lộn xộn, khó khăn và đầy bước lùi. Nhưng sự kiên trì đã đưa chúng tôi tiến lên.",
      },
      placeholderKey: "IDEA_REFINEMENT" as PlaceholderKey,
    },
    {
      id: "0823",
      date: { [Language.EN]: "19 Aug", [Language.VN]: "19/8" },
      category: { [Language.EN]: "Expert Consultation", [Language.VN]: "Chuyên gia" },
      title: {
        [Language.EN]: "Meeting with Mr. Trung (Vietnam Autism Project)",
        [Language.VN]: "Chia sẻ của anh Trung (Dự án Tự kỷ Việt Nam)",
      },
      body: {
        [Language.EN]:
          "Mr. Trung, founder of the Vietnam Autism Project, with over a decade of experience, confirmed our biggest suspicion. The core barrier is trust.\n\nParents don\u2019t trust society to care for their children. Employers don\u2019t trust autistic candidates to perform. And autistic adults, after repeated rejection, lose trust in themselves. This reshaped our entire proposal — we had to design for trust, not just for features.",
        [Language.VN]:
          "Anh Trung, sáng lập Dự án Autism Việt Nam với hơn 10 năm kinh nghiệm, đã xác nhận nghi ngờ lớn nhất của chúng tôi. Rào cản cốt lõi là niềm tin.\n\nPhụ huynh không tin xã hội có thể chăm sóc con mình. Nhà tuyển dụng không tin ứng viên tự kỷ có thể hoàn thành công việc. Và người tự kỷ, sau nhiều lần bị từ chối, mất niềm tin vào bản thân. Điều này định hình lại toàn bộ đề xuất của chúng tôi.",
      },
      placeholderKey: "TRUNG_MEETING" as PlaceholderKey,
    },
    {
      id: "0820",
      date: { [Language.EN]: "20 Aug", [Language.VN]: "20/8" },
      category: { [Language.EN]: "Workshop", [Language.VN]: "Workshop" },
      title: {
        [Language.EN]: "Accessibility Workshop with Ms. Sandy Sinn",
        [Language.VN]: "Workshop Tiếp cận với cô Sandy Sinn",
      },
      body: {
        [Language.EN]:
          "That evening we joined an accessibility workshop led by Ms. Sandy that stretched until 10pm — and none of us wanted to leave. Her depth of knowledge and genuine care reminded us that accessibility is not an afterthought or a checkbox — it is the mindset.\n\nOne that shapes how we design, how we speak, and how we include. We walked away determined to carry that principle into every part of the project.",
        [Language.VN]:
          "Tối hôm đó chúng tôi tham gia workshop tiếp cận do cô Sandy dẫn dắt, kéo dài đến 10 giờ tối — và không ai muốn rời đi. Sự sâu sắc và quan tâm thực sự của cô nhắc nhở chúng tôi rằng khả năng tiếp cận không phải là thứ được nghĩ đến sau cùng — nó là tư duy.\n\nMột tư duy định hình cách chúng tôi thiết kế, giao tiếp và bao gồm mọi người.",
      },
      placeholderKey: "SANDY_WORKSHOP" as PlaceholderKey,
    },
    {
      id: "0826",
      date: { [Language.EN]: "21 Aug", [Language.VN]: "21/8" },
      category: { [Language.EN]: "Feedback Session", [Language.VN]: "Phản hồi" },
      title: {
        [Language.EN]: "Review with Troy & Sandy",
        [Language.VN]: "Phản hồi cùng Troy & Sandy",
      },
      body: {
        [Language.EN]:
          "Troy and Sandy\u2019s feedback was direct and challenging, pointing out weak spots we hadn\u2019t noticed. Those hard questions gave us clarity — they forced us to defend our choices, rethink others, and come out sharper.\n\nBy the end of the session, our idea felt stronger and our team more aligned.",
        [Language.VN]:
          "Phản hồi của Troy và Sandy thẳng thắn và đầy thử thách, chỉ ra những điểm yếu chúng tôi chưa nhận ra. Những câu hỏi khó đó mang lại sự rõ ràng — buộc chúng tôi bảo vệ lựa chọn, suy nghĩ lại những điểm khác và trở nên sắc bén hơn.\n\nKết thúc buổi, ý tưởng vững chắc hơn và cả nhóm đồng thuận hơn.",
      },
      placeholderKey: "FEEDBACK" as PlaceholderKey,
    },
    {
      id: "0827-0831",
      date: { [Language.EN]: "22–24 Aug", [Language.VN]: "22–24/8" },
      category: { [Language.EN]: "Writing", [Language.VN]: "Viết lách" },
      title: {
        [Language.EN]: "Proposal Refinement Week",
        [Language.VN]: "Tuần hoàn thiện đề xuất",
      },
      body: {
        [Language.EN]:
          "This was the week of endless edits — sitting for hours polishing every sentence to reflect the insights about trust we had gained.\n\nWe learned something unexpected: writing is also a form of designing. Each word shaped how others would see our project, and each revision made our vision clearer.",
        [Language.VN]:
          "Tuần của những lần chỉnh sửa không ngừng — ngồi hàng giờ mài giũa từng câu để phản ánh đúng những hiểu biết về niềm tin.\n\nChúng tôi học được điều bất ngờ: viết cũng là một hình thức thiết kế. Mỗi từ định hình cách người khác nhìn nhận dự án, và mỗi lần chỉnh sửa làm tầm nhìn rõ ràng hơn.",
      },
      placeholderKey: "PROPOSAL" as PlaceholderKey,
    },
    {
      id: "0904",
      date: { [Language.EN]: "4 Sep", [Language.VN]: "4/9" },
      category: { [Language.EN]: "Expert Consultation", [Language.VN]: "Chuyên gia" },
      title: {
        [Language.EN]: "Meeting with Ms. Kristen (Imago Work, Hanoi)",
        [Language.VN]: "Gặp cô Kristen (Imago Work, Hà Nội)",
      },
      body: {
        [Language.EN]:
          "Kristen brought a new dimension with years of experience in vocational training for youth with intellectual disabilities. She made us confront a question we hadn\u2019t asked: Are employers ready?\n\nInclusive hiring isn\u2019t just about preparing candidates — it\u2019s about preparing recruiters too. From this conversation, the idea for our \u201cQuestion Cleaner\u201d feature was born.",
        [Language.VN]:
          "Kristen mang đến góc nhìn mới với nhiều năm kinh nghiệm đào tạo nghề cho thanh thiếu niên khuyết tật trí tuệ. Cô khiến chúng tôi đối mặt với câu hỏi chưa từng nghĩ đến: Liệu nhà tuyển dụng đã sẵn sàng chưa?\n\nTuyển dụng hòa nhập không chỉ là chuẩn bị cho ứng viên — mà còn là chuẩn bị cho người tuyển dụng. Từ đó, tính năng \u201cQuestion Cleaner\u201d ra đời.",
      },
      placeholderKey: "KRISTEN" as PlaceholderKey,
    },
    {
      id: "0905-0910",
      date: { [Language.EN]: "5–10 Sep", [Language.VN]: "5–10/9" },
      category: { [Language.EN]: "Building", [Language.VN]: "Xây dựng" },
      title: {
        [Language.EN]: "Coding, Long Nights & the First Working Build",
        [Language.VN]: "Code, những đêm dài & bản dựng đầu tiên",
      },
      body: {
        [Language.EN]:
          "This was when our vision started turning real. We coded narration systems, tested the STAR interview modules, and integrated calm-mode features. Bugs piled up, prototypes failed, and we restarted more times than we could count. But every small victory felt like fuel.\n\nThe MVP was built to WCAG accessibility standards, optimised through vibe-coding for speed, clarity, and usability.",
        [Language.VN]:
          "Đây là lúc tầm nhìn bắt đầu trở thành hiện thực. Chúng tôi lập trình hệ thống dẫn chuyện, thử nghiệm các mô-đun phỏng vấn STAR và tích hợp tính năng chế độ bình tĩnh. Lỗi chồng chất, prototype thất bại, và chúng tôi phải bắt đầu lại rất nhiều lần. Nhưng mỗi chiến thắng nhỏ đều tiếp thêm năng lượng.\n\nMVP được xây dựng theo tiêu chuẩn WCAG, được tối ưu hóa cho tốc độ, sự rõ ràng và khả năng sử dụng.",
      },
      placeholderKey: "CODING" as PlaceholderKey,
    },
    {
      id: "0911",
      date: { [Language.EN]: "11 Sep", [Language.VN]: "11/9" },
      category: { [Language.EN]: "Breakthrough", [Language.VN]: "Đột phá" },
      title: {
        [Language.EN]: "Meeting with Ms. Simona Bossoni",
        [Language.VN]: "Gặp cô Simona Bossoni",
      },
      body: {
        [Language.EN]:
          "Meeting Simona — Head of the Child Development Department in Ho Chi Minh City — was a breakthrough. She not only praised the app but asked if she could use it in her clinic.\n\nThat request was both humbling and empowering. For the first time, we felt our project wasn\u2019t just theoretical. It had real-world potential to help real people.",
        [Language.VN]:
          "Cuộc gặp gỡ với cô Simona — Trưởng phòng Phát triển Trẻ em tại TP. Hồ Chí Minh — là một bước đột phá. Cô không chỉ khen ngợi ứng dụng mà còn hỏi liệu có thể sử dụng tại phòng khám của mình.\n\nYêu cầu đó vừa khiêm nhường vừa tiếp thêm sức mạnh. Lần đầu tiên, chúng tôi cảm thấy dự án không còn chỉ là lý thuyết.",
      },
      placeholderKey: "SIMONA" as PlaceholderKey,
    },
    {
      id: "0912-troy",
      date: { [Language.EN]: "12 Sep", [Language.VN]: "12/9" },
      category: { [Language.EN]: "Strategy Session", [Language.VN]: "Chiến lược" },
      title: {
        [Language.EN]: "Final Guidance with Troy",
        [Language.VN]: "Hướng dẫn cuối cùng với Troy",
      },
      body: {
        [Language.EN]:
          "Troy, with his expertise in AI-powered automation, pushed us to think not only about what features to build, but how to build them sustainably — with scale in mind.\n\nInclusion must be practical and resilient if it is to last.",
        [Language.VN]:
          "Troy, với kiến thức về tự động hóa AI, thúc đẩy chúng tôi không chỉ nghĩ về tính năng cần xây dựng, mà còn về cách xây dựng chúng bền vững — với khả năng mở rộng trong đầu.\n\nSự bao gồm phải thực tế và vững bền nếu muốn tồn tại lâu dài.",
      },
      placeholderKey: "TROY" as PlaceholderKey,
    },
    {
      id: "0912-0914",
      date: { [Language.EN]: "12–14 Sep", [Language.VN]: "12–14/9" },
      category: { [Language.EN]: "Final Sprint", [Language.VN]: "Nước rút" },
      title: {
        [Language.EN]: "Round 2 Submission",
        [Language.VN]: "Nộp bài Vòng 2",
      },
      body: {
        [Language.EN]:
          "The final sprint was a blur of coffee cups, late-night edits, and countless shared Google Docs. We refined visuals, polished captions, and made sure every element was accessible.\n\nBy the time we hit submit, we realised this wasn\u2019t just a competition entry. It was our story of growth, told through struggle, persistence, and community support.",
        [Language.VN]:
          "Giai đoạn nước rút trôi qua trong cà phê, những đêm dài chỉnh sửa và vô số tài liệu Google Docs. Chúng tôi tinh chỉnh hình ảnh và đảm bảo mọi thứ đều thân thiện với người dùng.\n\nKhi nhấn nộp bài, chúng tôi nhận ra đây không chỉ là bài dự thi. Đây là câu chuyện về sự trưởng thành của chúng tôi.",
      },
      placeholderKey: "FINAL_SPRINT" as PlaceholderKey,
    },
    {
      id: "adc-result",
      date: { [Language.EN]: "ADC Final", [Language.VN]: "Chung kết ADC" },
      category: { [Language.EN]: "Award", [Language.VN]: "Giải thưởng" },
      title: {
        [Language.EN]: "First Runner-Up at ADC 2025",
        [Language.VN]: "Á Quân tại ADC 2025",
      },
      body: {
        [Language.EN]:
          "Out of 54 submissions from 162 students across 21 universities, NeuroAICC was named First Runner-Up — and was featured by RMIT Vietnam for its social impact and accessibility focus.\n\nThe result affirmed that our work carries real impact and real potential. Our mentor later called the project \u201cgroundbreaking and life-changing.\u201d",
        [Language.VN]:
          "Trong số 54 bài dự thi từ 162 sinh viên thuộc 21 trường đại học, NeuroAICC đạt giải Á Quân — và được RMIT Việt Nam giới thiệu vì tác động xã hội và tầm nhìn tiếp cận.\n\nKết quả khẳng định công việc của chúng tôi mang tác động và tiềm năng thực sự. Người cố vấn của chúng tôi sau đó gọi dự án là \u201cđột phá và thay đổi cuộc sống.\u201d",
      },
      placeholderKey: "ADC_WIN" as PlaceholderKey,
    },
    {
      id: "spark-hub",
      date: { [Language.EN]: "SPARK Hub", [Language.VN]: "SPARK Hub" },
      category: { [Language.EN]: "Recognition", [Language.VN]: "Ghi nhận" },
      title: {
        [Language.EN]: "SPARKHub Incubation & Best Presentation",
        [Language.VN]: "Ươm tạo SPARKHub & Thuyết trình Xuất sắc nhất",
      },
      body: {
        [Language.EN]:
          "NeuroAICC was selected for the RMIT SPARKHub Incubation Program (2025), a step toward reaching more users nationwide. At the program\u2019s Demo Day, we received the Best Presentation award — recognised for communication clarity, strategic depth, and impact-driven problem solving.\n\nThe experience strengthened our ability to translate complex ideas into compelling narratives for diverse audiences. What began as a competition entry is becoming a startup.",
        [Language.VN]:
          "NeuroAICC được chọn tham gia Chương trình Ươm tạo RMIT SPARKHub (2025), một bước hướng tới tiếp cận nhiều người dùng hơn trên toàn quốc. Tại Demo Day của chương trình, chúng tôi nhận giải Thuyết trình Xuất sắc nhất — được ghi nhận vì sự rõ ràng trong giao tiếp, chiều sâu chiến lược và giải quyết vấn đề hướng tác động.\n\nĐiều bắt đầu như bài dự thi đang trở thành một startup.",
      },
      placeholderKey: "SPARK_HUB" as PlaceholderKey,
    },
  ],

  beyondADC: {
    [Language.EN]:
      "We pressed \u201csubmit\u201d thinking the journey had a finish line. It didn\u2019t.\n\nAfter the ADC Final, NeuroAICC was recognised by RMIT Vietnam for its social impact — a platform born from real community need, designed with the people it serves. That visibility led to something we hadn\u2019t planned for: an invitation into the RMIT SPARK Hub Incubation Program.\n\nIncubation meant stepping out of \u201cstudent project\u201d mode and into something more accountable. We refined our pitch, deepened our thinking on sustainable impact, and earned Best Presentation recognition in the process.\n\nMore than any award, the program gave us clarity. The right question was never \u201chow do we win?\u201d It was always \u201chow do we build something that keeps working for autistic job-seekers in Vietnam \u2014 long after the program ends?\u201d\n\nThat question is still driving us.",
    [Language.VN]:
      "Chúng tôi nhấn \u201cnộp bài\u201d với suy nghĩ rằng hành trình đã có vạch đích. Nhưng không.\n\nSau vòng chung kết ADC, NeuroAICC được RMIT Việt Nam ghi nhận vì tác động xã hội — nền tảng ra đời từ nhu cầu cộng đồng thực sự, được thiết kế cùng những người mà nó phục vụ. Sự ghi nhận đó dẫn đến điều chúng tôi chưa từng lên kế hoạch: lời mời tham gia Chương trình Ươm tạo RMIT SPARK Hub.\n\nƯơm tạo có nghĩa là bước ra khỏi tư duy \u201cdự án sinh viên\u201d và vào điều gì đó có trách nhiệm hơn. Chúng tôi trau dồi bài thuyết trình, hiểu sâu hơn về tác động bền vững và nhận giải Thuyết trình Xuất sắc nhất.\n\nHơn bất kỳ giải thưởng nào, chương trình mang lại sự rõ ràng. Câu hỏi đúng không bao giờ là \u201clàm sao để thắng?\u201d Câu hỏi luôn là \u201clàm thế nào để xây dựng điều gì đó tiếp tục hoạt động cho người tự kỷ tìm việc ở Việt Nam \u2014 sau khi chương trình kết thúc?\u201d\n\nCâu hỏi đó vẫn đang thúc đẩy chúng tôi.",
  },

  achievements: [
    {
      icon: "Award",
      label: { [Language.EN]: "ADC 2025 · RMIT Vietnam", [Language.VN]: "ADC 2025 · RMIT Việt Nam" },
      title: { [Language.EN]: "First Runner-Up", [Language.VN]: "Á Quân" },
      body: {
        [Language.EN]:
          "Among 54 submissions from 162 students across 21 universities. Featured by RMIT Vietnam for social impact and accessibility focus.",
        [Language.VN]:
          "Trong số 54 bài dự thi từ 162 sinh viên thuộc 21 trường đại học. Được RMIT Việt Nam giới thiệu vì tác động xã hội và tầm nhìn tiếp cận.",
      },
      color: "from-blue-50 to-indigo-50 border-blue-200",
    },
    {
      icon: "Mic2",
      label: { [Language.EN]: "RMIT SPARKHub Incubation", [Language.VN]: "Ươm tạo RMIT SPARKHub" },
      title: { [Language.EN]: "Best Presentation", [Language.VN]: "Thuyết trình Xuất sắc nhất" },
      body: {
        [Language.EN]:
          "Recognised for communication clarity, strategic depth, and impact-driven storytelling at the SPARKHub Demo Day.",
        [Language.VN]:
          "Được ghi nhận vì sự rõ ràng trong giao tiếp, chiều sâu chiến lược và kể chuyện hướng tác động tại Demo Day của SPARKHub.",
      },
      color: "from-violet-50 to-purple-50 border-violet-200",
    },
    {
      icon: "Rocket",
      label: { [Language.EN]: "RMIT SPARKHub · 2025", [Language.VN]: "RMIT SPARKHub · 2025" },
      title: { [Language.EN]: "Incubation Selection", [Language.VN]: "Được Chọn vào Ươm tạo" },
      body: {
        [Language.EN]:
          "Selected for the RMIT SPARKHub Incubation Program — a step toward scaling NeuroAICC nationwide as a startup.",
        [Language.VN]:
          "Được chọn tham gia Chương trình Ươm tạo RMIT SPARKHub — bước hướng tới mở rộng NeuroAICC ra toàn quốc.",
      },
      color: "from-emerald-50 to-teal-50 border-emerald-200",
    },
  ],

  impact: {
    [Language.EN]:
      "Building a tool for autistic adults is not enough if the community lacks inclusive awareness.\n\nWith 4 key stakeholders, AICC delivers gamified AI tools to help autistic candidates improve cognitive and communication skills — while also providing inclusive training and resources for employers and the broader community.\n\nImpact only happens when both sides are supported.",
    [Language.VN]:
      "Xây dựng công cụ cho người tự kỷ trưởng thành là chưa đủ nếu cộng đồng thiếu nhận thức hòa nhập.\n\nVới 4 nhóm người dùng chính, AICC cung cấp công cụ AI gamified giúp ứng viên tự kỷ cải thiện kỹ năng nhận thức và giao tiếp — đồng thời cung cấp đào tạo và tài nguyên hòa nhập cho nhà tuyển dụng và cộng đồng rộng lớn hơn.\n\nTác động chỉ xảy ra khi cả hai phía được hỗ trợ.",
  },

  lessons: {
    [Language.EN]: [
      "We started scattered, confused, and overwhelmed. The chaos was necessary — it forced us to ask better questions before proposing any solution.",
      "Mentors, parents, and autistic adults didn\u2019t just validate our work — they shaped the direction of every major decision we made.",
      "Autism is a spectrum of needs and strengths. Many behaviours reflect sensory loads or unclear expectations. Inclusion means changing environments, not changing people.",
      "The hardest challenges became our most meaningful lessons — in resilience, in empathy, and in designing with people rather than for them.",
      "Building a tool is not enough. You must also build the ecosystem — employers, caregivers, and communities — around it.",
    ],
    [Language.VN]: [
      "Chúng tôi bắt đầu rời rạc, bối rối và choáng ngợp. Sự hỗn loạn là cần thiết — nó buộc chúng tôi đặt câu hỏi tốt hơn trước khi đề xuất bất kỳ giải pháp nào.",
      "Các mentor, phụ huynh và người tự kỷ không chỉ xác nhận công việc của chúng tôi — họ định hình hướng đi của mọi quyết định lớn mà chúng tôi đưa ra.",
      "Tự kỷ là một phổ của nhu cầu và thế mạnh. Nhiều hành vi phản ánh tải cảm giác hoặc kỳ vọng không rõ ràng. Sự bao gồm có nghĩa là thay đổi môi trường, không phải thay đổi con người.",
      "Những thử thách khó nhất trở thành bài học ý nghĩa nhất — về sự bền bỉ, sự đồng cảm và thiết kế cùng con người thay vì cho họ.",
      "Xây dựng công cụ là chưa đủ. Bạn cũng phải xây dựng hệ sinh thái — nhà tuyển dụng, người chăm sóc và cộng đồng — xung quanh nó.",
    ],
  },

  reflections: {
    [Language.EN]:
      "We started scattered, confused, and overwhelmed — a group of students who cared about inclusion but had no idea what shape that would take.\n\nAlong the way, mentors challenged us. Autistic adults trusted us with their stories. Parents showed us what it means to love someone who moves through the world differently. These conversations did not just inform our design — they changed how we think.\n\nWhat began as a competition entry became a project selected for incubation. What began as a prototype is becoming a platform with a longer life in mind.\n\nWe are still early. But we are not just starting — we are continuing something real.",
    [Language.VN]:
      "Chúng tôi khởi đầu rời rạc, bối rối và choáng ngợp — một nhóm sinh viên quan tâm đến sự hòa nhập nhưng chưa biết điều đó sẽ có hình dạng gì.\n\nXuyên suốt hành trình, các mentor thách thức chúng tôi. Người tự kỷ tin tưởng chia sẻ câu chuyện của họ. Các bậc phụ huynh cho chúng tôi thấy ý nghĩa của việc yêu thương ai đó di chuyển qua thế giới theo cách khác biệt. Những cuộc trò chuyện này không chỉ cung cấp thông tin cho thiết kế — chúng thay đổi cách chúng tôi suy nghĩ.\n\nĐiều bắt đầu như bài dự thi đã trở thành dự án được chọn để ươm tạo. Điều bắt đầu như nguyên mẫu đang trở thành nền tảng với tầm nhìn lâu dài hơn.\n\nChúng tôi vẫn còn sớm. Nhưng chúng tôi không chỉ đang bắt đầu — chúng tôi đang tiếp tục điều gì đó thật sự.",
  },

  appreciation: {
    [Language.EN]: [
      "Sandy Sinn — Founder, CPPWB. Whose passion for accessibility reminded us it is not a checkbox but a mindset. Her late-night workshops lit the spark that kept us going.",
      "Troy Yeo — COO, AI Automation. Pushed us to think about scale, sustainability, and long-term impact. His direct feedback sharpened our strategy at every stage.",
      "Kristen Lewis — Imago Work, Hanoi. Her six years in vocational training shaped our employer-focused features and reminded us to design for readiness on both sides of hiring.",
      "Thanh Thu\u00fd — Autistic Social Worker, \u0110\u00e0 N\u1eb5ng. Shared lived experience with openness and generosity. Her stories grounded our project in reality and gave us courage to tackle invisible barriers.",
      "Mr. Trung — Vietnam Autism Project. A decade of experience confirmed the \u201ctrust gap\u201d as the heart of the problem — and became the backbone of our proposal.",
      "Ms. Simona Bossoni — Child Development Dept., HCMC. Her validation of our prototype — and interest in using it in her clinic — gave us confidence that our idea could live beyond paper.",
      "Ngoc Quach — Psychologist, since 2017. Specialist in supporting autistic individuals and families — her expertise on communication, emotional regulation, and self-advocacy shaped our platform\u2019s core values.",
      "Hieu Phung — Mentor. Provided valuable guidance during mentor sessions, helping us refine our direction with clarity and purpose.",
    ],
    [Language.VN]: [
      "Sandy Sinn — Nhà sáng lập, CPPWB. Niềm đam mê của cô nhắc chúng tôi rằng sự hòa nhập không phải là mục cần đánh dấu mà là tư duy. Những buổi workshop của cô thắp lửa cho hành trình.",
      "Troy Yeo — COO, Tự động hóa AI. Thúc đẩy chúng tôi suy nghĩ về khả năng mở rộng, tính bền vững và tác động lâu dài. Phản hồi thẳng thắn của anh mài sắc chiến lược ở mọi giai đoạn.",
      "Kristen Lewis — Imago Work, Hà Nội. Sáu năm đào tạo nghề định hình các tính năng hướng nhà tuyển dụng và nhắc nhở chúng tôi thiết kế để cả hai bên đều sẵn sàng.",
      "Thanh Thuý — Nhân viên xã hội tự kỷ, Đà Nẵng. Chia sẻ trải nghiệm sống với sự cởi mở và hào phóng. Câu chuyện của cô giúp dự án gắn liền thực tế và tiếp thêm can đảm.",
      "Anh Trung — Dự án Tự kỷ Việt Nam. Hơn 10 năm kinh nghiệm xác nhận \u201ckhoảng cách niềm tin\u201d là cốt lõi vấn đề — trở thành xương sống của đề xuất chúng tôi.",
      "Cô Simona Bossoni — Sở Phát triển Trẻ em, TP.HCM. Sự đánh giá cao nguyên mẫu và mong muốn sử dụng tại phòng khám tiếp thêm sự tự tin rằng ý tưởng có thể hiện thực hóa ngoài lý thuyết.",
      "Ngọc Quách — Nhà tâm lý học, từ 2017. Chuyên gia hỗ trợ người tự kỷ và gia đình — kiến thức về giao tiếp, điều hòa cảm xúc và tự vận động định hình giá trị cốt lõi của nền tảng.",
      "Hiếu Phùng — Mentor. Hướng dẫn và góc nhìn quý giá trong các buổi cố vấn, giúp chúng tôi định hình hướng đi với sự rõ ràng và mục đích.",
    ],
  },

  gallery: {
    [Language.EN]: ["ADC Bootcamp", "Mentor Workshop", "Proposal Nights", "Prototype", "Filming"],
    [Language.VN]: ["Bootcamp ADC", "Workshop Mentor", "Đêm chỉnh đề xuất", "Prototype", "Quay video"],
  },

  galleryItems: [
    {
      type: "image",
      file: "ADC2.png",
      caption: { [Language.EN]: "ADC 2025 — First Runner-Up", [Language.VN]: "ADC 2025 — Á Quân" },
    },
    {
      type: "image",
      file: "ADC1.png",
      caption: { [Language.EN]: "ADC Final Presentation", [Language.VN]: "Chung kết ADC" },
    },
    {
      type: "video",
      file: "bootcamp1.mov",
      caption: { [Language.EN]: "Bootcamp — Where It All Began", [Language.VN]: "Bootcamp — Nơi tất cả bắt đầu" },
    },
    {
      type: "image",
      file: "workshop.png",
      caption: { [Language.EN]: "Mentor Workshop with Sandy", [Language.VN]: "Workshop cùng cô Sandy" },
    },
    {
      type: "video",
      file: "proposal.MOV",
      caption: { [Language.EN]: "Late-night Proposal Work", [Language.VN]: "Những đêm chỉnh sửa đề xuất" },
    },
    {
      type: "image",
      file: "prototype.png",
      caption: { [Language.EN]: "Prototype Screens", [Language.VN]: "Ảnh chụp prototype" },
    },
    {
      type: "video",
      file: "filming.MOV",
      caption: { [Language.EN]: "Filming Our Story", [Language.VN]: "Quay video câu chuyện" },
    },
    {
      type: "video",
      file: "late.MOV",
      caption: { [Language.EN]: "Late-night Debugging", [Language.VN]: "Sửa lỗi đêm muộn" },
    },
  ],
};
