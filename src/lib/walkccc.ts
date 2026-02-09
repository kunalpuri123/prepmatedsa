const MAP_CACHE_KEY = 'leetcode_slug_id_map_v1';

let inMemoryMap: Record<string, string> | null = null;

const loadMapFromStorage = () => {
  if (inMemoryMap) return inMemoryMap;
  try {
    const raw = localStorage.getItem(MAP_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, string>;
      inMemoryMap = parsed;
      return parsed;
    }
  } catch {
    // ignore
  }
  return null;
};

const saveMapToStorage = (map: Record<string, string>) => {
  inMemoryMap = map;
  try {
    localStorage.setItem(MAP_CACHE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
};

const fetchSlugIdMap = async () => {
  const response = await fetch('/api/leetcode/problems');
  if (!response.ok) {
    throw new Error('Failed to fetch LeetCode problem list');
  }
  const result = await response.json();
  const pairs = result?.stat_status_pairs || [];
  const map: Record<string, string> = {};
  pairs.forEach((item: any) => {
    const slug = item?.stat?.question__title_slug;
    const id = item?.stat?.frontend_question_id;
    if (slug && id) {
      map[slug] = String(id);
    }
  });
  saveMapToStorage(map);
  return map;
};

const fetchFrontendIdBySlug = async (slug: string) => {
  const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionFrontendId
      }
    }
  `;

  const response = await fetch('/api/leetcode/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { titleSlug: slug } }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch LeetCode problem id');
  }

  const result = await response.json();
  const id = result?.data?.question?.questionFrontendId;
  return id ? String(id) : null;
};

const extractSlug = (problemUrl: string) => {
  const match = problemUrl.match(/leetcode\.com\/problems\/([a-z0-9-]+)\//i);
  return match ? match[1] : '';
};

export const getWalkcccSolutionUrl = async (problemUrl: string) => {
  const slug = extractSlug(problemUrl);
  if (!slug) return null;

  const cached = loadMapFromStorage();
  if (cached?.[slug]) {
    return `https://walkccc.me/LeetCode/problems/${cached[slug]}/`;
  }

  try {
    const map = cached ?? (await fetchSlugIdMap());
    if (map[slug]) {
      return `https://walkccc.me/LeetCode/problems/${map[slug]}/`;
    }
  } catch {
    // ignore and try fallback
  }

  try {
    const id = await fetchFrontendIdBySlug(slug);
    if (id) {
      const map = cached ?? {};
      map[slug] = id;
      saveMapToStorage(map);
      return `https://walkccc.me/LeetCode/problems/${id}/`;
    }
  } catch {
    // ignore
  }

  return null;
};
