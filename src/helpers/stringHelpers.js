const extractProductName = (str) => str.split('product-')[1].split('.')[0];

export { extractProductName };
