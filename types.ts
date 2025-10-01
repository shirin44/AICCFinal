
export type Story = {
  title: Record<Language, string>;
  description: Record<Language, string>;
  scenes: Array<{
    title: Record<Language, string>;
    text: Record<Language, string>;
    choices: Array<{
      text: Record<Language, string>;
      affirmation?: Record<Language, string>;
      isMultiSelect?: boolean;
    }>;
  }>;
  closingAffirmation: Record<Language, string>;
};



export enum NarratorRole {
  Jobseeker = 'Jobseeker',
  Employer = 'Employer',
  CareGiver = 'CareGiver',
  Volunteer = 'Volunteer',
}

export enum Language {
  EN = 'en',
  VN = 'vn',
}

export type NarratorState = 'neutral' | 'happy' | 'sad';

// The application's view of the narrator's emotion or action state
export type NarratorAppEmotion = NarratorState | 'intro' | 'celebrating' | 'thinking' | 'pointing' | 'explaining' | 'talking' | 'idle';

export type AppMode = 'practice' | 'story';

export interface Narrator {
  role: NarratorRole;
  name: { [key in Language]: string };
  intro: { [key in Language]: string };
  hover: { [key in Language]: string };
  avatars: { [key in NarratorState]: string };
  theme: string;
}

/** NEW: shared part shape with optional strengths to keep it backward compatible */
export interface StarPart {
  score: number;
  feedback: string;
  strengths?: string[]; // optional list of positives for this part (2–4 bullets)
}

/** UPDATED: support strengths + a concise polished rewrite */
export interface StarFeedback {
  situation: StarPart;
  task:      StarPart;
  action:    StarPart;
  result:    StarPart;
  overall: {
    score: number;
    feedback: string;      // kind, summarizing tone
    strengths?: string[];  // top positives (2–4)
    revisedAnswer?: string; // short STAR rewrite candidate can reuse
  };
}

/** OPTIONAL: for persistent bookmarks in localStorage */
export interface SavedQuestion {
  q: string;
  savedAt: number; // epoch ms
}


export enum NarratorRole {
  Jobseeker = 'Jobseeker',
  Employer = 'Employer',
  CareGiver = 'CareGiver',
  Volunteer = 'Volunteer',
}

export enum Language {
  EN = 'en',
  VN = 'vn',
}

export type NarratorState = 'neutral' | 'happy' | 'sad';

// The application's view of the narrator's emotion or action state
export type NarratorAppEmotion = NarratorState | 'intro' | 'celebrating' | 'thinking' | 'pointing' | 'explaining' | 'talking' | 'idle';

export type AppMode = 'practice' | 'story';

export interface Narrator {
  role: NarratorRole;
  name: { [key in Language]: string };
  intro: { [key in Language]: string };
  hover: { [key in Language]: string };
  avatars: { [key in NarratorState]: string };
  theme: string;
}

export interface StarFeedback {
  situation: { score: number; feedback: string };
  task: { score: number; feedback: string };
  action: { score: number; feedback: string };
  result: { score: number; feedback: string };
  overall: { score: number; feedback: string };
}

export interface StoryChoice {
  text: { [key in Language]: string };
  isMultiSelect?: boolean; // Indicates the 'title' of a multi-select group
  affirmation?: { [key in Language]: string };
}

export interface StoryScene {
  title: { [key in Language]: string };
  text: { [key in Language]: string };
  choices: StoryChoice[];
}

// export interface Story {
//   title: { [key in Language]: string };
//   description: { [key in Language]: string };
//   scenes: StoryScene[];
//   closingAffirmation: { [key in Language]: string };
// }
export interface StoryChoice {
  text: { [key in Language]: string };
  isMultiSelect?: boolean; // Indicates the 'title' of a multi-select group
  affirmation?: { [key in Language]: string };
}

export interface StoryScene {
  title: { [key in Language]: string };
  text: { [key in Language]: string };
  choices: StoryChoice[];
}

// export interface Story {
//   title: { [key in Language]: string };
//   description: { [key in Language]: string };
//   scenes: StoryScene[];
//   closingAffirmation: { [key in Language]: string };
// }


export type PlaceholderKey =
  | "TEAM_PHOTO"
  | "BRAINSTORM"
  | "TEAM_CALL"
  | "BOOTCAMP"
  | "MEETING_THUY"
  | "IDEA_REFINEMENT"
  | "TEAM_LAUGH"
  | "SANDY_WORKSHOP"
  | "DRAFT"
  | "TRUNG_MEETING"
  | "SURVEY"
  | "FEEDBACK"
  | "PROPOSAL"
  | "KRISTEN"
  | "BUG"
  | "CODING"
  | "SIMONA"
  | "TROY"
  | "FINAL_SPRINT"
  | "REFLECTION"
  | "GALLERY";

  export type StoryEntry = {
  id: string;
  date: { [key in Language]: string };
  body: { [key in Language]: string };
  placeholderKey: PlaceholderKey;
};

type Trans = Record<Language, string>;
export interface AboutSchema {
  heroTitle: Trans;
  heroSubtitle: Trans;
  sections: {
    ourStory: {
      title: Trans;
      p1: Trans;
      p2: Trans;
      p3: Trans;
      list: Record<Language, string[]>;
    };
    foundingTeam: {
      title: Trans;
      intro: Trans;
    };
    evolution: {
      title: Trans;
      intro: Trans;
      points: Record<Language, string[]>;
      outro: Trans;
    };
    missionVision: {
      title: Trans;
    };
    mission: Trans;
    missionText: Trans;
    vision: Trans;
    visionText: Trans;
    acknowledgements: {
      title: Trans;
      text: Trans;
    };
    research: {
      title: Trans;
      text: Trans;
    };
    developers: {
      title: Trans;
      lines: Record<Language, string[]>;
    };
  };
}