// src/constants/Ourstory.ts
import { Language, StoryEntry, PlaceholderKey } from "@/types";

/** Per-tile media schema for the gallery. */
export type GalleryItem = {
  type: "image" | "video";
  /**
   * Basename inside:
   *   - images: src/assets/images/OurStory
   *   - videos: src/assets/videos/OurStory
   * or a full http(s) URL.
   */
  file: string;
  /** Optional poster image for videos (basename or URL) */
  poster?: string;
  /** Localized caption */
  caption: Record<Language, string>;
};

export interface OurStoryContent {
  ui: {
    heroTitle: Record<Language, string>;
    diary: Record<Language, string>;
    reflections: Record<Language, string>;
    appreciation: Record<Language, string>;
    media: Record<Language, string>;
    placeholders: Record<PlaceholderKey, Record<Language, string>>;
  };
  intro: Record<Language, string>;
  entries: StoryEntry[];
  reflections: Record<Language, string>;
  appreciation: Record<Language, string[]>;
  /** Legacy captions-only gallery (kept for backward compatibility). */
  gallery?: Record<Language, string[]>;
  /** New per-item gallery that supports images & videos. */
  galleryItems: GalleryItem[];
}

export const OUR_STORY_CONTENT: OurStoryContent = {
  ui: {
    heroTitle: {
      [Language.EN]: "🌍 Our Story – NeuroPilot AICC Journey",
      [Language.VN]: "🌍 Câu chuyện của chúng tôi – Hành trình NeuroPilot AICC",
    },
    diary: { [Language.EN]: "Diary Timeline", [Language.VN]: "Nhật ký hành trình" },
    reflections: { [Language.EN]: "Reflections", [Language.VN]: "Suy ngẫm" },
    appreciation: { [Language.EN]: "Appreciation", [Language.VN]: "Tri ân" },
    media: { [Language.EN]: "Media Gallery", [Language.VN]: "Thư viện hình ảnh" },
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
    },
  },

  intro: {
    [Language.EN]:
      "The Accessibility Design Competition (ADC) 2025 to us wasn’t just a contest. We started a journey — one full of late-night brainstorming, inspiring mentors, real-world insights, and a lot of resilience.\nThe competition was a hands-on opportunity to explore accessibility, engage with industry mentors, and translate research into actionable solutions for inclusive employment.",
    [Language.VN]:
      "Cuộc thi Accessibility Design Competition (ADC) 2025 đối với chúng tôi là một hành trình tràn đầy những đêm thức khuya lên ý tưởng, những người cố vấn truyền cảm hứng, những trải nghiệm thực tế và rất nhiều sự kiên trì.\nCuộc thi này là cơ hội thực tế để kết nối với các chuyên gia trong ngành, và biến các nghiên cứu công nghệ thành các giải pháp, hành động thúc đẩy sự công bằng cho tất cả mọi người trong việc làm.",
  },

  entries: [
    {
      id: "0801-1208",
      date: {
        [Language.EN]: "1–12 August – Insight Scouting & Early Confusion",
        [Language.VN]: "1–12/8 – Tìm Hiểu & Những Bối Rối Ban Đầu",
      },
      body: {
        [Language.EN]:
          "Our first week was a whirlwind of ideas that seemed to fly in every direction. We explored topics on neurodivergent, and were left with more questions than answers. At times it felt chaotic, but the chaos was necessary. Those messy days reminded us that before proposing any solution, we had to slow down and ask the deeper question: why? And we created our first personas, sketched rough user flows, and mapped possible problem areas. It wasn’t perfect, but it gave us a starting point.",
        [Language.VN]:
          "Tuần đầu tiên của chúng tôi là một cơn “bão ý tưởng”, với đủ các định hướng và suy nghĩ. Chúng tôi khám phá nhiều chủ đề liên quan đến người tự kỷ và rối loạn thần kinh khác nhau, nhưng đọng lại với nhiều câu hỏi hơn là câu trả lời. Đôi lúc mọi thứ có vẻ hỗn loạn, nhưng chính sự hỗn loạn ấy lại cần thiết. Những ngày lộn xộn đó nhắc nhở chúng tôi rằng trước khi đề xuất bất kỳ giải pháp nào, chúng tôi phải dừng lại và nghĩ sâu sắc hơn: “Tại sao?”. Trong quá trình đó, chúng tôi đã tạo ra các nhân vật đại diện (persona) đầu tiên, phác thảo trải nghiệm người dùng sơ bộ và rạch ra các khu vực tiềm ẩn vấn đề. Nó chưa hoàn hảo, nhưng ít nhất đã cho chúng tôi một điểm khởi đầu.",
      },
      placeholderKey: "BRAINSTORM" as PlaceholderKey,
    },
    {
      id: "0813",
      date: {
        [Language.EN]: "13 August – Bootcamp Kickoff: “Nothing About Us Without Us”",
        [Language.VN]: "13/8 – Khai mạc Bootcamp: “Không gì về chúng tôi nếu không có chúng tôi”",
      },
      body: {
        [Language.EN]:
          "After attending sessions on Accessibility & Universal Design and AI & Innovation, our thinking expanded beyond features and functions. The phrase “Nothing about us, without us” landed with force. We realized that inclusion is not just about creating tools for communities but building them with those communities. That day, we made a complete pivot: we decided to focus on supporting autistic adults (Level 1). Where autism, often invisible to the eye, hides enormous barriers in interviews and workplaces. We saw an underserved space, fragile with mistrust, and knew this was where we could make a difference.",
        [Language.VN]:
          "Sau khi tham dự các buổi chia sẻ về Khả năng tiếp cận & Thiết kế phổ quát và AI & Đổi mới sáng tạo, tầm nhìn của chúng tôi được mở rộng vượt ra ngoài các tính năng và chức năng. Câu nói “Nothing about us, without us” (Không gì về chúng tôi nếu không có chúng tôi) in sâu trong đầu chúng tôi. Chúng tôi nhận ra rằng sự bao gồm không chỉ là tạo ra công cụ cho cộng đồng mà còn là xây dựng cùng với cộng đồng đó. Ngày hôm đó, chúng tôi quyết định một bước ngoặt quan trọng: tập trung hỗ trợ người lớn tự kỷ (Level 1) — những người mà chứng tự kỷ, thường “vô hình” với người ngoài, lại đang phải đối mặt với những rào cản lớn trong phỏng vấn và nơi làm việc. Chúng tôi nhận thấy đây là một không gian bị bỏ ngỏ, mong manh vì thiếu niềm tin, và biết rằng đây chính là nơi chúng tôi có thể tạo ra sự khác biệt.",
      },
      placeholderKey: "BOOTCAMP" as PlaceholderKey,
    },
    {
      id: "0814-0815",
      date: {
        [Language.EN]: "14–15 August – Meeting with Ms. Thanh Thuý",
        [Language.VN]: "14–15/8 – Gặp gỡ Thanh Thuý",
      },
      body: {
        [Language.EN]:
          "We had the privilege of speaking with Ms. Thanh Thuý, an autistic social worker from Đà Nẵng. She opened up about her personal struggles — from daily communication hurdles to the anxiety of navigating workplaces. Listening to her was eye-opening. Her story shifted our project from being just an abstract idea to something deeply human. It gave us urgency and responsibility to design with care.",
        [Language.VN]:
          "Chúng tôi đã có vinh dự được trò chuyện với cô Thanh Thuý, một nhân viên xã hội tự kỷ đến từ Đà Nẵng. Cô đã chia sẻ những khó khăn cá nhân của mình — từ những rào cản trong giao tiếp hàng ngày đến nỗi lo âu khi hòa nhập nơi làm việc. Lắng nghe câu chuyện của cô thật sự mở ra nhiều góc nhìn mới cho chúng tôi. Câu chuyện ấy đã giúp chúng tôi nhận ra được trách nhiệm cũng như sự cấp bách cho những giải pháp thiết thực, đặt con người làm trung tâm, giúp người tự kỷ tự tin bước vào môi trường làm việc và được xã hội nhìn nhận đúng năng lực của họ.",
      },
      placeholderKey: "MEETING_THUY" as PlaceholderKey,
    },
    {
      id: "0816-0819",
      date: {
        [Language.EN]: "16–19 August – Brainstorming & Refinement Days",
        [Language.VN]: "16–19/8 – Lên Ý Tưởng & Tinh Chỉnh",
      },
      body: {
        [Language.EN]:
          "Many heated debates later with many different ideas, reshaping others, we kept coming back to one recurring problem: the “trust gap” within the autistic jobseeker, parents, employers and the society. With every pivot, the picture became clearer. We learned that innovation isn’t linear — it’s messy, frustrating, and full of backtracking. Yet persistence carried us forward, each refinement bringing us closer to the heart of the problem we wanted to solve.",
        [Language.VN]:
          "Sau nhiều cuộc tranh luận, với vô số ý tưởng được đưa ra, chỉnh sửa, chúng tôi luôn quay lại với một vấn đề lặp đi lặp lại là khoảng cách niềm tin giữa người tự kỷ tìm việc, cha mẹ, nhà tuyển dụng và xã hội. Mỗi lần điều chỉnh hướng đi, bức tranh tổng thể lại trở nên rõ ràng hơn. Chúng tôi nhận ra rằng đổi mới không phải là một con đường thẳng — nó lộn xộn, khó khăn và đầy những bước lùi. Nhưng chính sự kiên trì đã đưa chúng tôi tiến lên, với mỗi lần tinh chỉnh, chúng tôi lại tiến gần hơn tới trọng tâm của vấn đề mà chúng tôi khao khát giải quyết.",
      },
      placeholderKey: "IDEA_REFINEMENT" as PlaceholderKey,
    },
    {
      id: "0820",
      date: {
        [Language.EN]: "20 August – Workshop with Ms. Sandy",
        [Language.VN]: "20/8 – Workshop với cô Sandy",
      },
      body: {
        [Language.EN]:
          "That evening we joined an accessibility workshop led by Ms. Sandy. The session stretched until 10pm, but none of us wanted to leave. Sandy’s passion, depth of knowledge, and genuine care reminded us that accessibility is not an afterthought or a checkbox. It is the mindset — one that shapes how we design, how we speak, and how we include. We walked away inspired and determined to carry that principle into every part of our project.",
        [Language.VN]:
          "Tối hôm đó, chúng tôi tham gia một buổi workshop về khả năng tiếp cận do cô Sandy dẫn dắt. Buổi học kéo dài đến tận 10 giờ tối, nhưng không ai trong chúng tôi muốn rời đi. Niềm đam mê, kiến thức sâu rộng và sự quan tâm chân thành của cô Sandy nhắc nhở chúng tôi rằng khả năng tiếp cận không phải là thứ được nghĩ đến sau cùng hay đánh dấu cho xong. Nó là một tư duy — một tư duy định hình cách chúng tôi thiết kế, cách chúng tôi giao tiếp và cách chúng tôi bao gồm mọi người. Chúng tôi rời buổi học với cảm hứng tràn đầy và quyết tâm áp dụng nguyên tắc này vào mọi khía cạnh của dự án.",
      },
      placeholderKey: "SANDY_WORKSHOP" as PlaceholderKey,
    },
    {
      id: "0823",
      date: {
        [Language.EN]: "19 August – Meeting with Mr. Trung (Vietnam Autism Project)",
        [Language.VN]: "19/8 – Chia sẻ của anh Trung (Dự án Tự kỷ Việt Nam)",
      },
      body: {
        [Language.EN]:
          "We knew we needed grounded insights, so we reached out to Mr. Trung, founder of the Vietnam Autism Project. With more than a decade of experience, he confirmed our biggest suspicion: the core barrier is trust. Parents often don’t trust society to care for their children. Employers don’t trust autistic candidates to perform. And autistic adults, after repeated rejection, lose trust in themselves. Hearing this was both sobering and clarifying. It reshaped our proposal and pushed us to design a solution that would rebuild trust across all sides.",
        [Language.VN]:
          "Chúng tôi biết mình cần những thông tin thực tế và sâu sắc, nên đã liên hệ với anh Trung, người sáng lập Dự án Autism Việt Nam. Với hơn một thập kỷ kinh nghiệm, anh đã xác nhận nghi ngờ lớn nhất của chúng tôi: rào cản cốt lõi là niềm tin. Các bậc phụ huynh thường không tin rằng xã hội có thể chăm sóc tốt cho con mình. Các nhà tuyển dụng không tin rằng ứng viên tự kỷ có thể hoàn thành công việc. Và chính những người trưởng thành tự kỷ, sau nhiều lần bị từ chối, dần mất niềm tin vào bản thân. Nghe những chia sẻ này đã định hình lại đề xuất của chúng tôi và thôi thúc chúng tôi thiết kế một giải pháp có thể xây dựng lại niềm tin trên tất cả các phía.",
      },
      placeholderKey: "TRUNG_MEETING" as PlaceholderKey,
    },
    {
      id: "0826",
      date: {
        [Language.EN]: "21 August – Feedback with Troy & Sandy",
        [Language.VN]: "21/8 – Phản hồi cùng Troy & Sandy",
      },
      body: {
        [Language.EN]:
          "We presented our refined idea and walked mentors Troy and Sandy through our timeline. Their feedback was direct and challenging, pointing out weak spots we hadn’t noticed. Yet those hard questions gave us clarity. They forced us to defend our choices, rethink others, and come out sharper than before. By the end of the session, our idea felt stronger, our team more aligned, and our confidence renewed.",
        [Language.VN]:
          "Chúng tôi đã trình bày ý tưởng được tinh chỉnh và hướng dẫn các cố vấn Troy và Sandy qua tiến trình dự án của mình. Phản hồi của họ thẳng thắn và đầy thử thách, chỉ ra những điểm yếu mà chúng tôi chưa nhận ra. Tuy nhiên, những câu hỏi khó đó lại mang đến cho chúng tôi sự rõ ràng. Chúng giúp chúng tôi xem xét lại những quyết định và trau chuốt ý tưởng trở nên sắc bén hơn trước. Kết thúc buổi làm việc, ý tưởng của chúng tôi trở nên vững chắc hơn, cả nhóm đồng thuận hơn, và sự tự tin được hồi sinh.",
      },
      placeholderKey: "FEEDBACK" as PlaceholderKey,
    },
    {
      id: "0827-0831",
      date: {
        [Language.EN]: "22–24 August – Proposal Refinement Week",
        [Language.VN]: "22–24/8 – Tuần tinh chỉnh đề xuất",
      },
      body: {
        [Language.EN]:
          "This was the week of endless edits. We sat for hours polishing every sentence of our proposal, making sure it reflected the insights about trust that we had gained. It was tiring, but we learned something unexpected: writing is also a form of designing. Each word shaped how others would see our project, and each revision made our vision clearer.",
        [Language.VN]:
          "Đây là tuần của những lần chỉnh sửa không ngừng. Chúng tôi ngồi hàng giờ để mài giũa từng câu trong đề xuất, đảm bảo rằng nó phản ánh đúng những hiểu biết về sự tin tưởng mà chúng tôi đã rút ra. Dù mệt mỏi, nhưng chúng tôi học được một điều bất ngờ: viết cũng là một hình thức thiết kế. Mỗi từ ngữ định hình cách người khác nhìn nhận dự án của chúng tôi, và mỗi lần chỉnh sửa khiến tầm nhìn của chúng tôi trở nên rõ ràng hơn.",
      },
      placeholderKey: "PROPOSAL" as PlaceholderKey,
    },
    {
      id: "0904",
      date: {
        [Language.EN]: "4 September – Meeting with Ms. Kristen (Imago Work, Hanoi)",
        [Language.VN]: "4/9 – Gặp cô Kristen (Imago Work, Hà Nội)",
      },
      body: {
        [Language.EN]:
          "Kristen brought a new dimension to our thinking. With her years of experience in vocational training for youth with intellectual disabilities, she made us confront a question we hadn’t asked: Are employers ready? She reminded us that inclusive hiring isn’t just about preparing candidates — it’s about preparing recruiters, too. From this, the idea for our “Question Cleaner” feature was born.",
        [Language.VN]:
          "Kristen đã mang đến một góc nhìn mới cho cách suy nghĩ của chúng tôi. Với nhiều năm kinh nghiệm trong đào tạo nghề cho thanh thiếu niên khuyết tật trí tuệ, cô ấy khiến chúng tôi phải đối mặt với một câu hỏi mà trước đây chưa từng nghĩ đến: Liệu các nhà tuyển dụng đã sẵn sàng chưa? Cô nhắc nhở chúng tôi rằng tuyển dụng hòa nhập không chỉ là chuẩn bị cho ứng viên mà còn là chuẩn bị cho cả những người tuyển dụng. Từ đó, ý tưởng về tính năng “Question Cleaner” của chúng tôi đã ra đời.",
      },
      placeholderKey: "KRISTEN" as PlaceholderKey,
    },
    {
      id: "0905-0910",
      date: {
        [Language.EN]: "5–10 September – Coding, Refinement & Long Nights",
        [Language.VN]: "5–10/9 – Code, tinh chỉnh & những đêm dài",
      },
      body: {
        [Language.EN]:
          "This was when our vision started to turn into something real. We coded narration systems, tested the STAR interview modules, and integrated calm-mode features. It wasn’t smooth — bugs piled up, prototypes failed, and we restarted more times than we could count. But every small victory — a working button, a functioning feedback loop — felt like fuel. These long nights reminded us that building inclusion requires both technical skill and emotional patience.",
        [Language.VN]:
          "Đây là lúc tầm nhìn của chúng tôi bắt đầu trở thành hiện thực. Chúng tôi lập trình hệ thống dẫn chuyện, thử nghiệm các mô-đun phỏng vấn STAR và tích hợp tính năng chế độ bình tĩnh. Quá trình không hề suôn sẻ — lỗi phần mềm chồng chất, các prototype thất bại, và chúng tôi phải bắt đầu lại nhiều lần hơn chúng tôi có thể nhớ. Nhưng mỗi chiến thắng nhỏ — một nút bấm hoạt động, một vòng phản hồi vận hành trơn tru — đều như tiếp thêm năng lượng. Những đêm dài ấy nhắc nhở chúng tôi rằng xây dựng sự hòa nhập đòi hỏi vừa kỹ năng kỹ thuật vừa sự kiên nhẫn và cảm xúc.",
      },
      placeholderKey: "CODING" as PlaceholderKey,
    },
    {
      id: "0911",
      date: {
        [Language.EN]: "11 September – Meeting with Ms. Simona Bossoni",
        [Language.VN]: "11/9 – Gặp cô Simona Bossoni",
      },
      body: {
        [Language.EN]:
          "Meeting Simona was a breakthrough. As Head of the Child Development Department in Ho Chi Minh City, her validation meant more than we can describe. She not only praised our app but also asked if she could use it in her clinic. That request was both humbling and empowering. For the first time, we felt our project wasn’t just theoretical — it had real-world potential to help real people.",
        [Language.VN]:
          "Cuộc gặp gỡ với cô Simona thực sự là một bước đột phá. Với vai trò Trưởng phòng Phát triển Trẻ em tại TP. Hồ Chí Minh, sự công nhận của cô mang ý nghĩa hơn cả những gì chúng tôi có thể diễn tả. Cô không chỉ khen ngợi ứng dụng của chúng tôi mà còn hỏi liệu có thể sử dụng nó tại trung tâm, trường học của mình hay không. Yêu cầu đó vừa khiêm nhường vừa tiếp thêm sức mạnh cho chúng tôi. Lần đầu tiên, chúng tôi cảm thấy dự án của mình không còn chỉ là lý thuyết — nó có tiềm năng thực sự để giúp đỡ những con người thực.",
      },
      placeholderKey: "SIMONA" as PlaceholderKey,
    },
    {
      id: "0912-troy",
      date: {
        [Language.EN]: "12 September – Meeting with Troy",
        [Language.VN]: "12/9 – Gặp Troy",
      },
      body: {
        [Language.EN]:
          "We had another chance to speak with Troy, who brought his expertise in AI-powered automation. He pushed us to think not only about what features to build, but how to build them sustainably, with scale in mind. His advice reminded us that inclusion must also be practical and resilient if it is to last.",
        [Language.VN]:
          "Chúng tôi lại có cơ hội trò chuyện với anh Troy, người mang đến cho chúng tôi kiến thức chuyên sâu về tự động hóa dựa trên AI. Anh đã thúc giục chúng tôi không chỉ nghĩ về những tính năng cần xây dựng, mà còn về cách xây dựng chúng một cách bền vững, có khả năng mở rộng. Những lời khuyên của anh nhắc nhở chúng tôi rằng sự bao gồm không chỉ cần ý nghĩa mà còn phải thực tế và vững bền nếu muốn tồn tại lâu dài.",
      },
      placeholderKey: "TROY" as PlaceholderKey,
    },
    {
      id: "0912-0914",
      date: {
        [Language.EN]: "12–14 September – Final Sprint Before Round 2 Submission",
        [Language.VN]: "12–14/9 – Nước rút trước vòng 2",
      },
      body: {
        [Language.EN]:
          "The final sprint was a blur of coffee cups, late-night edits, and countless shared Google Docs. We refined visuals, polished captions, and made sure our materials were accessible. It was exhausting — yet also deeply rewarding. By the time we hit “submit,” we realized this wasn’t just a competition entry. It was our story of growth, told through struggle, persistence, and community support.",
        [Language.VN]:
          "Giai đoạn nước rút cuối cùng trôi qua trong cà phê, những đêm dài chỉnh sửa và vô số tài liệu Google Docs được chia sẻ. Chúng tôi tinh chỉnh hình ảnh, hoàn thiện chú thích và đảm bảo mọi tài liệu đều thân thiện với người dùng. Mệt mỏi thật đấy — nhưng đồng thời cũng vô cùng đáng giá. Khi nhấn “gửi bài,” chúng tôi nhận ra rằng đây không chỉ là một bài dự thi. Đây là câu chuyện về sự trưởng thành của chúng tôi, được kể qua những khó khăn, sự kiên trì và sự ủng hộ từ cộng đồng.",
      },
      placeholderKey: "FINAL_SPRINT" as PlaceholderKey,
    },
  ],

  reflections: {
    [Language.EN]:
      "We started scattered, confused, and overwhelmed.\nAlong the way, mentors, parents, and autistic adults shaped our vision.\nWe learned resilience, empathy, and how to design with people, not just for them.\nThe hardest challenges became our most meaningful lessons.",
    [Language.VN]:
      "Chúng tôi khởi đầu bối rối và choáng ngợp.\nXuyên suốt hành trình, mentor, phụ huynh và các bạn đã định hình tầm nhìn.\nChúng tôi học được sự bền bỉ, thấu cảm và cách thiết kế cùng cộng đồng, không chỉ cho cộng đồng.\nNhững thử thách khó nhất trở thành bài học ý nghĩa nhất.",
  },

  appreciation: {
    [Language.EN]: [
      "Sandy Sinn – Founder of CPPWB and Suicide Prevention Educator, whose passion for accessibility reminded us that inclusion is not a checkbox but a mindset. Her late-night workshops lit the spark that kept us moving forward.",
      "Troy Yeo – Founder & COO driving AI-powered automation for SMB and Enterprises, who pushed us to think about scale, sustainability, and long-term impact. His direct feedback sharpened our strategy and strengthened our resolve.",
      "Hieu Phung – His valuable guidance and insights during our mentor sessions, helping us refine our direction with clarity and purpose.",
      "Ngoc Quach – A psychologist practicing since 2017, she specializes in supporting autistic teenagers, older individuals, and their families. Her work focuses on communication, emotional regulation, social skills, and family dynamics. She is dedicated to empowering families, strengthening connections,and encouraging self-advocacy as young people transition into adulthood.",
      "Kristen Lewis – Accessibility Mentor and Employment Inclusion Specialist at Imago Work in Hanoi, with six years of experience in vocational training for young adults with intellectual disabilities. Her expertise shaped our employer-focused features and reminded us to design for readiness on both sides of the hiring process.",
      "Thanh Thuý – An autistic social worker from Đà Nẵng, who shared her lived experiences with openness and generosity. Her stories grounded our project in reality and gave us the courage to tackle invisible barriers.",
      "Mr. Trung – Founder of the Vietnam Autism Project, whose decade of experience confirmed the “trust gap” as the heart of the problem. His insights became the backbone of our proposal.",
      "Ms. Simona Bossoni – Head of the Child Development Department in Ho Chi Minh City, lecturer at the National College of Education, and consultant for many special schools and kindergartens. Her validation of our prototype and interest in using it in her clinic gave us the confidence that our idea could live beyond paper.",
    ],
    [Language.VN]: [
      "Sandy Sinn – Nhà sáng lập CPPWB và nhà giáo dục phòng ngừa tự tử, người đã nhắc chúng tôi rằng sự hòa nhập không chỉ là một mục cần đánh dấu mà là một cách suy nghĩ. Những buổi workshop của cô đã thắp lửa cho hành trình của chúng tôi.",
      "Troy Yeo – Nhà sáng lập & COO về tự động hoá AI cho SME và doanh nghiệp, người đã thúc đẩy chúng tôi suy nghĩ về khả năng mở rộng, tính bền vững và tác động lâu dài. Những phản hồi thẳng thắn của anh đã giúp chúng tôi tinh chỉnh chiến lược và củng cố quyết tâm thực hiện dự án.",
      "Hiếu Phùng – Những hướng dẫn và góc nhìn quý giá của anh trong các buổi cố vấn đã giúp chúng tôi định hình hướng đi một cách rõ ràng và có mục đích.",
      "Ngọc Quách – Là một nhà tâm lý học hành nghề từ năm 2017, cô chuyên hỗ trợ thanh thiếu niên tự kỷ, người lớn tuổi và gia đình của họ. Công việc của cô tập trung vào giao tiếp, điều hòa cảm xúc, kỹ năng xã hội và động lực gia đình. Cô tận tâm trao quyền cho các gia đình, củng cố kết nối và khuyến khích sự tự vận động khi những người trẻ tuổi bước vào tuổi trưởng thành.",
      "Kristen Lewis – Người cố vấn về tiếp cận và chuyên gia hòa nhập việc làm tại Imago Work ở Hà Nội, với sáu năm kinh nghiệm đào tạo nghề cho thanh niên mắc khuyết tật trí tuệ. Kiến thức chuyên môn của cô đã định hình các tính năng hướng tới nhà tuyển dụng trong dự án của chúng tôi và nhắc nhở chúng tôi rằng cần thiết kế để cả hai bên – ứng viên và nhà tuyển dụng – đều sẵn sàng cho quá trình tuyển dụng.",
      "Thanh Thuý – Một nhân viên xã hội tự kỷ đến từ Đà Nẵng, người đã cởi mở và chân thành chia sẻ những trải nghiệm sống của mình. Những câu chuyện của cô đã giúp dự án của chúng tôi gắn liền với thực tế và tiếp thêm cho chúng tôi can đảm để đối mặt với những rào cản vô hình.",
      "Anh Trung – Sáng lập Dự án Tự kỷ Việt Nam, với kinh nghiệm hơn 10 năm, xác nhận “khoảng cách niềm tin” là cốt lõi vấn đề. Nhận định này trở thành xương sống cho đề xuất của chúng tôi.",
      "Cô Simona Bossoni – Trưởng phòng Phát triển Trẻ em tại TP. Hồ Chí Minh, giảng viên tại Trường Cao đẳng Sư phạm Quốc gia, đồng thời là cố vấn cho nhiều trường đặc biệt và mầm non. Việc cô đánh giá cao nguyên mẫu của chúng tôi và bày tỏ mong muốn sử dụng nó tại phòng khám đã tiếp thêm cho chúng tôi sự tự tin rằng ý tưởng của mình có thể hiện thực hóa ngoài lý thuyết.",
    ],
  },

  // (Optional) Legacy captions-only list kept for backward compatibility.
  gallery: {
    [Language.EN]: [
      "Bootcamp Highlights",
      "Mentor Workshops",
      "Proposal Refinement Nights",
      "Prototype Screenshots",
      "Filming The Video",
    ],
    [Language.VN]: [
      "Điểm nhấn từ Bootcamp",
      "Workshop cùng Mentor",
      "Những đêm chỉnh sửa đề xuất",
      "Ảnh chụp sản phẩm mẫu",
      "Quay video",
    ],
  },

  // NEW: Per-item gallery (uses filenames that match /src/assets/videos/OurStory and images/OurStory)
  galleryItems: [
    {
      type: "video",
      file: "bootcamp1.mov",
      caption: {
        [Language.EN]: "Bootcamp Highlights",
        [Language.VN]: "Điểm nhấn Bootcamp",
      },
    },
    {
      type: "image",
      file: "workshop.png",
      caption: {
        [Language.EN]: "Mentor Workshop with Sandy",
        [Language.VN]: "Workshop cùng cô Sandy",
      },
    },
    {
      type: "video",
      file: "proposal.MOV", // ✅ case per repo
      caption: {
        [Language.EN]: "Proposal Refinement Nights",
        [Language.VN]: "Những đêm chỉnh sửa đề xuất",
      },
    },
    {
      type: "image",
      file: "prototype.png",
      caption: {
        [Language.EN]: "Prototype Screens",
        [Language.VN]: "Ảnh chụp prototype",
      },
    },
    {
      type: "video",
      file: "filming.MOV", // ✅ case per repo
      caption: {
        [Language.EN]: "Filming The Video",
        [Language.VN]: "Quay video",
      },
    },
    {
      type: "video",
      file: "late.MOV", // ✅ case per repo
      caption: {
        [Language.EN]: "Late-night Debugging",
        [Language.VN]: "Sửa lỗi đêm muộn",
      },
    },
  ],
};
