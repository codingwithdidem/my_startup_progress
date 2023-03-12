import { useState, useCallback } from "react";

export const useRandomFact = () => {
  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getFact = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      "https://uselessfacts.jsph.pl/api/v2/facts/random"
    );
    const json = await response.json();
    setFact(json.text);
    setLoading(false);
  }, []);

  return { fact, loading, getFact };
};
