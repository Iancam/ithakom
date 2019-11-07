import papa from "papaparse";
import { useState, useEffect } from "react";

export const useCSV = (url, options) => {
  const { transform = x => x } = options;
  const [data, setData] = useState(undefined);
  useEffect(() => {
    data ||
      papa.parse(url, {
        header: false,
        ...options,
        ...{ transform: undefined },
        download: true,
        complete: results => {
          setData(transform(results));
        }
      });
  }, [data, options, url, transform]);
  return data;
};
