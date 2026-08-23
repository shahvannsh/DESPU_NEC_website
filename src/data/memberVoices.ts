/**
 * Short, authentic statements from actual team members — NOT
 * testimonials from outsiders. Only real quotes go here, supplied by
 * the person themselves. Hidden entirely when empty.
 */
export interface MemberVoice {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export const memberVoices: MemberVoice[] = [];
