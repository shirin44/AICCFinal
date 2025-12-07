import React, { useContext } from "react";
import { AppContext } from "@/App";
import { Language } from "@/types";
import {
  SituationIcon,
  TaskIcon,
  ActionIcon,
  ResultIcon,
} from "./StarMethodDiagramIcons";

const STAR_CONTENT = {
  headerLabel: {
    [Language.EN]: "STAR method",
    [Language.VN]: "Phương pháp STAR",
  },
  headerTitle: {
    [Language.EN]: "The STAR method at a glance",
    [Language.VN]: "Tổng quan nhanh về phương pháp STAR",
  },
  headerSubtitle: {
    [Language.EN]:
      "Use this structure to help your child turn everyday experiences into clear, job-ready stories.",
    [Language.VN]:
      "Dùng cấu trúc này để giúp con biến trải nghiệm hằng ngày thành câu chuyện rõ ràng, phù hợp với phỏng vấn.",
  },
  situation: {
    letter: "S",
    title: {
      [Language.EN]: "Situation",
      [Language.VN]: "Tình huống",
    },
    description: {
      [Language.EN]:
        "Set the scene. What was happening? Where were you? Who was involved?",
      [Language.VN]:
        "Mô tả bối cảnh. Chuyện gì đang xảy ra? Ở đâu? Có những ai liên quan?",
    },
  },
  task: {
    letter: "T",
    title: {
      [Language.EN]: "Task",
      [Language.VN]: "Nhiệm vụ",
    },
    description: {
      [Language.EN]:
        "The goal or problem. What did you need to do or fix in that moment?",
      [Language.VN]:
        "Mục tiêu hoặc vấn đề. Khi đó bạn cần làm gì hoặc cần giải quyết điều gì?",
    },
  },
  action: {
    letter: "A",
    title: {
      [Language.EN]: "Action",
      [Language.VN]: "Hành động",
    },
    description: {
      [Language.EN]:
        "The specific steps you took. Focus on what you did, not the whole team.",
      [Language.VN]:
        "Các bước cụ thể bạn đã làm. Tập trung vào phần việc của bạn, không phải cả nhóm.",
    },
  },
  result: {
    letter: "R",
    title: {
      [Language.EN]: "Result",
      [Language.VN]: "Kết quả",
    },
    description: {
      [Language.EN]:
        "What changed because of your actions? Try to mention numbers or clear outcomes.",
      [Language.VN]:
        "Điều gì đã thay đổi nhờ hành động của bạn? Cố gắng nêu con số hoặc kết quả cụ thể.",
    },
  },
} as const;

const pick = (obj: Record<Language, string>, lang: Language) =>
  obj[lang] ?? obj[Language.EN];

interface InfoCardProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  letter: string;
  title: string;
  description: string;
  accentClasses: string; // e.g. "text-primary bg-primary/10"
}

const InfoCard: React.FC<InfoCardProps> = ({
  Icon,
  letter,
  title,
  description,
  accentClasses,
}) => (
  <div
    className={`
      group flex items-start gap-4 rounded-xl border border-border/70 bg-card/70 p-4
      shadow-sm transition hover:-translate-y-0.5 hover:shadow-md
    `}
  >
    <div
      className={`
        flex h-11 w-11 items-center justify-center rounded-xl
        ${accentClasses}
      `}
    >
      <Icon className="h-6 w-6" aria-hidden />
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-foreground/80">
          {letter}
        </span>
        <h4 className="font-display text-base font-semibold text-foreground">
          {title}
        </h4>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const StarInfographic: React.FC = () => {
  const { language } = useContext(AppContext);
  const lang = language === Language.VN || (language as any) === "vi" ? Language.VN : Language.EN;

  return (
    <section className="mb-6 rounded-2xl border border-border/60 bg-card/80 p-5">
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
          {pick(STAR_CONTENT.headerLabel, lang)}
        </p>
        <h3 className="font-display text-lg font-semibold text-foreground">
          {pick(STAR_CONTENT.headerTitle, lang)}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {pick(STAR_CONTENT.headerSubtitle, lang)}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoCard
          Icon={SituationIcon}
          letter={STAR_CONTENT.situation.letter}
          title={pick(STAR_CONTENT.situation.title, lang)}
          description={pick(STAR_CONTENT.situation.description, lang)}
          accentClasses="text-primary bg-primary/10"
        />
        <InfoCard
          Icon={TaskIcon}
          letter={STAR_CONTENT.task.letter}
          title={pick(STAR_CONTENT.task.title, lang)}
          description={pick(STAR_CONTENT.task.description, lang)}
          accentClasses="text-accent bg-accent/10"
        />
        <InfoCard
          Icon={ActionIcon}
          letter={STAR_CONTENT.action.letter}
          title={pick(STAR_CONTENT.action.title, lang)}
          description={pick(STAR_CONTENT.action.description, lang)}
          accentClasses="text-emerald-600 bg-emerald-50"
        />
        <InfoCard
          Icon={ResultIcon}
          letter={STAR_CONTENT.result.letter}
          title={pick(STAR_CONTENT.result.title, lang)}
          description={pick(STAR_CONTENT.result.description, lang)}
          accentClasses="text-amber-600 bg-amber-50"
        />
      </div>
    </section>
  );
};

export default StarInfographic;