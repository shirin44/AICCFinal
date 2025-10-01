import { Narrator, NarratorRole, Language, Story, StoryEntry, PlaceholderKey, AboutSchema } from '@/types';
import { LOCALIZED_CONTENT } from '@/constants';

export const PARENT_CONTENT = {
  modules: [
    { id: 'module1', title: LOCALIZED_CONTENT.module1Title, time: { [Language.EN]: '2 min read', [Language.VN]: '2 phút đọc' } },
    { id: 'module2', title: LOCALIZED_CONTENT.module2Title, time: { [Language.EN]: '3 min practice', [Language.VN]: '3 phút thực hành' } },
    { id: 'module3', title: LOCALIZED_CONTENT.module3Title, time: { [Language.EN]: '3 min toolkit', [Language.VN]: '3 phút công cụ' } },
    { id: 'module4', title: LOCALIZED_CONTENT.module4Title, time: { [Language.EN]: '2 min read', [Language.VN]: '2 phút đọc' } },
  ],

  faqs: [
    {
      q: { [Language.EN]: 'What if my child avoids eye contact?', [Language.VN]: 'Nếu con tôi tránh giao tiếp bằng mắt thì sao?' },
      a: { [Language.EN]: "It's often a way to focus better on listening. Encourage alternatives like nodding or brief glances. It is not a sign of dishonesty.", [Language.VN]: 'Đó thường là cách để tập trung lắng nghe tốt hơn. Hãy khuyến khích các cách thay thế như gật đầu hoặc liếc nhìn nhanh. Đó không phải là dấu hiệu của sự không trung thực.' }
    },
    {
      q: { [Language.EN]: 'How to handle "stimming" (self-stimulatory behavior)?', [Language.VN]: 'Làm thế nào để xử lý hành vi tự kích thích?' },
      a: { [Language.EN]: "Stimming is a natural way to regulate anxiety. As long as it's not harmful, it's best to allow it. A small, quiet fidget tool can be helpful.", [Language.VN]: 'Hành vi tự kích thích là một cách tự nhiên để điều chỉnh sự lo âu. Miễn là nó không gây hại, tốt nhất là cho phép nó. Một công cụ nhỏ, yên tĩnh có thể hữu ích.' }
    },
    {
      q: { [Language.EN]: 'Should they disclose their autism?', [Language.VN]: 'Con có nên tiết lộ về chứng tự kỷ của mình không?' },
      a: { [Language.EN]: 'This is a personal choice. Practice helps them describe their strengths and needs, whether they choose to disclose or not. Focus on their comfort and context.', [Language.VN]: 'Đây là một lựa chọn cá nhân. Luyện tập giúp họ mô tả điểm mạnh và nhu cầu của mình, cho dù họ chọn tiết lộ hay không. Hãy tập trung vào sự thoải mái và bối cảnh của họ.' }
    },
  ],

  resources: [
    {
      name: 'Vietnam Autism Network (VAN)',
      desc: { [Language.EN]: 'A leading network connecting families, professionals, and resources across Vietnam.', [Language.VN]: 'Một mạng lưới hàng đầu kết nối các gia đình, chuyên gia và tài nguyên trên khắp Việt Nam.' },
      url: '#'
    },
    {
      name: "Saigon Children's Charity",
      desc: { [Language.EN]: 'Offers programs that support disadvantaged children, including those with disabilities.', [Language.VN]: 'Cung cấp các chương trình hỗ trợ trẻ em có hoàn cảnh khó khăn, bao gồm cả trẻ khuyết tật.' },
      url: '#'
    },
    {
      name: 'Action to the Community Development Institute (ACDC)',
      desc: { [Language.EN]: 'Works to ensure high quality of life for persons with disabilities in Vietnam.', [Language.VN]: 'Hoạt động để đảm bảo chất lượng cuộc sống cao cho người khuyết tật tại Việt Nam.' },
      url: '#'
    },
    {
      name: "Vietnam's Autism Project (VAP)",
      desc: { [Language.EN]: 'Economic model project for Autistic People in Vietnam', [Language.VN]: 'Dự Án Mô Hình Kinh Tế cho người Tự Kỷ Việt Nam.' },
      url: '#'
    }
  ],

  testimonials: [
    {
      id: 't1',
      name: { [Language.EN]: 'Mrs. Lan', [Language.VN]: 'Cô Lan' },
      role: { [Language.EN]: 'Parent of a 21-year-old', [Language.VN]: 'Phụ huynh của con 21 tuổi' },
      quote: {
        [Language.EN]: 'After practicing the STAR stories, my son answered with confidence in his internship interview.',
        [Language.VN]: 'Sau khi luyện câu chuyện STAR, con tôi trả lời tự tin trong buổi phỏng vấn thực tập.',
      },
      videoUrl: '', // e.g., 'https://youtu.be/...'
      thumbnail: '/Images/video_placeholder.jpg',
    },
    {
      id: 't2',
      name: { [Language.EN]: 'Mr. Minh', [Language.VN]: 'Anh Minh' },
      role: { [Language.EN]: 'Father of a 19-year-old', [Language.VN]: 'Bố của con 19 tuổi' },
      quote: {
        [Language.EN]: 'The pre-interview routine lowered anxiety. We now have a checklist that actually works.',
        [Language.VN]: 'Nghi thức trước phỏng vấn giúp giảm lo âu. Giờ chúng tôi có checklist thực sự hiệu quả.',
      },
      videoUrl: '',
      thumbnail: '',
    },
    {
      id: 't3',
      name: { [Language.EN]: 'Ms. Hoa', [Language.VN]: 'Chị Hoa' },
      role: { [Language.EN]: 'Parent & Advocate', [Language.VN]: 'Phụ huynh & Người vận động' },
      quote: {
        [Language.EN]: 'The guidance was practical and respectful. We finally felt understood.',
        [Language.VN]: 'Hướng dẫn thực tế và tôn trọng. Cuối cùng chúng tôi thấy được thấu hiểu.',
      },
      videoUrl: '',
      thumbnail: '',
    },
  ],

  // Psychologists directory (sample entries)
  psychologists: [
    {
      id: 'psy1',
      name: { [Language.EN]: 'Dr. Thu Nguyen', [Language.VN]: 'TS. Nguyễn Thu' },
      title: { [Language.EN]: 'Clinical Psychologist (Autism & Anxiety)', [Language.VN]: 'Nhà tâm lý lâm sàng (Tự kỷ & Lo âu)' },
      org: { [Language.EN]: "City Children’s Hospital", [Language.VN]: 'BV Nhi Đồng TP.HCM' },
      location: { [Language.EN]: 'Ho Chi Minh City', [Language.VN]: 'TP. Hồ Chí Minh' },
      languages: ['EN', 'VN'],
      specialties: ['Autism', 'Anxiety', 'Parent training'],
      bio: {
        [Language.EN]: '15+ years supporting autistic teens and families. Focus on interview readiness and social coaching.',
        [Language.VN]: 'Hơn 15 năm hỗ trợ thanh thiếu niên tự kỷ và gia đình. Tập trung vào chuẩn bị phỏng vấn và huấn luyện kỹ năng xã hội.',
      },
      photo: '/Images/psychologists/thu.jpg',
      contact: { email: 'thu.nguyen@example.com', website: '', phone: '' },
      bookingUrl: '',
      isAvailable: true,
    },
    {
      id: 'psy2',
      name: { [Language.EN]: 'Ms. Linh Pham', [Language.VN]: 'Cô Phạm Linh' },
      title: { [Language.EN]: 'Educational Psychologist', [Language.VN]: 'Nhà tâm lý giáo dục' },
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

  ui: {
    testimonialsTitle: {
      [Language.EN]: 'Parent Success Stories',
      [Language.VN]: 'Câu chuyện thành công của phụ huynh',
    },
    testimonialsCTA: {
      [Language.EN]: 'Watch Story',
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
      [Language.EN]: 'View Profile',
      [Language.VN]: 'Xem hồ sơ',
    },
    book: {
      [Language.EN]: 'Book',
      [Language.VN]: 'Đặt lịch',
    },
  },

  practiceWithChild: {
    [Language.EN]: "Practice with your child",
    [Language.VN]: "Luyện tập cùng con",
  },
  jobseekerCoachLine: {
    [Language.EN]: "Open the Jobseeker coach to role-play interview answers together.",
    [Language.VN]: "Mở công cụ Người tìm việc để luyện trả lời phỏng vấn cùng nhau.",
  },
  allLessonsDone: {
    [Language.EN]: "Great work! You finished all lessons.",
    [Language.VN]: "Tuyệt lắm! Bạn đã hoàn thành tất cả bài học.",
  },
  readyToPracticeQ: {
    [Language.EN]: "Ready to practice together? Jump into the Jobseeker coach.",
    [Language.VN]: "Sẵn sàng luyện tập cùng nhau? Hãy mở công cụ Người tìm việc.",
  },
};
