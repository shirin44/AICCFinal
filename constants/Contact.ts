import { Language } from "@/types";

export const CONTACT_PAGE_CONTENT = {
  title: {
    [Language.EN]: "Get in Touch",
    [Language.VN]: "Liên hệ với chúng tôi",
  },
  subtitle: {
    [Language.EN]:
      "We’d love to hear from you! Send us a message and we’ll get back to you soon.",
    [Language.VN]:
      "Chúng tôi rất mong nhận phản hồi từ bạn! Hãy gửi tin nhắn và chúng tôi sẽ trả lời sớm nhất.",
  },
  form: {
    fullName: { [Language.EN]: "Full Name", [Language.VN]: "Họ và tên" },
    email: { [Language.EN]: "Email Address", [Language.VN]: "Địa chỉ Email" },
    message: { [Language.EN]: "Message", [Language.VN]: "Tin nhắn" },
    send: { [Language.EN]: "Send Message", [Language.VN]: "Gửi tin nhắn" },
    sending: { [Language.EN]: "Sending...", [Language.VN]: "Đang gửi..." },
    error: {
      [Language.EN]: "Failed to send message. Please try again later.",
      [Language.VN]: "Gửi tin nhắn thất bại. Vui lòng thử lại sau.",
    },
  },
  narrator: {
    header: {
      [Language.EN]: "A Message from AICC:",
      [Language.VN]: "Thông điệp từ AICC:",
    },
    quote: {
      [Language.EN]:
        "Your feedback and questions help us grow. We're building this together, for everyone.",
      [Language.VN]:
        "Phản hồi và câu hỏi của bạn giúp chúng tôi phát triển. Chúng ta đang xây dựng điều này cùng nhau, cho tất cả mọi người.",
    },
  },
  cards: {
    general: {
      title: { [Language.EN]: "General Inquiries", [Language.VN]: "Liên hệ chung" },
      text: {
        [Language.EN]:
          "For general questions, feedback, or information about our project.",
        [Language.VN]:
          "Dành cho các câu hỏi chung, góp ý hoặc thông tin về dự án.",
      },
    },
    partners: {
      title: {
        [Language.EN]: "Partnerships & Sponsors",
        [Language.VN]: "Đối tác & Nhà tài trợ",
      },
      text: {
        [Language.EN]:
          "Interested in collaborating or supporting our mission? We'd love to connect.",
        [Language.VN]:
          "Quan tâm hợp tác hoặc hỗ trợ sứ mệnh của chúng tôi? Hãy kết nối cùng nhau.",
      },
    },
  },
  success: {
    title: { [Language.EN]: "Message Sent!", [Language.VN]: "Tin nhắn đã gửi!" },
    desc: {
      [Language.EN]:
        "Thank you for reaching out. We've received your message and will get back to you as soon as possible.",
      [Language.VN]:
        "Cảm ơn bạn đã liên hệ. Chúng tôi đã nhận tin nhắn và sẽ phản hồi sớm nhất có thể.",
    },
    close: { [Language.EN]: "Close", [Language.VN]: "Đóng" },
  },
};
