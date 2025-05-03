export const applyOverride = (
  target: any,
  override: object,
  ignore: string[]
): void => {
  if (override) {
    const keys = Object.keys(override);
    const values = Object.values(override);

    for (let k = 0; k < keys.length; k++) {
      const key = keys[k];
      if (ignore.indexOf(key) >= 0) continue;
      target[key] = values[k];
    }
  }
};
