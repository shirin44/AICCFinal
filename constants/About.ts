import { Narrator, NarratorRole, Language, Story, StoryEntry , PlaceholderKey, AboutSchema } from '@/types';






export const ABOUT_PAGE_CONTENT = {
  heroTitle: {
    [Language.EN]: "Breaking the Barrier of Trust for Autistic Employment in Vietnam",
    [Language.VN]: "Phá Vỡ Niềm Tin hạn chế đối với Người Tự Kỷ đi làm tại Việt Nam",
  },
  heroSubtitle: {
    [Language.EN]: "Together, we’re building practical, inclusive tools that move Vietnam beyond awareness and into action.",
    [Language.VN]: "Chúng tôi cùng nhau xây dựng những công cụ thực tế, toàn diện để nâng cao nhận thức và bước vào hành động tại Việt Nam.",
  },
  sections: {
    ourStory: {
      title: { [Language.EN]: "Our Story – Why We Started", [Language.VN]: "Câu Chuyện – Vì Sao Chúng Tôi Bắt Đầu" },
      p1:   { [Language.EN]: "Vietnam has about 6.2 million people with disabilities, ...", [Language.VN]: "Việt Nam có khoảng 6,2 triệu người khuyết tật, ..." },
      p2:   { [Language.EN]: "We began by listening and mapping real barriers ...",       [Language.VN]: "Chúng tôi bắt đầu bằng việc lắng nghe và xác định những rào cản ..." },
      p3:   { [Language.EN]: "Those insights pushed us toward practical tools ...",         [Language.VN]: "Những hiểu biết đó dẫn chúng tôi tới các công cụ thực tiễn ..." },
      list: {
        [Language.EN]: [
          "Barrier mapping across stakeholders",
          "Interview practice flows that reduce anxiety",
          "Actionable employer guidance"
        ],
        [Language.VN]: [
          "Xác định rào cản theo bên liên quan",
          "Luồng luyện phỏng vấn giảm lo âu",
          "Hướng dẫn hành động cho nhà tuyển dụng"
        ],
      },
    },
    foundingTeam: {
      title: { [Language.EN]: "Who We Are – The Founding Team", [Language.VN]: "Chúng Tôi Là Ai – Nhóm Sáng Lập" },
      intro: { [Language.EN]: "We are the Powerpuff Girls Team, a group of young innovators ...", [Language.VN]: "Chúng tôi là Powerpuff Girls, nhóm sinh viên trẻ ..." },
    },
    evolution: {
      title: { [Language.EN]: "Our Evolution – Where We Are Today", [Language.VN]: "Hành Trình – Chúng tôi hiện đang ở đâu?" },
      intro: { [Language.EN]: "At first, we struggled with the contradiction...", [Language.VN]: "Ban đầu chúng tôi gặp khó khăn với mâu thuẫn ..." },
      points: {
        [Language.EN]: ["Prototype → Feedback → Iteration", "Shift from awareness to action", "Employer co-design sessions"],
        [Language.VN]: ["Bản mẫu → Phản hồi → Lặp lại quy trình", "Chuyển từ nhận thức sang hành động", "Đồng thiết kế với nhà tuyển dụng"],
      },
      outro: { [Language.EN]: "We now focus on measurable hiring outcomes.", [Language.VN]: "Hiện chúng tôi tập trung vào kết quả tuyển dụng có thể đo lường được." },
    },
    missionVision: {
      title: { [Language.EN]: "Mission & Vision", [Language.VN]: "Sứ mệnh & Tầm nhìn" },
    },
    mission: { [Language.EN]: "Mission", [Language.VN]: "Sứ mệnh" },
    missionText: {
      [Language.EN]: "Build inclusive, practical interview and workplace tools that work in Vietnam’s context.",
      [Language.VN]: "Xây dựng công cụ phỏng vấn và nơi làm việc bao trùm, thực tiễn, phù hợp bối cảnh Việt Nam.",
    },
    vision: { [Language.EN]: "Vision", [Language.VN]: "Tầm nhìn" },
    visionText: {
      [Language.EN]: "A hiring ecosystem where neurodivergent talent is trusted and supported.",
      [Language.VN]: "Một hệ sinh thái tuyển dụng nơi mọi người đều được tin tưởng và hỗ trợ.",
    },
    acknowledgements: {
      title: { [Language.EN]: "Acknowledgements – With Gratitude", [Language.VN]: "Tri Ân – Lời Cảm Ơn" },
      text:  { [Language.EN]: "We’re grateful to mentors, educators, and partners who guided us.", [Language.VN]: "Chúng tôi biết ơn các cố vấn, nhà giáo và đối tác đã đồng hành." },
    },
    research: {
      title: { [Language.EN]: "Research & Q&A", [Language.VN]: "Nghiên Cứu & Hỏi Đáp" },
      text:  { [Language.EN]: "Key takeaways from literature and field interviews.", [Language.VN]: "Tóm tắt từ tài liệu và phỏng vấn thực tế." },
    },
    developers: {
      title: { [Language.EN]: "Developers & Contacts", [Language.VN]: "Nhà Phát Triển & Liên Hệ" },
      lines: {
        [Language.EN]: [
          "Shirin Shujaa – AI/ML & Frontend – shirin44.github.io",
          "Nghi Trinh – UX & Design",
          "Thao Trinh – Mobile & Full-stack"
        ],
        [Language.VN]: [
          "Shirin Shujaa – AI/ML & Frontend – shirin44.github.io",
          "Nghi Trinh – UX & Thiết kế",
          "Thao Trinh – Mobile & Full-stack"
        ],
      },
    },
  },
} satisfies AboutSchema;