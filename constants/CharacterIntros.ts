import { NarratorRole, Language } from "@/types";

export interface CharacterIntro {
  name: Record<Language, string>;
  roleLabel?: Record<Language, string>;
  city?: Record<Language, string>;
  age?: number;
  /** Full intro copy. If omitted, UI will synthesize from fields above. */
  intro?: Record<Language, string>;
  /** One-sentence learning goal shown under the intro. */
  goal?: Record<Language, string>;
  /** Path or URL to a portrait image. */
  avatar: string;
  /** Optional localized alt text for the image. */
  alt?: Record<Language, string>;
}

export const CHARACTER_INTROS: Record<NarratorRole, CharacterIntro> = {
  [NarratorRole.Jobseeker]: {
    name: { [Language.EN]: "Lan", [Language.VN]: "Lan" },
    age: 28,
    city: { [Language.EN]: "Hanoi", [Language.VN]: "Hà Nội" },
    roleLabel: {
      [Language.EN]: "Autistic jobseeker",
      [Language.VN]: "Người tìm việc tự kỷ",
    },
    intro: {
      [Language.EN]:
        `You are Lan, 28 years old, living in Hà Nội. For years, people have called you “different.” At work and at home, you face challenges that few understand. This is your story.`,
      [Language.VN]:
        `Bạn là Lan, 28 tuổi, sống ở Hà Nội. Nhiều năm qua, mọi người gọi bạn là “khác biệt”. Ở nơi làm việc và ở nhà, bạn đối mặt những khó khăn không phải ai cũng hiểu. Đây là câu chuyện của bạn.`,
    },
    goal: {
      [Language.EN]:
        "put yourself in the shoes of an autistic person — feel the trade-offs Lan faces and practice small choices that honor her needs at work and at home.",
      [Language.VN]:
        "Mục tiêu của câu chuyện này là đặt mình vào vị trí của một người tự kỷ — cảm nhận những lựa chọn khó của Lan và luyện các hành động nhỏ tôn trọng nhu cầu của cô ấy ở nơi làm việc và ở nhà.",
    },
    avatar: "assets/characters/candidates/candidates_happy.png",
    alt: {
      [Language.EN]: "Portrait of Lan",
      [Language.VN]: "Chân dung Lan",
    },
  },

  [NarratorRole.Employer]: {
    name: { [Language.EN]: "Ms. Vy", [Language.VN]: "Chị Vy" },
    city: {
      [Language.EN]: "Ho Chi Minh City",
      [Language.VN]: "TP. Hồ Chí Minh",
    },
    roleLabel: {
      [Language.EN]: "HR Manager",
      [Language.VN]: "Trưởng phòng Nhân sự",
    },
    intro: {
      [Language.EN]:
        `You are Ms. Vy, an HR manager in Ho Chi Minh City. Today you greet Linh, a 24-year-old candidate. Follow this story to learn how to look past first impressions and see skills, not stereotypes.`,
      [Language.VN]:
        `Bạn là chị Vy, Trưởng phòng Nhân sự tại TP. Hồ Chí Minh. Hôm nay bạn chào Linh, ứng viên 24 tuổi. Hãy theo dõi câu chuyện để nhìn vượt qua ấn tượng ban đầu và thấy được kỹ năng, không phải định kiến.`,
    },
    goal: {
      [Language.EN]:
        "put yourself in the shoes of an autistic candidate — notice how interview habits help or hinder, and try inclusive tweaks that reveal real skills.",
      [Language.VN]:
        "Mục tiêu của câu chuyện này là đặt mình vào vị trí của một ứng viên tự kỷ — nhận ra thói quen phỏng vấn giúp hay cản, và thử các điều chỉnh hòa nhập để bộc lộ kỹ năng thật.",
    },
    avatar: "assets/characters/employers/employers_happy.png",
    alt: {
      [Language.EN]: "Portrait of Ms. Vy, HR Manager",
      [Language.VN]: "Chân dung chị Vy, Trưởng phòng Nhân sự",
    },
  },

  [NarratorRole.CareGiver]: {
    name: { [Language.EN]: "Minh", [Language.VN]: "Minh" },
    roleLabel: {
      [Language.EN]: "Devoted dad",
      [Language.VN]: "Người cha tận tâm",
    },
    city: {
      [Language.EN]: "Ho Chi Minh City",
      [Language.VN]: "TP. Hồ Chí Minh",
    },
    intro: {
      [Language.EN]:
        `You are Minh — a caring dad. Your adult son is autistic. Each day you balance hopes, resources, and the world’s expectations. Follow this story to see how caregivers build strength step by step.`,
      [Language.VN]:
        `Bạn là Minh — một người cha tận tâm. Con trai trưởng thành của bạn là người tự kỷ. Mỗi ngày, bạn cân bằng hy vọng, nguồn lực và kỳ vọng của mọi người. Hãy theo dõi câu chuyện để thấy phụ huynh bền bỉ thế nào qua từng bước.`,
    },
    goal: {
      [Language.EN]:
        "put yourself in the shoes of a caregiver of an autistic adult — learn simple routines and language that lower anxiety and grow autonomy.",
      [Language.VN]:
        "Mục tiêu của câu chuyện này là đặt mình vào vị trí của người chăm sóc một người tự kỷ trưởng thành — học các thói quen và ngôn ngữ đơn giản giúp giảm lo âu và tăng tự chủ.",
    },
    avatar: "assets/characters/parents/parents_happy.png",
    alt: {
      [Language.EN]: "Portrait of Minh, a devoted dad",
      [Language.VN]: "Chân dung Minh, người cha tận tâm",
    },
  },

  [NarratorRole.Volunteer]: {
    name: { [Language.EN]: "An", [Language.VN]: "An" },
    roleLabel: {
      [Language.EN]: "Peer volunteer",
      [Language.VN]: "Tình nguyện viên đồng trang lứa",
    },
    city: { [Language.EN]: "Da Nang", [Language.VN]: "Đà Nẵng" },
    intro: {
      [Language.EN]:
        `You are An, a peer volunteer in Đà Nẵng. You support autistic adults practicing job skills. Some days are inspiring; others are tough. This is your reflection.`,
      [Language.VN]:
        `Bạn là An, một tình nguyện viên đồng trang lứa ở Đà Nẵng. Bạn hỗ trợ người tự kỷ luyện kỹ năng việc làm. Có ngày đầy cảm hứng; có ngày rất khó. Đây là suy ngẫm của bạn.`,
    },
    goal: {
      [Language.EN]:
        "put yourself in the shoes of a peer volunteer — experiment with scaffolds (visuals, role-play, step-by-step) and self-care that sustain progress.",
      [Language.VN]:
        "Mục tiêu của câu chuyện này là đặt mình vào vị trí của một tình nguyện viên đồng trang lứa — thử các cách chia nhỏ (hình ảnh, nhập vai, từng bước) và tự chăm sóc để duy trì tiến bộ.",
    },
    avatar: "assets/characters/volunteers/volunteers_happy.png",
    alt: {
      [Language.EN]: "Portrait of An, peer volunteer",
      [Language.VN]: "Chân dung An, tình nguyện viên đồng trang lứa",
    },
  },
};
