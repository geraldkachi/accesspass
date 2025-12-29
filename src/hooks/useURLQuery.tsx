import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface QueryParams {
  [key: string]: string | null;
}

type EffectFn = (query: QueryParams) => void;

interface SetURLQueryOptions {
  [key: string]: string | number | boolean | null;
}

interface UseURLQueryReturn {
  value: QueryParams;
  setURLQuery: (queries: SetURLQueryOptions, clearAll?: boolean) => void;
}

const useURLQuery = (effectFn?: EffectFn): UseURLQueryReturn => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const query: QueryParams = useMemo(() => {
    const url = new URLSearchParams(location.search);
    // convert url to object
    const q = Array.from(url.keys()).reduce((acc: QueryParams, cur) => ({ 
      ...acc, 
      [cur]: url.get(cur) 
    }), {});
    return q;
  }, [location]);

  useEffect(() => {
    effectFn?.(query);
  }, [location, query, effectFn]);

  return {
    value: query,
    setURLQuery: (queries: SetURLQueryOptions, clearAll?: boolean) => {
      const url = new URLSearchParams(clearAll ? "" : location.search);
      Object.keys(queries).forEach((key) => {
        const value = queries[key];
        if (value !== null) {
          url.set(key, String(value));
        } else if (url.has(key)) {
          url.delete(key);
        }
      });

      // Using navigate for React Router v6+
      navigate(`${location.pathname}?${url.toString()}`, { replace: true });
    },
  };
};

export default useURLQuery;