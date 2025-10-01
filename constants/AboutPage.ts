// src/constants/AboutPage.ts
import { Language } from "../types";

export const ABOUT_PAGE_CONTENT = {
  heroTitle: {
    [Language.EN]: "About AICC",
    [Language.VN]: "Về AICC",
  },
  heroSubtitle: {
    [Language.EN]:
      "We build tools that reduce anxiety and build understanding between autistic jobseekers and inclusive employers.",
    [Language.VN]:
      "Chúng tôi xây dựng công cụ giúp giảm lo âu và tăng thấu hiểu giữa ứng viên tự kỷ và các nhà tuyển dụng hòa nhập.",
  },

  sections: {
    ourStory: {
      title: { [Language.EN]: "Our Story", [Language.VN]: "Câu chuyện của chúng tôi" },
      p1: {
        [Language.EN]:
          "AICC started with a simple belief: interviews can be fairer and more supportive for everyone.",
        [Language.VN]:
          "AICC bắt đầu từ một niềm tin đơn giản: phỏng vấn có thể công bằng và hỗ trợ hơn cho tất cả mọi người.",
      },
      p2: {
        [Language.EN]:
          "We collaborate with autistic adults, families, schools, and employers to design evidence-based, person-centered tools.",
        [Language.VN]:
          "Chúng tôi hợp tác với người tự kỷ trưởng thành, gia đình, trường học và doanh nghiệp để thiết kế công cụ dựa trên bằng chứng, lấy con người làm trung tâm.",
      },
      list: {
        [Language.EN]: [
          "Reduce interview anxiety with structured practice",
          "Bridge communication styles between candidates and employers",
          "Support families, mentors, and volunteers with practical guidance",
        ],
        [Language.VN]: [
          "Giảm lo âu phỏng vấn bằng luyện tập có cấu trúc",
          "Kết nối phong cách giao tiếp giữa ứng viên và nhà tuyển dụng",
          "Hỗ trợ gia đình, cố vấn, tình nguyện viên bằng hướng dẫn thực tiễn",
        ],
      },
      p3: {
        [Language.EN]:
          "Together, we make employment more accessible, respectful, and effective.",
        [Language.VN]:
          "Cùng nhau, chúng ta khiến cơ hội việc làm trở nên tiếp cận, tôn trọng và hiệu quả hơn.",
      },
    },

    foundingTeam: {
      title: { [Language.EN]: "Founding Team", [Language.VN]: "Nhóm sáng lập" },
      intro: {
        [Language.EN]:
          "We’re engineers, designers, and community partners focused on inclusive employment.",
        [Language.VN]:
          "Chúng tôi là kỹ sư, nhà thiết kế và đối tác cộng đồng tập trung vào việc làm hòa nhập.",
      },
    },

    evolution: {
      title: { [Language.EN]: "Evolution", [Language.VN]: "Hành trình phát triển" },
      intro: {
        [Language.EN]: "From prototype to pilot, we validate with users at every step.",
        [Language.VN]: "Từ nguyên mẫu đến thí điểm, chúng tôi luôn kiểm chứng cùng người dùng ở mọi bước.",
      },
      points: {
        [Language.EN]: [
          "Early research with autistic adults and employers",
          "Usability testing on real interview scenarios",
          "Iterative product improvements driven by feedback",
        ],
        [Language.VN]: [
          "Nghiên cứu sớm với người tự kỷ và nhà tuyển dụng",
          "Kiểm thử khả dụng trên tình huống phỏng vấn thực tế",
          "Cải tiến sản phẩm lặp lại dựa trên phản hồi",
        ],
      },
      outro: {
        [Language.EN]: "This is a living product — shaped by the community it serves.",
        [Language.VN]: "Đây là sản phẩm sống — được định hình bởi chính cộng đồng mà nó phục vụ.",
      },
    },

    missionVision: {
      title: { [Language.EN]: "Mission & Vision", [Language.VN]: "Sứ mệnh & Tầm nhìn" },
    },

    mission: { [Language.EN]: "Mission", [Language.VN]: "Sứ mệnh" },
    missionText: {
      [Language.EN]:
        "Equip autistic jobseekers and inclusive employers with tools that build confidence, clarity, and trust.",
      [Language.VN]:
        "Trang bị cho ứng viên tự kỷ và nhà tuyển dụng hòa nhập các công cụ giúp tăng tự tin, rõ ràng và tin cậy.",
    },

    vision: { [Language.EN]: "Vision", [Language.VN]: "Tầm nhìn" },
    visionText: {
      [Language.EN]:
        "A world where interviews are equitable and communication differences are embraced.",
      [Language.VN]:
        "Một thế giới nơi phỏng vấn công bằng và khác biệt trong giao tiếp được trân trọng.",
    },

    acknowledgements: {
      title: { [Language.EN]: "Acknowledgements", [Language.VN]: "Tri ân" },
      text: {
        [Language.EN]:
          "We’re grateful to mentors, clinicians, families, and employers who guide our work.",
        [Language.VN]:
          "Chúng tôi biết ơn các cố vấn, chuyên gia, gia đình và doanh nghiệp đã đồng hành và định hướng cho dự án.",
      },
    },

    research: {
      title: { [Language.EN]: "Research & Evidence", [Language.VN]: "Nghiên cứu & Bằng chứng" },
      text: {
        [Language.EN]:
          "Our approach is informed by occupational therapy, inclusive hiring research, and real-world trials.",
        [Language.VN]:
          "Cách tiếp cận của chúng tôi dựa trên liệu pháp nghề nghiệp, nghiên cứu tuyển dụng hòa nhập và thử nghiệm thực tế.",
      },
    },

    developers: {
      title: { [Language.EN]: "Developers", [Language.VN]: "Nhà phát triển" },
      lines: {
        [Language.EN]: [
          "Built with TypeScript, React, and Tailwind",
          "Privacy-first: no unnecessary data retention",
          "Continuous accessibility audits (WCAG-informed)",
        ],
        [Language.VN]: [
          "Xây dựng bằng TypeScript, React và Tailwind",
          "Ưu tiên quyền riêng tư: không lưu trữ dữ liệu không cần thiết",
          "Kiểm tra khả năng tiếp cận liên tục (theo WCAG)",
        ],
      },
    },

    buttons: {
      viewPortfolio: { [Language.EN]: "View Portfolio", [Language.VN]: "Xem Portfolio" },
      linkedIn: { [Language.EN]: "LinkedIn", [Language.VN]: "LinkedIn" },
      resume: { [Language.EN]: "Resume", [Language.VN]: "CV" },
      showMore: { [Language.EN]: "Show more", [Language.VN]: "Xem thêm" },
      showLess: { [Language.EN]: "Show less", [Language.VN]: "Thu gọn" },
      website: { [Language.EN]: "Website", [Language.VN]: "Website" },
    },
  },

  team: [
    {
      name: "Shirin Shujaa",
      avatarSrc: "us/Shirin.JPG",
      portfolioUrl: "https://shirin44.github.io/shirin-portfolio/",
      linkedinUrl: "https://www.linkedin.com/in/shirin-shujaa/",
      resumeUrl:
        "https://drive.google.com/file/d/1zGSoc6gt8VcsbU0sebZXF8FeWdX6RvsQ/view?usp=share_link",
      title: {
        [Language.EN]:
          "Software Engineering student at RMIT Vietnam (AI/ML minor, Intel Capstone Engineer)",
        [Language.VN]:
          "Sinh viên Kỹ thuật Phần mềm tại RMIT Việt Nam (hệ nhỏ AI/ML, Kỹ sư Capstone Intel)",
      },
      bio: {
        [Language.EN]:
          "Shirin Shujaa — Software Engineering student at RMIT Vietnam (AI/ML minor, Intel Capstone Engineer). Passionate about AI for good, I build smart tools and elegant interfaces — blending AI, automation, and clean design into real-world solutions.\n\nI’ve developed automation tools at Intel, built scalable platforms for startups, and crafted AI-powered applications — always with a focus on user-centered design and accessibility. At ADC, I bring this experience to design tech that empowers autistic jobseekers and inclusive employers.",
        [Language.VN]:
          "Shirin Shujaa — Sinh viên Kỹ thuật Phần mềm tại RMIT Việt Nam (hệ nhỏ AI/ML, Kỹ sư Capstone Intel). Đam mê AI vì cộng đồng, tôi xây dựng các công cụ thông minh và giao diện tinh gọn — kết hợp AI, tự động hóa và thiết kế sạch cho các giải pháp thực tế.\n\nTôi từng phát triển công cụ tự động hóa tại Intel, xây nền tảng mở rộng cho startup và xây ứng dụng dùng AI — luôn đặt trọng tâm vào thiết kế hướng người dùng và khả năng tiếp cận. Tại ADC, tôi áp dụng kinh nghiệm này để tạo ra công nghệ trao quyền cho ứng viên tự kỷ và nhà tuyển dụng hòa nhập.",
      },
    },
    {
      name: "Nghi Trinh",
      avatarSrc: "us/steph.JPG",
      portfolioUrl:
        "https://drive.google.com/file/d/1ycbTzHmodeJGU4ryWYq-8wgGgkXB9WY8/view?usp=sharing",
      linkedinUrl: "https://www.linkedin.com/in/nghi-tr%E1%BB%8Bnh-961bab274/",
      title: {
        [Language.EN]:
          "Digital Communication and Multimedia Design student at UEH (Ogilvy Intern, Oxford University Clinical Research Unit Collaborator)",
        [Language.VN]:
          "Sinh viên Truyền thông Số & Thiết kế Đa phương tiện tại UEH (Thực tập sinh Ogilvy, Cộng tác với Đơn vị Nghiên cứu Lâm sàng ĐH Oxford)",
      },
      bio: {
        [Language.EN]:
          "With a great passion for psychology and UX/UI design, I want to use that passion to support people who need it most. By combining my own experience with what the world has to offer, I hope to build bridges that open new opportunities for autistic adults.\n\nFor me, a growing Vietnam means making sure no community is left behind.",
        [Language.VN]:
          "Với niềm đam mê tâm lý học và thiết kế UX/UI, tôi muốn dùng đam mê đó để hỗ trợ những người cần nhất. Kết hợp trải nghiệm cá nhân với nguồn lực xã hội, tôi hy vọng xây những cây cầu mở ra cơ hội mới cho người tự kỷ trưởng thành.\n\nVới tôi, một Việt Nam phát triển là nơi không cộng đồng nào bị bỏ lại phía sau.",
      },
    },
    {
      name: "Thao Trinh",
      avatarSrc: "us/thao.jpg",
      linkedinUrl:
        "https://www.linkedin.com/in/thao-trinh-73ab23172/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      title: {
        [Language.EN]:
          "Software Engineering student at RMIT Vietnam (mobile development, full stack, UI/UX design).",
        [Language.VN]:
          "Sinh viên Kỹ thuật Phần mềm tại RMIT Việt Nam (phát triển di động, full-stack, thiết kế UI/UX).",
      },
      bio: {
        [Language.EN]:
          "I am passionate about building sustainable technology that truly serves people. For me, real impact begins with empathy and understanding, shaping inclusive solutions that uphold and amplify human dignity.\n\nI have developed mobile apps that embody authenticity and originality, with a focus on creating social impact. By putting myself in the users’ shoes, I strive to design experiences that genuinely care for their needs.",
        [Language.VN]:
          "Tôi đam mê xây dựng công nghệ bền vững thật sự phục vụ con người. Với tôi, tác động thật bắt đầu từ sự thấu cảm và thấu hiểu, để tạo nên giải pháp hòa nhập nâng đỡ phẩm giá con người.\n\nTôi đã phát triển các ứng dụng di động đề cao tính chân thật và sáng tạo, tập trung tạo tác động xã hội. Bằng cách đặt mình vào vị trí người dùng, tôi nỗ lực thiết kế trải nghiệm quan tâm chân thành đến nhu cầu của họ.",
      },
    },
  ],

  mentors: [
    {
      name: "Sandy Sinn",
      avatarSrc: " Sandy.jpg",
      role: {
        [Language.EN]: "Founder of CPPWB, Suicide Prevention Educator",
        [Language.VN]: "Nhà sáng lập CPPWB, Nhà giáo dục phòng chống tự tử",
      },
      testimony: {
        [Language.EN]:
          "The team listens deeply and builds with empathy. NeuroPilot is a rare blend of compassion and discipline.",
        [Language.VN]:
          "Nhóm lắng nghe sâu sắc và xây dựng với sự thấu cảm. NeuroPilot là sự kết hợp hiếm có giữa lòng nhân ái và tính kỷ luật.",
      },
    },
    {
      name: "Troy Yeo",
      avatarSrc: " Troy.jpg",
      role: {
        [Language.EN]: "Founder & COO, AI-powered automation for SMB and Enterprises",
        [Language.VN]: "Đồng sáng lập & COO, tự động hóa dùng AI cho SMB và Doanh nghiệp",
      },
      testimony: {
        [Language.EN]:
          "They move fast, validate with users, and focus on outcomes. The shift from awareness to measurable impact is exactly what’s needed.",
        [Language.VN]:
          "Các bạn tiến hành nhanh, kiểm chứng với người dùng và tập trung vào kết quả. Chuyển từ nhận thức sang tác động đo lường được là điều cần thiết.",
      },
    },
    {
      name: "Hieu Phung",
      avatarSrc: "Hieu.jpg",
      role: {
        [Language.EN]: "Mentor / Advisor",
        [Language.VN]: "Cố vấn",
      },
      testimony: {
        [Language.EN]:
          "Practical solutions, clear roadmaps, and steady follow-through—this is how real change begins.",
        [Language.VN]:
          "Giải pháp thực tế, lộ trình rõ ràng và sự theo sát bền bỉ—đây là cách thay đổi thật sự bắt đầu.",
      },
    },
    {
      name: "Ngọc Quách",
      avatarSrc: "NgocQuach.jpg",
      role: {
        [Language.EN]:
          "Psychologist since 2017, supporting autistic teenagers and families in communication, emotional regulation, and self-advocacy",
        [Language.VN]:
          "Nhà tâm lý từ 2017, hỗ trợ thanh thiếu niên tự kỷ và gia đình về giao tiếp, điều tiết cảm xúc và tự vận động",
      },
      testimony: {
        [Language.EN]:
          "This app gives autistic teenagers a safe way to practice and grow confident for real interviews.",
        [Language.VN]:
          "Ứng dụng này mang đến cho thanh thiếu niên tự kỷ một cách an toàn để luyện tập và tự tin hơn trong phỏng vấn thực tế.",
      },
    },
    {
      name: "Kristen Lewis",
      avatarSrc: "Kristen.jpg",
      role: {
        [Language.EN]:
          "Accessibility Mentor, Employment Inclusion Specialist at Imago Work (Hanoi); 6 years in vocational training for young adults with intellectual disabilities",
        [Language.VN]:
          "Cố vấn Khả năng tiếp cận, Chuyên viên Hòa nhập việc làm tại Imago Work (Hà Nội); 6 năm đào tạo nghề cho thanh niên khuyết tật trí tuệ",
      },
      testimony: {
        [Language.EN]:
          "Employer guidance is practical and sensitive to local context—exactly what’s been missing until now.",
        [Language.VN]:
          "Hướng dẫn cho nhà tuyển dụng vừa thực tế vừa phù hợp bối cảnh địa phương—đúng thứ còn thiếu bấy lâu.",
      },
    },
    {
      name: "Thanh Thuý",
      avatarSrc: "Thuy.jpg",
      role: {
        [Language.EN]: "Mentor / Community Partner",
        [Language.VN]: "Cố vấn / Đối tác cộng đồng",
      },
      testimony: {
        [Language.EN]:
          "They work hand in hand with families and schools to open real opportunities for young people.",
        [Language.VN]:
          "Các bạn làm việc chặt chẽ với gia đình và nhà trường để mở ra cơ hội thật sự cho các em.",
      },
    },
    {
      name: "Trung VAP",
      avatarSrc: "TrungVAP.jpg",
      role: {
        [Language.EN]: "Mentor / Industry Partner",
        [Language.VN]: "Cố vấn / Đối tác doanh nghiệp",
      },
      testimony: {
        [Language.EN]:
          "Strong technical execution with sharp attention to usability—very impressive work.",
        [Language.VN]:
          "Thực hành kỹ thuật vững vàng với sự chú trọng cao đến khả năng sử dụng—rất ấn tượng.",
      },
    },
    {
      name: "Simona Bossoni",
      avatarSrc: "simona.png",
      role: {
        [Language.EN]:
          "Head of Child Development Department (HCMC hospital); Lecturer at National College of Education; Consultant for special schools and kindergartens",
        [Language.VN]:
          "Trưởng khoa Phát triển Trẻ em (BV TP.HCM); Giảng viên Cao đẳng Sư phạm; Cố vấn cho trường chuyên biệt và mầm non",
      },
      testimony: {
        [Language.EN]:
          "Their methods are developmentally appropriate and firmly grounded in real-world evidence.",
        [Language.VN]:
          "Cách tiếp cận của họ phù hợp với sự phát triển và dựa chắc chắn trên bằng chứng thực tế.",
      },
    },
  ],
} as const;
