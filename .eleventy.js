module.exports = function (eleventyConfig) {
    // Pass through the relevant folders needed to be linked in the code
    eleventyConfig.addPassthroughCopy('src');
    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: 'dist',
          },
    };
};