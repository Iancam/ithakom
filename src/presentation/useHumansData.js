import papa from "papaparse";
import { useState, useEffect } from "react";
import { keyBy } from "../utils";
const data = require("../data/data.csv");
const schema = keyBy("guppyCopy", require("../data/dataSchema.json"));
const getOld = setHumans =>
  papa.parse(data, {
    header: true,
    download: true,
    complete: results => {
      const final = results.data.map(human =>
        // convert the keys to a standard key format
        Object.keys(human).reduce((agg, k) => {
          const key = schema[k] && schema[k].field;
          agg[key] = { answer: human[k], key };
          return agg;
        }, {})
      );
      setHumans(final);
    }
  });

const getNew = setHumans => {};

export const useHumansData = () => {
  const [humans, setHumans] = useState(undefined);
  useEffect(() => {
    humans || getNew(setHumans) || getOld(setHumans);
  }, [humans]);
  return humans;
};
