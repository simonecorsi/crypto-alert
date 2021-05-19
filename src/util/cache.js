const Cache = new Map();

Cache.set("global", new Map());

const global = Cache.get("global");

module.exports = (name = undefined) => {
  if (!name) return global;
  if (!Cache.has(name)) {
    Cache.set(name, new Map());
  }
  return Cache.get(name);
};
