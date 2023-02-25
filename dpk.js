const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) return TRIVIAL_PARTITION_KEY;

    candidate = typeof event.partitionKey === "string" ? event.partitionKey : JSON.stringify(event.partitionKey || event);
    
    return candidate.length > MAX_PARTITION_KEY_LENGTH || !event.partitionKey
    ? crypto.createHash("sha3-512").update(candidate).digest("hex")
    : candidate;
};
