class Parameter {
  /**
   * Creates an instance of QueryBuilder.
   * @param {string} options.prefix - The prefix to be used.
   */
  constructor() {
    this.values = [];
    this.history = {};
  }

  /**
   * Adds a value to the parameter and returns its index.
   * If a tag is provided and it exists in the history, the index from the history is returned.
   * Otherwise, the value is added to the parameter and its index is returned.
   *
   * @param {*} value - The value to be added to the parameter.
   * @param {string} tag - The tag associated with the value to avoid duplicates in the parameter.
   * @returns {number} - The index of the added value.
   */

  add(value, tag) {
    if (tag && this.history[tag]) return this.history[tag];

    if (value instanceof Date) this.values.push(value.toISOString());
    else this.values.push(value);

    if (tag) this.history[tag] = this.values.length;
    return this.values.length;
  }

  /**
   * Adds a value to the parameter and returns its index with '$' prefix. example '$3'.
   * If a tag is provided and it exists in the history, the index from the history is returned.
   * Otherwise, the value is added to the parameter and its index is returned.
   *
   * @param {*} value - The value to be added to the parameter.
   * @param {string} tag - The tag associated with the value to avoid duplicates in the parameter.
   * @returns {string} - The index with prefix '$' of the added value, example '$3'.
   */
  i(value, tag) {
    return `$${this.add(value, tag)}`;
  }

  /**
   * Clears the parameter values and history.
   */
  clear() {
    this.values = [];
    this.history = {};
  }
}

module.exports = Parameter;
