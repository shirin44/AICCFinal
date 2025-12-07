import { Narrator, NarratorRole, Language, Story, StoryEntry, PlaceholderKey, AboutSchema } from '@/types';
import { LOCALIZED_CONTENT } from '@/constants';

export const PARENT_CONTENT = {
  /* ------------------------------ High-level modules ------------------------------ */
  modules: [
    {
      id: 'module1',
      title: LOCALIZED_CONTENT.module1Title,
      time: { [Language.EN]: '2 min read', [Language.VN]: '2 phút đọc' },
    },
    {
      id: 'module2',
      title: LOCALIZED_CONTENT.module2Title,
      time: { [Language.EN]: '3 min practice', [Language.VN]: '3 phút thực hành' },
    },
    {
      id: 'module3',
      title: LOCALIZED_CONTENT.module3Title,
      time: { [Language.EN]: '3 min toolkit', [Language.VN]: '3 phút công cụ' },
    },
    {
      id: 'module4',
      title: LOCALIZED_CONTENT.module4Title,
      time: { [Language.EN]: '2 min read', [Language.VN]: '2 phút đọc' },
    },
  ],

  /* ------------------------- Extra module descriptions (optional) ------------------------- */
  moduleDetails: {
    module1: {
      heading: {
        [Language.EN]: 'Understanding autistic communication',
        [Language.VN]: 'Hiểu cách giao tiếp của người tự kỷ',
      },
      subtitle: {
        [Language.EN]: 'Why interviews feel so different for your child.',
        [Language.VN]: 'Vì sao phỏng vấn lại khác với con bạn như vậy.',
      },
      bullets: [
        {
          id: 'm1-b1',
          text: {
            [Language.EN]:
              'Interviews often reward fast talking and eye contact – things that can be draining for autistic people.',
            [Language.VN]:
              'Phỏng vấn thường đánh giá cao nói nhanh và nhìn thẳng – những điều có thể rất mệt với người tự kỷ.',
          },
        },
        {
          id: 'm1-b2',
          text: {
            [Language.EN]:
              'Your child may think slowly and deeply. Silence can mean “thinking”, not “stuck”.',
            [Language.VN]:
              'Con bạn có thể suy nghĩ chậm nhưng sâu. Sự im lặng thường là “đang suy nghĩ”, không phải “bí”.',
          },
        },
        {
          id: 'm1-b3',
          text: {
            [Language.EN]:
              'Different body language (eye contact, stimming, posture) is often self-regulation, not disrespect.',
            [Language.VN]:
              'Ngôn ngữ cơ thể khác (ánh mắt, hành vi tự kích thích, tư thế) thường là cách tự điều chỉnh, không phải vô lễ.',
          },
        },
      ],
      recap: {
        [Language.EN]:
          'Goal: see your child’s interview through their eyes, so you can support, not “fix”, who they are.',
        [Language.VN]:
          'Mục tiêu: nhìn buổi phỏng vấn qua góc nhìn của con, để bạn hỗ trợ chứ không “sửa” con.',
      },
    },
    module2: {
      heading: {
        [Language.EN]: 'Practice together in small steps',
        [Language.VN]: 'Luyện tập cùng con theo từng bước nhỏ',
      },
      subtitle: {
        [Language.EN]: 'Short, predictable routines work better than “big talks”.',
        [Language.VN]: 'Các thói quen ngắn, dễ đoán hiệu quả hơn “buổi nói chuyện lớn”.',
      },
      bullets: [
        {
          id: 'm2-b1',
          text: {
            [Language.EN]:
              'Pick one question per day (for example: “Tell me about a project you finished”).',
            [Language.VN]:
              'Chọn một câu hỏi mỗi ngày (ví dụ: “Kể về một dự án con đã hoàn thành”).',
          },
        },
        {
          id: 'm2-b2',
          text: {
            [Language.EN]:
              'Use a timer (2–3 minutes) so your child knows when the practice will end.',
            [Language.VN]:
              'Dùng đồng hồ bấm giờ (2–3 phút) để con biết khi nào buổi luyện tập kết thúc.',
          },
        },
        {
          id: 'm2-b3',
          text: {
            [Language.EN]:
              'Let them answer in any format first: typing, writing, drawing, or speaking.',
            [Language.VN]:
              'Cho con trả lời bằng bất kỳ hình thức nào trước: gõ, viết, vẽ hoặc nói.',
          },
        },
      ],
      recap: {
        [Language.EN]:
          'Short, regular practice builds more confidence than one long, stressful session.',
        [Language.VN]:
          'Luyện tập ngắn, đều đặn tạo tự tin nhiều hơn là một buổi dài và căng thẳng.',
      },
    },
    module3: {
      heading: {
        [Language.EN]: 'Build a pre-interview routine',
        [Language.VN]: 'Xây dựng nghi thức trước phỏng vấn',
      },
      subtitle: {
        [Language.EN]:
          'A repeatable checklist helps both you and your child feel calmer.',
        [Language.VN]:
          'Checklist có thể lặp lại giúp cả bạn và con bình tĩnh hơn.',
      },
      bullets: [
        {
          id: 'm3-b1',
          text: {
            [Language.EN]:
              'Agree on a simple routine: drink water, quick movement or stretch, one breathing exercise.',
            [Language.VN]:
              'Thống nhất một nghi thức đơn giản: uống nước, vận động/giãn cơ nhanh, một bài thở ngắn.',
          },
        },
        {
          id: 'm3-b2',
          text: {
            [Language.EN]:
              'Prepare “comfort items” if helpful: small fidget, written notes, or a structure card with question types.',
            [Language.VN]:
              'Chuẩn bị “vật an tâm” nếu phù hợp: đồ fidget nhỏ, ghi chú, hoặc thẻ cấu trúc với các loại câu hỏi.',
          },
        },
        {
          id: 'm3-b3',
          text: {
            [Language.EN]:
              'Decide in advance who speaks during introductions and how to ask for breaks.',
            [Language.VN]:
              'Quyết định trước ai sẽ nói trong phần giới thiệu và cách xin nghỉ giải lao.',
          },
        },
      ],
      recap: {
        [Language.EN]:
          'Familiar routines lower anxiety. Your child can focus on the questions, not on “what happens next?”.',
        [Language.VN]:
          'Nghi thức quen thuộc giúp giảm lo âu. Con có thể tập trung vào câu hỏi, không phải “chuyện gì xảy ra tiếp theo?”.',
      },
    },
    module4: {
      heading: {
        [Language.EN]: 'Advocating with and for your child',
        [Language.VN]: 'Đồng hành và lên tiếng cùng con',
      },
      subtitle: {
        [Language.EN]:
          'Support can be gentle and practical – not confrontational.',
        [Language.VN]:
          'Sự hỗ trợ có thể nhẹ nhàng và thực tế – không nhất thiết phải đối đầu.',
      },
      bullets: [
        {
          id: 'm4-b1',
          text: {
            [Language.EN]:
              'Help your child write a short “support note” about what helps them do their best.',
            [Language.VN]:
              'Giúp con viết một “tờ ghi chú hỗ trợ” về những điều giúp con thể hiện tốt nhất.',
          },
        },
        {
          id: 'm4-b2',
          text: {
            [Language.EN]:
              'Ask employers about accommodations in a neutral way (extra time, written questions, quiet space).',
            [Language.VN]:
              'Hỏi nhà tuyển dụng về hỗ trợ hợp lý một cách trung lập (thêm thời gian, câu hỏi bằng văn bản, không gian yên tĩnh).',
          },
        },
        {
          id: 'm4-b3',
          text: {
            [Language.EN]:
              'After each interview, debrief gently: “What felt okay?” and “What was hard?”.',
            [Language.VN]:
              'Sau mỗi buổi phỏng vấn, trao đổi nhẹ nhàng: “Điều gì ổn?” và “Điều gì khó?”.',
          },
        },
      ],
      recap: {
        [Language.EN]:
          'The goal is not a “perfect” interview – it is a safer, more respectful experience for your child.',
        [Language.VN]:
          'Mục tiêu không phải là buổi phỏng vấn “hoàn hảo” mà là trải nghiệm an toàn, tôn trọng hơn cho con.',
      },
    },
  },

  /* -------------------------------------- FAQ -------------------------------------- */
  faqs: [
    {
      q: {
        [Language.EN]: 'What if my child avoids eye contact?',
        [Language.VN]: 'Nếu con tôi tránh giao tiếp bằng mắt thì sao?',
      },
      a: {
        [Language.EN]:
          "It's often a way to focus better on listening. Encourage alternatives like nodding or brief glances. It is not a sign of dishonesty.",
        [Language.VN]:
          'Đó thường là cách để tập trung lắng nghe tốt hơn. Hãy khuyến khích các cách thay thế như gật đầu hoặc liếc nhìn nhanh. Đó không phải là dấu hiệu của sự không trung thực.',
      },
    },
    {
      q: {
        [Language.EN]: 'How to handle "stimming" (self-stimulatory behavior)?',
        [Language.VN]: 'Làm thế nào để xử lý hành vi tự kích thích?',
      },
      a: {
        [Language.EN]:
          "Stimming is a natural way to regulate anxiety. As long as it's not harmful, it's best to allow it. A small, quiet fidget tool can be helpful.",
        [Language.VN]:
          'Hành vi tự kích thích là một cách tự nhiên để điều chỉnh sự lo âu. Miễn là nó không gây hại, tốt nhất là cho phép nó. Một công cụ nhỏ, yên tĩnh có thể hữu ích.',
      },
    },
    {
      q: {
        [Language.EN]: 'Should they disclose their autism?',
        [Language.VN]: 'Con có nên tiết lộ về chứng tự kỷ của mình không?',
      },
      a: {
        [Language.EN]:
          'This is a personal choice. Practice helps them describe their strengths and needs, whether they choose to disclose or not. Focus on their comfort and context.',
        [Language.VN]:
          'Đây là một lựa chọn cá nhân. Luyện tập giúp họ mô tả điểm mạnh và nhu cầu của mình, cho dù họ chọn tiết lộ hay không. Hãy tập trung vào sự thoải mái và bối cảnh của họ.',
      },
    },
    {
      q: {
        [Language.EN]: 'What if my child has a shutdown or meltdown?',
        [Language.VN]: 'Nếu con tôi bị “shutdown” hoặc “meltdown” thì sao?',
      },
      a: {
        [Language.EN]:
          'Plan a simple safety plan in advance: a code word for “I need a break”, a quiet space, and one trusted person they can message or call afterwards.',
        [Language.VN]:
          'Hãy chuẩn bị sẵn một kế hoạch an toàn đơn giản: một mật mã để nói “con cần nghỉ”, một không gian yên tĩnh và một người đáng tin cậy con có thể nhắn hoặc gọi sau đó.',
      },
    },
    {
      q: {
        [Language.EN]: 'How much should I “push” my child to practice?',
        [Language.VN]: 'Tôi nên “thúc” con luyện tập đến mức nào?',
      },
      a: {
        [Language.EN]:
          'Use gentle, predictable structure instead of pressure. Agree together on tiny steps (5–10 minutes), and always end with something your child enjoys.',
        [Language.VN]:
          'Hãy dùng cấu trúc nhẹ nhàng, dễ đoán thay vì ép buộc. Cùng con thống nhất các bước rất nhỏ (5–10 phút) và luôn kết thúc bằng hoạt động con thích.',
      },
    },
  ],
  moduleCompletedToast: {
    [Language.EN]: 'Nice! Module completed.',
    [Language.VN]: 'Tốt lắm! Bạn đã hoàn thành mô-đun này.',
  },

  /* ----------------------------------- Resources ----------------------------------- */
  resources: [
    {
      name: 'Vietnam Autism Network (VAN)',
      desc: {
        [Language.EN]:
          'A leading network connecting families, professionals, and resources across Vietnam.',
        [Language.VN]:
          'Một mạng lưới hàng đầu kết nối các gia đình, chuyên gia và tài nguyên trên khắp Việt Nam.',
      },
      url: '#',
    },
    {
      name: "Saigon Children's Charity",
      desc: {
        [Language.EN]:
          'Offers programs that support disadvantaged children, including those with disabilities.',
        [Language.VN]:
          'Cung cấp các chương trình hỗ trợ trẻ em có hoàn cảnh khó khăn, bao gồm cả trẻ khuyết tật.',
      },
      url: '#',
    },
    {
      name: 'Action to the Community Development Institute (ACDC)',
      desc: {
        [Language.EN]:
          'Works to ensure high quality of life for persons with disabilities in Vietnam.',
        [Language.VN]:
          'Hoạt động để đảm bảo chất lượng cuộc sống cao cho người khuyết tật tại Việt Nam.',
      },
      url: '#',
    },
    {
      name: "Vietnam's Autism Project (VAP)",
      desc: {
        [Language.EN]:
          'Economic model project for autistic people in Vietnam.',
        [Language.VN]:
          'Dự án mô hình kinh tế cho người tự kỷ Việt Nam.',
      },
      url: '#',
    },
    {
      name: 'Parent support groups (online)',
      desc: {
        [Language.EN]:
          'Look for moderated Facebook or Zalo groups where parents share autism-friendly job and training opportunities.',
        [Language.VN]:
          'Tìm các nhóm Facebook hoặc Zalo có quản trị, nơi phụ huynh chia sẻ cơ hội việc làm và đào tạo thân thiện với người tự kỷ.',
      },
      url: '#',
    },
  ],

  /* --------------------------------- Testimonials --------------------------------- */
  testimonials: [
    {
      id: 't1',
      name: { [Language.EN]: 'Mrs. Lan', [Language.VN]: 'Cô Lan' },
      role: { [Language.EN]: 'Parent of a 21-year-old', [Language.VN]: 'Phụ huynh của con 21 tuổi' },
      quote: {
        [Language.EN]:
          'After practicing the STAR stories, my son answered with confidence in his internship interview.',
        [Language.VN]:
          'Sau khi luyện câu chuyện STAR, con tôi trả lời tự tin trong buổi phỏng vấn thực tập.',
      },
      videoUrl: '',
      thumbnail: '/Images/video_placeholder.jpg',
    },
    {
      id: 't2',
      name: { [Language.EN]: 'Mr. Minh', [Language.VN]: 'Anh Minh' },
      role: { [Language.EN]: 'Father of a 19-year-old', [Language.VN]: 'Bố của con 19 tuổi' },
      quote: {
        [Language.EN]:
          'The pre-interview routine lowered anxiety. We now have a checklist that actually works.',
        [Language.VN]:
          'Nghi thức trước phỏng vấn giúp giảm lo âu. Giờ chúng tôi có checklist thực sự hiệu quả.',
      },
      videoUrl: '',
      thumbnail: '',
    },
    {
      id: 't3',
      name: { [Language.EN]: 'Ms. Hoa', [Language.VN]: 'Chị Hoa' },
      role: { [Language.EN]: 'Parent & Advocate', [Language.VN]: 'Phụ huynh & Người vận động' },
      quote: {
        [Language.EN]:
          'The guidance was practical and respectful. We finally felt understood.',
        [Language.VN]:
          'Hướng dẫn thực tế và tôn trọng. Cuối cùng chúng tôi thấy được thấu hiểu.',
      },
      videoUrl: '',
      thumbnail: '',
    },
  ],

  /* ------------------------- Psychologists directory (sample) ------------------------- */
  psychologists: [
    {
      id: 'psy1',
      name: { [Language.EN]: 'Dr. Thu Nguyen', [Language.VN]: 'TS. Nguyễn Thu' },
      title: {
        [Language.EN]: 'Clinical Psychologist (Autism & Anxiety)',
        [Language.VN]: 'Nhà tâm lý lâm sàng (Tự kỷ & Lo âu)',
      },
      org: { [Language.EN]: "City Children’s Hospital", [Language.VN]: 'BV Nhi Đồng TP.HCM' },
      location: { [Language.EN]: 'Ho Chi Minh City', [Language.VN]: 'TP. Hồ Chí Minh' },
      languages: ['EN', 'VN'],
      specialties: ['Autism', 'Anxiety', 'Parent training'],
      bio: {
        [Language.EN]:
          '15+ years supporting autistic teens and families. Focus on interview readiness and social coaching.',
        [Language.VN]:
          'Hơn 15 năm hỗ trợ thanh thiếu niên tự kỷ và gia đình. Tập trung vào chuẩn bị phỏng vấn và huấn luyện kỹ năng xã hội.',
      },
      photo: '/Images/psychologists/thu.jpg',
      contact: { email: 'thu.nguyen@example.com', website: '', phone: '' },
      bookingUrl: '',
      isAvailable: true,
    },
    {
      id: 'psy2',
      name: { [Language.EN]: 'Ms. Linh Pham', [Language.VN]: 'Cô Phạm Linh' },
      title: {
        [Language.EN]: 'Educational Psychologist',
        [Language.VN]: 'Nhà tâm lý giáo dục',
      },
      org: { [Language.EN]: 'Imago Work', [Language.VN]: 'Imago Work' },
      location: { [Language.EN]: 'Hanoi', [Language.VN]: 'Hà Nội' },
      languages: ['VN'],
      specialties: ['Vocational skills', 'Executive functioning'],
      bio: {
        [Language.EN]: 'Supports work readiness and executive skills for young adults.',
        [Language.VN]: 'Hỗ trợ sẵn sàng đi làm và kỹ năng điều hành cho thanh niên.',
      },
      photo: '/Images/psychologists/linh.jpg',
      contact: { email: 'linh.pham@example.com', website: '', phone: '' },
      bookingUrl: '',
      isAvailable: false,
    },
  ],

  /* ---------------------------------- UI strings ---------------------------------- */
  ui: {
    testimonialsTitle: {
      [Language.EN]: 'Parent success stories',
      [Language.VN]: 'Câu chuyện thành công của phụ huynh',
    },
    testimonialsCTA: {
      [Language.EN]: 'Watch story',
      [Language.VN]: 'Xem câu chuyện',
    },
    videoComingSoon: {
      [Language.EN]: 'Video coming soon!',
      [Language.VN]: 'Video sẽ có sớm!',
    },

    psychologistsTitle: {
      [Language.EN]: 'Psychologists',
      [Language.VN]: 'Chuyên gia tâm lý',
    },
    psychologistFilters: {
      [Language.EN]: 'Filters',
      [Language.VN]: 'Bộ lọc',
    },
    searchPlaceholder: {
      [Language.EN]: 'Search name, specialty, or location…',
      [Language.VN]: 'Tìm tên, chuyên môn hoặc địa điểm…',
    },
    onlyAvailable: {
      [Language.EN]: 'Only available',
      [Language.VN]: 'Chỉ hiển thị còn trống',
    },
    contact: {
      [Language.EN]: 'Contact',
      [Language.VN]: 'Liên hệ',
    },
    viewProfile: {
      [Language.EN]: 'View profile',
      [Language.VN]: 'Xem hồ sơ',
    },
    book: {
      [Language.EN]: 'Book',
      [Language.VN]: 'Đặt lịch',
    },

    parentIntroTitle: {
      [Language.EN]: 'You know your child best',
      [Language.VN]: 'Bạn là người hiểu con mình nhất',
    },
    parentIntroBody: {
      [Language.EN]:
        'This space gives you short, autism-affirming tools to support your child before, during, and after interviews.',
      [Language.VN]:
        'Phần này cung cấp các công cụ ngắn gọn, tôn trọng tự kỷ để bạn hỗ trợ con trước, trong và sau buổi phỏng vấn.',
    },
  },

  /* ----------------------------- Small helper labels ----------------------------- */
  practiceWithChild: {
    [Language.EN]: 'Practice with your child',
    [Language.VN]: 'Luyện tập cùng con',
  },
  jobseekerCoachLine: {
    [Language.EN]: 'Open the Jobseeker coach to role-play interview answers together.',
    [Language.VN]: 'Mở công cụ Người tìm việc để luyện trả lời phỏng vấn cùng nhau.',
  },
  allLessonsDone: {
    [Language.EN]: 'Great work! You finished all lessons.',
    [Language.VN]: 'Tuyệt lắm! Bạn đã hoàn thành tất cả bài học.',
  },
  readyToPracticeQ: {
    [Language.EN]: 'Ready to practice together? Jump into the Jobseeker coach.',
    [Language.VN]: 'Sẵn sàng luyện tập cùng nhau? Hãy mở công cụ Người tìm việc.',
  },
};