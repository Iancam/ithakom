import { keyBy } from "../utils";
import { useCSV } from "../data/useCSV";
const data = require("../data/data.csv");
const schema = keyBy("guppyCopy", require("../data/dataSchema.json"));

export const useHumansData = () =>
  useCSV(data, {
    transform: results =>
      results.data.map(human =>
        // convert the keys to a standard key format
        Object.keys(human).reduce((agg, k) => {
          const key = schema[k] && schema[k].field;
          agg[key] = { answer: human[k], key };
          return agg;
        }, {})
      ),
    header: true
  });
