interface NumericFormat {
  formatNumber: (num: string | number) => string;
  parseNumber: (str: string) => number;
}

const formatCommaNum: NumericFormat = {
  formatNumber: (num: string | number) => {
    // Example: Format number with commas
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // ","
  },
  parseNumber: (str: string) => {
    // Example: Parse a comma-separated string to a number
    return parseFloat(str.replace(/,/g, ""));
  },
};

export default formatCommaNum;
