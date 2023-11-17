export type QuestionOption = {
  id?: string
  replaceWith?: string
  label: string;
  value: string;
  /* null signals that end of the questionary is achieved */
  nextQuestionId: string | null;
};

export type Question = {
  id: string;
  title: string;
  
  type: 'options';
  options: QuestionOption[];
  providesPlaceholders?: string[]

  withExplanatoryInfo?: boolean
};

const aboutUsQuestion: Question = {
  id: '9',
  options: [
    {
      label: 'Poster or Billboard',
      value: 'poster_billboard',
      nextQuestionId: null,
    },
    {
      label: 'Friend or Family',
      value: 'friend_family',
      nextQuestionId: null,
    },
    {
      label: 'Instagram',
      nextQuestionId: null,
      value: 'instagram',
    },
    {
      label: 'Direct Mail or Package Insert',
      nextQuestionId: null,
      value: 'mail_package',
    },
    {
      label: 'Online TV or Streaming TV',
      nextQuestionId: null,
      value: 'online_tv_streaming_tv',
    },
    {
      label: 'TV',
      nextQuestionId: null,
      value: 'tv',
    },
    {
      label: 'Radio',
      nextQuestionId: null,
      value: 'radio',
    },
    {
      label: 'Search Engine (Google, Bing, etc.)',
      nextQuestionId: null,
      value: 'search_engine',
    },
    {
      label: 'Newspaper or Magazine',
      nextQuestionId: null,
      value: 'newspaper_magazine',
    },
    {
      label: 'Facebook',
      nextQuestionId: null,
      value: 'facebook',
    },
    {
      label: 'Blog Post or Website Review',
      nextQuestionId: null,
      value: 'blog_post_website',
    },
    {
      label: 'Podcast',
      nextQuestionId: null,
      value: 'podcast',
    },
    {
      label: 'Influencer',
      nextQuestionId: null,
      value: 'influencer',
    },
    {
      label: 'Youtube',
      nextQuestionId: null,
      value: 'youtube',
    },
    {
      label: 'Pinterest',
      nextQuestionId: null,
      value: 'pinterest',
    },
    {
      label: 'Other',
      nextQuestionId: null,
      value: 'other',
    },
  ],
  title: 'How did you heard about us',
  type: 'options',
};

const whatIsMostImportantQuestion: Question = {
  id: '7',
  options: [
    {
      label: 'Success',
      value: 'success',
      nextQuestionId: aboutUsQuestion.id,
    },
    {
      label: 'Romance',
      value: 'romance',
      nextQuestionId: aboutUsQuestion.id,
    },
    {
      label: 'Stability',
      value: 'stability',
      nextQuestionId: aboutUsQuestion.id,
    },
    {
      label: 'Freedom',
      value: 'freedom',
      nextQuestionId: aboutUsQuestion.id,
    },
  ],
  title: 'What is most important to you',
  type: 'options',
};

const isEmotionalControlTricky: Question = {
  id: '8',
  title: 'Is emotional control tricky for you',
  type: 'options',
  options: [
    {
      label: 'Yes',
      value: 'yes',
      nextQuestionId: aboutUsQuestion.id,
    },
    {
      label: 'Sometimes',
      value: 'sometimes',
      nextQuestionId: aboutUsQuestion.id,
    },
    {
      label: 'Rarely',
      value: 'rarely',
      nextQuestionId: aboutUsQuestion.id,
    },
    {
      label: 'Not at all',
      nextQuestionId: aboutUsQuestion.id,
      value: 'no',
    },
  ],
};

const overthinkQuestion: Question = {
  withExplanatoryInfo: true,
  id: '6',
  type: 'options',
  title: 'Do you tend to overthink',
  options: [
    {
      label: 'Yes',
      value: 'yes',
      nextQuestionId: whatIsMostImportantQuestion.id,
    },
    { label: 'No', value: 'no', nextQuestionId: isEmotionalControlTricky.id },
  ],
};

const relationshipGoalsQuestion: Question = {
  id: '14',
  title: 'When you think about your relationship goals, you feel...?',
  type: 'options',
  options: [
    {
      label: 'Optimistic! They are totally doable, with some guidance.',
      nextQuestionId: aboutUsQuestion.id,
      value: 'optimistic',
    },
    {
      label: 'Cautious. I`ve struggled before, but I`m hopeful.',
      nextQuestionId: aboutUsQuestion.id,
      value: 'cautious',
    },
    {
      label: 'I’m feeling a little anxious, honestly.',
      nextQuestionId: aboutUsQuestion.id,
      value: 'anxious',
    },
  ],
};

const partnerPriorityQuestion: Question = {
  id: '13',
  options: [
    {
      label: 'Strongly agree',
      nextQuestionId: relationshipGoalsQuestion.id,
      value: 'strongly_agree',
    },
    {
      label: 'Agree',
      nextQuestionId: relationshipGoalsQuestion.id,
      value: 'agree',
    },
    {
      label: 'Neutral',
      nextQuestionId: relationshipGoalsQuestion.id,
      value: 'neutral',
    },
    {
      label: 'Disagree',
      nextQuestionId: relationshipGoalsQuestion.id,
      value: 'disagree',
    },
    {
      label: 'Strongly disagree',
      nextQuestionId: relationshipGoalsQuestion.id,
      value: 'strongly_disagree',
    },
  ],
  title: 'Do you agree with the statement below?',
  type: 'options',
};


const partnerGenderQuestion: Question = {
  id: '12',
  options: [
    {
      label: 'Male',
      nextQuestionId: partnerPriorityQuestion.id,
      value: 'male',
    },
    {
      label: 'Female',
      nextQuestionId: partnerPriorityQuestion.id,
      value: 'female',
    },
  ],
  title: 'What is your partner`s gender?',
  type: 'options',
};

const partnerIntrovertOrExtrovertQuestion: Question = {
  title: 'Is your partner an introvert or extrovert?',
  id: '11',
  type: 'options',
  options: [
    {
      label: 'Introvert',
      nextQuestionId: partnerGenderQuestion.id,
      value: 'introvert',
    },
    {
      label: 'Extrovert',
      nextQuestionId: partnerGenderQuestion.id,
      value: 'extrovert',
    },
    {
      label: 'A bit of both',
      nextQuestionId: partnerGenderQuestion.id,
      value: 'both',
    },
  ],
};

const singleParentProblemQuestion: Question = {
  id: '10',
  providesPlaceholders: ['gender', 'is_parent'],
  title:
    'Single {gender} {is_parent} need a slightly different approach to find their perfect partner. But first, how did you feel in your last relationship?',
  options: [
    {
      label: 'I was unhappy with low things were going in my relationship',
      value: 'unhappy',
      nextQuestionId: partnerIntrovertOrExtrovertQuestion.id,
    },
    {
      label:
        'I was unhappy with parts of my relationship, but some thing were working',
      nextQuestionId: partnerIntrovertOrExtrovertQuestion.id,
      value: 'min_unhappy',
    },
    {
      label: 'I was generally happy with my relationship',
      nextQuestionId: partnerIntrovertOrExtrovertQuestion.id,
      value: 'happy',
    },
    {
      label: 'I`ve never been in a relationship',
      nextQuestionId: partnerIntrovertOrExtrovertQuestion.id,
      value: 'never_in_relationship',
    },
  ],
  type: 'options',
};

const inRelationshipProblemQuestion: Question = {
  id: '5',
  type: 'options',
  providesPlaceholders: ['gender', 'single_parent'],
  title: '{gender} {single_parent} need a slightly different approach to improve their relationship. Which statement best describes you?',
  options: [
    {
      label: 'I`m very unhappy with how things are going in my relationship',
      value: 'unhappy',
      nextQuestionId: overthinkQuestion.id,
    },
    {
      label:
        'I`m unhappy with parts of my relationship, but some things are working well',
      value: 'mid_unhappy',
      nextQuestionId: overthinkQuestion.id,
    },
    {
      label: 'I`m generally happy in my relationship',
      value: 'happy',
      nextQuestionId: overthinkQuestion.id,
    },
  ],
};

const isSingleParentQuestion: Question = {
  id: '3',
  title: 'Are you a single parent?',
  options: [
    {
      id: "single_parent",
      replaceWith: 'who has children',
      label: 'Yes',
      value: 'yes',
      nextQuestionId: inRelationshipProblemQuestion.id,
    },
    {
      replaceWith: "",
      id: "single_parent",
      label: 'No',
      value: 'no',
      nextQuestionId: inRelationshipProblemQuestion.id,
    },
  ],
  type: 'options',
};

const isParentQuestion: Question = {
  id: '4',
  title: 'Are you a parent?',
  options: [
    { id: "is_parent", replaceWith: "who has children", label: 'Yes', value: 'yes', nextQuestionId: singleParentProblemQuestion.id },
    { id: "is_parent", replaceWith: "", label: 'No', value: 'no', nextQuestionId: singleParentProblemQuestion.id },
  ],
  type: 'options',
};

const relationshipStatusQuestion: Question = {
  id: '2',
  title:
    'So we can get to know you better, tell us about your relationship status',
  type: 'options',
  options: [
    {
      label: 'Single',
      value: 'single',
      nextQuestionId: isSingleParentQuestion.id,
    },
    {
      label: 'In a relationship',
      value: 'in_relationship',
      nextQuestionId: isParentQuestion.id,
    },
  ],
};

const genderQuestion: Question = {
  id: '1',
  title: 'Select your gender',
  type: 'options',

  options: [
    { id: 'gender', label: 'Female', value: 'female', nextQuestionId: '2' },
    { id: 'gender', label: 'Male', value: 'male', nextQuestionId: '2' },
  ],
};

const questions = [
  genderQuestion,
  relationshipStatusQuestion,
  isSingleParentQuestion,
  isParentQuestion,
  inRelationshipProblemQuestion,
  relationshipGoalsQuestion,
  partnerPriorityQuestion,
  partnerGenderQuestion,
  partnerIntrovertOrExtrovertQuestion,
  singleParentProblemQuestion,
  aboutUsQuestion,
  isEmotionalControlTricky,
  overthinkQuestion,
  whatIsMostImportantQuestion,
];

export default questions;
