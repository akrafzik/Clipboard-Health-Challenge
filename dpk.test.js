const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Should return the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should return the same partition key if size fewer than 256 char", () => {
    const testString = "test123"
    const trivialKey = deterministicPartitionKey({ partitionKey: testString });
    expect(trivialKey).toBe(testString);
  });

  it("Should return a string if provided partition key isn't a string", () => {
    const testPartitionKey = 123456;
    const trivialKey = deterministicPartitionKey({ partitionKey: testPartitionKey });
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).toBe(String(testPartitionKey));
  })

  it("Should return a string if provided partition key is a object", () => {
    const tesPartitionObject = { partitionKey: { testPartitionKey: 123456 } }
    const trivialKey = deterministicPartitionKey(tesPartitionObject);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey).toBe(JSON.stringify(tesPartitionObject.partitionKey));
  })

  it("Should return new hash if partition key size is greater than 256 chars", () => {
    const randomString = crypto.randomBytes(256).toString("hex");
    const trivialKey = deterministicPartitionKey({
      partitionKey: randomString,
    });
    expect(trivialKey).not.toBe(randomString);
    expect(trivialKey.length).toBe(128);
  });

  it("Should return new has if no partition key is provided on event", () => {
    const testEvent = {}
    for(let i = 0; i < 100; i++) testEvent[i] = `test${i}`
    const trivialKey = deterministicPartitionKey(testEvent);
    expect(trivialKey).not.toBe(testEvent);
    expect(trivialKey.length).toBe(128);
  });

  it("Should return new hash if empty event is sent (???)", () => {
    const trivialKey = deterministicPartitionKey({ });
    expect(trivialKey.length).toBe(128);
  });

});
