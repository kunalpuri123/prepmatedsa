export type LeetCodePotd = {
  date: string;
  title: string;
  titleSlug: string;
  difficulty: string;
  link: string;
};

export const fetchLeetCodePotd = async (): Promise<LeetCodePotd> => {
  const query = `
    query questionOfToday {
      activeDailyCodingChallengeQuestion {
        date
        link
        question {
          title
          titleSlug
          difficulty
        }
      }
    }
  `;

  const response = await fetch('/api/leetcode/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch POTD');
  }

  const result = await response.json();
  const data = result?.data?.activeDailyCodingChallengeQuestion;
  if (!data?.question) {
    throw new Error('Invalid POTD response');
  }

  return {
    date: data.date,
    title: data.question.title,
    titleSlug: data.question.titleSlug,
    difficulty: data.question.difficulty,
    link: `https://leetcode.com${data.link}`,
  };
};
