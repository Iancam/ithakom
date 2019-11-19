import { useState, useEffect } from "react";
import request from "superagent";
const urljoin = require("url-join");

export const useServer = (url, err) => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    data ||
      request
        .get(urljoin(url))
        .then(results => {
          const ret = results.body.guppies.map(human =>
            Object.keys(human).reduce((agg, key) => {
              const emptyObject =
                typeof human[key] === "object" &&
                Object.values(human[key]).length === 0;
              agg[key] = emptyObject ? undefined : human[key];
              return agg;
            }, {})
          );
          setData(ret);
        })
        .catch(err);
  }, [data, url]);
  return data;
};
